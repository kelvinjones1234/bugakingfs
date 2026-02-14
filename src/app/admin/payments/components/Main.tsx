"use client";

import React, { useState } from "react";
import { 
  Search, 
  Download, 
  FileText, 
  CheckCircle2, 
  Calendar,
  Briefcase,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { AdminTransactionUI } from "@/app/actions/adminTransactions";
import { generateTransactionReceipt } from "../../../../../lib/utils/generateReceipt";

interface TransactionsMainProps {
  data: AdminTransactionUI[];
}

// Helper to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function Main({ data }: TransactionsMainProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // --- Filtering Logic ---
  const filteredData = data.filter((tx) =>
    tx.userFullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.paymentReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-10 pt-20 md:pt-[5rem] lg:pt-5 bg-[#f8f7f6] min-h-screen font-sans text-[#171512]">
      
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6 mb-6 sm:mb-10">
        <div>
          <nav className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#171512]/40 mb-1 sm:mb-2">
            <span className="hover:text-[#d0a539] transition-colors cursor-pointer">
              Admin Panel
            </span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#d0a539]">Transactions</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171512] leading-tight font-serif">
            Payment Records
          </h1>
          <p className="text-[#171512]/50 mt-1.5 text-xs sm:text-sm font-medium">
            Managing all client payment transactions and receipts.
          </p>
        </div>
        <div>
          <div className="w-full sm:w-auto bg-[#171512] text-white px-6 sm:px-8 py-3.5 sm:py-3 rounded-xl text-xs sm:text-sm font-black uppercase tracking-widest shadow-lg shadow-[#171512]/10 flex items-center justify-center gap-2">
             <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#d0a539]" /> 
             <span>Total: {data.length} Records</span>
          </div>
        </div>
      </header>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[#171512]/40 w-4 sm:w-5 h-4 sm:h-5" />
          <input
            className="w-full pl-10 sm:pl-12 pr-4 py-3 bg-white border border-[#171512]/10 rounded-xl text-sm focus:ring-2 focus:ring-[#d0a539]/30 focus:border-[#d0a539] transition-all outline-none placeholder-[#171512]/40"
            placeholder="Search by client name, reference, or project..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-[#171512]/5 overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px] sm:min-w-[960px]">
            <thead>
              <tr className="bg-[#f8f7f6]/60 border-b border-[#171512]/5">
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] text-[#171512]/50">
                  Client
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] text-[#171512]/50">
                  Project Info
                </th>
                <th className="hidden sm:table-cell px-6 py-4 text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] text-[#171512]/50">
                  Reference
                </th>
                <th className="hidden md:table-cell px-6 py-4 text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] text-[#171512]/50 text-right">
                  Date
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] text-[#171512]/50 text-right">
                  Amount
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] text-[#171512]/50 text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#171512]/5">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-sm font-medium text-[#171512]/50">
                    No transaction records found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredData.map((tx) => (
                  <tr key={tx.id} className="hover:bg-[#f8f7f6]/70 transition-colors duration-150 group">
                    
                    {/* Client Info */}
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#171512] text-[#d0a539] flex items-center justify-center font-bold text-xs shrink-0">
                          {tx.userFullName.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-[#171512] text-xs sm:text-sm truncate max-w-[140px] sm:max-w-none">
                            {tx.userFullName}
                          </p>
                          <p className="text-[9px] sm:text-[10px] text-[#171512]/50 font-medium truncate max-w-[140px] sm:max-w-none">
                            {tx.userEmail}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Project Info */}
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 sm:p-2 rounded bg-[#f8f7f6] border border-[#171512]/5 text-[#d0a539] shrink-0">
                          <Briefcase className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-bold text-[#171512] truncate max-w-[150px] sm:max-w-[200px]">
                            {tx.projectName}
                          </p>
                          <p className="text-[8px] sm:text-[9px] uppercase font-black text-[#d0a539] tracking-wider truncate">
                            {tx.investmentType.replace(/_/g, " ")}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Reference */}
                    <td className="hidden sm:table-cell px-6 py-4">
                      <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#f8f7f6] border border-[#171512]/5">
                        <CheckCircle2 className="w-3 h-3 text-green-600 shrink-0" />
                        <span className="text-[9px] sm:text-[10px] font-mono font-bold text-[#171512]/70 truncate max-w-[120px]">
                          {tx.paymentReference}
                        </span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="hidden md:table-cell px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 text-[#171512]/60">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium">
                          {new Date(tx.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-right">
                      <span className="text-xs sm:text-sm font-black text-[#171512] font-serif whitespace-nowrap">
                        {formatCurrency(tx.amount)}
                      </span>
                    </td>

                    {/* Action (Download) */}
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-right">
                      <div className="flex items-center justify-end">
                        <button 
                          onClick={() => generateTransactionReceipt(tx)}
                          className="bg-[#171512] text-white p-1.5 sm:p-2 rounded-lg hover:bg-[#d0a539] hover:text-[#171512] transition-all shadow-md active:scale-95"
                          title="Download Receipt"
                        >
                          <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-[#f8f7f6]/40 border-t border-[#171512]/5 flex items-center justify-between text-sm">
          <p className="text-[10px] sm:text-xs font-bold text-[#171512]/50 uppercase tracking-widest">
            Showing {filteredData.length} entries
          </p>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button className="w-8 h-8 sm:w-9 sm:h-9 rounded border border-[#171512]/10 flex items-center justify-center text-[#171512]/50 hover:text-[#d0a539] transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 sm:w-9 sm:h-9 rounded bg-[#d0a539] text-[#171512] flex items-center justify-center text-xs font-black">
              1
            </button>
            <button className="w-8 h-8 sm:w-9 sm:h-9 rounded border border-[#171512]/10 flex items-center justify-center text-[#171512]/50 hover:text-[#d0a539] transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}