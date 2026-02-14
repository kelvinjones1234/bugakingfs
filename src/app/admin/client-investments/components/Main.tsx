"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  PlusCircle,
  Search,
  Layers,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import { UIClientInvestment } from "@/app/actions/clientInvestments";

// Currency Formatter
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Status Badge Styler
const getStatusStyles = (status: string) => {
  switch (status) {
    case "COMPLETED":
    case "EARNING":
      return {
        badge: "bg-green-50 text-green-700 border border-green-200",
        text: "text-green-600",
        bar: "bg-green-500",
      };
    case "PAYING":
      return {
        badge: "bg-[#d0a539]/10 text-[#d0a539] border border-[#d0a539]/20",
        text: "text-[#d0a539]",
        bar: "bg-[#d0a539]",
      };
    case "PENDING":
    default:
      return {
        badge: "bg-gray-100 text-gray-600 border border-gray-200",
        text: "text-gray-600",
        bar: "bg-gray-400",
      };
  }
};

interface MainProps {
  data: UIClientInvestment[];
}

export default function Main({ data }: MainProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSector, setFilterSector] = useState("All Sectors");

  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.clientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.projectName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector =
      filterSector === "All Sectors" || item.projectSector === filterSector;
    return matchesSearch && matchesSector;
  });

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
            <span className="text-[#d0a539]">Client Investment List</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171512] leading-tight font-serif">
            Client Investments
          </h1>
          <p className="text-[#171512]/50 mt-1.5 text-xs sm:text-sm font-medium">
            Managing all active and historical investment portfolios.
          </p>
        </div>
      </header>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[#171512]/40 w-4 sm:w-5 h-4 sm:h-5" />
          <input
            className="w-full pl-10 sm:pl-12 pr-4 py-3 bg-white border border-[#171512]/10 rounded-xl text-sm focus:ring-2 focus:ring-[#d0a539]/30 focus:border-[#d0a539] transition-all outline-none placeholder-[#171512]/40"
            placeholder="Search name, project, email..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="relative min-w-[150px] sm:min-w-[160px]">
            <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-[#d0a539] w-4 h-4" />
            <select
              className="w-full pl-10 pr-8 py-3 bg-white border border-[#171512]/10 rounded-xl text-xs font-bold uppercase tracking-widest appearance-none focus:ring-2 focus:ring-[#d0a539] focus:border-[#d0a539] outline-none"
              value={filterSector}
              onChange={(e) => setFilterSector(e.target.value)}
            >
              <option>All Sectors</option>
              <option>Real Estate</option>
              <option>Agriculture</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-[#171512]/5 overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[960px] sm:min-w-[1100px]">
            <thead>
              <tr className="bg-[#f8f7f6]/60 border-b border-[#171512]/5">
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] text-[#171512]/50">
                  Client
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] text-[#171512]/50">
                  Project
                </th>
                <th className="hidden sm:table-cell px-6 py-4 text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] text-[#171512]/50">
                  Plan
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] text-[#171512]/50 text-right">
                  Agreed
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] text-[#171512]/50 text-right">
                  Paid
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] text-[#171512]/50 text-center sm:text-left">
                  Status
                </th>
                <th className="hidden md:table-cell px-6 py-4 text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] text-[#171512]/50">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#171512]/5">
              {filteredData.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-10 text-center text-sm font-medium text-[#171512]/50"
                  >
                    No investments found.
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => {
                  const styles = getStatusStyles(item.status);
                  return (
                    <tr
                      key={item.id}
                      onClick={() =>
                        router.push(`/admin/client-investments/${item.id}`)
                      }
                      className="hover:bg-[#f8f7f6]/70 transition-colors duration-150 cursor-pointer group touch-manipulation"
                    >
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center gap-2.5 sm:gap-3">
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#171512] text-[#d0a539] flex items-center justify-center font-bold text-xs shrink-0">
                            {item.clientInitials}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-[#171512] text-sm truncate max-w-[140px] sm:max-w-none">
                              {item.clientName}
                            </p>
                            <p className="text-[10px] sm:text-xs text-[#171512]/50 truncate max-w-[140px] sm:max-w-none">
                              {item.clientEmail}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <p className="text-sm font-semibold text-[#171512] truncate max-w-[160px] sm:max-w-none">
                          {item.projectName}
                        </p>
                        <p className="text-[10px] sm:text-xs text-[#d0a539] font-bold uppercase tracking-wider">
                          {item.projectSector}
                        </p>
                      </td>

                      <td className="hidden sm:table-cell px-6 py-4">
                        <p className="text-sm font-medium text-[#171512]">
                          {item.planFrequency}
                        </p>
                        <p className="text-[10px] text-[#171512]/50 font-bold uppercase">
                          {item.planDurationDisplay}
                        </p>
                      </td>

                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-right">
                        <p className="text-sm font-bold text-[#171512] whitespace-nowrap">
                          {formatCurrency(item.agreedAmount)}
                        </p>
                      </td>

                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-right">
                        <p className="text-sm font-bold text-[#d0a539] whitespace-nowrap">
                          {formatCurrency(item.amountPaid)}
                        </p>
                      </td>

                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-center sm:text-left">
                        <span
                          className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-black uppercase tracking-widest ${styles.badge}`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="hidden md:table-cell px-6 py-4">
                        <div className="w-28 sm:w-32">
                          <div className="flex items-center justify-between mb-1">
                            <span
                              className={`text-[9px] sm:text-xs font-black ${styles.text}`}
                            >
                              {item.progressPercent.toFixed(1)}%
                            </span>
                          </div>
                          <div className="h-1 bg-[#171512]/5 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${styles.bar}`}
                              style={{ width: `${item.progressPercent}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
