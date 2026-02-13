"use server";

import { Prisma } from "@prisma/client";
import prisma from "../../../lib/data/prisma";

// --- Types ---
export interface TransactionUI {
  id: string;
  amount: number;
  payment_reference: string;
  location: string;
  formatted_date: string;
  formatted_time: string;
  project_name: string;
  investment_type: string;
  installment_number?: number | null;
}

export interface TransactionStats {
  total_invested: number;
}

export interface PaymentHistoryResponse {
  transactions: TransactionUI[];
  stats: TransactionStats;
  totalCount: number;
}

// --- Helper to format date ---
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
};

// --- Main Action ---
export async function getPaymentHistory(
  page: number = 1,
  search: string = "",
  sector: string = ""
): Promise<PaymentHistoryResponse> {
  const PAGE_SIZE = 10;
  const skip = (page - 1) * PAGE_SIZE;

  // 1. Build Dynamic Filter
  const whereClause: Prisma.TransactionWhereInput = {};

  if (search) {
    whereClause.OR = [
      { paymentReference: { contains: search, mode: "insensitive" } },
      {
        investment: {
          selectedOption: {
            project: {
              name: { contains: search, mode: "insensitive" },
            },
          },
        },
      },
    ];
  }

  if (sector && sector !== "All") {
    // Note: Assuming InvestmentType enum matches sector string or requires mapping
    // If sector is "real-estate", we map to "REAL_ESTATE" enum if necessary
    const sectorEnum = sector.toUpperCase().replace("-", "_") as any;
    
    whereClause.investment = {
      selectedOption: {
        project: {
          investmentType: sectorEnum,
        },
      },
    };
  }

  try {
    // 2. Fetch Transactions with Relations
    const [transactionsRaw, totalCount, totalAgg] = await Promise.all([
      prisma.transaction.findMany({
        where: whereClause,
        orderBy: { timestamp: "desc" },
        skip,
        take: PAGE_SIZE,
        include: {
          investment: {
            include: {
              selectedOption: {
                include: {
                  project: {
                    select: { name: true, investmentType: true },
                  },
                },
              },
            },
          },
        },
      }),
      // 3. Get Total Count for Pagination
      prisma.transaction.count({ where: whereClause }),
      // 4. Get Total Stats (Sum of all transactions in DB)
      prisma.transaction.aggregate({
        _sum: { amount: true },
      }),
    ]);

    // 5. Transform Data for UI
    const transactions: TransactionUI[] = transactionsRaw.map((tx) => ({
      id: tx.id,
      amount: tx.amount, // Prisma returns Float (or Decimal), JS handles as number usually
      payment_reference: tx.paymentReference || "N/A",
      location: tx.location,
      formatted_date: formatDate(tx.timestamp),
      formatted_time: formatTime(tx.timestamp),
      project_name: tx.investment.selectedOption.project.name,
      investment_type: tx.investment.selectedOption.project.investmentType
        .toLowerCase()
        .replace("_", " "),
      installment_number: tx.installmentNumber,
    }));

    return {
      transactions,
      stats: {
        total_invested: totalAgg._sum.amount || 0,
      },
      totalCount,
    };
  } catch (error) {
    console.error("Server Action Error:", error);
    return {
      transactions: [],
      stats: { total_invested: 0 },
      totalCount: 0,
    };
  }
}