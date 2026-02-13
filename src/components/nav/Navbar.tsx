"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DesktopNavbar } from "./DesktopNavbar";
import { MobileNavbar } from "./MobileNavbar";
import Image from "next/image";
export function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header className={`sticky top-0 z-[999] bg-white/90 w-full`}>
      <div className="container-width flex items-center justify-between h-20">
        {/* --- LOGO SECTION --- */}
        <div>
          <Image src="/bugakingLogo.png" alt="Logo" width={80} height={50} />
        </div>
        {/* --- DESKTOP NAVIGATION (Hidden on Mobile) --- */}
        <div className="hidden lg:block">
          <DesktopNavbar />
        </div>
        {/* Actions */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => {
              const phoneNumber = "2348141772672";
              const message = "Hello, I want to inquire about this.";
              window.open(
                `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
                "_blank",
              );
            }}
            className="bg-primary text-charcoal px-6 py-2 rounded-brand text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            Inquire
          </button>
        </div>
        {/* --- MOBILE NAVIGATION (Hidden on Desktop) --- */}
        <div className="lg:hidden">
          <MobileNavbar isOpen={isMobileOpen} setIsOpen={setIsMobileOpen} />
        </div>
      </div>
    </header>
  );
}
