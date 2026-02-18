"use client";

import React, { useState, Suspense, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { registerUser } from "@/app/actions/register"; // Import the server action

// ==========================================
// 1. STATIC HERO COMPONENT (Optimized)
// ==========================================
const SignUpHero = memo(() => {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative h-full overflow-hidden">
      <div className="absolute inset-0 z-10 bg-black/40"></div>

      <div className="absolute inset-0 z-0">
        <Image
          src="/signup_img.jpg"
          alt="Agriculture Investment Background"
          fill
          priority
          sizes="50vw"
          className="object-cover object-center scale-105"
        />
      </div>

      <div className="relative z-20 flex flex-col justify-between p-16 w-full h-full">
        <div className="max-w-md">
          <h1 className="text-white text-5xl font-black leading-tight mb-6">
            Start Your Land Investment Journey.
          </h1>
          <p className="text-white/80 text-lg font-light leading-relaxed">
            Create an account to invest in farmland and earn reliable annual
            returns through professionally managed agriculture.
          </p>
        </div>
        <div className="text-white/90 text-xs font-bold uppercase tracking-[0.3em]">
          © 2026 BugaKing Group
        </div>
      </div>
    </div>
  );
});

SignUpHero.displayName = "SignUpHero";

// ==========================================
// 2. FORM COMPONENT (Logic Refactored for NextAuth/Server Actions)
// ==========================================
const SignUpForm = () => {
  const router = useRouter();

  // Local UI States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    // Client-side Validation
    if (formData.get("password") !== formData.get("password_confirm")) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const result = await registerUser(formData);

      if (result.success) {
        // Redirect to sign-in with success state
        router.push("/authentication/signin?success=true");
      } else {
        setError(result.error || "An error occurred during registration.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-white">
      <div className="flex flex-col items-center justify-center min-h-full p-6 sm:p-12 lg:p-20">
        <div className="w-full max-w-md space-y-8 my-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tight text-[#171512]">
              Create Your Account
            </h2>
            <p className="text-[#171512]/60 text-sm">
              Begin your journey with the world's premier investment group.
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm animate-in fade-in slide-in-from-top-2 border border-red-100 flex items-start gap-2">
              <span className="font-bold">Error:</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-widest text-[#171512]/50">
                  First Name
                </label>
                <input
                  name="firstName" // Matches Prisma User Model
                  required
                  disabled={loading}
                  className="block w-full border border-gray-200 rounded-lg text-sm px-4 py-3 bg-gray-50 focus:border-[#d0a539] focus:ring-2 focus:ring-[#d0a539] outline-none transition-colors disabled:opacity-50"
                  placeholder="John"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-widest text-[#171512]/50">
                  Last Name
                </label>
                <input
                  name="lastName" // Matches Prisma User Model
                  required
                  disabled={loading}
                  className="block w-full border border-gray-200 rounded-lg text-sm px-4 py-3 bg-gray-50 focus:border-[#d0a539] focus:ring-2 focus:ring-[#d0a539] outline-none transition-colors disabled:opacity-50"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-widest text-[#171512]/50">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                disabled={loading}
                className="block w-full border border-gray-200 rounded-lg text-sm px-4 py-3 bg-gray-50 focus:border-[#d0a539] focus:ring-2 focus:ring-[#d0a539] outline-none transition-colors disabled:opacity-50"
                placeholder="j.doe@example.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-widest text-[#171512]/50">
                Phone Number
              </label>
              <input
                name="phoneNumber" // Matches Prisma User Model
                required
                disabled={loading}
                className="block w-full border border-gray-200 rounded-lg text-sm px-4 py-3 bg-gray-50 focus:border-[#d0a539] focus:ring-2 focus:ring-[#d0a539] outline-none transition-colors disabled:opacity-50"
                placeholder="+234..."
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-widest text-[#171512]/50">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={loading}
                  className="block w-full border border-gray-200 rounded-lg text-sm px-4 py-3 bg-gray-50 focus:border-[#d0a539] focus:ring-2 focus:ring-[#d0a539] outline-none transition-colors disabled:opacity-50"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#171512]/40 hover:text-[#d0a539] transition-colors"
                >
                  <span className="text-xs font-bold">
                    {showPassword ? "HIDE" : "SHOW"}
                  </span>
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-widest text-[#171512]/50">
                Confirm Password
              </label>
              <input
                name="password_confirm"
                type="password"
                required
                disabled={loading}
                className="block w-full border border-gray-200 rounded-lg text-sm px-4 py-3 bg-gray-50 focus:border-[#d0a539] focus:ring-2 focus:ring-[#d0a539] outline-none transition-colors disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-[#d0a539] text-[#171512] font-black uppercase tracking-[0.2em] py-4 rounded-lg hover:bg-opacity-90 transition-all shadow-lg shadow-[#d0a539]/20 disabled:opacity-50"
            >
              {loading ? <>Signing in...</> : "Sign up"}
            </button>
          </form>

          <p className="text-center text-sm text-[#171512]/60 pb-8">
            Already have an account?{" "}
            <Link
              href="/authentication/signin"
              className="text-[#d0a539] font-black uppercase tracking-tighter hover:underline"
            >
              Log in
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
const Main = () => {
  return (
    <div className="bg-white text-[#171512] font-sans h-full w-full">
      <Suspense
        fallback={
          <div className="h-full flex items-center justify-center bg-white">
            <Loader2 className="w-10 h-10 text-[#d0a539] animate-spin" />
          </div>
        }
      >
        <div className="flex flex-col lg:flex-row h-full">
          <SignUpHero />
          <SignUpForm />
        </div>
      </Suspense>
    </div>
  );
};

export default Main;
