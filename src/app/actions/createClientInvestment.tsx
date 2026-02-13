"use server";

import prisma from "../../../lib/data/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { revalidatePath } from "next/cache";
import { addWeeks, addMonths } from "date-fns";

export async function createClientInvestment(pricingId: string) {
  try {
    // 1. Authenticate User - PASS AUTH OPTIONS
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      throw new Error("Unauthorized - No session found");
    }

    // 2. Get user ID from email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const userId = user.id;
    console.log("✅ User ID:", userId);

    // 3. Fetch the selected Pricing Plan
    const pricingPlan = await prisma.projectPricing.findUnique({
      where: { id: pricingId },
    });

    if (!pricingPlan) {
      throw new Error("Pricing plan not found");
    }

    console.log("✅ Pricing plan found:", pricingPlan.planName);

    // 4. Calculate Installments
    const schedules = [];
    const startDate = new Date();
    let installmentAmount = pricingPlan.totalPrice;

    if (pricingPlan.paymentMode === "ONE_TIME") {
      schedules.push({
        title: "Outright Payment",
        installmentNumber: 1,
        dueDate: startDate,
        amount: pricingPlan.totalPrice,
        status: "PENDING",
      });
    } else {
      // Calculate installment count
      const count =
        pricingPlan.paymentMode === "WEEKLY"
          ? Math.floor(pricingPlan.durationDays / 7)
          : Math.floor(pricingPlan.durationDays / 30);

      installmentAmount = pricingPlan.totalPrice / count;

      for (let i = 0; i < count; i++) {
        const dueDate =
          i === 0
            ? startDate
            : pricingPlan.paymentMode === "WEEKLY"
              ? addWeeks(startDate, i)
              : addMonths(startDate, i);

        schedules.push({
          title: `${pricingPlan.paymentMode === "WEEKLY" ? "Week" : "Month"} ${i + 1}`,
          installmentNumber: i + 1,
          dueDate: dueDate,
          amount: installmentAmount,
          status: i === 0 ? "PENDING" : "UPCOMING",
        });
      }
    }

    console.log(`✅ Created ${schedules.length} payment schedules`);

    // 5. Create Investment with Schedules
    const newInvestment = await prisma.clientInvestment.create({
      data: {
        userId: userId,
        selectedOptionId: pricingPlan.id,
        agreedAmount: pricingPlan.totalPrice,
        installmentAmount: installmentAmount,
        startDate: startDate,
        status: "PENDING",
        schedules: {
          create: schedules.map((s) => ({
            title: s.title,
            installmentNumber: s.installmentNumber,
            dueDate: s.dueDate,
            amount: s.amount,
            status: s.status as any,
          })),
        },
      },
      include: {
        schedules: true,
      },
    });

    console.log("✅ Investment created:", newInvestment.id);

    revalidatePath("/dashboard/investments");
    return { success: true, investmentId: newInvestment.id };
  } catch (error) {
    console.error("❌ Investment Creation Failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create investment plan.",
    };
  }
}