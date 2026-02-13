// components/OfferManager.tsx
"use client"; // This marks ONLY this component as client-side

import { useState, useEffect } from "react";
import OfferModal from "./OfferModal"; // Adjust path as needed

// You can define images here or accept them as props from the server
const DEFAULT_IMAGES = ["/ads1.jpeg", "/ads2.jpeg", "/ads3.jpeg"];

export default function OfferManager() {
  const [isOfferOpen, setIsOfferOpen] = useState(false);

  useEffect(() => {
    // Automatically show the popup after 2 seconds
    const timer = setTimeout(() => {
      setIsOfferOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <OfferModal
      isOpen={isOfferOpen}
      onClose={() => setIsOfferOpen(false)}
      images={DEFAULT_IMAGES}
    />
  );
}
