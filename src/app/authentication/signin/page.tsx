"use client";

import Main from "./component/Main";
import { Navbar } from "@/components/nav/Navbar";

const SigninPage = () => {
  return (
    // h-[100dvh] ensures it fits mobile viewports perfectly (address bar friendly)
    <div className="h-[100dvh] flex flex-col overflow-hidden bg-white">
      {/* Navbar Section: Static */}
      <div className="flex-none z-50">
        <Navbar />
      </div>

      {/* Main Section: Fills remaining vertical space */}
      {/* overflow-hidden passes scroll control down to the inner Main component */}
      <main className="flex-1 relative w-full h-full overflow-hidden">
        <Main />
      </main>
    </div>
  );
};

export default SigninPage;
