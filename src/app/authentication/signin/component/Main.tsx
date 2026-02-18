"use client";

import React, { useState, Suspense, memo } from "react";
import { signIn, getSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

// ==========================================
// 1. STATIC HERO COMPONENT
// ==========================================
const HeroSection = memo(() => (
  <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden h-full">
    <div className="absolute inset-0 z-10 bg-black/40"></div>
    <div className="absolute inset-0 z-0">
      <Image
        src="/signin_img.jpg"
        alt="BugaKing Investment Background"
        fill
        priority
        className="object-cover object-center scale-105"
      />
    </div>
    <div className="relative z-20 flex flex-col justify-between px-16 pt-[8rem] w-full h-full">
      <div className="max-w-md">
        <h1 className="text-white text-5xl font-black leading-tight mb-6">
          Invest in Land. Earn Through Agriculture.
        </h1>
        <p className="text-white/80 text-lg font-light leading-relaxed">
          Access your secure portal to monitor your farmland assets and annual
          returns.
        </p>
      </div>
      <div className="text-white/90 text-xs font-bold uppercase tracking-[0.3em] mb-12">
        © 2026 BugaKing Group
      </div>
    </div>
  </div>
));

HeroSection.displayName = "HeroSection";

// ==========================================
// 2. FORM COMPONENT (UPDATED)
// ==========================================
const SignInForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const returnUrl = searchParams.get("returnUrl");
  const successParam = searchParams.get("success");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid email or password.");
      setLoading(false);
      return; // Exit early on error
    }

    // SUCCESSFUL LOGIN: Fetch the session to check roles
    const session = await getSession();

    // 1. ADMIN ROUTING
    if (session?.user?.isStaff) {
      router.push("/admin");
      router.refresh();
      return;
    }

    // 2. NORMAL USER ROUTING (Check for pending investments)
    const pendingData = localStorage.getItem("pending_investment");

    if (pendingData) {
      try {
        const { planId } = JSON.parse(pendingData);
        const { createClientInvestment } =
          await import("@/app/actions/createClientInvestment");
        const investmentResult = await createClientInvestment(planId);

        if (investmentResult.success) {
          localStorage.removeItem("pending_investment");
          router.push(`/dashboard/portfolio`);
          router.refresh();
          return;
        } else {
          console.error("Failed to create investment:", investmentResult.error);
          localStorage.removeItem("pending_investment");
        }
      } catch (error) {
        console.error("Error processing pending investment:", error);
        localStorage.removeItem("pending_investment");
      }
    }

    // 3. DEFAULT USER ROUTING
    router.push(returnUrl || "/dashboard");
    router.refresh();
  };
  return (
    <div className="flex-1 h-full overflow-y-auto bg-white">
      <div className="flex flex-col items-center justify-center min-h-full p-8 sm:p-12 lg:p-20">
        <div className="w-full max-w-md space-y-8 my-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tight text-[#171512]">
              Welcome Back
            </h2>
            <p className="text-[#171512]/60 text-sm">
              Enter your credentials to manage your assets.
            </p>
          </div>

          {successParam === "account-created" && (
            <div className="bg-green-50 text-green-700 p-4 rounded-lg text-sm border border-green-100 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5" />
              <p className="font-medium">
                Registration successful! Please sign in.
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm flex items-center gap-3 border border-red-100 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5" />
              <p className="font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-widest text-[#171512]/50">
                Email Address
              </label>
              <input
                required
                type="email"
                name="email"
                className="block w-full border border-gray-200 rounded-lg text-sm px-4 py-3 bg-gray-50 focus:border-[#d0a539] focus:ring-2 focus:ring-[#d0a539] outline-none transition-colors"
                placeholder="praise@example.com"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-widest text-[#171512]/50">
                  Password
                </label>
                <Link
                  href="/authentication/request-password-reset"
                  className="text-[10px] font-bold text-[#d0a539] hover:underline uppercase"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="block w-full border border-gray-200 rounded-lg text-sm px-4 py-3 bg-gray-50 focus:border-[#d0a539] focus:ring-2 focus:ring-[#d0a539] outline-none transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#171512]/40 hover:text-[#d0a539]"
                >
                  <span className="text-xs font-bold">
                    {showPassword ? "HIDE" : "SHOW"}
                  </span>
                </button>
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full bg-[#d0a539] text-[#171512] font-black uppercase tracking-[0.2em] py-4 rounded-lg hover:bg-opacity-90 transition-all shadow-lg shadow-[#d0a539]/20 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-[#171512]/60">
            Don't have an account?{" "}
            <Link
              href="/authentication/signup"
              className="text-[#d0a539] font-black uppercase tracking-tighter hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. MAIN COMPONENT (Wrapper)
// ==========================================
const Main = () => (
  <div className="bg-white text-[#171512] font-sans h-full w-full">
    <Suspense
      fallback={
        <div className="h-full flex items-center justify-center">
          <Loader2 className="animate-spin text-[#d0a539]" />
        </div>
      }
    >
      <div className="flex flex-col lg:flex-row h-full w-full">
        <HeroSection />
        <SignInForm />
      </div>
    </Suspense>
  </div>
);

export default Main;
