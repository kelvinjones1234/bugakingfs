"use client";
import React, { useState, useMemo, useRef } from "react";
import {
  X,
  Search,
  Check,
  ChevronsUpDown,
  Loader2,
  Paperclip,
} from "lucide-react";

export default function AddDocumentModal({
  isOpen,
  onClose,
  users = [],
  initialData, // 👈 Must be here!
  onSubmit,
}: any) {
  const [title, setTitle] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [userSearch, setUserSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredUsers = useMemo(() => {
    const query = userSearch.toLowerCase();
    return users.filter(
      (u: any) =>
        u.email.toLowerCase().includes(query) ||
        u.firstName.toLowerCase().includes(query) ||
        u.lastName.toLowerCase().includes(query),
    );
  }, [userSearch, users]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Inside AddDocumentModal.tsx

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validation check
    if (!selectedUser || (!selectedFile && !initialData)) {
      alert("Please select a user and a file.");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("userId", selectedUser.id);

      // Only append file if a new one was selected
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      // 2. Call the prop function
      const result = await onSubmit(formData);

      if (result?.success) {
        // Reset and close on success
        setTitle("");
        setSelectedFile(null);
        setSelectedUser(null);
        onClose();
      } else {
        alert(result?.error || "Failed to save document.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("An unexpected error occurred.");
    } finally {
      // 3. This ALWAYS runs, preventing the "stuck" loading state
      setIsLoading(false);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#171512]/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="p-6 border-b border-[#171512]/5 flex justify-between items-center bg-[#f8f7f6]/50">
          <h2 className="text-2xl font-black font-serif text-[#171512]">
            Upload Document
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-[#171512]/40" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Custom File Picker */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#171512]/50">
              Attachment
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`w-full px-4 py-4 rounded-xl border-2 border-dashed transition-all flex items-center gap-3 cursor-pointer ${
                selectedFile
                  ? "border-[#d0a539] bg-[#d0a539]/5"
                  : "border-[#171512]/10 bg-[#f8f7f6] hover:border-[#d0a539]/40"
              }`}
            >
              <div
                className={`p-2 rounded-lg ${selectedFile ? "bg-[#d0a539] text-white" : "bg-[#171512]/5 text-[#171512]/40"}`}
              >
                <Paperclip className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#171512] truncate">
                  {selectedFile
                    ? selectedFile.name
                    : "Select Document (PDF, JPG, PNG)"}
                </p>
                {selectedFile && (
                  <p className="text-[10px] text-[#171512]/40 uppercase font-black">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,image/*"
              />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#171512]/50">
              Document Title
            </label>
            <input
              required
              className="w-full px-4 py-3 bg-[#f8f7f6] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#d0a539]/20 outline-none"
              placeholder="e.g. Land Agreement"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Owner Dropdown */}
          <div className="space-y-2 relative">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#171512]/50">
              Assign Owner
            </label>
            <div
              className="w-full px-4 py-3 bg-[#f8f7f6] rounded-xl flex items-center justify-between cursor-pointer border-2 border-transparent focus:border-[#d0a539]/40"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="text-sm font-bold text-[#171512]">
                {selectedUser
                  ? `${selectedUser.firstName} ${selectedUser.lastName}`
                  : "Select a User"}
              </span>
              <ChevronsUpDown className="w-4 h-4 text-[#171512]/30" />
            </div>

            {isDropdownOpen && (
              <div className="absolute z-20 w-full mt-2 bg-white border border-[#171512]/10 rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-2 border-b border-[#171512]/5 bg-[#f8f7f6]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#171512]/40" />
                    <input
                      autoFocus
                      className="w-full pl-9 pr-4 py-2 bg-white border-none rounded-lg text-xs outline-none"
                      placeholder="Search users..."
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
                <div className="max-h-[200px] overflow-y-auto">
                  {filteredUsers.map((u: any) => (
                    <div
                      key={u.id}
                      className="px-4 py-3 hover:bg-[#d0a539]/5 cursor-pointer flex justify-between items-center group"
                      onClick={() => {
                        setSelectedUser(u);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#171512]">
                          {u.firstName} {u.lastName}
                        </span>
                        <span className="text-[10px] text-[#171512]/40 uppercase font-black">
                          {u.email}
                        </span>
                      </div>
                      {selectedUser?.id === u.id && (
                        <Check className="w-4 h-4 text-[#d0a539]" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading || !selectedFile || !selectedUser}
            className="w-full bg-[#171512] text-white py-4 rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-[#d0a539] transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Upload to Archive"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
