"use client";

import { useState } from "react";
import { DesktopNavbar } from "./DesktopNavbar"; // Ensure path exists
import { MobileNavbar } from "./MobileNavbar"; // Ensure path exists
import Image from "next/image";

export function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    // Removed 'sticky' because the Parent Wrapper fixes this element at the top
    <header className="bg-white/90 w-full border-b border-gray-100">
      <div className="container-width flex items-center justify-between h-20 px-4 lg:px-8">
        <div>
          <Image
            src="/bugakingLogo.png"
            alt="Logo"
            width={80}
            height={50}
            className="object-contain"
          />
        </div>

        <div className="hidden lg:block">
          <DesktopNavbar />
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => {
              // 1. Your WhatsApp Number
              const phoneNumber = "2348164257149";

              // 2. The message
              const message =
                "Hello, I want to inquire about this opportunity.";

              // 3. Open WhatsApp
              const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
              window.open(url, "_blank");
            }}
            className="bg-primary text-charcoal px-6 py-2 rounded-brand text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 whitespace-nowrap"
          >
            Inquire
          </button>

          {/* Mobile Toggle would go here if not inside MobileNavbar */}
          <div className="lg:hidden">
            <MobileNavbar isOpen={isMobileOpen} setIsOpen={setIsMobileOpen} />
          </div>
        </div>
      </div>
    </header>
  );
}
