"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";
import {
  ChevronRight,
  FileText,
  History,
  Plus,
  Receipt,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  Loader2,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import { UIInvestmentDetail, toggleScheduleStatus } from "@/app/actions/clientInvestments";

// --- Utilities ---
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const getScheduleStatusStyle = (status: string) => {
  switch (status) {
    case "PAID":
      return "bg-green-100 text-green-700 border border-green-200";
    case "OVERDUE":
      return "bg-red-100 text-red-700 border border-red-200";
    case "UPCOMING":
      return "bg-[#d0a539]/10 text-[#d0a539] border border-[#d0a539]/30";
    default:
      return "bg-gray-100 text-gray-600 border border-gray-200";
  }
};

interface MainProps {
  data: UIInvestmentDetail;
}

export default function Main({ data }: MainProps) {
  const router = useRouter();
  // State to track which specific button is loading
  const [processingId, setProcessingId] = useState<string | null>(null);

  // --- Handlers ---
  const handleStatusChange = async (scheduleId: string, markAsPaid: boolean) => {
    setProcessingId(scheduleId);
    
    const result = await toggleScheduleStatus(scheduleId, data.id, markAsPaid);
    
    if (result.success) {
      router.refresh(); // Reloads the page data to update the financial cards
    } else {
      alert("Failed to update status. Please try again.");
    }
    
    setProcessingId(null);
  };

  return (
    <div className="flex-1 p-6 lg:p-10 bg-[#f8f7f6] min-h-screen font-sans text-[#171512]">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#171512]/40 mb-2">
            <a href="/admin/client-investments" className="hover:text-[#d0a539] transition-colors">
              Investments
            </a>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#d0a539]">#{data.id.slice(-6).toUpperCase()}</span>
          </nav>
          <div className="flex items-center gap-4">
            <h1 className="text-4xl lg:text-5xl font-black text-[#171512] leading-none font-serif">
              Investment Detail
            </h1>
            <span className="mt-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-[#d0a539] text-[#171512] border border-[#d0a539]/20">
              {data.status}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-[#171512]/10 text-[#171512] px-6 py-3 rounded-lg text-xs font-black uppercase tracking-wider hover:bg-[#f8f7f6] transition-all flex items-center gap-2 luxury-shadow">
            <FileText className="w-5 h-5" />
            Download Agreement
          </button>
          <button className="bg-[#171512] text-white px-6 py-3 rounded-lg text-xs font-black uppercase tracking-wider hover:bg-black transition-all flex items-center gap-2 shadow-lg">
            <History className="w-5 h-5" />
            Audit Log
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-8 space-y-8">
          {/* Financial Overview Card */}
          <section className="bg-white rounded-2xl border border-[#171512]/5 luxury-shadow p-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#171512]/40 mb-8">
              Financial Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div>
                <p className="text-xs font-bold text-[#171512]/40 uppercase mb-2">
                  Agreed Amount
                </p>
                <p className="text-3xl lg:text-4xl font-black text-[#d0a539]">
                  {formatCurrency(data.agreedAmount)}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-[#171512]/40 uppercase mb-2">
                  Total Paid
                </p>
                <p className="text-3xl lg:text-4xl font-black text-[#d0a539]">
                  {formatCurrency(data.amountPaid)}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-[#171512]/40 uppercase mb-2">
                  Outstanding
                </p>
                <p className="text-3xl lg:text-4xl font-black text-[#d0a539]">
                  {formatCurrency(data.outstandingAmount)}
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-[#171512] uppercase">
                  Payment Progress
                </span>
                <span className="text-xs font-black text-[#d0a539] uppercase">
                  {data.progressPercent.toFixed(1)}% Complete
                </span>
              </div>
              <div className="w-full h-4 bg-[#171512]/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#d0a539]"
                  style={{ width: `${data.progressPercent}%` }}
                ></div>
              </div>
            </div>
          </section>

          {/* Payment Schedule Table */}
          <section className="bg-white rounded-2xl border border-[#171512]/5 luxury-shadow overflow-hidden">
            <div className="p-8 flex items-center justify-between border-b border-[#171512]/5">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#171512]/40">
                Payment Schedule
              </h3>
              <button className="text-[#d0a539] text-[10px] font-black uppercase tracking-widest flex items-center gap-1 hover:text-[#b88e2f] transition-colors">
                <Plus className="w-4 h-4" />
                Add Installment
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#f8f7f6] text-[10px] font-black uppercase tracking-widest text-[#171512]/40">
                    <th className="px-8 py-4">Installment</th>
                    <th className="px-8 py-4">Due Date</th>
                    <th className="px-8 py-4">Amount</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#171512]/5">
                  {data.schedules.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-8 py-6 text-center text-sm text-[#171512]/40 font-bold">
                        No payment schedules generated yet.
                      </td>
                    </tr>
                  ) : (
                    data.schedules.map((schedule) => (
                      <tr key={schedule.id} className="hover:bg-[#f8f7f6]/50 transition-colors group">
                        <td className="px-8 py-5 font-bold text-sm text-[#171512]">
                          {schedule.title}
                        </td>
                        <td className="px-8 py-5 text-sm text-[#171512]/70">
                          {schedule.dueDate}
                        </td>
                        <td className="px-8 py-5 font-bold text-sm text-[#171512]">
                          {formatCurrency(schedule.amount)}
                        </td>
                        <td className="px-8 py-5">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${getScheduleStatusStyle(schedule.status)}`}>
                            {schedule.status}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            
                            {/* --- TOGGLE BUTTONS --- */}
                            {schedule.status === "PAID" ? (
                              <button 
                                onClick={() => handleStatusChange(schedule.id, false)}
                                disabled={!!processingId}
                                className="text-[#171512]/30 hover:text-red-600 transition-colors flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider"
                                title="Mark as Unpaid"
                              >
                                {processingId === schedule.id ? (
                                  <Loader2 className="w-4 h-4 animate-spin text-[#171512]" />
                                ) : (
                                  <>
                                    <RotateCcw className="w-3.5 h-3.5" />
                                    <span className="hidden group-hover:inline">Revert</span>
                                  </>
                                )}
                              </button>
                            ) : (
                              <button 
                                onClick={() => handleStatusChange(schedule.id, true)}
                                disabled={!!processingId}
                                className="bg-[#d0a539] text-[#171512] px-4 py-2 rounded text-[10px] font-black uppercase tracking-tighter hover:bg-[#b88e2f] hover:scale-105 transition-all flex items-center gap-1 shadow-sm disabled:opacity-50"
                              >
                                {processingId === schedule.id ? (
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                ) : (
                                  <>
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Mark Paid
                                  </>
                                )}
                              </button>
                            )}
                            
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-4 space-y-8">
          {/* Client Profile Card */}
          <section className="bg-white rounded-2xl border border-[#171512]/5 luxury-shadow p-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#171512]/40 mb-6">
              Client Profile
            </h3>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-[#171512] text-[#d0a539] flex items-center justify-center text-xl font-bold overflow-hidden">
                {data.clientAvatar ? (
                    <CldImage 
                        src={data.clientAvatar} 
                        width={64} 
                        height={64} 
                        alt={data.clientName}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span>{data.clientInitials}</span>
                )}
              </div>
              <div>
                <h4 className="text-xl font-bold text-[#171512] leading-none">
                  {data.clientName}
                </h4>
                <p className="text-sm text-[#171512]/40 mt-1">
                  Private Wealth Client
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f8f7f6] border border-[#171512]/5">
                <Mail className="w-5 h-5 text-[#d0a539]" />
                <div className="text-xs">
                  <p className="font-bold text-[#171512]">{data.clientEmail}</p>
                  <p className="text-[#171512]/40 font-medium">Primary Email</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f8f7f6] border border-[#171512]/5">
                <Phone className="w-5 h-5 text-[#d0a539]" />
                <div className="text-xs">
                  <p className="font-bold text-[#171512]">{data.clientPhone}</p>
                  <p className="text-[#171512]/40 font-medium">Verified Phone</p>
                </div>
              </div>
            </div>
          </section>

          {/* Property Details Card */}
          <section className="bg-white rounded-2xl border border-[#171512]/5 luxury-shadow overflow-hidden">
            <div className="w-full h-48 bg-gray-200 relative">
               {data.projectImage ? (
                 <CldImage
                   src={data.projectImage}
                   width={600}
                   height={300}
                   alt={data.projectName}
                   className="w-full h-full object-cover"
                 />
               ) : (
                 <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                    <MapPin className="w-8 h-8" />
                 </div>
               )}
            </div>
            <div className="p-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#171512]/40 mb-4">
                Property Details
              </h3>
              <h4 className="text-2xl font-black mb-1 text-[#171512] font-serif">
                {data.projectName}
              </h4>
              <p className="text-sm text-[#171512]/40 mb-6 flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {data.projectLocation}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#f8f7f6] border border-[#171512]/5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#171512]/40 mb-1">
                    Target ROI
                  </p>
                  <p className="text-lg font-bold text-[#171512]">{data.targetRoi}%</p>
                </div>
                <div className="p-4 rounded-xl bg-[#f8f7f6] border border-[#171512]/5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#171512]/40 mb-1">
                    Sector
                  </p>
                  <p className="text-lg font-bold text-[#d0a539]">{data.investmentType}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Admin Control Panel */}
          <section className="bg-[#171512] rounded-2xl p-8 text-white">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-6">
              Admin Control Panel
            </h3>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 block mb-2">
                  Global Investment Status
                </label>
                <div className="relative">
                  <select 
                    defaultValue={data.status}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm font-bold appearance-none focus:ring-1 focus:ring-[#d0a539] focus:border-[#d0a539] outline-none text-white"
                  >
                    <option value="PENDING">Pending Approval</option>
                    <option value="PAYING">Paying - Active</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="EARNING">Earning</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#d0a539] w-4 h-4 pointer-events-none" />
                </div>
              </div>
              <button className="w-full bg-[#d0a539] text-[#171512] py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-[1.02] transition-transform">
                Apply Status Update
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}