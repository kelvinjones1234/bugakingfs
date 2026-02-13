// "use client";

// import React, { useState } from "react";
// import {
//   ChevronRight,
//   PlusCircle,
//   Search,
//   Filter,
//   Layers,
//   Download,
//   ChevronLeft,
// } from "lucide-react";
// import { UIClientInvestment } from "@/app/actions/clientInvestments";

// // --- Utility: Currency Formatter ---
// const formatCurrency = (amount: number) => {
//   return new Intl.NumberFormat("en-NG", {
//     style: "currency",
//     currency: "NGN", // Changed to NGN based on context, swap to USD if needed
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//   }).format(amount);
// };

// // --- Utility: Status Badge Styler ---
// const getStatusStyles = (status: string) => {
//   switch (status) {
//     case "COMPLETED":
//     case "EARNING":
//       return {
//         badge: "bg-green-50 text-green-700 border border-green-200",
//         text: "text-green-600",
//         bar: "bg-green-500",
//       };
//     case "PAYING":
//       return {
//         badge: "bg-[#d0a539]/10 text-[#d0a539] border border-[#d0a539]/20",
//         text: "text-[#d0a539]",
//         bar: "bg-[#d0a539]",
//       };
//     case "PENDING":
//     default:
//       return {
//         badge: "bg-gray-100 text-gray-600 border border-gray-200",
//         text: "text-gray-600",
//         bar: "bg-gray-400",
//       };
//   }
// };

// interface MainProps {
//   data: UIClientInvestment[];
// }

// export default function Main({ data }: MainProps) {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterSector, setFilterSector] = useState("All Sectors");

//   // --- Filtering Logic ---
//   const filteredData = data.filter((item) => {
//     const matchesSearch =
//       item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.clientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.projectName.toLowerCase().includes(searchQuery.toLowerCase());

//     const matchesSector =
//       filterSector === "All Sectors" || item.projectSector === filterSector;

//     return matchesSearch && matchesSector;
//   });

//   return (
//     <div className="flex-1 p-6 lg:p-10 bg-[#f8f7f6] min-h-screen font-sans text-[#171512]">
//       {/* Header */}
//       <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
//         <div>
//           <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#171512]/40 mb-2">
//             <a href="#" className="hover:text-[#d0a539] transition-colors">
//               Admin Panel
//             </a>
//             <ChevronRight className="w-3 h-3" />
//             <span className="text-[#d0a539]">Client Investment List</span>
//           </nav>
//           <h1 className="text-4xl lg:text-5xl font-black text-[#171512] leading-none font-serif">
//             Client Investments
//           </h1>
//           <p className="text-[#171512]/50 mt-2 text-sm font-medium">
//             Managing all active and historical investment portfolios.
//           </p>
//         </div>
//         <div className="flex items-center gap-3">
//           <button className="bg-[#d0a539] text-[#171512] px-6 py-3 rounded-lg text-xs font-black uppercase tracking-widest shadow-lg shadow-[#d0a539]/20 hover:scale-105 transition-all flex items-center gap-2">
//             <PlusCircle className="w-5 h-5" />
//             New Investment
//           </button>
//         </div>
//       </header>

//       {/* Filters & Search */}
//       <div className="flex flex-col lg:flex-row gap-4 mb-8">
//         <div className="relative flex-1">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#171512]/30 w-5 h-5" />
//           <input
//             className="w-full pl-12 pr-4 py-3 bg-white border border-[#171512]/10 rounded-xl text-sm focus:ring-2 focus:ring-[#d0a539] focus:border-[#d0a539] transition-all luxury-shadow outline-none placeholder-[#171512]/30"
//             placeholder="Search investor name, project, or email..."
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//         <div className="flex flex-wrap gap-3">
//           <div className="relative min-w-[160px]">
//             <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-[#d0a539] w-4 h-4" />
//             <select
//               className="w-full pl-10 pr-8 py-3 bg-white border border-[#171512]/10 rounded-xl text-xs font-bold uppercase tracking-widest appearance-none focus:ring-2 focus:ring-[#d0a539] focus:border-[#d0a539] luxury-shadow outline-none"
//               value={filterSector}
//               onChange={(e) => setFilterSector(e.target.value)}
//             >
//               <option>All Sectors</option>
//               <option>Real Estate</option>
//               <option>Agriculture</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Table Card */}
//       <div className="bg-white rounded-2xl border border-[#171512]/5 overflow-hidden luxury-shadow shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]">
//         <div className="overflow-x-auto custom-scrollbar">
//           <table className="w-full text-left border-collapse min-w-[1000px]">
//             <thead>
//               <tr className="bg-[#f8f7f6]/50 border-b border-[#171512]/5">
//                 <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#171512]/40">
//                   Client Name
//                 </th>
//                 <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#171512]/40">
//                   Project Name
//                 </th>
//                 <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#171512]/40">
//                   Plan Details
//                 </th>
//                 <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#171512]/40 text-right">
//                   Agreed Amount
//                 </th>
//                 <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#171512]/40 text-right">
//                   Amount Paid
//                 </th>
//                 <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#171512]/40">
//                   Status
//                 </th>
//                 <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#171512]/40">
//                   Completion
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-[#171512]/5">
//               {filteredData.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={7}
//                     className="px-6 py-8 text-center text-sm font-bold text-[#171512]/40"
//                   >
//                     No investments found.
//                   </td>
//                 </tr>
//               ) : (
//                 filteredData.map((item) => {
//                   const styles = getStatusStyles(item.status);
//                   return (
//                     <tr
//                       key={item.id}
//                       className="hover:bg-[#f8f7f6] transition-all duration-200 cursor-pointer group"
//                     >
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-3">
//                           <div className="w-9 h-9 rounded-full bg-[#171512] text-[#d0a539] flex items-center justify-center font-bold text-xs shrink-0">
//                             {item.clientInitials}
//                           </div>
//                           <div>
//                             <p className="font-bold text-[#171512] text-sm">
//                               {item.clientName}
//                             </p>
//                             <p className="text-[10px] text-[#171512]/40 font-medium">
//                               {item.clientEmail}
//                             </p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <p className="text-sm font-semibold text-[#171512]">
//                           {item.projectName}
//                         </p>
//                         <p className="text-[10px] text-[#d0a539] font-bold uppercase tracking-wider">
//                           {item.projectSector}
//                         </p>
//                       </td>
//                       <td className="px-6 py-4">
//                         <p className="text-sm font-medium text-[#171512]">
//                           {item.planFrequency}
//                         </p>
//                         <p className="text-[10px] text-[#171512]/40 font-bold uppercase">
//                           {item.planDurationDisplay}
//                         </p>
//                       </td>
//                       <td className="px-6 py-4 text-right">
//                         <p className="text-sm font-bold text-[#171512]">
//                           {formatCurrency(item.agreedAmount)}
//                         </p>
//                       </td>
//                       <td className="px-6 py-4 text-right">
//                         <p className="text-sm font-bold text-[#d0a539]">
//                           {formatCurrency(item.amountPaid)}
//                         </p>
//                       </td>
//                       <td className="px-6 py-4">
//                         <span
//                           className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${styles.badge}`}
//                         >
//                           {item.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="w-32">
//                           <div className="flex items-center justify-between mb-1">
//                             <span
//                               className={`text-[9px] font-black ${styles.text}`}
//                             >
//                               {item.progressPercent.toFixed(1)}%
//                             </span>
//                           </div>
//                           <div className="h-1 bg-[#171512]/5 rounded-full overflow-hidden">
//                             <div
//                               className={`h-full ${styles.bar}`}
//                               style={{ width: `${item.progressPercent}%` }}
//                             ></div>
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination (Static for now) */}
//         <div className="px-6 py-4 bg-[#f8f7f6]/30 border-t border-[#171512]/5 flex items-center justify-between">
//           <p className="text-[10px] font-bold text-[#171512]/40 uppercase tracking-widest">
//             Showing {filteredData.length} entries
//           </p>
//           <div className="flex items-center gap-2">
//             <button className="w-8 h-8 rounded border border-[#171512]/10 flex items-center justify-center text-[#171512]/40 hover:text-[#d0a539] transition-colors">
//               <ChevronLeft className="w-4 h-4" />
//             </button>
//             <button className="w-8 h-8 rounded bg-[#d0a539] text-[#171512] flex items-center justify-center text-[10px] font-black">
//               1
//             </button>
//             <button className="w-8 h-8 rounded border border-[#171512]/10 flex items-center justify-center text-[#171512]/40 hover:text-[#d0a539] transition-colors">
//               <ChevronRight className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useState } from "react";
// 1. Import useRouter
import { useRouter } from "next/navigation"; 
import {
  ChevronRight,
  PlusCircle,
  Search,
  Layers,
  ChevronLeft,
} from "lucide-react";
import { UIClientInvestment } from "@/app/actions/clientInvestments";

// --- Utility: Currency Formatter ---
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// --- Utility: Status Badge Styler ---
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
  // 2. Initialize Router
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
    <div className="flex-1 p-6 lg:p-10 bg-[#f8f7f6] min-h-screen font-sans text-[#171512]">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#171512]/40 mb-2">
            <span className="hover:text-[#d0a539] transition-colors cursor-pointer">
              Admin Panel
            </span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#d0a539]">Client Investment List</span>
          </nav>
          <h1 className="text-4xl lg:text-5xl font-black text-[#171512] leading-none font-serif">
            Client Investments
          </h1>
          <p className="text-[#171512]/50 mt-2 text-sm font-medium">
            Managing all active and historical investment portfolios.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-[#d0a539] text-[#171512] px-6 py-3 rounded-lg text-xs font-black uppercase tracking-widest shadow-lg shadow-[#d0a539]/20 hover:scale-105 transition-all flex items-center gap-2">
            <PlusCircle className="w-5 h-5" />
            New Investment
          </button>
        </div>
      </header>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#171512]/30 w-5 h-5" />
          <input
            className="w-full pl-12 pr-4 py-3 bg-white border border-[#171512]/10 rounded-xl text-sm focus:ring-2 focus:ring-[#d0a539] focus:border-[#d0a539] transition-all luxury-shadow outline-none placeholder-[#171512]/30"
            placeholder="Search investor name, project, or email..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="relative min-w-[160px]">
            <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-[#d0a539] w-4 h-4" />
            <select
              className="w-full pl-10 pr-8 py-3 bg-white border border-[#171512]/10 rounded-xl text-xs font-bold uppercase tracking-widest appearance-none focus:ring-2 focus:ring-[#d0a539] focus:border-[#d0a539] luxury-shadow outline-none"
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
      <div className="bg-white rounded-2xl border border-[#171512]/5 overflow-hidden luxury-shadow shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[#f8f7f6]/50 border-b border-[#171512]/5">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#171512]/40">
                  Client Name
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#171512]/40">
                  Project Name
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#171512]/40">
                  Plan Details
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#171512]/40 text-right">
                  Agreed Amount
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#171512]/40 text-right">
                  Amount Paid
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#171512]/40">
                  Status
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#171512]/40">
                  Completion
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#171512]/5">
              {filteredData.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-8 text-center text-sm font-bold text-[#171512]/40"
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
                      // 3. Add onClick handler to navigate
                      onClick={() => router.push(`/admin/client-investments/${item.id}`)}
                      className="hover:bg-[#f8f7f6] transition-all duration-200 cursor-pointer group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#171512] text-[#d0a539] flex items-center justify-center font-bold text-xs shrink-0">
                            {item.clientInitials}
                          </div>
                          <div>
                            <p className="font-bold text-[#171512] text-sm">
                              {item.clientName}
                            </p>
                            <p className="text-[10px] text-[#171512]/40 font-medium">
                              {item.clientEmail}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-[#171512]">
                          {item.projectName}
                        </p>
                        <p className="text-[10px] text-[#d0a539] font-bold uppercase tracking-wider">
                          {item.projectSector}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-[#171512]">
                          {item.planFrequency}
                        </p>
                        <p className="text-[10px] text-[#171512]/40 font-bold uppercase">
                          {item.planDurationDisplay}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="text-sm font-bold text-[#171512]">
                          {formatCurrency(item.agreedAmount)}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="text-sm font-bold text-[#d0a539]">
                          {formatCurrency(item.amountPaid)}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${styles.badge}`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-32">
                          <div className="flex items-center justify-between mb-1">
                            <span
                              className={`text-[9px] font-black ${styles.text}`}
                            >
                              {item.progressPercent.toFixed(1)}%
                            </span>
                          </div>
                          <div className="h-1 bg-[#171512]/5 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${styles.bar}`}
                              style={{ width: `${item.progressPercent}%` }}
                            ></div>
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
        <div className="px-6 py-4 bg-[#f8f7f6]/30 border-t border-[#171512]/5 flex items-center justify-between">
          <p className="text-[10px] font-bold text-[#171512]/40 uppercase tracking-widest">
            Showing {filteredData.length} entries
          </p>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded border border-[#171512]/10 flex items-center justify-center text-[#171512]/40 hover:text-[#d0a539] transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded bg-[#d0a539] text-[#171512] flex items-center justify-center text-[10px] font-black">
              1
            </button>
            <button className="w-8 h-8 rounded border border-[#171512]/10 flex items-center justify-center text-[#171512]/40 hover:text-[#d0a539] transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

