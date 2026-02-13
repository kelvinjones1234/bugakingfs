"use client";

import React from "react";
import MobileSidebar from "./components/MobileSidebar";
import { Sidebar } from "./components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    // <ProtectedRoute>
      <div className="flex min-h-screen bg-[#f8f7f6]">
        {/* GLOBAL SIDEBARS */}
        <MobileSidebar />
        <Sidebar />

        {/* MAIN CONTENT WRAPPER */}
        <div className="w-full lg:ml-64 transition-all duration-300">
          {children}
        </div>
      </div>
    // </ProtectedRoute>
  );
}
