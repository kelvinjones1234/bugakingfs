"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react"; // 1. Import signOut
import {
  LayoutDashboard,
  Building2,
  CreditCard,
  FileText,
  Tag,
  X,
  LogOut,
} from "lucide-react";

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // Helper Logic from Desktop Sidebar
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
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#171512] z-40 flex items-center justify-between px-6 border-b border-[#d0a539]/10 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <Image
              src="/bugakingLogo.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-black text-lg uppercase text-white tracking-tighter">
            Buga<span className="text-[#d0a539]">King</span>
          </span>
        </div>

        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-50 p-2 text-white hover:text-[#d0a539] focus:outline-none transition-colors"
        >
          <div className="flex flex-col justify-center gap-1.5 w-6 h-6">
            <span
              className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Overlay Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sliding Sidebar Drawer */}
      <div
        className={`fixed inset-y-0 left-0 w-72 bg-[#171512] z-50 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col border-r border-[#d0a539]/10 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex items-center justify-between border-b border-[#d0a539]/10">
          <div className="flex items-center gap-2">
            <Image src="/bugakingLogo.png" alt="Logo" width={40} height={40} />
            <h1 className="font-black text-xl tracking-tighter uppercase text-white">
              Buga<span className="text-[#d0a539]">King</span>
            </h1>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <Link
            href="/dashboard"
            className={getLinkClasses("/dashboard")}
          >
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
      </div>
    </>
  );
};

export default MobileSidebar;