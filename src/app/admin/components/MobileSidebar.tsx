"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Building2,
  CreditCard,
  FileText,
  Tag,
  X,
  LogOut,
  Menu,
  Users, // Added
  Briefcase, // Added
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
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Helper Logic for Active Links (Ported from Desktop)
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

  // Handle Logout
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/authentication/signin" });
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#171512] z-40 flex items-center justify-between px-6 border-b border-[#d0a539]/10 shadow-md">
        <Link href="/admin" className="flex items-center gap-2">
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
        </Link>

        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="text-white hover:text-[#d0a539] transition-colors p-1"
        >
          <Menu size={28} strokeWidth={2.5} />
        </button>
      </div>

      {/* Overlay Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-50 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sliding Sidebar Drawer */}
      <div
        className={`fixed inset-y-0 left-0 w-[280px] bg-[#171512] z-[60] transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col border-r border-[#d0a539]/10 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 h-16 flex items-center justify-between border-b border-[#d0a539]/10">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image
                src="/bugakingLogo.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="font-black text-lg tracking-tighter uppercase text-white">
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

        {/* Navigation Links (Mirrored from Desktop Admin Sidebar) */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          
          <Link href="/admin" className={getLinkClasses("/admin")}>
            <LayoutDashboard size={22} strokeWidth={isActive("/admin") ? 2.5 : 2} />
            <span className="text-sm uppercase tracking-widest">
              Dashboard
            </span>
          </Link>

          <Link href="/admin/users" className={getLinkClasses("/admin/users")}>
            <Users size={22} strokeWidth={isActive("/admin/users") ? 2.5 : 2} />
            <span className="text-sm uppercase tracking-widest">
              Users
            </span>
          </Link>

          <Link href="/admin/client-investments" className={getLinkClasses("/admin/client-investments")}>
            <Briefcase size={22} strokeWidth={isActive("/admin/client-investments") ? 2.5 : 2} />
            <span className="text-sm uppercase tracking-widest">
              CL Investments
            </span>
          </Link>

          <Link href="/admin/projects" className={getLinkClasses("/admin/projects")}>
            <Building2 size={22} strokeWidth={isActive("/admin/projects") ? 2.5 : 2} />
            <span className="text-sm uppercase tracking-widest">
              Projects
            </span>
          </Link>

          <Link href="/admin/payments" className={getLinkClasses("/admin/payments")}>
            <CreditCard size={22} strokeWidth={isActive("/admin/payments") ? 2.5 : 2} />
            <span className="text-sm uppercase tracking-widest">
              Transactions
            </span>
          </Link>

          <Link href="/admin/documents" className={getLinkClasses("/admin/documents")}>
            <FileText size={22} strokeWidth={isActive("/admin/documents") ? 2.5 : 2} />
            <span className="text-sm uppercase tracking-widest">
              Documents
            </span>
          </Link>

          <Link href="/offers" className={getLinkClasses("/offers")}>
            <Tag size={22} strokeWidth={isActive("/offers") ? 2.5 : 2} />
            <span className="text-sm uppercase tracking-widest">
              Offers
            </span>
          </Link>

        </nav>

        {/* Logout Section */}
        <div className="p-6 mt-auto border-t border-[#d0a539]/10">
          <button
            onClick={handleLogout}
            className="w-full bg-[#d0a539] text-[#171512] font-black uppercase tracking-widest p-4 rounded-xl shadow-lg shadow-[#d0a539]/20 hover:bg-white hover:scale-[1.02] active:scale-95 transition-all text-xs flex items-center justify-between gap-2 group"
          >
            Logout Securely
            <LogOut
              size={16}
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