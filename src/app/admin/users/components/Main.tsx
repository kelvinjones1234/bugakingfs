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
  Edit2,
} from "lucide-react";
import { CldImage } from "next-cloudinary";
import {
  UIUser,
  toggleUserActive,
  toggleUserApproved,
  toggleUserStaff,
  deleteUser,
  createUser,
  updateUser,
} from "@/app/actions/userActions";
import AddUserModal, { UserFormState } from "./AddUserModal";

const TableToggle = ({
  checked,
  onClick,
  isLoading,
  color = "bg-[#d0a539]",
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
      className={`w-9 h-5 rounded-full shadow-inner transition-colors ${
        checked ? `${color}/20` : "bg-[#171512]/10"
      }`}
    ></div>
    <div
      className={`absolute left-0.5 top-0.5 w-4 h-4 rounded-full transition-transform shadow-sm flex items-center justify-center ${
        checked ? `translate-x-4 ${color}` : "bg-white"
      }`}
    >
      {isLoading && <Loader2 className="w-3 h-3 animate-spin text-[#171512]" />}
    </div>
  </button>
);

interface UserMainProps {
  data: UIUser[];
}

export default function Main({ data }: UserMainProps) {
  const router = useRouter();
  const [togglingActiveId, setTogglingActiveId] = useState<string | null>(null);
  const [togglingApprovedId, setTogglingApprovedId] = useState<string | null>(
    null,
  );
  const [togglingStaffId, setTogglingStaffId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [modalInitialData, setModalInitialData] =
    useState<Partial<UserFormState> | null>(null);

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
      isActive: user.isActive,
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
    if (!window.confirm(`Delete ${user.fullName}?`)) return;
    const result = await deleteUser(user.id);
    if (result.success) router.refresh();
    else alert("Failed to delete: " + result.error);
  };

  const filteredData = data.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen bg-[#f8f7f6] font-sans text-[#171512]">
      <main className="flex-1  p-4 md:p-6 lg:p-10 pt-20 md:pt-[5rem] lg:pt-5 bg-[#f8f7f6] min-h-screen font-sans text-[#171512]">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6 mb-6 sm:mb-8">
          <div>
            <nav className="flex items-center gap-2 text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#171512]/40 mb-1 sm:mb-2">
              <span>Management</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#d0a539]">Users</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171512] leading-tight font-serif">
              Platform Users
            </h1>
          </div>
          <button
            onClick={handleCreate}
            className="w-full sm:w-auto bg-[#d0a539] text-[#171512] px-6 sm:px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-wider shadow-lg shadow-[#d0a539]/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" /> New User
          </button>
        </header>

        {/* Search */}
        <div className="bg-white rounded-2xl border border-[#171512]/5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] overflow-hidden mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#171512]/40 w-5 h-5" />
              <input
                className="w-full pl-12 pr-4 py-3 bg-[#f8f7f6] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#d0a539]/20 outline-none placeholder-[#171512]/40"
                placeholder="Search by name or email..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-[#f8f7f6]/60 border-b border-[#171512]/5">
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/50">
                    Identity
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/50 text-center">
                    Staff
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/50 text-center">
                    Investments
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/50 text-right">
                    Joined
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/50 text-center">
                    Approved
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/50 text-center">
                    Active
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/50 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#171512]/5">
                {filteredData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-10 text-center text-sm font-medium text-[#171512]/50"
                    >
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-[#f8f7f6]/60 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#171512]/5 bg-[#d0a539]/10 flex items-center justify-center">
                            {user.profileImage ? (
                              <CldImage
                                src={user.profileImage}
                                width={40}
                                height={40}
                                alt={user.fullName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-[#d0a539] font-black text-xs">
                                {user.fullName.substring(0, 2).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold truncate max-w-[180px]">
                              {user.fullName}
                            </p>
                            <p className="text-xs text-[#171512]/60 truncate max-w-[180px]">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <TableToggle
                            checked={user.isStaff}
                            onClick={() => handleToggleStaff(user)}
                            isLoading={togglingStaffId === user.id}
                            color="bg-blue-500"
                          />
                          <span
                            className={`text-[9px] font-black uppercase ${
                              user.isStaff
                                ? "text-blue-500"
                                : "text-[#171512]/40"
                            }`}
                          >
                            {user.isStaff ? "Staff" : ""}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f8f7f6] border border-[#171512]/5">
                          <Briefcase className="w-3.5 h-3.5 text-[#171512]/50" />
                          <span className="text-sm font-bold text-[#171512]">
                            {user.investmentCount}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <span className="text-xs text-[#171512]/70 font-medium">
                          {user.joinedAt}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <TableToggle
                          checked={user.isApproved}
                          onClick={() => handleToggleApproved(user)}
                          isLoading={togglingApprovedId === user.id}
                          color="bg-green-500"
                        />
                      </td>

                      <td className="px-6 py-4 text-center">
                        <TableToggle
                          checked={user.isActive}
                          onClick={() => handleToggleActive(user)}
                          isLoading={togglingActiveId === user.id}
                          color="bg-[#d0a539]"
                        />
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(user);
                            }}
                            className="p-2.5 bg-[#171512] text-white rounded-lg hover:bg-[#d0a539] transition-all"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(user);
                            }}
                            className="p-2.5 bg-red-500/10 text-red-600 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden divide-y divide-[#171512]/5">
            {filteredData.length === 0 ? (
              <div className="px-5 py-10 text-center text-sm font-medium text-[#171512]/50">
                No users found matching your search.
              </div>
            ) : (
              filteredData.map((user) => (
                <div
                  key={user.id}
                  className="p-4 sm:p-5 hover:bg-[#f8f7f6]/60 transition-colors"
                >
                  {/* Header / Identity */}
                  <div className="flex items-start gap-3.5 mb-5">
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-[#171512]/5 bg-[#d0a539]/10 flex items-center justify-center">
                      {user.profileImage ? (
                        <CldImage
                          src={user.profileImage}
                          width={48}
                          height={48}
                          alt={user.fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-[#d0a539] font-black text-base">
                          {user.fullName.substring(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base sm:text-lg font-bold text-[#171512] truncate">
                        {user.fullName}
                      </p>
                      <p className="text-xs sm:text-sm text-[#171512]/60 truncate mt-0.5">
                        {user.email}
                      </p>
                      <p className="text-xs text-[#171512]/50 mt-1">
                        Joined {user.joinedAt}
                      </p>
                    </div>
                  </div>

                  {/* Status Cards */}
                  <div className="grid grid-cols-2 gap-3.5 mb-5">
                    {/* Staff */}
                    <div className="bg-[#f8f7f6] rounded-xl p-3.5 border border-[#171512]/5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#171512]/50">
                          Staff
                        </span>
                        <TableToggle
                          checked={user.isStaff}
                          onClick={() => handleToggleStaff(user)}
                          isLoading={togglingStaffId === user.id}
                          color="bg-blue-500"
                        />
                      </div>
                      <span
                        className={`text-xs font-bold ${
                          user.isStaff ? "text-blue-500" : "text-[#171512]/40"
                        }`}
                      >
                        {user.isStaff ? "Staff" : "Regular User"}
                      </span>
                    </div>

                    {/* Investments */}
                    <div className="bg-[#f8f7f6] rounded-xl p-3.5 border border-[#171512]/5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#171512]/50 block mb-2">
                        Investments
                      </span>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-[#171512]/50" />
                        <span className="text-base font-bold text-[#171512]">
                          {user.investmentCount}
                        </span>
                      </div>
                    </div>

                    {/* Approved */}
                    <div className="bg-[#f8f7f6] rounded-xl p-3.5 border border-[#171512]/5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#171512]/50">
                          Approved
                        </span>
                        <TableToggle
                          checked={user.isApproved}
                          onClick={() => handleToggleApproved(user)}
                          isLoading={togglingApprovedId === user.id}
                          color="bg-green-500"
                        />
                      </div>
                      <span
                        className={`text-xs font-bold ${
                          user.isApproved
                            ? "text-green-600"
                            : "text-[#171512]/40"
                        }`}
                      >
                        {user.isApproved ? "Approved" : "Pending"}
                      </span>
                    </div>

                    {/* Active */}
                    <div className="bg-[#f8f7f6] rounded-xl p-3.5 border border-[#171512]/5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#171512]/50">
                          Active
                        </span>
                        <TableToggle
                          checked={user.isActive}
                          onClick={() => handleToggleActive(user)}
                          isLoading={togglingActiveId === user.id}
                          color="bg-[#d0a539]"
                        />
                      </div>
                      <span
                        className={`text-xs font-bold ${
                          user.isActive ? "text-[#d0a539]" : "text-[#171512]/40"
                        }`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(user)}
                      className="flex-1 bg-[#171512] text-white py-3 rounded-xl hover:bg-[#d0a539] transition-all flex items-center justify-center gap-2 text-sm font-bold"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user)}
                      className="flex-1 bg-red-500/10 text-red-600 py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2 text-sm font-bold"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
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
