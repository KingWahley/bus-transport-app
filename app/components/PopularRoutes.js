"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function PopularRoutes() {
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  const routes = [
    { from: "Lagos", to: "Abuja", duration: "10h 30m" },
    { from: "Abuja", to: "Kaduna", duration: "2h 45m" },
    { from: "Lagos", to: "Benin", duration: "4h 15m" },
    { from: "PHC", to: "Enugu", duration: "3h 20m" },
    { from: "Ibadan", to: "Lagos", duration: "1h 50m" },
    { from: "Abuja", to: "Jos", duration: "4h 00m" },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 60 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };



  return (
    <motion.section
      id="routes"
      className="w-full bg-white py-10 pb-32"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <h2 className="font-heading text-3xl font-bold text-slate-900 sm:text-4xl">
              Popular Routes
            </h2>
            <p className="mt-2 text-slate-600">
              Explore our most frequent connections.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            {/* Mobile: Toggle Button */}
            <button
              onClick={() => setIsMobileExpanded(!isMobileExpanded)}
              className="text-sm font-bold text-emerald-600 hover:text-emerald-500 transition sm:hidden"
            >
              {isMobileExpanded ? "Show less" : "View all destinations →"}
            </button>

            {/* Desktop: Navigation Link */}
            
          </div>
        </motion.div>

        {/* Desktop Grid */}
        <motion.div
          className="hidden sm:grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
        >
          {routes.map((route, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="group"
            >
              <Link
                href={`/booking?from=${route.from}&to=${route.to}`}
                className="flex flex-col h-full rounded-2xl bg-slate-50 border border-slate-200 p-6 transition hover:shadow-lg hover:shadow-slate-200/50 hover:border-emerald-500/20"
              >
                <div className="mb-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                  <span>Direct</span>
                  <span>{route.duration}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-xl font-bold text-slate-900">
                      {route.from}
                    </span>
                    <span className="h-8 w-px bg-slate-200 ml-2"></span>
                    <span className="text-xl font-bold text-slate-500">
                      {route.to}
                    </span>
                  </div>

                  <motion.div
                    whileHover={{ rotate: -45, scale: 1.1 }}
                    className="grid h-12 w-12 place-items-center rounded-full border border-dashed border-slate-300 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 group-hover:border-emerald-500"
                  >
                    <ArrowRight className="h-5 w-5 -rotate-45" />
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View: Toggle between Carousel and Grid */}
        <div className="sm:hidden w-full">
          {!isMobileExpanded ? (
            /* Carousel Mode */
            <div className="overflow-hidden mask-linear-gradient">
              <motion.div
                className="flex gap-4 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                  },
                }}
              >
                {[...routes, ...routes].map((route, i) => (
                  <Link
                    key={i}
                    href={`/booking?from=${route.from}&to=${route.to}`}
                    className="flex flex-col w-[280px] flex-shrink-0 rounded-2xl bg-slate-50 border border-slate-200 p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="mb-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                      <span>Direct</span>
                      <span>{route.duration}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="text-xl font-bold text-slate-900">
                          {route.from}
                        </span>
                        <span className="h-8 w-px bg-slate-200 ml-2"></span>
                        <span className="text-xl font-bold text-slate-500">
                          {route.to}
                        </span>
                      </div>

                      <div className="grid h-12 w-12 place-items-center rounded-full border border-dashed border-slate-300 text-slate-400">
                        <ArrowRight className="h-5 w-5 -rotate-45" />
                      </div>
                    </div>
                  </Link>
                ))}
              </motion.div>
            </div>
          ) : (
            /* Expanded Grid Mode for Mobile */
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="grid gap-4 grid-cols-1"
            >
              {routes.map((route, i) => (
                <Link
                  key={i}
                  href={`/booking?from=${route.from}&to=${route.to}`}
                  className="flex flex-col rounded-2xl bg-slate-50 border border-slate-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="mb-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                    <span>Direct</span>
                    <span>{route.duration}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-xl font-bold text-slate-900">
                        {route.from}
                      </span>
                      <span className="h-8 w-px bg-slate-200 ml-2"></span>
                      <span className="text-xl font-bold text-slate-500">
                        {route.to}
                      </span>
                    </div>

                    <div className="grid h-12 w-12 place-items-center rounded-full border border-dashed border-slate-300 text-slate-400">
                      <ArrowRight className="h-5 w-5 -rotate-45" />
                    </div>
                  </div>
                </Link>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
