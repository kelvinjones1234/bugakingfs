"use server";

import { PrismaClient } from "@prisma/client";

// Adjust this import based on where you initialize Prisma in your project
const prisma = new PrismaClient();

// Helper to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
};

// Helper to calculate time labels for payments
const getTimeLabel = (dueDate: Date) => {
  const today = new Date();
  const diffTime = dueDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return `${Math.abs(diffDays)} Days Late`;
  if (diffDays === 0) return "Due Today";
  if (diffDays === 1) return "Tomorrow";
  return `In ${diffDays} Days`;
};

export async function getDashboardData() {
  try {
    // 1. Fetch Stats Concurrently
    const [totalUsers, activeInvestments, pendingUsers, allInvestments] =
      await Promise.all([
        prisma.user.count({ where: { isStaff: false } }),
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

    const totalExpectedValue = allInvestments.reduce(
      (sum, inv) => sum + inv.agreedAmount,
      0,
    );

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
          `${inv.user.firstName[0]}${inv.user.lastName[0]}`.toUpperCase(),
        tier: inv.user.isApproved ? "Verified" : "Unverified",
      },
      project: inv.selectedOption.project.name,
      date: inv.createdAt.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      amount: formatCurrency(inv.agreedAmount),
    }));

    // 3. Fetch Payments Pipeline (Schedules)
    const upcomingPayments = await prisma.paymentSchedule.findMany({
      take: 5,
      where: { status: { in: ["UPCOMING", "PENDING", "OVERDUE"] } },
      orderBy: { dueDate: "asc" },
      include: {
        investment: { include: { user: true } },
      },
    });

    const paymentsData = upcomingPayments.map((payment) => ({
      id: payment.id.slice(-6).toUpperCase(), // Shorten ID for UI
      user: `${payment.investment.user.firstName} ${payment.investment.user.lastName}`,
      type: payment.title,
      amount: formatCurrency(payment.amount),
      status: payment.status === "OVERDUE" ? "Overdue" : "Pending", // Map DB enum to UI state
      timeLabel: getTimeLabel(payment.dueDate),
    }));

    // 4. Calculate Portfolio Diversity
    let realEstateCount = 0;
    let agricultureCount = 0;

    allInvestments.forEach((inv) => {
      if (inv.selectedOption?.project?.investmentType === "REAL_ESTATE")
        realEstateCount++;
      if (inv.selectedOption?.project?.investmentType === "AGRICULTURE")
        agricultureCount++;
    });

    const totalPortfolioCount = realEstateCount + agricultureCount || 1; // avoid div by zero
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
        // Replace expectedRoi with initiatedInvestments
        initiatedInvestments: allInvestments.length.toLocaleString(),
        pendingApprovals: pendingUsers.toString(),
      },
      recentInvestments,
      paymentsData,
      portfolio,
    };
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    throw new Error("Could not load dashboard data");
  }
}
