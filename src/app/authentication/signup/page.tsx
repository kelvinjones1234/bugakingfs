"use client";

import React from "react";
// Adjust these import paths to match your folder structure
import Main from "./component/Main";
import { Navbar } from "@/components/nav/Navbar";

const SignupPage = () => {
  return (
    // h-[100dvh] fixes mobile browser address bar height issues
    // overflow-hidden prevents the entire window from scrolling
    <div className="h-[100dvh] flex flex-col overflow-hidden bg-white">
      {/* Navbar Section: Rigid, won't shrink */}
      <div className="flex-none z-50">
        <Navbar />
      </div>

      {/* Main Section: Fills remaining space */}
      <main className="flex-1 relative w-full h-full overflow-hidden">
        <Main />
      </main>
    </div>
  );
};

export default SignupPage;
