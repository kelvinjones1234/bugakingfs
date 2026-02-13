// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   X,
//   Upload,
//   Plus,
//   Trash2,
//   Layers,
//   Calculator,
//   CheckCircle,
//   Edit2, // Added icon for visual cue
// } from "lucide-react";

// // --- Types ---
// export enum InvestmentType {
//   AGRICULTURE = "AGRICULTURE",
//   REAL_ESTATE = "REAL_ESTATE",
// }

// export enum AssetType {
//   TERRACE = "TERRACE",
//   FARMLAND = "FARMLAND",
// }

// export enum PaymentMode {
//   WEEKLY = "WEEKLY",
//   MONTHLY = "MONTHLY",
//   ONE_TIME = "ONE_TIME",
// }

// export interface PlanConfig {
//   id?: string;
//   tempId?: string;
//   planName: string;
//   durationDays: number;
//   paymentMode: PaymentMode;
//   totalPrice: number;
//   minimumDeposit: number;
// }

// export interface InvestmentFormState {
//   name: string;
//   investmentType: InvestmentType;
//   assetType: AssetType;
//   location: string;
//   investmentDetail: string;
//   roiStartAfterDays: number | "";
//   expectedRoiPercent: number | "";
//   active: boolean;
//   projectImg: File | null;
//   projectImgUrl?: string;
//   pricingOptions: PlanConfig[];
// }

// interface AddInvestmentModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (data: FormData) => Promise<any>;
//   initialData?: Partial<InvestmentFormState> | null;
// }

// // --- Components ---
// const ToggleSwitch = ({
//   checked,
//   onChange,
// }: {
//   checked: boolean;
//   onChange: (val: boolean) => void;
// }) => (
//   <div
//     onClick={() => onChange(!checked)}
//     className="relative inline-flex items-center cursor-pointer select-none"
//   >
//     <div
//       className={`w-10 h-5 rounded-full shadow-inner transition-colors ${
//         checked ? "bg-[#d0a539]/20" : "bg-[#171512]/10"
//       }`}
//     ></div>
//     <div
//       className={`absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform shadow-sm ${
//         checked ? "translate-x-full bg-[#d0a539]" : ""
//       }`}
//     ></div>
//   </div>
// );

// export default function AddInvestmentModal({
//   isOpen,
//   onClose,
//   onSubmit,
//   initialData,
// }: AddInvestmentModalProps) {
//   // --- UI States ---
//   const [status, setStatus] = useState<
//     "idle" | "submitting" | "success" | "error"
//   >("idle");

//   // --- Main Form State ---
//   const [formData, setFormData] = useState<InvestmentFormState>({
//     name: "",
//     investmentType: InvestmentType.REAL_ESTATE,
//     assetType: AssetType.TERRACE,
//     location: "",
//     investmentDetail: "",
//     roiStartAfterDays: "",
//     expectedRoiPercent: "",
//     active: true,
//     projectImg: null,
//     projectImgUrl: undefined,
//     pricingOptions: [],
//   });

//   const [tempPlanKey, setTempPlanKey] = useState("One-off");
//   const [tempAmount, setTempAmount] = useState("");

//   // --- Helpers ---
//   const getPlanDetailsFromKey = (key: string) => {
//     switch (key) {
//       case "One-off":
//         return {
//           name: "Outright Payment",
//           days: 0,
//           mode: PaymentMode.ONE_TIME,
//           divisor: 1,
//           label: "payment",
//         };
//       case "1-month-weekly":
//         return {
//           name: "1 Month (Weekly)",
//           days: 30,
//           mode: PaymentMode.WEEKLY,
//           divisor: 4,
//           label: "week",
//         };
//       case "1-month-monthly":
//         return {
//           name: "1 Month (Monthly)",
//           days: 30,
//           mode: PaymentMode.MONTHLY,
//           divisor: 1,
//           label: "month",
//         };
//       case "3-months-weekly":
//         return {
//           name: "3 Months (Weekly)",
//           days: 90,
//           mode: PaymentMode.WEEKLY,
//           divisor: 12,
//           label: "week",
//         };
//       case "3-months-monthly":
//         return {
//           name: "3 Months (Monthly)",
//           days: 90,
//           mode: PaymentMode.MONTHLY,
//           divisor: 3,
//           label: "month",
//         };
//       case "4-months-weekly":
//         return {
//           name: "4 Months (Weekly)",
//           days: 120,
//           mode: PaymentMode.WEEKLY,
//           divisor: 16,
//           label: "week",
//         };
//       case "4-months-monthly":
//         return {
//           name: "4 Months (Monthly)",
//           days: 120,
//           mode: PaymentMode.MONTHLY,
//           divisor: 4,
//           label: "month",
//         };
//       case "6-months-weekly":
//         return {
//           name: "6 Months (Weekly)",
//           days: 180,
//           mode: PaymentMode.WEEKLY,
//           divisor: 24,
//           label: "week",
//         };
//       case "6-months-monthly":
//         return {
//           name: "6 Months (Monthly)",
//           days: 180,
//           mode: PaymentMode.MONTHLY,
//           divisor: 6,
//           label: "month",
//         };
//       case "1-year-weekly":
//         return {
//           name: "1 Year (Weekly)",
//           days: 365,
//           mode: PaymentMode.WEEKLY,
//           divisor: 52,
//           label: "week",
//         };
//       case "1-year-monthly":
//         return {
//           name: "1 Year (Monthly)",
//           days: 365,
//           mode: PaymentMode.MONTHLY,
//           divisor: 12,
//           label: "month",
//         };
//       default:
//         return null;
//     }
//   };

//   const getBreakdownHint = () => {
//     if (!tempAmount) return null;
//     const total = parseFloat(tempAmount);
//     if (isNaN(total)) return null;

//     const details = getPlanDetailsFromKey(tempPlanKey);
//     if (!details) return null;

//     if (details.mode === PaymentMode.ONE_TIME) {
//       return (
//         <div className="flex items-start gap-2 text-[10px] text-[#171512]/60 bg-[#d0a539]/10 p-2 rounded-lg mt-2 animate-in fade-in">
//           <Calculator className="w-3 h-3 mt-0.5 shrink-0 text-[#d0a539]" />
//           <span>
//             Single outright payment of{" "}
//             <strong>₦{total.toLocaleString()}</strong>
//           </span>
//         </div>
//       );
//     }

//     const installment = total / details.divisor;

//     return (
//       <div className="flex items-start gap-2 text-[10px] text-[#171512]/60 bg-[#d0a539]/10 p-2 rounded-lg mt-2 animate-in fade-in">
//         <Calculator className="w-3 h-3 mt-0.5 shrink-0 text-[#d0a539]" />
//         <span>
//           <strong>
//             {details.divisor} {details.label}s
//           </strong>{" "}
//           duration.
//           <br />
//           Installment:{" "}
//           <strong className="text-[#171512]">
//             ₦
//             {installment.toLocaleString(undefined, {
//               maximumFractionDigits: 0,
//             })}{" "}
//             / {details.label}
//           </strong>
//         </span>
//       </div>
//     );
//   };

//   // --- Actions ---

//   const handleAddPlan = () => {
//     if (!tempAmount) return;
//     const total = parseFloat(tempAmount);
//     if (isNaN(total)) return;

//     const details = getPlanDetailsFromKey(tempPlanKey);
//     if (!details) return;

//     // Check for duplicates
//     const exists = formData.pricingOptions.some(
//       (p) => p.durationDays === details.days && p.paymentMode === details.mode,
//     );

//     if (exists) {
//       alert("A plan with this duration and payment mode already exists.");
//       return;
//     }

//     const newPlan: PlanConfig = {
//       tempId: Math.random().toString(36).substr(2, 9),
//       planName: details.name,
//       durationDays: details.days,
//       paymentMode: details.mode,
//       totalPrice: total,
//       minimumDeposit: total / details.divisor,
//     };

//     setFormData({
//       ...formData,
//       pricingOptions: [...formData.pricingOptions, newPlan],
//     });
//     setTempAmount("");
//   };

//   const handleRemovePlan = (index: number) => {
//     const updated = [...formData.pricingOptions];
//     updated.splice(index, 1);
//     setFormData({ ...formData, pricingOptions: updated });
//   };

//   /**
//    * Updates price and automatically recalculates minimum deposit (installments)
//    */
//   const handleUpdatePrice = (index: number, newPriceStr: string) => {
//     const newPrice = parseFloat(newPriceStr);
//     const updatedOptions = [...formData.pricingOptions];
//     const plan = updatedOptions[index];

//     // Update the total price (allow 0 or empty while typing)
//     plan.totalPrice = isNaN(newPrice) ? 0 : newPrice;

//     // Determine Divisor to recalculate Installment
//     let divisor = 1;
//     if (plan.paymentMode === PaymentMode.WEEKLY) {
//       // Estimate divisor: e.g. 30 days / 7 = ~4 weeks
//       divisor = Math.max(1, Math.round(plan.durationDays / 7));
//     } else if (plan.paymentMode === PaymentMode.MONTHLY) {
//       // Estimate divisor: e.g. 90 days / 30 = 3 months
//       divisor = Math.max(1, Math.round(plan.durationDays / 30));
//     }

//     // Recalculate minimum deposit based on new price
//     plan.minimumDeposit = plan.totalPrice / divisor;

//     setFormData({ ...formData, pricingOptions: updatedOptions });
//   };

//   const createPayload = (currentData: InvestmentFormState): FormData => {
//     const payload = new FormData();
//     payload.append("name", currentData.name);
//     payload.append("investmentType", currentData.investmentType);
//     payload.append("assetType", currentData.assetType);
//     payload.append("location", currentData.location);
//     payload.append("investmentDetail", currentData.investmentDetail);
//     payload.append("roiStartAfterDays", String(currentData.roiStartAfterDays));
//     payload.append(
//       "expectedRoiPercent",
//       String(currentData.expectedRoiPercent),
//     );
//     payload.append("active", String(currentData.active));
//     payload.append(
//       "pricingOptions",
//       JSON.stringify(currentData.pricingOptions),
//     );
//     if (currentData.projectImg) {
//       payload.append("projectImg", currentData.projectImg);
//     }
//     return payload;
//   };

//   const handleSubmit = async () => {
//     if (formData.pricingOptions.length === 0 && tempAmount) {
//       const confirmAdd = window.confirm(
//         `You have a plan amount of ₦${parseInt(
//           tempAmount,
//         ).toLocaleString()} entered but not added.\n\nDo you want to add it as a "${tempPlanKey}" plan and save?`,
//       );

//       if (confirmAdd) {
//         const details = getPlanDetailsFromKey(tempPlanKey);
//         if (details) {
//           const total = parseFloat(tempAmount);
//           const newPlan: PlanConfig = {
//             tempId: "auto-added",
//             planName: details.name,
//             durationDays: details.days,
//             paymentMode: details.mode,
//             totalPrice: total,
//             minimumDeposit: total / details.divisor,
//           };
//           const dataWithPlan = { ...formData, pricingOptions: [newPlan] };

//           try {
//             setStatus("submitting");
//             await onSubmit(createPayload(dataWithPlan));
//             setStatus("success");
//             setTimeout(() => {
//               onClose();
//               setStatus("idle");
//             }, 2000);
//           } catch (error) {
//             console.error(error);
//             setStatus("error");
//           }
//           return;
//         }
//       }
//     }

//     if (formData.pricingOptions.length === 0) {
//       alert("Please add at least one Payment Plan.");
//       return;
//     }

//     try {
//       setStatus("submitting");
//       await onSubmit(createPayload(formData));
//       setStatus("success");
//       setTimeout(() => {
//         onClose();
//         setStatus("idle");
//       }, 2000);
//     } catch (error) {
//       console.error(error);
//       setStatus("error");
//     }
//   };

//   useEffect(() => {
//     if (isOpen) {
//       if (initialData) {
//         setFormData((prev) => ({
//           ...prev,
//           ...initialData,
//           pricingOptions: initialData.pricingOptions || [],
//         }));
//       } else {
//         setFormData({
//           name: "",
//           investmentType: InvestmentType.REAL_ESTATE,
//           assetType: AssetType.TERRACE,
//           location: "",
//           investmentDetail: "",
//           roiStartAfterDays: "",
//           expectedRoiPercent: "",
//           active: true,
//           projectImg: null,
//           projectImgUrl: undefined,
//           pricingOptions: [],
//         });
//       }
//       setTempAmount("");
//       setTempPlanKey("One-off");
//       setStatus("idle");
//     }
//   }, [initialData, isOpen]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[100] bg-[#171512]/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
//       <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 my-8 transition-all">
//         {status === "success" ? (
//           <div className="p-12 flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
//             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
//               <CheckCircle className="w-10 h-10 text-green-600" />
//             </div>
//             <h3 className="text-2xl font-black text-[#171512] mb-2">
//               {initialData ? "Project Updated!" : "Project Created!"}
//             </h3>
//             <p className="text-[#171512]/50 text-sm max-w-xs">
//               The investment opportunity is now live. Closing...
//             </p>
//           </div>
//         ) : (
//           <>
//             <div className="p-8 border-b border-[#171512]/5 flex items-center justify-between bg-white sticky top-0 z-10">
//               <div>
//                 <h3 className="text-2xl font-black italic font-serif text-[#171512]">
//                   {initialData ? "Edit Investment" : "New Investment"}
//                 </h3>
//                 <p className="text-xs font-bold text-[#171512]/40 uppercase tracking-widest mt-1">
//                   {initialData
//                     ? "Update asset details"
//                     : "Create a new opportunity"}
//                 </p>
//               </div>
//               <button
//                 onClick={onClose}
//                 className="text-[#171512]/30 hover:text-[#171512] transition-colors p-2 rounded-full hover:bg-[#f8f7f6]"
//                 disabled={status === "submitting"}
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>

//             <div className="p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
//               <form
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   handleSubmit();
//                 }}
//               >
//                 {/* --- Main Fields Grid --- */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <div className="space-y-2">
//                     <label className="text-[10px] font-black uppercase tracking-widest text-[#171512]/60 ml-1">
//                       Project Name
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       className="w-full px-4 py-3 bg-[#f8f7f6] border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#d0a539]/20 outline-none text-[#171512]"
//                       value={formData.name}
//                       onChange={(e) =>
//                         setFormData({ ...formData, name: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-[10px] font-black uppercase tracking-widest text-[#171512]/60 ml-1">
//                       Investment Type
//                     </label>
//                     <select
//                       className="w-full px-4 py-3 bg-[#f8f7f6] border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#d0a539]/20 outline-none text-[#171512] appearance-none"
//                       value={formData.investmentType}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           investmentType: e.target.value as InvestmentType,
//                         })
//                       }
//                     >
//                       <option value={InvestmentType.REAL_ESTATE}>
//                         Real Estate
//                       </option>
//                       <option value={InvestmentType.AGRICULTURE}>
//                         Agriculture
//                       </option>
//                     </select>
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-[10px] font-black uppercase tracking-widest text-[#171512]/60 ml-1">
//                       Asset Type
//                     </label>
//                     <select
//                       className="w-full px-4 py-3 bg-[#f8f7f6] border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#d0a539]/20 outline-none text-[#171512] appearance-none"
//                       value={formData.assetType}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           assetType: e.target.value as AssetType,
//                         })
//                       }
//                     >
//                       <option value={AssetType.TERRACE}>Terrace</option>
//                       <option value={AssetType.FARMLAND}>Farmland</option>
//                     </select>
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-[10px] font-black uppercase tracking-widest text-[#171512]/60 ml-1">
//                       Location
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       className="w-full px-4 py-3 bg-[#f8f7f6] border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#d0a539]/20 outline-none text-[#171512]"
//                       value={formData.location}
//                       onChange={(e) =>
//                         setFormData({ ...formData, location: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-[10px] font-black uppercase tracking-widest text-[#171512]/60 ml-1">
//                       ROI Percentage (%)
//                     </label>
//                     <input
//                       type="number"
//                       step="0.1"
//                       required
//                       className="w-full px-4 py-3 bg-[#f8f7f6] border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#d0a539]/20 outline-none text-[#171512]"
//                       value={formData.expectedRoiPercent}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           expectedRoiPercent: parseFloat(e.target.value),
//                         })
//                       }
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-[10px] font-black uppercase tracking-widest text-[#171512]/60 ml-1">
//                       ROI Starts After (Days)
//                     </label>
//                     <input
//                       type="number"
//                       required
//                       className="w-full px-4 py-3 bg-[#f8f7f6] border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#d0a539]/20 outline-none text-[#171512]"
//                       value={formData.roiStartAfterDays}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           roiStartAfterDays: parseInt(e.target.value),
//                         })
//                       }
//                     />
//                   </div>
//                 </div>

//                 {/* --- Pricing Builder --- */}
//                 <div className="mb-8 bg-[#f8f7f6]/50 border border-[#171512]/5 rounded-xl p-6">
//                   <div className="flex items-center gap-2 mb-4">
//                     <Layers className="w-4 h-4 text-[#d0a539]" />
//                     <h4 className="text-sm font-black uppercase tracking-widest text-[#171512]">
//                       Payment Plans Configuration
//                     </h4>
//                   </div>

//                   {/* Add New Plan Inputs */}
//                   <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
//                     <div className="md:col-span-6 relative">
//                       <select
//                         className="w-full px-4 py-3 bg-white border border-[#171512]/10 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#d0a539]/20 outline-none text-[#171512] appearance-none"
//                         value={tempPlanKey}
//                         onChange={(e) => setTempPlanKey(e.target.value)}
//                       >
//                         <option value="One-off">One-off / Outright</option>
//                         <optgroup label="1 Month Plan">
//                           <option value="1-month-weekly">
//                             1 Month (Weekly)
//                           </option>
//                           <option value="1-month-monthly">
//                             1 Month (Monthly)
//                           </option>
//                         </optgroup>
//                         <optgroup label="3 Months Plan">
//                           <option value="3-months-weekly">
//                             3 Months (Weekly)
//                           </option>
//                           <option value="3-months-monthly">
//                             3 Months (Monthly)
//                           </option>
//                         </optgroup>
//                         <optgroup label="4 Months Plan">
//                           <option value="4-months-weekly">
//                             4 Months (Weekly)
//                           </option>
//                           <option value="4-months-monthly">
//                             4 Months (Monthly)
//                           </option>
//                         </optgroup>
//                         <optgroup label="6 Months Plan">
//                           <option value="6-months-weekly">
//                             6 Months (Weekly)
//                           </option>
//                           <option value="6-months-monthly">
//                             6 Months (Monthly)
//                           </option>
//                         </optgroup>
//                         <optgroup label="1 Year Plan">
//                           <option value="1-year-weekly">1 Year (Weekly)</option>
//                           <option value="1-year-monthly">
//                             1 Year (Monthly)
//                           </option>
//                         </optgroup>
//                       </select>
//                     </div>
//                     <div className="md:col-span-4 flex flex-col">
//                       <div className="relative">
//                         <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#171512]/30 font-sans font-bold text-xs">
//                           ₦
//                         </span>
//                         <input
//                           type="number"
//                           placeholder="Total Plan Price"
//                           className="w-full pl-8 pr-4 py-3 bg-white border border-[#171512]/10 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#d0a539]/20 outline-none text-[#171512]"
//                           value={tempAmount}
//                           onChange={(e) => setTempAmount(e.target.value)}
//                         />
//                       </div>
//                       {getBreakdownHint()}
//                     </div>
//                     <div className="md:col-span-2">
//                       <button
//                         type="button"
//                         onClick={handleAddPlan}
//                         className="w-full py-3 md:py-0 h-[42px] flex items-center justify-center gap-2 bg-[#171512] text-white rounded-xl hover:bg-[#d0a539] hover:text-[#171512] transition-colors text-xs font-bold uppercase tracking-wider"
//                       >
//                         <Plus className="w-4 h-4" /> Add
//                       </button>
//                     </div>
//                   </div>

//                   {/* Plan List with EDITABLE Prices */}
//                   <div className="space-y-2">
//                     {formData.pricingOptions.length === 0 ? (
//                       <div className="text-center py-6 border-2 border-dashed border-[#171512]/5 rounded-xl">
//                         <p className="text-[10px] text-[#171512]/40 font-bold uppercase tracking-widest">
//                           No payment plans configured yet
//                         </p>
//                       </div>
//                     ) : (
//                       formData.pricingOptions.map((plan, idx) => {
//                         const installment = plan.minimumDeposit;
//                         let period = "";
//                         if (plan.paymentMode === PaymentMode.WEEKLY)
//                           period = "Week";
//                         if (plan.paymentMode === PaymentMode.MONTHLY)
//                           period = "Month";

//                         const planKey = plan.id || plan.tempId || idx;

//                         return (
//                           <div
//                             key={planKey}
//                             className="flex items-start justify-between bg-white p-3 rounded-lg border border-[#171512]/5 shadow-sm animate-in slide-in-from-top-2 duration-200"
//                           >
//                             <div className="flex items-start gap-3 w-full">
//                               <div className="w-8 h-8 rounded-full bg-[#d0a539]/10 flex items-center justify-center text-[#d0a539] text-xs font-bold mt-1 shrink-0">
//                                 {idx + 1}
//                               </div>
//                               <div className="flex-1">
//                                 <p className="text-xs font-bold text-[#171512] uppercase tracking-wide mb-1">
//                                   {plan.planName}
//                                 </p>

//                                 {/* EDITABLE PRICE FIELD */}
//                                 <div className="flex items-center gap-2 mb-1">
//                                   <span className="text-[10px] text-[#171512]/50 font-medium">
//                                     Total:
//                                   </span>
//                                   <div className="relative w-32">
//                                     <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[#171512]/40 text-[10px] font-bold">
//                                       ₦
//                                     </span>
//                                     <input
//                                       type="number"
//                                       value={
//                                         plan.totalPrice === 0
//                                           ? ""
//                                           : plan.totalPrice
//                                       }
//                                       onChange={(e) =>
//                                         handleUpdatePrice(idx, e.target.value)
//                                       }
//                                       className="w-full pl-5 pr-2 py-1 bg-[#f8f7f6] border border-[#171512]/10 rounded text-xs font-bold text-[#171512] focus:ring-1 focus:ring-[#d0a539] outline-none"
//                                     />
//                                   </div>
//                                 </div>

//                                 {/* Dynamic Installment Display */}
//                                 {plan.paymentMode !== PaymentMode.ONE_TIME && (
//                                   <p className="text-[10px] text-[#d0a539] font-black tracking-wide">
//                                     ₦
//                                     {installment.toLocaleString(undefined, {
//                                       maximumFractionDigits: 0,
//                                     })}{" "}
//                                     per {period}
//                                   </p>
//                                 )}
//                               </div>
//                             </div>
//                             <button
//                               type="button"
//                               onClick={() => handleRemovePlan(idx)}
//                               className="p-2 text-[#171512]/20 hover:text-red-500 transition-colors mt-1"
//                               title="Remove Plan"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           </div>
//                         );
//                       })
//                     )}
//                   </div>
//                 </div>

//                 {/* --- Details & Assets --- */}
//                 <div className="space-y-6">
//                   <div className="space-y-2">
//                     <label className="text-[10px] font-black uppercase tracking-widest text-[#171512]/60 ml-1">
//                       Investment Details
//                     </label>
//                     <textarea
//                       required
//                       className="w-full px-4 py-3 bg-[#f8f7f6] border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#d0a539]/20 outline-none text-[#171512] min-h-[100px] resize-y"
//                       value={formData.investmentDetail}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           investmentDetail: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-[10px] font-black uppercase tracking-widest text-[#171512]/60 ml-1">
//                       Investment Image
//                     </label>
//                     <div className="border-2 border-dashed border-[#171512]/10 rounded-2xl p-8 flex flex-col items-center justify-center bg-[#f8f7f6]/50 group hover:border-[#d0a539]/50 transition-colors cursor-pointer relative overflow-hidden">
//                       <input
//                         type="file"
//                         accept="image/*"
//                         className="absolute inset-0 opacity-0 cursor-pointer"
//                         onChange={(e) => {
//                           if (e.target.files && e.target.files[0]) {
//                             setFormData({
//                               ...formData,
//                               projectImg: e.target.files[0],
//                             });
//                           }
//                         }}
//                       />
//                       <Upload className="w-8 h-8 text-[#171512]/20 mb-2 group-hover:text-[#d0a539] transition-colors" />
//                       <p className="text-xs font-bold text-[#171512]/40">
//                         {formData.projectImg ? (
//                           <span className="text-[#d0a539]">
//                             {formData.projectImg.name}
//                           </span>
//                         ) : formData.projectImgUrl ? (
//                           <span className="text-[#171512]/60">
//                             Current image uploaded
//                           </span>
//                         ) : (
//                           <>
//                             Drop image or{" "}
//                             <span className="text-[#d0a539]">browse</span>
//                           </>
//                         )}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between bg-[#f8f7f6] p-4 rounded-xl">
//                     <div>
//                       <p className="text-sm font-bold text-[#171512]">
//                         Active Status
//                       </p>
//                       <p className="text-[10px] text-[#171512]/50">
//                         Is this project currently open for investment?
//                       </p>
//                     </div>
//                     <ToggleSwitch
//                       checked={formData.active}
//                       onChange={(val) =>
//                         setFormData({ ...formData, active: val })
//                       }
//                     />
//                   </div>
//                 </div>

//                 {/* Footer */}
//                 <div className="pt-8 mt-4 border-t border-[#171512]/5 flex items-center justify-end gap-4">
//                   <button
//                     type="button"
//                     onClick={onClose}
//                     className="px-6 py-3 text-xs font-black uppercase tracking-widest text-[#171512]/40 hover:text-[#171512] transition-colors"
//                     disabled={status === "submitting"}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="bg-[#171512] text-white px-10 py-3 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-[#d0a539] hover:text-[#171512] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                     disabled={status === "submitting"}
//                   >
//                     {status === "submitting" ? (
//                       <>{initialData ? "Updating..." : "Creating..."}</>
//                     ) : initialData ? (
//                       "Update Project"
//                     ) : (
//                       "Create Investment"
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }






"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Upload,
  Plus,
  Trash2,
  Layers,
  Calculator,
  CheckCircle,
  Edit2,
} from "lucide-react";

// --- Types ---
export enum InvestmentType {
  AGRICULTURE = "AGRICULTURE",
  REAL_ESTATE = "REAL_ESTATE",
}

export enum AssetType {
  TERRACE = "TERRACE",
  FARMLAND = "FARMLAND",
}

export enum PaymentMode {
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  ONE_TIME = "ONE_TIME",
}

export interface PlanConfig {
  id?: string;
  tempId?: string;
  planName: string;
  durationDays: number;
  paymentMode: PaymentMode;
  totalPrice: number;
  minimumDeposit: number;
}

export interface InvestmentFormState {
  name: string;
  investmentType: InvestmentType;
  assetType: AssetType;
  location: string;
  investmentDetail: string;
  roiStartAfterDays: number | "";
  expectedRoiPercent: number | "";
  active: boolean;
  projectImg: File | null; // Fixed: strictly for File uploads
  projectImgUrl?: string | null; // Fixed: string URL from existing data
  pricingOptions: PlanConfig[];
}

interface AddInvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<any>;
  initialData?: Partial<InvestmentFormState> | null;
}

// --- Components ---
const ToggleSwitch = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
}) => (
  <div
    onClick={() => onChange(!checked)}
    className="relative inline-flex items-center cursor-pointer select-none"
  >
    <div
      className={`w-10 h-5 rounded-full shadow-inner transition-colors ${
        checked ? "bg-[#d0a539]/20" : "bg-[#171512]/10"
      }`}
    ></div>
    <div
      className={`absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform shadow-sm ${
        checked ? "translate-x-full bg-[#d0a539]" : ""
      }`}
    ></div>
  </div>
);

export default function AddInvestmentModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: AddInvestmentModalProps) {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const [formData, setFormData] = useState<InvestmentFormState>({
    name: "",
    investmentType: InvestmentType.REAL_ESTATE,
    assetType: AssetType.TERRACE,
    location: "",
    investmentDetail: "",
    roiStartAfterDays: "",
    expectedRoiPercent: "",
    active: true,
    projectImg: null,
    projectImgUrl: undefined,
    pricingOptions: [],
  });

  const [tempPlanKey, setTempPlanKey] = useState("One-off");
  const [tempAmount, setTempAmount] = useState("");

  const getPlanDetailsFromKey = (key: string) => {
    switch (key) {
      case "One-off":
        return {
          name: "Outright Payment",
          days: 0,
          mode: PaymentMode.ONE_TIME,
          divisor: 1,
          label: "payment",
        };
      case "1-month-weekly":
        return {
          name: "1 Month (Weekly)",
          days: 30,
          mode: PaymentMode.WEEKLY,
          divisor: 4,
          label: "week",
        };
      case "1-month-monthly":
        return {
          name: "1 Month (Monthly)",
          days: 30,
          mode: PaymentMode.MONTHLY,
          divisor: 1,
          label: "month",
        };
      case "3-months-weekly":
        return {
          name: "3 Months (Weekly)",
          days: 90,
          mode: PaymentMode.WEEKLY,
          divisor: 12,
          label: "week",
        };
      case "3-months-monthly":
        return {
          name: "3 Months (Monthly)",
          days: 90,
          mode: PaymentMode.MONTHLY,
          divisor: 3,
          label: "month",
        };
      case "4-months-weekly":
        return {
          name: "4 Months (Weekly)",
          days: 120,
          mode: PaymentMode.WEEKLY,
          divisor: 16,
          label: "week",
        };
      case "4-months-monthly":
        return {
          name: "4 Months (Monthly)",
          days: 120,
          mode: PaymentMode.MONTHLY,
          divisor: 4,
          label: "month",
        };
      case "6-months-weekly":
        return {
          name: "6 Months (Weekly)",
          days: 180,
          mode: PaymentMode.WEEKLY,
          divisor: 24,
          label: "week",
        };
      case "6-months-monthly":
        return {
          name: "6 Months (Monthly)",
          days: 180,
          mode: PaymentMode.MONTHLY,
          divisor: 6,
          label: "month",
        };
      case "1-year-weekly":
        return {
          name: "1 Year (Weekly)",
          days: 365,
          mode: PaymentMode.WEEKLY,
          divisor: 52,
          label: "week",
        };
      case "1-year-monthly":
        return {
          name: "1 Year (Monthly)",
          days: 365,
          mode: PaymentMode.MONTHLY,
          divisor: 12,
          label: "month",
        };
      default:
        return null;
    }
  };

  const getBreakdownHint = () => {
    if (!tempAmount) return null;
    const total = parseFloat(tempAmount);
    if (isNaN(total)) return null;

    const details = getPlanDetailsFromKey(tempPlanKey);
    if (!details) return null;

    if (details.mode === PaymentMode.ONE_TIME) {
      return (
        <div className="flex items-start gap-2 text-[10px] text-[#171512]/60 bg-[#d0a539]/10 p-2 rounded-lg mt-2 animate-in fade-in">
          <Calculator className="w-3 h-3 mt-0.5 shrink-0 text-[#d0a539]" />
          <span>
            Single outright payment of{" "}
            <strong>₦{total.toLocaleString()}</strong>
          </span>
        </div>
      );
    }

    const installment = total / details.divisor;

    return (
      <div className="flex items-start gap-2 text-[10px] text-[#171512]/60 bg-[#d0a539]/10 p-2 rounded-lg mt-2 animate-in fade-in">
        <Calculator className="w-3 h-3 mt-0.5 shrink-0 text-[#d0a539]" />
        <span>
          <strong>
            {details.divisor} {details.label}s
          </strong>{" "}
          duration.
          <br />
          Installment:{" "}
          <strong className="text-[#171512]">
            ₦
            {installment.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}{" "}
            / {details.label}
          </strong>
        </span>
      </div>
    );
  };

  const handleAddPlan = () => {
    if (!tempAmount) return;
    const total = parseFloat(tempAmount);
    if (isNaN(total)) return;

    const details = getPlanDetailsFromKey(tempPlanKey);
    if (!details) return;

    const exists = formData.pricingOptions.some(
      (p) => p.durationDays === details.days && p.paymentMode === details.mode,
    );

    if (exists) {
      alert("A plan with this duration and payment mode already exists.");
      return;
    }

    const newPlan: PlanConfig = {
      tempId: Math.random().toString(36).substr(2, 9),
      planName: details.name,
      durationDays: details.days,
      paymentMode: details.mode,
      totalPrice: total,
      minimumDeposit: total / details.divisor,
    };

    setFormData({
      ...formData,
      pricingOptions: [...formData.pricingOptions, newPlan],
    });
    setTempAmount("");
  };

  const handleRemovePlan = (index: number) => {
    const updated = [...formData.pricingOptions];
    updated.splice(index, 1);
    setFormData({ ...formData, pricingOptions: updated });
  };

  const handleUpdatePrice = (index: number, newPriceStr: string) => {
    const newPrice = parseFloat(newPriceStr);
    const updatedOptions = [...formData.pricingOptions];
    const plan = updatedOptions[index];

    plan.totalPrice = isNaN(newPrice) ? 0 : newPrice;

    let divisor = 1;
    if (plan.paymentMode === PaymentMode.WEEKLY) {
      divisor = Math.max(1, Math.round(plan.durationDays / 7));
    } else if (plan.paymentMode === PaymentMode.MONTHLY) {
      divisor = Math.max(1, Math.round(plan.durationDays / 30));
    }

    plan.minimumDeposit = plan.totalPrice / divisor;
    setFormData({ ...formData, pricingOptions: updatedOptions });
  };

  const createPayload = (currentData: InvestmentFormState): FormData => {
    const payload = new FormData();
    payload.append("name", currentData.name);
    payload.append("investmentType", currentData.investmentType);
    payload.append("assetType", currentData.assetType);
    payload.append("location", currentData.location);
    payload.append("investmentDetail", currentData.investmentDetail);
    payload.append("roiStartAfterDays", String(currentData.roiStartAfterDays));
    payload.append("expectedRoiPercent", String(currentData.expectedRoiPercent));
    payload.append("active", String(currentData.active));
    payload.append("pricingOptions", JSON.stringify(currentData.pricingOptions));
    
    // Only append if it's a new file. If we are editing and didn't change the image, 
    // projectImg will be null, and the backend should maintain the existing image URL.
    if (currentData.projectImg) {
      payload.append("projectImg", currentData.projectImg);
    }
    return payload;
  };

  const handleSubmit = async () => {
    if (formData.pricingOptions.length === 0 && tempAmount) {
      const confirmAdd = window.confirm(
        `You have a plan amount of ₦${parseInt(
          tempAmount,
        ).toLocaleString()} entered but not added.\n\nDo you want to add it as a "${tempPlanKey}" plan and save?`,
      );

      if (confirmAdd) {
        const details = getPlanDetailsFromKey(tempPlanKey);
        if (details) {
          const total = parseFloat(tempAmount);
          const newPlan: PlanConfig = {
            tempId: "auto-added",
            planName: details.name,
            durationDays: details.days,
            paymentMode: details.mode,
            totalPrice: total,
            minimumDeposit: total / details.divisor,
          };
          const dataWithPlan = { ...formData, pricingOptions: [newPlan] };

          try {
            setStatus("submitting");
            await onSubmit(createPayload(dataWithPlan));
            setStatus("success");
            setTimeout(() => {
              onClose();
              setStatus("idle");
            }, 2000);
          } catch (error) {
            console.error(error);
            setStatus("error");
          }
          return;
        }
      }
    }

    if (formData.pricingOptions.length === 0) {
      alert("Please add at least one Payment Plan.");
      return;
    }

    try {
      setStatus("submitting");
      await onSubmit(createPayload(formData));
      setStatus("success");
      setTimeout(() => {
        onClose();
        setStatus("idle");
      }, 2000);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData((prev) => ({
          ...prev,
          ...initialData,
          pricingOptions: initialData.pricingOptions || [],
        }));
      } else {
        setFormData({
          name: "",
          investmentType: InvestmentType.REAL_ESTATE,
          assetType: AssetType.TERRACE,
          location: "",
          investmentDetail: "",
          roiStartAfterDays: "",
          expectedRoiPercent: "",
          active: true,
          projectImg: null,
          projectImgUrl: undefined,
          pricingOptions: [],
        });
      }
      setTempAmount("");
      setTempPlanKey("One-off");
      setStatus("idle");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#171512]/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 my-8 transition-all">
        {status === "success" ? (
          <div className="p-12 flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-black text-[#171512] mb-2">
              {initialData ? "Project Updated!" : "Project Created!"}
            </h3>
            <p className="text-[#171512]/50 text-sm max-w-xs">
              The investment opportunity is now live. Closing...
            </p>
          </div>
        ) : (
          <>
            <div className="p-8 border-b border-[#171512]/5 flex items-center justify-between bg-white sticky top-0 z-10">
              <div>
                <h3 className="text-2xl font-black italic font-serif text-[#171512]">
                  {initialData ? "Edit Investment" : "New Investment"}
                </h3>
                <p className="text-xs font-bold text-[#171512]/40 uppercase tracking-widest mt-1">
                  {initialData
                    ? "Update asset details"
                    : "Create a new opportunity"}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-[#171512]/30 hover:text-[#171512] transition-colors p-2 rounded-full hover:bg-[#f8f7f6]"
                disabled={status === "submitting"}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                {/* --- Main Fields Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#171512]/60 ml-1">
                      Project Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-[#f8f7f6] border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#d0a539]/20 outline-none text-[#171512]"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#171512]/60 ml-1">
                      Investment Type
                    </label>
                    <select
                      className="w-full px-4 py-3 bg-[#f8f7f6] border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#d0a539]/20 outline-none text-[#171512] appearance-none"
                      value={formData.investmentType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          investmentType: e.target.value as InvestmentType,
                        })
                      }
                    >
                      <option value={InvestmentType.REAL_ESTATE}>
                        Real Estate
                      </option>
                      <option value={InvestmentType.AGRICULTURE}>
                        Agriculture
                      </option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#171512]/60 ml-1">
                      Asset Type
                    </label>
                    <select
                      className="w-full px-4 py-3 bg-[#f8f7f6] border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#d0a539]/20 outline-none text-[#171512] appearance-none"
                      value={formData.assetType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          assetType: e.target.value as AssetType,
                        })
                      }
                    >
                      <option value={AssetType.TERRACE}>Terrace</option>
                      <option value={AssetType.FARMLAND}>Farmland</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#171512]/60 ml-1">
                      Location
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-[#f8f7f6] border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#d0a539]/20 outline-none text-[#171512]"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#171512]/60 ml-1">
                      ROI Percentage (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      className="w-full px-4 py-3 bg-[#f8f7f6] border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#d0a539]/20 outline-none text-[#171512]"
                      value={formData.expectedRoiPercent}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          expectedRoiPercent: parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#171512]/60 ml-1">
                      ROI Starts After (Days)
                    </label>
                    <input
                      type="number"
                      required
                      className="w-full px-4 py-3 bg-[#f8f7f6] border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#d0a539]/20 outline-none text-[#171512]"
                      value={formData.roiStartAfterDays}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          roiStartAfterDays: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>

                {/* --- Pricing Builder --- */}
                <div className="mb-8 bg-[#f8f7f6]/50 border border-[#171512]/5 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Layers className="w-4 h-4 text-[#d0a539]" />
                    <h4 className="text-sm font-black uppercase tracking-widest text-[#171512]">
                      Payment Plans Configuration
                    </h4>
                  </div>

                  {/* Add New Plan Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
                    <div className="md:col-span-6 relative">
                      <select
                        className="w-full px-4 py-3 bg-white border border-[#171512]/10 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#d0a539]/20 outline-none text-[#171512] appearance-none"
                        value={tempPlanKey}
                        onChange={(e) => setTempPlanKey(e.target.value)}
                      >
                        <option value="One-off">One-off / Outright</option>
                        <optgroup label="1 Month Plan">
                          <option value="1-month-weekly">
                            1 Month (Weekly)
                          </option>
                          <option value="1-month-monthly">
                            1 Month (Monthly)
                          </option>
                        </optgroup>
                        <optgroup label="3 Months Plan">
                          <option value="3-months-weekly">
                            3 Months (Weekly)
                          </option>
                          <option value="3-months-monthly">
                            3 Months (Monthly)
                          </option>
                        </optgroup>
                        <optgroup label="4 Months Plan">
                          <option value="4-months-weekly">
                            4 Months (Weekly)
                          </option>
                          <option value="4-months-monthly">
                            4 Months (Monthly)
                          </option>
                        </optgroup>
                        <optgroup label="6 Months Plan">
                          <option value="6-months-weekly">
                            6 Months (Weekly)
                          </option>
                          <option value="6-months-monthly">
                            6 Months (Monthly)
                          </option>
                        </optgroup>
                        <optgroup label="1 Year Plan">
                          <option value="1-year-weekly">1 Year (Weekly)</option>
                          <option value="1-year-monthly">
                            1 Year (Monthly)
                          </option>
                        </optgroup>
                      </select>
                    </div>
                    <div className="md:col-span-4 flex flex-col">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#171512]/30 font-sans font-bold text-xs">
                          ₦
                        </span>
                        <input
                          type="number"
                          placeholder="Total Plan Price"
                          className="w-full pl-8 pr-4 py-3 bg-white border border-[#171512]/10 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#d0a539]/20 outline-none text-[#171512]"
                          value={tempAmount}
                          onChange={(e) => setTempAmount(e.target.value)}
                        />
                      </div>
                      {getBreakdownHint()}
                    </div>
                    <div className="md:col-span-2">
                      <button
                        type="button"
                        onClick={handleAddPlan}
                        className="w-full py-3 md:py-0 h-[42px] flex items-center justify-center gap-2 bg-[#171512] text-white rounded-xl hover:bg-[#d0a539] hover:text-[#171512] transition-colors text-xs font-bold uppercase tracking-wider"
                      >
                        <Plus className="w-4 h-4" /> Add
                      </button>
                    </div>
                  </div>

                  {/* Plan List with EDITABLE Prices */}
                  <div className="space-y-2">
                    {formData.pricingOptions.length === 0 ? (
                      <div className="text-center py-6 border-2 border-dashed border-[#171512]/5 rounded-xl">
                        <p className="text-[10px] text-[#171512]/40 font-bold uppercase tracking-widest">
                          No payment plans configured yet
                        </p>
                      </div>
                    ) : (
                      formData.pricingOptions.map((plan, idx) => {
                        const installment = plan.minimumDeposit;
                        let period = "";
                        if (plan.paymentMode === PaymentMode.WEEKLY)
                          period = "Week";
                        if (plan.paymentMode === PaymentMode.MONTHLY)
                          period = "Month";

                        const planKey = plan.id || plan.tempId || idx;

                        return (
                          <div
                            key={planKey}
                            className="flex items-start justify-between bg-white p-3 rounded-lg border border-[#171512]/5 shadow-sm animate-in slide-in-from-top-2 duration-200"
                          >
                            <div className="flex items-start gap-3 w-full">
                              <div className="w-8 h-8 rounded-full bg-[#d0a539]/10 flex items-center justify-center text-[#d0a539] text-xs font-bold mt-1 shrink-0">
                                {idx + 1}
                              </div>
                              <div className="flex-1">
                                <p className="text-xs font-bold text-[#171512] uppercase tracking-wide mb-1">
                                  {plan.planName}
                                </p>

                                {/* EDITABLE PRICE FIELD */}
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-[10px] text-[#171512]/50 font-medium">
                                    Total:
                                  </span>
                                  <div className="relative w-32">
                                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[#171512]/40 text-[10px] font-bold">
                                      ₦
                                    </span>
                                    <input
                                      type="number"
                                      value={
                                        plan.totalPrice === 0
                                          ? ""
                                          : plan.totalPrice
                                      }
                                      onChange={(e) =>
                                        handleUpdatePrice(idx, e.target.value)
                                      }
                                      className="w-full pl-5 pr-2 py-1 bg-[#f8f7f6] border border-[#171512]/10 rounded text-xs font-bold text-[#171512] focus:ring-1 focus:ring-[#d0a539] outline-none"
                                    />
                                  </div>
                                </div>

                                {/* Dynamic Installment Display */}
                                {plan.paymentMode !== PaymentMode.ONE_TIME && (
                                  <p className="text-[10px] text-[#d0a539] font-black tracking-wide">
                                    ₦
                                    {installment.toLocaleString(undefined, {
                                      maximumFractionDigits: 0,
                                    })}{" "}
                                    per {period}
                                  </p>
                                )}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemovePlan(idx)}
                              className="p-2 text-[#171512]/20 hover:text-red-500 transition-colors mt-1"
                              title="Remove Plan"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* --- Details & Assets --- */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#171512]/60 ml-1">
                      Investment Details
                    </label>
                    <textarea
                      required
                      className="w-full px-4 py-3 bg-[#f8f7f6] border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#d0a539]/20 outline-none text-[#171512] min-h-[100px] resize-y"
                      value={formData.investmentDetail}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          investmentDetail: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#171512]/60 ml-1">
                      Investment Image
                    </label>
                    <div className="border-2 border-dashed border-[#171512]/10 rounded-2xl p-8 flex flex-col items-center justify-center bg-[#f8f7f6]/50 group hover:border-[#d0a539]/50 transition-colors cursor-pointer relative overflow-hidden">
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setFormData({
                              ...formData,
                              projectImg: e.target.files[0],
                            });
                          }
                        }}
                      />
                      <Upload className="w-8 h-8 text-[#171512]/20 mb-2 group-hover:text-[#d0a539] transition-colors" />
                      <p className="text-xs font-bold text-[#171512]/40">
                        {formData.projectImg ? (
                          <span className="text-[#d0a539]">
                            {formData.projectImg.name}
                          </span>
                        ) : formData.projectImgUrl ? (
                          <span className="text-[#171512]/60">
                            Current image: {formData.projectImgUrl.split('/').pop()?.slice(-20)}
                          </span>
                        ) : (
                          <>
                            Drop image or{" "}
                            <span className="text-[#d0a539]">browse</span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-[#f8f7f6] p-4 rounded-xl">
                    <div>
                      <p className="text-sm font-bold text-[#171512]">
                        Active Status
                      </p>
                      <p className="text-[10px] text-[#171512]/50">
                        Is this project currently open for investment?
                      </p>
                    </div>
                    <ToggleSwitch
                      checked={formData.active}
                      onChange={(val) =>
                        setFormData({ ...formData, active: val })
                      }
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-8 mt-4 border-t border-[#171512]/5 flex items-center justify-end gap-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 text-xs font-black uppercase tracking-widest text-[#171512]/40 hover:text-[#171512] transition-colors"
                    disabled={status === "submitting"}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#171512] text-white px-10 py-3 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-[#d0a539] hover:text-[#171512] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? (
                      <>{initialData ? "Updating..." : "Creating..."}</>
                    ) : initialData ? (
                      "Update Project"
                    ) : (
                      "Create Investment"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}