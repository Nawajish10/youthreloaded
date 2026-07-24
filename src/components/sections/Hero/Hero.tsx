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
  Flame,
  Dumbbell,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Award,
  Users,
  Sparkles,
} from "lucide-react";
import { TrustBadges } from "./TrustBadges";

const SLIDES = [
  // SLIDE 1: Welcome
  {
    id: 1,
    tag: "BURN | BUILD | BECOME",
    tagIcon: Flame,
    headline: (
      <>
        TRANSFORM <br />
        YOUR BODY. <br />
        BUILD YOUR <span className="text-[#E50914] drop-shadow-[0_0_30px_rgba(229,9,20,0.5)]">STRENGTH.</span>
      </>
    ),
    subheading: "Premium equipment, certified trainers, and personalized workout programs inside a high-end cinematic fitness facility.",
    bgImage: "/images/cinematic-gym-bg.png",
    modelImage: "/images/hero-model.png",
    primaryCta: { label: "JOIN NOW", href: "#register", icon: ArrowRight },
    secondaryCta: { label: "CALL NOW", href: "tel:+917074975231", icon: Phone },
    showTrustBadges: true,
  },
  // SLIDE 2: Membership Plans
  {
    id: 2,
    tag: "FLEXIBLE PRICING",
    tagIcon: Sparkles,
    headline: (
      <>
        AFFORDABLE <br />
        MEMBERSHIPS. <br />
        PREMIUM <span className="text-[#E50914] drop-shadow-[0_0_30px_rgba(229,9,20,0.5)]">EXPERIENCE.</span>
      </>
    ),
    subheading: "Transparent plans with zero registration fees on packages. Train with top-tier equipment at unbeatable rates.",
    bgImage: "/images/slide-facilities-bg.png",
    plansPreview: [
      { name: "Monthly", price: "₹800/mo" },
      { name: "3 Months", price: "₹2200", badge: "Popular ⭐" },
      { name: "6 Months", price: "₹4000", badge: "Best Value ⭐" },
      { name: "1 Year", price: "₹6000", badge: "Best Deal 👑" },
    ],
    primaryCta: { label: "JOIN TODAY", href: "#register", icon: ArrowRight },
    secondaryCta: { label: "VIEW ALL PLANS", href: "#membership", icon: Sparkles },
    showTrustBadges: false,
  },
  // SLIDE 3: Facilities
  {
    id: 3,
    tag: "WORLD-CLASS AMENITIES",
    tagIcon: Dumbbell,
    headline: (
      <>
        STATE-OF-THE-ART <br />
        FITNESS <span className="text-[#E50914] drop-shadow-[0_0_30px_rgba(229,9,20,0.5)]">FACILITY</span>
      </>
    ),
    subheading: "Equipped with heavy power racks, cardio decks, steam showers, personal nutrition support, and spacious locker rooms.",
    bgImage: "/images/slide-facilities-bg.png",
    facilitiesList: [
      "Cardio Deck & Rowers",
      "Heavy Strength Racks",
      "Dedicated HIIT Zone",
      "Steam & Hot Showers",
      "Secure Locker Rooms",
      "Nutrition & Diet Desk",
    ],
    primaryCta: { label: "EXPLORE FACILITIES", href: "#why-choose-us", icon: ArrowRight },
    secondaryCta: { label: "JOIN NOW", href: "#register", icon: Dumbbell },
    showTrustBadges: false,
  },
  // SLIDE 4: Personal Training
  {
    id: 4,
    tag: "EXPERT COACHING",
    tagIcon: Award,
    headline: (
      <>
        TRAIN WITH <br />
        CERTIFIED <span className="text-[#E50914] drop-shadow-[0_0_30px_rgba(229,9,20,0.5)]">COACHES</span>
      </>
    ),
    subheading: "Get 1-on-1 dedicated attention, custom hypertrophy programs, and fat-loss meal plans from certified fitness experts.",
    bgImage: "/images/slide-coaches-bg.png",
    coachingHighlights: [
      "Personalized Strength Plans",
      "Custom Nutrition Guidance",
      "Targeted Fat Loss Programs",
      "Posture & Injury Prevention",
    ],
    primaryCta: { label: "BOOK CONSULTATION", href: "#register", icon: ArrowRight },
    secondaryCta: { label: "CALL A TRAINER", href: "tel:+917074975231", icon: Phone },
    showTrustBadges: false,
  },
  // SLIDE 5: Community
  {
    id: 5,
    tag: "JOIN THE MOVEMENT",
    tagIcon: Users,
    headline: (
      <>
        JOIN A COMMUNITY <br />
        THAT KEEPS YOU <span className="text-[#E50914] drop-shadow-[0_0_30px_rgba(229,9,20,0.5)]">MOTIVATED</span>
      </>
    ),
    subheading: "Surround yourself with like-minded athletes, friendly trainers, and an energetic gym atmosphere every single day.",
    bgImage: "/images/slide-community-bg.png",
    communityBadges: [
      "Friendly & Supportive Vibe",
      "Clean & Hygienic Gym Floor",
      "Modern Sound & Lighting",
      "All Fitness Levels Welcome",
    ],
    primaryCta: { label: "BECOME A MEMBER", href: "#register", icon: ArrowRight },
    secondaryCta: { label: "WHATSAPP US", href: "https://wa.me/917479207804?text=Hi%20Youth%20Gym%20Reloaded!%20I%20want%20to%20know%20more%20about%20membership.", icon: MessageCircle, isWhatsApp: true },
    showTrustBadges: false,
  },
];

export function Hero() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const currentSlide = SLIDES[activeSlideIndex];

  // Auto-play timer (Change slide every 7 seconds)
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

  // Drag swipe handling
  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -50) {
      handleNextSlide();
    } else if (info.offset.x > 50) {
      handlePrevSlide();
    }
  };

  // Transition variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.98,
    }),
  };

  const TagIcon = currentSlide.tagIcon;

  return (
    <section
      id="hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-[90vh] lg:min-h-[85vh] w-full bg-[#090909] overflow-hidden flex flex-col justify-between border-b border-white/[0.08]"
    >
      {/* 1. Carousel Slide Content Container */}
      <div className="relative flex-1 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
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
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-10"
          >
            {/* Cinematic Slide Background Image with Vignettes & Ken Burns Effect */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <Image
                src={currentSlide.bgImage}
                alt="Youth Gym Interior"
                fill
                priority={currentSlide.id === 1}
                className="object-cover object-center filter brightness-[0.38] contrast-125 scale-105 transition-transform duration-[8000ms] ease-out animate-pulse"
              />
              {/* Dark Overlays for Ultra-Legibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#090909]/95 via-[#090909]/75 to-[#090909]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#090909_90%)]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-transparent to-[#090909]" />
            </div>

            {/* Left Column: Headline, Subheading, Cards, and CTAs */}
            <div className="lg:col-span-7 relative z-10 space-y-6 text-center lg:text-left">
              {/* Badge Tag */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 rounded-full bg-[#151515]/90 px-4 py-1.5 border border-[#E50914]/40 text-xs font-mono font-semibold uppercase tracking-widest text-[#E50914] shadow-[0_0_15px_rgba(229,9,20,0.3)] backdrop-blur-md"
              >
                <TagIcon className="h-3.5 w-3.5 text-[#E50914] animate-pulse" />
                <span>{currentSlide.tag}</span>
              </motion.div>

              {/* Animated Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-headline-lg text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-[1.08] drop-shadow-lg"
              >
                {currentSlide.headline}
              </motion.h1>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18 }}
                className="text-sm sm:text-base lg:text-lg text-neutral-300 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                {currentSlide.subheading}
              </motion.p>

              {/* Custom Slide Previews / Grid Content */}
              {/* Slide 2: Membership Plans Preview */}
              {currentSlide.plansPreview && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 max-w-xl mx-auto lg:mx-0"
                >
                  {currentSlide.plansPreview.map((plan) => (
                    <div
                      key={plan.name}
                      className="bg-[#141414]/90 border border-white/10 p-3 rounded-2xl text-center backdrop-blur-md relative"
                    >
                      {plan.badge && (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#E50914] text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase">
                          {plan.badge}
                        </span>
                      )}
                      <div className="text-[11px] font-mono font-bold text-neutral-400 uppercase">{plan.name}</div>
                      <div className="text-sm font-extrabold text-[#E50914] mt-0.5">{plan.price}</div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Slide 3: Facilities List */}
              {currentSlide.facilitiesList && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 max-w-xl mx-auto lg:mx-0"
                >
                  {currentSlide.facilitiesList.map((facility) => (
                    <div
                      key={facility}
                      className="flex items-center gap-2 bg-[#141414]/80 border border-white/10 px-3 py-2 rounded-xl text-xs text-neutral-200"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#E50914] shrink-0" />
                      <span className="truncate">{facility}</span>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Slide 4: Coaching Highlights */}
              {currentSlide.coachingHighlights && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 max-w-xl mx-auto lg:mx-0"
                >
                  {currentSlide.coachingHighlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 bg-[#141414]/80 border border-white/10 px-3.5 py-2.5 rounded-xl text-xs text-neutral-200"
                    >
                      <Zap className="h-4 w-4 text-[#E50914] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Slide 5: Community Badges */}
              {currentSlide.communityBadges && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 max-w-xl mx-auto lg:mx-0"
                >
                  {currentSlide.communityBadges.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 bg-[#141414]/80 border border-white/10 px-3.5 py-2.5 rounded-xl text-xs text-neutral-200"
                    >
                      <ShieldCheck className="h-4 w-4 text-[#E50914] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Slide 1 Trust Badges */}
              {currentSlide.showTrustBadges && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  className="pt-2 max-w-xl mx-auto lg:mx-0"
                >
                  <TrustBadges />
                </motion.div>
              )}

              {/* Action CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4 w-full sm:w-auto"
              >
                {/* Primary CTA */}
                <a
                  href={currentSlide.primaryCta.href}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E50914] text-white font-black text-xs sm:text-sm uppercase tracking-widest px-8 py-4 rounded-full hover:bg-[#c70710] hover:scale-105 transition-all shadow-[0_0_30px_rgba(229,9,20,0.5)] cursor-pointer"
                >
                  <span>{currentSlide.primaryCta.label}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>

                {/* Secondary CTA */}
                <a
                  href={currentSlide.secondaryCta.href}
                  target={currentSlide.secondaryCta.isWhatsApp ? "_blank" : undefined}
                  rel={currentSlide.secondaryCta.isWhatsApp ? "noopener noreferrer" : undefined}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 border font-bold text-xs sm:text-sm uppercase tracking-widest px-8 py-4 rounded-full transition-all cursor-pointer ${
                    currentSlide.secondaryCta.isWhatsApp
                      ? "bg-[#25D366]/10 border-[#25D366]/50 text-[#25D366] hover:bg-[#25D366] hover:text-white"
                      : "border-white/30 bg-black/40 backdrop-blur-md text-white hover:border-[#E50914] hover:text-[#E50914]"
                  }`}
                >
                  <currentSlide.secondaryCta.icon className={`h-4 w-4 ${currentSlide.secondaryCta.isWhatsApp ? "" : "text-[#E50914]"}`} />
                  <span>{currentSlide.secondaryCta.label}</span>
                </a>
              </motion.div>
            </div>

            {/* Right Column: Hero Visual Model (Slide 1) or Graphic Box */}
            <div className="lg:col-span-5 relative z-10 hidden lg:block">
              {currentSlide.modelImage ? (
                <div className="relative w-full h-[460px] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(229,9,20,0.25)] border border-white/10 group">
                  <Image
                    src={currentSlide.modelImage}
                    alt="Athletic Gym Model"
                    fill
                    priority
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-md border border-white/15 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-lg">
                    <div className="h-3 w-3 rounded-full bg-[#E50914] animate-ping" />
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      LIVE FITNESS ATMOSPHERE
                    </span>
                  </div>
                </div>
              ) : (
                /* Feature Highlight Card on Right Column for Slides 2-5 */
                <div className="w-full h-[420px] rounded-3xl bg-[#111111]/80 border border-white/10 p-8 flex flex-col justify-between backdrop-blur-xl relative overflow-hidden shadow-2xl">
                  <div className="absolute -top-10 -right-10 w-60 h-60 rounded-full bg-[#E50914]/20 blur-3xl pointer-events-none" />

                  <div className="space-y-4">
                    <div className="h-14 w-14 rounded-2xl bg-[#E50914]/15 text-[#E50914] flex items-center justify-center shadow-lg">
                      <TagIcon className="h-7 w-7" />
                    </div>
                    <h3 className="font-headline-lg text-2xl font-black uppercase text-white tracking-tight">
                      Youth Gym <span className="text-[#E50914]">Reloaded</span>
                    </h3>
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      Experience high-intensity strength training, expert coaching, and modern amenities designed to help you reach peak physical condition.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-neutral-400 uppercase">JOIN THE CLUB TODAY</span>
                    <a
                      href="#register"
                      className="px-5 py-2.5 bg-[#E50914] text-white text-xs font-bold uppercase rounded-full hover:bg-[#c70710] transition-colors"
                    >
                      Register Now →
                    </a>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. Carousel Controls Bar (Navigation Arrows & Bullet Pagination) */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between border-t border-white/10 bg-[#090909]/80 backdrop-blur-md">
        {/* Navigation Arrows */}
        <div className="flex items-center gap-2">
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

          <span className="text-xs font-mono font-bold text-neutral-400 ml-2">
            0{activeSlideIndex + 1} / 0{SLIDES.length}
          </span>
        </div>

        {/* Bullet Pagination Indicators */}
        <div className="flex items-center gap-2">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                activeSlideIndex === index
                  ? "w-8 bg-[#E50914] shadow-[0_0_10px_rgba(229,9,20,0.8)]"
                  : "w-2.5 bg-neutral-700 hover:bg-neutral-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
