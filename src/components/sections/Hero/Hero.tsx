"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Phone,
  MessageCircle,
  Dumbbell,
  Sparkles,
  Award,
  Users,
  Flame,
} from "lucide-react";
import { TrustBadges } from "./TrustBadges";

const SLIDES = [
  // SLIDE 1: Welcome / Modern Gym Interior
  {
    id: 1,
    tag: "YOUTH GYM RELOADED",
    tagIcon: Flame,
    headline: (
      <>
        TRANSFORM YOUR BODY. <br />
        <span className="text-[#E50914]">BUILD YOUR STRENGTH.</span>
      </>
    ),
    subheading: "Premium equipment, certified trainers, and personalized workout programs inside a high-end cinematic fitness facility.",
    bgImage: "/images/cinematic-gym-bg.png",
    primaryCta: { label: "JOIN NOW", href: "#register", icon: ArrowRight },
    secondaryCta: { label: "CALL NOW", href: "tel:+917074975231", icon: Phone },
    showTrustBadges: true,
  },
  // SLIDE 2: Strength & Membership
  {
    id: 2,
    tag: "FLEXIBLE MEMBERSHIPS",
    tagIcon: Sparkles,
    headline: (
      <>
        AFFORDABLE MEMBERSHIPS. <br />
        <span className="text-[#E50914]">PREMIUM EXPERIENCE.</span>
      </>
    ),
    subheading: "Flexible plans from ₹800/mo to ₹6000/year. Zero registration fee on 3, 6, and 12-month membership packages.",
    bgImage: "/images/slide-facilities-bg.png",
    primaryCta: { label: "JOIN TODAY", href: "#register", icon: ArrowRight },
    secondaryCta: { label: "VIEW ALL PLANS", href: "#membership", icon: Sparkles },
    showTrustBadges: true,
  },
  // SLIDE 3: Cardio & Functional Training Zone
  {
    id: 3,
    tag: "WORLD-CLASS AMENITIES",
    tagIcon: Dumbbell,
    headline: (
      <>
        STATE-OF-THE-ART <br />
        <span className="text-[#E50914]">FITNESS FACILITY</span>
      </>
    ),
    subheading: "Equipped with heavy power racks, cardio decks, steam showers, personal nutrition support, and spacious locker rooms.",
    bgImage: "/images/slide-facilities-bg.png",
    primaryCta: { label: "EXPLORE FACILITIES", href: "#why-choose-us", icon: ArrowRight },
    secondaryCta: { label: "JOIN NOW", href: "#register", icon: Dumbbell },
    showTrustBadges: true,
  },
  // SLIDE 4: Personal Training
  {
    id: 4,
    tag: "EXPERT COACHING",
    tagIcon: Award,
    headline: (
      <>
        TRAIN WITH <br />
        <span className="text-[#E50914]">CERTIFIED COACHES</span>
      </>
    ),
    subheading: "Get 1-on-1 dedicated attention, custom hypertrophy programs, and fat-loss meal plans from certified fitness experts.",
    bgImage: "/images/slide-coaches-bg.png",
    primaryCta: { label: "BOOK CONSULTATION", href: "#register", icon: ArrowRight },
    secondaryCta: { label: "CALL A TRAINER", href: "tel:+917074975231", icon: Phone },
    showTrustBadges: true,
  },
  // SLIDE 5: Community
  {
    id: 5,
    tag: "MOTIVATING COMMUNITY",
    tagIcon: Users,
    headline: (
      <>
        JOIN A COMMUNITY THAT <br />
        <span className="text-[#E50914]">KEEPS YOU MOTIVATED</span>
      </>
    ),
    subheading: "Surround yourself with like-minded athletes, friendly trainers, and an energetic gym atmosphere every single day.",
    bgImage: "/images/slide-community-bg.png",
    primaryCta: { label: "BECOME A MEMBER", href: "#register", icon: ArrowRight },
    secondaryCta: { label: "WHATSAPP US", href: "https://wa.me/917479207804?text=Hi%20Youth%20Gym%20Reloaded!%20I%20want%20to%20know%20more%20about%20membership.", icon: MessageCircle, isWhatsApp: true },
    showTrustBadges: true,
  },
];

export function Hero() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const currentSlide = SLIDES[activeSlideIndex];

  // Auto-play timer (Switch slide every 7 seconds, pauses on interaction)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, [activeSlideIndex, isPaused]);

  const handleNextSlide = () => {
    setDirection(1);
    setActiveSlideIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrevSlide = () => {
    setDirection(-1);
    setActiveSlideIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > activeSlideIndex ? 1 : -1);
    setActiveSlideIndex(index);
  };

  // Drag swipe handling for mobile & desktop
  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -50) {
      handleNextSlide();
    } else if (info.offset.x > 50) {
      handlePrevSlide();
    }
  };

  // Slide transition animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const TagIcon = currentSlide.tagIcon;

  return (
    <section
      id="hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-[85vh] lg:min-h-[90vh] w-full bg-[#090909] overflow-hidden flex flex-col justify-between border-b border-white/10"
    >
      {/* 1. Carousel Slide Container */}
      <div className="relative flex-1 flex items-center justify-center py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentSlide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-5xl mx-auto text-center z-10 space-y-6 sm:space-y-8"
          >
            {/* Single High-Quality Background Image per Slide (Clean 45% Overlay, No Red Glows) */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <Image
                src={currentSlide.bgImage}
                alt="Youth Gym Background"
                fill
                priority={currentSlide.id === 1}
                className="object-cover object-center filter brightness-[0.55] contrast-[1.1] scale-100 transition-transform duration-700"
              />
              {/* Soft Dark Vignette for Crisp Text Contrast */}
              <div className="absolute inset-0 bg-[#090909]/45" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#090909]/80 via-transparent to-[#090909]/90" />
            </div>

            {/* Mobile-First Text Stack */}
            <div className="relative z-10 max-w-4xl mx-auto space-y-5 sm:space-y-6">
              {/* Badge Tag */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 rounded-full bg-black/60 px-4 py-1.5 border border-white/20 text-xs font-mono font-bold uppercase tracking-widest text-[#E50914] backdrop-blur-md shadow-md"
              >
                <TagIcon className="h-3.5 w-3.5 text-[#E50914]" />
                <span>{currentSlide.tag}</span>
              </motion.div>

              {/* Bold Typography Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-headline-lg text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-[1.08] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
              >
                {currentSlide.headline}
              </motion.h1>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18 }}
                className="text-base sm:text-lg lg:text-xl text-neutral-200 font-normal leading-relaxed max-w-2xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              >
                {currentSlide.subheading}
              </motion.p>

              {/* Primary & Secondary CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 pt-2 w-full max-w-md mx-auto"
              >
                {/* Primary CTA */}
                <a
                  href={currentSlide.primaryCta.href}
                  className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#E50914] text-white font-black text-xs sm:text-sm uppercase tracking-widest px-8 py-3.5 rounded-full hover:bg-[#c70710] hover:scale-105 transition-all shadow-[0_0_20px_rgba(229,9,20,0.4)] cursor-pointer"
                >
                  <span>{currentSlide.primaryCta.label}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>

                {/* Secondary CTA */}
                <a
                  href={currentSlide.secondaryCta.href}
                  target={currentSlide.secondaryCta.isWhatsApp ? "_blank" : undefined}
                  rel={currentSlide.secondaryCta.isWhatsApp ? "noopener noreferrer" : undefined}
                  className={`w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 border font-bold text-xs sm:text-sm uppercase tracking-widest px-8 py-3.5 rounded-full transition-all cursor-pointer ${
                    currentSlide.secondaryCta.isWhatsApp
                      ? "bg-[#25D366]/10 border-[#25D366]/50 text-[#25D366] hover:bg-[#25D366] hover:text-white"
                      : "border-white/30 bg-black/50 backdrop-blur-md text-white hover:border-[#E50914] hover:text-[#E50914]"
                  }`}
                >
                  <currentSlide.secondaryCta.icon className={`h-4 w-4 ${currentSlide.secondaryCta.isWhatsApp ? "" : "text-[#E50914]"}`} />
                  <span>{currentSlide.secondaryCta.label}</span>
                </a>
              </motion.div>

              {/* 2-Column Trust Badges */}
              {currentSlide.showTrustBadges && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="pt-3 max-w-xl mx-auto"
                >
                  <TrustBadges />
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. Controls & Pagination Bar */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between border-t border-white/10 bg-[#090909]/90 backdrop-blur-md">
        {/* Navigation Arrows (Desktop visible, hidden on mobile) */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrevSlide}
              aria-label="Previous Slide"
              className="h-10 w-10 rounded-full bg-[#151515] border border-white/15 text-neutral-300 hover:text-white hover:border-[#E50914] hover:bg-[#E50914]/20 transition-all flex items-center justify-center cursor-pointer shadow-md"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={handleNextSlide}
              aria-label="Next Slide"
              className="h-10 w-10 rounded-full bg-[#151515] border border-white/15 text-neutral-300 hover:text-white hover:border-[#E50914] hover:bg-[#E50914]/20 transition-all flex items-center justify-center cursor-pointer shadow-md"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <span className="text-xs font-mono font-bold text-neutral-400">
            0{activeSlideIndex + 1} / 0{SLIDES.length}
          </span>
        </div>

        {/* Small Touch-Friendly Pagination Dots */}
        <div className="flex items-center gap-2">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                activeSlideIndex === index
                  ? "w-6 bg-[#E50914]"
                  : "w-2 bg-neutral-600 hover:bg-neutral-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
