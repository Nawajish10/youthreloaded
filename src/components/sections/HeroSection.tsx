"use client";

import React from "react";
import { FadeUp } from "@/components/animations/FadeUp";

export function HeroSection() {
  return (
    <section className="relative min-h-[795px] flex flex-col justify-end pb-12 pt-36 px-4 md:px-8 bg-[#0c0e14]">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBdXW057YHXc3u3P0zRHRv2gMg4AGBC_vX6xfDsCPHtNLzVp3AiiYaB_iimpdnrYyUnMhc9SqGrhA2gptFiIYQCpxahE1iNyPKlcoP0sxq5iuf_Z8asLDQNUcaywaw-r2app2yMi3RejXncz_i8H6jfvL8HGQnk4ykTs44N3Z-GLQ8R3e_rgTWvK_LfI-kJXEz-1VNto0Yjj1WCTMTqo5DcdPGnGWa0oebTyheY81j-BUi9ZoWtOdNS_gBpNbefZHk-5T3ed4zm9BNR')",
          }}
        />
        {/* Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <FadeUp>
          {/* Trust Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1 bg-[#dc2626]/10 text-[#dc2626] px-3 py-1 rounded-full font-label-sm text-[12px] uppercase">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              Certified Trainers
            </span>
            <span className="inline-flex items-center gap-1 bg-[#1a1a1a] text-[#e2e1eb] px-3 py-1 rounded-full font-label-sm text-[12px] border border-white/5 uppercase">
              <span className="material-symbols-outlined text-[14px]">fitness_center</span>
              Premium Equipment
            </span>
          </div>

          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-white uppercase mb-4 leading-[1.1]">
            Transform Your Body.<br />
            <span className="text-[#dc2626]">Build Your Strength.</span>
          </h1>

          <p className="font-body-lg text-body-lg text-[#e6bdb8] mb-8 max-w-md">
            Experience peak performance in a distraction-free, premium environment designed for serious results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md">
            <a
              className="w-full bg-[#dc2626] text-white font-bold text-center py-4 rounded-full font-label-sm text-sm shadow-[0_0_20px_rgba(220,38,38,0.3)] uppercase tracking-widest hover:bg-red-700 transition-colors"
              href="#register"
            >
              JOIN NOW
            </a>
            <a
              className="w-full bg-transparent border-2 border-[#33343c] text-white text-center py-4 rounded-full font-label-sm text-sm flex justify-center items-center gap-2 hover:border-[#dc2626] hover:text-[#dc2626] transition-colors uppercase tracking-widest"
              href="tel:+1234567890"
            >
              <span className="material-symbols-outlined">call</span>
              CALL NOW
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
