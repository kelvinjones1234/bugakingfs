import "./globals.css";
import Script from "next/script";
import GAListener from "@/components/GAListener";
import { Suspense } from "react";
import { AuthProvider } from "@/components/providers/AuthProvider";

// 1. Import the Silent Handler
import SilentInvestmentHandler from "./dashboard/components/SilentInvestmentHandler";
import { ToastProvider } from "@/components/Toast";

export const metadata = {
  title: "BugaKing",
  description: "BugaKing - Agriculture, Technology & Real Estate",
  icons: {
    icon: "/bugakingLogo.png",
  },
};

const GA_ID = "G-GP814MESP6";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>

      <body suppressHydrationWarning={true} className="text-black">
        {/* Wrap everything with Providers */}
        <AuthProvider>
          {/* Wrap the app with ToastProvider so all children can trigger toasts */}
          <ToastProvider>
            {/* The Handler sits invisibly at the top level of your app. */}
            <SilentInvestmentHandler />

            <Suspense fallback={null}>
              <GAListener />
            </Suspense>
            
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
} 