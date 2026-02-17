"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  Search,
  Trash2,
  Plus,
  Edit2,
  FileText,
  Calendar,
  User as UserIcon,
  Download,
} from "lucide-react";
import AddDocumentModal from "./AddDocumentModal";
import {
  deleteDocument,
  createDocument,
  updateDocument,
} from "@/app/actions/documentActions";

export interface UIDocument {
  id: string;
  title: string;
  ownerName: string;
  ownerEmail: string;
  createdAt: string;
  fileSize?: string;
}

interface DocumentMainProps {
  documents: UIDocument[];
  users: any[]; // Passed down to the modal for the dropdown
}

export default function DocumentMain({ documents, users }: DocumentMainProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<UIDocument | null>(null);

  const handleCreate = () => {
    setEditingDoc(null);
    setIsModalOpen(true);
  };

  const handleEdit = (doc: UIDocument) => {
    setEditingDoc(doc);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingDoc(null);
  };

  const handleDelete = async (doc: UIDocument) => {
    if (!window.confirm(`Delete ${doc.title}?`)) return;
    const result = await deleteDocument(doc.id);
    if (result.success) router.refresh();
  };

  const filteredDocs = (documents ?? []).filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.ownerEmail.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSaveDocument = async (formData: FormData) => {
    try {
      let result;
      if (editingDoc) {
        // If we are editing, call update
        result = await updateDocument(editingDoc.id, formData);
      } else {
        // If no editingDoc, call create
        result = await createDocument(formData);
      }

      if (result.success) {
        router.refresh(); // Refresh the server data
        return result;
      } else {
        return result;
      }
    } catch (error) {
      console.error("Save Error:", error);
      return { success: false, error: "An unexpected error occurred." };
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8f7f6] font-sans text-[#171512]">
      <main className="flex-1 p-4 md:p-6 lg:p-10 pt-20 md:pt-[5rem] lg:pt-5">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-8">
          <div>
            <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#171512]/40 mb-2">
              <span>Management</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#d0a539]">Documents</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171512] font-serif">
              Archive & Files
            </h1>
          </div>
          <button
            onClick={handleCreate}
            className="bg-[#d0a539] text-[#171512] px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-wider shadow-lg shadow-[#d0a539]/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" /> Add Document
          </button>
        </header>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl border border-[#171512]/5 shadow-sm overflow-hidden mb-8">
          <div className="p-4 sm:p-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#171512]/40 w-5 h-5" />
              <input
                className="w-full pl-12 pr-4 py-3 bg-[#f8f7f6] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#d0a539]/20 outline-none"
                placeholder="Search documents or owner email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8f7f6]/60 border-b border-[#171512]/5">
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/50">
                    Document Name
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/50">
                    Owner
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/50 text-center">
                    Date Added
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/50 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#171512]/5">
                {filteredDocs.map((doc) => (
                  <tr
                    key={doc.id}
                    className="hover:bg-[#f8f7f6]/60 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#d0a539]/10 rounded-lg text-[#d0a539]">
                          <FileText className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-bold">{doc.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {doc.ownerName}
                        </span>
                        <span className="text-[10px] text-[#171512]/50 uppercase font-bold">
                          {doc.ownerEmail}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f8f7f6] border border-[#171512]/5 text-xs font-medium">
                        <Calendar className="w-3 h-3 text-[#d0a539]" />
                        {doc.createdAt}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(doc)}
                          className="p-2 bg-[#171512] text-white rounded-lg hover:bg-[#d0a539] transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(doc)}
                          className="p-2 bg-red-500/10 text-red-600 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* <AddDocumentModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingDoc(null);
          }}
          users={users}
          initialData={editingDoc}
          onSubmit={handleSaveDocument} // <-- MAKE SURE THIS LINE IS HERE
        /> */}

        <AddDocumentModal
          isOpen={isModalOpen}
          onClose={handleClose}
          users={users}
          onSubmit={handleSaveDocument}
          initialData={editingDoc} // ✅ FIXED: This uses the state variable you actually defined
        />
      </main>
    </div>
  );
}
