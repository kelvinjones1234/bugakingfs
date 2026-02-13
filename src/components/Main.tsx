"use client";
import React from "react";
import {
  ArrowRight,
  Building,
  LayoutDashboard,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Globe,
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

// --- Helpers & Variants ---

// Explicitly typing this as Variants fixes the "ease" type mismatch
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Interface to fix implicit 'any' on children
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
}

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

export default function Main() {
  return (
    <main className="font-sans text-slate-900 bg-white overflow-x-hidden selection:bg-[#d0a539] selection:text-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#171512]/70 via-[#171512]/50 to-[#171512]/90 z-10"></div>
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "linear" }}
            alt="High-end corporate vision"
            className="w-full h-full object-cover"
            src="/legacy1.png"
            onError={(e) =>
              (e.currentTarget.src =
                "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop")
            }
          />
        </div>

        <div className="relative z-20 text-center px-4 md:px-6 max-w-5xl w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block px-4 py-1.5 md:px-6 md:py-2 rounded-full border border-[#d0a539]/50 bg-[#d0a539]/10 backdrop-blur-sm text-[#d0a539] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] mb-6 md:mb-8"
            >
              Established Excellence
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="text-white text-4xl sm:text-6xl md:text-8xl font-serif italic font-bold leading-[1.1] mb-6 md:mb-8"
            >
              A Legacy of Growth <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d0a539] to-[#fde08d]">
                Across Every Horizon
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-white/80 text-base md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-8 md:mb-12 px-4"
            >
              A diversified conglomerate leading the evolution of Agriculture,
              Real Estate, and Technology through institutional-grade assets.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center"
            >
              <Link
                href="/offers"
                className="bg-[#d0a539] text-[#171512] px-8 py-4 rounded-lg text-xs md:text-sm font-black uppercase tracking-widest hover:bg-white transition-colors duration-300 shadow-xl shadow-[#d0a539]/20"
              >
                Explore Offer
              </Link>
              <Link
                href="/authentication/signin"
                className="bg-white/5 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-lg text-xs md:text-sm font-black uppercase tracking-widest hover:bg-white/10 transition-all duration-300 group"
              >
                Sign in
                <span className="inline-block group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-20 md:py-32 overflow-hidden" id="about">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="lg:w-1/2 space-y-8"
            >
              <motion.div
                variants={fadeInUp}
                className="w-20 h-1 bg-[#d0a539] mb-8"
              ></motion.div>
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-5xl font-black text-[#171512] leading-tight"
              >
                Flexible, Asset-Backed <br />
                <span className="italic font-serif font-medium text-[#d0a539]">
                  Wealth Creation.
                </span>
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-[#171512]/70 text-base md:text-lg leading-relaxed"
              >
                Bugaking Group operates at the intersection of traditional
                stability and modern innovation. Our mission is to democratize
                high-value assets across three core pillars, ensuring every
                investor can participate in multi-generational wealth building.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4"
              >
                <div className="flex gap-4">
                  <div className="mt-1">
                    <ShieldCheck className="text-[#d0a539] w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-[#171512] font-bold uppercase text-xs tracking-widest mb-2">
                      Resilience
                    </h4>
                    <p className="text-sm text-[#171512]/60">
                      Hedged against market volatility through physical asset
                      ownership.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1">
                    <CheckCircle2 className="text-[#d0a539] w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-[#171512] font-bold uppercase text-xs tracking-widest mb-2">
                      Transparency
                    </h4>
                    <p className="text-sm text-[#171512]/60">
                      Blockchain-verified legal titles and institutional-grade
                      reporting.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="lg:w-1/2 w-full"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-[#d0a539] rounded-2xl rotate-3 group-hover:rotate-1 transition-transform duration-500 opacity-20"></div>
                <img
                  alt="Group Corporate Team"
                  className="relative rounded-2xl shadow-2xl w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2069&auto=format&fit=crop"
                />

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="absolute -bottom-4 left-4 md:-bottom-10 md:-left-10 bg-[#171512] p-4 md:p-10 rounded-lg shadow-2xl border-b-4 border-[#d0a539] z-10"
                >
                  <p className="text-[#d0a539] font-black text-2xl md:text-4xl">
                    15+
                  </p>
                  <p className="text-white/70 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1">
                    Years of Trust
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section
        className="py-24 bg-[#f8f7f6] relative overflow-hidden"
        id="pillars"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d0a539]/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#171512]/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase italic text-[#171512]">
              <span className="text-[#d0a539]">The Three</span> Pillars
            </h2>
          </motion.div>

          <div className="space-y-32">
            {/* Sector 1: Agriculture */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
            >
              <motion.div
                variants={fadeInUp}
                className="lg:w-3/5 w-full rounded-3xl overflow-hidden shadow-2xl group"
              >
                <div className="overflow-hidden rounded-3xl">
                  <img
                    alt="Agriculture"
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
                    src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2071&auto=format&fit=crop"
                  />
                </div>
              </motion.div>
              <motion.div variants={fadeInUp} className="lg:w-2/5 w-full">
                <span className="text-[#d0a539] text-xs font-black uppercase tracking-[0.4em] mb-4 block">
                  Sector I: Agriculture
                </span>
                <h3 className="text-3xl md:text-4xl font-black mb-6 text-[#171512]">
                  Sustainable Harvests
                </h3>
                <div className="p-8 bg-white border-l-4 border-[#d0a539] shadow-lg rounded-r-2xl hover:shadow-xl transition-shadow">
                  <h4 className="font-bold uppercase text-sm mb-4 tracking-widest text-[#171512] flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#d0a539]" /> Flexible Land
                    Ownership
                  </h4>
                  <p className="text-[#171512]/60 text-sm leading-relaxed mb-6">
                    Invest in arable land with seasonal yields. Our model allows
                    for partial ownership with professional management, turning
                    fertile soil into liquid returns.
                  </p>
                  <Link
                    href={`/offers`}
                    className="text-[#d0a539] font-black text-xs uppercase tracking-widest flex items-center gap-2 group"
                  >
                    View Farmland Offers{" "}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </motion.div>

            {/* Sector 2: Real Estate */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20"
            >
              <motion.div
                variants={fadeInUp}
                className="lg:w-3/5 w-full rounded-3xl overflow-hidden shadow-2xl group"
              >
                <div className="overflow-hidden rounded-3xl">
                  <img
                    alt="Real Estate"
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
                    src="/landre.jpg"
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop")
                    }
                  />
                </div>
              </motion.div>
              <motion.div variants={fadeInUp} className="lg:w-2/5 w-full">
                <span className="text-[#d0a539] text-xs font-black uppercase tracking-[0.4em] mb-4 block">
                  Sector II: Real Estate
                </span>
                <h3 className="text-3xl md:text-4xl font-black mb-6 text-[#171512]">
                  Luxury Development
                </h3>
                <div className="p-8 bg-[#171512] text-white rounded-2xl shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Building className="w-24 h-24" />
                  </div>
                  <h4 className="font-bold uppercase text-sm mb-4 tracking-widest text-[#d0a539]">
                    Installment to Ownership
                  </h4>
                  <p className="text-white/60 text-sm leading-relaxed mb-6 relative z-10">
                    Secure premium urban property through our milestone-based
                    payment system. Track your equity growth in real-time as you
                    move toward full title deed security.
                  </p>
                  <div className="w-full h-1 bg-white/10 rounded-full mb-6">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "65%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-[#d0a539]"
                    ></motion.div>
                  </div>
                  <button className="text-white font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:text-[#d0a539] transition-colors">
                    Property Dashboard <LayoutDashboard className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </motion.div>

            {/* Sector 3: Technology */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
            >
              <motion.div
                variants={fadeInUp}
                className="lg:w-3/5 w-full rounded-3xl overflow-hidden shadow-2xl group"
              >
                <div className="overflow-hidden rounded-3xl">
                  <img
                    alt="Digital Top-Up Platform"
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
                    src="/phone.png"
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop")
                    }
                  />
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="lg:w-2/5 w-full">
                <span className="text-[#d0a539] text-xs font-black uppercase tracking-[0.4em] mb-4 block">
                  Sector III: Technology
                </span>

                <h3 className="text-3xl md:text-4xl font-black mb-6 text-[#171512]">
                  Digital Value Infrastructure
                </h3>

                <div className="p-8 bg-white border border-[#171512]/5 shadow-xl rounded-2xl">
                  <h4 className="font-bold uppercase text-sm mb-4 tracking-widest text-[#171512]">
                    Virtual Top-Up & Payment Services
                  </h4>

                  <p className="text-[#171512]/60 text-sm leading-relaxed mb-6">
                    Seamlessly powering airtime, data, utility bills, and
                    digital wallet top-ups through a fast, secure, and scalable
                    platform built for everyday users and businesses.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {[
                      "Airtime & Data",
                      "Bill Payments",
                      "Digital Wallets",
                      "API Integrations",
                    ].map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-[#171512] text-white text-[10px] font-bold uppercase rounded hover:bg-[#d0a539] transition-colors cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section
        className="bg-[#171512] py-24 relative overflow-hidden"
        id="impact"
      >
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#d0a539]/5 -skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-20 text-center lg:text-left">
            <p className="text-[#d0a539] text-xs font-black uppercase tracking-[0.4em] mb-4">
              Performance Metrics
            </p>
            <h2 className="text-white text-3xl md:text-5xl font-black">
              Group-Wide Performance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { val: "5", label: "Verified Investors" },
              { val: "₦1.4B", label: "Assets Under Management" },
              { val: "75+", label: "Active Client" },
              { val: "24%", label: "Avg. Annual Growth" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="space-y-4 group"
              >
                <h3 className="text-[#d0a539] text-5xl md:text-6xl lg:text-7xl font-serif italic font-bold group-hover:scale-105 transition-transform origin-left">
                  {item.val}
                </h3>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest">
                  {item.label}
                </p>
                <div className="h-px w-full bg-white/10 group-hover:bg-[#d0a539]/50 transition-colors"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-24 md:py-32 bg-white flex items-center justify-center text-center px-6 relative overflow-hidden"
        id="cta"
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl space-y-8 relative z-10"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#d0a539]/10 mb-4">
            <TrendingUp className="text-[#d0a539] w-8 h-8" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#171512] leading-tight">
            Ready to Secure Your <br />{" "}
            <span className="italic font-serif text-[#d0a539]">
              Financial Legacy?
            </span>
          </h2>
          <p className="text-[#171512]/60 text-lg md:text-xl font-light max-w-2xl mx-auto">
            Join the Bugaking Ecosystem today and experience the power of
            diversified, high-yield asset ownership across our core sectors.
          </p>
          <div className="pt-8">
            <Link href="/authentication/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#d0a539] text-[#171512] px-10 py-5 md:px-12 md:py-6 rounded-full text-sm md:text-base font-black uppercase tracking-widest shadow-2xl shadow-[#d0a539]/40 hover:shadow-[#d0a539]/60 transition-all"
              >
                Join the Ecosystem
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Legacy Section */}
      <section className="relative pb-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ clipPath: "inset(10% 10% 10% 10%)", opacity: 0 }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          viewport={{ once: true, margin: "-30px" }}
          className="bg-[#171512] rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-20 text-white relative overflow-hidden"
        >
          {/* Decorative background shape */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#d0a539]/5 skew-x-12 transform translate-x-1/4" />

          <div className="relative z-10 flex flex-col lg:flex-row gap-8 sm:gap-12 items-center">
            <div className="flex-1 space-y-5 sm:space-y-8">
              <FadeIn>
                <span className="text-[#d0a539] text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.5em]">
                  The Legacy
                </span>
              </FadeIn>
              <FadeIn delay={0.2}>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight italic">
                  Built on values, <br />
                  Driven by <span className="text-[#d0a539]">Vision</span>.
                </h2>
              </FadeIn>
              <FadeIn delay={0.4}>
                <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-xl">
                  For over three decades, BugaKing has stood as a beacon of
                  multifaceted excellence. What started as a commitment to the
                  land has evolved into a global powerhouse spanning the most
                  critical sectors of the modern economy.
                </p>
              </FadeIn>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="flex gap-3 sm:gap-4"
              >
                <div className="p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-[#d0a539] font-black text-xl sm:text-2xl">
                    5+
                  </p>
                  <p className="text-[10px] sm:text-xs uppercase font-bold text-white/40 tracking-tight sm:tracking-tighter">
                    Years of History
                  </p>
                </div>
                <div className="p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-[#d0a539] font-black text-xl sm:text-2xl">
                    Global
                  </p>
                  <p className="text-[10px] sm:text-xs uppercase font-bold text-white/40 tracking-tight sm:tracking-tighter">
                    Reach
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex-1 relative w-full max-w-md lg:max-w-none"
            >
              <div className="w-full aspect-square rounded-full border-2 border-[#d0a539]/20 flex items-center justify-center p-6 sm:p-8">
                <div
                  className="w-full h-full rounded-full bg-cover bg-center border-4 border-[#d0a539] shadow-2xl shadow-[#d0a539]/20"
                  style={{
                    backgroundImage: "url('/legacy1.png')",
                  }}
                />
              </div>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute bottom-2 sm:bottom-4 -left-2 sm:-left-4 bg-[#d0a539] text-[#171512] p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl max-w-[160px] sm:max-w-[200px]"
              >
                <p className="text-[10px] sm:text-xs font-black uppercase tracking-wider sm:tracking-widest mb-1">
                  Our Pledge
                </p>
                <p className="text-xs sm:text-sm font-bold leading-tight">
                  Zero compromise on quality and sustainability.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
