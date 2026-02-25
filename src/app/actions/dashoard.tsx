"use server";

import prisma from "../../../lib/data/prisma";
import { getServerSession } from "next-auth";
// 👇 1. Import your exact authOptions (Adjust this path if your file is located elsewhere)
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

// export async function getDashboardStats() {
//   // 1. Authenticate and get userId
//   const session = await getServerSession(authOptions);
  
//   if (!session?.user) throw new Error("Unauthorized");
//   const userId = (session.user as any).id;

//   // 2. Fetch User's Investments
//   const investments = await prisma.clientInvestment.findMany({
//     where: { userId: userId },
//     include: { 
//       selectedOption: { include: { project: true } },
//       schedules: {
//         orderBy: { dueDate: 'asc' }
//       }
//     }
//   });

//   // 3. Calculate Global Stats
//   const totalInvested = investments.reduce((sum, inv) => sum + inv.amountPaid, 0);
//   const portfolioValue = investments.reduce((sum, inv) => sum + inv.agreedAmount, 0);

//   // --- STRICT ROI CALCULATION ---
//   // Filter ONLY for Farmland with Outright (ONE_TIME) payment
//   const eligibleRoiInvestments = investments.filter(inv => 
//     inv.selectedOption.project.assetType === "FARMLAND" &&
//     inv.selectedOption.paymentMode === "ONE_TIME"
//   );

//   let projectedRoiPercentage = 0;
  
//   if (eligibleRoiInvestments.length > 0) {
//     const totalEligibleInvestment = eligibleRoiInvestments.reduce((sum, inv) => sum + inv.amountPaid, 0);
    
//     if (totalEligibleInvestment > 0) {
//       // Calculate the weighted average ROI based on the actual invested amounts
//       const weightedRoiSum = eligibleRoiInvestments.reduce((sum, inv) => {
//         const roiPercent = inv.selectedOption.project.expectedRoiPercent || 0;
//         return sum + (inv.amountPaid * roiPercent);
//       }, 0);

//       projectedRoiPercentage = weightedRoiSum / totalEligibleInvestment;
//     }
//   }

//   // 4. Compute Next Payment accurately via Database
//   const nextSchedule = await prisma.paymentSchedule.findFirst({
//     where: {
//       investment: {
//         userId: userId,
//         status: { in: ["PENDING", "PAYING"] } 
//       },
//       status: {
//         in: ["UPCOMING", "PENDING", "OVERDUE"] 
//       }
//     },
//     orderBy: {
//       dueDate: 'asc' 
//     }
//   });

//   let nextPayment = null;
//   if (nextSchedule) {
//     const today = new Date();
//     const dueDate = new Date(nextSchedule.dueDate);

//     // Normalize both dates to midnight to get a strict "day" difference 
//     const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
//     const dueMidnight = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());

//     const diffTime = dueMidnight.getTime() - todayMidnight.getTime();
//     const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//     nextPayment = {
//       amount: nextSchedule.amount,
//       daysLeft: daysLeft < 0 ? 0 : daysLeft, // If negative (overdue), cap at 0
//       dueDate: nextSchedule.dueDate.toISOString()
//     };
//   }

//   // 5. Get Recent Transactions (Now using your new Transaction model!)
//   const recentTransactions = await prisma.transaction.findMany({
//     where: { userId: userId },
//     include: {
//       investment: {
//         include: {
//           selectedOption: {
//             include: { project: true }
//           }
//         }
//       }
//     },
//     orderBy: { timestamp: 'desc' },
//     take: 5
//   });

//   // 6. Map to Frontend Structure
//   return {
//     totalInvested,      
//     portfolioValue,     
//     projectedRoiPercentage,  
//     nextPayment,
//     recentTransactions: recentTransactions.map(tx => ({
//       id: tx.id,
//       // Create a dynamic title based on the project they paid for
//       title: `Payment: ${tx.investment.selectedOption.project.name}`,
//       amount: tx.amount,
//       datePaid: tx.timestamp.toISOString(),
//       status: "PAID" // Transactions are inherently paid
//     })),
//     portfolioItems: investments.map(inv => {
//       const totalSchedules = inv.schedules.length;
//       const paidSchedules = inv.schedules.filter(s => s.status === "PAID").length;
      
//       const percentageCompletion = totalSchedules > 0 
//         ? Math.round((paidSchedules / totalSchedules) * 100) 
//         : 0;

//       // Ensure ROI only shows on the frontend if it's Farmland + Outright
//       const isEligibleForRoi = 
//         inv.selectedOption.project.assetType === "FARMLAND" && 
//         inv.selectedOption.paymentMode === "ONE_TIME";

//       return { 
//         id: inv.id,
//         name: inv.selectedOption.project.name,
//         projectName: inv.selectedOption.project.name,
//         location: inv.selectedOption.project.location,
//         projectImage: inv.selectedOption.project.projectImg,
//         status: inv.status,
//         expectedRoi: isEligibleForRoi ? inv.selectedOption.project.expectedRoiPercent : 0,
//         percentageCompletion
//       };
//     })
//   };
// }












export async function getDashboardData() {
  // ---------------------------------------------------------
  // 1. GLOBAL STATS (The "Big Picture")
  // ---------------------------------------------------------
  
  // Count TOTAL users in the system
  const totalUsers = await prisma.user.count();

  // Count investments that are currently active (paying out or earning)
  const activeInvestments = await prisma.clientInvestment.count({
    where: { 
      status: { in: ["PAYING", "EARNING"] } 
    }
  });

  // Count TOTAL investments ever made (initiated)
  const initiatedInvestments = await prisma.clientInvestment.count();

  // Count investments waiting for Admin approval
  const pendingApprovals = await prisma.clientInvestment.count({
    where: { status: "PENDING" }
  });

  // ---------------------------------------------------------
  // 2. RECENT INVESTMENTS (For the Table)
  // ---------------------------------------------------------
  const recentInvestmentsRaw = await prisma.clientInvestment.findMany({
    take: 5, // Limit to 5
    orderBy: { createdAt: "desc" }, // Newest first
    include: {
      user: true, // Fetch the user who made the investment
      selectedOption: {
        include: { project: true } // Fetch the project details
      }
    }
  });

  // Map to the format your React Component expects
  const recentInvestments = recentInvestmentsRaw.map((inv) => ({
    id: inv.id,
    user: {
      name: `${inv.user.firstName} ${inv.user.lastName}`,
      initials: `${inv.user.firstName?.[0] || ""}${inv.user.lastName?.[0] || ""}`,
      tier: inv.user.isApproved ? "Verified" : "Standard", // Example logic
    },
    project: inv.selectedOption.project.name,
    date: inv.createdAt.toISOString().split("T")[0], // Format: YYYY-MM-DD
    amount: `₦${inv.amountPaid.toLocaleString()}`, // Format: Currency
  }));

  // ---------------------------------------------------------
  // 3. PAYMENTS PIPELINE (Upcoming Payments due from users)
  // ---------------------------------------------------------
  // We look for schedules that are UPCOMING or OVERDUE
  const upcomingPaymentsRaw = await prisma.paymentSchedule.findMany({
    where: { 
      status: { in: ["UPCOMING", "OVERDUE"] } 
    },
    take: 5,
    orderBy: { dueDate: "asc" }, // Soonest due first
    include: {
      investment: {
        include: { user: true, selectedOption: true }
      }
    }
  });

  const paymentsData = upcomingPaymentsRaw.map((sch) => {
    const dueDate = new Date(sch.dueDate);
    const today = new Date();
    // Calculate days difference
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let timeLabel = "";
    if (diffDays < 0) timeLabel = `${Math.abs(diffDays)} days overdue`;
    else if (diffDays === 0) timeLabel = "Due Today";
    else timeLabel = `Due in ${diffDays} days`;

    return {
      id: sch.id.substring(0, 6), // Short ID for display
      user: `${sch.investment.user.firstName} ${sch.investment.user.lastName}`,
      type: sch.title || "Installment",
      amount: `₦${sch.amount.toLocaleString()}`,
      status: sch.status === "OVERDUE" ? "Overdue" : "Pending",
      timeLabel: timeLabel,
    };
  });

  // ---------------------------------------------------------
  // 4. PORTFOLIO DIVERSITY (Agri vs Real Estate)
  // ---------------------------------------------------------
  // Fetch all investments to calculate the split
  const allInvestments = await prisma.clientInvestment.findMany({
    include: { 
      selectedOption: { include: { project: true } } 
    }
  });

  const totalCount = allInvestments.length || 1; // Prevent division by zero
  
  const realEstateCount = allInvestments.filter(
    (i) => i.selectedOption.project.investmentType === "REAL_ESTATE"
  ).length;
  
  const agriCount = allInvestments.filter(
    (i) => i.selectedOption.project.investmentType === "AGRICULTURE"
  ).length;

  const portfolio = [
    { 
      name: "Real Estate", 
      percentage: Math.round((realEstateCount / totalCount) * 100) 
    },
    { 
      name: "Agriculture", 
      percentage: Math.round((agriCount / totalCount) * 100) 
    },
  ];

  // ---------------------------------------------------------
  // 5. RETURN FINAL DATA OBJECT
  // ---------------------------------------------------------
  return {
    stats: {
      totalUsers: totalUsers.toString(),
      activeInvestments: activeInvestments.toString(),
      initiatedInvestments: initiatedInvestments.toString(),
      pendingApprovals: pendingApprovals.toString(),
    },
    recentInvestments,
    paymentsData,
    portfolio,
  };
}