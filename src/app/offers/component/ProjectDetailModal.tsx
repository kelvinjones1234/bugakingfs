"use client";

import React, { useEffect, useState, useMemo, useCallback, memo } from "react";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import {
  X,
  ChevronDown,
  Info,
  BarChart3,
  Loader2,
  CheckCircle2,
  MapPin,
  Home,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { createClientInvestment } from "@/app/actions/createClientInvestment";

// --- Types (Matching Database/Server Action) ---
export interface PricingOption {
  id: string;
  plan_name: string;
  plan_duration_days: number;
  payment_mode: string;
  total_price: number;
  minimum_deposit: number;
  roi_start_display: string;
}

export interface InvestmentProject {
  id: string;
  name: string;
  investment_type: string;
  asset_type?: string;
  location: string;
  category_display: string;
  investment_detail?: string;
  roi_start_after_days?: number;
  project_img?: string | null;
  expected_roi_percent?: number;
  active?: boolean;
  pricing_options: PricingOption[];
}

interface ProjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: InvestmentProject | null;
  initialPlanId?: string | null;
}

// --- Static Formatter ---
const currencyFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const formatCurrency = (amount: string | number) => {
  return currencyFormatter.format(Number(amount));
};

// --- Sub-Components ---

// 1. Status View (Loading / Success)
const StatusView = memo(
  ({ status }: { status: "idle" | "loading" | "success" }) => (
    <div className="w-full flex flex-col items-center justify-center p-8 sm:p-12 text-center space-y-6 min-h-[400px]">
      {status === "loading" ? (
        <>
          <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 text-[#d0a539] animate-spin" />
          <div>
            <h3 className="text-xl sm:text-2xl font-black uppercase text-[#171512]">
              Processing Request
            </h3>
            <p className="text-sm sm:text-base text-[#171512]/60 mt-2">
              Securing your investment position...
            </p>
          </div>
        </>
      ) : (
        <>
          <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16 text-green-600 animate-in zoom-in duration-300" />
          <div>
            <h3 className="text-xl sm:text-2xl font-black uppercase text-[#171512]">
              Investment Initiated!
            </h3>
            <p className="text-sm sm:text-base text-[#171512]/60 mt-2">
              Redirecting you to your portfolio...
            </p>
          </div>
        </>
      )}
    </div>
  ),
);
StatusView.displayName = "StatusView";

// 2. Project Image Section (Using CldImage + Styling)
const ProjectImageSection = memo(
  ({ project }: { project: InvestmentProject }) => (
    <div className="w-full md:w-2/5 h-48 sm:h-56 md:h-auto relative overflow-hidden bg-[#171512] flex-shrink-0 group">
      {/* Cloudinary Image Implementation */}
      <CldImage
        src={project.project_img ?? ""}
        alt={project.name}
        width={800}
        height={1000}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        crop="fill"
        gravity="auto"
        sizes="(max-width: 768px) 100vw, 40vw"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#171512]/80 to-transparent pointer-events-none"></div>

      {/* Verified Badge & Ref */}
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 z-10">
        <span className="inline-block bg-[#d0a539]/90 text-[#171512] text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-2.5 py-1 sm:px-3 rounded mb-2 shadow-lg">
          Verified Listing
        </span>
        <p className="text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-80">
          Ref: BK-{project.id.slice(-4).toUpperCase()}
        </p>
      </div>
    </div>
  ),
);
ProjectImageSection.displayName = "ProjectImageSection";

// --- Main Component ---
const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  isOpen,
  onClose,
  project,
  initialPlanId,
}) => {
  const router = useRouter();
  const { data: session } = useSession(); // Using NextAuth Session

  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  // Initialize selected plan logic
  useEffect(() => {
    if (project?.pricing_options?.length) {
      if (initialPlanId) {
        const exists = project.pricing_options.some(
          (p) => p.id === initialPlanId,
        );
        setSelectedPlanId(
          exists ? initialPlanId : project.pricing_options[0].id,
        );
      } else {
        setSelectedPlanId(project.pricing_options[0].id);
      }
    }
  }, [project, initialPlanId]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Derive current plan
  const currentPlan = useMemo(() => {
    if (!project?.pricing_options) return null;
    return project.pricing_options.find((p) => p.id === selectedPlanId);
  }, [project, selectedPlanId]);

  // Handle Proceed (Server Action)
  const handleProceed = useCallback(async () => {
    if (!project || !currentPlan) return;

    // 1. Check Authentication
    if (!session) {
      const intent = {
        projectId: project.id,
        planId: selectedPlanId,
        timestamp: Date.now(),
      };
      localStorage.setItem("pending_investment", JSON.stringify(intent));
      router.push("/authentication/signin?returnUrl=/investments");
      return;
    }

    // 2. Execute Server Action
    try {
      setStatus("loading");

      const result = await createClientInvestment(selectedPlanId);

      if (result.success) {
        setStatus("success");
        localStorage.removeItem("pending_investment");

        // Redirect after delay
        const timer = setTimeout(() => {
          setStatus("idle");
          onClose();
          router.push("/dashboard/portfolio");
        }, 2000);

        return () => clearTimeout(timer);
      } else {
        console.error("Investment failed:", result.error);
        setStatus("idle");
        alert(result.error || "Failed to process investment.");
      }
    } catch (error) {
      console.error("Investment error", error);
      setStatus("idle");
      alert("An unexpected error occurred.");
    }
  }, [project, currentPlan, session, selectedPlanId, router, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center font-display pt-20 sm:pt-0">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#171512]/85 backdrop-blur-sm transition-opacity"
        onClick={status === "loading" ? undefined : onClose}
      />

      {/* Modal Container */}
      <div className="bg-white w-full sm:w-[95vw] sm:max-w-5xl sm:rounded-2xl rounded-t-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative z-10 animate-in fade-in slide-in-from-bottom sm:zoom-in-95 duration-300 max-h-[85vh] sm:max-h-[90vh]">
        {/* CLOSE BUTTON */}
        {status === "idle" && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 text-[#171512]/40 hover:text-[#171512] transition-colors bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}

        {/* LOGIC SPLIT: Loading/Success OR Content */}
        {status !== "idle" ? (
          <StatusView status={status} />
        ) : (
          <>
            {/* Left Column: Image */}
            <ProjectImageSection project={project} />

            {/* Right Column: Details */}
            <div className="w-full md:w-3/5 p-6 sm:p-8 lg:p-10 flex flex-col overflow-y-auto overscroll-contain">
              {/* Header Badge */}
              <div className="inline-flex items-center gap-2 border-b-2 border-[#d0a539] pb-1 self-start mb-6">
                <BarChart3 className="text-[#d0a539] w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#d0a539]">
                  Investment Overview
                </span>
              </div>

              {/* Project Title & Meta */}
              <div className="mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#171512] leading-tight mb-3 uppercase tracking-tight">
                  {project.name}
                </h2>

                <div className="flex flex-wrap gap-3 sm:gap-4 mb-4 text-[#171512]/60">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d0a539]" />
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                      {project.location}
                    </span>
                  </div>
                  {project.asset_type && (
                    <div className="flex items-center gap-1.5">
                      <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d0a539]" />
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                        {project.asset_type}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-2 sm:space-y-3 pt-3 border-t border-[#171512]/10">
                  <h4 className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#d0a539]">
                    Brief Analysis
                  </h4>
                  <p className="text-[#171512]/70 leading-relaxed text-xs sm:text-sm lg:text-base max-h-24 sm:max-h-32 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#d0a539]/20 scrollbar-track-transparent">
                    {project.investment_detail ||
                      "Premium investment opportunity."}
                  </p>
                </div>
              </div>

              {/* Form Section */}
              <div className="space-y-5 sm:space-y-6 mt-auto">
                {/* Select Input */}
                <div>
                  <label className="block text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#171512]/60 mb-2 sm:mb-3">
                    Select Payment Plan
                  </label>
                  <div className="relative">
                    <select
                      value={selectedPlanId}
                      onChange={(e) => setSelectedPlanId(e.target.value)}
                      className="w-full appearance-none bg-[#f8f7f6] border-2 border-[#d0a539]/20 focus:border-[#d0a539] rounded-xl px-4 py-3 sm:px-5 sm:py-4 text-xs sm:text-sm font-bold tracking-wide outline-none transition-all cursor-pointer text-[#171512]"
                    >
                      {project.pricing_options.length > 0 ? (
                        project.pricing_options.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.plan_name}
                          </option>
                        ))
                      ) : (
                        <option disabled>No plans available</option>
                      )}
                    </select>
                    <ChevronDown className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[#d0a539] pointer-events-none w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>

                {/* Financial Summary */}
                {/* Financial Summary */}
                <div className="bg-[#d0a539]/5 border border-[#d0a539]/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#171512]/40 mb-1">
                        Total Commitment
                      </p>
                      <p className="text-base sm:text-lg lg:text-xl font-black text-[#171512]">
                        {currentPlan
                          ? formatCurrency(currentPlan.total_price)
                          : "---"}
                      </p>
                    </div>

                    <div>
                      <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#171512]/40 mb-1">
                        Min. Deposit
                      </p>
                      <p className="text-base sm:text-lg lg:text-xl font-black text-[#d0a539]">
                        {currentPlan
                          ? formatCurrency(currentPlan.minimum_deposit)
                          : "---"}
                      </p>
                    </div>

                    {/* 👇 CONDITIONAL ROI DISPLAY: Only shows if asset_type is Farmland */}
                    {project.asset_type?.toLowerCase() === "farmland" && (
                      <div className="col-span-2">
                        <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#171512]/40 mb-1">
                          ROI Start Date
                        </p>
                        <p className="text-xs sm:text-sm font-black uppercase tracking-tighter mt-1 text-[#171512]">
                          {currentPlan ? currentPlan.roi_start_display : "---"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Area */}
                {/* Action Area */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-4 sm:pt-6 border-t border-[#171512]/5 gap-3 sm:gap-4 pb-2">
                  <div className="hidden sm:flex items-center gap-2 text-[#171512]/40">
                    <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest">
                      {session
                        ? "Next step: Invoice Generation"
                        : "Login Required to Invest"}
                    </span>
                  </div>

                  <button
                    onClick={handleProceed}
                    // 👇 FIX: Remove "disabled={status === 'loading'}"
                    // The component unmounts this button immediately when loading starts, so this check is redundant and causes the type error.
                    className="w-full sm:w-auto bg-[#d0a539] text-[#171512] px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] hover:bg-[#d0a539]/90 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[#d0a539]/20 flex items-center justify-center gap-2"
                  >
                    {session ? "Confirm & Proceed" : "Login to Continue"}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailModal;
