'use client';

import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import BlurText from "./BlurText";
import { useRef, useState, useEffect } from "react";

const parentVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      when: "beforeChildren", // ensures inner animation starts after parent
    },
  },
};

// Inner stagger animation
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section ref={ref} className="relative pt-32 pb-20 lg:pt-16 overflow-hidden min-h-[600px] lg:h-[800px] h-auto flex items-center">
       <motion.div style={{ y: isMobile ? 0 : y }} className="absolute inset-0 -z-10 h-full w-full">
         <video
            className="h-full w-full object-cover opacity-60"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/video/hero3.mp4" type="video/mp4" />
          </video>
       </motion.div>

        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950"></div>
        
        <div className="relative mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-4xl text-center">
             <BlurText 
              text="Book Your Trips"
              delay={200}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
             className="font-heading text-4xl font-bold text-white sm:text-6xl drop-shadow-lg text-center justify-center"
            />
            <BlurText 
              text="Premium intercity travel with starlink wi-fi, priority boarding, and verified safety."
              delay={100}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
             className="mx-auto mt-6 max-w-2xl text-lg text-slate-200 drop-shadow-md"
            />
            </div>

             <motion.div
      variants={parentVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="relative mx-auto mt-12 max-w-5xl rounded-xl border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-200/20 backdrop-blur-sm sm:p-10"
    >
      {/* Inner stagger container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Tabs */}
        <motion.div variants={itemVariants} className="mb-8 flex gap-4">
          <button className="rounded-full bg-slate-900 px-6 py-2 text-sm font-bold text-white transition hover:bg-slate-800">
            Local
          </button>
          <button className="rounded-full bg-slate-100 px-6 py-2 text-sm font-bold text-slate-500 transition hover:bg-slate-200 hover:text-slate-900">
            International
          </button>
        </motion.div>

        {/* Trip Type */}
        <motion.div variants={itemVariants} className="mb-8 flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="h-5 w-5 rounded-full border-2 border-emerald-500 flex items-center justify-center">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500"></div>
            </div>
            <span className="text-sm font-medium text-slate-900 group-hover:text-emerald-600 transition">
              One Way
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="h-5 w-5 rounded-full border-2 border-slate-300 flex items-center justify-center group-hover:border-slate-400"></div>
            <span className="text-sm font-medium text-slate-500 group-hover:text-slate-600 transition">
              Round Trip
            </span>
          </label>
        </motion.div>

        {/* Search Grid */}
        <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Departure */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Departure
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <select className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm font-medium text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all">
                <option>Lagos, Nigeria</option>
                <option>Abuja, Nigeria</option>
              </select>
            </div>
          </motion.div>

          {/* Destination */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Destination
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <select className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm font-medium text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all">
                <option>Abuja, Nigeria</option>
                <option>Port Harcourt, Nigeria</option>
              </select>
            </div>
          </motion.div>

          {/* Departure Date */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Departure Date
            </label>
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="date"
                className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm font-medium text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
              />
            </div>
          </motion.div>

          {/* Passengers */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Passengers
            </label>
            <div className="relative">
              <div className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 py-3.5 px-4 text-sm font-medium text-slate-900 hover:border-slate-300 transition-colors cursor-pointer">
                <span>1 Adult</span>
                <ArrowRight className="h-4 w-4 text-slate-500" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Search Button */}
        <motion.div variants={itemVariants} className="mt-8">
          <Link
            href="/booking"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500 hover:shadow-emerald-600/30 active:scale-95 sm:w-auto sm:px-12"
          >
            Search Availability
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  
        </div>
      </section>
  );
}
