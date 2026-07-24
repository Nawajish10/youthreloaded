"use client";

import React from "react";
import Image from "next/image";

export function HeroImage() {
  return (
    <div className="relative w-full h-[380px] sm:h-[450px] lg:h-[540px] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(229,9,20,0.25)] border border-white/10 group">
      {/* Background Hero Model Image */}
      <Image
        src="/images/hero-model.png"
        alt="Athletic Gym Model"
        fill
        priority
        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
      />

      {/* Dark Vignette & Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#090909]/60 via-transparent to-black/50" />

      {/* Volumetric Red Rim Lighting Accent */}
      <div className="absolute -bottom-10 -right-10 w-80 h-80 rounded-full bg-[#E50914]/25 blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-[#E50914]/20 blur-2xl pointer-events-none" />

      {/* Floating Badge */}
      <div className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-md border border-white/15 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-lg">
        <div className="h-3 w-3 rounded-full bg-[#E50914] animate-ping" />
        <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
          LIVE FITNESS ATMOSPHERE
        </span>
      </div>
    </div>
  );
}
