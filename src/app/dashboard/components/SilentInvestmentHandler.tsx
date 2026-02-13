"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientInvestment } from "@/app/actions/createClientInvestment";
import { Loader2 } from "lucide-react";

export default function SilentInvestmentHandler() {
  const router = useRouter();
  const processedRef = useRef(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const processPending = async () => {
      // 1. Check if already processing
      if (processedRef.current) return;

      // 2. Check LocalStorage
      const pendingData = localStorage.getItem("pending_investment");
      if (!pendingData) return;

      try {
        const { planId, projectId } = JSON.parse(pendingData);
        
        console.log("🔄 Processing pending investment for plan:", planId);
        
        // Mark as processing
        processedRef.current = true;
        setIsProcessing(true);

        // 3. Call Server Action
        const result = await createClientInvestment(planId);

        if (result.success) {
          console.log("✅ Investment created successfully:", result.investmentId);
          
          // Clean up localStorage
          localStorage.removeItem("pending_investment");
          
          // Redirect to investment detail page
          router.push(`/dashboard/investments/${result.investmentId}`);
          router.refresh();
        } else {
          console.error("❌ Investment creation failed:", result.error);
          
          // Clean up to prevent infinite loops
          localStorage.removeItem("pending_investment");
          
          // Show user-friendly error
          alert("We couldn't process your investment. Please try again from the investments page.");
        }
      } catch (error) {
        console.error("❌ Error processing pending investment:", error);
        
        // Clean up
        localStorage.removeItem("pending_investment");
        
        // Optionally show error to user
        alert("An error occurred while processing your investment.");
      } finally {
        setIsProcessing(false);
      }
    };

    // Small delay to ensure session is fully loaded
    const timer = setTimeout(processPending, 500);
    
    return () => clearTimeout(timer);
  }, [router]);

  // Show a subtle loading indicator while processing
  if (isProcessing) {
    return (
      <div className="fixed bottom-4 right-4 bg-[#d0a539] text-[#171512] px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-in slide-in-from-bottom">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-xs font-bold uppercase tracking-wider">
          Processing Your Investment...
        </span>
      </div>
    );
  }

  return null;
}