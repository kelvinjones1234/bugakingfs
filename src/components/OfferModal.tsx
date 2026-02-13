// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, ChevronLeft, ChevronRight } from "lucide-react";

// interface OfferModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   images: string[];
// }

// export default function OfferModal({
//   isOpen,
//   onClose,
//   images,
// }: OfferModalProps) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [direction, setDirection] = useState(0);

//   const nextImage = () => {
//     setDirection(1);
//     setCurrentIndex((prev) => (prev + 1 === images.length ? 0 : prev + 1));
//   };

//   const prevImage = () => {
//     setDirection(-1);
//     setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//   };

//   const goToImage = (idx: number) => {
//     setDirection(idx > currentIndex ? 1 : -1);
//     setCurrentIndex(idx);
//   };

//   const slideVariants = {
//     enter: (direction: number) => ({
//       x: direction > 0 ? 300 : -300, // Reduced animation distance for smaller modal
//       opacity: 0,
//     }),
//     center: {
//       zIndex: 1,
//       x: 0,
//       opacity: 1,
//     },
//     exit: (direction: number) => ({
//       zIndex: 0,
//       x: direction < 0 ? 300 : -300,
//       opacity: 0,
//     }),
//   };

//   const swipeConfidenceThreshold = 10000;
//   const swipePower = (offset: number, velocity: number) => {
//     return Math.abs(offset) * velocity;
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* Backdrop */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="fixed inset-0 z-50 bg-charcoal/80 backdrop-blur-md"
//           />

//           {/* Modal Container */}
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.9, y: 20 }}
//               transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
//               onClick={(e) => e.stopPropagation()}
//               // CHANGED: max-w-lg -> max-w-sm (Makes it much narrower/compact)
//               className="relative w-full max-w-sm overflow-hidden rounded-brand-lg bg-surface shadow-2xl pointer-events-auto border border-border"
//             >
//               {/* Close Button - Scaled down slightly */}
//               <button
//                 onClick={onClose}
//                 className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-charcoal/50 backdrop-blur-sm text-white hover:bg-charcoal/70 transition-all hover:scale-110 border border-[var(--primary)]"
//               >
//                 <X className="w-4 h-4 text-[var(--primary)]" />
//               </button>

//               {/* Image Slider - Kept aspect ratio but it will be smaller due to container width */}
//               <div className="relative aspect-[4/3] bg-charcoal overflow-hidden">
//                 <AnimatePresence initial={false} custom={direction}>
//                   <motion.div
//                     key={currentIndex}
//                     custom={direction}
//                     variants={slideVariants}
//                     initial="enter"
//                     animate="center"
//                     exit="exit"
//                     transition={{
//                       x: { type: "spring", stiffness: 300, damping: 30 },
//                       opacity: { duration: 0.2 },
//                     }}
//                     drag="x"
//                     dragConstraints={{ left: 0, right: 0 }}
//                     dragElastic={1}
//                     onDragEnd={(e, { offset, velocity }) => {
//                       const swipe = swipePower(offset.x, velocity.x);

//                       if (swipe < -swipeConfidenceThreshold) {
//                         nextImage();
//                       } else if (swipe > swipeConfidenceThreshold) {
//                         prevImage();
//                       }
//                     }}
//                     className="absolute inset-0 w-full h-full"
//                   >
//                     <div
//                       className="w-full h-full bg-contain bg-no-repeat bg-center"
//                       style={{ backgroundImage: `url("${images[currentIndex]}")` }}
//                     />
//                   </motion.div>
//                 </AnimatePresence>

//                 {/* Navigation Arrows */}
//                 {images.length > 1 && (
//                   <>
//                     <button
//                       onClick={prevImage}
//                       className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-charcoal/50 backdrop-blur-sm text-white hover:bg-charcoal/70 transition-all hover:scale-110 border border-white/10"
//                     >
//                       <ChevronLeft className="w-4 h-4" />
//                     </button>
//                     <button
//                       onClick={nextImage}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-charcoal/50 backdrop-blur-sm text-white hover:bg-charcoal/70 transition-all hover:scale-110 border border-white/10"
//                     >
//                       <ChevronRight className="w-4 h-4" />
//                     </button>
//                   </>
//                 )}

//                 {/* Dots Indicator */}
//                 {images.length > 1 && (
//                   <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
//                     {images.map((_, idx) => (
//                       <button
//                         key={idx}
//                         onClick={() => goToImage(idx)}
//                         className={`h-1.5 rounded-full transition-all ${
//                           idx === currentIndex
//                             ? "w-6 bg-primary"
//                             : "w-1.5 bg-white/60 hover:bg-white/80"
//                         }`}
//                       />
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Content Section - Reduced padding and font sizes */}
//               <div className="p-5 space-y-3">
//                 <div className="space-y-1.5">
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.1 }}
//                   >
//                     {/* Badge: Smaller text and padding */}
//                     <span className="inline-block px-2 py-0.5 rounded-full border border-primary text-primary text-[10px] font-bold uppercase tracking-[0.15em] bg-primary/5">
//                       Exclusive Deal
//                     </span>
//                   </motion.div>

//                   {/* Title: Reduced from 3xl to lg/xl */}
//                   <motion.h2
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.2 }}
//                     className="text-foreground text-xl font-bold tracking-tight"
//                   >
//                     Limited Time Offer
//                   </motion.h2>

//                   {/* Body: Reduced to text-sm */}
//                   <motion.p
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.3 }}
//                     className="text-foreground/70 text-sm leading-snug"
//                   >
//                     {currentIndex === images.length - 1
//                       ? "You've seen all our exclusive offers. Don't miss out on these limited-time opportunities!"
//                       : "Swipe through our latest offers and discover unbeatable deals crafted just for you."}
//                   </motion.p>
//                 </div>

//                 {/* Action Buttons - Compact sizing */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.4 }}
//                   className="flex flex-col sm:flex-row gap-2.5 pt-1"
//                 >
//                   {currentIndex === images.length - 1 ? (
//                     <button
//                       onClick={onClose}
//                       className="flex-1 bg-primary text-charcoal px-4 py-2.5 rounded-brand text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_15px_rgba(208,165,57,0.15)]"
//                     >
//                       Claim Offer
//                     </button>
//                   ) : (
//                     <>
//                       <button
//                         onClick={nextImage}
//                         className="flex-1 bg-primary text-charcoal px-4 py-2.5 rounded-brand text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_15px_rgba(208,165,57,0.15)]"
//                       >
//                         Next Offer
//                       </button>
//                       <button
//                         onClick={onClose}
//                         className="flex-1 bg-transparent border border-border text-foreground px-4 py-2.5 rounded-brand text-xs font-bold uppercase tracking-widest hover:border-primary/50 hover:bg-surface transition-all"
//                       >
//                         Skip
//                       </button>
//                     </>
//                   )}
//                 </motion.div>
//               </div>
//             </motion.div>
//           </div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }

// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, ChevronLeft, ChevronRight } from "lucide-react";

// interface OfferModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   images: string[];
// }

// export default function OfferModal({
//   isOpen,
//   onClose,
//   images,
// }: OfferModalProps) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [direction, setDirection] = useState(0);

//   const nextImage = () => {
//     setDirection(1);
//     setCurrentIndex((prev) => (prev + 1 === images.length ? 0 : prev + 1));
//   };

//   const prevImage = () => {
//     setDirection(-1);
//     setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//   };

//   const goToImage = (idx: number) => {
//     setDirection(idx > currentIndex ? 1 : -1);
//     setCurrentIndex(idx);
//   };

//   const slideVariants = {
//     enter: (direction: number) => ({
//       x: direction > 0 ? 280 : -280, // Matched to new max-width
//       opacity: 0,
//     }),
//     center: {
//       zIndex: 1,
//       x: 0,
//       opacity: 1,
//     },
//     exit: (direction: number) => ({
//       zIndex: 0,
//       x: direction < 0 ? 280 : -280,
//       opacity: 0,
//     }),
//   };

//   const swipeConfidenceThreshold = 10000;
//   const swipePower = (offset: number, velocity: number) => {
//     return Math.abs(offset) * velocity;
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* Backdrop */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="fixed inset-0 z-50 bg-charcoal/80 backdrop-blur-md"
//           />

//           {/* Modal Container */}
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.9, y: 20 }}
//               transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
//               onClick={(e) => e.stopPropagation()}
//               // CHANGED: max-w-[280px] creates a very compact "card" look
//               className="relative w-full max-w-[280px] overflow-hidden rounded-brand-lg bg-surface shadow-2xl pointer-events-auto border border-border"
//             >
//               {/* Close Button - Smaller & Tighter */}
//               <button
//                 onClick={onClose}
//                 className="absolute top-2 right-2 z-20 p-1.5 rounded-full bg-charcoal/60 backdrop-blur-sm text-[var(--primary)] hover:bg-[var(--foreground)]/80 transition-all hover:scale-110 border border-[var(--primary)]/20"
//               >
//                 <X className="w-3.5 h-3.5" />
//               </button>

//               {/* Image Slider - Aspect ratio maintained, but actual pixels will be smaller */}
//               <div className="relative aspect-[4/3] bg-charcoal overflow-hidden">
//                 <AnimatePresence initial={false} custom={direction}>
//                   <motion.div
//                     key={currentIndex}
//                     custom={direction}
//                     variants={slideVariants}
//                     initial="enter"
//                     animate="center"
//                     exit="exit"
//                     transition={{
//                       x: { type: "spring", stiffness: 300, damping: 30 },
//                       opacity: { duration: 0.2 },
//                     }}
//                     drag="x"
//                     dragConstraints={{ left: 0, right: 0 }}
//                     dragElastic={1}
//                     onDragEnd={(e, { offset, velocity }) => {
//                       const swipe = swipePower(offset.x, velocity.x);

//                       if (swipe < -swipeConfidenceThreshold) {
//                         nextImage();
//                       } else if (swipe > swipeConfidenceThreshold) {
//                         prevImage();
//                       }
//                     }}
//                     className="absolute inset-0 w-full h-full"
//                   >
//                     <div
//                       className="w-full h-full bg-contain bg-no-repeat bg-center"
//                       style={{ backgroundImage: `url("${images[currentIndex]}")` }}
//                     />
//                   </motion.div>
//                 </AnimatePresence>

//                 {/* Navigation Arrows - Smaller icons and padding */}
//                 {images.length > 1 && (
//                   <>
//                     <button
//                       onClick={prevImage}
//                       className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-charcoal/50 backdrop-blur-sm text-white hover:bg-charcoal/70 transition-all hover:scale-110 border border-white/10"
//                     >
//                       <ChevronLeft className="w-3.5 h-3.5" />
//                     </button>
//                     <button
//                       onClick={nextImage}
//                       className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-charcoal/50 backdrop-blur-sm text-white hover:bg-charcoal/70 transition-all hover:scale-110 border border-white/10"
//                     >
//                       <ChevronRight className="w-3.5 h-3.5" />
//                     </button>
//                   </>
//                 )}

//                 {/* Dots Indicator - Smaller dots */}
//                 {images.length > 1 && (
//                   <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
//                     {images.map((_, idx) => (
//                       <button
//                         key={idx}
//                         onClick={() => goToImage(idx)}
//                         className={`h-1 rounded-full transition-all ${
//                           idx === currentIndex
//                             ? "w-4 bg-primary"
//                             : "w-1 bg-white/60 hover:bg-white/80"
//                         }`}
//                       />
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Content Section - Compact Padding */}
//               <div className="p-4 space-y-2.5">
//                 <div className="space-y-1">
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.1 }}
//                   >
//                     {/* Badge: Tiny text */}
//                     <span className="inline-block px-1.5 py-0.5 rounded-full border border-primary text-primary text-[9px] font-bold uppercase tracking-[0.1em] bg-primary/5">
//                       Exclusive Deal
//                     </span>
//                   </motion.div>

//                   {/* Title: Reduced to text-lg */}
//                   <motion.h2
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.2 }}
//                     className="text-foreground text-lg font-bold tracking-tight"
//                   >
//                     Limited Time Offer
//                   </motion.h2>

//                   {/* Body: Reduced to text-xs */}
//                   <motion.p
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.3 }}
//                     className="text-foreground/70 text-xs leading-relaxed"
//                   >
//                     {currentIndex === images.length - 1
//                       ? "Don't miss out on these limited-time opportunities!"
//                       : "Swipe through our latest offers and discover unbeatable deals."}
//                   </motion.p>
//                 </div>

//                 {/* Action Buttons - Very Compact */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.4 }}
//                   className="flex gap-2 pt-1"
//                 >
//                   {currentIndex === images.length - 1 ? (
//                     <button
//                       onClick={onClose}
//                       className="w-full bg-primary text-charcoal py-2 rounded-brand text-[10px] font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-[0_0_10px_rgba(208,165,57,0.15)]"
//                     >
//                       Claim Offer
//                     </button>
//                   ) : (
//                     <>
//                       <button
//                         onClick={nextImage}
//                         className="flex-1 bg-primary text-charcoal py-2 rounded-brand text-[10px] font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-[0_0_10px_rgba(208,165,57,0.15)]"
//                       >
//                         Next
//                       </button>
//                       <button
//                         onClick={onClose}
//                         className="flex-1 bg-transparent border border-border text-foreground py-2 rounded-brand text-[10px] font-bold uppercase tracking-widest hover:border-primary/50 hover:bg-surface transition-all"
//                       >
//                         Skip
//                       </button>
//                     </>
//                   )}
//                 </motion.div>
//               </div>
//             </motion.div>
//           </div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
}

export default function OfferModal({
  isOpen,
  onClose,
  images,
}: OfferModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide logic
  useEffect(() => {
    if (!isOpen || isPaused) return;

    const timer = setInterval(() => {
      nextImage();
    }, 4000); // Changes every 4 seconds

    return () => clearInterval(timer);
  }, [isOpen, isPaused, currentIndex]);

  const nextImage = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1 === images.length ? 0 : prev + 1));
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToImage = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 280 : -280,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 280 : -280,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[var(--foreground)]/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 pt-[4rem] z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              onClick={(e) => e.stopPropagation()}
              onMouseEnter={() => setIsPaused(true)} // Pause auto-slide on hover
              onMouseLeave={() => setIsPaused(false)} // Resume on leave
              className="relative w-full max-w-[280px] overflow-hidden rounded-brand-lg bg-surface shadow-2xl pointer-events-auto border border-border"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-2 right-2 z-20 p-1.5 rounded-full bg-charcoal/60 backdrop-blur-sm text-[var(--primary)] hover:bg-[var(--foreground)]/80 transition-all hover:scale-110 border border-[var(--primary)]/20"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* Image Slider */}
              <div className="relative aspect-[4/3] bg-charcoal overflow-hidden">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                      const swipe = swipePower(offset.x, velocity.x);

                      if (swipe < -swipeConfidenceThreshold) {
                        nextImage();
                      } else if (swipe > swipeConfidenceThreshold) {
                        prevImage();
                      }
                    }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <div
                      className="w-full h-full bg-contain bg-no-repeat bg-center"
                      style={{
                        backgroundImage: `url("${images[currentIndex]}")`,
                      }}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-charcoal/50 backdrop-blur-sm text-white hover:bg-charcoal/70 transition-all hover:scale-110 border border-white/10"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-charcoal/50 backdrop-blur-sm text-white hover:bg-charcoal/70 transition-all hover:scale-110 border border-white/10"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}

                {/* Dots Indicator */}
                {images.length > 1 && (
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => goToImage(idx)}
                        className={`h-1 rounded-full transition-all ${
                          idx === currentIndex
                            ? "w-4 bg-primary"
                            : "w-1 bg-white/60 hover:bg-white/80"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-4 space-y-2.5">
                <div className="space-y-1">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <span className="inline-block px-1.5 py-0.5 rounded-full border border-primary text-primary text-[9px] font-bold uppercase tracking-[0.1em] bg-primary/5">
                      Exclusive Deal
                    </span>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-foreground text-lg font-bold tracking-tight"
                  >
                    Limited Time Offer
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-foreground/70 text-xs leading-relaxed"
                  >
                    {/* Simplified text since we are auto-sliding */}
                    Look into our latest offers and discover unbeatable deals
                    crafted just for you.
                  </motion.p>
                </div>

                {/* Action Button - Simplified to a single persistent button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="pt-1"
                >
                  {/* <button
                    onClick={onClose}
                    className="w-full bg-primary text-charcoal py-2 rounded-brand text-[10px] font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-[0_0_10px_rgba(208,165,57,0.15)]"
                  >
                    Know More
                  </button> */}

                  <button
                    onClick={() => {
                      // 1. Your WhatsApp Number (Format: CountryCode + Number, no '+' sign)
                      // Example: 2348012345678 for a Nigerian number
                      const phoneNumber = "2348164257149";

                      // 2. The default message the user will send
                      const message =
                        "Hello, I would like to know more about this investment opportunity.";

                      // 3. Create the URL
                      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

                      // 4. Open WhatsApp in a new tab
                      window.open(url, "_blank");

                      // 5. Close the modal (Good UX so it's gone when they return)
                      onClose();
                    }}
                    className="w-full bg-primary text-charcoal py-2 rounded-brand text-[10px] font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-[0_0_10px_rgba(208,165,57,0.15)]"
                  >
                    Chat on WhatsApp
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
