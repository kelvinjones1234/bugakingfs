"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Sidebar from "./components/Sidebar";
import MobileSidebar from "./components/MobileSidebar";
import Approval from "./components/Approval";
import SilentInvestmentHandler from "./components/SilentInvestmentHandler";
// import { Toaster } from "sonner";

// Import Server Action

import { getUserProfile } from "../actions/profileActions";
// Helper type for state
type UserData = Awaited<ReturnType<typeof getUserProfile>>;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserData>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Fetch Profile via Server Action
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setUser(data);
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);


  console.log("user:", user);
  
  // 2. Helper for Approval Check (Now strictly boolean)
  const isApproved = user?.isApproved === true;

  // 3. Global Loading Screen
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#f8f7f6]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-24 h-24 animate-pulse">
            <Image
              src="/bugakingLogo.png"
              alt="Loading..."
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="text-[#171512]/40 text-xs font-black uppercase tracking-[0.3em] animate-pulse">
            Loading Dashboard...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f8f7f6]">
      <MobileSidebar />
      <Sidebar />

      {/* Background Services */}
      <SilentInvestmentHandler />
      {/* <Toaster position="top-right" /> */}

      {/* Main Content */}
      <div className="w-full lg:ml-64 transition-all duration-300">
        {isApproved ? (
          children
        ) : (
          <Approval user={user as any} onProfileUpdate={setUser as any} />
        )}
      </div>
    </div>
  );
}
