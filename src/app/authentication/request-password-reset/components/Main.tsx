"use client";

import React, { useState, Suspense, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";
// Import the Next.js Server Action
import { requestPasswordReset } from "@/app/actions/auth"; 

// --- Memoized Hero ---
const ResetHero = memo(() => (
  <div className="hidden lg:flex lg:w-1/2 relative h-full overflow-hidden">
    <div className="absolute inset-0 z-10 bg-black/40"></div>
    <div className="absolute inset-0 z-0">
      <Image
        src="/signin_img.jpg"
        alt="Secure Investment Background"
        fill
        priority
        sizes="50vw"
        className="object-cover object-center scale-105"
      />
    </div>
    <div className="relative z-20 flex flex-col justify-between px-16 pt-[8rem] w-full h-full">
      <div className="max-w-md">
        <h1 className="text-white text-5xl font-black leading-tight mb-6">
          Secure Your Assets.
        </h1>
        <p className="text-white/80 text-lg font-light leading-relaxed">
          We prioritize the security of your portfolio. Reset your password to
          regain access.
        </p>
      </div>
      <div className="text-white/90 text-xs font-bold uppercase tracking-[0.3em] mb-12">
        © 2026 BugaKing Group
      </div>
    </div>
  </div>
));
ResetHero.displayName = "ResetHero";

// --- Form Logic ---
const RequestResetForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setMessage("");

    try {
      // Call the Server Action directly
      const response = await requestPasswordReset(email);

      if (response?.success) {
        setStatus("success");
        setMessage(response.message || "Check your email for a reset link.");
      } else {
        setStatus("error");
        setMessage(response?.error || "Failed to send reset email.");
      }
    } catch (err: any) {
      console.error("Reset request failed", err);
      setStatus("error");
      setMessage("A network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-white">
      <div className="flex flex-col items-center justify-center min-h-full p-8 sm:p-12 lg:p-20">
        <div className="w-full max-w-md space-y-8 my-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tight text-[#171512]">
              Request Password Reset
            </h2>
            <p className="text-[#171512]/60 text-sm leading-relaxed">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </div>

          {status === "error" && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100">
              {message}
            </div>
          )}

          {status === "success" ? (
            <div className="p-6 rounded-xl border border-green-100 text-center space-y-4 animate-in fade-in zoom-in">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto text-2xl">
                ✉️
              </div>
              <div>
                <h3 className="font-bold text-lg text-green-900">
                  Email Sent!
                </h3>
                <p className="text-sm mt-1">{message}</p>
              </div>
              <button
                onClick={() => {
                  setStatus("idle");
                  setEmail(""); // Optionally clear the input
                }}
                className="text-xs font-bold underline text-green-700"
              >
                Send again
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-widest text-[#171512]/50">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full border border-gray-200 rounded-lg text-sm px-4 py-3 bg-gray-50 focus:border-[#d0a539] focus:ring-2 focus:ring-[#d0a539] outline-none"
                  placeholder="j.doe@example.com"
                />
              </div>
              <button
                disabled={loading}
                className="w-full bg-[#d0a539] text-[#171512] font-black uppercase tracking-[0.2em] py-4 rounded-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    Sending Link...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>
          )}

          <div className="border-t border-gray-100 pt-6 text-center">
            <Link
              href="/authentication/signin"
              className="text-[#d0a539] font-black uppercase tracking-tighter hover:underline text-sm"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Main() {
  return (
    <div className="bg-white text-[#171512] font-sans h-full w-full">
      <Suspense
        fallback={
          <div className="h-full flex items-center justify-center bg-white">
            <Loader2 className="text-[#d0a539] animate-spin" />
          </div>
        }
      >
        <div className="flex flex-col lg:flex-row h-full w-full">
          <ResetHero />
          <RequestResetForm />
        </div>
      </Suspense>
    </div>
  );
}