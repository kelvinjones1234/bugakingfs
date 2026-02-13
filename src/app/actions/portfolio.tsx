"use server";

import prisma from "../../../lib/data/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

export async function getInvestmentDetail(investmentId: string | number) {
  const session = await getServerSession();
  if (!session?.user) throw new Error("Unauthorized");

  const userId = (session.user as any).id;
  const id = String(investmentId); // Ensure string for MongoDB

  // 1. Fetch Investment with Relations
  const investment = await prisma.clientInvestment.findUnique({
    where: { 
      id: id,
      userId: userId // Security check: ensure it belongs to the user
    },
    include: {
      selectedOption: {
        include: {
          project: true
        }
      },
      schedules: {
        orderBy: { dueDate: 'asc' }
      }
    }
  });

  if (!investment) return null;

  // 2. Calculate Derived Data
  const totalAmount = investment.agreedAmount;
  const paidAmount = investment.amountPaid;
  const balance = totalAmount - paidAmount;
  const percentage = totalAmount > 0 
    ? Math.min(100, Math.round((paidAmount / totalAmount) * 100)) 
    : 0;

  // 3. Find Next Payment
  // Priority: Overdue -> Pending -> Upcoming
  const nextSchedule = investment.schedules.find(s => 
    s.status === "OVERDUE" || s.status === "PENDING" || s.status === "UPCOMING"
  );

  const daysLeft = nextSchedule 
    ? Math.ceil((nextSchedule.dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0;

  // 4. Map to Frontend Interface (Snake_case to match your component expectation if needed, 
  // or refactor component to camelCase. I will map to match your EXISTING component code to save you work)
  return {
    id: investment.id,
    project_name: investment.selectedOption.project.name,
    investment_type: investment.selectedOption.project.investmentType.toLowerCase(),
    location: investment.selectedOption.project.location,
    status: investment.status,
    agreed_amount: totalAmount,
    balance: balance,
    percentage_completion: percentage,
    project_image: investment.selectedOption.project.projectImg,
    roi: investment.selectedOption.project.expectedRoiPercent,
    
    // Next Payment Object
    next_payment_data: nextSchedule ? {
      amount: nextSchedule.amount,
      due_date: nextSchedule.dueDate.toISOString(),
      days_left: daysLeft
    } : null,

    // Schedules List
    schedules: investment.schedules.map(s => ({
      id: s.id,
      title: s.title,
      due_date: s.dueDate.toISOString(),
      amount: s.amount,
      status: s.status.toLowerCase(), // 'paid', 'pending', etc.
      formatted_date: s.datePaid?.toISOString() // Optional
    }))
  };
}







// ... existing imports ...

export async function getInvestments(category?: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return [];

  const userId = (session.user as any).id;

  // Build Filter
  const whereClause: any = { userId };

  if (category && category !== "all") {
    // Map URL slug to DB value (adjust casing matches your DB)
    const typeMap: Record<string, string> = {
      "real-estate": "Real Estate",
      "agriculture": "Agriculture",
    };
    
    if (typeMap[category]) {
      whereClause.selectedOption = {
        project: {
          investmentType: typeMap[category] 
        }
      };
    }
  }

  // Fetch from DB
  const investments = await prisma.clientInvestment.findMany({
    where: whereClause,
    include: {
      selectedOption: {
        include: { project: true }
      },
      schedules: {
        orderBy: { dueDate: 'asc' }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  // Map to Frontend Interface
  return investments.map(inv => {
    const total = inv.agreedAmount;
    const paid = inv.amountPaid;
    const balance = total - paid;
    const percentage = total > 0 ? Math.min(100, Math.round((paid / total) * 100)) : 0;

    // Logic for "Next Payment"
    // Find first schedule that is NOT paid
    const nextSchedule = inv.schedules.find(s => 
      s.status === "OVERDUE" || s.status === "PENDING" || s.status === "UPCOMING"
    );

    const daysLeft = nextSchedule 
      ? Math.ceil((nextSchedule.dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      : 0;

    return {
      id: inv.id, // String (MongoDB ID)
      project_name: inv.selectedOption.project.name,
      project_image: inv.selectedOption.project.projectImg,
      location: inv.selectedOption.project.location,
      status: inv.status.toLowerCase(), // 'active', 'completed', etc.
      category_tag: inv.selectedOption.project.investmentType,
      agreed_amount: total,
      balance: balance,
      percentage_completion: percentage,
      roi: inv.selectedOption.project.expectedRoiPercent,
      
      next_payment_data: nextSchedule ? {
        title: nextSchedule.title,
        amount: nextSchedule.amount,
        due_date: nextSchedule.dueDate.toISOString(),
        days_left: daysLeft
      } : null
    };
  });
}