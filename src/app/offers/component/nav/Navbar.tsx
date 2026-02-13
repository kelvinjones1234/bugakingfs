"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { DesktopNavbar } from "@/components/nav/DesktopNavbar";
import { MobileNavbar } from "@/components/nav/MobileNavbar";
import { useSession, signOut } from "next-auth/react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // 👇 Get BOTH session AND status
  const { data: session, status } = useSession();

  console.log("session", session);
  console.log("status", status); // 👈 This will show: "loading" | "authenticated" | "unauthenticated"

  return (
    <header className="bg-white border-b border-[#d0a539]/10">
      <div className="container-width grid grid-cols-3 items-center h-20 px-4 md:px-0">
        {/* --- LEFT SECTION (Logo) --- */}
        <div className="flex justify-start">
          <Link href="/">
            <div className="relative w-20 h-12">
               <Image
                src="/bugakingLogo.png"
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>

        {/* --- CENTER SECTION (Nav Links) --- */}
        <div className="flex justify-center">
          <div className="hidden md:block">
            <DesktopNavbar />
          </div>
        </div>

        {/* --- RIGHT SECTION (Auth Buttons) --- */}
        <div className="flex items-center justify-end gap-4">
          
          {/* 👇 Handle loading state */}
          {status === "loading" ? (
            // Show loading placeholder
            <div className="size-10 rounded-full bg-gray-200 animate-pulse"></div>
          ) : session ? (
            // === LOGGED IN STATE ===
            <>
              {/* Profile Avatar */}
              <Link href="/dashboard">
                <div className="size-10 rounded-full bg-[#d0a539]/10 flex items-center justify-center border border-[#d0a539]/30 text-[#d0a539] hover:bg-[#d0a539] hover:text-[#171512] transition-colors cursor-pointer overflow-hidden relative">
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    // Default Icon
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </Link>

              {/* Logout Button */}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-bold border-2 border-[#d0a539] hover:bg-[#d0a539] rounded-lg text-[#d0a539] hover:text-black transition-all duration-300 uppercase tracking-widest"
              >
                Logout
              </button>
            </>
          ) : (
            // === GUEST STATE (NOT LOGGED IN) ===
            <Link href="/authentication/signin">
              <button className="hidden sm:flex items-center gap-2 px-6 py-2.5 text-sm font-black border-2 border-[#d0a539] bg-[#d0a539] rounded-lg text-[#171512] hover:bg-transparent hover:text-[#d0a539] transition-all duration-300 uppercase tracking-widest shadow-lg shadow-[#d0a539]/20">
                Invest Now
              </button>
            </Link>
          )}

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center">
            <MobileNavbar
              isOpen={isMobileMenuOpen}
              setIsOpen={setIsMobileMenuOpen}
            />
          </div>
        </div>
      </div>
    </header>
  );
}