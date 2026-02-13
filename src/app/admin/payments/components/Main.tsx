"use client";

import React, { useState } from "react";
import { 
  Search, 
  Download, 
  FileText, 
  CheckCircle2, 
  Calendar,
  Briefcase 
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
    <div className="flex min-h-screen bg-[#f8f7f6] font-sans text-[#171512]">
      <main className="flex-1 p-6 lg:p-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#171512]/40 mb-2">
              <span>Management</span>
              <span className="text-[#d0a539]">&gt;</span>
              <span className="text-[#d0a539]">Transactions</span>
            </nav>
            <h1 className="text-4xl lg:text-5xl font-black text-[#171512] leading-none font-serif">
              Payment Records
            </h1>
          </div>
          <div>
            <div className="bg-[#171512] text-white px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-wider shadow-lg flex items-center gap-2">
               <FileText className="w-5 h-5 text-[#d0a539]" /> 
               <span>Total: {data.length} Records</span>
            </div>
          </div>
        </header>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-[#171512]/5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] overflow-hidden mb-8">
          <div className="p-6 flex flex-wrap items-center gap-6">
            <div className="flex-1 min-w-[300px] relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#171512]/30 w-5 h-5" />
              <input
                className="w-full pl-12 pr-4 py-3 bg-[#f8f7f6] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#d0a539]/20 outline-none placeholder-[#171512]/30"
                placeholder="Search by client name, reference, or project..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-[#171512]/5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8f7f6]/50 border-b border-[#171512]/5">
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40">Client</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40">Project Info</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40">Reference</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40 text-right">Date</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40 text-right">Amount</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#171512]/5">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-sm text-[#171512]/40 font-bold">
                      No transaction records found.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((tx) => (
                    <tr key={tx.id} className="hover:bg-[#f8f7f6]/40 transition-colors group">
                      {/* Client Info */}
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-bold text-[#171512]">{tx.userFullName}</p>
                          <p className="text-[10px] text-[#171512]/50 font-medium">{tx.userEmail}</p>
                        </div>
                      </td>

                      {/* Project Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded bg-[#f8f7f6] text-[#d0a539]">
                            <Briefcase className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#171512]">{tx.projectName}</p>
                            <p className="text-[9px] uppercase font-black text-[#171512]/30 tracking-wider">{tx.investmentType}</p>
                          </div>
                        </div>
                      </td>

                      {/* Reference */}
                      <td className="px-6 py-4">
                        <div className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#f8f7f6] border border-[#171512]/5">
                          <CheckCircle2 className="w-3 h-3 text-green-600" />
                          <span className="text-[10px] font-mono font-bold text-[#171512]/70">{tx.paymentReference}</span>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1 text-[#171512]/60">
                          <Calendar className="w-3 h-3" />
                          <span className="text-xs font-medium">{new Date(tx.date).toLocaleDateString()}</span>
                        </div>
                      </td>

                      {/* Amount */}
                      <td className="px-6 py-4 text-right">
                        <span className="text-sm font-black text-[#171512] font-serif">
                          {formatCurrency(tx.amount)}
                        </span>
                      </td>

                      {/* Action (Download) */}
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => generateTransactionReceipt(tx)}
                          className="bg-[#171512] text-white p-2 rounded-lg hover:bg-[#d0a539] hover:text-[#171512] transition-all shadow-md group-hover:scale-105"
                          title="Download Receipt"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}