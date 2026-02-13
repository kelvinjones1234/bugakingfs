// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { 
//   ChevronRight, 
//   Search, 
//   Trash2, 
//   Loader2, 
//   User as UserIcon, 
//   ShieldCheck, 
//   Briefcase,
//   Plus,
//   Edit2,
//   CheckCircle2 // Added icon for approved visual
// } from "lucide-react";
// import { CldImage } from "next-cloudinary";

// // 👇 Import the new action
// import { 
//   UIUser, 
//   toggleUserActive, 
//   toggleUserApproved, 
//   deleteUser, 
//   createUser, 
//   updateUser 
// } from "@/app/actions/userActions";

// import AddUserModal, { UserFormState } from "./AddUserModal";

// const TableToggle = ({ 
//     checked, 
//     onClick, 
//     isLoading,
//     color = "bg-[#d0a539]" // Allow custom colors
//   }: { 
//     checked: boolean; 
//     onClick: () => void;
//     isLoading: boolean;
//     color?: string;
//   }) => (
//     <button 
//       onClick={(e) => {
//         e.stopPropagation();
//         onClick();
//       }}
//       disabled={isLoading}
//       className={`relative inline-flex items-center select-none transition-all ${
//         isLoading ? "opacity-50 cursor-wait" : "cursor-pointer opacity-100"
//       }`}
//     >
//       <div
//         className={`w-8 h-4 rounded-full shadow-inner transition-colors ${
//           checked ? `${color}/20` : "bg-[#171512]/10"
//         }`}
//       ></div>
//       <div
//         className={`absolute left-0.5 top-0.5 w-3 h-3 rounded-full transition-transform shadow-sm flex items-center justify-center ${
//           checked ? `translate-x-full ${color}` : "bg-white"
//         }`}
//       >
//         {isLoading && <Loader2 className="w-2 h-2 animate-spin text-[#171512]" />}
//       </div>
//     </button>
//   );

// interface UserMainProps {
//   data: UIUser[];
// }

// export default function Main({ data }: UserMainProps) {
//   const router = useRouter();
  
//   // State for loading toggles independently
//   const [togglingActiveId, setTogglingActiveId] = useState<string | null>(null);
//   const [togglingApprovedId, setTogglingApprovedId] = useState<string | null>(null);
  
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingUserId, setEditingUserId] = useState<string | null>(null);
//   const [modalInitialData, setModalInitialData] = useState<Partial<UserFormState> | null>(null);

//   // --- Handlers ---

//   const handleCreate = () => {
//     setEditingUserId(null);
//     setModalInitialData(null);
//     setIsModalOpen(true);
//   };

//   const handleEdit = (user: UIUser) => {
//     const splitName = user.fullName.split(" ");
//     const firstName = splitName[0];
//     const lastName = splitName.slice(1).join(" ");

//     setEditingUserId(user.id);
//     setModalInitialData({
//         firstName,
//         lastName,
//         email: user.email,
//         phoneNumber: user.phoneNumber,
//         role: user.role,
//         isActive: user.isActive
//     });
//     setIsModalOpen(true);
//   };

//   const handleSaveUser = async (formData: FormData) => {
//     if (editingUserId) {
//         return await updateUser(editingUserId, formData);
//     } else {
//         return await createUser(formData);
//     }
//   };

//   const handleToggleActive = async (user: UIUser) => {
//     setTogglingActiveId(user.id);
//     const result = await toggleUserActive(user.id, user.isActive);
//     if (result.success) router.refresh();
//     else alert("Failed to update active status");
//     setTogglingActiveId(null);
//   };

//   // 👇 New Handler for Approval
//   const handleToggleApproved = async (user: UIUser) => {
//     setTogglingApprovedId(user.id);
//     const result = await toggleUserApproved(user.id, user.isApproved);
//     if (result.success) router.refresh();
//     else alert("Failed to update approval status");
//     setTogglingApprovedId(null);
//   };

//   const handleDelete = async (user: UIUser) => {
//     const confirmDelete = window.confirm(
//       `Are you sure you want to delete ${user.fullName}?`
//     );
//     if (!confirmDelete) return;

//     const result = await deleteUser(user.id);
//     if (result.success) router.refresh();
//     else alert("Failed to delete: " + result.error);
//   };

//   const filteredData = data.filter(user => 
//     user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     user.email.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="flex min-h-screen bg-[#f8f7f6] font-sans text-[#171512]">
//       <main className="flex-1 p-6 lg:p-10">
//         {/* Header */}
//         <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
//           <div>
//             <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#171512]/40 mb-2">
//               <span>Management</span>
//               <ChevronRight className="w-3 h-3" />
//               <span className="text-[#d0a539]">Users</span>
//             </nav>
//             <h1 className="text-4xl lg:text-5xl font-black text-[#171512] leading-none font-serif">
//               Platform Users
//             </h1>
//           </div>
//           <div>
//             <button
//               onClick={handleCreate}
//               className="bg-[#d0a539] text-[#171512] px-8 py-3 rounded-lg text-sm font-bold uppercase tracking-wider shadow-lg shadow-[#d0a539]/20 hover:scale-[1.02] transition-all flex items-center gap-2"
//             >
//               <Plus className="w-5 h-5" /> New User
//             </button>
//           </div>
//         </header>

//         {/* Filters */}
//         <div className="bg-white rounded-2xl border border-[#171512]/5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] overflow-hidden">
//           <div className="p-6 border-b border-[#171512]/5 flex flex-wrap items-center gap-6">
//             <div className="flex-1 min-w-[300px] relative">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#171512]/30 w-5 h-5" />
//               <input
//                 className="w-full pl-12 pr-4 py-3 bg-[#f8f7f6] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#d0a539]/20 outline-none placeholder-[#171512]/30"
//                 placeholder="Search users by name or email..."
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="bg-[#f8f7f6]/50 border-b border-[#171512]/5">
//                   <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40">Identity</th>
//                   <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40">Role</th>
//                   <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40 text-center">Investments</th>
//                   <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40 text-right">Joined</th>
//                   {/* 👇 New Column */}
//                   <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40 text-center">Approved</th>
//                   <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40 text-center">Active</th>
//                   <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40 text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-[#171512]/5">
//                 {filteredData.length === 0 ? (
//                   <tr>
//                     <td colSpan={7} className="px-6 py-8 text-center text-sm text-[#171512]/40 font-bold">
//                       No users found matching your search.
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredData.map((user) => (
//                     <tr key={user.id} className="hover:bg-[#f8f7f6]/40 transition-colors group">
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-4">
//                           <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#171512]/5 bg-[#d0a539]/10 flex items-center justify-center">
//                              {user.profileImage ? (
//                                <CldImage src={user.profileImage} width={40} height={40} alt={user.fullName} className="w-full h-full object-cover" />
//                              ) : (
//                                <span className="text-[#d0a539] font-black text-xs">{user.fullName.substring(0, 2).toUpperCase()}</span>
//                              )}
//                           </div>
//                           <div>
//                             <p className="text-sm font-bold text-[#171512]">{user.fullName}</p>
//                             <p className="text-[10px] text-[#171512]/50 font-medium">{user.email}</p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-1.5">
//                           {user.role === "STAFF" ? <ShieldCheck className="w-4 h-4 text-[#d0a539]" /> : <UserIcon className="w-4 h-4 text-[#171512]/30" />}
//                           <span className={`text-xs font-black tracking-wider uppercase ${user.role === "STAFF" ? "text-[#d0a539]" : "text-[#171512]/60"}`}>
//                             {user.role}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 text-center">
//                          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#f8f7f6] border border-[#171512]/5">
//                            <Briefcase className="w-3 h-3 text-[#171512]/40" />
//                            <span className="text-xs font-bold text-[#171512]">{user.investmentCount}</span>
//                          </div>
//                       </td>
//                       <td className="px-6 py-4 text-right">
//                         <span className="text-xs font-medium text-[#171512]/60 font-serif">{user.joinedAt}</span>
//                       </td>
                      
//                       {/* 👇 Approved Toggle (Green) */}
//                       <td className="px-6 py-4 text-center">
//                         <div className="flex justify-center">
//                           <TableToggle 
//                             checked={user.isApproved} 
//                             onClick={() => handleToggleApproved(user)}
//                             isLoading={togglingApprovedId === user.id}
//                             color="bg-green-500" // Custom green color for approval
//                           />
//                         </div>
//                       </td>

//                       {/* Active Toggle (Gold) */}
//                       <td className="px-6 py-4 text-center">
//                         <div className="flex justify-center">
//                           <TableToggle 
//                             checked={user.isActive} 
//                             onClick={() => handleToggleActive(user)}
//                             isLoading={togglingActiveId === user.id}
//                           />
//                         </div>
//                       </td>

//                       <td className="px-6 py-4 text-right">
//                         <div className="flex items-center justify-end gap-2">
//                           <button onClick={() => handleEdit(user)} className="bg-[#171512] text-white p-2 rounded-lg hover:bg-[#d0a539] transition-all">
//                             <Edit2 className="w-3 h-3" />
//                           </button>
//                           <button onClick={() => handleDelete(user)} className="bg-red-500/10 text-red-600 p-2 rounded-lg hover:bg-red-500 hover:text-white transition-all">
//                             <Trash2 className="w-3 h-3" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <AddUserModal
//             isOpen={isModalOpen}
//             onClose={() => {
//                 setIsModalOpen(false);
//                 setEditingUserId(null);
//                 setModalInitialData(null);
//             }}
//             onSubmit={handleSaveUser}
//             initialData={modalInitialData}
//         />
//       </main>
//     </div>
//   );
// }









"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ChevronRight, 
  Search, 
  Trash2, 
  Loader2, 
  User as UserIcon, 
  ShieldCheck, 
  Briefcase,
  Plus,
  Edit2
} from "lucide-react";
import { CldImage } from "next-cloudinary";

import { 
  UIUser, 
  toggleUserActive, 
  toggleUserApproved, 
  toggleUserStaff,
  deleteUser, 
  createUser, 
  updateUser 
} from "@/app/actions/userActions";

import AddUserModal, { UserFormState } from "./AddUserModal";

const TableToggle = ({ 
    checked, 
    onClick, 
    isLoading,
    color = "bg-[#d0a539]" 
  }: { 
    checked: boolean; 
    onClick: () => void;
    isLoading: boolean;
    color?: string;
  }) => (
    <button 
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      disabled={isLoading}
      className={`relative inline-flex items-center select-none transition-all ${
        isLoading ? "opacity-50 cursor-wait" : "cursor-pointer opacity-100"
      }`}
    >
      <div
        className={`w-8 h-4 rounded-full shadow-inner transition-colors ${
          checked ? `${color}/20` : "bg-[#171512]/10"
        }`}
      ></div>
      <div
        className={`absolute left-0.5 top-0.5 w-3 h-3 rounded-full transition-transform shadow-sm flex items-center justify-center ${
          checked ? `translate-x-full ${color}` : "bg-white"
        }`}
      >
        {isLoading && <Loader2 className="w-2 h-2 animate-spin text-[#171512]" />}
      </div>
    </button>
  );

interface UserMainProps {
  data: UIUser[];
}

export default function Main({ data }: UserMainProps) {
  const router = useRouter();
  
  // State for loading toggles independently
  const [togglingActiveId, setTogglingActiveId] = useState<string | null>(null);
  const [togglingApprovedId, setTogglingApprovedId] = useState<string | null>(null);
  const [togglingStaffId, setTogglingStaffId] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [modalInitialData, setModalInitialData] = useState<Partial<UserFormState> | null>(null);

  // --- Handlers ---

  const handleCreate = () => {
    setEditingUserId(null);
    setModalInitialData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user: UIUser) => {
    const splitName = user.fullName.split(" ");
    const firstName = splitName[0];
    const lastName = splitName.slice(1).join(" ");

    setEditingUserId(user.id);
    setModalInitialData({
        firstName,
        lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        isActive: user.isActive
    });
    setIsModalOpen(true);
  };

  const handleSaveUser = async (formData: FormData) => {
    if (editingUserId) {
        return await updateUser(editingUserId, formData);
    } else {
        return await createUser(formData);
    }
  };

  const handleToggleActive = async (user: UIUser) => {
    setTogglingActiveId(user.id);
    const result = await toggleUserActive(user.id, user.isActive);
    if (result.success) router.refresh();
    else alert("Failed to update active status");
    setTogglingActiveId(null);
  };

  const handleToggleApproved = async (user: UIUser) => {
    setTogglingApprovedId(user.id);
    const result = await toggleUserApproved(user.id, user.isApproved);
    if (result.success) router.refresh();
    else alert("Failed to update approval status");
    setTogglingApprovedId(null);
  };

  const handleToggleStaff = async (user: UIUser) => {
    setTogglingStaffId(user.id);
    const result = await toggleUserStaff(user.id, user.isStaff);
    if (result.success) router.refresh();
    else alert("Failed to update staff status");
    setTogglingStaffId(null);
  };

  const handleDelete = async (user: UIUser) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${user.fullName}?`
    );
    if (!confirmDelete) return;

    const result = await deleteUser(user.id);
    if (result.success) router.refresh();
    else alert("Failed to delete: " + result.error);
  };

  const filteredData = data.filter(user => 
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#f8f7f6] font-sans text-[#171512]">
      <main className="flex-1 p-6 lg:p-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#171512]/40 mb-2">
              <span>Management</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#d0a539]">Users</span>
            </nav>
            <h1 className="text-4xl lg:text-5xl font-black text-[#171512] leading-none font-serif">
              Platform Users
            </h1>
          </div>
          <div>
            <button
              onClick={handleCreate}
              className="bg-[#d0a539] text-[#171512] px-8 py-3 rounded-lg text-sm font-bold uppercase tracking-wider shadow-lg shadow-[#d0a539]/20 hover:scale-[1.02] transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" /> New User
            </button>
          </div>
        </header>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-[#171512]/5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="p-6 border-b border-[#171512]/5 flex flex-wrap items-center gap-6">
            <div className="flex-1 min-w-[300px] relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#171512]/30 w-5 h-5" />
              <input
                className="w-full pl-12 pr-4 py-3 bg-[#f8f7f6] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#d0a539]/20 outline-none placeholder-[#171512]/30"
                placeholder="Search users by name or email..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8f7f6]/50 border-b border-[#171512]/5">
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40">Identity</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40 text-center">Staff</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40 text-center">Investments</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40 text-right">Joined</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40 text-center">Approved</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40 text-center">Active</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#171512]/5">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-sm text-[#171512]/40 font-bold">
                      No users found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((user) => (
                    <tr key={user.id} className="hover:bg-[#f8f7f6]/40 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#171512]/5 bg-[#d0a539]/10 flex items-center justify-center">
                             {user.profileImage ? (
                               <CldImage src={user.profileImage} width={40} height={40} alt={user.fullName} className="w-full h-full object-cover" />
                             ) : (
                               <span className="text-[#d0a539] font-black text-xs">{user.fullName.substring(0, 2).toUpperCase()}</span>
                             )}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#171512]">{user.fullName}</p>
                            <p className="text-[10px] text-[#171512]/50 font-medium">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center flex-col items-center gap-1">
                          <TableToggle 
                            checked={user.isStaff} 
                            onClick={() => handleToggleStaff(user)}
                            isLoading={togglingStaffId === user.id}
                            color="bg-blue-500" 
                          />
                          <span className={`text-[9px] font-black uppercase tracking-wider ${user.isStaff ? "text-blue-500" : "text-[#171512]/30"}`}>
                            {user.isStaff ? "Staff" : "User"}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-center">
                         <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#f8f7f6] border border-[#171512]/5">
                           <Briefcase className="w-3 h-3 text-[#171512]/40" />
                           <span className="text-xs font-bold text-[#171512]">{user.investmentCount}</span>
                         </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-xs font-medium text-[#171512]/60 font-serif">{user.joinedAt}</span>
                      </td>
                      
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center">
                          <TableToggle 
                            checked={user.isApproved} 
                            onClick={() => handleToggleApproved(user)}
                            isLoading={togglingApprovedId === user.id}
                            color="bg-green-500"
                          />
                        </div>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center">
                          <TableToggle 
                            checked={user.isActive} 
                            onClick={() => handleToggleActive(user)}
                            isLoading={togglingActiveId === user.id}
                            color="bg-[#d0a539]"
                          />
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleEdit(user)} className="bg-[#171512] text-white p-2 rounded-lg hover:bg-[#d0a539] transition-all">
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button onClick={() => handleDelete(user)} className="bg-red-500/10 text-red-600 p-2 rounded-lg hover:bg-red-500 hover:text-white transition-all">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <AddUserModal
            isOpen={isModalOpen}
            onClose={() => {
                setIsModalOpen(false);
                setEditingUserId(null);
                setModalInitialData(null);
            }}
            onSubmit={handleSaveUser}
            initialData={modalInitialData}
        />
      </main>
    </div>
  );
}