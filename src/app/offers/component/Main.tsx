"use client";

import { CldImage } from "next-cloudinary";
import React, { useEffect, useState } from "react";
import {
  Wallet,
  ShieldCheck,
  Leaf,
  Factory,
  Landmark,
  ArrowRight,
  LucideIcon,
  Briefcase,
  MapPin,
  Home,
  ZoomIn,
  X,
} from "lucide-react";
import ProjectDetailModal from "./ProjectDetailModal";

// -----------------------------------------------------------------------------
// 1. TYPE DEFINITIONS
// -----------------------------------------------------------------------------

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
  asset_type: string;
  location: string;
  category_display: string;
  investment_detail: string;
  roi_start_after_days: number;
  project_img: string | null;
  expected_roi_percent: number;
  active: boolean;
  pricing_options: PricingOption[];
}

interface MainProps {
  initialProjects: InvestmentProject[];
}

// -----------------------------------------------------------------------------
// 2. Helper Functions & Theme Logic
// -----------------------------------------------------------------------------

const formatCurrency = (amount: string | number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(amount));
};

interface ThemeIconData {
  Icon: LucideIcon;
  label: string;
  val: string;
}

const getProjectTheme = (
  type: string,
  roi: number,
  location: string,
  assetType?: string,
) => {
  let icons: ThemeIconData[];
  let gradient: string;
  let accentColor: string;

  const normalizedType = type.toLowerCase().replace("_", "-");

  if (normalizedType === "real-estate") {
    icons = [
      { Icon: MapPin, label: "Location", val: location || "Prime Area" },
      {
        Icon: Home,
        label: "Asset Type",
        val: assetType || "Tangible Property",
      },
      { Icon: Briefcase, label: "Ownership", val: "Verified Title" },
    ];
    gradient =
      "bg-[linear-gradient(135deg,rgba(208,165,57,0.05)_0%,rgba(26,26,26,0)_100%)]";
    accentColor = "text-[#d0a539]";
  } else if (
    normalizedType.includes("agro") ||
    normalizedType.includes("farm") ||
    normalizedType === "agriculture"
  ) {
    icons = [
      { Icon: Leaf, label: "Harvest Cycle", val: `${roi}% Post-Harvest` },
      { Icon: Factory, label: "Operations", val: "AI Monitoring" },
      { Icon: Landmark, label: "Backing", val: "Govt Supported" },
    ];
    gradient =
      "bg-[linear-gradient(135deg,rgba(72,187,120,0.05)_0%,rgba(26,26,26,0)_100%)]";
    accentColor = "text-green-600";
  } else {
    icons = [
      { Icon: Wallet, label: "Steady Returns", val: `${roi}% Annual Yield` },
      { Icon: ShieldCheck, label: "Managed Assets", val: "Full Maintenance" },
      { Icon: Briefcase, label: "Security", val: "Insured Capital" },
    ];
    gradient =
      "bg-[linear-gradient(135deg,rgba(208,165,57,0.05)_0%,rgba(26,26,26,0)_100%)]";
    accentColor = "text-[#d0a539]";
  }

  return { icons, gradient, accentColor };
};

// -----------------------------------------------------------------------------
// 3. Main Component
// -----------------------------------------------------------------------------

const Main = ({ initialProjects }: MainProps) => {
  const [projects] = useState<InvestmentProject[]>(initialProjects);
  const [filterType, setFilterType] = useState("all");

  // Modal & Lightbox State
  const [selectedProject, setSelectedProject] =
    useState<InvestmentProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preSelectedPlanId, setPreSelectedPlanId] = useState<string | null>(
    null,
  );
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);

  // Prevent background scrolling when modals/lightboxes are open
  useEffect(() => {
    if (isModalOpen || fullScreenImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen, fullScreenImage]);

  // Restore Pending Investment
  useEffect(() => {
    if (projects.length > 0) {
      const pendingData = localStorage.getItem("pending_investment");
      if (pendingData) {
        try {
          const intent = JSON.parse(pendingData);
          const targetProject = projects.find((p) => p.id === intent.projectId);
          if (targetProject) {
            setSelectedProject(targetProject);
            setPreSelectedPlanId(intent.planId);
            setIsModalOpen(true);
          }
        } catch (e) {
          localStorage.removeItem("pending_investment");
        }
      }
    }
  }, [projects]);

  // Filter Logic (Handles REAL_ESTATE vs real-estate)
  const filteredProjects = projects.filter((project) => {
    if (filterType === "all") return true;
    const normalizedType = project.investment_type
      .toLowerCase()
      .replace("_", "-");
    return normalizedType === filterType;
  });

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = (project: InvestmentProject) => {
    setSelectedProject(project);
    setPreSelectedPlanId(null);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-[#f8f7f6] text-[#171512] font-sans selection:bg-[#d0a539]/30 min-h-screen">
      {/* --- Fullscreen Image Lightbox --- */}
      {fullScreenImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setFullScreenImage(null)}
        >
          <button
            className="absolute top-6 right-6 lg:top-10 lg:right-10 text-white/70 hover:text-[#d0a539] hover:rotate-90 transition-all duration-300 z-[101]"
            onClick={(e) => {
              e.stopPropagation();
              setFullScreenImage(null);
            }}
          >
            <X size={36} strokeWidth={2} />
          </button>

          <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-black">
            {fullScreenImage.includes("placehold") ? (
              <img
                src={fullScreenImage}
                alt="Expanded Project"
                className="w-full h-full object-contain bg-black"
              />
            ) : (
              <CldImage
                src={fullScreenImage}
                alt="Expanded Project"
                fill
                className="object-contain bg-[#171512]"
                sizes="100vw"
              />
            )}
          </div>
        </div>
      )}

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10">
        {/* Page Title & Controls */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white p-6 sm:p-8 rounded-2xl border border-[#171512]/5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.03)]">
          <div>
            <span className="text-[#d0a539] text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] mb-2 block">
              Investment Catalog
            </span>
            <h1 className="text-[#171512] text-2xl md:text-3xl lg:text-4xl font-black tracking-tight uppercase font-serif">
              Comparative <span className="text-[#d0a539]">Listings</span>
            </h1>
          </div>

          <div className="flex w-full md:w-auto">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full md:w-auto bg-[#f8f7f6] border border-[#171512]/10 rounded-xl px-5 py-3.5 text-xs font-bold uppercase tracking-widest focus:ring-2 focus:ring-[#d0a539]/30 focus:border-[#d0a539] outline-none cursor-pointer appearance-none transition-all shadow-sm"
            >
              <option value="all">All Sectors</option>
              <option value="real-estate">Real Estate</option>
              <option value="agriculture">Agriculture</option>
            </select>
          </div>
        </div>

        {/* Project List */}
        <div className="space-y-6 lg:space-y-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => {
              const normalizedType = project.investment_type
                .toLowerCase()
                .replace("_", "-");
              const isRealEstate = normalizedType === "real-estate";
              const isSoldOut = !project.active;
              const imageSrc =
                project.project_img || "https://placehold.co/600x400";

              const { icons, gradient, accentColor } = getProjectTheme(
                project.investment_type,
                project.expected_roi_percent,
                project.location,
                project.asset_type,
              );

              return (
                <div
                  key={project.id}
                  className={`group bg-white border border-[#171512]/5 rounded-2xl overflow-hidden flex flex-col xl:flex-row transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:border-[#d0a539]/20 relative ${gradient} ${
                    isSoldOut ? "opacity-75 grayscale-[40%]" : ""
                  }`}
                >
                  {/* Image Section (Clickable) */}
                  <div
                    className="w-full xl:w-[320px] h-56 sm:h-72 xl:h-auto flex-shrink-0 relative cursor-zoom-in overflow-hidden"
                    onClick={() => setFullScreenImage(imageSrc)}
                  >
                    <div className="absolute inset-0 bg-[#171512]/20 group-hover:bg-[#171512]/40 transition-colors duration-300 z-10 flex items-center justify-center">
                      <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10 scale-75 group-hover:scale-100" />
                    </div>

                    {project.project_img ? (
                      <CldImage
                        src={project.project_img}
                        width={600}
                        height={400}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        crop="fill"
                        sizes="(max-width: 1280px) 100vw, 320px"
                      />
                    ) : (
                      <img
                        src={imageSrc}
                        alt="Placeholder"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}

                    {/* Status Badge Over Image on Mobile */}
                    {isSoldOut && (
                      <div className="absolute top-4 left-4 z-20 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                        Sold Out
                      </div>
                    )}
                  </div>

                  {/* Info Section */}
                  <div className="flex-grow p-6 sm:p-8 flex flex-col justify-center border-b xl:border-b-0 xl:border-r border-[#171512]/5">
                    <div className="mb-6 sm:mb-8">
                      <span
                        className={`text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] ${accentColor}`}
                      >
                        {project.category_display ||
                          project.investment_type.replace("_", " ")}
                      </span>
                      <h3 className="text-md sm:text-xl font-black uppercase tracking-tight mt-1.5 text-[#171512] leading-tight">
                        {project.name}
                      </h3>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                      {icons.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 sm:gap-3"
                        >
                          <item.Icon
                            className={`w-4 h-4 sm:w-5 sm:h-5 mt-0.5 ${accentColor} shrink-0`}
                          />
                          <div className="min-w-0">
                            <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#171512]/40 truncate">
                              {item.label}
                            </p>
                            <p className="text-xs sm:text-sm font-bold text-[#171512] capitalize truncate">
                              {item.val}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing / Action Section */}
                  <div className="xl:w-[400px] p-6 sm:p-8 flex flex-col justify-between bg-[#f8f7f6]/50">
                    <div className="mb-6">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-[#171512]/40 mb-4 pb-2 border-b border-[#171512]/10">
                        Available Entry Plans
                      </h4>

                      <div className="space-y-3">
                        {project.pricing_options.slice(0, 3).map((option) => (
                          <div
                            key={option.id}
                            className="flex items-center justify-between text-sm group/plan"
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-1.5 h-1.5 rounded-full bg-[#171512]/20 group-hover/plan:bg-[#d0a539] transition-colors`}
                              />
                              <span className="font-bold text-[#171512]/70 capitalize truncate max-w-[120px] sm:max-w-[160px]">
                                {option.plan_name}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="font-black text-[#171512]">
                                {formatCurrency(option.minimum_deposit)}
                              </span>
                              {!isRealEstate && option.roi_start_display && (
                                <span className="block text-[9px] font-bold text-[#d0a539] uppercase tracking-wider mt-0.5">
                                  {option.roi_start_display}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}

                        {project.pricing_options.length === 0 && (
                          <div className="text-center py-4 bg-white rounded-lg border border-dashed border-[#171512]/10">
                            <p className="text-xs font-bold text-[#171512]/40 uppercase tracking-widest">
                              Pricing TBD
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-auto pt-4">
                      <button
                        onClick={() => handleOpenModal(project)}
                        disabled={isSoldOut}
                        className={`w-full flex justify-center items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-widest transition-all ${
                          isSoldOut
                            ? "bg-[#171512]/10 text-[#171512]/40 cursor-not-allowed"
                            : "bg-[#d0a539] text-[#171512] hover:bg-[#171512] hover:text-[#d0a539] shadow-lg shadow-[#d0a539]/20 hover:shadow-xl hover:-translate-y-0.5"
                        }`}
                      >
                        {isSoldOut ? "Currently Unavailable" : "View & Invest"}
                        {!isSoldOut && <ArrowRight className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-4 bg-white rounded-2xl border border-[#171512]/5">
              <div className="w-16 h-16 bg-[#f8f7f6] rounded-full flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-[#171512]/20" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-widest text-[#171512] mb-2">
                No Projects Found
              </h3>
              <p className="text-sm font-medium text-[#171512]/50 text-center max-w-md">
                We currently don't have active projects in this specific
                category. Please check back later or view our other sectors.
              </p>
            </div>
          )}
        </div>
      </main>

      <ProjectDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
        initialPlanId={preSelectedPlanId}
      />
    </div>
  );
};

export default Main;
