"use client";

import React, { useState, Suspense, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { resetPassword } from "@/app/actions/auth"; // Import the Server Action

// --- Memoized Hero ---
const ResetHero = memo(() => (
  // ... (ResetHero code remains exactly the same as yours)
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
          Set New Password.
        </h1>
        <p className="text-white/80 text-lg font-light leading-relaxed">
          Create a strong password to protect your portfolio and personal
          information.
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
const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract token from ?token=xyz
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    password: "",
    password_confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Visibility Toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setStatus("error");
      setErrorMessage(
        "Missing reset token. Please use the exact link from your email.",
      );
      return;
    }

    if (formData.password !== formData.password_confirm) {
      setStatus("error");
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (formData.password.length < 8) {
      setStatus("error");
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    setStatus("idle");

    try {
      // Call the Server Action
      const response = await resetPassword(token, formData.password);

      if (response.success) {
        setStatus("success");
        setTimeout(() => router.push("/authentication/signin"), 3000);
      } else {
        setStatus("error");
        setErrorMessage(response.error || "Invalid link or server error.");
      }
    } catch (err: any) {
      console.error("Password reset failed", err);
      setStatus("error");
      setErrorMessage("A network error occurred. Please try again.");
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
              Set New Password
            </h2>
            <p className="text-[#171512]/60 text-sm leading-relaxed">
              Enter your new password below.
            </p>
          </div>

          {status === "success" ? (
            <div className="text-green-800 p-8 rounded-2xl border border-green-100 text-center space-y-4 animate-in fade-in zoom-in">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto text-green-600 mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="font-black text-2xl text-green-900">Success!</h3>
              <p className="text-sm font-medium">
                Your password has been reset successfully.
              </p>
              <Link
                href="/authentication/signin"
                className="inline-block w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 shadow-lg shadow-green-600/20 mt-4"
              >
                Proceed to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === "error" && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm flex items-start gap-3 border border-red-100">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <div>{errorMessage}</div>
                </div>
              )}

              {/* NEW PASSWORD FIELD */}
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-widest text-[#171512]/50">
                  New Password
                </label>
                <div className="relative">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full border border-gray-200 rounded-lg text-sm px-4 py-3 bg-gray-50 focus:border-[#d0a539] focus:ring-2 focus:ring-[#d0a539] outline-none transition-colors"
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

              {/* CONFIRM PASSWORD FIELD */}
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-widest text-[#171512]/50">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    name="password_confirm"
                    value={formData.password_confirm}
                    onChange={handleChange}
                    className="block w-full border border-gray-200 rounded-lg text-sm px-4 py-3 bg-gray-50 focus:border-[#d0a539] focus:ring-2 focus:ring-[#d0a539] outline-none transition-colors"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#171512]/40 hover:text-[#d0a539] transition-colors"
                  >
                    <span className="text-xs font-bold">
                      {showConfirmPassword ? "HIDE" : "SHOW"}
                    </span>
                  </button>
                </div>
              </div>

              <button
                disabled={loading}
                className="w-full bg-[#d0a539] text-[#171512] font-black uppercase tracking-[0.2em] py-4 rounded-lg hover:bg-opacity-90 transition-all shadow-lg shadow-[#d0a539]/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <>Resetting...</> : "Reset Password"}
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
      {/* Suspense is required here because we are using useSearchParams() */}
      <Suspense
        fallback={
          <div className="h-full flex items-center justify-center bg-white">
            <Loader2 className="text-[#d0a539] animate-spin" />
          </div>
        }
      >
        <div className="flex flex-col lg:flex-row h-full w-full">
          <ResetHero />
          <ResetPasswordForm />
        </div>
      </Suspense>
    </div>
  );
}
