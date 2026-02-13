"use server";

import prisma from "../../../lib/data/prisma";

export interface AdminTransactionUI {
  id: string;
  userFullName: string;
  userEmail: string;
  projectName: string;
  investmentType: string;
  amount: number;
  paymentReference: string;
  status: "SUCCESS" | "FAILED" | "PENDING";
  date: string; // ISO String
  location: string;
}

export async function getAllAdminTransactions(): Promise<AdminTransactionUI[]> {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { timestamp: "desc" },
      include: {
        user: {
          select: { firstName: true, lastName: true, email: true },
        },
        investment: {
          select: {
            selectedOption: {
              select: {
                project: {
                  select: { name: true, investmentType: true },
                },
              },
            },
          },
        },
      },
    });

    return transactions.map((tx) => ({
      id: tx.id,
      userFullName: `${tx.user.firstName} ${tx.user.lastName}`,
      userEmail: tx.user.email,
      projectName: tx.investment.selectedOption.project.name,
      investmentType: tx.investment.selectedOption.project.investmentType,
      amount: tx.amount,
      paymentReference: tx.paymentReference || "N/A",
      status: "SUCCESS", // Assuming transactions in this table are successful
      date: tx.timestamp.toISOString(),
      location: tx.location || "N/A",
    }));
  } catch (error) {
    console.error("Fetch Admin Transactions Error:", error);
    return [];
  }
}