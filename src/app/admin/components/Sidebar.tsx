// "use client";

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { signOut } from "next-auth/react"; // 1. Import NextAuth signOut
// import {
//   LayoutDashboard,
//   Building2,
//   CreditCard,
//   FileText,
//   LogOut,
//   Tag,
//   User,
// } from "lucide-react";

// export const Sidebar = () => {
//   const pathname = usePathname();

//   // 2. Helper to determine active state
//   const isActive = (path: string) => {
//     if (path === "/admin") {
//       return pathname === path;
//     }
//     return pathname?.startsWith(path);
//   };

//   const getLinkClasses = (path: string) => {
//     const active = isActive(path);
//     return active
//       ? "flex items-center gap-4 px-4 py-3 rounded-lg bg-[#d0a539]/10 border-r-4 border-[#d0a539] text-[#d0a539] transition-all"
//       : "flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-[#d0a539] transition-all group";
//   };

//   // 3. Logout Handler
//   const handleLogout = async () => {
//     await signOut({ callbackUrl: "/authentication/signin" });
//   };

//   return (
//     <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-[#171512] text-white flex-col z-50 border-r border-[#d0a539]/10">
//       {/* Header / Logo */}
//       <div className="px-8 pb-8 pt-5 flex items-center gap-3">
//         <div className="relative w-[80px] h-[50px]">
//           <Image 
//             src="/bugakingLogo.png" 
//             alt="Logo" 
//             fill 
//             className="object-contain" 
//             priority 
//           />
//         </div>
//         <h1 className="font-black text-xl pt-2 tracking-tighter uppercase text-white">
//           Buga<span className="text-[#d0a539]">King</span>
//         </h1>
//       </div>

//       {/* Navigation Links */}
//       <nav className="flex-1 mt-4 px-4 space-y-2">
//         <Link href="/admin" className={getLinkClasses("/admin")}>
//           <LayoutDashboard size={22} strokeWidth={2} />
//           <span className="text-sm font-bold uppercase tracking-widest">
//             Dashboard
//           </span>
//         </Link>


//         <Link href="/admin/users" className={getLinkClasses("/admin")}>
//           <User size={22} strokeWidth={2} />
//           <span className="text-sm font-bold uppercase tracking-widest">
//             Users
//           </span>
//         </Link>


//         <Link href="/admin/client-investments" className={getLinkClasses("/admin")}>
//           <User size={22} strokeWidth={2} />
//           <span className="text-sm font-bold uppercase tracking-widest">
//             CL Investments
//           </span>
//         </Link>

//         {/* Note: This points to /admin/projects based on your snippet. 
//             If this is the Investor Dashboard, you might want /admin/portfolio instead. */}
//         <Link
//           href="/admin/projects" 
//           className={getLinkClasses("/admin/projects")}
//         >
//           <Building2 size={22} strokeWidth={2} />
//           <span className="text-sm font-bold uppercase tracking-widest">
//             Projects
//           </span>
//         </Link>

//         <Link
//           href="/admin/payments"
//           className={getLinkClasses("/admin/payments")}
//         >
//           <CreditCard size={22} strokeWidth={2} />
//           <span className="text-sm font-bold uppercase tracking-widest">
//             Payments
//           </span>
//         </Link>

//         <Link
//           href="/admin/documents"
//           className={getLinkClasses("/admin/documents")}
//         >
//           <FileText size={22} strokeWidth={2} />
//           <span className="text-sm font-bold uppercase tracking-widest">
//             Documents
//           </span>
//         </Link>

//         <Link href="/offers" className={getLinkClasses("/offers")}>
//           <Tag size={22} strokeWidth={2} />
//           <span className="text-sm font-bold uppercase tracking-widest">
//             Offers
//           </span>
//         </Link>
//       </nav>

//       {/* Logout Button */}
//       <div className="p-6 mb-4 mt-auto">
//         <button
//           onClick={handleLogout}
//           className="w-full bg-[#d0a539] text-[#171512] font-black uppercase tracking-widest p-4 rounded-xl shadow-lg shadow-[#d0a539]/20 hover:scale-[1.02] active:scale-95 transition-all text-xs flex items-center justify-between gap-2 group"
//         >
//           Logout Securely
//           <LogOut
//             size={16}
//             strokeWidth={3}
//             className="group-hover:translate-x-1 transition-transform"
//           />
//         </button>
//       </div>
//     </aside>
//   );
// };



"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Building2,
  CreditCard,
  FileText,
  LogOut,
  Tag,
  User,
  Users, // Added Users icon for the User link
  Briefcase, // Added Briefcase for investments
} from "lucide-react";

export const Sidebar = () => {
  const pathname = usePathname();

  // Helper to determine active state
  const isActive = (path: string) => {
    // Exact match for the root dashboard to avoid it staying active on subpages like /admin/payments
    if (path === "/admin") {
      return pathname === path;
    }
    // For other routes, allow sub-path matching (e.g. /admin/users/123 keeps /admin/users active)
    return pathname?.startsWith(path);
  };

  const getLinkClasses = (path: string) => {
    const active = isActive(path);
    return active
      ? "flex items-center gap-4 px-4 py-3 rounded-lg bg-[#d0a539]/10 border-r-4 border-[#d0a539] text-[#d0a539] transition-all font-bold"
      : "flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-[#d0a539] transition-all group font-medium";
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/authentication/signin" });
  };

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-[#171512] text-white flex-col z-50 border-r border-[#d0a539]/10">
      {/* Header / Logo */}
      <div className="px-8 pb-8 pt-5 flex items-center gap-3">
        <div className="relative w-[80px] h-[50px]">
          <Image 
            src="/bugakingLogo.png" 
            alt="Logo" 
            fill 
            className="object-contain" 
            priority 
          />
        </div>
        <h1 className="font-black text-xl pt-2 tracking-tighter uppercase text-white">
          Buga<span className="text-[#d0a539]">King</span>
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 mt-4 px-4 space-y-2">
        
        {/* Dashboard Home */}
        <Link href="/admin" className={getLinkClasses("/admin")}>
          <LayoutDashboard size={22} strokeWidth={isActive("/admin") ? 2.5 : 2} />
          <span className="text-sm uppercase tracking-widest">
            Dashboard
          </span>
        </Link>

        {/* Users Management */}
        <Link href="/admin/users" className={getLinkClasses("/admin/users")}>
          <Users size={22} strokeWidth={isActive("/admin/users") ? 2.5 : 2} />
          <span className="text-sm uppercase tracking-widest">
            Users
          </span>
        </Link>

        {/* Client Investments */}
        <Link href="/admin/client-investments" className={getLinkClasses("/admin/client-investments")}>
          <Briefcase size={22} strokeWidth={isActive("/admin/client-investments") ? 2.5 : 2} />
          <span className="text-sm uppercase tracking-widest">
            CL Investments
          </span>
        </Link>

        {/* Projects */}
        <Link href="/admin/projects" className={getLinkClasses("/admin/projects")}>
          <Building2 size={22} strokeWidth={isActive("/admin/projects") ? 2.5 : 2} />
          <span className="text-sm uppercase tracking-widest">
            Projects
          </span>
        </Link>

        {/* Transactions / Payments */}
        {/* Using /admin/payments here assuming that is your new payment history page */}
        <Link href="/admin/payments" className={getLinkClasses("/admin/payments")}>
          <CreditCard size={22} strokeWidth={isActive("/admin/payments") ? 2.5 : 2} />
          <span className="text-sm uppercase tracking-widest">
            Transactions
          </span>
        </Link>

        {/* Documents */}
        <Link href="/admin/documents" className={getLinkClasses("/admin/documents")}>
          <FileText size={22} strokeWidth={isActive("/admin/documents") ? 2.5 : 2} />
          <span className="text-sm uppercase tracking-widest">
            Documents
          </span>
        </Link>

        {/* Offers */}
        <Link href="/offers" className={getLinkClasses("/offers")}>
          <Tag size={22} strokeWidth={isActive("/offers") ? 2.5 : 2} />
          <span className="text-sm uppercase tracking-widest">
            Offers
          </span>
        </Link>
      </nav>

      {/* Logout Button */}
      <div className="p-6 mb-4 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full bg-[#d0a539] text-[#171512] font-black uppercase tracking-widest p-4 rounded-xl shadow-lg shadow-[#d0a539]/20 hover:scale-[1.02] active:scale-95 transition-all text-xs flex items-center justify-between gap-2 group"
        >
          Logout Securely
          <LogOut
            size={16}
            strokeWidth={3}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>
    </aside>
  );
};