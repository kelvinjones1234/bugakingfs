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
} from "lucide-react";
import ProjectDetailModal from "./ProjectDetailModal";
// -----------------------------------------------------------------------------
// 1. TYPE DEFINITIONS (Matching your getAllProjects return structure)
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

  if (type === "real-estate") {
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
    type.toLowerCase().includes("agro") ||
    type.toLowerCase().includes("farm") ||
    type === "agriculture"
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
  // Initialize state with data passed from Server Component
  const [projects] = useState<InvestmentProject[]>(initialProjects);

  // Filter State
  const [filterType, setFilterType] = useState("all");

  // Modal State
  const [selectedProject, setSelectedProject] =
    useState<InvestmentProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preSelectedPlanId, setPreSelectedPlanId] = useState<string | null>(
    null,
  );

  // Restore Pending Investment (LocalStorage Logic)
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

  // Filter Logic
  const filteredProjects =
    filterType === "all"
      ? projects
      : projects.filter((project) => project.investment_type === filterType);

  const handleOpenModal = (project: InvestmentProject) => {
    setSelectedProject(project);
    setPreSelectedPlanId(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-[#f8f7f6] text-[#171512] font-sans selection:bg-[#d0a539]/30">
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10">
        {/* Page Title & Controls */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[#d0a539] text-xs font-black uppercase tracking-[0.4em] mb-2 block">
              Investment Catalog
            </span>
            <h1 className="text-[#171512] text-xl md:text-2xl font-black tracking-tight uppercase">
              Comparative <span className="text-[#d0a539]">Listings</span>
            </h1>
          </div>

          <div className="flex flex-wrap gap-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-white border border-[#171512]/10 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-widest focus:ring-[#d0a539] focus:border-[#d0a539] outline-none cursor-pointer"
            >
              <option value="all">All Sectors</option>
              <option value="real-estate">Real Estate</option>
              <option value="agriculture">Agriculture</option>
            </select>
          </div>
        </div>

        {/* Project List */}
        <div className="space-y-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => {
              const isRealEstate = project.investment_type === "real-estate";

              const { icons, gradient, accentColor } = getProjectTheme(
                project.investment_type,
                project.expected_roi_percent,
                project.location,
                project.asset_type,
              );
              const isSoldOut = !project.active;

              return (
                <div
                  key={project.id}
                  className={`group bg-white border border-[#171512]/5 rounded-2xl overflow-hidden flex flex-col xl:flex-row transition-all hover:shadow-2xl hover:shadow-[#d0a539]/5 hover:border-[#d0a539]/20 relative ${gradient} ${
                    isSoldOut ? "opacity-80 grayscale-[50%]" : ""
                  }`}
                >
                  {/* Image Section */}
                  <div className="w-full xl:w-72 h-64 xl:h-auto flex-shrink-0 relative">
                    <div className="absolute inset-0 bg-[#171512]/10 group-hover:bg-transparent transition-colors z-10" />

                    {project.project_img ? (
                      <CldImage
                        src={project.project_img ?? ""} // dynamic public ID from DB
                        width={600}
                        height={400}
                        alt={project.name}
                        className="w-full h-full object-cover"
                        crop="fill"
                        sizes="(max-width: 768px) 100vw, 600px"
                      />
                    ) : (
                      <img
                        src="https://placehold.co/600x400"
                        alt="Placeholder"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Info Section */}
                  <div className="flex-grow p-8 flex flex-col justify-center border-b xl:border-b-0 xl:border-r border-[#171512]/5">
                    <div className="mb-6">
                      <span
                        className={`text-[10px] font-black uppercase tracking-[0.3em] ${accentColor}`}
                      >
                        {project.category_display}
                      </span>
                      <h3 className="text-lg md:text-xl font-black uppercase tracking-tight mt-1 text-[#171512]">
                        {project.name}
                      </h3>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {icons.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <item.Icon className={`w-5 h-5 ${accentColor}`} />
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-[#171512]/40">
                              {item.label}
                            </p>
                            <p className="text-sm font-bold text-[#171512] capitalize">
                              {item.val}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action / Pricing Section */}
                  <div className="xl:w-[450px] p-8 flex flex-col justify-between bg-[#171512]/5">
                    <table className="w-full mb-6">
                      <thead>
                        <tr className="text-[10px] font-black uppercase tracking-widest text-[#171512]/40 border-b border-[#171512]/10">
                          <th className="pb-2 text-left">Plan</th>
                          <th className="pb-2 text-right">Min. Entry</th>
                          {!isRealEstate && (
                            <th className="pb-2 text-right">ROI</th>
                          )}
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {project.pricing_options.slice(0, 2).map((option) => (
                          <tr
                            key={option.id}
                            className="border-b border-[#171512]/5 last:border-0"
                          >
                            <td className="py-3 font-semibold text-[#171512] capitalize truncate max-w-[100px]">
                              {option.plan_name}
                            </td>
                            <td className="py-3 text-right font-black text-[#171512]">
                              {formatCurrency(option.minimum_deposit)}
                            </td>
                            {!isRealEstate && (
                              <td className="py-3 text-right text-[#171512]/70">
                                {option.roi_start_display}
                              </td>
                            )}
                          </tr>
                        ))}
                        {project.pricing_options.length === 0 && (
                          <tr>
                            <td
                              colSpan={isRealEstate ? 2 : 3}
                              className="py-3 text-center text-xs italic opacity-50"
                            >
                              Pricing details unavailable
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>

                    <div className="space-y-4 w-full">
                      <button
                        onClick={() => handleOpenModal(project)}
                        className="bg-[#d0a539] flex justify-center w-full text-[#171512] pl-8 pr-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform whitespace-nowrap items-center gap-2 shadow-lg shadow-[#d0a539]/20"
                      >
                        Invest Now
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 text-[#171512]/50">
              <p className="font-bold uppercase tracking-widest">
                No projects found in this category.
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
