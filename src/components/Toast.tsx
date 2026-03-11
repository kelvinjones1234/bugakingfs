"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

// --- Types ---
export type ToastType = "success" | "error";

interface ToastProps { 
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextType {
  toast: (options: Omit<ToastProps, "id">) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
}

// --- Context ---
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// --- Individual Toast UI Component ---
const ToastMessage: React.FC<ToastProps & { onClose: (id: string) => void }> = ({
  id,
  type,
  title,
  message,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), 5000); // Auto-dismiss after 5s
    return () => clearTimeout(timer);
  }, [id, onClose]);

  const isSuccess = type === "success";

  return (
    <div className={`
      bg-white p-4 sm:p-5 rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] 
      border-t-4 w-full max-w-sm pointer-events-auto flex items-start gap-3
      animate-in slide-in-from-bottom-5 fade-in duration-300
      ${isSuccess ? "border-emerald-500" : "border-red-500"}
    `}>
      {/* Icon */}
      <div className="shrink-0 mt-0.5">
        {isSuccess ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        ) : (
          <AlertCircle className="w-5 h-5 text-red-500" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-black text-[#171512] mb-1">
          {title}
        </p>
        {message && (
          <p className="text-xs font-bold text-[#171512]/60">
            {message}
          </p>
        )}
      </div>

      {/* Close Button */}
      <button 
        onClick={() => onClose(id)}
        className="shrink-0 text-[#171512]/30 hover:text-[#171512] transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// --- Provider Component ---
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback(({ type, title, message }: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);
  }, []);

  const success = useCallback((title: string, message?: string) => {
    toast({ type: "success", title, message });
  }, [toast]);

  const error = useCallback((title: string, message?: string) => {
    toast({ type: "error", title, message });
  }, [toast]);

  return (
    <ToastContext.Provider value={{ toast, success, error }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-3 pointer-events-none">
        {toasts.map((t) => (
          <ToastMessage key={t.id} {...t} onClose={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  ); 
};

// --- Hook ---
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};