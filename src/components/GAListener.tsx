"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const GA_ID = "G-GP814MESP6";

export default function GAListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const gtag = (window as any).gtag;

    if (gtag) {
      gtag("config", GA_ID, {
        page_path: pathname + "?" + searchParams.toString(),
      });
    }
  }, [pathname, searchParams]);

  return null;
}
