// "use client";

// import { CldImage } from "next-cloudinary";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { ChevronRight, Plus, Search, MapPin, Trash2, Edit2, Loader2 } from "lucide-react";

// // Import Server Actions
// import { UIInvestmentProject } from "@/app/actions/getInvestments";
// import { createInvestment } from "@/app/actions/createInvestment";
// import { updateInvestment } from "@/app/actions/updateInvestment";
// import { deleteInvestment } from "@/app/actions/deleteInvestment";
// // 👇 Import the new action
// import { toggleInvestmentActive } from "@/app/actions/updateInvestment";

// import AddInvestmentModal, {
//   InvestmentFormState,
//   InvestmentType,
//   AssetType,
//   PaymentMode,
// } from "./AddInvestmentModal";

// // --- Components ---
// // 👇 Updated to be interactive
// const TableToggle = ({ 
//   checked, 
//   onClick, 
//   isLoading 
// }: { 
//   checked: boolean; 
//   onClick: () => void;
//   isLoading: boolean;
// }) => (
//   <button 
//     onClick={(e) => {
//       e.stopPropagation(); // Prevent row click if you add that later
//       onClick();
//     }}
//     disabled={isLoading}
//     className={`relative inline-flex items-center select-none transition-all ${
//       isLoading ? "opacity-50 cursor-wait" : "cursor-pointer opacity-100"
//     }`}
//   >
//     <div
//       className={`w-8 h-4 rounded-full shadow-inner transition-colors ${
//         checked ? "bg-[#d0a539]/20" : "bg-[#171512]/10"
//       }`}
//     ></div>
//     <div
//       className={`absolute left-0.5 top-0.5 w-3 h-3 rounded-full transition-transform shadow-sm flex items-center justify-center ${
//         checked ? "translate-x-full bg-[#d0a539]" : "bg-white"
//       }`}
//     >
//       {/* Show tiny spinner inside the toggle knob if loading */}
//       {isLoading && <Loader2 className="w-2 h-2 animate-spin text-[#171512]" />}
//     </div>
//   </button>
// );

// interface InvestmentProjectsProps {
//   data: UIInvestmentProject[];
// }

// export default function Main({ data }: InvestmentProjectsProps) {
//   const router = useRouter();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  
//   // 👇 Track which ID is currently toggling to show loading state
//   const [togglingId, setTogglingId] = useState<string | null>(null);

//   const [modalInitialData, setModalInitialData] =
//     useState<Partial<InvestmentFormState> | null>(null);

//   // --- Handlers ---

//   // 👇 New Handler for Toggling
//   const handleToggleStatus = async (project: UIInvestmentProject) => {
//     setTogglingId(project.id);
    
//     // Calculate new status
//     const newStatus = !project.active;

//     const result = await toggleInvestmentActive(project.id, newStatus);

//     if (result.success) {
//       router.refresh(); // Refresh to show updated data
//     } else {
//       alert("Failed to update status");
//     }
    
//     setTogglingId(null);
//   };

//   const handleEdit = (project: UIInvestmentProject) => {
//     const mapInvType = (t: string) =>
//       t.toUpperCase().replace("-", "_") as InvestmentType;
//     const mapAssetType = (t: string) => t.toUpperCase() as AssetType;

//     const formattedForModal: InvestmentFormState = {
//       id: project.id,
//       name: project.name,
//       investmentType: mapInvType(project.investment_type),
//       assetType: mapAssetType(project.asset_type),
//       location: project.location,
//       investmentDetail: project.investment_detail,
//       roiStartAfterDays: project.roi_start_after_days,
//       expectedRoiPercent: project.expected_roi_percent,
//       active: project.active,
//       projectImg: project.project_img || null,
    
//       pricingOptions: project.pricing_options.map((po) => ({
//         id: po.id,
//         tempId: po.id,
//         planName: po.plan_name,
//         durationDays: po.plan_duration_days,
//         paymentMode: po.payment_mode as PaymentMode,
//         totalPrice: po.total_price,
//         minimumDeposit: po.minimum_deposit,
//       })),
//     };

//     setEditingProjectId(project.id);
//     setModalInitialData(formattedForModal);
//     setIsModalOpen(true);
//   };

//   const handleCreate = () => {
//     setEditingProjectId(null);
//     setModalInitialData(null);
//     setIsModalOpen(true);
//   };

//   const handleSave = async (payload: FormData) => {
//     let result;
//     if (editingProjectId) {
//       result = await updateInvestment(editingProjectId, payload);
//     } else {
//       result = await createInvestment(payload);
//     }

//     if (result.success) {
//       router.refresh();
//     }
//     return result;
//   };

//   const handleDelete = async (project: UIInvestmentProject) => {
//     const confirmDelete = window.confirm(
//       `Are you sure you want to delete "${project.name}"?`
//     );
//     if (!confirmDelete) return;

//     const result = await deleteInvestment(project.id);
//     if (result.success) {
//       router.refresh();
//     } else {
//       alert("Failed to delete: " + result.error);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-[#f8f7f6] font-sans text-[#171512]">
//       {/* Main Content */}
//       <main className="flex-1 p-6 lg:p-10">
//         <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
//           <div>
//             <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#171512]/40 mb-2">
//               <span>Management</span>
//               <ChevronRight className="w-3 h-3" />
//               <span className="text-[#d0a539]">Investment Projects</span>
//             </nav>
//             <h1 className="text-4xl lg:text-5xl font-black text-[#171512] leading-none font-serif">
//               Global Assets
//             </h1>
//           </div>
//           <div>
//             <button
//               onClick={handleCreate}
//               className="bg-[#d0a539] text-[#171512] px-8 py-3 rounded-lg text-sm font-bold uppercase tracking-wider shadow-lg shadow-[#d0a539]/20 hover:scale-[1.02] transition-all flex items-center gap-2"
//             >
//               <Plus className="w-5 h-5" /> New Project
//             </button>
//           </div>
//         </header>

//         {/* Filters & Table Card */}
//         <div className="bg-white rounded-2xl border border-[#171512]/5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] overflow-hidden">
//           <div className="p-6 border-b border-[#171512]/5 flex flex-wrap items-center gap-6">
//             <div className="flex-1 min-w-[300px] relative">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#171512]/30 w-5 h-5" />
//               <input
//                 className="w-full pl-12 pr-4 py-3 bg-[#f8f7f6] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#d0a539]/20 outline-none placeholder-[#171512]/30"
//                 placeholder="Search projects..."
//                 type="text"
//               />
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="bg-[#f8f7f6]/50 border-b border-[#171512]/5">
//                   <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40">
//                     Project Info
//                   </th>
//                   <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40">
//                     Location
//                   </th>
//                   <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40 text-center">
//                     Sector
//                   </th>
//                   <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40 text-right">
//                     Exp. ROI
//                   </th>
//                   <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40 text-center">
//                     Active
//                   </th>
//                   <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40 text-right">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-[#171512]/5">
//                 {data.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={6}
//                       className="px-6 py-8 text-center text-sm text-[#171512]/40 font-bold"
//                     >
//                       No investment projects found. Click "New Project" to add
//                       one.
//                     </td>
//                   </tr>
//                 ) : (
//                   data.map((project) => (
//                     <tr
//                       key={project.id}
//                       className="hover:bg-[#f8f7f6]/40 transition-colors group"
//                     >
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-4">
//                           <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-[#171512]/5">
//                             <CldImage
//                               src={project.project_img ?? ""}
//                               width={600}
//                               height={400}
//                               alt={project.name}
//                               className="w-full h-full object-cover"
//                               crop="fill"
//                               sizes="(max-width: 768px) 100vw, 600px"
//                             />
//                           </div>
//                           <div>
//                             <p className="text-sm font-bold text-[#171512]">
//                               {project.name}
//                             </p>
//                             <p className="text-[10px] text-[#171512]/50 font-medium">
//                               {project.location}
//                             </p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-1.5">
//                           <MapPin className="w-4 h-4 text-[#d0a539]" />
//                           <span className="text-xs font-medium text-[#171512]/70">
//                             {project.location}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 text-center">
//                         <span className="px-2 py-0.5 border border-[#d0a539]/40 text-[#d0a539] text-[10px] font-bold uppercase tracking-wider rounded bg-[#d0a539]/5">
//                           {project.investment_type}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-right">
//                         <span className="text-sm font-black text-[#171512] font-serif">
//                           {project.expected_roi_percent}%
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-center">
//                         <div className="flex justify-center">
//                           {/* 👇 Using the interactive Toggle */}
//                           <TableToggle 
//                             checked={project.active} 
//                             onClick={() => handleToggleStatus(project)}
//                             isLoading={togglingId === project.id}
//                           />
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 text-right">
//                         <div className="flex items-center justify-end gap-2">
//                           <button
//                             onClick={() => handleEdit(project)}
//                             className="bg-[#171512] text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg hover:bg-[#d0a539] hover:text-[#171512] transition-all"
//                           >
//                             <Edit2 className="w-3 h-3" />
//                           </button>
//                           <button
//                             onClick={() => handleDelete(project)}
//                             className="bg-red-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-lg hover:bg-red-600 transition-all flex items-center gap-1"
//                           >
//                             <Trash2 className="w-3 h-3" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <AddInvestmentModal
//           isOpen={isModalOpen}
//           onClose={() => {
//             setIsModalOpen(false);
//             setEditingProjectId(null);
//             setModalInitialData(null);
//           }}
//           onSubmit={handleSave}
//           initialData={modalInitialData}
//         />
//       </main>
//     </div>
//   );
// }









"use client";

import { CldImage } from "next-cloudinary";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Plus, Search, MapPin, Trash2, Edit2, Loader2 } from "lucide-react";

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
      className={`w-8 h-4 rounded-full shadow-inner transition-colors ${
        checked ? "bg-[#d0a539]/20" : "bg-[#171512]/10"
      }`}
    ></div>
    <div
      className={`absolute left-0.5 top-0.5 w-3 h-3 rounded-full transition-transform shadow-sm flex items-center justify-center ${
        checked ? "translate-x-full bg-[#d0a539]" : "bg-white"
      }`}
    >
      {isLoading && <Loader2 className="w-2 h-2 animate-spin text-[#171512]" />}
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

  const [modalInitialData, setModalInitialData] =
    useState<Partial<InvestmentFormState> | null>(null);

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
    const mapInvType = (t: string) =>
      t.toUpperCase().replace("-", "_") as InvestmentType;
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
      projectImg: null, // Fixed: Explicitly null since it's not a File object yet
      projectImgUrl: project.project_img || undefined, // Fixed: Pass the existing URL here
    
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
    <div className="flex min-h-screen bg-[#f8f7f6] font-sans text-[#171512]">
      <main className="flex-1 p-6 lg:p-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#171512]/40 mb-2">
              <span>Management</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#d0a539]">Investment Projects</span>
            </nav>
            <h1 className="text-4xl lg:text-5xl font-black text-[#171512] leading-none font-serif">
              Global Assets
            </h1>
          </div>
          <div>
            <button
              onClick={handleCreate}
              className="bg-[#d0a539] text-[#171512] px-8 py-3 rounded-lg text-sm font-bold uppercase tracking-wider shadow-lg shadow-[#d0a539]/20 hover:scale-[1.02] transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" /> New Project
            </button>
          </div>
        </header>

        <div className="bg-white rounded-2xl border border-[#171512]/5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="p-6 border-b border-[#171512]/5 flex flex-wrap items-center gap-6">
            <div className="flex-1 min-w-[300px] relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#171512]/30 w-5 h-5" />
              <input
                className="w-full pl-12 pr-4 py-3 bg-[#f8f7f6] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#d0a539]/20 outline-none placeholder-[#171512]/30"
                placeholder="Search projects..."
                type="text"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8f7f6]/50 border-b border-[#171512]/5">
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40">
                    Project Info
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40">
                    Location
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40 text-center">
                    Sector
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40 text-right">
                    Exp. ROI
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40 text-center">
                    Active
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#171512]/5">
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-8 text-center text-sm text-[#171512]/40 font-bold"
                    >
                      No investment projects found. Click "New Project" to add
                      one.
                    </td>
                  </tr>
                ) : (
                  data.map((project) => (
                    <tr
                      key={project.id}
                      className="hover:bg-[#f8f7f6]/40 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-[#171512]/5">
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
                          <div>
                            <p className="text-sm font-bold text-[#171512]">
                              {project.name}
                            </p>
                            <p className="text-[10px] text-[#171512]/50 font-medium">
                              {project.location}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-[#d0a539]" />
                          <span className="text-xs font-medium text-[#171512]/70">
                            {project.location}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-2 py-0.5 border border-[#d0a539]/40 text-[#d0a539] text-[10px] font-bold uppercase tracking-wider rounded bg-[#d0a539]/5">
                          {project.investment_type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-sm font-black text-[#171512] font-serif">
                          {project.expected_roi_percent}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center">
                          <TableToggle 
                            checked={project.active} 
                            onClick={() => handleToggleStatus(project)}
                            isLoading={togglingId === project.id}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(project)}
                            className="bg-[#171512] text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg hover:bg-[#d0a539] hover:text-[#171512] transition-all"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDelete(project)}
                            className="bg-red-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-lg hover:bg-red-600 transition-all flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
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
      </main>
    </div>
  );
}