// "use server";

// import { PrismaClient } from "@prisma/client";

// // Adjust this import based on where you initialize Prisma in your project
// const prisma = new PrismaClient();

// // Helper to format currency
// const formatCurrency = (amount: number) => {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//     maximumFractionDigits: 0,
//   }).format(amount);
// };

// // Helper to calculate time labels for payments
// const getTimeLabel = (dueDate: Date) => {
//   const today = new Date();
//   const diffTime = dueDate.getTime() - today.getTime();
//   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//   if (diffDays < 0) return `${Math.abs(diffDays)} Days Late`;
//   if (diffDays === 0) return "Due Today";
//   if (diffDays === 1) return "Tomorrow";
//   return `In ${diffDays} Days`;
// };

// export async function getDashboardData() {
//   try {
//     // 1. Fetch Stats Concurrently
//     const [totalUsers, activeInvestments, pendingUsers, allInvestments] =
//       await Promise.all([
//         prisma.user.count({ where: { isStaff: false } }),
//         prisma.clientInvestment.count({
//           where: { status: { in: ["PAYING", "EARNING", "COMPLETED"] } },
//         }),
//         prisma.user.count({ where: { isApproved: false } }),
//         prisma.clientInvestment.findMany({
//           select: {
//             agreedAmount: true,
//             selectedOption: {
//               select: { project: { select: { investmentType: true } } },
//             },
//           },
//         }),
//       ]);

//     const totalExpectedValue = allInvestments.reduce(
//       (sum, inv) => sum + inv.agreedAmount,
//       0,
//     );

//     // 2. Fetch Recent Investments (Table)
//     const recentDbInvestments = await prisma.clientInvestment.findMany({
//       take: 5,
//       orderBy: { createdAt: "desc" },
//       include: {
//         user: true,
//         selectedOption: {
//           include: { project: true },
//         },
//       },
//     });

//     const recentInvestments = recentDbInvestments.map((inv) => ({
//       id: inv.id,
//       user: {
//         name: `${inv.user.firstName} ${inv.user.lastName}`,
//         initials:
//           `${inv.user.firstName[0]}${inv.user.lastName[0]}`.toUpperCase(),
//         tier: inv.user.isApproved ? "Verified" : "Unverified",
//       },
//       project: inv.selectedOption.project.name,
//       date: inv.createdAt.toLocaleDateString("en-US", {
//         month: "short",
//         day: "numeric",
//         year: "numeric",
//       }),
//       amount: formatCurrency(inv.agreedAmount),
//     }));

//     // 3. Fetch Payments Pipeline (Schedules)
//     const upcomingPayments = await prisma.paymentSchedule.findMany({
//       take: 5,
//       where: { status: { in: ["UPCOMING", "PENDING", "OVERDUE"] } },
//       orderBy: { dueDate: "asc" },
//       include: {
//         investment: { include: { user: true } },
//       },
//     });

//     const paymentsData = upcomingPayments.map((payment) => ({
//       id: payment.id.slice(-6).toUpperCase(), // Shorten ID for UI
//       user: `${payment.investment.user.firstName} ${payment.investment.user.lastName}`,
//       type: payment.title,
//       amount: formatCurrency(payment.amount),
//       status: payment.status === "OVERDUE" ? "Overdue" : "Pending", // Map DB enum to UI state
//       timeLabel: getTimeLabel(payment.dueDate),
//     }));

//     // 4. Calculate Portfolio Diversity
//     let realEstateCount = 0;
//     let agricultureCount = 0;

//     allInvestments.forEach((inv) => {
//       if (inv.selectedOption?.project?.investmentType === "REAL_ESTATE")
//         realEstateCount++;
//       if (inv.selectedOption?.project?.investmentType === "AGRICULTURE")
//         agricultureCount++;
//     });

//     const totalPortfolioCount = realEstateCount + agricultureCount || 1; // avoid div by zero
//     const portfolio = [
//       {
//         name: "Real Estate",
//         percentage: Math.round((realEstateCount / totalPortfolioCount) * 100),
//       },
//       {
//         name: "Agriculture",
//         percentage: Math.round((agricultureCount / totalPortfolioCount) * 100),
//       },
//     ];

//     return {
//       stats: {
//         totalUsers: totalUsers.toLocaleString(),
//         activeInvestments: activeInvestments.toLocaleString(),
//         // Replace expectedRoi with initiatedInvestments
//         initiatedInvestments: allInvestments.length.toLocaleString(),
//         pendingApprovals: pendingUsers.toString(),
//       },
//       recentInvestments,
//       paymentsData,
//       portfolio,
//     };
//   } catch (error) {
//     console.error("Failed to fetch dashboard data:", error);
//     throw new Error("Could not load dashboard data");
//   }
// }

"use server";

// 👇 1. USE YOUR SINGLETON IMPORT (Prevents DB crashes)
import prisma from "../../../lib/data/prisma";
// If your path is different, adjust it (e.g. "../../../lib/data/prisma")

// Helper to format currency to Naira
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    // Changed to en-NG for Nigeria
    style: "currency",
    currency: "NGN", // Changed to NGN
    maximumFractionDigits: 0,
  }).format(amount);
};

// Helper to calculate time labels for payments
const getTimeLabel = (dueDate: Date) => {
  const today = new Date();
  // Reset time to midnight for accurate day calculation
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return `${Math.abs(diffDays)} Days Overdue`;
  if (diffDays === 0) return "Due Today";
  if (diffDays === 1) return "Due Tomorrow";
  return `Due in ${diffDays} Days`;
};

export async function getDashboardData() {
  try {
    const [totalUsers, activeInvestments, pendingUsers, allInvestments] =
      await Promise.all([
        // 👇 CHANGE THIS LINE: Remove the 'where' filter to count everyone
        prisma.user.count(),

        prisma.clientInvestment.count({
          where: { status: { in: ["PAYING", "EARNING", "COMPLETED"] } },
        }),
        prisma.user.count({ where: { isApproved: false } }),
        prisma.clientInvestment.findMany({
          select: {
            agreedAmount: true,
            selectedOption: {
              select: { project: { select: { investmentType: true } } },
            },
          },
        }),
      ]);

    // 2. Fetch Recent Investments (Table)
    const recentDbInvestments = await prisma.clientInvestment.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
        selectedOption: {
          include: { project: true },
        },
      },
    });

    const recentInvestments = recentDbInvestments.map((inv) => ({
      id: inv.id,
      user: {
        name: `${inv.user.firstName} ${inv.user.lastName}`,
        initials:
          `${inv.user.firstName?.[0] || ""}${inv.user.lastName?.[0] || ""}`.toUpperCase(),
        tier: inv.user.isApproved ? "Verified" : "Standard",
      },
      project: inv.selectedOption.project.name,
      date: inv.createdAt.toLocaleDateString("en-GB", {
        // en-GB uses DD/MM/YYYY
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      amount: formatCurrency(inv.agreedAmount),
    }));

    // 3. Fetch Payments Pipeline (Schedules)
    const upcomingPayments = await prisma.paymentSchedule.findMany({
      take: 5,
      // Status: UPCOMING (future), PENDING (current), OVERDUE (past)
      where: { status: { in: ["UPCOMING", "PENDING", "OVERDUE"] } },
      orderBy: { dueDate: "asc" }, // Soonest first
      include: {
        investment: { include: { user: true } },
      },
    });

    // Map DB result to Frontend interface
    const paymentsData = upcomingPayments.map((payment) => ({
      id: payment.id.slice(-6).toUpperCase(),
      user: payment.investment.user
        ? `${payment.investment.user.firstName} ${payment.investment.user.lastName}`
        : "Unknown User",
      type: payment.title || "Installment",
      amount: formatCurrency(payment.amount),
      status: payment.status === "OVERDUE" ? "Overdue" : "Pending",
      timeLabel: getTimeLabel(payment.dueDate),
    }));

    // 4. Calculate Portfolio Diversity
    let realEstateCount = 0;
    let agricultureCount = 0;

    allInvestments.forEach((inv) => {
      const type = inv.selectedOption?.project?.investmentType;
      if (type === "REAL_ESTATE") realEstateCount++;
      if (type === "AGRICULTURE") agricultureCount++;
    });

    const totalPortfolioCount = realEstateCount + agricultureCount || 1;

    const portfolio = [
      {
        name: "Real Estate",
        percentage: Math.round((realEstateCount / totalPortfolioCount) * 100),
      },
      {
        name: "Agriculture",
        percentage: Math.round((agricultureCount / totalPortfolioCount) * 100),
      },
    ];

    return {
      stats: {
        totalUsers: totalUsers.toLocaleString(),
        activeInvestments: activeInvestments.toLocaleString(),
        initiatedInvestments: allInvestments.length.toLocaleString(),
        pendingApprovals: pendingUsers.toString(),
      },
      recentInvestments,
      paymentsData,
      portfolio,
    };
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    // Return empty/safe structure on error so the page doesn't crash completely
    return {
      stats: {
        totalUsers: "0",
        activeInvestments: "0",
        initiatedInvestments: "0",
        pendingApprovals: "0",
      },
      recentInvestments: [],
      paymentsData: [],
      portfolio: [],
    };
  }
}
