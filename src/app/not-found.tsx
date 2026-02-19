import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex-1 p-4 md:p-10 bg-[#f8f7f6] min-h-screen flex flex-col items-center justify-center text-[#171512]">
      <div className="bg-white p-8 md:p-12 rounded-[2rem] border border-[#171512]/5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.03)] max-w-lg w-full text-center">
        <div className="w-16 h-16 bg-[#d0a539]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-[#d0a539]" strokeWidth={2.5} />
        </div>

        <span className="text-[#d0a539] text-[10px] font-black uppercase tracking-[0.4em] mb-2 block">
          Error 404
        </span>

        <h1 className="text-2xl md:text-3xl font-serif font-black tracking-tight uppercase mb-4">
          Page Not Found
        </h1>

        <p className="text-[#171512]/50 text-sm font-medium mb-8 leading-relaxed">
          The investment asset or page you are looking for doesn't exist, has
          been moved, or is currently unavailable.
        </p>

        <Link
          href="/"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-3.5 bg-[#171512] text-white font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-[#d0a539] transition-all duration-300 shadow-lg hover:shadow-[#d0a539]/20"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Dashboard
        </Link>
      </div>
    </main>
  );
}
