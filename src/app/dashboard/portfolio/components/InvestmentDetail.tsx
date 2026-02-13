"use client";

import React, { useEffect, useState, useMemo, memo } from "react";
// 1. Import CldImage
import { CldImage } from "next-cloudinary";
import {
  FileText,
  MapPin,
  CalendarClock,
  Clock,
  CalendarDays,
  ArrowLeft,
  AlertCircle,
  CreditCard,
  Loader2,
} from "lucide-react";
import { usePaystackPayment } from "react-paystack";
import { useSession } from "next-auth/react";
import { getInvestmentDetail } from "@/app/actions/portfolio";

// Define the shape based on the Server Action return type
type InvestmentDetailData = Awaited<ReturnType<typeof getInvestmentDetail>>;

// ==========================================
// 1. HELPERS
// ==========================================
const formatCurrency = (amount: string | number) => {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(num);
};

const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// ==========================================
// 2. SUB-COMPONENTS (Memoized)
// ==========================================

// --- Payment Button ---
interface PaymentButtonProps {
  amount: number;
  email: string;
  investmentId: string;
  onSuccess: (reference: any) => void;
  disabled: boolean;
}

const DetailPaymentButton = memo(
  ({
    amount,
    email,
    investmentId,
    onSuccess,
    disabled,
  }: PaymentButtonProps) => {
    const validEmail = email || "customer@bugaking.com";

    const config = useMemo(
      () => ({
        reference: "BKG_" + new Date().getTime().toString(),
        email: validEmail,
        amount: Math.ceil(amount * 100), // Convert to kobo
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY || "",
        metadata: {
          investment_id: investmentId,
          custom_fields: [
            {
              display_name: "Investment ID",
              variable_name: "investment_id",
              value: investmentId,
            },
          ],
        },
      }),
      [amount, validEmail, investmentId],
    );

    const initializePayment = usePaystackPayment(config);

    if (disabled || amount <= 0) return null;

    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          initializePayment({ onSuccess, onClose: () => {} });
        }}
        className="w-full sm:w-auto px-6 py-3 bg-[#d0a539] text-[#171512] font-black uppercase tracking-widest text-[10px] rounded-lg hover:bg-[#d0a539]/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#d0a539]/20"
      >
        <CreditCard className="w-4 h-4" />
        Pay Next Installment
      </button>
    );
  },
);
DetailPaymentButton.displayName = "DetailPaymentButton";

// --- Stat Card ---
const StatCard = memo(
  ({
    label,
    value,
    subText,
    highlightColor,
    isFullWidth,
  }: {
    label: string;
    value: string | number;
    subText?: React.ReactNode;
    highlightColor?: string;
    isFullWidth?: boolean;
  }) => (
    <div
      className={`p-4 bg-[#f8f7f6] rounded-xl border border-[#171512]/5 ${
        isFullWidth ? "col-span-2 md:col-span-1" : ""
      }`}
    >
      <p className="text-[10px] text-[#171512]/40 font-black uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className={`text-lg font-black ${highlightColor || "text-[#171512]"}`}>
        {value}
      </p>
      {subText && <div className="mt-1">{subText}</div>}
    </div>
  ),
);
StatCard.displayName = "StatCard";

// --- Schedule Table Row ---
const ScheduleRow = memo(({ schedule }: { schedule: any }) => (
  <tr className="hover:bg-[#d0a539]/5 transition-colors group border-b border-[#171512]/5 last:border-0">
    <td className="px-6 py-5 text-sm font-bold text-[#171512]">
      {schedule.title}
    </td>
    <td className="px-6 py-5 text-sm text-[#171512]/60 font-medium">
      {schedule.formatted_date || formatDate(schedule.due_date)}
    </td>
    <td className="px-6 py-5 text-sm font-black text-[#171512]">
      {formatCurrency(schedule.amount)}
    </td>
    <td className="px-6 py-5">
      {schedule.status === "paid" && (
        <span className="px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest flex items-center w-fit gap-1.5 border border-green-200">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Paid
        </span>
      )}
      {schedule.status === "pending" && (
        <span className="px-3 py-1.5 rounded-full bg-[#d0a539]/10 text-[#d0a539] text-[10px] font-black uppercase tracking-widest flex items-center w-fit gap-1.5 border border-[#d0a539]/20">
          <Clock className="w-3 h-3" /> Due
        </span>
      )}
      {schedule.status === "upcoming" && (
        <span className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-500 text-[10px] font-black uppercase tracking-widest flex items-center w-fit gap-1.5 border border-gray-200">
          <CalendarDays className="w-3 h-3" /> Upcoming
        </span>
      )}
      {schedule.status === "overdue" && (
        <span className="px-3 py-1.5 rounded-full bg-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest flex items-center w-fit gap-1.5 border border-red-200">
          <AlertCircle className="w-3 h-3" /> Overdue
        </span>
      )}
    </td>
  </tr>
));
ScheduleRow.displayName = "ScheduleRow";

// ==========================================
// 3. MAIN COMPONENT
// ==========================================
interface DetailProps {
  id: number | string;
  onBack: () => void;
}

const InvestmentDetail = ({ id, onBack }: DetailProps) => {
  const { data: session } = useSession();

  const [investment, setInvestment] = useState<InvestmentDetailData>(null);
  const [loading, setLoading] = useState(true);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const data = await getInvestmentDetail(id);
      setInvestment(data);
    } catch (error) {
      console.error("Failed to load investment details", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handlePaymentSuccess = () => {
    alert("Payment Successful! Refreshing details...");
    fetchDetail();
  };

  if (loading) {
    return (
      <main className="flex-1 p-10 bg-[#f8f7f6] min-h-screen pt-24 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <Loader2 className="w-8 h-8 text-[#d0a539] animate-spin" />
          <div className="text-[#171512]/40 font-black tracking-widest uppercase text-xs">
            Loading Details...
          </div>
        </div>
      </main>
    );
  }

  if (!investment)
    return (
      <div className="p-10 text-center text-gray-500 pt-24">
        Investment not found.
      </div>
    );

  const isAgric = investment.investment_type === "agriculture";
  const nextPayment = investment.next_payment_data;

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-10 bg-[#f8f7f6] min-h-screen text-[#171512] pt-24 lg:pt-10">
      {/* Header */}
      <header className="flex justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-3 bg-white border border-[#171512]/10 rounded-full hover:bg-[#171512] hover:text-white transition-all group shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="w-5 h-5 text-[#171512] group-hover:text-white transition-colors" />
          </button>
          <div>
            <h2 className="text-lg lg:text-2xl font-black text-[#171512] tracking-tight uppercase">
              {investment.project_name}
            </h2>
            <div className="flex items-center gap-2 text-[#171512]/50 text-xs font-medium mt-1">
              <span className="uppercase tracking-widest">
                Investment Details
              </span>
              <span className="w-1 h-1 rounded-full bg-[#171512]/30" />
              <span className="uppercase">#{investment.id.slice(-6)}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Top Section: Overview Card */}
        <div className="bg-white rounded-[2rem] border border-[#171512]/5 shadow-sm overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* 2. CHANGE: Image replaced with CldImage */}
            <div className="w-full lg:w-[400px] h-64 lg:h-auto relative bg-gray-100 shrink-0">
              <CldImage
                src={investment.project_image || "placeholder"}
                alt={investment.project_name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-white/90 backdrop-blur-md text-[#171512] text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg border border-white/50">
                  {investment.status}
                </span>
              </div>
            </div>

            {/* Right: Content */}
            <div className="flex-1 p-6 md:p-10 flex flex-col justify-between gap-8">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif font-black text-[#171512] leading-tight mb-2">
                    {formatCurrency(investment.agreed_amount)}
                  </h3>
                  <p className="flex items-center gap-2 text-[#171512]/50 text-xs font-bold uppercase tracking-widest">
                    <MapPin className="w-4 h-4 text-[#d0a539]" />{" "}
                    {investment.location}
                  </p>
                </div>

                {/* Pay Button */}
                <DetailPaymentButton
                  amount={nextPayment?.amount || 0}
                  email={session?.user?.email || ""}
                  investmentId={investment.id}
                  onSuccess={handlePaymentSuccess}
                  disabled={!nextPayment || nextPayment.amount <= 0}
                />
              </div>

              {/* Stats Grid */}
              <div
                className={`grid gap-4 ${isAgric ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-2 lg:grid-cols-3"}`}
              >
                <StatCard
                  label="Balance Remaining"
                  value={formatCurrency(investment.balance)}
                  highlightColor="text-[#d0a539]"
                  isFullWidth={true}
                />

                <StatCard
                  label="Progress"
                  value={`${investment.percentage_completion}%`}
                  subText={
                    <span className="block w-full h-1.5 bg-[#171512]/5 rounded-full mt-2 overflow-hidden">
                      <span
                        className="block h-full bg-[#d0a539] rounded-full"
                        style={{
                          width: `${investment.percentage_completion}%`,
                        }}
                      />
                    </span>
                  }
                />

                <StatCard
                  label="Next Due Date"
                  value={
                    nextPayment ? formatDate(nextPayment.due_date) : "Completed"
                  }
                  highlightColor={
                    (nextPayment?.days_left ?? 0) <= 0 &&
                    nextPayment?.days_left !== undefined
                      ? "text-red-600"
                      : ""
                  }
                  subText={
                    nextPayment && (
                      <span
                        className={`block text-[10px] font-medium mt-1 ${
                          (nextPayment.days_left ?? 0) < 0
                            ? "text-red-500"
                            : "text-[#171512]/40"
                        }`}
                      >
                        {(nextPayment.days_left ?? 0) > 0
                          ? `${nextPayment.days_left} Days remaining`
                          : (nextPayment.days_left ?? 0) === 0
                            ? "Due Today"
                            : `Overdue by ${Math.abs(nextPayment.days_left ?? 0)} days`}
                      </span>
                    )
                  }
                />

                {isAgric && (
                  <StatCard
                    label="Projected ROI"
                    value={`${investment.roi}%`}
                    subText={
                      <span className="text-xs text-[#171512]/30 font-medium">
                        p.a.
                      </span>
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Payment Schedule & Docs */}
        <div className="pb-10">
          {/* Payment Schedule */}
          <div className="">
            <div className="flex items-center gap-3">
              <div className="bg-[#171512] p-2 rounded-lg text-white">
                <CalendarClock className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-black uppercase tracking-tight">
                Payment Schedule
              </h4>
            </div>

            <div className="bg-white rounded-2xl border border-[#171512]/5 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                  <thead>
                    <tr className="bg-[#f8f7f6] border-b border-[#171512]/5 text-[#171512]/40 text-[10px] font-black uppercase tracking-[0.2em]">
                      <th className="px-6 py-4">Installment</th>
                      <th className="px-6 py-4">Due Date</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#171512]/5">
                    {investment.schedules?.map((schedule: any) => (
                      <ScheduleRow key={schedule.id} schedule={schedule} />
                    ))}
                    {!investment.schedules?.length && (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-6 py-8 text-center text-sm text-[#171512]/40"
                        >
                          No payment schedule available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Optional: Add a Docs or Updates section in the 3rd column if needed later */}
        </div>
      </div>
    </main>
  );
};

export default InvestmentDetail;
