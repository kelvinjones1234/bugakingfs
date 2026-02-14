"use client";
import { CldImage } from "next-cloudinary";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ChevronRight, 
  Plus, 
  Search, 
  MapPin, 
  Trash2, 
  Edit2, 
  Loader2,
  Layers,
  ChevronLeft,
  ChevronRight as ChevronRightIcon
} from "lucide-react";

// Import Server Actions
import { UIInvestmentProject } from "@/app/actions/getInvestments";
import { createInvestment } from "@/app/actions/createInvestment";
import { updateInvestment } from "@/app/actions/updateInvestment";
import { deleteInvestment } from "@/app/actions/deleteInvestment";
import { toggleInvestmentActive } from "@/app/actions/updateInvestment";

import AddInvestmentModal, {
  InvestmentFormState,
  InvestmentType,
  AssetType,
  PaymentMode,
} from "./AddInvestmentModal";

// --- Components ---
const TableToggle = ({
  checked,
  onClick,
  isLoading
}: {
  checked: boolean;
  onClick: () => void;
  isLoading: boolean;
}) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    disabled={isLoading}
    className={`relative inline-flex items-center select-none transition-all ${
      isLoading ? "opacity-50 cursor-wait" : "cursor-pointer opacity-100"
    }`}
  >
    <div
      className={`w-8 h-4 sm:w-10 sm:h-5 rounded-full shadow-inner transition-colors ${
        checked ? "bg-[#d0a539]/20" : "bg-[#171512]/10"
      }`}
    ></div>
    <div
      className={`absolute left-0.5 top-0.5 w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-transform shadow-sm flex items-center justify-center ${
        checked ? "translate-x-full bg-[#d0a539]" : "bg-white"
      }`}
    >
      {isLoading && <Loader2 className="w-2 h-2 sm:w-3 sm:h-3 animate-spin text-[#171512]" />}
    </div>
  </button>
);

interface InvestmentProjectsProps {
  data: UIInvestmentProject[];
}

export default function Main({ data }: InvestmentProjectsProps) {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [modalInitialData, setModalInitialData] = useState<Partial<InvestmentFormState> | null>(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSector, setFilterSector] = useState("All Sectors"); // 👈 Updated to Sector

  // Filtering Logic
  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
      
    // 👈 Checks if "Real Estate" matches "REAL_ESTATE" in the DB
    const matchesSector =
      filterSector === "All Sectors" || 
      item.investment_type.toUpperCase() === filterSector.toUpperCase().replace(" ", "_");
      
    return matchesSearch && matchesSector;
  });

  // --- Handlers ---
  const handleToggleStatus = async (project: UIInvestmentProject) => {
    setTogglingId(project.id);
    const newStatus = !project.active;
    const result = await toggleInvestmentActive(project.id, newStatus);
    if (result.success) {
      router.refresh();
    } else {
      alert("Failed to update status");
    }
    setTogglingId(null);
  };

  const handleEdit = (project: UIInvestmentProject) => {
    const mapInvType = (t: string) => t.toUpperCase().replace("-", "_") as InvestmentType;
    const mapAssetType = (t: string) => t.toUpperCase() as AssetType;
    
    const formattedForModal: InvestmentFormState = {
      name: project.name,
      investmentType: mapInvType(project.investment_type),
      assetType: mapAssetType(project.asset_type),
      location: project.location,
      investmentDetail: project.investment_detail,
      roiStartAfterDays: project.roi_start_after_days,
      expectedRoiPercent: project.expected_roi_percent,
      active: project.active,
      projectImg: null,
      projectImgUrl: project.project_img || undefined,
      pricingOptions: project.pricing_options.map((po) => ({
        id: po.id,
        tempId: po.id,
        planName: po.plan_name,
        durationDays: po.plan_duration_days,
        paymentMode: po.payment_mode as PaymentMode,
        totalPrice: po.total_price,
        minimumDeposit: po.minimum_deposit,
      })),
    };

    setEditingProjectId(project.id);
    setModalInitialData(formattedForModal);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingProjectId(null);
    setModalInitialData(null);
    setIsModalOpen(true);
  };

  const handleSave = async (payload: FormData) => {
    let result;
    if (editingProjectId) {
      result = await updateInvestment(editingProjectId, payload);
    } else {
      result = await createInvestment(payload);
    }
    if (result.success) {
      router.refresh();
    }
    return result;
  };

  const handleDelete = async (project: UIInvestmentProject) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${project.name}"?`
    );
    if (!confirmDelete) return;

    const result = await deleteInvestment(project.id);
    if (result.success) {
      router.refresh();
    } else {
      alert("Failed to delete: " + result.error);
    }
  };

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
            <span className="text-[#d0a539]">Investment Projects</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171512] leading-tight font-serif">
            Global Assets
          </h1>
          <p className="text-[#171512]/50 mt-1.5 text-xs sm:text-sm font-medium">
            Managing all available investment projects and real estate assets.
          </p>
        </div>
        <div>
          <button
            onClick={handleCreate}
            className="w-full sm:w-auto bg-[#d0a539] text-[#171512] px-6 sm:px-8 py-3.5 sm:py-3 rounded-xl text-xs sm:text-sm font-black uppercase tracking-widest shadow-lg shadow-[#d0a539]/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" /> New Project
          </button>
        </div>
      </header>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[#171512]/40 w-4 sm:w-5 h-4 sm:h-5" />
          <input
            className="w-full pl-10 sm:pl-12 pr-4 py-3 bg-white border border-[#171512]/10 rounded-xl text-sm focus:ring-2 focus:ring-[#d0a539]/30 focus:border-[#d0a539] transition-all outline-none placeholder-[#171512]/40"
            placeholder="Search projects or locations..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="relative w-full sm:w-auto min-w-[160px]">
            <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-[#d0a539] w-4 h-4" />
            {/* 👈 Updated Select Options */}
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
          <table className="w-full text-left border-collapse min-w-[800px] sm:min-w-[960px]">
            <thead>
              <tr className="bg-[#f8f7f6]/60 border-b border-[#171512]/5">
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] text-[#171512]/50">
                  Project Info
                </th>
                <th className="hidden sm:table-cell px-6 py-4 text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] text-[#171512]/50">
                  Location
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] text-[#171512]/50 text-center">
                  Sector
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] text-[#171512]/50 text-right">
                  Exp. ROI
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] text-[#171512]/50 text-center">
                  Active
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] text-[#171512]/50 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#171512]/5">
              {filteredData.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center text-sm font-medium text-[#171512]/50"
                  >
                    No investment projects found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredData.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-[#f8f7f6]/70 transition-colors duration-150 group"
                  >
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0 border border-[#171512]/5">
                          <CldImage
                            src={project.project_img ?? ""}
                            width={600}
                            height={400}
                            alt={project.name}
                            className="w-full h-full object-cover"
                            crop="fill"
                            sizes="(max-width: 768px) 100vw, 600px"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-[#171512] text-xs sm:text-sm truncate max-w-[140px] sm:max-w-[200px]">
                            {project.name}
                          </p>
                          <p className="text-[9px] sm:text-[10px] text-[#171512]/50 font-medium truncate max-w-[140px] sm:max-w-none lg:hidden">
                            {project.location}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-[#d0a539] shrink-0" />
                        <span className="text-[10px] sm:text-xs font-medium text-[#171512]/70 truncate max-w-[150px]">
                          {project.location}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-center">
                      <span className="px-2 py-0.5 border border-[#d0a539]/40 text-[#d0a539] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded bg-[#d0a539]/5 whitespace-nowrap">
                        {/* 👈 Replace underscore with space here */}
                        {project.investment_type.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-right">
                      <span className="text-xs sm:text-sm font-black text-[#171512] font-serif">
                        {project.expected_roi_percent}%
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-center">
                      <div className="flex justify-center">
                        <TableToggle
                          checked={project.active}
                          onClick={() => handleToggleStatus(project)}
                          isLoading={togglingId === project.id}
                        />
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 sm:gap-2">
                        <button
                          onClick={() => handleEdit(project)}
                          className="bg-[#171512] text-white p-1.5 sm:p-2 rounded-lg hover:bg-[#d0a539] hover:text-[#171512] transition-all"
                        >
                          <Edit2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(project)}
                          className="bg-red-500/10 text-red-600 p-1.5 sm:p-2 rounded-lg hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
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
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <AddInvestmentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProjectId(null);
          setModalInitialData(null);
        }}
        onSubmit={handleSave}
        initialData={modalInitialData}
      />
    </div>
  );
}