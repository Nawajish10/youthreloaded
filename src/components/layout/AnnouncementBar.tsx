"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";

export function AnnouncementBar() {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-[60] h-[42px] w-full bg-[#111111] border-b border-white/[0.08] px-4 flex items-center justify-between text-xs sm:text-sm font-medium"
    >
      <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
        {/* Offer Message */}
        <div className="flex items-center gap-2 text-white truncate">
          <span className="text-[#E50914] font-bold text-sm sm:text-base">⚡</span>
          <span className="truncate">
            No Registration Fee on <strong className="text-[#E50914]">3, 6 & 12 Month</strong> Memberships
          </span>
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-4 shrink-0 font-semibold">
          <a
            href="tel:+917074975231"
            className="flex items-center gap-1.5 text-neutral-300 hover:text-[#E50914] transition-colors"
          >
            <Phone className="h-3.5 w-3.5 text-[#E50914]" />
            <span className="hidden sm:inline">Call Now</span>
          </a>

          <div className="h-3 w-[1px] bg-white/10 hidden sm:block" />

          <a
            href="https://wa.me/917479207804?text=Hi%20Youth%20Gym%20Reloaded!%20I%20want%20to%20know%20more%20about%20membership%20plans."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-neutral-300 hover:text-[#E50914] transition-colors"
          >
            <MessageCircle className="h-3.5 w-3.5 text-[#E50914]" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
