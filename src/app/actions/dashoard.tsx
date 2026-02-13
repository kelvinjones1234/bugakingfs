"use server";

import prisma from "../../../lib/data/prisma";
import { getServerSession } from "next-auth";
// 👇 1. Import your exact authOptions (Adjust this path if your file is located elsewhere)
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function getDashboardStats() {
  // 👇 2. Pass authOptions into getServerSession
  const session = await getServerSession(authOptions);
  
  if (!session?.user) throw new Error("Unauthorized");
  const userId = (session.user as any).id;

  // 1. Fetch User's Investments with schedules (Perfectly scoped to the logged-in user)
  const investments = await prisma.clientInvestment.findMany({
    where: { userId: userId }, // 👈 This guarantees only their data is fetched
    include: { 
      selectedOption: { include: { project: true } },
      schedules: {
        orderBy: { dueDate: 'asc' }
      }
    }
  });

  // 2. Calculate Stats
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amountPaid, 0);
  const portfolioValue = investments.reduce((sum, inv) => sum + inv.agreedAmount, 0);

  const projectedRoiPercentage = totalInvested > 0 
    ? ((portfolioValue - totalInvested) / totalInvested) * 100 
    : 0;

  // 3. Find next payment due from investments with PAYING status
  let nextPayment = null;
  const payingInvestments = investments.filter(inv => inv.status === "PAYING");

  if (payingInvestments.length > 0) {
    const investmentsWithProgress = payingInvestments.map(inv => {
      const totalSchedules = inv.schedules.length;
      const paidSchedules = inv.schedules.filter(s => s.status === "PAID").length;
      const progress = totalSchedules > 0 ? (paidSchedules / totalSchedules) * 100 : 0;
      
      const nextSchedule = inv.schedules.find(
        s => s.status === "UPCOMING" || s.status === "PENDING" || s.status === "OVERDUE"
      );

      return { investment: inv, progress, nextSchedule };
    });

    const investmentsWithNextPayment = investmentsWithProgress.filter(
      item => item.nextSchedule !== undefined
    );

    if (investmentsWithNextPayment.length > 0) {
      investmentsWithNextPayment.sort((a, b) => b.progress - a.progress);
      const mostProgressedInvestment = investmentsWithNextPayment[0];
      const nextSchedule = mostProgressedInvestment.nextSchedule!;

      const today = new Date();
      const dueDate = new Date(nextSchedule.dueDate);
      const daysLeft = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      nextPayment = {
        amount: nextSchedule.amount,
        daysLeft: daysLeft > 0 ? daysLeft : 0,
        dueDate: nextSchedule.dueDate.toISOString()
      };
    }
  }

  // 4. Get Recent Transactions (Perfectly scoped to the logged-in user)
  const recentTransactions = await prisma.paymentSchedule.findMany({
    where: { 
      investment: { userId: userId }, // 👈 Scoped via relation
      status: "PAID"
    },
    orderBy: { datePaid: 'desc' },
    take: 5
  });

  // 5. Map to Frontend Structure
  return {
    totalInvested,      
    portfolioValue,     
    projectedRoiPercentage,  
    nextPayment,
    recentTransactions: recentTransactions.map(tx => ({
      id: tx.id,
      title: tx.title,
      amount: tx.amount,
      datePaid: tx.datePaid?.toISOString() || new Date().toISOString(),
      status: tx.status
    })),
    portfolioItems: investments.map(inv => {
      const totalSchedules = inv.schedules.length;
      const paidSchedules = inv.schedules.filter(s => s.status === "PAID").length;
      const percentageCompletion = totalSchedules > 0 
        ? Math.round((paidSchedules / totalSchedules) * 100) 
        : 0;

      return {
        id: inv.id,
        name: inv.selectedOption.project.name,
        projectName: inv.selectedOption.project.name,
        location: inv.selectedOption.project.location,
        projectImage: inv.selectedOption.project.projectImg,
        status: inv.status,
        expectedRoi: inv.selectedOption.project.expectedRoiPercent,
        percentageCompletion
      };
    })
  };
}