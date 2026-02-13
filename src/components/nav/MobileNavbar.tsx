"use client";

import Link from "next/link";
import { useEffect } from "react";

interface MobileNavbarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export function MobileNavbar({ isOpen, setIsOpen }: MobileNavbarProps) {
  const links = [
    { name: "Home", href: "/" },
    { name: "Agriculture", href: "/agriculture" },
    { name: "Tech", href: "https://billvest.ng" },
    { name: "Real Estate", href: "/real-estate" },
    { name: "Legacy", href: "/legacy" },
    { name: "Offers", href: "/offers" },
    { name: "Login", href: "/authentication/signin" },
  ];

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      {/* --- HAMBURGER BUTTON --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 p-2 text-foreground focus:outline-none"
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

      {/* --- OVERLAY BACKDROP --- */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* --- SLIDE-OUT MENU DRAWER --- */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-[300px] bg-background border-l border-border z-40 transform transition-transform duration-300 ease-out shadow-2xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-8 pb-8">
          {/* Links */}
          <nav className="flex flex-col gap-6">
            {links.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-xl font-bold text-foreground hover:text-primary transition-colors border-b border-border pb-2"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Bottom Action */}
          <div className="mt-auto space-y-6">
            <button
              onClick={() => {
                const phoneNumber = "2348164257149";
                const message =
                  "Hello, I want to inquire about this real estate project.";
                window.open(
                  `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
                  "_blank",
                );
              }}
              className="w-full bg-primary text-charcoal py-4 rounded-brand font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform"
            >
              Inquire Now
            </button>
            <p className="text-xs text-foreground/40 text-center uppercase tracking-widest">
              © 2026 BugaKing Group
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
