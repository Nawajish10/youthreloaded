"use client";

import React from "react";
import { FadeUp } from "@/components/animations/FadeUp";
import { ArrowRight } from "lucide-react";

export function FinalCTASection() {
  return (
    <section className="py-16 px-4 md:px-8 bg-[#1F6F50] relative overflow-hidden text-white shadow-inner">
      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
        <FadeUp>
          <h2 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight">
            Ready to Begin Your Fitness Journey?
          </h2>
          <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto">
            Lock in your 1-minute registration pass today and start training with expert guidance.
          </p>
          <div className="pt-2">
            <a
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-4 bg-[#34A853] text-white font-extrabold text-xs uppercase tracking-widest rounded-full shadow-lg hover:bg-[#2E9548] hover:scale-105 transition-all cursor-pointer"
              href="#register"
            >
              <span>REGISTER TODAY</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
