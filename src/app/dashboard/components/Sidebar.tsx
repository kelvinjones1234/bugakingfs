"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react"; // 1. Import signOut
import {
  LayoutDashboard,
  Building2,
  CreditCard,
  FileText,
  LogOut,
  Tag,
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  // Helper to determine active state
  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return pathname === path;
    }
    return pathname?.startsWith(path);
  };

  const getLinkClasses = (path: string) => {
    const active = isActive(path);
    return active
      ? "flex items-center gap-4 px-4 py-3 rounded-lg bg-[#d0a539]/10 border-r-4 border-[#d0a539] text-[#d0a539] transition-all"
      : "flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-[#d0a539] transition-all group";
  };

  // 2. Handle Logout
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/authentication/signin" });
  };

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-[#171512] text-white flex-col z-50 border-r border-[#d0a539]/10">
      <div className="px-8 pb-8 pt-5 flex items-center gap-3">
        <div>
          <Image src="/bugakingLogo.png" alt="Logo" width={80} height={50} />
        </div>
        <h1 className="font-black text-xl pt-4 tracking-tighter uppercase text-white">
          Buga<span className="text-[#d0a539]">King</span>
        </h1>
      </div>

      <nav className="flex-1 mt-4 px-4 space-y-2">
        <Link href="/dashboard" className={getLinkClasses("/dashboard")}>
          <LayoutDashboard size={22} strokeWidth={2} />
          <span className="text-sm font-bold uppercase tracking-widest">
            Dashboard
          </span>
        </Link>

        <Link
          href="/dashboard/portfolio"
          className={getLinkClasses("/dashboard/portfolio")}
        >
          <Building2 size={22} strokeWidth={2} />
          <span className="text-sm font-bold uppercase tracking-widest">
            Portfolio
          </span>
        </Link>

        <Link
          href="/dashboard/payments"
          className={getLinkClasses("/dashboard/payments")}
        >
          <CreditCard size={22} strokeWidth={2} />
          <span className="text-sm font-bold uppercase tracking-widest">
            Payments
          </span>
        </Link>

        <Link
          href="/dashboard/documents"
          className={getLinkClasses("/dashboard/documents")}
        >
          <FileText size={22} strokeWidth={2} />
          <span className="text-sm font-bold uppercase tracking-widest">
            Documents
          </span>
        </Link>

        <Link href="/offers" className={getLinkClasses("/offers")}>
          <Tag size={22} strokeWidth={2} />
          <span className="text-sm font-bold uppercase tracking-widest">
            Offers
          </span>
        </Link>
      </nav>

      <div className="p-6 mb-4">
        <button
          onClick={handleLogout}
          className="w-full bg-[#d0a539] text-[#171512] font-black uppercase tracking-widest p-4 rounded-xl shadow-lg shadow-[#d0a539]/20 hover:scale-105 active:scale-95 transition-all text-sm flex items-center justify-between gap-2 group"
        >
          Logout
          <LogOut
            size={18}
            strokeWidth={3}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;