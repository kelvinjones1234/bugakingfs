"use server";
import { revalidatePath } from "next/cache";
import prisma from "../../../lib/data/prisma";
// --- Types for the UI ---
export interface UIClientInvestment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientInitials: string;
  projectName: string;
  projectSector: string;
  planFrequency: string; // e.g. "Monthly", "One-time"
  planDurationDisplay: string; // e.g. "12 Months", "Immediate"
  agreedAmount: number;
  amountPaid: number;
  status: "PENDING" | "PAYING" | "COMPLETED" | "EARNING";
  progressPercent: number;
}

// --- Helpers ---
const formatEnumString = (str: string) => 
  str.toLowerCase().replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const getInitials = (first: string, last: string) => 
  `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();

// --- Main Fetch Function ---
export async function getAllClientInvestments(): Promise<UIClientInvestment[]> {
  const investments = await prisma.clientInvestment.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { firstName: true, lastName: true, email: true },
      },
      selectedOption: {
        include: {
          project: {
            select: { name: true, investmentType: true },
          },
        },
      },
    },
  });

  return investments.map((inv) => {
    const project = inv.selectedOption.project;
    const pricing = inv.selectedOption;
    
    // Calculate progress
    const progress = inv.agreedAmount > 0 
      ? (inv.amountPaid / inv.agreedAmount) * 100 
      : 0;

    // Format Duration
    let durationDisplay = "Immediate";
    if (pricing.durationDays > 0) {
      const months = Math.round(pricing.durationDays / 30);
      durationDisplay = months >= 1 ? `${months} Months` : `${pricing.durationDays} Days`;
    }

    return {
      id: inv.id,
      clientName: `${inv.user.firstName} ${inv.user.lastName}`,
      clientEmail: inv.user.email,
      clientInitials: getInitials(inv.user.firstName, inv.user.lastName),
      projectName: project.name,
      projectSector: formatEnumString(project.investmentType),
      planFrequency: formatEnumString(pricing.paymentMode),
      planDurationDisplay: durationDisplay,
      agreedAmount: inv.agreedAmount,
      amountPaid: inv.amountPaid,
      status: inv.status,
      progressPercent: Math.min(progress, 100), // Cap at 100
    };
  });
}







export interface UISchedule {
  id: string;
  title: string;
  dueDate: string;
  amount: number;
  status: "UPCOMING" | "PENDING" | "PAID" | "OVERDUE";
  datePaid: string | null;
}

export interface UIInvestmentDetail {
  id: string;
  // Header Data
  status: "PENDING" | "PAYING" | "COMPLETED" | "EARNING";
  
  // Financial Overview
  agreedAmount: number;
  amountPaid: number;
  outstandingAmount: number;
  progressPercent: number;

  // Client Profile
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientInitials: string;
  clientAvatar?: string | null;

  // Project/Property Data
  projectName: string;
  projectLocation: string;
  projectImage: string | null;
  targetRoi: number;
  investmentType: string;

  // Payment Schedule
  schedules: UISchedule[];
}

// --- NEW FUNCTION: GET SINGLE DETAIL ---

export async function getClientInvestmentDetail(id: string): Promise<UIInvestmentDetail | null> {
  try {
    const investment = await prisma.clientInvestment.findUnique({
      where: { id },
      include: {
        user: {
          include: { profile: true },
        },
        selectedOption: {
          include: { project: true },
        },
        schedules: {
          orderBy: { dueDate: "asc" },
        },
      },
    });

    if (!investment) return null;

    // Calculations
    const progress = investment.agreedAmount > 0 
      ? (investment.amountPaid / investment.agreedAmount) * 100 
      : 0;

    return {
      id: investment.id,
      status: investment.status,
      
      agreedAmount: investment.agreedAmount,
      amountPaid: investment.amountPaid,
      outstandingAmount: investment.agreedAmount - investment.amountPaid,
      progressPercent: Math.min(progress, 100),

      clientName: `${investment.user.firstName} ${investment.user.lastName}`,
      clientEmail: investment.user.email,
      clientPhone: investment.user.phoneNumber || "N/A",
      clientInitials: getInitials(investment.user.firstName, investment.user.lastName),
      clientAvatar: investment.user.profile?.profilePicture,

      projectName: investment.selectedOption.project.name,
      projectLocation: investment.selectedOption.project.location,
      projectImage: investment.selectedOption.project.projectImg,
      targetRoi: investment.selectedOption.project.expectedRoiPercent,
      investmentType: formatEnumString(investment.selectedOption.project.investmentType),

      schedules: investment.schedules.map(s => ({
        id: s.id,
        title: s.title,
        dueDate: s.dueDate.toISOString().split("T")[0], // YYYY-MM-DD
        amount: s.amount,
        status: s.status,
        datePaid: s.datePaid ? s.datePaid.toISOString().split("T")[0] : null,
      })),
    }; 
  } catch (error) {
    console.error("Fetch Detail Error:", error);
    return null;
  }
}







export async function toggleScheduleStatus(
  scheduleId: string, 
  investmentId: string, 
  markAsPaid: boolean
) {
  try {
    // 1. Update the specific schedule
    await prisma.paymentSchedule.update({
      where: { id: scheduleId },
      data: {
        status: markAsPaid ? "PAID" : "UPCOMING",
        datePaid: markAsPaid ? new Date() : null,
      },
    });

    // 2. Recalculate Total Paid
    const aggregations = await prisma.paymentSchedule.aggregate({
      where: { investmentId: investmentId, status: "PAID" },
      _sum: { amount: true }
    });

    const newTotalPaid = aggregations._sum.amount || 0;

    // 3. Update Parent Investment
    await prisma.clientInvestment.update({
      where: { id: investmentId },
      data: {
        amountPaid: newTotalPaid,
        status: newTotalPaid > 0 ? "PAYING" : "PENDING"
      }
    });

    revalidatePath(`/admin/client-investments/${investmentId}`);
    return { success: true };
  } catch (error) {
    console.error("Toggle Schedule Error:", error);
    return { success: false, error: "Failed to update status" };
  }
}