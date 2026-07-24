"use client";

import React from "react";
import { Phone, ArrowRight } from "lucide-react";
import { TrustBadges } from "./TrustBadges";

export function HeroContent() {
  return (
    <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 max-w-2xl mx-auto lg:mx-0">
      {/* Badge Tag */}
      <div className="inline-flex items-center gap-2 self-center lg:self-start rounded-full bg-[#151515]/90 px-4 py-1.5 border border-[#E50914]/40 text-xs font-mono font-semibold uppercase tracking-widest text-[#E50914] shadow-[0_0_15px_rgba(229,9,20,0.3)] backdrop-blur-md">
        <span className="h-2 w-2 rounded-full bg-[#E50914] animate-ping" />
        <span>BURN | BUILD | BECOME</span>
      </div>

      {/* Large Heading */}
      <h1 className="font-headline-lg text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-[1.05] drop-shadow-md">
        TRANSFORM <br />
        YOUR BODY. <br />
        BUILD YOUR{" "}
        <span className="text-[#E50914] drop-shadow-[0_0_30px_rgba(229,9,20,0.5)]">
          STRENGTH.
        </span>
      </h1>

      {/* Paragraph Subheading */}
      <p className="text-base sm:text-lg text-[#C5C5C5] font-normal leading-relaxed max-w-xl">
        Premium equipment, certified trainers, and personalized workout programs inside a high-end cinematic fitness facility.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2 w-full sm:w-auto">
        <a
          href="#register"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E50914] text-white font-extrabold text-sm uppercase tracking-widest px-8 py-4 rounded-full hover:bg-[#c70710] hover:scale-105 transition-all shadow-[0_0_30px_rgba(229,9,20,0.5)] cursor-pointer"
        >
          <span>JOIN NOW</span>
          <ArrowRight className="h-4 w-4" />
        </a>

        <a
          href="tel:+917074975231"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/30 bg-black/40 backdrop-blur-md text-white font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-full hover:border-[#E50914] hover:text-[#E50914] transition-all cursor-pointer"
        >
          <Phone className="h-4 w-4 text-[#E50914]" />
          <span>CALL NOW</span>
        </a>
      </div>

      {/* Trust Badges */}
      <div className="pt-2">
        <TrustBadges />
      </div>
    </div>
  );
}
