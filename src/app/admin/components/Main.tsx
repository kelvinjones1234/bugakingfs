import React from "react";
import {
  Plus,
  Users,
  Landmark,
  TrendingUp,
  Clock,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  PieChart,
  ChevronRight,
} from "lucide-react";
import { getDashboardData } from "@/app/actions/adminDashboard";

// --- Types & Interfaces ---
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive?: boolean;
  isActionRequired?: boolean;
  icon: React.ReactNode;
}

const AdminCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive,
  isActionRequired,
  icon,
}) => (
  <div className="bg-white p-6 rounded-2xl border-t-4 border-[#d0a539]/20 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]">
    <div className="flex justify-between items-start mb-4">
      {icon}
      {isActionRequired ? (
        <span className="bg-[#d0a539]/20 text-[#d0a539] px-2 py-0.5 rounded text-[10px] font-black">
          ACTION REQ.
        </span>
      ) : (
        <span
          className={`text-xs font-bold ${isPositive ? "text-emerald-500" : "text-red-500"}`}
        >
          {change}
        </span>
      )}
    </div>
    <p className="text-xs font-bold uppercase tracking-widest text-[#171512]/40 mb-1">
      {title}
    </p>
    <p className="text-3xl font-black text-[#171512]">{value}</p>
  </div>
);

// This is your Main component, turned into an async Server Component
export default async function Main() {
  // Fetch dynamic data right here on the server
  const data = await getDashboardData();

  const statsData: StatCardProps[] = [
    {
      title: "Total Users",
      value: data.stats.totalUsers,
      change: "Live",
      isPositive: true,
      icon: <Users className="text-[#d0a539]" />,
    },
    {
      title: "Active Investments",
      value: data.stats.activeInvestments,
      change: "Live",
      isPositive: true,
      icon: <Landmark className="text-[#d0a539]" />,
    },
    // --- UPDATED STAT CARD ---
    {
      title: "Initiated Investments",
      value: data.stats.initiatedInvestments,
      change: "Live",
      isPositive: true,
      icon: <TrendingUp className="text-[#d0a539]" />,
    },
    // -------------------------
    {
      title: "Pending Approvals",
      value: data.stats.pendingApprovals,
      change: "ACTION REQ.",
      isActionRequired: Number(data.stats.pendingApprovals) > 0,
      icon: <Clock className="text-[#d0a539]" />,
    },
  ];

  return (
    <main className="flex-1 p-6 lg:p-10 bg-[#f8f7f6] min-h-screen font-sans text-[#171512]">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#171512]/40 mb-2">
            <span>Management</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#d0a539]">Command Center</span>
          </nav>
          <h1 className="text-4xl lg:text-5xl font-black text-[#171512] leading-none italic font-serif">
            Admin Dashboard
          </h1>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {statsData.map((stat, index) => (
          <AdminCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Left Column: Recent Investments Table */}
        <div className="xl:col-span-8">
          <div className="bg-white rounded-2xl border border-[#171512]/5 overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]">
            <div className="p-6 border-b border-[#171512]/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-2xl font-black italic font-serif">
                Recent Investments
              </h2>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 py-1.5 border border-[#171512]/10 rounded-lg text-xs font-bold text-[#171512]/60 hover:bg-gray-50">
                  <Filter className="w-4 h-4" /> Filter
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 border border-[#171512]/10 rounded-lg text-xs font-bold text-[#171512]/60 hover:bg-gray-50">
                  <ArrowUpDown className="w-4 h-4" /> Sort
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#f8f7f6] border-b border-[#171512]/5">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40">
                      User
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40">
                      Project
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40">
                      Date
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#171512]/5">
                  {data.recentInvestments.length > 0 ? (
                    data.recentInvestments.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-[#f8f7f6]/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#171512]/5 flex items-center justify-center font-bold text-xs">
                              {item.user.initials}
                            </div>
                            <div>
                              <p className="text-sm font-bold">
                                {item.user.name}
                              </p>
                              <p className="text-[10px] text-[#171512]/40 uppercase font-bold">
                                {item.user.tier}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium">{item.project}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-[#171512]/60">
                            {item.date}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-[#d0a539]">
                            {item.amount}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-[#171512]/30 hover:text-[#d0a539] transition-colors">
                            <MoreHorizontal className="w-5 h-5 ml-auto" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-8 text-center text-sm font-bold text-[#171512]/40"
                      >
                        No recent investments found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-[#171512]/5 flex justify-center">
              <button className="text-xs font-bold uppercase tracking-widest text-[#d0a539] hover:underline">
                View All Transactions
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Payments & Portfolio */}
        <div className="xl:col-span-4 space-y-8">
          {/* Payments Pipeline */}
          <div className="bg-white rounded-2xl border border-[#171512]/5 overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]">
            <div className="p-6 border-b border-[#171512]/5">
              <h3 className="text-2xl font-black italic font-serif">
                Payments Pipeline
              </h3>
            </div>
            <div className="p-6 space-y-6">
              {data.paymentsData.length > 0 ? (
                data.paymentsData.map((payment) => (
                  <div
                    key={payment.id}
                    className={`flex items-start justify-between gap-4 p-4 rounded-xl border transition-all ${
                      payment.status === "Overdue"
                        ? "border-red-500/10 bg-red-500/[0.02] hover:border-red-500/30"
                        : "border-[#171512]/5 hover:border-[#d0a539]/20"
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            payment.status === "Overdue"
                              ? "bg-red-500/10 text-red-500"
                              : "bg-[#d0a539]/10 text-[#d0a539]"
                          }`}
                        >
                          {payment.status}
                        </span>
                        <span className="text-[10px] font-bold text-[#171512]/40">
                          #{payment.id}
                        </span>
                      </div>
                      <p className="text-sm font-bold">{payment.user}</p>
                      <p className="text-xs text-[#171512]/60">
                        {payment.type}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black">{payment.amount}</p>
                      <p
                        className={`text-[10px] font-bold uppercase ${
                          payment.status === "Overdue"
                            ? "text-red-500"
                            : "text-[#171512]/40"
                        }`}
                      >
                        {payment.timeLabel}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-xs font-bold text-[#171512]/40 py-4">
                  No pending payments.
                </p>
              )}

              <button className="w-full py-3 border-2 border-dashed border-[#171512]/10 rounded-xl text-xs font-bold uppercase tracking-widest text-[#171512]/40 hover:border-[#d0a539] hover:text-[#d0a539] transition-all">
                View Payment Calendar
              </button>
            </div>
          </div>

          {/* Portfolio Diversity */}
          <div className="bg-[#171512] p-8 rounded-2xl text-white relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d0a539] mb-4">
                Portfolio Diversity
              </p>
              <div className="space-y-4">
                {data.portfolio.map((item, idx) => (
                  <div key={item.name}>
                    <div
                      className={`flex items-center justify-between mb-1 ${idx !== 0 ? "pt-2" : ""}`}
                    >
                      <span className="text-xs font-bold uppercase">
                        {item.name}
                      </span>
                      <span className="text-xs font-bold text-[#d0a539]">
                        {item.percentage}%
                      </span>
                    </div>
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${idx === 0 ? "bg-[#d0a539]" : "bg-[#d0a539]/60"}`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Background Decoration */}
            <PieChart className="absolute -bottom-8 -right-8 w-[180px] h-[180px] text-white/5 pointer-events-none" />
          </div>
        </div>
      </div>
    </main>
  );
}
