"use client";

import React, { useState, useEffect } from "react";
import { X, Loader2, CheckCircle, User, Mail, Phone, Lock, Shield } from "lucide-react";

export interface UserFormState {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password?: string; // Optional for edit
  role: "STAFF" | "USER";
  isActive: boolean;
}

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<any>;
  initialData?: Partial<UserFormState> | null;
}

export default function AddUserModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: AddUserModalProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState<UserFormState>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "USER",
    isActive: true,
  });

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          ...initialData,
          password: "", // Reset password field on edit
          firstName: initialData.firstName || "",
          lastName: initialData.lastName || "",
          email: initialData.email || "",
          phoneNumber: initialData.phoneNumber || "",
          role: initialData.role || "USER",
          isActive: initialData.isActive ?? true,
        });
      } else {
        // Reset for new user
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          password: "",
          role: "USER",
          isActive: true,
        });
      }
      setStatus("idle");
      setErrorMessage("");
    }
  }, [isOpen, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const payload = new FormData();
    payload.append("firstName", formData.firstName);
    payload.append("lastName", formData.lastName);
    payload.append("email", formData.email);
    payload.append("phoneNumber", formData.phoneNumber);
    payload.append("role", formData.role);
    payload.append("isActive", String(formData.isActive));
    
    // Only append password if it exists (required for create, optional for edit)
    if (formData.password) {
        payload.append("password", formData.password);
    }

    const result = await onSubmit(payload);

    if (result.success) {
      setStatus("success");
      setTimeout(() => {
        onClose();
        setStatus("idle");
      }, 1500);
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Something went wrong");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#171512]/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[100dvh] sm:max-h-[90vh] animate-in fade-in zoom-in duration-200">
        
        {status === "success" ? (
          <div className="p-12 flex-1 flex flex-col items-center justify-center text-center min-h-[300px]">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-black text-[#171512]">Success!</h3>
            <p className="text-[#171512]/50 text-sm mt-2">User record updated successfully.</p>
          </div>
        ) : (
          <>
            {/* Fixed Header */}
            <div className="shrink-0 p-5 sm:p-6 border-b border-[#171512]/5 flex items-center justify-between bg-[#f8f7f6]">
              <div>
                <h3 className="text-lg sm:text-xl font-black font-serif text-[#171512]">
                  {initialData ? "Edit User" : "Add New User"}
                </h3>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 -mr-2 text-[#171512]/30 hover:text-[#171512] transition-colors rounded-full hover:bg-white"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
              
              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-8">
                {errorMessage && (
                  <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-start gap-3">
                    <span className="shrink-0">⚠️</span>
                    <p>{errorMessage}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  {/* First Name */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#171512]/60">First Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#171512]/30" />
                      <input 
                        required 
                        className="w-full pl-10 pr-4 py-3 bg-[#f8f7f6] rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#d0a539]/20 outline-none transition-all" 
                        value={formData.firstName}
                        onChange={e => setFormData({...formData, firstName: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#171512]/60">Last Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#171512]/30" />
                      <input 
                        required 
                        className="w-full pl-10 pr-4 py-3 bg-[#f8f7f6] rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#d0a539]/20 outline-none transition-all" 
                        value={formData.lastName}
                        onChange={e => setFormData({...formData, lastName: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#171512]/60">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#171512]/30" />
                      <input 
                        required 
                        type="email"
                        className="w-full pl-10 pr-4 py-3 bg-[#f8f7f6] rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#d0a539]/20 outline-none transition-all" 
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#171512]/60">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#171512]/30" />
                      <input 
                        className="w-full pl-10 pr-4 py-3 bg-[#f8f7f6] rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#d0a539]/20 outline-none transition-all" 
                        value={formData.phoneNumber}
                        onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* Role */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#171512]/60">Role</label>
                    <div className="relative">
                      <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#171512]/30" />
                      <select 
                        className="w-full pl-10 pr-10 py-3 bg-[#f8f7f6] rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#d0a539]/20 outline-none appearance-none cursor-pointer transition-all"
                        value={formData.role}
                        onChange={e => setFormData({...formData, role: e.target.value as "USER" | "STAFF"})}
                      >
                          <option value="USER">Standard User</option>
                          <option value="STAFF">Admin Staff</option>
                      </select>
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#171512]/60">
                      {initialData ? "New Password (Leave blank to keep current)" : "Password"}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#171512]/30" />
                      <input 
                        type="password"
                        required={!initialData}
                        className="w-full pl-10 pr-4 py-3 bg-[#f8f7f6] rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#d0a539]/20 outline-none transition-all" 
                        value={formData.password}
                        onChange={e => setFormData({...formData, password: e.target.value})}
                        placeholder={initialData ? "••••••••" : "Enter secure password"}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Fixed Footer */}
              <div className="shrink-0 p-5 sm:p-6 border-t border-[#171512]/5 bg-white flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4">
                <button 
                  type="button" 
                  onClick={onClose} 
                  className="w-full sm:w-auto px-6 py-3.5 sm:py-3 text-xs font-black uppercase tracking-widest text-[#171512]/50 hover:text-[#171512] transition-colors rounded-xl hover:bg-[#f8f7f6]"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto bg-[#171512] text-white px-8 py-3.5 sm:py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#d0a539] hover:text-[#171512] transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  {status === 'submitting' && <Loader2 className="w-4 h-4 animate-spin" />}
                  {initialData ? "Save Changes" : "Create User"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}