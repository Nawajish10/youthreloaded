"use client";

import React from "react";
import { FadeUp } from "@/components/animations/FadeUp";
import { HeroContent } from "./HeroContent";
import { HeroImage } from "./HeroImage";
import { RegistrationFormSection } from "../RegistrationFormSection";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center w-full bg-[#090909] pt-6 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-white/[0.08]">
      {/* Background Volumetric Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-[#E50914]/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-[#FF2832]/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-10 lg:space-y-0">
        {/* Mobile-First Layout: Stacks Vertically on Mobile / 2-Column Split on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* 1. Hero Text Content & CTAs */}
          <div className="lg:col-span-6">
            <FadeUp>
              <HeroContent />
            </FadeUp>
          </div>

          {/* 2. Hero Image Visual (Centered, 45% Viewport Height on Mobile) */}
          <div className="lg:col-span-6">
            <FadeUp delay={0.15}>
              <div className="w-full max-w-lg mx-auto">
                <HeroImage />
              </div>
            </FadeUp>
          </div>
        </div>

        {/* 3. Multi-Step Conversational Onboarding Card (Below Hero Image on Mobile & Desktop) */}
        <FadeUp delay={0.25}>
          <div className="w-full max-w-2xl mx-auto pt-6 lg:pt-12">
            <RegistrationFormSection />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
