"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShieldCheck, MapPin, Key, Plane, CheckCircle } from "lucide-react";

export default function Main() {
  // --- STATE ---
  const [plotSize, setPlotSize] = useState<"150sqm" | "180sqm" | "200sqm">(
    "150sqm",
  );
  const [plan, setPlan] = useState<"outright" | "6_months" | "weekly">(
    "outright",
  );
  const [units, setUnits] = useState<number>(1);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // --- PRICING LOGIC ---
  const PRICING = {
    "150sqm": {
      outright: 3300000,
      monthly: 633000,
      weekly: 158250,
      installmentTotal: 3798000,
    },
    "180sqm": {
      outright: 4300000,
      monthly: 800000,
      weekly: 200000,
      installmentTotal: 4800000,
    },
    "200sqm": {
      outright: 5300000,
      monthly: 966700,
      weekly: 241645,
      installmentTotal: 5800200,
    },
  };

  const currentPrice = PRICING[plotSize];
  let totalCost = 0;
  let installmentAmount = 0;

  if (plan === "outright") {
    totalCost = units * currentPrice.outright;
  } else {
    totalCost = units * currentPrice.installmentTotal;
    if (plan === "6_months") {
      installmentAmount = units * currentPrice.monthly;
    } else if (plan === "weekly") {
      installmentAmount = units * currentPrice.weekly;
    }
  }

  // --- HELPERS & HANDLERS ---
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG").format(value);
  };

  // Handle the database submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          phone,
          plotSize,
          plan,
          units,
          estateName: "BugaKing Estate Lugbe Aco", // Identifies this lead in the Sheet
        }),
      });

      if (response.ok) {
        setIsSuccess(true); // Triggers the UI success state
      } else {
        setErrorMessage(
          "Something went wrong saving your details. Please try again.",
        );
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage(
        "Network error. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
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

  const sliderPercentage = ((units - 1) / 4) * 100;

  return (
    <div className="font-['Manrope',_sans-serif] bg-[#fcfdfc] text-slate-800 min-h-screen flex flex-col selection:bg-[#d4af37] selection:text-[#0a2f1c]">
      {/* --- NAVIGATION --- */}
      <nav className="absolute top-0 w-full flex justify-center py-6 z-20 px-4">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <div>
              <Image
                src="/bugakingLogo.png"
                alt="BugaKing Group Logo"
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
      <header className="text-center max-w-4xl mx-auto space-y-6 mb-[4rem] mt-[10rem] px-4">
        <div className="flex flex-wrap justify-center gap-3">
          <div className="inline-block bg-[#d4af37]/20 text-[#0a2f1c] font-bold px-4 py-1.5 rounded-full text-xs border border-[#d4af37]/50">
            📜 Title: AMAC Right of Occupancy (R of O)
          </div>
          <div className="inline-block bg-[#d4af37]/20 text-[#0a2f1c] font-bold px-4 py-1.5 rounded-full text-xs border border-[#d4af37]/50">
            📜 Title: AGIS Recertification
          </div>
        </div>

        {/* <h1 className="font-['Playfair_Display',_serif] font-bold text-4xl md:text-6xl lg:text-7xl text-[#0a2f1c] leading-[1.1]">
          Own{" "}
          <span className="relative inline-block">
            Verified
            <svg
              className="absolute w-full h-3 -bottom-1 left-0 text-[#d4af37] opacity-80"
              fill="none"
              viewBox="0 0 200 9"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.00025 6.99997C25.7501 3.99991 132.5 -8.19967 198 6.99997"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              ></path>
            </svg>
          </span>
          <br />
          <span className="relative inline-block mt-2">
            Abuja Real Estate.
            <svg
              className="absolute w-full h-3 -bottom-1 left-0 text-[#d4af37] opacity-60"
              fill="none"
              viewBox="0 0 200 9"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.00025 6.99997C25.7501 3.99991 132.5 -8.19967 198 6.99997"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              ></path>
            </svg>
          </span>
        </h1> */}

        <>
          <h1 className="font-['Playfair_Display',_serif] font-bold text-4xl md:text-5xl lg:text-6xl text-[#0a2f1c] leading-[1.2] md:leading-[1.15]">
            Own{" "}
            <span className="relative inline-block">
              Verified Abuja Land
              <svg
                className="absolute w-full h-3 md:h-4 -bottom-1 left-0 text-[#d4af37] opacity-80"
                fill="none"
                viewBox="0 0 200 9"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.00025 6.99997C25.7501 3.99991 132.5 -8.19967 198 6.99997"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                ></path>
              </svg>
            </span>{" "}
            <span className="block mt-3 md:mt-4 text-2xl md:text-4xl lg:text-5xl text-[#0a2f1c]/80 font-medium">
              Without Paying Everything at Once.
            </span>
          </h1>

          <p className="mt-6 text-base md:text-lg lg:text-xl text-[#0a2f1c]/70 font-medium max-w-2xl leading-relaxed">
            150, 180 & 200sqm plots with weekly, monthly & outright payment
            options.
          </p>
        </>

        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-light">
          A dedicated advisor will guide you from your first payment straight to
          your final allocation papers.
        </p>
      </header>

      <main className="w-full mx-auto flex flex-col items-center gap-16 bg-[#fcfdfc]">
        {/* --- TRUST & LOCATION STRIP --- */}
        <section className="w-full bg-[#0a2f1c] text-white py-12 px-4 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>

          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
            <div className="text-center space-y-2">
              <ShieldCheck className="w-10 h-10 mx-auto text-[#d4af37]" />
              <h3 className="font-bold text-lg">100% Secure</h3>
              <p className="text-xs text-white/60">
                Free from government acquisition
              </p>
            </div>
            <div className="text-center space-y-2">
              <Plane className="w-10 h-10 mx-auto text-[#d4af37]" />
              <h3 className="font-bold text-lg">Proximity</h3>
              <p className="text-xs text-white/60">
                Minutes to Nnamdi Azikiwe Airport
              </p>
            </div>
            <div className="text-center space-y-2">
              <MapPin className="w-10 h-10 mx-auto text-[#d4af37]" />
              <h3 className="font-bold text-lg">Prime Lugbe</h3>
              <p className="text-xs text-white/60">
                Highly sought-after rapid development hub
              </p>
            </div>
            <div className="text-center space-y-2">
              <Key className="w-10 h-10 mx-auto text-[#d4af37]" />
              <h3 className="font-bold text-lg">Instant Allocation</h3>
              <p className="text-xs text-white/60">
                Upon completion of full payment
              </p>
            </div>
          </div>
        </section>

        {/* --- CALCULATOR SECTION --- */}
        <section
          id="calculator-section"
          className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-4"
        >
          <div className="text-center mb-12">
            <span className="text-[#d4af37] font-bold uppercase tracking-widest text-xs mb-2 block">
              Transparent Pricing
            </span>
            <h2 className="font-['Playfair_Display',_serif] font-bold text-3xl md:text-4xl text-[#0a2f1c] mb-4">
              Structure Your Payment
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Select your preferred plot size and explore our convenient
              outright, monthly, or weekly payment options over 6 months.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_20px_40px_-15px_rgba(10,47,28,0.1)] border border-slate-100 p-6 md:p-12 relative z-10 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0a2f1c] via-[#d4af37] to-[#0a2f1c]"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Controls */}
              <div className="space-y-8 flex flex-col justify-start">
                {/* Plot Size */}
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">
                    1. Select Plot Size
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {(["150sqm", "180sqm", "200sqm"] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => setPlotSize(size)}
                        className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all border ${plotSize === size ? "bg-[#0a2f1c] text-white border-[#0a2f1c] shadow-md" : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Plan */}
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">
                    2. Choose Payment Plan
                  </label>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setPlan("outright")}
                      className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all border ${plan === "outright" ? "bg-[#0a2f1c] text-white border-[#0a2f1c] shadow-md" : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"}`}
                    >
                      Outright
                    </button>
                    <button
                      onClick={() => setPlan("6_months")}
                      className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all border ${plan === "6_months" ? "bg-[#0a2f1c] text-white border-[#0a2f1c] shadow-md" : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"}`}
                    >
                      6 Months
                    </button>
                    <button
                      onClick={() => setPlan("weekly")}
                      className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all border ${plan === "weekly" ? "bg-[#0a2f1c] text-white border-[#0a2f1c] shadow-md" : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"}`}
                    >
                      Weekly Plan
                    </button>
                  </div>
                </div>

                {/* Units */}
                <div>
                  <label
                    className="block text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4"
                    htmlFor="investment-slider"
                  >
                    3. Select Number of Plots
                  </label>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-5xl font-bold text-[#0a2f1c] tracking-tight">
                      {units}
                    </span>
                    <span className="text-xl text-slate-400 font-['Playfair_Display',_serif]">
                      {units === 1 ? "Plot" : "Plots"}
                    </span>
                  </div>

                  <div className="relative w-full h-6 flex items-center">
                    <input
                      type="range"
                      id="investment-slider"
                      min={1}
                      max={5}
                      step="1"
                      value={units}
                      onChange={(e) => setUnits(Number(e.target.value))}
                      className="bugaking-slider z-20 relative w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer"
                    />
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-2 bg-[#0a2f1c] rounded-l-lg pointer-events-none transition-all duration-150"
                      style={{ width: `${sliderPercentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs font-medium text-slate-400">
                    <span>1 Plot</span>
                    <span>5 Plots</span>
                  </div>
                </div>
              </div>

              {/* Results & Lead Form */}
              <div className="bg-[#0a2f1c] rounded-xl p-8 text-white relative overflow-hidden flex flex-col gap-6 shadow-2xl">
                <div className="relative z-10 space-y-6">
                  <div className="grid grid-cols-2 gap-6 border-b border-white/10 pb-6">
                    <div>
                      <p className="text-[10px] text-white/60 font-medium uppercase tracking-wider mb-1">
                        Location
                      </p>
                      <h3 className="text-lg font-bold text-white">
                        Lugbe Aco
                      </h3>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/60 font-medium uppercase tracking-wider mb-1">
                        Plot Size
                      </p>
                      <h3 className="text-lg font-bold text-white">
                        {plotSize}
                      </h3>
                    </div>
                  </div>

                  {plan !== "outright" && (
                    <div className="animate-in fade-in duration-300">
                      <p className="text-xs text-[#d4af37]/80 font-medium uppercase tracking-wider mb-2">
                        {plan === "6_months"
                          ? "Monthly Installment (6 Months)"
                          : "Weekly Installment"}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="material-icons-round text-[#d4af37] text-2xl">
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
                    <h2 className="text-3xl font-bold gold-text-gradient font-['Playfair_Display',_serif] tracking-tight text-[#d4af37]">
                      ₦ <span>{formatCurrency(totalCost)}</span>
                    </h2>
                  </div>
                </div>

                <div className="relative z-10 pt-4 min-h-[160px]">
                  {isSuccess ? (
                    // --- SUCCESS STATE UI ---
                    <div className="bg-[#d4af37]/10 border border-[#d4af37]/30 p-8 rounded-xl text-center space-y-3 animate-in fade-in zoom-in duration-300">
                      <CheckCircle className="w-14 h-14 text-[#d4af37] mx-auto" />
                      <h3 className="text-2xl font-bold text-white font-['Playfair_Display',_serif]">
                        Request Received
                      </h3>
                      <p className="text-sm text-white/80 leading-relaxed">
                        Thank you, {fullName || "investor"}. Your plan details
                        have been securely recorded. One of our lead consultants
                        will reach out to you shortly with the official brochure
                        and next steps.
                      </p>
                    </div>
                  ) : (
                    // --- FORM STATE UI ---
                    <form
                      className="space-y-4 animate-in fade-in duration-300"
                      onSubmit={handleSubmit}
                    >
                      {errorMessage && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-200 text-xs p-3 rounded-lg text-center">
                          {errorMessage}
                        </div>
                      )}
                      <div className="grid grid-cols-1 gap-3">
                        <input
                          className="w-full bg-white/5 outline-none border border-white/20 text-white placeholder-white/40 text-sm rounded-lg focus:ring-1 focus:ring-[#d4af37] focus:border-[#d4af37] block p-3 transition-colors"
                          placeholder="Full Name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          type="text"
                        />
                        <input
                          className="w-full bg-white/5 outline-none border border-white/20 text-white placeholder-white/40 text-sm rounded-lg focus:ring-1 focus:ring-[#d4af37] focus:border-[#d4af37] block p-3 transition-colors"
                          placeholder="Phone Number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          type="tel"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full group bg-[#d4af37] hover:bg-[#c5a028] disabled:bg-[#d4af37]/50 disabled:cursor-not-allowed transition-all duration-300 text-[#0a2f1c] font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-lg hover:-translate-y-0.5"
                      >
                        <span className="uppercase tracking-widest text-xs sm:text-sm text-black whitespace-nowrap">
                          {isSubmitting
                            ? "Saving Details..."
                            : "Secure This Plan"}
                        </span>
                      </button>
                    </form>
                  )}
                  {!isSuccess && (
                    <p className="text-center text-[10px] text-white/40 mt-3 leading-tight">
                      Submit to securely log your interest in this property.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- GALLERY CAROUSEL --- */}
        <section className="w-full sm:py-12 bg-slate-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 flex flex-row items-end sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h2 className="font-['Playfair_Display',_serif] font-bold text-2xl md:text-3xl text-[#0a2f1c] leading-tight">
                The Vision
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Explore the proposed BugaKing Estate infrastructure
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
            {/* Card 1: Gatehouse / Render */}
            <div className="snap-center sm:snap-start shrink-0 w-[85vw] sm:w-[300px] lg:w-[340px] h-[360px] sm:h-[400px] lg:h-[460px] relative rounded-xl overflow-hidden group">
              <img
                alt="Estate Gatehouse Render"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                  Infrastructure
                </span>
                <h3 className="text-white font-['Playfair_Display',_serif] text-lg sm:text-xl mt-1">
                  Secure Gated Entrance
                </h3>
              </div>
            </div>

            {/* Card 2: Aerial/Drone */}
            <div className="snap-center sm:snap-start shrink-0 w-[85vw] sm:w-[300px] lg:w-[340px] h-[360px] sm:h-[400px] lg:h-[460px] relative rounded-xl overflow-hidden group">
              <img
                alt="Aerial view of land"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                  Topography
                </span>
                <h3 className="text-white font-['Playfair_Display',_serif] text-lg sm:text-xl mt-1">
                  100% Dry & Level Land
                </h3>
              </div>
            </div>

            {/* Card 3: Roads/Development */}
            <div className="snap-center sm:snap-start shrink-0 w-[85vw] sm:w-[300px] lg:w-[340px] h-[360px] sm:h-[400px] lg:h-[460px] relative rounded-xl overflow-hidden group">
              <img
                alt="Road network development"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://images.unsplash.com/photo-1580041065738-e72023775cdc?q=80&w=800&auto=format&fit=crop"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                  Development
                </span>
                <h3 className="text-white font-['Playfair_Display',_serif] text-lg sm:text-xl mt-1">
                  Paved Road Networks
                </h3>
              </div>
            </div>

            <div className="shrink-0 w-[1px] sm:hidden"></div>
          </div>
        </section>

        {/* --- FAQ --- */}
        <section className="w-full max-w-3xl px-4 mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-['Playfair_Display',_serif] font-bold text-2xl md:text-3xl text-[#0a2f1c]">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            <details className="group bg-white rounded-lg border border-slate-200 overflow-hidden">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-5 text-[#0a2f1c]">
                <span>What is the title on the land?</span>
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
                The land is covered by a Right of Occupancy (R of O). It is 100%
                free from government acquisition and adverse claims.
              </div>
            </details>
            <details className="group bg-white rounded-lg border border-slate-200 overflow-hidden">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-5 text-[#0a2f1c]">
                <span>Are there other statutory fees?</span>
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
                Yes. Like all authentic estate purchases, statutory fees apply.
                This includes the infrastructure development fee, Survey Fee,
                and Estate Development Levy. These will be clearly stated in
                your offer letter.
              </div>
            </details>
            <details className="group bg-white rounded-lg border border-slate-200 overflow-hidden">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-5 text-[#0a2f1c]">
                <span>When can I start building?</span>
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
                You get physical allocation of your plot once full payment for
                the land and statutory fees have been made. You can commence
                building immediately after allocation.
              </div>
            </details>

            <details className="group bg-white rounded-lg border border-slate-200 overflow-hidden">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-5 text-[#0a2f1c]">
                <span>When AGIS Recertification?</span>
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
                AGIS (Abuja Geographic Information System) is the official
                government system that records and verifies land ownership in
                Abuja. Land registered with AGIS means the property has been
                properly documented, mapped, and recognized by the FCT
                authorities, reducing risks of disputes or invalid titles.
              </div>
            </details>
          </div>
        </section>

        {/* --- FOOTER CTA --- */}
        <section className="w-full bg-[#0a2f1c] text-white py-16 px-4 rounded-t-[3rem] shadow-2xl relative overflow-hidden mt-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
          <div className="max-w-3xl mx-auto text-center relative z-10 space-y-8">
            <h2 className="font-['Playfair_Display',_serif] text-3xl md:text-4xl font-bold leading-tight">
              Ready to Claim Your Land?
            </h2>
            <p className="text-white/80 max-w-xl mx-auto">
              Secure your plot today and step into the investment you deserve
              with our tailored payment structures.
            </p>
            <button
              onClick={() => {
                document
                  .getElementById("calculator-section")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-[#d4af37] hover:bg-[#c5a028] text-[#0a2f1c] font-bold py-4 px-10 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300 hover:scale-105 inline-flex items-center gap-2 text-lg"
            >
              <span>Lock in Your Plot</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
