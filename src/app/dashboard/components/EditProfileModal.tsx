// "use client";

// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useMemo,
// } from "react";
// import { X, Camera } from "lucide-react";
// import { updateProfile } from "@/app/actions/profileActions";

// // 👇 1. DEFINE THE TYPE HERE (Matches your Server Action return)
// export interface UserProfile {
//   id: string; // Server actions usually return String IDs (MongoDB/Prisma)
//   email: string;
//   isApproved: boolean; // Server Action returns 'isApproved' (camelCase)
//   first_name: string;
//   last_name: string;
//   phone_number: string;
//   address: string;
//   profile_picture: string | null;
// }

// interface EditProfileModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   currentUser: UserProfile | null;
//   onSuccess: (updatedProfile: UserProfile) => void;
// }

// const EditProfileModalComponent: React.FC<EditProfileModalProps> = ({
//   isOpen,
//   onClose,
//   currentUser,
//   onSuccess,
// }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [previewImage, setPreviewImage] = useState<string | null>(null);

//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     phone_number: "",
//     address: "",
//   });

//   // Data Mapping Engine
//   const defaultValues = useMemo(() => {
//     if (!currentUser) {
//       return {
//         first_name: "",
//         last_name: "",
//         phone_number: "",
//         address: "",
//         profile_picture: null,
//       };
//     }

//     // Since we typed currentUser as UserProfile, TS knows these fields exist.
//     // We still keep the fallbacks for safety.
//     return {
//       first_name: currentUser.first_name || "",
//       last_name: currentUser.last_name || "",
//       phone_number: currentUser.phone_number || "",
//       address: currentUser.address || "",
//       profile_picture: currentUser.profile_picture || null,
//     };
//   }, [currentUser]);

//   // Sync state when modal opens
//   useEffect(() => {
//     if (isOpen) {
//       setFormData({
//         first_name: defaultValues.first_name,
//         last_name: defaultValues.last_name,
//         phone_number: defaultValues.phone_number,
//         address: defaultValues.address,
//       });
//       setPreviewImage(defaultValues.profile_picture);
//       setError(null);
//       if (!selectedFile) setSelectedFile(null); 
//     }
//   }, [isOpen, defaultValues]); 

//   // Cleanup
//   useEffect(() => {
//     return () => {
//       if (previewImage && previewImage.startsWith("blob:")) {
//         URL.revokeObjectURL(previewImage);
//       }
//     };
//   }, [previewImage]);

//   const handleChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//       setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//     },
//     []
//   );

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setSelectedFile(file);
//       const objectUrl = URL.createObjectURL(file);
//       setPreviewImage(objectUrl);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setIsLoading(true);

//     try {
//       const submitData = new FormData();
//       submitData.append("first_name", formData.first_name);
//       submitData.append("last_name", formData.last_name);
//       submitData.append("phone_number", formData.phone_number);
//       submitData.append("address", formData.address);
      
//       if (selectedFile) {
//         submitData.append("profile_picture", selectedFile);
//       }

//       const result = await updateProfile(submitData);

//       if (result.success && result.user) {
//         // Force cast the result to UserProfile to match the interface
//         onSuccess(result.user as unknown as UserProfile);
//         onClose();
//       } else {
//         setError(result.error || "Failed to update profile");
//       }
//     } catch (err) {
//       console.error("Submission Error:", err);
//       setError("An unexpected error occurred.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-[#171512]/80 backdrop-blur-sm transition-opacity"
//         onClick={onClose}
//       ></div>

//       <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
//         <div className="bg-[#171512] px-6 py-5 flex justify-between items-center shrink-0">
//           <div>
//             <h3 className="text-xl font-serif font-bold text-white">
//               Edit Profile
//             </h3>
//             <p className="text-[#d0a539] text-[10px] uppercase tracking-[0.2em] font-bold mt-1">
//               Update your details
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="text-white/50 hover:text-[#d0a539] transition-colors p-1 rounded-full hover:bg-white/5"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         <div className="overflow-y-auto p-6 lg:p-8 custom-scrollbar">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {error && (
//               <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg border border-red-100">
//                 {error}
//               </div>
//             )}

//             {/* Profile Picture Section */}
//             <div className="flex items-center gap-5 pb-4 border-b border-[#171512]/5">
//               <div className="relative h-20 w-20 shrink-0">
//                 <div className="h-full w-full rounded-full bg-[#171512]/5 border-2 border-dashed border-[#171512]/20 flex items-center justify-center overflow-hidden">
//                   {previewImage ? (
//                     // eslint-disable-next-line @next/next/no-img-element
//                     <img
//                       src={previewImage}
//                       alt="Preview"
//                       className="h-full w-full object-cover"
//                     />
//                   ) : (
//                     <Camera size={28} className="text-[#171512]/30" />
//                   )}
//                 </div>
//                 <input
//                   type="file"
//                   id="profile_pic"
//                   accept="image/png, image/jpeg, image/jpg"
//                   onChange={handleFileChange}
//                   className="hidden"
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="profile_pic"
//                   className="inline-block cursor-pointer bg-[#171512] text-[#d0a539] px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-[#d0a539] hover:text-[#171512] transition-colors"
//                 >
//                   Change Photo
//                 </label>
//                 <p className="text-[10px] text-gray-400 mt-2 font-medium">
//                   Supports JPG, PNG (Max 2MB)
//                 </p>
//               </div>
//             </div>

//             {/* Name Fields */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//               <div className="space-y-1">
//                 <label className="text-xs font-bold uppercase tracking-wider text-[#171512]/60">
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   name="first_name"
//                   value={formData.first_name}
//                   onChange={handleChange}
//                   className="w-full bg-[#f8f7f6] border border-[#171512]/10 rounded-lg px-4 py-3 text-[#171512] focus:outline-none focus:border-[#d0a539] focus:ring-1 focus:ring-[#d0a539] transition-all font-medium text-sm"
//                 />
//               </div>
//               <div className="space-y-1">
//                 <label className="text-xs font-bold uppercase tracking-wider text-[#171512]/60">
//                   Last Name
//                 </label>
//                 <input
//                   type="text"
//                   name="last_name"
//                   value={formData.last_name}
//                   onChange={handleChange}
//                   className="w-full bg-[#f8f7f6] border border-[#171512]/10 rounded-lg px-4 py-3 text-[#171512] focus:outline-none focus:border-[#d0a539] focus:ring-1 focus:ring-[#d0a539] transition-all font-medium text-sm"
//                 />
//               </div>
//             </div>

//             <div className="space-y-1">
//               <label className="text-xs font-bold uppercase tracking-wider text-[#171512]/60">
//                 Phone Number
//               </label>
//               <input
//                 type="tel"
//                 name="phone_number"
//                 value={formData.phone_number}
//                 onChange={handleChange}
//                 placeholder="+234..."
//                 className="w-full bg-[#f8f7f6] border border-[#171512]/10 rounded-lg px-4 py-3 text-[#171512] focus:outline-none focus:border-[#d0a539] focus:ring-1 focus:ring-[#d0a539] transition-all font-medium text-sm"
//               />
//             </div>

//             <div className="space-y-1">
//               <label className="text-xs font-bold uppercase tracking-wider text-[#171512]/60">
//                 Residential Address
//               </label>
//               <textarea
//                 name="address"
//                 rows={3}
//                 value={formData.address}
//                 onChange={handleChange}
//                 className="w-full bg-[#f8f7f6] border border-[#171512]/10 rounded-lg px-4 py-3 text-[#171512] focus:outline-none focus:border-[#d0a539] focus:ring-1 focus:ring-[#d0a539] transition-all font-medium resize-none text-sm"
//               />
//             </div>

//             <div className="pt-4 flex gap-3">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="flex-1 px-4 py-3 border border-[#171512]/10 rounded-xl text-sm font-bold uppercase tracking-widest text-[#171512]/60 hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="flex-1 px-4 py-3 bg-[#171512] text-[#d0a539] rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-[#d0a539] hover:text-[#171512] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#d0a539]/10"
//               >
//                 {isLoading ? "Updating..." : "Save Changes"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export const EditProfileModal = React.memo(EditProfileModalComponent);






"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { X, Camera } from "lucide-react";
import { updateProfile } from "@/app/actions/profileActions";

// 👇 1. Define and export the single source of truth for the user profile type
export interface UserProfile {
  id: string;
  email: string;
  is_approved: boolean; // Corrected to match your database snake_case
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  profile_picture: string | null;
}

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onSuccess: (updatedProfile: UserProfile) => void;
}

const EditProfileModalComponent: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    address: "",
  });

  // Data Mapping Engine
  const defaultValues = useMemo(() => {
    if (!currentUser) {
      return {
        first_name: "",
        last_name: "",
        phone_number: "",
        address: "",
        profile_picture: null,
      };
    }

    return {
      first_name: currentUser.first_name || "",
      last_name: currentUser.last_name || "",
      phone_number: currentUser.phone_number || "",
      address: currentUser.address || "",
      profile_picture: currentUser.profile_picture || null,
    };
  }, [currentUser]);

  // Sync state when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        first_name: defaultValues.first_name,
        last_name: defaultValues.last_name,
        phone_number: defaultValues.phone_number,
        address: defaultValues.address,
      });
      setPreviewImage(defaultValues.profile_picture);
      setError(null);
      if (!selectedFile) setSelectedFile(null);
    }
  }, [isOpen, defaultValues]);

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewImage && previewImage.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const submitData = new FormData();
      submitData.append("first_name", formData.first_name);
      submitData.append("last_name", formData.last_name);
      submitData.append("phone_number", formData.phone_number);
      submitData.append("address", formData.address);

      if (selectedFile) {
        submitData.append("profile_picture", selectedFile);
      }

      const result = await updateProfile(submitData);

      if (result.success && result.user) {
        onSuccess(result.user as unknown as UserProfile);
        onClose();
      } else {
        setError(result.error || "Failed to update profile");
      }
    } catch (err) {
      console.error("Submission Error:", err);
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#171512]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative z-10 bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
        <div className="bg-[#171512] px-6 py-5 flex justify-between items-center shrink-0">
          <div>
            <h3 className="text-xl font-serif font-bold text-white">
              Edit Profile
            </h3>
            <p className="text-[#d0a539] text-[10px] uppercase tracking-[0.2em] font-bold mt-1">
              Update your details
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-[#d0a539] transition-colors p-1 rounded-full hover:bg-white/5"
          >
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto p-6 lg:p-8 custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg border border-red-100">
                {error}
              </div>
            )}

            {/* Profile Picture Section */}
            <div className="flex items-center gap-5 pb-4 border-b border-[#171512]/5">
              <div className="relative h-20 w-20 shrink-0">
                <div className="h-full w-full rounded-full bg-[#171512]/5 border-2 border-dashed border-[#171512]/20 flex items-center justify-center overflow-hidden">
                  {previewImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Camera size={28} className="text-[#171512]/30" />
                  )}
                </div>
                <input
                  type="file"
                  id="profile_pic"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <div>
                <label
                  htmlFor="profile_pic"
                  className="inline-block cursor-pointer bg-[#171512] text-[#d0a539] px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-[#d0a539] hover:text-[#171512] transition-colors"
                >
                  Change Photo
                </label>
                <p className="text-[10px] text-gray-400 mt-2 font-medium">
                  Supports JPG, PNG (Max 2MB)
                </p>
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#171512]/60">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full bg-[#f8f7f6] border border-[#171512]/10 rounded-lg px-4 py-3 text-[#171512] focus:outline-none focus:border-[#d0a539] focus:ring-1 focus:ring-[#d0a539] transition-all font-medium text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#171512]/60">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full bg-[#f8f7f6] border border-[#171512]/10 rounded-lg px-4 py-3 text-[#171512] focus:outline-none focus:border-[#d0a539] focus:ring-1 focus:ring-[#d0a539] transition-all font-medium text-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#171512]/60">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="+234..."
                className="w-full bg-[#f8f7f6] border border-[#171512]/10 rounded-lg px-4 py-3 text-[#171512] focus:outline-none focus:border-[#d0a539] focus:ring-1 focus:ring-[#d0a539] transition-all font-medium text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#171512]/60">
                Residential Address
              </label>
              <textarea
                name="address"
                rows={3}
                value={formData.address}
                onChange={handleChange}
                className="w-full bg-[#f8f7f6] border border-[#171512]/10 rounded-lg px-4 py-3 text-[#171512] focus:outline-none focus:border-[#d0a539] focus:ring-1 focus:ring-[#d0a539] transition-all font-medium resize-none text-sm"
              />
            </div>

            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-[#171512]/10 rounded-xl text-sm font-bold uppercase tracking-widest text-[#171512]/60 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-[#171512] text-[#d0a539] rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-[#d0a539] hover:text-[#171512] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#d0a539]/10"
              >
                {isLoading ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const EditProfileModal = React.memo(EditProfileModalComponent);