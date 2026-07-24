"use client";

import React from "react";
import { FadeUp } from "@/components/animations/FadeUp";

export function FinalCTASection() {
  return (
    <section className="py-12 px-4 md:px-8 bg-[#0a0a0a] relative overflow-hidden">
      {/* Radial Gradient overlay */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#E50914] via-[#0a0a0a] to-[#0a0a0a]" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <FadeUp>
          <h2 className="font-display-xl text-display-xl text-white uppercase mb-6">
            Ready to Commit?
          </h2>
          <a
            className="inline-block w-full sm:w-auto px-12 bg-[#E50914] text-white font-bold py-4 rounded-full font-label-sm text-sm shadow-[0_0_30px_rgba(229,9,20,0.4)] hover:bg-[#c70710] hover:scale-105 transition-all uppercase tracking-widest"
            href="#register"
          >
            JOIN TODAY
          </a>
        </FadeUp>
      </div>
    </section>
  );
}
