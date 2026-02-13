"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Calendar,
  ShieldCheck,
  TrendingUp,
  Building2,
  Shield,
  Scale,
  Landmark,
  Lock,
  MoreHorizontal,
  Building,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  Variants,
} from "framer-motion";
import Link from "next/link";

// --- Animation Variants ---

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
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

const scaleIn: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

// --- Sub-Components ---

const CountUp = ({ to }: { to: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    // Prevent division by zero if 'to' is 0
    const stepTime = to === 0 ? 0 : Math.abs(Math.floor(duration / to));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === to) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [to]);

  return <>{count}</>;
};

const NumberCounter = ({ value }: { value: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <span ref={ref} className="tabular-nums">
      {isInView ? <CountUp to={value} /> : 0}
    </span>
  );
};

const Main: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main
      ref={containerRef}
      className="w-full bg-[#f8f7f6] text-[#171512] font-sans antialiased selection:bg-[#d0a539] selection:text-white overflow-hidden"
    >
      {/* Hero Section */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center scale-110"
            style={{ backgroundImage: `url("/realestate.jpeg")` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#171512]/70 via-[#171512]/60 to-[#171512]" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl px-6 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-block px-5 py-2 rounded-full border border-[#d0a539]/80 bg-[#171512]/40 backdrop-blur-md text-[#d0a539] text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] shadow-[0_0_15px_rgba(208,165,57,0.3)]">
                Real Estate Reimagined
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-white text-4xl sm:text-6xl lg:text-8xl font-black leading-[1.1] tracking-tight drop-shadow-2xl"
            >
              Own Property <br className="hidden md:block" /> with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d0a539] via-[#f4d072] to-[#d0a539] bg-[length:200%_auto] animate-shine">
                Flexible Payments
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-white/90 text-base sm:text-xl lg:text-2xl font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md"
            >
              Break the barriers to real estate. Secure premium assets today and
              pay at your own pace through our proprietary ownership model.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-8 w-full sm:w-auto"
            >
              {/* Start Investing Link */}
              <Link href="/authentication/signin" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#d0a539] text-[#171512] px-8 py-4 sm:px-10 sm:py-5 rounded-xl text-sm sm:text-base font-black uppercase tracking-widest shadow-xl shadow-[#d0a539]/20 w-full sm:w-auto min-w-[200px]"
                >
                  Start Investing
                </motion.button>
              </Link>

              {/* Our Offers Link */}
              <Link href="/offers" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255,255,255,0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 sm:px-10 sm:py-5 rounded-xl text-sm sm:text-base font-black uppercase tracking-widest w-full sm:w-auto min-w-[200px] flex items-center justify-center gap-2"
                >
                  Our offers
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Model Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16 space-y-4"
          >
            <p className="text-[#d0a539] text-xs font-black uppercase tracking-[0.4em]">
              The Bugaking Model
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#171512]">
              Ownership Designed for You
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          >
            {[
              {
                icon: Calendar,
                title: "Custom Schedules",
                desc: "Tailor your payment frequency to match your cash flow.",
                progress: 33,
              },
              {
                icon: ShieldCheck,
                title: "Zero Hidden Fees",
                desc: "Transparent pricing with no surprise maintenance costs.",
                progress: 66,
              },
              {
                icon: TrendingUp,
                title: "Ownership Progress",
                desc: "Watch your legal stake grow in real-time as you pay.",
                progress: 85,
              },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="p-8 rounded-3xl bg-white border-t-4 border-[#d0a539] shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                  <card.icon className="w-24 h-24 text-[#d0a539]" />
                </div>

                <div className="w-14 h-14 bg-[#d0a539]/10 rounded-2xl flex items-center justify-center mb-6">
                  <card.icon className="w-7 h-7 text-[#d0a539]" />
                </div>
                <h3 className="text-xl font-black mb-4 uppercase">
                  {card.title}
                </h3>
                <p className="text-[#171512]/60 leading-relaxed mb-6 text-sm">
                  {card.desc}
                </p>

                {/* Animated Progress Bar */}
                <div className="h-1.5 bg-[#171512]/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${card.progress}%` }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                    className="h-full bg-[#d0a539] rounded-full"
                  />
                </div>
                {idx === 2 && (
                  <div className="text-right mt-2 text-xs font-bold text-[#d0a539]">
                    <NumberCounter value={85} />%
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Alpha Benefits */}
      <section className="px-4 sm:px-6 lg:px-10 mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#e8e6e1] rounded-[2.5rem] p-8 sm:p-16 lg:p-20"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
            <div className="max-w-xl">
              <p className="text-[#d0a539] text-xs font-black uppercase tracking-[0.4em] mb-4">
                Investment Alpha
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#171512] leading-tight">
                Why Real Estate Remains the Gold Standard
              </h2>
            </div>
            <p className="text-[#171512]/60 max-w-sm text-sm sm:text-base border-l-2 border-[#d0a539] pl-6">
              Direct exposure to hard assets provides a foundation for
              multi-generational wealth creation in an unstable economy.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Building2,
                title: "Tangible Assets",
                desc: "Unlike digital derivatives, you own physical land and structures with intrinsic, permanent value.",
              },
              {
                icon: TrendingUp,
                title: "Appreciation",
                desc: "Historical data consistently shows steady value increases in high-demand urban corridors.",
              },
              {
                icon: Shield,
                title: "Inflation Protection",
                desc: "Rents and property values typically rise with inflation, preserving your purchasing power.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="group p-8 bg-white rounded-3xl border border-transparent hover:border-[#d0a539]/20 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="inline-block"
                >
                  <item.icon className="w-10 h-10 text-[#d0a539] mb-6" />
                </motion.div>
                <h4 className="text-lg font-black uppercase mb-3 text-[#171512]">
                  {item.title}
                </h4>
                <p className="text-sm text-[#171512]/60 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Journey Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 sm:mb-24"
          >
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight italic">
              Your Journey to{" "}
              <span className="text-[#d0a539] relative inline-block">
                Ownership
                <motion.svg
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute w-full h-3 -bottom-1 left-0 text-[#d0a539]/30"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 50 10 100 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </motion.svg>
              </span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Animated Connecting Line */}
            <div className="absolute top-0 bottom-0 left-[23px] md:hidden z-0">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                transition={{ duration: 1.5 }}
                className="w-0.5 bg-[#d0a539]/30 h-full"
              />
            </div>
            <div className="absolute top-[23px] left-0 right-0 hidden md:block z-0">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.5 }}
                className="h-0.5 bg-[#d0a539]/30"
              />
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col md:flex-row pl-10 md:pl-0 justify-between gap-12 md:gap-4"
            >
              {[
                {
                  step: 1,
                  title: "Choose",
                  desc: "Browse portfolio",
                  active: false,
                },
                {
                  step: 2,
                  title: "Select Plan",
                  desc: "Customize terms",
                  active: false,
                },
                {
                  step: 3,
                  title: "Pay",
                  desc: "Initial deposit",
                  active: false,
                },
                {
                  step: 4,
                  title: "Secure",
                  desc: "Documentation",
                  active: false,
                },
                {
                  step: 5,
                  title: "Earn",
                  desc: "Yield benefits",
                  active: true,
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={scaleIn}
                  className="relative z-10 flex flex-row md:flex-col items-start md:items-center gap-6 md:gap-0 group"
                >
                  <div
                    className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center font-bold text-lg md:mb-6 transition-all duration-300 shadow-lg ${item.active ? "bg-[#d0a539] text-[#171512] ring-4 ring-[#d0a539]/20" : "bg-[#171512] text-[#d0a539] border-2 border-[#d0a539]"}`}
                  >
                    {item.active ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      item.step
                    )}
                  </div>
                  <div className="md:text-center pt-1 md:pt-0">
                    <h5 className="font-black text-base uppercase mb-1 md:mb-2">
                      {item.title}
                    </h5>
                    <p className="text-sm text-[#171512]/50 max-w-[150px] md:mx-auto leading-tight">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Protection & Dashboard Section */}
      <section className="px-4 pb-2 sm:px-6 lg:px-10 mb-16 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch max-w-7xl mx-auto">
          {/* Dark Card - Slide from Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-[2.5rem] p-8 sm:p-12 lg:p-16 flex flex-col justify-center text-white relative overflow-hidden shadow-2xl bg-[#171512]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#d0a539]/20 to-transparent z-0 opacity-50"></div>

            <div className="relative z-10">
              <span className="text-[#d0a539] text-xs font-black uppercase tracking-[0.5em] mb-6 block">
                Security First
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-8 leading-tight">
                Institutional-Grade <br />
                Protection
              </h2>

              <div className="space-y-8">
                {[
                  {
                    icon: Scale,
                    title: "Legal Clarity",
                    desc: "Every unit is backed by registered legal titles.",
                  },
                  {
                    icon: Landmark,
                    title: "Investor Rights",
                    desc: "Comprehensive framework ensuring voting rights.",
                  },
                  {
                    icon: Lock,
                    title: "Escrow Security",
                    desc: "All payments are managed through fiduciary accounts.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 group cursor-default">
                    <div className="w-12 h-12 rounded-xl bg-[#d0a539]/10 flex items-center justify-center shrink-0 group-hover:bg-[#d0a539] transition-all duration-300 group-hover:rotate-12">
                      <item.icon className="w-6 h-6 text-[#d0a539] group-hover:text-[#171512]" />
                    </div>
                    <div>
                      <h4 className="font-bold uppercase text-sm mb-2 text-[#d0a539]">
                        {item.title}
                      </h4>
                      <p className="text-sm text-white/60 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Dashboard Preview - Slide from Right */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white border border-[#171512]/5 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden"
          >
            {/* Animated Blob */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{ duration: 20, repeat: Infinity }}
              className="absolute -top-20 -right-20 w-64 h-64 bg-[#d0a539]/5 rounded-full blur-3xl pointer-events-none"
            />

            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#171512]/5 relative z-10">
              <h4 className="font-black uppercase text-sm tracking-widest text-[#171512]">
                Ownership Dashboard
              </h4>
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-1.5 text-[10px] font-bold text-[#d0a539] bg-[#d0a539]/10 px-3 py-1.5 rounded-full"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#d0a539]"></span>{" "}
                Live
              </motion.span>
            </div>

            <div className="space-y-8 relative z-10">
              {/* Progress */}
              <div>
                <div className="flex justify-between items-end mb-3">
                  <span className="text-xs uppercase font-bold text-[#171512]/60">
                    Equity Acquired
                  </span>
                  <span className="text-4xl font-black text-[#171512]">
                    <NumberCounter value={65} />
                    <span className="text-[#d0a539] text-2xl">%</span>
                  </span>
                </div>
                <div className="w-full h-4 bg-[#171512]/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "65%" }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    className="h-full bg-[#d0a539] relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite] skew-x-12 translate-x-[-100%]"></div>
                  </motion.div>
                </div>
              </div>

              {/* Calendar - Floating Effect */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-[#f8f7f6] rounded-2xl p-5 border border-[#171512]/5"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#171512]/70">
                    Payment Calendar
                  </span>
                  <MoreHorizontal className="w-4 h-4 text-[#171512]/40" />
                </div>
                <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-[10px] sm:text-xs">
                  {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                    <div key={i} className="font-bold text-[#171512]/30 mb-1">
                      {d}
                    </div>
                  ))}
                  {Array.from({ length: 14 }).map((_, i) => {
                    const day = i + 1;
                    const isPayDay = day === 11;
                    return (
                      <motion.div
                        key={i}
                        initial={isPayDay ? { scale: 0 } : {}}
                        whileInView={isPayDay ? { scale: 1 } : {}}
                        transition={
                          isPayDay
                            ? { type: "spring", stiffness: 300, delay: 1 }
                            : {}
                        }
                        className={`py-1.5 sm:py-2 rounded-lg font-medium transition-colors ${
                          isPayDay
                            ? "bg-[#d0a539] text-[#171512] font-bold shadow-lg shadow-[#d0a539]/30"
                            : "text-[#171512]/60 hover:bg-[#171512]/5"
                        }`}
                      >
                        {day}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Property Mini Card - Staggered Entry */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-4 p-4 border border-[#d0a539]/30 bg-[#d0a539]/5 rounded-2xl"
              >
                <div className="size-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Building className="w-6 h-6 text-[#d0a539]" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-black uppercase text-[#171512]">
                    Lugbe ACO
                  </p>
                  <p className="text-[10px] sm:text-xs text-[#171512]/60 mt-0.5">
                    Unit 405 • Lugbe, Abuja, Nigeria
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-10 pb-12">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-[#171512] rounded-[2.5rem] p-12 lg:p-24 text-center relative overflow-hidden shadow-2xl"
        >
          {/* Ambient Background Pulse */}
          <motion.div
            animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, #d0a539 0%, transparent 60%)",
            }}
          />

          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] italic tracking-tight">
              Start Owning Real Estate <br />{" "}
              <span className="text-[#d0a539]">at Your Own Pace</span>
            </h2>
            <p className="text-white/60 text-base sm:text-lg max-w-xl mx-auto">
              Join thousands of investors who have already secured their future
              with Bugaking’s flexible ownership model.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#d0a539] text-[#171512] px-6 py-5 rounded-xl text-base font-black uppercase tracking-widest hover:bg-[#e1b74d] transition-colors shadow-2xl shadow-[#d0a539]/40 mt-4"
            >
              Check Availability
            </motion.button>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default Main;
