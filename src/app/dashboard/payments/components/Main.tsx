"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Wallet,
  Search,
  Calendar,
  Filter,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  Hash,
} from "lucide-react";

// Import Server Action & Types
import { 
  getPaymentHistory, 
  TransactionUI, 
  TransactionStats 
} from "@/app/actions/paymentHistory";

const Main = () => {
  // --- State ---
  const [transactions, setTransactions] = useState<TransactionUI[]>([]);
  const [stats, setStats] = useState<TransactionStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Filters & Pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [sectorFilter, setSectorFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // --- Fetch Data (Using Server Action) ---
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Call Server Action
      const data = await getPaymentHistory(
        currentPage,
        searchQuery,
        sectorFilter
      );

      setTransactions(data.transactions);
      setStats(data.stats);
      setTotalCount(data.totalCount);
      setTotalPages(data.totalCount > 0 ? Math.ceil(data.totalCount / 10) : 1);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, sectorFilter]);

  // Trigger fetch on filter change
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 300); // Add debounce for search typing

    return () => clearTimeout(delayDebounceFn);
  }, [fetchData]);

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setCurrentPage(1);
      fetchData();
    }
  };

  // --- Helpers ---
  const formatCurrency = (amount: string | number) => {
    if (amount === undefined || amount === null) return "₦0.00";
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const getSectorColor = (type: string) => {
    if (!type) return "bg-gray-400";
    const normalizedType = type.toLowerCase().replace("-", " ");
    
    if (normalizedType.includes("agriculture")) return "bg-emerald-500";
    if (normalizedType.includes("real estate")) return "bg-[#d0a539]";
    if (normalizedType.includes("tech")) return "bg-blue-500";
    
    return "bg-gray-400";
  };

  // --- Render Components ---

  // 1. Mobile Card Render Logic
  const renderMobileCard = (txn: TransactionUI) => (
    <div
      key={txn.id}
      className="bg-white p-5 rounded-2xl border border-[#171512]/5 shadow-sm mb-4"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="font-serif font-bold text-[#171512] leading-tight">
              {txn.project_name || "Unknown Project"}
            </h3>
            <span className="text-[10px] uppercase font-black tracking-widest text-[#171512]/40">
              {txn.investment_type}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="font-black text-[#171512] text-lg">
            {formatCurrency(txn.amount)}
          </p>
          {txn.installment_number && (
            <span className="text-[10px] bg-[#171512]/5 px-2 py-1 rounded text-[#171512]/60 font-bold">
              Inst. #{txn.installment_number}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs border-t border-[#171512]/5 pt-4 mb-4">
        <div className="flex items-center gap-2 text-[#171512]/60">
          <Clock size={14} className="text-[#d0a539]" />
          <span>
            {txn.formatted_date} <br />{" "}
            <span className="text-[10px] opacity-70">{txn.formatted_time}</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-[#171512]/60">
          <MapPin size={14} className="text-[#d0a539]" />
          <span className="truncate">{txn.location || "N/A"}</span>
        </div>
        <div className="col-span-2 flex items-center gap-2 text-[#171512]/60 bg-[#f8f7f6] p-2 rounded-lg">
          <Hash size={14} className="text-[#d0a539]" />
          <span className="font-mono text-[10px] tracking-wider truncate w-full">
            Ref: {txn.payment_reference}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#f8f7f6] min-h-screen text-[#171512] font-sans">
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8 pt-24 lg:pt-10">
        {/* Page Header & Stats */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-start gap-6 mb-8 lg:mb-10">
          <div className="w-full lg:w-auto">
            <p className="text-[#d0a539] text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] mb-2">
              Financial Ledger
            </p>
            <h1 className="text-lg lg:text-3xl font-black text-[#171512] tracking-tight uppercase">
              Transaction History
            </h1>
          </div>

          <div className="w-full lg:w-auto bg-white p-6 rounded-2xl border border-[#171512]/10 shadow-sm min-w-[280px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#171512]/50 text-[10px] font-black uppercase tracking-widest">
                Total Payments
              </span>
              <Wallet className="text-[#d0a539]" size={20} />
            </div>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-2xl sm:text-3xl font-black text-[#171512]">
                {stats ? formatCurrency(stats.total_invested) : "..."}
              </span>
            </div>
          </div>
        </div>

        {/* Controls Toolbar */}
        <div className="bg-white p-4 rounded-xl border border-[#171512]/5 mb-6 flex flex-col md:flex-row items-stretch md:items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#171512]/40"
              size={18}
            />
            <input
              className="w-full pl-10 pr-4 py-3 bg-[#f8f7f6] border-none rounded-xl text-sm focus:ring-1 focus:ring-[#d0a539] outline-none transition-all placeholder:text-[#171512]/30"
              placeholder="Search ref, project..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchSubmit}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Date Filter (Static UI for now) */}
            <div className="relative w-full sm:w-auto">
              <select className="w-full sm:w-auto appearance-none bg-[#f8f7f6] border-none rounded-xl text-xs font-bold uppercase tracking-widest pl-4 pr-10 py-3 focus:ring-1 focus:ring-[#d0a539] cursor-pointer outline-none text-[#171512]">
                <option>All Time</option>
                <option>Last 30 Days</option>
                <option>Current Quarter</option>
              </select>
              <Calendar
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#d0a539]"
                size={16}
              />
            </div>

            {/* Sector Filter */}
            <div className="relative w-full sm:w-auto">
              <select
                className="w-full sm:w-auto appearance-none bg-[#f8f7f6] border-none rounded-xl text-xs font-bold uppercase tracking-widest pl-4 pr-10 py-3 focus:ring-1 focus:ring-[#d0a539] cursor-pointer outline-none text-[#171512]"
                value={sectorFilter}
                onChange={(e) => {
                  setSectorFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">All Sectors</option>
                <option value="agriculture">Agriculture</option>
                <option value="real-estate">Real Estate</option>
              </select>
              <Filter
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#d0a539]"
                size={16}
              />
            </div>
          </div>
        </div>

        {/* Data Display Section */}
        {loading ? (
          // Skeleton Loader
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white h-24 rounded-2xl animate-pulse border border-[#171512]/5"
              />
            ))}
          </div>
        ) : !transactions || transactions.length === 0 ? (
          // Empty State
          <div className="bg-white rounded-2xl p-12 text-center border border-[#171512]/5">
            <p className="text-[#171512]/50 font-medium">
              No transactions found matching your criteria.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-2xl border border-[#171512]/10 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#171512]/5 bg-[#171512]/[0.02]">
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40">
                        Date
                      </th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40">
                        Reference
                      </th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40">
                        Project
                      </th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40">
                        Location
                      </th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#171512]/5">
                    {transactions.map((txn) => (
                      <tr
                        key={txn.id}
                        className="hover:bg-[#d0a539]/[0.03] transition-colors group"
                      >
                        <td className="px-6 py-5">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-[#171512]">
                              {txn.formatted_date}
                            </span>
                            <span className="text-[10px] text-[#171512]/50 uppercase">
                              {txn.formatted_time}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="text-[#d0a539] font-mono text-xs font-bold tracking-wider">
                            {txn.payment_reference}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            <span
                              className={`h-2 w-2 rounded-full ${getSectorColor(
                                txn.investment_type
                              )}`}
                            ></span>
                            <span className="text-sm font-bold italic text-[#171512]">
                              {txn.project_name}
                            </span>
                          </div>
                          {txn.installment_number && (
                            <span className="text-[10px] text-[#171512]/40 ml-4 block mt-1">
                              Inst. #{txn.installment_number}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-5 text-sm text-[#171512]">
                          {txn.location || "-"}
                        </td>
                        <td className="px-6 py-5">
                          <span className="text-sm font-black text-[#171512]">
                            {formatCurrency(txn.amount)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards View */}
            <div className="md:hidden">
              {transactions.map((txn) => renderMobileCard(txn))}
            </div>
          </>
        )}

        {/* Pagination */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#171512]/40 text-center sm:text-left">
            Showing {transactions.length > 0 ? (currentPage - 1) * 10 + 1 : 0}{" "}
            to {Math.min(currentPage * 10, totalCount)} of {totalCount}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1 || loading}
              className="px-4 py-2 rounded-xl bg-white border border-[#171512]/10 hover:border-[#d0a539] transition-colors disabled:opacity-30 disabled:hover:border-[#171512]/10 text-[#171512]"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || loading}
              className="px-4 py-2 rounded-xl bg-white border border-[#171512]/10 hover:border-[#d0a539] transition-colors disabled:opacity-30 disabled:hover:border-[#171512]/10 text-[#171512]"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;