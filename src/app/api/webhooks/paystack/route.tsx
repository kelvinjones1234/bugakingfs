// app/api/webhooks/paystack/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "../../../../../lib/data/prisma"; // Adjust path if needed

export async function POST(req: Request) {
  try {
    // 1. Get Secret Key
    const secret = process.env.NEXT_PAYSTACK_SECRET_KEY;
    if (!secret) {
      console.error("❌ Paystack secret key missing");
      return NextResponse.json({ message: "Server config error" }, { status: 500 });
    }

    // 2. Validate Signature
    const body = await req.text();
    const hash = crypto.createHmac("sha512", secret).update(body).digest("hex");
    const signature = req.headers.get("x-paystack-signature");

    if (hash !== signature) {
      console.warn("⚠️ Invalid Paystack webhook signature attempt");
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    // 3. Parse Event
    const event = JSON.parse(body);

    // 4. Handle 'charge.success'
    if (event.event === "charge.success") {
      const { metadata, amount, reference } = event.data;
      
      const investmentId = metadata?.investment_id;
      const scheduleId = metadata?.schedule_id; // 👈 Extract exact schedule ID sent from frontend

      if (investmentId) {
        console.log(`💰 Payment received for Investment: ${investmentId}`);

        // A. Find the Investment, Schedules AND Project Details (for Location snapshot)
        const investment = await prisma.clientInvestment.findUnique({
          where: { id: investmentId },
          include: { 
            schedules: true,
            selectedOption: {
              include: {
                project: true
              }
            }
          }
        });

        if (investment) {
          // B. Find the exact schedule to pay
          let scheduleToUpdate;

          if (scheduleId) {
            // 🌟 PRIMARY METHOD: Use the exact ID from the frontend metadata
            scheduleToUpdate = investment.schedules.find(s => s.id === scheduleId);
          } else {
            // 🛡️ FALLBACK: If schedule_id is missing, use chronological sorting 
            // (Fixed to include "PENDING" so it stops skipping the first payment!)
            scheduleToUpdate = investment.schedules
              .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
              .find(s => s.status === "PENDING" || s.status === "UPCOMING" || s.status === "OVERDUE");
          }

          if (scheduleToUpdate) {
            const paidAmount = amount / 100; // Convert Kobo to Base Currency

            // Transaction Operation: Run all updates in a transaction for data integrity
            await prisma.$transaction(async (tx) => {
              
              // 1. Update Schedule to PAID
              await tx.paymentSchedule.update({
                where: { id: scheduleToUpdate.id },
                data: {
                  status: "PAID",
                  datePaid: new Date(),
                  proofOfPayment: `Paystack Ref: ${reference}`
                  // Removed amount: paidAmount override here so it doesn't overwrite the schedule's expected value
                }
              });

              // 2. Update Parent Investment (Amount Paid & Status)
              const newTotalPaid = investment.amountPaid + paidAmount;
              const isComplete = newTotalPaid >= investment.agreedAmount;

              await tx.clientInvestment.update({
                where: { id: investmentId },
                data: {
                  amountPaid: { increment: paidAmount },
                  status: isComplete ? "COMPLETED" : "PAYING"
                }
              });

              // 3. Create Transaction Record
              await tx.transaction.create({
                data: {
                  userId: investment.userId,
                  investmentId: investment.id,
                  amount: paidAmount,
                  location: investment.selectedOption.project.location, 
                  installmentNumber: scheduleToUpdate.installmentNumber,
                  paymentReference: reference,
                  timestamp: new Date()
                }
              });
            });

            console.log(`✅ Payment recorded and Transaction created for ${reference}`);
          } else {
            console.log("⚠️ Payment received but no pending schedule found.");
          }
        }
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("❌ Webhook Error:", error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}