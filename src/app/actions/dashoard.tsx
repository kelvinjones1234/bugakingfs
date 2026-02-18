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

//   // 2. Fetch User's Investments (Needed for portfolio mapping and ROI stats)
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

//   const projectedRoiPercentage = totalInvested > 0 
//     ? ((portfolioValue - totalInvested) / totalInvested) * 100 
//     : 0;

//   // 4. Compute nextPayment correctly using Prisma
//   const nextSchedule = await prisma.paymentSchedule.findFirst({
//     where: {
//       investment: {
//         userId: userId,
//         status: { in: ["PENDING", "PAYING"] } // Include PENDING to catch brand new plans!
//       },
//       status: {
//         in: ["UPCOMING", "PENDING", "OVERDUE"] // Look for any unpaid status
//       }
//     },
//     orderBy: {
//       dueDate: 'asc' // Chronologically closest schedule across all properties
//     }
//   });

//   let nextPayment = null;
//   if (nextSchedule) {
//     const today = new Date();
//     const dueDate = new Date(nextSchedule.dueDate);

//     // Normalize both dates to midnight to get a strict "day" difference 
//     // This prevents hours/minutes from throwing off the calculation.
//     const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
//     const dueMidnight = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());

//     const diffTime = dueMidnight.getTime() - todayMidnight.getTime();
//     const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//     nextPayment = {
//       amount: nextSchedule.amount,
//       daysLeft: daysLeft < 0 ? 0 : daysLeft, // If it's negative (overdue), display 0
//       dueDate: nextSchedule.dueDate.toISOString()
//     };
//   }

//   // 5. Get Recent Transactions 
//   // (Note: Currently mapping from PaymentSchedule as per your original code. 
//   // You can update this to use the new `prisma.transaction` model in the future if desired)
//   const recentTransactions = await prisma.paymentSchedule.findMany({
//     where: { 
//       investment: { userId: userId },
//       status: "PAID"
//     },
//     orderBy: { datePaid: 'desc' },
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
//       title: tx.title,
//       amount: tx.amount,
//       datePaid: tx.datePaid?.toISOString() || new Date().toISOString(),
//       status: tx.status
//     })),
//     portfolioItems: investments.map(inv => {
//       const totalSchedules = inv.schedules.length;
//       const paidSchedules = inv.schedules.filter(s => s.status === "PAID").length;
      
//       // Calculate Equity/Percentage Completion based on schedules paid
//       const percentageCompletion = totalSchedules > 0 
//         ? Math.round((paidSchedules / totalSchedules) * 100) 
//         : 0;

//       return {
//         id: inv.id,
//         name: inv.selectedOption.project.name,
//         projectName: inv.selectedOption.project.name,
//         location: inv.selectedOption.project.location,
//         projectImage: inv.selectedOption.project.projectImg,
//         status: inv.status,
//         expectedRoi: inv.selectedOption.project.expectedRoiPercent,
//         percentageCompletion
//       };
//     })
//   };
// }





export async function getDashboardStats() {
  // 1. Authenticate and get userId
  const session = await getServerSession(authOptions);
  
  if (!session?.user) throw new Error("Unauthorized");
  const userId = (session.user as any).id;

  // 2. Fetch User's Investments
  const investments = await prisma.clientInvestment.findMany({
    where: { userId: userId },
    include: { 
      selectedOption: { include: { project: true } },
      schedules: {
        orderBy: { dueDate: 'asc' }
      }
    }
  });

  // 3. Calculate Global Stats
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amountPaid, 0);
  const portfolioValue = investments.reduce((sum, inv) => sum + inv.agreedAmount, 0);

  // --- STRICT ROI CALCULATION ---
  // Filter ONLY for Farmland with Outright (ONE_TIME) payment
  const eligibleRoiInvestments = investments.filter(inv => 
    inv.selectedOption.project.assetType === "FARMLAND" &&
    inv.selectedOption.paymentMode === "ONE_TIME"
  );

  let projectedRoiPercentage = 0;
  
  if (eligibleRoiInvestments.length > 0) {
    const totalEligibleInvestment = eligibleRoiInvestments.reduce((sum, inv) => sum + inv.amountPaid, 0);
    
    if (totalEligibleInvestment > 0) {
      // Calculate the weighted average ROI based on the actual invested amounts
      const weightedRoiSum = eligibleRoiInvestments.reduce((sum, inv) => {
        const roiPercent = inv.selectedOption.project.expectedRoiPercent || 0;
        return sum + (inv.amountPaid * roiPercent);
      }, 0);

      projectedRoiPercentage = weightedRoiSum / totalEligibleInvestment;
    }
  }

  // 4. Compute Next Payment accurately via Database
  const nextSchedule = await prisma.paymentSchedule.findFirst({
    where: {
      investment: {
        userId: userId,
        status: { in: ["PENDING", "PAYING"] } 
      },
      status: {
        in: ["UPCOMING", "PENDING", "OVERDUE"] 
      }
    },
    orderBy: {
      dueDate: 'asc' 
    }
  });

  let nextPayment = null;
  if (nextSchedule) {
    const today = new Date();
    const dueDate = new Date(nextSchedule.dueDate);

    // Normalize both dates to midnight to get a strict "day" difference 
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const dueMidnight = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());

    const diffTime = dueMidnight.getTime() - todayMidnight.getTime();
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    nextPayment = {
      amount: nextSchedule.amount,
      daysLeft: daysLeft < 0 ? 0 : daysLeft, // If negative (overdue), cap at 0
      dueDate: nextSchedule.dueDate.toISOString()
    };
  }

  // 5. Get Recent Transactions (Now using your new Transaction model!)
  const recentTransactions = await prisma.transaction.findMany({
    where: { userId: userId },
    include: {
      investment: {
        include: {
          selectedOption: {
            include: { project: true }
          }
        }
      }
    },
    orderBy: { timestamp: 'desc' },
    take: 5
  });

  // 6. Map to Frontend Structure
  return {
    totalInvested,      
    portfolioValue,     
    projectedRoiPercentage,  
    nextPayment,
    recentTransactions: recentTransactions.map(tx => ({
      id: tx.id,
      // Create a dynamic title based on the project they paid for
      title: `Payment: ${tx.investment.selectedOption.project.name}`,
      amount: tx.amount,
      datePaid: tx.timestamp.toISOString(),
      status: "PAID" // Transactions are inherently paid
    })),
    portfolioItems: investments.map(inv => {
      const totalSchedules = inv.schedules.length;
      const paidSchedules = inv.schedules.filter(s => s.status === "PAID").length;
      
      const percentageCompletion = totalSchedules > 0 
        ? Math.round((paidSchedules / totalSchedules) * 100) 
        : 0;

      // Ensure ROI only shows on the frontend if it's Farmland + Outright
      const isEligibleForRoi = 
        inv.selectedOption.project.assetType === "FARMLAND" && 
        inv.selectedOption.paymentMode === "ONE_TIME";

      return {
        id: inv.id,
        name: inv.selectedOption.project.name,
        projectName: inv.selectedOption.project.name,
        location: inv.selectedOption.project.location,
        projectImage: inv.selectedOption.project.projectImg,
        status: inv.status,
        expectedRoi: isEligibleForRoi ? inv.selectedOption.project.expectedRoiPercent : 0,
        percentageCompletion
      };
    })
  };
}