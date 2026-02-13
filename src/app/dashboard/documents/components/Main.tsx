"use client";

import React, { useState, useEffect, useMemo, memo } from "react";
import {
  Search,
  FileText,
  File,
  Download,
  Building,
  BarChart,
  ChevronDown,
  Filter,
  Eye,
  FolderOpen,
  Clock,
  Loader2,
  AlertCircle,
  LucideIcon
} from "lucide-react";

import { documentsApi, DocumentItem, DocumentStats } from "../../api/documentsApi";

// ==========================================
// 1. SUB-COMPONENTS (Memoized)
// ==========================================

// --- Stats Card ---
interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
}

const StatsCard = memo(({ icon: Icon, label, value }: StatsCardProps) => (
  <div className="bg-white p-5 rounded-2xl border border-[#171512]/5 shadow-sm hover:shadow-md transition-all">
    <div className="flex items-center gap-4">
      <div className="bg-[#d0a539]/10 text-[#d0a539] p-3 rounded-xl shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-[#171512]/40 text-[10px] font-black uppercase tracking-widest mb-1">
          {label}
        </p>
        <p className="text-[#171512] text-xl font-black">{value}</p>
      </div>
    </div>
  </div>
));
StatsCard.displayName = "StatsCard";

// --- Document Row ---
const DocumentRow = memo(({ doc }: { doc: DocumentItem }) => {
  const getIcon = () => {
    switch (doc.category) {
      case "agreement": return FileText;
      case "deed": return Building;
      case "report": return BarChart;
      default: return File;
    }
  };

  const Icon = getIcon();
  const formattedDate = new Date(doc.upload_date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 bg-white border border-[#171512]/5 rounded-2xl transition-all hover:shadow-md hover:border-[#d0a539]/20 hover:-translate-y-0.5">
      {/* Icon & Info */}
      <div className="flex items-start gap-4 flex-1 w-full">
        <div className="bg-[#d0a539]/10 text-[#d0a539] p-3 rounded-xl shrink-0 group-hover:bg-[#d0a539] group-hover:text-[#171512] transition-all">
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-[#171512] font-black text-sm sm:text-base mb-1 line-clamp-1 group-hover:text-[#d0a539] transition-colors">
            {doc.title}
          </h4>
          <div className="flex flex-wrap items-center gap-3 text-[10px] sm:text-xs text-[#171512]/50 font-bold uppercase tracking-wide">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formattedDate}
            </span>
            <span className="hidden sm:inline opacity-30">|</span>
            <span className="bg-[#171512]/5 px-2 py-0.5 rounded text-[#171512]/70">
              {doc.file_type}
            </span>
            <span className="hidden sm:inline opacity-30">|</span>
            <span>{doc.file_size}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#171512]/5 sm:border-none">
        <a 
          href={doc.file_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 sm:flex-none px-5 py-2.5 text-[10px] font-black uppercase tracking-widest border border-[#171512]/10 text-[#171512]/60 hover:text-[#d0a539] hover:border-[#d0a539] rounded-xl transition-all flex items-center justify-center gap-2 hover:bg-[#d0a539]/5"
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Preview</span>
          <span className="sm:hidden">View</span>
        </a>

        <a
          href={doc.file_url}
          download
          className="flex-1 sm:flex-none px-5 py-2.5 text-[10px] font-black uppercase tracking-widest bg-[#171512] text-white hover:bg-[#d0a539] hover:text-[#171512] rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#171512]/10"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Download</span>
          <span className="sm:hidden">Get</span>
        </a>
      </div>
    </div>
  );
});
DocumentRow.displayName = "DocumentRow";

// ==========================================
// 2. MAIN COMPONENT
// ==========================================
const Main = () => {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [stats, setStats] = useState<DocumentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [docsData, statsData] = await Promise.all([
          documentsApi.getDocuments(),
          documentsApi.getDocumentStats()
        ]);
        setDocuments(docsData);
        setStats(statsData);
      } catch (err) {
        console.error("Error fetching documents:", err);
        setError("Failed to load documents.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
      let matchesFilter = true;
      
      if (activeFilter !== "all") {
        if (activeFilter === "agreements") matchesFilter = doc.category === "agreement";
        else if (activeFilter === "deeds") matchesFilter = doc.category === "deed";
        else if (activeFilter === "reports") matchesFilter = doc.category === "report";
        else matchesFilter = false;
      }
      return matchesSearch && matchesFilter;
    });
  }, [documents, searchQuery, activeFilter]);

  const agreements = filteredDocuments.filter((d) => d.category === "agreement");
  const deeds = filteredDocuments.filter((d) => d.category === "deed");
  const reports = filteredDocuments.filter((d) => d.category === "report");
  const others = filteredDocuments.filter((d) => d.category === "other");

  return (
    <div className="bg-[#f8f7f6] text-[#171512] font-sans min-h-screen">
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8 pt-24 lg:pt-10">
        
        {/* --- HEADER SECTION --- */}
        <div className="mb-8 lg:mb-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8">
            <div className="max-w-2xl">
              <p className="text-[#d0a539] text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] mb-2">
                Secure Vault
              </p>
              <h1 className="text-lg lg:text-3xl font-black text-[#171512] tracking-tight uppercase">
                Document Center
              </h1>
              <p className="text-[#171512]/60 text-sm sm:text-base leading-relaxed">
                Access your investment agreements, property deeds, and financial reports in one secure location.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard icon={FolderOpen} label="Total Documents" value={stats ? stats.total : 0} />
            <StatsCard icon={FileText} label="Agreements" value={stats ? stats.agreements : 0} />
            <StatsCard icon={Building} label="Deeds" value={stats ? stats.deeds : 0} />
            <StatsCard icon={BarChart} label="Reports" value={stats ? stats.reports : 0} />
          </div>

          {/* Controls Toolbar */}
          <div className="bg-white p-4 rounded-xl border border-[#171512]/5 flex flex-col md:flex-row gap-4 shadow-sm">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#171512]/40 w-5 h-5" />
              <input
                className="w-full bg-[#f8f7f6] border-none rounded-xl pl-10 pr-4 py-3 text-[#171512] text-sm focus:ring-1 focus:ring-[#d0a539] outline-none transition-all placeholder:text-[#171512]/30 font-medium"
                placeholder="Search documents..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Desktop Filter */}
            <div className="hidden md:block relative min-w-[200px]">
              <select
                className="w-full bg-[#f8f7f6] border-none rounded-xl pl-4 pr-10 py-3 text-[#171512] text-sm font-bold uppercase tracking-wide focus:ring-1 focus:ring-[#d0a539] outline-none cursor-pointer appearance-none"
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
              >
                <option value="all">All Documents</option>
                <option value="agreements">Agreements</option>
                <option value="deeds">Property Deeds</option>
                <option value="reports">Financial Reports</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#d0a539] w-4 h-4 pointer-events-none" />
            </div>

            {/* Mobile Filter Toggle */}
            <button
              className="md:hidden bg-[#171512] text-white px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>

          {/* Mobile Filter Menu */}
          {showMobileFilters && (
            <div className="md:hidden mt-3 bg-white border border-[#171512]/5 rounded-xl p-2 space-y-1 shadow-lg">
              {["all", "agreements", "deeds", "reports"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    setActiveFilter(filter);
                    setShowMobileFilters(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                    activeFilter === filter
                      ? "bg-[#d0a539] text-[#171512]"
                      : "text-[#171512]/60 hover:bg-[#f8f7f6]"
                  }`}
                >
                  {filter === "all" ? "All Documents" : filter}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* --- DOCUMENT LIST --- */}
        <div className="space-y-10 lg:space-y-14 min-h-[400px]">
          
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 text-[#d0a539] animate-spin mb-4" />
              <p className="text-[#171512]/40 font-black uppercase tracking-widest text-xs">Loading Secure Vault...</p>
            </div>
          )}

          {error && !loading && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <AlertCircle className="w-10 h-10 text-red-500 mb-4 opacity-50" />
              <p className="text-red-500 font-bold text-sm">{error}</p>
            </div>
          )}

          {!loading && !error && filteredDocuments.length === 0 && (
             <div className="bg-white rounded-2xl p-12 border border-[#171512]/5 text-center shadow-sm">
                <div className="bg-[#f8f7f6] text-[#171512]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FolderOpen className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-black text-[#171512] mb-1">No documents found</h3>
                <p className="text-[#171512]/50 text-sm">Try adjusting your search criteria.</p>
              </div>
          )}

          {!loading && !error && (
            <>
              {agreements.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <h3 className="text-[#171512]/30 text-xs font-black uppercase tracking-[0.2em] whitespace-nowrap">
                      Investment Agreements
                    </h3>
                    <div className="h-px flex-1 bg-[#171512]/5"></div>
                  </div>
                  <div className="grid gap-4">
                    {agreements.map((doc) => <DocumentRow key={doc.id} doc={doc} />)}
                  </div>
                </div>
              )}

              {deeds.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <h3 className="text-[#171512]/30 text-xs font-black uppercase tracking-[0.2em] whitespace-nowrap">
                      Property Deeds
                    </h3>
                    <div className="h-px flex-1 bg-[#171512]/5"></div>
                  </div>
                  <div className="grid gap-4">
                    {deeds.map((doc) => <DocumentRow key={doc.id} doc={doc} />)}
                  </div>
                </div>
              )}

              {reports.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <h3 className="text-[#171512]/30 text-xs font-black uppercase tracking-[0.2em] whitespace-nowrap">
                      Financial Reports
                    </h3>
                    <div className="h-px flex-1 bg-[#171512]/5"></div>
                  </div>
                  <div className="grid gap-4">
                    {reports.map((doc) => <DocumentRow key={doc.id} doc={doc} />)}
                  </div>
                </div>
              )}

              {others.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <h3 className="text-[#171512]/30 text-xs font-black uppercase tracking-[0.2em] whitespace-nowrap">
                      Other Documents
                    </h3>
                    <div className="h-px flex-1 bg-[#171512]/5"></div>
                  </div>
                  <div className="grid gap-4">
                    {others.map((doc) => <DocumentRow key={doc.id} doc={doc} />)}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* --- FOOTER CTA --- */}
        <div className="mt-20 bg-[#171512] rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#d0a539]/5 -skew-x-12 translate-x-1/4 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-lg space-y-4">
              <span className="text-[#d0a539] text-[10px] font-black uppercase tracking-[0.4em]">
                Concierge Service
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold leading-tight">
                Need hard copies or certified audits?
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                Our dedicated legal team can prepare physical documentation packages for your records or external compliance needs.
              </p>
            </div>
            <button className="whitespace-nowrap bg-[#d0a539] text-[#171512] px-8 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-white hover:text-[#171512] transition-all shadow-xl shadow-[#d0a539]/10">
              Request Physical Copy
            </button>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Main;





