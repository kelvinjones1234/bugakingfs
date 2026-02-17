// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import { Shield, ShieldCheck, Sprout, Tractor } from "lucide-react";
// export default function Main() {
//   // --- CALCULATOR STATE & LOGIC ---
//   const [investment, setInvestment] = useState<number>(3000000);

//   // Constants based on the specific math provided in your script
//   const ROI_PERCENTAGE = 0.3;
//   const BASE_INVESTMENT = 3000000;
//   const BASE_APPRECIATION = 200000;
//   const BASE_ACRES = 1.0;

//   // Derived calculations
//   const roi = investment * ROI_PERCENTAGE;
//   const appreciation = (investment / BASE_INVESTMENT) * BASE_APPRECIATION;
//   const totalGain = roi + appreciation;
//   const landSize = ((investment / BASE_INVESTMENT) * BASE_ACRES).toFixed(1);

//   // Formatting helpers
//   const formatCurrency = (value: number) => {
//     return new Intl.NumberFormat("en-NG").format(value);
//   };

//   const min = 1000000;
//   const max = 10000000;
//   const sliderPercentage = ((investment - min) / (max - min)) * 100;

//   // --- EVENT HANDLERS ---
//   const handleWhatsApp = (e?: React.FormEvent) => {
//     if (e) e.preventDefault();
//     window.open("https://wa.me/234XXXXXXXXXX", "_blank"); // Update with your actual WhatsApp number
//   };

//   const scrollToCalculator = () => {
//     document
//       .getElementById("calculator-section")
//       ?.scrollIntoView({ behavior: "smooth" });
//   };

//   const scrollGallery = (direction: "left" | "right") => {
//     const gallery = document.getElementById("gallery-scroll");
//     if (gallery) {
//       gallery.scrollBy({
//         left: direction === "left" ? -300 : 300,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <div className="font-['Manrope',_sans-serif] bg-[#fcfdfc] text-slate-800 min-h-screen flex flex-col selection:bg-[#0ff035] selection:text-[#0a2f1c]">
//       {/* --- NAVIGATION --- */}
//       <nav className="absolute top-0 w-full flex justify-center py-6 z-20 px-4">
//         <div className="flex flex-col items-center">
//           <div className="flex items-center gap-2">
//             <div>
//               <Image
//                 src="/bugakingLogo.png"
//                 alt="Logo"
//                 width={80}
//                 height={50}
//                 className="object-contain"
//               />
//             </div>
//           </div>
//           <span className="text-lg uppercase tracking-widest font-semibold text-slate-700">
//             RC:7079424
//           </span>
//         </div>
//       </nav>

//       {/* --- HERO SECTION --- */}
//       <header className="text-center max-w-3xl mx-auto space-y-6 mb-[5rem] mt-[10rem]">
//         <h1 className="font-['Playfair_Display',_serif] font-bold text-4xl md:text-6xl lg:text-7xl text-[#0a2f1c] leading-[1.1]">
//           Don’t Just Own Land.
//           <br />
//           <span className="relative inline-block">
//             Own a Harvest.
//             <svg
//               className="absolute w-full h-3 -bottom-1 left-0 text-[#0ff035] opacity-60"
//               fill="none"
//               viewBox="0 0 200 9"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M2.00025 6.99997C25.7501 3.99991 132.5 -8.19967 198 6.99997"
//                 stroke="currentColor"
//                 strokeWidth="3"
//               ></path>
//             </svg>
//           </span>
//         </h1>
//         <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-light">
//           Secure professionally managed, asset-backed farmland and explore the
//           potential of agricultural investment.
//         </p>
//       </header>

//       <main className="w-full mx-auto flex flex-col items-center gap-20 bg-[#fcfdfc]">
//         {/* --- FEATURES STRIP --- */}
//         <section className="w-full bg-[#0a2f1c] text-white py-12 px-4 relative overflow-hidden">
//           <div
//             className="absolute inset-0 opacity-10"
//             style={{
//               backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
//               backgroundSize: "20px 20px",
//             }}
//           ></div>

//           <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
//             {/* C of O */}
//             <div className="text-center space-y-2">
//               <ShieldCheck className="w-10 h-10 mx-auto text-[#d4af37]" />
//               <h3 className="font-bold text-lg">C of O Secured</h3>
//               <p className="text-xs text-white/60">
//                 Government backed land titles
//               </p>
//             </div>

//             {/* Management */}
//             <div className="text-center space-y-2">
//               <Tractor className="w-10 h-10 mx-auto text-[#d4af37]" />
//               <h3 className="font-bold text-lg">Pro Management</h3>
//               <p className="text-xs text-white/60">
//                 Expert agronomists on site
//               </p>
//             </div>

//             {/* Asset Backed */}
//             <div className="text-center space-y-2">
//               <Sprout className="w-10 h-10 mx-auto text-[#d4af37]" />
//               <h3 className="font-bold text-lg">Asset Backed</h3>
//               <p className="text-xs text-white/60">Real crops, real value</p>
//             </div>

//             {/* Insurance */}
//             <div className="text-center space-y-2">
//               <Shield className="w-10 h-10 mx-auto text-[#d4af37]" />
//               <h3 className="font-bold text-lg">Farm Insurance</h3>
//               <p className="text-xs text-white/60">
//                 Protection for your farmland
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* --- CALCULATOR SECTION --- */}
//         <section
//           id="calculator-section"
//           className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 "
//         >
//           <div className="text-center mb-12">
//             <span className="text-[#d4af37] font-bold uppercase tracking-widest text-xs mb-2 block">
//               Investment Planner
//             </span>
//             <h2 className="font-['Playfair_Display',_serif] font-bold text-3xl md:text-4xl text-[#0a2f1c] mb-4">
//               See Your Potential Growth
//             </h2>
//             <p className="text-slate-500 max-w-2xl mx-auto">
//               Use our interactive tool to estimate your returns based on current
//               market projections for the 2026 planting season.
//             </p>
//           </div>

//           <div className="bg-white rounded-2xl shadow-[0_20px_40px_-15px_rgba(10,47,28,0.1)] border border-slate-100 p-6 md:p-12 relative z-10 overflow-hidden">
//             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0a2f1c] via-[#0ff035] to-[#d4af37]"></div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
//               {/* Controls */}
//               <div className="space-y-8 h-full flex flex-col justify-center">
//                 <div>
//                   <label
//                     className="block text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4"
//                     htmlFor="investment-slider"
//                   >
//                     Select your investment capital
//                   </label>
//                   <div className="flex items-baseline gap-1 mb-6">
//                     <span className="text-2xl text-slate-400 font-['Playfair_Display',_serif]">
//                       ₦
//                     </span>
//                     <span className="text-5xl font-bold text-[#0a2f1c] tracking-tight">
//                       {formatCurrency(investment)}
//                     </span>
//                   </div>

//                   <div className="relative w-full h-6 flex items-center">
//                     <input
//                       type="range"
//                       id="investment-slider"
//                       min={min}
//                       max={max}
//                       step="500000"
//                       value={investment}
//                       onChange={(e) => setInvestment(Number(e.target.value))}
//                       className="bugaking-slider z-20 relative w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
//                     />
//                     <div
//                       className="absolute left-0 top-1/2 -translate-y-1/2 h-2 bg-[#0a2f1c] rounded-l-lg pointer-events-none"
//                       style={{ width: `${sliderPercentage}%` }}
//                     ></div>
//                   </div>
//                   <div className="flex justify-between mt-2 text-xs font-medium text-slate-400">
//                     <span>₦1M</span>
//                     <span>₦10M</span>
//                   </div>
//                 </div>

//                 <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-4">
//                   <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
//                     <span className="material-icons-round text-[#d4af37]">
//                       landscape
//                     </span>
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-bold text-[#0a2f1c]">
//                       Real Asset Ownership
//                     </h4>
//                     <p className="text-xs text-slate-500 mt-1 leading-relaxed">
//                       Directly own productive farmland with appreciation
//                       potential. <br /> Your investment is backed by physical
//                       land deeds.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Results & Lead Form */}
//               <div className="bg-[#0a2f1c] rounded-xl p-8 text-white relative overflow-hidden flex flex-col gap-6 shadow-2xl">
//                 <div className="relative z-10 space-y-6">
//                   <div className="grid grid-cols-2 gap-6 border-b border-white/10 pb-6">
//                     <div>
//                       <p className="text-[10px] text-white/60 font-medium uppercase tracking-wider mb-1">
//                         Estimated Land Size
//                       </p>
//                       <h3 className="text-xl font-bold text-white">
//                         <span>{landSize}</span> Acres
//                       </h3>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-white/60 font-medium uppercase tracking-wider mb-1">
//                         Est. Land Appreciation
//                       </p>
//                       <h3 className="text-xl font-bold text-white">
//                         ₦<span>{formatCurrency(appreciation)}</span>
//                       </h3>
//                     </div>
//                   </div>
//                   <div>
//                     <p className="text-xs text-[#0ff035]/80 font-medium uppercase tracking-wider mb-2">
//                       Potential Annual Returns (30% projected)
//                     </p>
//                     <div className="flex items-center gap-3">
//                       <span className="material-icons-round text-[#0ff035] text-2xl">
//                         trending_up
//                       </span>
//                       <h3 className="text-3xl font-bold text-white">
//                         ₦ <span>{formatCurrency(roi)}</span>
//                       </h3>
//                     </div>
//                   </div>
//                   <div className="bg-white/5 p-4 rounded-lg border border-white/5">
//                     <p className="text-xs text-[#d4af37]/90 font-medium uppercase tracking-wider mb-1">
//                       Total Estimated Value (Gain)
//                     </p>
//                     <h2 className="text-4xl font-bold gold-text-gradient font-['Playfair_Display',_serif] tracking-tight">
//                       ₦ <span>{formatCurrency(totalGain)}</span>
//                     </h2>
//                   </div>
//                 </div>

//                 <div className="relative z-10 pt-4">
//                   <form className="space-y-4" onSubmit={handleWhatsApp}>
//                     <div className="grid grid-cols-1 gap-3">
//                       <input
//                         className="w-full bg-white/5 outline-none border border-white/20 text-white placeholder-white/40 text-sm rounded-lg focus:ring-1 focus:ring-[#0ff035] focus:border-[#0ff035] block p-3 transition-colors"
//                         placeholder="Full Name"
//                         required
//                         type="text"
//                       />
//                       <input
//                         className="w-full bg-white/5 outline-none border border-white/20 text-white placeholder-white/40 text-sm rounded-lg focus:ring-1 focus:ring-[#0ff035] focus:border-[#0ff035] block p-3 transition-colors"
//                         placeholder="WhatsApp Number"
//                         required
//                         type="tel"
//                       />
//                     </div>
//                     <button
//                       type="submit"
//                       className="w-full group bg-[#0ff035] hover:bg-[#0bc42a] transition-all duration-300 text-[#0a2f1c] font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(15,240,53,0.3)] hover:shadow-lg hover:-translate-y-0.5"
//                     >
//                       <svg
//                         className="w-5 h-5 fill-current"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
//                       </svg>
//                       <span className="uppercase tracking-widest text-xs sm:text-sm text-black whitespace-nowrap">
//                         Get Personalized Prospectus
//                       </span>
//                     </button>
//                   </form>
//                   <p className="text-center text-[10px] text-white/30 mt-3 leading-tight">
//                     Limited slots available for the 2026 planting season.
//                     Receive a personalized report showing potential returns for
//                     your selected investment amount.
//                   </p>
//                   <p className="text-center text-[10px] text-white/40 mt-2 flex items-center justify-center gap-1">
//                     <span className="text-sm">🔒</span> Your info is safe. Used
//                     only to send your prospectus.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* --- GALLERY CAROUSEL --- */}
//         <section className="w-full py-12 sm:py-16 bg-slate-50 overflow-hidden">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 flex flex-row items-end sm:items-center justify-between gap-4">
//             <div className="flex-1">
//               <h2 className="font-['Playfair_Display',_serif] font-bold text-2xl md:text-3xl text-[#0a2f1c] leading-tight">
//                 Life on the Farm
//               </h2>
//               <p className="text-sm text-slate-500 mt-1">
//                 See your investment in action
//               </p>
//             </div>
//             <div className="flex gap-2 shrink-0">
//               <button
//                 onClick={() => scrollGallery("left")}
//                 className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-white text-[#0a2f1c] active:scale-95 transition-transform"
//                 aria-label="Scroll left"
//               >
//                 <span className="material-icons-round">arrow_back</span>
//               </button>
//               <button
//                 onClick={() => scrollGallery("right")}
//                 className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-white text-[#0a2f1c] active:scale-95 transition-transform"
//                 aria-label="Scroll right"
//               >
//                 <span className="material-icons-round">arrow_forward</span>
//               </button>
//             </div>
//           </div>

//           <div
//             id="gallery-scroll"
//             className="flex gap-4 sm:gap-6 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-4 snap-x snap-mandatory scroll-smooth hide-scroll"
//             style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//           >
//             {/* Card 1 */}
//             <div className="snap-center sm:snap-start shrink-0 w-[85vw] sm:w-[300px] lg:w-[340px] h-[360px] sm:h-[400px] lg:h-[460px] relative rounded-xl overflow-hidden group cursor-pointer">
//               <img
//                 alt="Drone shot of corn fields"
//                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                 src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
//                   <span className="material-icons-round text-white text-3xl">
//                     play_circle
//                   </span>
//                 </div>
//               </div>
//               <div className="absolute bottom-5 left-5 right-5">
//                 <span className="text-xs font-bold text-[#0ff035] uppercase tracking-wider">
//                   Drone View
//                 </span>
//                 <h3 className="text-white font-['Playfair_Display',_serif] text-lg sm:text-xl mt-1">
//                   Surveying Phase 1
//                 </h3>
//               </div>
//             </div>

//             {/* Card 2 */}
//             <div className="snap-center sm:snap-start shrink-0 w-[85vw] sm:w-[300px] lg:w-[340px] h-[360px] sm:h-[400px] lg:h-[460px] relative rounded-xl overflow-hidden group">
//               <img
//                 alt="Close up of healthy crops"
//                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                 src="https://images.unsplash.com/photo-1595822904886-f1c7136014ba?q=80&w=800&auto=format&fit=crop"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
//               <div className="absolute bottom-5 left-5 right-5">
//                 <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
//                   Harvest
//                 </span>
//                 <h3 className="text-white font-['Playfair_Display',_serif] text-lg sm:text-xl mt-1">
//                   Maize Crop Yield
//                 </h3>
//               </div>
//             </div>

//             {/* Card 3 */}
//             <div className="snap-center sm:snap-start shrink-0 w-[85vw] sm:w-[300px] lg:w-[340px] h-[360px] sm:h-[400px] lg:h-[460px] relative rounded-xl overflow-hidden group cursor-pointer">
//               <img
//                 alt="Farmers working in field"
//                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                 src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=800&auto=format&fit=crop"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
//                   <span className="material-icons-round text-white text-3xl">
//                     play_circle
//                   </span>
//                 </div>
//               </div>
//               <div className="absolute bottom-5 left-5 right-5">
//                 <span className="text-xs font-bold text-[#0ff035] uppercase tracking-wider">
//                   Team
//                 </span>
//                 <h3 className="text-white font-['Playfair_Display',_serif] text-lg sm:text-xl mt-1">
//                   Meet Our Agronomists
//                 </h3>
//               </div>
//             </div>

//             {/* Card 4 */}
//             <div className="snap-center sm:snap-start shrink-0 w-[85vw] sm:w-[300px] lg:w-[340px] h-[360px] sm:h-[400px] lg:h-[460px] relative rounded-xl overflow-hidden group">
//               <img
//                 alt="Tractor plowing field"
//                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                 src="https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=800&auto=format&fit=crop"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
//               <div className="absolute bottom-5 left-5 right-5">
//                 <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
//                   Machinery
//                 </span>
//                 <h3 className="text-white font-['Playfair_Display',_serif] text-lg sm:text-xl mt-1">
//                   Mechanized Farming
//                 </h3>
//               </div>
//             </div>

//             {/* Spacer element to ensure last item can be fully scrolled into view with padding on mobile */}
//             <div className="shrink-0 w-[1px] sm:hidden"></div>
//           </div>
//         </section>

//         {/* --- TESTIMONIALS --- */}
//         <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 ">
//           <div className="text-center mb-12">
//             <h2 className="font-['Playfair_Display',_serif] font-bold text-3xl md:text-4xl text-[#0a2f1c] mb-4">
//               Success Stories
//             </h2>
//             <p className="text-slate-500">
//               Hear from investors who are already growing their wealth.
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="bg-white rounded-xl p-6 shadow-[0_20px_40px_-15px_rgba(10,47,28,0.1)] border border-slate-100 flex flex-col">
//               <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6 bg-slate-200">
//                 <img
//                   alt="Video thumbnail of investor testimonial"
//                   className="w-full h-full object-cover opacity-80"
//                   src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=250&fit=crop"
//                 />
//                 <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer">
//                   <span className="material-icons-round text-white text-4xl shadow-xl">
//                     play_circle_filled
//                   </span>
//                 </div>
//               </div>
//               <blockquote className="flex-grow">
//                 <p className="text-slate-600 italic text-sm mb-4">
//                   "I was skeptical about agricultural investment until I visited
//                   the Bugaking site. The professionalism is unmatched, and my
//                   first harvest returns were exactly as projected."
//                 </p>
//               </blockquote>
//               <div className="flex items-center gap-3 mt-4 border-t border-slate-100 pt-4">
//                 <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
//                   <img
//                     alt="Profile"
//                     className="w-full h-full object-cover"
//                     src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop"
//                   />
//                 </div>
//                 <div>
//                   <h4 className="font-bold text-[#0a2f1c] text-sm">
//                     Chinedu Okafor
//                   </h4>
//                   <p className="text-xs text-slate-500">
//                     Bank Executive, Lagos
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-xl p-6 shadow-[0_20px_40px_-15px_rgba(10,47,28,0.1)] border border-slate-100 flex flex-col">
//               <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6 bg-slate-200">
//                 <img
//                   alt="Video thumbnail of investor testimonial"
//                   className="w-full h-full object-cover opacity-80"
//                   src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=250&fit=crop"
//                 />
//                 <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer">
//                   <span className="material-icons-round text-white text-4xl shadow-xl">
//                     play_circle_filled
//                   </span>
//                 </div>
//               </div>
//               <blockquote className="flex-grow">
//                 <p className="text-slate-600 italic text-sm mb-4">
//                   "The transparency is what sold me. Getting regular video
//                   updates of my designated plot makes me feel involved even from
//                   Abuja."
//                 </p>
//               </blockquote>
//               <div className="flex items-center gap-3 mt-4 border-t border-slate-100 pt-4">
//                 <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
//                   <img
//                     alt="Profile"
//                     className="w-full h-full object-cover"
//                     src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop"
//                   />
//                 </div>
//                 <div>
//                   <h4 className="font-bold text-[#0a2f1c] text-sm">
//                     Sarah Adebayo
//                   </h4>
//                   <p className="text-xs text-slate-500">
//                     Oil & Gas Engineer, Abuja
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-xl p-6 shadow-[0_20px_40px_-15px_rgba(10,47,28,0.1)] border border-slate-100 flex flex-col">
//               <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6 bg-slate-200">
//                 <img
//                   alt="Video thumbnail of investor testimonial"
//                   className="w-full h-full object-cover opacity-80"
//                   src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=250&fit=crop"
//                 />
//                 <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer">
//                   <span className="material-icons-round text-white text-4xl shadow-xl">
//                     play_circle_filled
//                   </span>
//                 </div>
//               </div>
//               <blockquote className="flex-grow">
//                 <p className="text-slate-600 italic text-sm mb-4">
//                   "Diversifying my portfolio into agriculture with Bugaking has
//                   been my best financial decision this year. The C of O gave me
//                   the peace of mind I needed."
//                 </p>
//               </blockquote>
//               <div className="flex items-center gap-3 mt-4 border-t border-slate-100 pt-4">
//                 <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
//                   <img
//                     alt="Profile"
//                     className="w-full h-full object-cover"
//                     src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop"
//                   />
//                 </div>
//                 <div>
//                   <h4 className="font-bold text-[#0a2f1c] text-sm">
//                     David Ibrahim
//                   </h4>
//                   <p className="text-xs text-slate-500">
//                     Real Estate Developer
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* --- FAQ --- */}
//         <section className="w-full max-w-3xl px-4 mx-auto py-[3rem]">
//           <div className="text-center mb-10">
//             <h2 className="font-['Playfair_Display',_serif] font-bold text-2xl md:text-3xl text-[#0a2f1c]">
//               Frequently Asked Questions
//             </h2>
//           </div>
//           <div className="space-y-4">
//             <details className="group bg-white rounded-lg border border-slate-200 overflow-hidden">
//               <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-5 text-[#0a2f1c]">
//                 <span>How is my land secured?</span>
//                 <span className="transition group-open:rotate-180">
//                   <svg
//                     className="fill-none h-5 w-5 stroke-current"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="1.5"
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M6 9l6 6 6-6"></path>
//                   </svg>
//                 </span>
//               </summary>
//               <div className="text-slate-600 p-5 pt-0 text-sm leading-relaxed">
//                 Every acre sold comes with a Deed of Assignment and Survey Plan.
//                 The entire estate is covered by a global Certificate of
//                 Occupancy (C of O), ensuring your ownership is legally backed by
//                 the government.
//               </div>
//             </details>
//             <details className="group bg-white rounded-lg border border-slate-200 overflow-hidden">
//               <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-5 text-[#0a2f1c]">
//                 <span>When do returns start?</span>
//                 <span className="transition group-open:rotate-180">
//                   <svg
//                     className="fill-none h-5 w-5 stroke-current"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="1.5"
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M6 9l6 6 6-6"></path>
//                   </svg>
//                 </span>
//               </summary>
//               <div className="text-slate-600 p-5 pt-0 text-sm leading-relaxed">
//                 Returns are paid annually after harvest. For the 2026 planting
//                 season, investors can expect their first payout in Q4 2026,
//                 typically 12 months after the initial investment cycle begins.
//               </div>
//             </details>
//             <details className="group bg-white rounded-lg border border-slate-200 overflow-hidden">
//               <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-5 text-[#0a2f1c]">
//                 <span>Can I visit the farm?</span>
//                 <span className="transition group-open:rotate-180">
//                   <svg
//                     className="fill-none h-5 w-5 stroke-current"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="1.5"
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M6 9l6 6 6-6"></path>
//                   </svg>
//                 </span>
//               </summary>
//               <div className="text-slate-600 p-5 pt-0 text-sm leading-relaxed">
//                 Absolutely! We organize quarterly site visits for investors. You
//                 can also schedule a private inspection tour by contacting our
//                 support team via WhatsApp.
//               </div>
//             </details>
//           </div>
//         </section>

//         {/* --- FOOTER CTA --- */}
//         <section className="w-full bg-[#0a2f1c] text-white py-16 px-4 rounded-t-[3rem] shadow-2xl relative overflow-hidden mt-[3rem]">
//           <div className="absolute top-0 right-0 w-64 h-64 bg-[#0ff035]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
//           <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
//           <div className="max-w-3xl mx-auto text-center relative z-10 space-y-8">
//             <h2 className="font-['Playfair_Display',_serif] text-3xl md:text-4xl font-bold leading-tight">
//               Take the First Step Toward Your Personalized Prospectus
//             </h2>
//             <p className="text-white/80 max-w-xl mx-auto">
//               Don't let another planting season pass you by. Secure your slots
//               today.
//             </p>
//             <button
//               onClick={() => handleWhatsApp()}
//               className="bg-[#0ff035] hover:bg-[#0bc42a] text-[#0a2f1c] font-bold py-4 px-10 rounded-full shadow-[0_0_20px_rgba(15,240,53,0.3)] transition-all duration-300 hover:scale-105 inline-flex items-center gap-2 text-lg"
//             >
//               <svg
//                 className="w-6 h-6 fill-current"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
//               </svg>
//               <span>Get Prospectus via WhatsApp</span>
//             </button>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }









"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Shield, ShieldCheck, Sprout, Tractor } from "lucide-react";

export default function Main() {
  // --- CALCULATOR STATE & LOGIC ---
  const [plots, setPlots] = useState<number>(1);
  const [plan, setPlan] = useState<"outright" | "monthly" | "weekly">("outright");

  // Constants based on the BugaKing Farmers Estate Offer
  const PLOT_SIZE_SQM = 500;
  const OUTRIGHT_PRICE = 1800000;
  const MONTHLY_PRICE = 384000; 
  const WEEKLY_PRICE = 96000; 

  // Derived calculations
  const totalSqm = plots * PLOT_SIZE_SQM;
  let totalCost = 0;
  let installmentAmount = 0;

  if (plan === "outright") {
    totalCost = plots * OUTRIGHT_PRICE;
  } else if (plan === "monthly") {
    installmentAmount = plots * MONTHLY_PRICE;
    totalCost = installmentAmount * 6; // 6 months total
  } else if (plan === "weekly") {
    installmentAmount = plots * WEEKLY_PRICE;
    totalCost = installmentAmount * 24; // Approx 24 weeks in 6 months
  }

  // Formatting helpers
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG").format(value);
  };

  const minPlots = 1;
  const maxPlots = 10;
  const sliderPercentage = ((plots - minPlots) / (maxPlots - minPlots)) * 100;

  // --- EVENT HANDLERS ---
  const handleWhatsApp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    window.open("https://wa.me/2348027788128", "_blank"); 
  };

  const scrollGallery = (direction: "left" | "right") => {
    const gallery = document.getElementById("gallery-scroll");
    if (gallery) {
      gallery.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="font-['Manrope',_sans-serif] bg-[#fcfdfc] text-slate-800 min-h-screen flex flex-col selection:bg-[#0ff035] selection:text-[#0a2f1c]">
      {/* --- NAVIGATION --- */}
      <nav className="absolute top-0 w-full flex justify-center py-6 z-20 px-4">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <div>
              <Image
                src="/bugakingLogo.png"
                alt="Logo"
                width={80}
                height={50}
                className="object-contain"
              />
            </div>
          </div>
          <span className="text-lg uppercase tracking-widest font-semibold text-slate-700">
            RC:7079424
          </span>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="text-center max-w-4xl mx-auto space-y-6 mb-[5rem] mt-[10rem] px-4">
        <div className="inline-block bg-[#0a2f1c]/10 text-[#0a2f1c] font-bold px-4 py-1.5 rounded-full text-sm mb-2 border border-[#0a2f1c]/20">
          📍 Kuje - Abuja
        </div>
        <h1 className="font-['Playfair_Display',_serif] font-bold text-4xl md:text-6xl lg:text-7xl text-[#0a2f1c] leading-[1.1]">
          Don’t Just Own Land.
          <br />
          <span className="relative inline-block">
            Own a Harvest.
            <svg
              className="absolute w-full h-3 -bottom-1 left-0 text-[#0ff035] opacity-60"
              fill="none"
              viewBox="0 0 200 9"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.00025 6.99997C25.7501 3.99991 132.5 -8.19967 198 6.99997"
                stroke="currentColor"
                strokeWidth="3"
              ></path>
            </svg>
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-light">
          Secure strategically located farmland at BugaKing Farmers Estate. Tailored payment plans designed for your agricultural goals.
        </p>
      </header>

      <main className="w-full mx-auto flex flex-col items-center gap-20 bg-[#fcfdfc]">
        {/* --- FEATURES STRIP --- */}
        <section className="w-full bg-[#0a2f1c] text-white py-12 px-4 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>

          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
            {/* Title */}
            <div className="text-center space-y-2">
              <ShieldCheck className="w-10 h-10 mx-auto text-[#d4af37]" />
              <h3 className="font-bold text-lg">AGIS & R of O</h3>
              <p className="text-xs text-white/60">
                Verified documentation
              </p>
            </div>

            {/* Purpose */}
            <div className="text-center space-y-2">
              <Tractor className="w-10 h-10 mx-auto text-[#d4af37]" />
              <h3 className="font-bold text-lg">Strictly Farming</h3>
              <p className="text-xs text-white/60">
                Dedicated agricultural zone
              </p>
            </div>

            {/* Management */}
            <div className="text-center space-y-2">
              <Sprout className="w-10 h-10 mx-auto text-[#d4af37]" />
              <h3 className="font-bold text-lg">500sqm Plots</h3>
              <p className="text-xs text-white/60">Optimized for yield</p>
            </div>

            {/* Security */}
            <div className="text-center space-y-2">
              <Shield className="w-10 h-10 mx-auto text-[#d4af37]" />
              <h3 className="font-bold text-lg">Secure Investment</h3>
              <p className="text-xs text-white/60">
                Flexible payment structures
              </p>
            </div>
          </div>
        </section>

        {/* --- CALCULATOR SECTION --- */}
        <section
          id="calculator-section"
          className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 "
        >
          <div className="text-center mb-12">
            <span className="text-[#d4af37] font-bold uppercase tracking-widest text-xs mb-2 block">
              Payment Plan Calculator
            </span>
            <h2 className="font-['Playfair_Display',_serif] font-bold text-3xl md:text-4xl text-[#0a2f1c] mb-4">
              Structure Your Investment
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Select your desired number of plots and explore our flexible outright, monthly, or weekly payment options.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_20px_40px_-15px_rgba(10,47,28,0.1)] border border-slate-100 p-6 md:p-12 relative z-10 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0a2f1c] via-[#0ff035] to-[#d4af37]"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Controls - FIX: Changed to justify-start to stop jumping */}
              <div className="space-y-8 flex flex-col justify-start">
                
                {/* Plan Selection */}
                <div>
                   <label className="block text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">
                    1. Choose Payment Plan
                  </label>
                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={() => setPlan('outright')} 
                      className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all border ${plan === 'outright' ? 'bg-[#0a2f1c] text-white border-[#0a2f1c] shadow-md' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}
                    >
                      Outright
                    </button>
                    <button 
                      onClick={() => setPlan('monthly')} 
                      className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all border ${plan === 'monthly' ? 'bg-[#0a2f1c] text-white border-[#0a2f1c] shadow-md' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}
                    >
                      6 Months
                    </button>
                    <button 
                      onClick={() => setPlan('weekly')} 
                      className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all border ${plan === 'weekly' ? 'bg-[#0a2f1c] text-white border-[#0a2f1c] shadow-md' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}
                    >
                      Weekly
                    </button>
                  </div>
                </div>

                {/* Plot Slider */}
                <div>
                  <label
                    className="block text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4"
                    htmlFor="investment-slider"
                  >
                    2. Select Number of Plots (500sqm each)
                  </label>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-5xl font-bold text-[#0a2f1c] tracking-tight">
                      {plots}
                    </span>
                    <span className="text-xl text-slate-400 font-['Playfair_Display',_serif]">
                      {plots === 1 ? 'Plot' : 'Plots'}
                    </span>
                  </div>

                  <div className="relative w-full h-6 flex items-center">
                    <input
                      type="range"
                      id="investment-slider"
                      min={minPlots}
                      max={maxPlots}
                      step="1"
                      value={plots}
                      onChange={(e) => setPlots(Number(e.target.value))}
                      className="bugaking-slider z-20 relative w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-2 bg-[#0a2f1c] rounded-l-lg pointer-events-none transition-all duration-150"
                      style={{ width: `${sliderPercentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs font-medium text-slate-400">
                    <span>1 Plot</span>
                    <span>10 Plots</span>
                  </div>
                </div>

                <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-icons-round text-[#d4af37]">
                      landscape
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0a2f1c]">
                      AGIS Recertification
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Your land is backed by verifiable documentation (Right of Occupancy) to guarantee your peace of mind.
                    </p>
                  </div>
                </div>
              </div>

              {/* Results & Lead Form */}
              <div className="bg-[#0a2f1c] rounded-xl p-8 text-white relative overflow-hidden flex flex-col gap-6 shadow-2xl">
                <div className="relative z-10 space-y-6">
                  <div className="grid grid-cols-2 gap-6 border-b border-white/10 pb-6">
                    <div>
                      <p className="text-[10px] text-white/60 font-medium uppercase tracking-wider mb-1">
                        Total Land Size
                      </p>
                      <h3 className="text-xl font-bold text-white">
                        <span>{formatCurrency(totalSqm)}</span> SQM
                      </h3>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/60 font-medium uppercase tracking-wider mb-1">
                        Purpose
                      </p>
                      <h3 className="text-sm mt-1 font-bold text-white">
                        Strictly for Farming
                      </h3>
                    </div>
                  </div>
                  
                  {/* To keep the right side from jumping slightly, you could add min-height to this container, 
                      but the left side is now stable regardless. */}
                  {plan !== "outright" && (
                    <div className="animate-in fade-in duration-300">
                      <p className="text-xs text-[#0ff035]/80 font-medium uppercase tracking-wider mb-2">
                        {plan === 'monthly' ? 'Monthly Payment (x6)' : 'Weekly Payment'}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="material-icons-round text-[#0ff035] text-2xl">
                          payments
                        </span>
                        <h3 className="text-3xl font-bold text-white">
                          ₦ <span>{formatCurrency(installmentAmount)}</span>
                        </h3>
                      </div>
                    </div>
                  )}

                  <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                    <p className="text-xs text-[#d4af37]/90 font-medium uppercase tracking-wider mb-1">
                      Total Property Cost
                    </p>
                    <h2 className="text-4xl font-bold gold-text-gradient font-['Playfair_Display',_serif] tracking-tight text-[#d4af37]">
                      ₦ <span>{formatCurrency(totalCost)}</span>
                    </h2>
                  </div>
                </div>

                <div className="relative z-10 pt-4">
                  <form className="space-y-4" onSubmit={handleWhatsApp}>
                    <div className="grid grid-cols-1 gap-3">
                      <input
                        className="w-full bg-white/5 outline-none border border-white/20 text-white placeholder-white/40 text-sm rounded-lg focus:ring-1 focus:ring-[#0ff035] focus:border-[#0ff035] block p-3 transition-colors"
                        placeholder="Full Name"
                        required
                        type="text"
                      />
                      <input
                        className="w-full bg-white/5 outline-none border border-white/20 text-white placeholder-white/40 text-sm rounded-lg focus:ring-1 focus:ring-[#0ff035] focus:border-[#0ff035] block p-3 transition-colors"
                        placeholder="WhatsApp Number"
                        required
                        type="tel"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full group bg-[#0ff035] hover:bg-[#0bc42a] transition-all duration-300 text-[#0a2f1c] font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(15,240,53,0.3)] hover:shadow-lg hover:-translate-y-0.5"
                    >
                      <span className="uppercase tracking-widest text-xs sm:text-sm text-black whitespace-nowrap">
                        Lock in this plan
                      </span>
                    </button>
                  </form>
                  <p className="text-center text-[10px] text-white/30 mt-3 leading-tight">
                    By submitting, our team will reach out via WhatsApp with your official subscription forms and payment details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- GALLERY CAROUSEL --- */}
        <section className="w-full py-12 sm:py-16 bg-slate-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 flex flex-row items-end sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h2 className="font-['Playfair_Display',_serif] font-bold text-2xl md:text-3xl text-[#0a2f1c] leading-tight">
                Life on the Farm
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                See your investment in action
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => scrollGallery("left")}
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-white text-[#0a2f1c] active:scale-95 transition-transform"
                aria-label="Scroll left"
              >
                <span className="material-icons-round">arrow_back</span>
              </button>
              <button
                onClick={() => scrollGallery("right")}
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-white text-[#0a2f1c] active:scale-95 transition-transform"
                aria-label="Scroll right"
              >
                <span className="material-icons-round">arrow_forward</span>
              </button>
            </div>
          </div>

          <div
            id="gallery-scroll"
            className="flex gap-4 sm:gap-6 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-4 snap-x snap-mandatory scroll-smooth hide-scroll"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* Card 1 */}
            <div className="snap-center sm:snap-start shrink-0 w-[85vw] sm:w-[300px] lg:w-[340px] h-[360px] sm:h-[400px] lg:h-[460px] relative rounded-xl overflow-hidden group cursor-pointer">
              <img
                alt="Drone shot of corn fields"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-icons-round text-white text-3xl">
                    play_circle
                  </span>
                </div>
              </div>
              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-xs font-bold text-[#0ff035] uppercase tracking-wider">
                  Drone View
                </span>
                <h3 className="text-white font-['Playfair_Display',_serif] text-lg sm:text-xl mt-1">
                  Surveying Phase 1
                </h3>
              </div>
            </div>

            {/* Card 2 */}
            <div className="snap-center sm:snap-start shrink-0 w-[85vw] sm:w-[300px] lg:w-[340px] h-[360px] sm:h-[400px] lg:h-[460px] relative rounded-xl overflow-hidden group">
              <img
                alt="Close up of healthy crops"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://images.unsplash.com/photo-1595822904886-f1c7136014ba?q=80&w=800&auto=format&fit=crop"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                  Harvest
                </span>
                <h3 className="text-white font-['Playfair_Display',_serif] text-lg sm:text-xl mt-1">
                  Maize Crop Yield
                </h3>
              </div>
            </div>

            {/* Card 3 */}
            <div className="snap-center sm:snap-start shrink-0 w-[85vw] sm:w-[300px] lg:w-[340px] h-[360px] sm:h-[400px] lg:h-[460px] relative rounded-xl overflow-hidden group cursor-pointer">
              <img
                alt="Farmers working in field"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=800&auto=format&fit=crop"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-icons-round text-white text-3xl">
                    play_circle
                  </span>
                </div>
              </div>
              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-xs font-bold text-[#0ff035] uppercase tracking-wider">
                  Team
                </span>
                <h3 className="text-white font-['Playfair_Display',_serif] text-lg sm:text-xl mt-1">
                  Meet Our Agronomists
                </h3>
              </div>
            </div>

            {/* Card 4 */}
            <div className="snap-center sm:snap-start shrink-0 w-[85vw] sm:w-[300px] lg:w-[340px] h-[360px] sm:h-[400px] lg:h-[460px] relative rounded-xl overflow-hidden group">
              <img
                alt="Tractor plowing field"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=800&auto=format&fit=crop"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                  Machinery
                </span>
                <h3 className="text-white font-['Playfair_Display',_serif] text-lg sm:text-xl mt-1">
                  Mechanized Farming
                </h3>
              </div>
            </div>

            {/* Spacer element */}
            <div className="shrink-0 w-[1px] sm:hidden"></div>
          </div>
        </section>

        {/* --- FAQ --- */}
        <section className="w-full max-w-3xl px-4 mx-auto py-[3rem]">
          <div className="text-center mb-10">
            <h2 className="font-['Playfair_Display',_serif] font-bold text-2xl md:text-3xl text-[#0a2f1c]">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            <details className="group bg-white rounded-lg border border-slate-200 overflow-hidden">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-5 text-[#0a2f1c]">
                <span>How is my land secured?</span>
                <span className="transition group-open:rotate-180">
                  <svg
                    className="fill-none h-5 w-5 stroke-current"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div className="text-slate-600 p-5 pt-0 text-sm leading-relaxed">
                Your investment is highly secure. The estate comes with AGIS Recertification and an R of O (Right of Occupancy), meaning the land is officially registered and recognized by the government.
              </div>
            </details>
            <details className="group bg-white rounded-lg border border-slate-200 overflow-hidden">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-5 text-[#0a2f1c]">
                <span>Can I build a house on this land?</span>
                <span className="transition group-open:rotate-180">
                  <svg
                    className="fill-none h-5 w-5 stroke-current"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div className="text-slate-600 p-5 pt-0 text-sm leading-relaxed">
                No, this estate is designated **strictly for farming**. This zoning ensures a dedicated, productive agricultural environment free from residential disruptions.
              </div>
            </details>
            <details className="group bg-white rounded-lg border border-slate-200 overflow-hidden">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-5 text-[#0a2f1c]">
                <span>Can I visit the farm?</span>
                <span className="transition group-open:rotate-180">
                  <svg
                    className="fill-none h-5 w-5 stroke-current"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div className="text-slate-600 p-5 pt-0 text-sm leading-relaxed">
                Absolutely! We organize regular site visits for investors to Kuje, Abuja. You can also schedule a private inspection tour by contacting our support team via WhatsApp.
              </div>
            </details>
          </div>
        </section>

        {/* --- FOOTER CTA --- */}
        <section className="w-full bg-[#0a2f1c] text-white py-16 px-4 rounded-t-[3rem] shadow-2xl relative overflow-hidden mt-[3rem]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#0ff035]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
          <div className="max-w-3xl mx-auto text-center relative z-10 space-y-8">
            <h2 className="font-['Playfair_Display',_serif] text-3xl md:text-4xl font-bold leading-tight">
              Ready to Start Your Agricultural Journey?
            </h2>
            <p className="text-white/80 max-w-xl mx-auto">
              Secure your 500sqm plots today and lock in our flexible payment plans.
            </p>
            <button
              onClick={() => handleWhatsApp()}
              className="bg-[#0ff035] hover:bg-[#0bc42a] text-[#0a2f1c] font-bold py-4 px-10 rounded-full shadow-[0_0_20px_rgba(15,240,53,0.3)] transition-all duration-300 hover:scale-105 inline-flex items-center gap-2 text-lg"
            >
              <span>Chat with us on WhatsApp</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}