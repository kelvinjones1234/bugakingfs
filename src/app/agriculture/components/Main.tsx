"use client";
import {
  ShieldCheck,
  HardHat,
  Landmark,
  Quote,
  CheckCircle,
  TrendingUp,
  Shield,
  PieChart,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

// ── Data Configuration ────────────────────────────────────────────────
const PROCESS_STEPS = [
  {
    id: "01",
    title: "Choose",
    description:
      "Select from our curated portfolio of high-yield fertile lands across primary regions.",
  },
  {
    id: "02",
    title: "Pay",
    description:
      "A straightforward one-time payment, designed to keep your investment journey stress-free and transparent.",
  },
  {
    id: "03",
    title: "Own",
    description:
      "Receive legal documentation and certificates of ownership for your specific plot.",
  },
  {
    id: "04",
    title: "Earn",
    description:
      "Benefit from crop yields and land appreciation handled by our management team.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Buying farmland through Bugaking was straightforward and transparent. The installment plan made ownership possible, and the returns from leasing to farmers have been consistent.",
    author: "Adebola Ogunleye",
    role: "Farmland Investor",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Adebola",
  },
  {
    quote:
      "The land allocated to us is well-managed and suitable for commercial farming. Bugaking’s structure allows farmers to focus on production while investors earn from the land.",
    author: "Musa Abdullahi",
    role: "Commercial Farmer, Kaduna",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Musa",
  },
  {
    quote:
      "What stood out for me was ownership. After completing payment, the land is truly yours. The dashboard makes tracking investments and returns very easy.",
    author: "Chiamaka Okafor",
    role: "Real Estate & Agribusiness Investor",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chiamaka",
  },
];

// Investment Strategy cards (replaces SERVICES)
const INVESTMENT_BENEFITS = [
  {
    title: "Land Appreciation",
    description:
      "Historically, arable land has consistently outperformed most traditional asset classes in long-term value growth.",
    icon: TrendingUp,
  },
  {
    title: "Inflation Hedge",
    description:
      "Agricultural assets maintain purchasing power as food prices rise in tandem with inflation cycles.",
    icon: Shield,
  },
  {
    title: "Portfolio Diversification",
    description:
      "Lower your overall risk by adding non-correlated assets that provide steady annual cash flow from harvests.",
    icon: PieChart,
  },
];

// ── Utility Components ────────────────────────────────────────────────
const FadeIn = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const FormField = ({ label, as = "input", className = "", ...props }: any) => {
  const Component = as;
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-xs sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[#d0a539]">
        {label}
      </label>
      <Component
        className={`bg-white border border-zinc-200 focus:border-[#d0a539] focus:ring-1 focus:ring-[#d0a539] rounded-lg p-4 transition-all outline-none text-sm ${className}`}
        {...props}
      />
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────
export function Main() {
  return (
    <main className="bg-[#f8f7f6] min-h-screen transition-colors duration-300">
      {/* Hero */}
      <section className="relative min-h-[70vh] sm:min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/img2.png"
            alt="Farmland"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#171512]/85 via-[#171512]/55 to-[#171512]/90 sm:bg-gradient-to-r sm:from-[#171512]/95 sm:via-[#171512]/65 sm:to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 py-12 sm:py-0 w-full">
          <FadeIn>
            <span className="inline-block text-[#d0a539] text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-4 sm:mb-6">
              Sustainable Agricultural Investment
            </span>
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-tight mb-5 sm:mb-8">
              Own Farmland.
              <br className="sm:hidden" />
              <span className="italic text-[#f4e1a1]">Pay Flexibly.</span>
              <br />
              Earn Passively.
            </h1>
            <p className="text-gray-200 text-base sm:text-lg md:text-xl font-light mb-8 max-w-xl leading-relaxed">
              Secure your wealth with tangible assets. We combine generational
              agriculture with modern financial flexibility.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/authentication/signin"
                className="px-8 py-4 bg-[#d0a539] text-[#171512] font-black uppercase tracking-widest rounded-lg hover:scale-105 transition-transform text-center w-full sm:w-auto min-w-[200px]"
              >
                Sign in
              </Link>
              <Link
                href="/offers"
                className="px-8 py-4 border border-white/40 text-white font-black uppercase tracking-widest rounded-lg hover:bg-white/10 backdrop-blur-md transition-all text-center w-full sm:w-auto min-w-[200px]"
              >
                Our offer
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-[#171512] py-10 sm:py-12 px-5 sm:px-6 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              icon: ShieldCheck,
              title: "Secure Titles",
              sub: "Verified land ownership",
            },
            {
              icon: HardHat,
              title: "Management",
              sub: "Expert agrarian oversight",
            },
            {
              icon: Landmark,
              title: "Asset Backed",
              sub: "Capital protected by real land",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 justify-center sm:justify-start"
            >
              <item.icon
                className="text-[#d0a539] w-7 h-7 sm:w-8 sm:h-8"
                strokeWidth={1.5}
              />
              <div>
                <h4 className="text-white font-bold uppercase tracking-widest text-xs sm:text-sm">
                  {item.title}
                </h4>
                <p className="text-zinc-500 text-[10px] sm:text-xs mt-0.5 uppercase">
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Process */}
      <section className="py-16 sm:py-20 lg:py-24 px-5 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-[#d0a539] text-xs font-bold uppercase tracking-[0.3em] mb-3 sm:mb-4">
              The Process
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              Your Journey to Ownership
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.id}
                className="p-6 sm:p-8 bg-[#fdfaf2] rounded-xl border-l-4 border-[#d0a539] flex flex-col"
              >
                <span className="text-4xl sm:text-5xl font-serif text-[#d0a539] opacity-30 block mb-4 sm:mb-6 italic">
                  {step.id}
                </span>
                <h4 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                  {step.title}
                </h4>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Replaced: Investment Strategy ─────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 px-5 sm:px-6 bg-[#f8f7f6]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-[#d0a539] text-xs font-bold uppercase tracking-[0.3em] mb-3 sm:mb-4">
                Investment Strategy
              </h2>
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight">
                Why Agricultural Land?
              </h3>
            </div>
            <p className="text-gray-500 max-w-sm text-sm sm:text-base">
              Agriculture remains the most resilient asset class in global
              economics, providing stability through volatility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {INVESTMENT_BENEFITS.map((benefit, i) => (
              <FadeIn
                key={i}
                delay={i * 0.1}
                className="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-sm border border-gray-100 hover:border-[#d0a539]/30 transition-all"
              >
                <benefit.icon
                  className="text-[#d0a539] w-9 h-9 sm:w-10 sm:h-10 mb-5 sm:mb-6"
                  strokeWidth={1.5}
                />
                <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                  {benefit.title}
                </h4>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {benefit.description}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#171512] rounded-3xl sm:rounded-[2.5rem] overflow-hidden p-6 sm:p-10 lg:p-16 border border-zinc-800 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start lg:items-center">
              <div className="lg:w-5/12 w-full">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-5 sm:mb-6">
                  Manage Your Wealth from Anywhere
                </h3>
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                  Access our proprietary investor portal to track growth, manage
                  documentation, and view real-time field data.
                </p>
                <ul className="space-y-3 sm:space-y-4">
                  {[
                    "Portfolio Performance Tracking",
                    "Encrypted Document Vault",
                    "Harvest Payout Automation",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-white text-sm sm:text-base font-medium"
                    >
                      <CheckCircle className="text-[#d0a539] w-5 h-5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:w-7/12 w-full mt-8 lg:mt-0">
                <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-2xl border border-zinc-800 transform hover:rotate-0 transition-transform duration-500 rotate-0 lg:rotate-1">
                  <div className="bg-zinc-800 px-3 sm:px-4 py-2.5 flex items-center justify-between border-b border-zinc-700">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/60"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/60"></div>
                    </div>
                    <div className="bg-[#171512] px-4 sm:px-6 py-1 rounded text-[9px] sm:text-[10px] text-zinc-500 font-mono tracking-wide">
                      bugaking.com/dashboard
                    </div>
                    <div className="w-6 sm:w-8"></div>
                  </div>

                  <div className="p-5 sm:p-6 md:p-8 bg-gradient-to-br from-[#171512] to-[#2a2723]">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                      {[
                        { label: "Total Assets", val: "142,850" },
                        {
                          label: "Annual Yield",
                          val: "12.4%",
                          highlight: true,
                        },
                        { label: "Land Owned", val: "45.2 Ac" },
                        { label: "Next Payout", val: "Nov 2026" },
                      ].map((stat, i) => (
                        <div
                          key={i}
                          className="bg-white/5 p-3 sm:p-4 rounded-lg border border-white/10"
                        >
                          <p className="text-[9px] sm:text-[10px] text-zinc-400 uppercase tracking-wider mb-1">
                            {stat.label}
                          </p>
                          <p
                            className={`text-base sm:text-lg font-black ${stat.highlight ? "text-[#d0a539]" : "text-white"}`}
                          >
                            {stat.val}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-white/5 rounded-xl border border-white/10 p-4 sm:p-6 h-48 sm:h-64 flex items-end gap-2 sm:gap-3 md:gap-4">
                      {[30, 45, 40, 65, 55, 85, 100].map((height, i) => (
                        <div
                          key={i}
                          className="flex-1 flex flex-col justify-end h-full group"
                        >
                          <div
                            style={{ height: `${height}%` }}
                            className={`w-full rounded-t transition-all duration-500 ${
                              i === 6
                                ? "bg-[#d0a539]"
                                : "bg-[#d0a539]/25 group-hover:bg-[#d0a539]/50"
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 lg:py-24 px-5 sm:px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 sm:mb-16">
            <h2 className="text-[#d0a539] text-xs sm:text-sm font-bold uppercase tracking-[0.3em] mb-3 sm:mb-4">
              Client Testimonials
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              What our invstors are saying
            </h3>
          </div>
          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-8 sm:pb-10 snap-x snap-mandatory scrollbar-hide px-1">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="min-w-[85vw] sm:min-w-[380px] md:min-w-[450px] snap-start bg-[#fdfaf2]/30 sm:bg-[#fdfaf2]/40 p-6 sm:p-8 md:p-10 rounded-2xl border border-[#d0a539]/10 flex flex-col justify-between"
              >
                <div>
                  <Quote className="text-[#d0a539] w-10 h-10 sm:w-12 sm:h-12 opacity-20 mb-4 sm:mb-6" />
                  <p className="text-base sm:text-lg italic leading-relaxed text-zinc-700 mb-6 sm:mb-10">
                    "{t.quote}"
                  </p>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 border-t border-[#d0a539]/10 pt-6 sm:pt-8">
                  <img
                    src={t.img}
                    alt={t.author}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#d0a539]/20"
                  />
                  <div>
                    <h6 className="font-bold text-sm uppercase">{t.author}</h6>
                    <p className="text-[#d0a539] text-[10px] sm:text-[9px] font-extrabold uppercase tracking-widest">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="px-5 sm:px-6 py-16 sm:py-20 lg:py-24 max-w-4xl mx-auto">
        <div className="bg-[#171512] p-8 sm:p-10 lg:p-16 rounded-3xl text-center mb-12 sm:mb-16 shadow-2xl">
          <h3 className="text-[#d0a539] text-2xl sm:text-3xl lg:text-5xl font-black mb-4 sm:mb-6">
            Start Building Wealth
          </h3>
          <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto">
            Join a community of sophisticated investors securing their legacy
            through the most ancient asset class.
          </p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Full Name" placeholder="Johnathan King" />
            <FormField label="Organization" placeholder="Global Ag-Tech Inc." />
          </div>
          <FormField
            label="Email Address"
            type="email"
            placeholder="j.king@empire.com"
          />
          <FormField label="Investment Scale" as="select">
            <option>Partnership Inquiry</option>
            <option>Precision Technology Consultation</option>
            <option>Investment Portfolio Discussion</option>
          </FormField>
          <FormField
            label="Message"
            as="textarea"
            rows={4}
            placeholder="How can we advance your agricultural legacy?"
          />
          <button
            type="submit"
            className="w-full py-5 bg-[#d0a539] text-[#171512] font-black text-base sm:text-lg uppercase tracking-widest rounded-lg shadow-xl shadow-[#d0a539]/20 hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
            Submit Inquiry
          </button>
        </form>
      </section>
    </main>
  );
}
