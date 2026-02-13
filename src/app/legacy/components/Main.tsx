// "use client";

// import React from "react";
// import {
//   Sprout,
//   Network,
//   Building2,
//   ShieldCheck,
//   Lightbulb,
//   Award,
//   Quote,
// } from "lucide-react";
// import { motion } from "framer-motion";

// const LEADERSHIP = [
//   {
//     name: "Prince Jerry Okafor",
//     role: "CEO PJO Homes & Properties LTD",
//     bio: "A public speaker, inspirational writer, financial activist, and business mentorship coach dedicated to the well-being of youths. He is the Founder of Great Leaders Forum (founded 2015) and currently serves as the National Deputy Chairman of the Coalition of Anambra State Student Leaders.",
//     image: "/leadership2.jpg",
//   },
//   {
//     name: "Onyedum Ikechukwu Victor",
//     role: "Mathematics Educator & Professional",
//     bio: "Born in Kaduna State with a deep enthusiasm for learning, Onyedum earned his B.Sc. Ed. in Mathematics from the University of Abuja. Known for his honesty and strong work ethic, he brings clarity, purpose, and unwavering zeal to his professional engagements.",
//     image: "/leadership1.jpg",
//   },
//   {
//     name: "Ethel Mbionwu",
//     role: "Managing Partner, Ethel Mbionwu & Co. Chambers",
//     bio: "A proactive Legal Practitioner with extensive experience in corporate governance, real estate, and strategic advisory. Formerly a litigator at Chambers of O.A Obianwu SAN and Solicitor at Alpha Juris Chambers, she now leads her own firm providing business structuring services.",
//     image: "/leadership3.jpg",
//   },
//   {
//     name: "Miss Kelechi",
//     role: "Manager",
//     bio: "Curating the world's most exclusive property portfolios with an eye for timeless architectural distinction.",
//     image: "/leadership4.jpg",
//   },
// ];

// const IMPACT_STATS = [
//   {
//     id: 1,
//     icon: Sprout,
//     count: "50k+",
//     label: "Acres Cultivated",
//     desc: "Sustainable agriculture practices across three continents, feeding global populations responsibly.",
//   },
//   {
//     id: 2,
//     icon: Network,
//     count: "1M+",
//     label: "Tech Users",
//     desc: "Connecting enterprises through advanced digital infrastructure and high-speed global networks.",
//   },
//   {
//     id: 3,
//     icon: Building2,
//     count: "500+",
//     label: "Luxury Residences",
//     desc: "Defining the skyline of major metropolitan hubs with award-winning architectural excellence.",
//   },
// ];

// const TESTIMONIALS = [
//   {
//     quote:
//       "The level of discretion and architectural foresight BugaKing brings to the table is unmatched. They don't just sell property; they curate legacies.",
//     author: "Victor St. James",
//     role: "Private Investor",
//   },
//   {
//     quote:
//       "Owning a BugaKing residence is a statement of intent. The attention to detail in their luxury estates transcends the ordinary market standards.",
//     author: "Helena Valmont",
//     role: "Luxury Estate Owner",
//   },
//   {
//     quote:
//       "Their integration of high-speed tech infrastructure within residential landmarks has redefined how we view modern living spaces globally.",
//     author: "Marcus Chen",
//     role: "Global Venture Partner",
//   },
//   {
//     quote:
//       "BugaKing remains our primary consultant for commercial acquisitions. Their integrity is the bedrock of our continued partnership.",
//     author: "Arthur Sterling",
//     role: "Real Estate Fund Manager",
//   },
// ];

// const VALUES = [
//   {
//     title: "Integrity",
//     icon: ShieldCheck,
//     desc: "Honesty and transparency are the bedrock of every partnership we forge and every contract we sign.",
//   },
//   {
//     title: "Innovation",
//     icon: Lightbulb,
//     desc: "Constantly redefining what's possible through research, advanced tech, and creative problem-solving.",
//   },
//   {
//     title: "Excellence",
//     icon: Award,
//     desc: "We don't just meet industry standards; we set them, ensuring unrivaled quality across our entire portfolio.",
//   },
// ];

// const MILESTONES = [
//   {
//     year: "1994",
//     title: "Agriculture Roots",
//     desc: "Establishment of the first Bugah Farms, pioneering organic yields.",
//   },
//   {
//     year: "2006",
//     title: "Global Expansion",
//     desc: "Entry into international commodity markets and logistics networks.",
//   },
//   {
//     year: "2014",
//     title: "Tech Acquisition",
//     desc: "Acquisition of lead tech firms to digitize our global supply chains.",
//   },
//   {
//     year: "2022",
//     title: "Bespoke Real Estate",
//     desc: "Launching our signature architectural landmarks in major global hubs.",
//   },
// ];

// // --- Animation Variants ---

// const fadeInUp = {
//   hidden: { opacity: 0, y: 60 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.8, ease: "easeOut" },
//   },
// };

// const staggerContainer = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.2,
//       delayChildren: 0.1,
//     },
//   },
// };

// // --- Sub-Components ---

// const SectionHeader = ({ subtitle, title, light = false }) => (
//   <motion.div
//     initial="hidden"
//     whileInView="visible"
//     viewport={{ once: true, margin: "-100px" }}
//     variants={fadeInUp}
//     className="text-center mb-16"
//   >
//     {subtitle && (
//       <span className="text-[var(--primary)] text-xs font-black uppercase tracking-[0.4em] mb-3 block">
//         {subtitle}
//       </span>
//     )}
//     <h2
//       className={`font-serif text-4xl md:text-5xl ${light ? "text-white" : "text-[var(--foreground)]"}`}
//     >
//       {title}
//     </h2>
//   </motion.div>
// );

// export default function Main() {
//   return (
//     <main>
//       {/* Hero Section */}
//       <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
//         <div className="absolute inset-0 z-0">
//           {/* Shadow/Overlay added here for text visibility */}
//           <div className="absolute inset-0 bg-black/50 z-10" />
//           <div className="absolute inset-0 gold-light-leak z-20" />
//           <motion.div
//             initial={{ scale: 1.1 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 1.5, ease: "easeOut" }}
//             className="w-full h-full bg-cover bg-center"
//             style={{
//               backgroundImage:
//                 "url('/legacy1.png')",
//             }}
//           />
//         </div>
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={staggerContainer}
//           className="relative z-30 text-center px-6"
//         >
//           <motion.span
//             variants={fadeInUp}
//             className="text-[var(--primary)] text-xs font-black uppercase tracking-[0.6em] mb-4 block"
//           >
//             Our Story
//           </motion.span>
//           {/* Changed text color to white to contrast with the shadow, keeping font/size exact */}
//           <motion.h1
//             variants={fadeInUp}
//             className="font-serif text-5xl md:text-8xl text-white italic font-light tracking-tight"
//           >
//             Our Legacy of Excellence
//           </motion.h1>
//           <motion.div
//             variants={fadeInUp}
//             className="w-24 h-px bg-[var(--primary)] mx-auto mt-8"
//           />
//         </motion.div>
//       </section>

//       {/* Heritage Section */}
//       <section className="max-w-[1280px] mx-auto px-6 py-24 lg:px-10">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="relative"
//           >
//             <div className="aspect-[4/5] bg-white overflow-hidden p-3 border border-[#d0a539]/20 shadow-xl">
//               <div
//                 className="w-full h-full bg-cover bg-center"
//                 style={{
//                   backgroundImage:
//                     "url('/leadership2.jpg')",
//                 }}
//               />
//             </div>
//             <div className="absolute -bottom-6 -right-6 w-32 h-32 border-r-2 border-b-2 border-[#d0a539]/40 hidden md:block" />
//           </motion.div>
//           <motion.div
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={staggerContainer}
//             className="space-y-8"
//           >
//             <motion.div variants={fadeInUp} className="space-y-4">
//               <p className="text-[var(--primary)] font-bold uppercase tracking-widest text-sm">
//                 Heritage & Vision
//               </p>
//               <h2 className="font-serif text-4xl md:text-5xl font-medium leading-tight text-[var(--foreground)]">
//                 Forged in Tradition, Fueled by Innovation.
//               </h2>
//             </motion.div>
//             <motion.div
//               variants={fadeInUp}
//               className="space-y-6 text-[#171512]/70 text-lg leading-relaxed font-light"
//             >
//               <p>
//                 Bugaking Group is a proudly African conglomerate with diverse
//                 business interests in technology, real estate, and agriculture.
//                 Our goal is to bridge gaps in access, opportunity, and growth
//                 through forward-thinking enterprises that meet the needs of
//                 today and tomorrow.
//               </p>
//               <p>
//                 Founded with the vision to build a group that empowers lives,
//                 Bugaking Group has grown into a trusted name that prioritizes
//                 sustainability, transparency, and customer satisfaction. Each of
//                 our subsidiaries reflects our shared commitment to innovation
//                 and excellence.
//               </p>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Leadership Section */}
//       <section className="max-w-[1280px] mx-auto px-6 py-24 lg:px-10 border-t border-[#171512]/5">
//         <SectionHeader subtitle="Guardians of Vision" title="Our Leadership" />
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           variants={staggerContainer}
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
//         >
//           {LEADERSHIP.map((leader, index) => (
//             <motion.div key={index} variants={fadeInUp} className="group">
//               <div className="relative aspect-[3/4] overflow-hidden border border-[#d0a539]/30 transition-all duration-500 mb-6 group-hover:border-[var(--primary)]">
//                 <div
//                   className="w-full h-full bg-cover bg-center grayscale transition-all duration-700"
//                   style={{ backgroundImage: `url("${leader.image}")` }}
//                 />
//               </div>
//               <h3 className="font-serif text-[var(--primary)] text-xl font-bold mb-1 tracking-wide uppercase">
//                 {leader.name}
//               </h3>
//               <p className="text-[var(--foreground)] text-xs font-black uppercase tracking-widest mb-3">
//                 {leader.role}
//               </p>
//               <p className="text-[#171512]/60 text-sm leading-relaxed">
//                 {leader.bio}
//               </p>
//             </motion.div>
//           ))}
//         </motion.div>
//       </section>

//       {/* Global Impact Section */}
//       <section className="relative py-32 overflow-hidden bg-background-light">
//         <div className="absolute inset-0 parallax-map opacity-10 z-0" />
//         <div className="absolute inset-0 bg-gradient-to-b from-background-light via-transparent to-background-light z-10" />
//         <div className="max-w-[1280px] mx-auto px-6 lg:px-10 relative z-20">
//           <SectionHeader
//             subtitle="Global Footprint"
//             title="Our Global Impact"
//           />

//           <motion.div
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={staggerContainer}
//             className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
//           >
//             {IMPACT_STATS.map((stat) => (
//               <motion.div
//                 key={stat.id}
//                 variants={fadeInUp}
//                 className="impact-card border border-[#d0a539]/10 p-10 flex flex-col items-center text-center group hover:border-[#d0a539]/40 transition-all shadow-sm"
//               >
//                 <stat.icon className="text-[var(--primary)] w-12 h-12 mb-6 stroke-1" />
//                 <h4 className="font-serif text-[var(--primary)] text-5xl md:text-6xl mb-4 font-light tracking-tight">
//                   {stat.count}
//                 </h4>
//                 <p className="text-[var(--foreground)] text-sm font-black uppercase tracking-widest mb-4">
//                   {stat.label}
//                 </p>
//                 <div className="w-12 h-px bg-[#d0a539]/30 mb-4" />
//                 <p className="text-[#171512]/50 text-xs leading-relaxed max-w-xs uppercase">
//                   {stat.desc}
//                 </p>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="bg-[#121110] py-32 overflow-hidden">
//         <div className="max-w-[1280px] mx-auto px-6 lg:px-10  ">
//           <SectionHeader
//             subtitle="Testimonials"
//             title="Distinguished Client Voices"
//             light
//           />
//         </div>
//         <motion.div
//           initial={{ opacity: 0, x: 50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="flex overflow-x-auto gap-8 px-6 lg:px-10 pb-12 hide-scrollbar snap-x"
//         >
//           {TESTIMONIALS.map((t, i) => (
//             <div key={i} className="flex-none w-[450px] snap-center">
//               <div className="relative p-12 bg-[var(--foreground)] border border-[#d0a539]/20 h-full flex flex-col justify-between overflow-hidden">
//                 <Quote className="absolute top-2 right-3 text-[#d0a539]/10 w-10 h-10 rotate-180" />
//                 <p className="font-serif italic text-xl md:text-2xl text-white/90 leading-relaxed relative z-10">
//                   "{t.quote}"
//                 </p>
//                 <div className="mt-12 relative z-10">
//                   <p className="text-[var(--primary)] text-sm font-black tracking-widest uppercase mb-1">
//                     {t.author}
//                   </p>
//                   <p className="text-[#d0a539]/70 text-[10px] font-bold tracking-[0.2em] uppercase">
//                     {t.role}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </motion.div>
//       </section>

//       {/* Values Section */}
//       <section className="bg-white border-y border-[#171512]/5 py-24">
//         <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <h2 className="font-serif text-3xl md:text-4xl text-[var(--foreground)] italic">
//               Foundational Values
//             </h2>
//           </motion.div>
//           <motion.div
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={staggerContainer}
//             className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
//           >
//             {VALUES.map((val, i) => (
//               <motion.div
//                 key={i}
//                 variants={fadeInUp}
//                 className="space-y-6 flex flex-col items-center"
//               >
//                 <div className="size-20 rounded-full border border-[#d0a539]/20 flex items-center justify-center">
//                   <val.icon className="text-[var(--primary)] w-10 h-10 stroke-1" />
//                 </div>
//                 <h3 className="text-xl font-bold uppercase tracking-widest text-[var(--foreground)]">
//                   {val.title}
//                 </h3>
//                 <p className="text-[#171512]/60 text-sm max-w-[280px] leading-relaxed">
//                   {val.desc}
//                 </p>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* Milestones Section */}
//       <section className="max-w-[1280px] mx-auto px-6 py-32 lg:px-10 overflow-hidden">
//         <SectionHeader subtitle="Our Journey" title="Milestones of Progress" />
//         <div className="relative">
//           <div className="absolute top-1/2 left-0 w-full timeline-line -translate-y-1/2 opacity-20" />
//           <motion.div
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-100px" }}
//             variants={staggerContainer}
//             className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10"
//           >
//             {MILESTONES.map((m, i) => (
//               <motion.div
//                 key={i}
//                 variants={fadeInUp}
//                 className="flex flex-col items-center text-center group"
//               >
//                 <div className="mb-8">
//                   <p className="text-[var(--primary)] font-serif italic text-2xl">
//                     {m.year}
//                   </p>
//                 </div>
//                 <div className="size-4 bg-[var(--primary)] rounded-full ring-8 ring-[#d0a539]/5 mb-8" />
//                 <div className="space-y-2 px-4">
//                   <h4 className="font-bold text-sm uppercase tracking-widest text-[var(--foreground)]">
//                     {m.title}
//                   </h4>
//                   <p className="text-xs text-[#171512]/50 leading-relaxed uppercase">
//                     {m.desc}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>
//     </main>
//   );
// }












"use client";

import React from "react";
import {
  Sprout,
  Network,
  Building2,
  ShieldCheck,
  Lightbulb,
  Award,
  Quote,
} from "lucide-react";
import { motion, Variants } from "framer-motion";

const LEADERSHIP = [
  {
    name: "Prince Jerry Okafor",
    role: "CEO PJO Homes & Properties LTD",
    bio: "A public speaker, inspirational writer, financial activist, and business mentorship coach dedicated to the well-being of youths. He is the Founder of Great Leaders Forum (founded 2015) and currently serves as the National Deputy Chairman of the Coalition of Anambra State Student Leaders.",
    image: "/leadership2.jpg",
  },
  {
    name: "Onyedum Ikechukwu Victor",
    role: "Mathematics Educator & Professional",
    bio: "Born in Kaduna State with a deep enthusiasm for learning, Onyedum earned his B.Sc. Ed. in Mathematics from the University of Abuja. Known for his honesty and strong work ethic, he brings clarity, purpose, and unwavering zeal to his professional engagements.",
    image: "/leadership1.jpg",
  },
  {
    name: "Ethel Mbionwu",
    role: "Managing Partner, Ethel Mbionwu & Co. Chambers",
    bio: "A proactive Legal Practitioner with extensive experience in corporate governance, real estate, and strategic advisory. Formerly a litigator at Chambers of O.A Obianwu SAN and Solicitor at Alpha Juris Chambers, she now leads her own firm providing business structuring services.",
    image: "/leadership3.jpg",
  },
  {
    name: "Miss Kelechi",
    role: "Manager",
    bio: "Curating the world's most exclusive property portfolios with an eye for timeless architectural distinction.",
    image: "/leadership4.jpg",
  },
];

const IMPACT_STATS = [
  {
    id: 1,
    icon: Sprout,
    count: "50k+",
    label: "Acres Cultivated",
    desc: "Sustainable agriculture practices across three continents, feeding global populations responsibly.",
  },
  {
    id: 2,
    icon: Network,
    count: "1M+",
    label: "Tech Users",
    desc: "Connecting enterprises through advanced digital infrastructure and high-speed global networks.",
  },
  {
    id: 3,
    icon: Building2,
    count: "500+",
    label: "Luxury Residences",
    desc: "Defining the skyline of major metropolitan hubs with award-winning architectural excellence.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "The level of discretion and architectural foresight BugaKing brings to the table is unmatched. They don't just sell property; they curate legacies.",
    author: "Victor St. James",
    role: "Private Investor",
  },
  {
    quote:
      "Owning a BugaKing residence is a statement of intent. The attention to detail in their luxury estates transcends the ordinary market standards.",
    author: "Helena Valmont",
    role: "Luxury Estate Owner",
  },
  {
    quote:
      "Their integration of high-speed tech infrastructure within residential landmarks has redefined how we view modern living spaces globally.",
    author: "Marcus Chen",
    role: "Global Venture Partner",
  },
  {
    quote:
      "BugaKing remains our primary consultant for commercial acquisitions. Their integrity is the bedrock of our continued partnership.",
    author: "Arthur Sterling",
    role: "Real Estate Fund Manager",
  },
];

const VALUES = [
  {
    title: "Integrity",
    icon: ShieldCheck,
    desc: "Honesty and transparency are the bedrock of every partnership we forge and every contract we sign.",
  },
  {
    title: "Innovation",
    icon: Lightbulb,
    desc: "Constantly redefining what's possible through research, advanced tech, and creative problem-solving.",
  },
  {
    title: "Excellence",
    icon: Award,
    desc: "We don't just meet industry standards; we set them, ensuring unrivaled quality across our entire portfolio.",
  },
];

const MILESTONES = [
  {
    year: "1994",
    title: "Agriculture Roots",
    desc: "Establishment of the first Bugah Farms, pioneering organic yields.",
  },
  {
    year: "2006",
    title: "Global Expansion",
    desc: "Entry into international commodity markets and logistics networks.",
  },
  {
    year: "2014",
    title: "Tech Acquisition",
    desc: "Acquisition of lead tech firms to digitize our global supply chains.",
  },
  {
    year: "2022",
    title: "Bespoke Real Estate",
    desc: "Launching our signature architectural landmarks in major global hubs.",
  },
];

// --- Animation Variants ---

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
      delayChildren: 0.1,
    },
  },
};

// --- Sub-Components ---

const SectionHeader = ({
  subtitle,
  title,
  light = false,
}: {
  subtitle?: string;
  title: string;
  light?: boolean;
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={fadeInUp}
    className="text-center mb-16"
  >
    {subtitle && (
      <span className="text-[var(--primary)] text-xs font-black uppercase tracking-[0.4em] mb-3 block">
        {subtitle}
      </span>
    )}
    <h2
      className={`font-serif text-4xl md:text-5xl ${light ? "text-white" : "text-[var(--foreground)]"}`}
    >
      {title}
    </h2>
  </motion.div>
);

export default function Main() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Shadow/Overlay added here for text visibility */}
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="absolute inset-0 gold-light-leak z-20" />
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('/legacy1.png')",
            }}
          />
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-30 text-center px-6"
        >
          <motion.span
            variants={fadeInUp}
            className="text-[var(--primary)] text-xs font-black uppercase tracking-[0.6em] mb-4 block"
          >
            Our Story
          </motion.span>
          {/* Changed text color to white to contrast with the shadow, keeping font/size exact */}
          <motion.h1
            variants={fadeInUp}
            className="font-serif text-5xl md:text-8xl text-white italic font-light tracking-tight"
          >
            Our Legacy of Excellence
          </motion.h1>
          <motion.div
            variants={fadeInUp}
            className="w-24 h-px bg-[var(--primary)] mx-auto mt-8"
          />
        </motion.div>
      </section>

      {/* Heritage Section */}
      <section className="max-w-[1280px] mx-auto px-6 py-24 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-white overflow-hidden p-3 border border-[#d0a539]/20 shadow-xl">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: "url('/leadership2.jpg')",
                }}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-r-2 border-b-2 border-[#d0a539]/40 hidden md:block" />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp} className="space-y-4">
              <p className="text-[var(--primary)] font-bold uppercase tracking-widest text-sm">
                Heritage & Vision
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-medium leading-tight text-[var(--foreground)]">
                Forged in Tradition, Fueled by Innovation.
              </h2>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="space-y-6 text-[#171512]/70 text-lg leading-relaxed font-light"
            >
              <p>
                Bugaking Group is a proudly African conglomerate with diverse
                business interests in technology, real estate, and agriculture.
                Our goal is to bridge gaps in access, opportunity, and growth
                through forward-thinking enterprises that meet the needs of
                today and tomorrow.
              </p>
              <p>
                Founded with the vision to build a group that empowers lives,
                Bugaking Group has grown into a trusted name that prioritizes
                sustainability, transparency, and customer satisfaction. Each of
                our subsidiaries reflects our shared commitment to innovation
                and excellence.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="max-w-[1280px] mx-auto px-6 py-24 lg:px-10 border-t border-[#171512]/5">
        <SectionHeader subtitle="Guardians of Vision" title="Our Leadership" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {LEADERSHIP.map((leader, index) => (
            <motion.div key={index} variants={fadeInUp} className="group">
              <div className="relative aspect-[3/4] overflow-hidden border border-[#d0a539]/30 transition-all duration-500 mb-6 group-hover:border-[var(--primary)]">
                <div
                  className="w-full h-full bg-cover bg-center grayscale transition-all duration-700"
                  style={{ backgroundImage: `url("${leader.image}")` }}
                />
              </div>
              <h3 className="font-serif text-[var(--primary)] text-xl font-bold mb-1 tracking-wide uppercase">
                {leader.name}
              </h3>
              <p className="text-[var(--foreground)] text-xs font-black uppercase tracking-widest mb-3">
                {leader.role}
              </p>
              <p className="text-[#171512]/60 text-sm leading-relaxed">
                {leader.bio}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Global Impact Section */}
      <section className="relative py-32 overflow-hidden bg-background-light">
        <div className="absolute inset-0 parallax-map opacity-10 z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-background-light via-transparent to-background-light z-10" />
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 relative z-20">
          <SectionHeader
            subtitle="Global Footprint"
            title="Our Global Impact"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          >
            {IMPACT_STATS.map((stat) => (
              <motion.div
                key={stat.id}
                variants={fadeInUp}
                className="impact-card border border-[#d0a539]/10 p-10 flex flex-col items-center text-center group hover:border-[#d0a539]/40 transition-all shadow-sm"
              >
                <stat.icon className="text-[var(--primary)] w-12 h-12 mb-6 stroke-1" />
                <h4 className="font-serif text-[var(--primary)] text-5xl md:text-6xl mb-4 font-light tracking-tight">
                  {stat.count}
                </h4>
                <p className="text-[var(--foreground)] text-sm font-black uppercase tracking-widest mb-4">
                  {stat.label}
                </p>
                <div className="w-12 h-px bg-[#d0a539]/30 mb-4" />
                <p className="text-[#171512]/50 text-xs leading-relaxed max-w-xs uppercase">
                  {stat.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-[#121110] py-32 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10  ">
          <SectionHeader
            subtitle="Testimonials"
            title="Distinguished Client Voices"
            light
          />
        </div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex overflow-x-auto gap-8 px-6 lg:px-10 pb-12 hide-scrollbar snap-x"
        >
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="flex-none w-[450px] snap-center">
              <div className="relative p-12 bg-[var(--foreground)] border border-[#d0a539]/20 h-full flex flex-col justify-between overflow-hidden">
                <Quote className="absolute top-2 right-3 text-[#d0a539]/10 w-10 h-10 rotate-180" />
                <p className="font-serif italic text-xl md:text-2xl text-white/90 leading-relaxed relative z-10">
                  "{t.quote}"
                </p>
                <div className="mt-12 relative z-10">
                  <p className="text-[var(--primary)] text-sm font-black tracking-widest uppercase mb-1">
                    {t.author}
                  </p>
                  <p className="text-[#d0a539]/70 text-[10px] font-bold tracking-[0.2em] uppercase">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="bg-white border-y border-[#171512]/5 py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-[var(--foreground)] italic">
              Foundational Values
            </h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
          >
            {VALUES.map((val, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="space-y-6 flex flex-col items-center"
              >
                <div className="size-20 rounded-full border border-[#d0a539]/20 flex items-center justify-center">
                  <val.icon className="text-[var(--primary)] w-10 h-10 stroke-1" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-widest text-[var(--foreground)]">
                  {val.title}
                </h3>
                <p className="text-[#171512]/60 text-sm max-w-[280px] leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="max-w-[1280px] mx-auto px-6 py-32 lg:px-10 overflow-hidden">
        <SectionHeader subtitle="Our Journey" title="Milestones of Progress" />
        <div className="relative">
          <div className="absolute top-1/2 left-0 w-full timeline-line -translate-y-1/2 opacity-20" />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10"
          >
            {MILESTONES.map((m, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex flex-col items-center text-center group"
              >
                <div className="mb-8">
                  <p className="text-[var(--primary)] font-serif italic text-2xl">
                    {m.year}
                  </p>
                </div>
                <div className="size-4 bg-[var(--primary)] rounded-full ring-8 ring-[#d0a539]/5 mb-8" />
                <div className="space-y-2 px-4">
                  <h4 className="font-bold text-sm uppercase tracking-widest text-[var(--foreground)]">
                    {m.title}
                  </h4>
                  <p className="text-xs text-[#171512]/50 leading-relaxed uppercase">
                    {m.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}