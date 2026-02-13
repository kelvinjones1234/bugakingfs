// "use client";

// import React, { useState } from "react";
// import { Hourglass, Lock } from "lucide-react";
// // Import the modal
// import { EditProfileModal } from "./EditProfileModal"; 
// // Import the type definition
// import { UserProfile } from "../api/profileApi"; 

// // Define the props expected from DashboardPage
// interface ApprovalProps {
//   user: UserProfile | null;
//   onProfileUpdate: (updatedUser: UserProfile) => void;
// }

// const Approval: React.FC<ApprovalProps> = ({ user, onProfileUpdate }) => {
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);

//   const gradientStyle = {
//     background:
//       "linear-gradient(135deg, rgba(208, 165, 57, 0.05) 0%, rgba(23, 21, 18, 0.02) 100%)",
//   };

//   return (
//     <div className="bg-[#f8f7f6] min-h-screen text-[#171512] font-sans">
//       {/* Main Content Container */}
//       <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-12 pt-24 lg:pt-12">
        
//         {/* Top Grid: Profile & Status */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-8 lg:mb-12">
          
//           {/* LEFT COLUMN: Profile Overview */}
//           <div className="lg:col-span-5 bg-white border border-[#171512]/5 rounded-2xl p-6 lg:p-8 flex flex-col justify-between shadow-sm order-2 lg:order-1">
//             <div>
//               <div className="flex justify-between items-start mb-6">
//                 <h3 className="text-xl lg:text-2xl font-serif text-[#171512] font-bold">
//                   Profile Overview
//                 </h3>
//                 {/* Profile Picture Thumbnail */}
//                 {user?.profile_picture && (
//                   <div className="h-12 w-12 rounded-full overflow-hidden border border-[#d0a539]/30">
//                     <img
//                       src={user.profile_picture}
//                       alt="Profile"
//                       className="h-full w-full object-cover"
//                     />
//                   </div>
//                 )}
//               </div>

//               <div className="space-y-6">
//                 {/* Name */}
//                 <div>
//                   <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#d0a539] mb-1">
//                     Full Name
//                   </p>
//                   <p className="text-base lg:text-lg font-medium">
//                     {user?.first_name} {user?.last_name}
//                   </p>
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#d0a539] mb-1">
//                     Email Address
//                   </p>
//                   <p className="text-base lg:text-lg font-medium break-words">
//                     {user?.email}
//                   </p>
//                 </div>

//                 {/* Phone */}
//                 <div>
//                   <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#d0a539] mb-1">
//                     Phone Number
//                   </p>
//                   <p className="text-base lg:text-lg font-medium break-words">
//                     {user?.phone_number || (
//                       <span className="text-gray-400 italic text-sm">
//                         Not set
//                       </span>
//                     )}
//                   </p>
//                 </div>

//                 {/* Address */}
//                 <div>
//                   <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#d0a539] mb-1">
//                     Address
//                   </p>
//                   <p className="text-base lg:text-lg font-medium text-[#171512]/80">
//                     {user?.address || (
//                       <span className="text-gray-400 italic text-sm">
//                         Not set
//                       </span>
//                     )}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <button
//               onClick={() => setIsEditModalOpen(true)}
//               className="mt-8 lg:mt-10 w-full py-4 bg-[#171512] text-[#d0a539] border border-[#d0a539]/30 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-[#d0a539] hover:text-[#171512] transition-all duration-300 shadow-lg shadow-[#d0a539]/10"
//             >
//               Edit Profile
//             </button>
//           </div>

//           {/* RIGHT COLUMN: Awaiting Approval Status */}
//           <div
//             className="lg:col-span-7 bg-white border border-[#171512]/5 rounded-2xl p-8 lg:p-12 relative overflow-hidden shadow-sm flex flex-col items-center text-center justify-center order-1 lg:order-2"
//             style={gradientStyle}
//           >
//             <div className="relative z-10 space-y-6 max-w-lg">
//               <div className="flex justify-center mb-2">
//                 <Hourglass
//                   className="text-[#d0a539] opacity-80"
//                   size={50}
//                   strokeWidth={1}
//                 />
//               </div>
//               <h2 className="text-3xl md:text-5xl text-[#171512] font-serif font-bold leading-tight">
//                 Awaiting Approval
//               </h2>
//               <div className="w-16 h-1 bg-[#d0a539] mx-auto rounded-full"></div>

//               <p className="text-[#171512]/70 text-base md:text-lg leading-relaxed font-light">
//                 Our compliance team is currently reviewing your account.
//                 <br /> If your account remains under review for more than{" "}
//                 <span className="text-[#d0a539] font-bold whitespace-nowrap">
//                   48 hours
//                 </span>
//                 , please contact our support team for assistance.
//               </p>

//               <div className="flex items-center justify-center gap-2 pt-4">
//                 <div className="w-2 h-2 rounded-full bg-[#d0a539] animate-pulse"></div>
//                 <span className="text-[10px] uppercase font-black tracking-[0.3em] text-[#d0a539]">
//                   In Progress
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* LOCKED FEATURES SECTION */}
//         <div className="relative rounded-3xl overflow-hidden border border-[#171512]/10 bg-white mb-8 lg:mb-12 shadow-sm">
//           {/* Blurred Background Content */}
//           <div className="p-6 lg:p-12 flex flex-col gap-10 opacity-30 grayscale blur-[2px] pointer-events-none select-none">
//             <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-[#171512]/10 pb-6 gap-4">
//               <h3 className="text-2xl lg:text-3xl font-serif font-bold text-[#171512]">
//                 90-Day Progress Tracker
//               </h3>
//               <div className="flex gap-4">
//                 <div className="h-8 w-16 sm:w-24 bg-[#171512]/10 rounded"></div>
//                 <div className="h-8 w-16 sm:w-24 bg-[#171512]/10 rounded"></div>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
//               <div className="h-24 lg:h-32 bg-[#171512]/5 rounded-xl border border-dashed border-[#171512]/20"></div>
//               <div className="h-24 lg:h-32 bg-[#171512]/5 rounded-xl border border-dashed border-[#171512]/20"></div>
//               <div className="h-24 lg:h-32 bg-[#171512]/5 rounded-xl border border-dashed border-[#171512]/20"></div>
//               <div className="h-24 lg:h-32 bg-[#171512]/5 rounded-xl border border-dashed border-[#171512]/20"></div>
//             </div>
//           </div>

//           {/* Lock Overlay */}
//           <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#f8f7f6]/20 backdrop-blur-[2px] px-4 text-center">
//             <div className="bg-[#171512] text-white p-4 rounded-full shadow-2xl mb-4 border-2 border-[#d0a539]">
//               <Lock className="text-2xl lg:text-3xl" size={32} />
//             </div>
//             <p className="text-[10px] lg:text-[12px] font-black uppercase tracking-[0.4em] text-[#171512]">
//               Features Locked
//             </p>
//             <p className="text-[#171512]/60 text-xs lg:text-sm mt-1">
//               Unlock after account approval
//             </p>
//           </div>
//         </div>

//         {/* SUPPORT SECTION */}
//         <section className="bg-[#171512] rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden shadow-2xl">
//           <div className="absolute top-0 right-0 w-1/3 h-full bg-[#d0a539]/5 skew-x-12 transform translate-x-1/4"></div>

//           <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
//             <div className="space-y-4 max-w-2xl">
//               <span className="text-[#d0a539] text-[10px] font-black uppercase tracking-[0.5em]">
//                 Support & Assistance
//               </span>
//               <h2 className="text-2xl md:text-4xl font-serif font-bold">
//                 Need assistance with your{" "}
//                 <span className="italic text-[#d0a539]">verification?</span>
//               </h2>
//               <p className="text-white/60 text-base lg:text-lg leading-relaxed">
//                 Our dedicated service team is available 24/7 to help you
//                 navigate the approval process.
//               </p>
//             </div>
//             <button className="whitespace-nowrap bg-[#d0a539] text-[#171512] px-8 py-4 lg:px-10 lg:py-5 rounded-xl text-xs lg:text-sm font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-xl shadow-[#d0a539]/20 w-full lg:w-auto">
//               Contact Support
//             </button>
//           </div>
//         </section>
//       </main>

//       {/* MODAL COMPONENT */}
//       <EditProfileModal
//         isOpen={isEditModalOpen}
//         onClose={() => setIsEditModalOpen(false)}
//         currentUser={user}
//         onSuccess={onProfileUpdate} 
//       />
//     </div>
//   );
// };

// export default Approval;









"use client";

import React, { useState } from "react";
import { Hourglass, Lock } from "lucide-react";
// 👇 2. Import BOTH the modal and the type directly from the modal file
import { EditProfileModal, UserProfile } from "./EditProfileModal";

// Define the props expected from DashboardPage
interface ApprovalProps {
  user: UserProfile | null;
  onProfileUpdate: (updatedUser: UserProfile) => void;
}

const Approval: React.FC<ApprovalProps> = ({ user, onProfileUpdate }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const gradientStyle = {
    background:
      "linear-gradient(135deg, rgba(208, 165, 57, 0.05) 0%, rgba(23, 21, 18, 0.02) 100%)",
  };

  return (
    <div className="bg-[#f8f7f6] min-h-screen text-[#171512] font-sans">
      {/* Main Content Container */}
      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-12 pt-24 lg:pt-12">
        
        {/* Top Grid: Profile & Status */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-8 lg:mb-12">
          
          {/* LEFT COLUMN: Profile Overview */}
          <div className="lg:col-span-5 bg-white border border-[#171512]/5 rounded-2xl p-6 lg:p-8 flex flex-col justify-between shadow-sm order-2 lg:order-1">
            <div>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl lg:text-2xl font-serif text-[#171512] font-bold">
                  Profile Overview
                </h3>
                {/* Profile Picture Thumbnail */}
                {user?.profile_picture && (
                  <div className="h-12 w-12 rounded-full overflow-hidden border border-[#d0a539]/30">
                    <img
                      src={user.profile_picture}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Name */}
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#d0a539] mb-1">
                    Full Name
                  </p>
                  <p className="text-base lg:text-lg font-medium">
                    {user?.first_name} {user?.last_name}
                  </p>
                </div>

                {/* Email */}
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#d0a539] mb-1">
                    Email Address
                  </p>
                  <p className="text-base lg:text-lg font-medium break-words">
                    {user?.email}
                  </p>
                </div>

                {/* Phone */}
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#d0a539] mb-1">
                    Phone Number
                  </p>
                  <p className="text-base lg:text-lg font-medium break-words">
                    {user?.phone_number || (
                      <span className="text-gray-400 italic text-sm">
                        Not set
                      </span>
                    )}
                  </p>
                </div>

                {/* Address */}
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#d0a539] mb-1">
                    Address
                  </p>
                  <p className="text-base lg:text-lg font-medium text-[#171512]/80">
                    {user?.address || (
                      <span className="text-gray-400 italic text-sm">
                        Not set
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsEditModalOpen(true)}
              className="mt-8 lg:mt-10 w-full py-4 bg-[#171512] text-[#d0a539] border border-[#d0a539]/30 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-[#d0a539] hover:text-[#171512] transition-all duration-300 shadow-lg shadow-[#d0a539]/10"
            >
              Edit Profile
            </button>
          </div>

          {/* RIGHT COLUMN: Awaiting Approval Status */}
          <div
            className="lg:col-span-7 bg-white border border-[#171512]/5 rounded-2xl p-8 lg:p-12 relative overflow-hidden shadow-sm flex flex-col items-center text-center justify-center order-1 lg:order-2"
            style={gradientStyle}
          >
            <div className="relative z-10 space-y-6 max-w-lg">
              <div className="flex justify-center mb-2">
                <Hourglass
                  className="text-[#d0a539] opacity-80"
                  size={50}
                  strokeWidth={1}
                />
              </div>
              <h2 className="text-3xl md:text-5xl text-[#171512] font-serif font-bold leading-tight">
                Awaiting Approval
              </h2>
              <div className="w-16 h-1 bg-[#d0a539] mx-auto rounded-full"></div>

              <p className="text-[#171512]/70 text-base md:text-lg leading-relaxed font-light">
                Our compliance team is currently reviewing your account.
                <br /> If your account remains under review for more than{" "}
                <span className="text-[#d0a539] font-bold whitespace-nowrap">
                  48 hours
                </span>
                , please contact our support team for assistance.
              </p>

              <div className="flex items-center justify-center gap-2 pt-4">
                <div className="w-2 h-2 rounded-full bg-[#d0a539] animate-pulse"></div>
                <span className="text-[10px] uppercase font-black tracking-[0.3em] text-[#d0a539]">
                  In Progress
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* LOCKED FEATURES SECTION */}
        <div className="relative rounded-3xl overflow-hidden border border-[#171512]/10 bg-white mb-8 lg:mb-12 shadow-sm">
          {/* Blurred Background Content */}
          <div className="p-6 lg:p-12 flex flex-col gap-10 opacity-30 grayscale blur-[2px] pointer-events-none select-none">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-[#171512]/10 pb-6 gap-4">
              <h3 className="text-2xl lg:text-3xl font-serif font-bold text-[#171512]">
                90-Day Progress Tracker
              </h3>
              <div className="flex gap-4">
                <div className="h-8 w-16 sm:w-24 bg-[#171512]/10 rounded"></div>
                <div className="h-8 w-16 sm:w-24 bg-[#171512]/10 rounded"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
              <div className="h-24 lg:h-32 bg-[#171512]/5 rounded-xl border border-dashed border-[#171512]/20"></div>
              <div className="h-24 lg:h-32 bg-[#171512]/5 rounded-xl border border-dashed border-[#171512]/20"></div>
              <div className="h-24 lg:h-32 bg-[#171512]/5 rounded-xl border border-dashed border-[#171512]/20"></div>
              <div className="h-24 lg:h-32 bg-[#171512]/5 rounded-xl border border-dashed border-[#171512]/20"></div>
            </div>
          </div>

          {/* Lock Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#f8f7f6]/20 backdrop-blur-[2px] px-4 text-center">
            <div className="bg-[#171512] text-white p-4 rounded-full shadow-2xl mb-4 border-2 border-[#d0a539]">
              <Lock className="text-2xl lg:text-3xl" size={32} />
            </div>
            <p className="text-[10px] lg:text-[12px] font-black uppercase tracking-[0.4em] text-[#171512]">
              Features Locked
            </p>
            <p className="text-[#171512]/60 text-xs lg:text-sm mt-1">
              Unlock after account approval
            </p>
          </div>
        </div>

        {/* SUPPORT SECTION */}
        <section className="bg-[#171512] rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#d0a539]/5 skew-x-12 transform translate-x-1/4"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="space-y-4 max-w-2xl">
              <span className="text-[#d0a539] text-[10px] font-black uppercase tracking-[0.5em]">
                Support & Assistance
              </span>
              <h2 className="text-2xl md:text-4xl font-serif font-bold">
                Need assistance with your{" "}
                <span className="italic text-[#d0a539]">verification?</span>
              </h2>
              <p className="text-white/60 text-base lg:text-lg leading-relaxed">
                Our dedicated service team is available 24/7 to help you
                navigate the approval process.
              </p>
            </div>
            <button className="whitespace-nowrap bg-[#d0a539] text-[#171512] px-8 py-4 lg:px-10 lg:py-5 rounded-xl text-xs lg:text-sm font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-xl shadow-[#d0a539]/20 w-full lg:w-auto">
              Contact Support
            </button>
          </div>
        </section>
      </main>

      {/* MODAL COMPONENT */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentUser={user}
        onSuccess={onProfileUpdate}
      />
    </div>
  );
};

export default Approval;
