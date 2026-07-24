"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  MessageCircle,
  Flame,
  Dumbbell,
  Sparkles,
  Award,
  Users,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { TrustBadges } from "./TrustBadges";

const CARDS = [
  // CARD 1: Transform Your Body
  {
    id: 1,
    tag: "YOUTH GYM RELOADED",
    tagIcon: Flame,
    headline: (
      <>
        TRANSFORM YOUR BODY. <br />
        <span className="text-[#1F6F50]">BUILD YOUR STRENGTH.</span>
      </>
    ),
    description: "Premium equipment, certified trainers, and personalized workout programs inside a bright, high-end fitness facility.",
    bgImage: "/images/cinematic-gym-bg.png",
    primaryCta: { label: "JOIN NOW", href: "#register", icon: ArrowRight },
    secondaryCta: { label: "CALL NOW", href: "tel:+917074975231", icon: Phone },
  },
  // CARD 2: Affordable Memberships
  {
    id: 2,
    tag: "FLEXIBLE PRICING",
    tagIcon: Sparkles,
    headline: (
      <>
        AFFORDABLE MEMBERSHIPS. <br />
        <span className="text-[#1F6F50]">PREMIUM EXPERIENCE.</span>
      </>
    ),
    highlights: [
      { label: "Monthly", value: "₹800/mo" },
      { label: "3 Months", value: "₹2200", badge: "Popular ⭐" },
      { label: "6 Months", value: "₹4000", badge: "Best Value ⭐" },
      { label: "1 Year", value: "₹6000", badge: "Best Deal 👑" },
    ],
    bgImage: "/images/slide-facilities-bg.png",
    primaryCta: { label: "VIEW PLANS", href: "#membership", icon: ArrowRight },
    secondaryCta: { label: "JOIN TODAY", href: "#register", icon: Sparkles },
  },
  // CARD 3: Premium Facilities
  {
    id: 3,
    tag: "WORLD-CLASS AMENITIES",
    tagIcon: Dumbbell,
    headline: (
      <>
        STATE-OF-THE-ART <br />
        <span className="text-[#1F6F50]">FITNESS FACILITY</span>
      </>
    ),
    listHighlights: [
      "Cardio Deck & Rowers",
      "Heavy Strength Racks",
      "Dedicated HIIT Zone",
      "Steam & Hot Showers",
      "Secure Locker Rooms",
    ],
    bgImage: "/images/slide-facilities-bg.png",
    primaryCta: { label: "EXPLORE FACILITIES", href: "#why-choose-us", icon: ArrowRight },
    secondaryCta: { label: "JOIN NOW", href: "#register", icon: Dumbbell },
  },
  // CARD 4: Certified Trainers
  {
    id: 4,
    tag: "EXPERT COACHING",
    tagIcon: Award,
    headline: (
      <>
        TRAIN WITH <br />
        <span className="text-[#1F6F50]">CERTIFIED COACHES</span>
      </>
    ),
    listHighlights: [
      "Personalized Strength Plans",
      "Custom Nutrition Guidance",
      "Targeted Fat Loss Programs",
      "1-on-1 Powerlifting Support",
    ],
    bgImage: "/images/slide-coaches-bg.png",
    primaryCta: { label: "BOOK CONSULTATION", href: "#register", icon: ArrowRight },
    secondaryCta: { label: "CALL A TRAINER", href: "tel:+917074975231", icon: Phone },
  },
  // CARD 5: Join the Community
  {
    id: 5,
    tag: "JOIN THE COMMUNITY",
    tagIcon: Users,
    headline: (
      <>
        JOIN A COMMUNITY THAT <br />
        <span className="text-[#1F6F50]">KEEPS YOU MOTIVATED</span>
      </>
    ),
    listHighlights: [
      "Friendly & Supportive Environment",
      "Ultra-Modern Equipment",
      "Clean & Spotless Facilities",
      "High-Energy Gym Atmosphere",
    ],
    bgImage: "/images/slide-community-bg.png",
    primaryCta: { label: "BECOME A MEMBER", href: "#register", icon: ArrowRight },
    secondaryCta: { label: "WHATSAPP US", href: "https://wa.me/917479207804?text=Hi%20Youth%20Gym%20Reloaded!%20I%20want%20to%20know%20more%20about%20membership.", icon: MessageCircle, isWhatsApp: true },
  },
];

export function Hero() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Sync scroll position with active dot indicator
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = container.firstElementChild?.clientWidth || 320;
    const index = Math.round(container.scrollLeft / cardWidth);
    if (index !== activeCardIndex && index >= 0 && index < CARDS.length) {
      setActiveCardIndex(index);
    }
  };

  const scrollToCard = (index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = container.firstElementChild?.clientWidth || 320;
    container.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
    setActiveCardIndex(index);
  };

  return (
    <section id="hero" className="pt-3 sm:pt-5 pb-8 bg-[#F8FAF8] overflow-hidden border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Swipe Hint Header */}
        <div className="px-4 sm:px-6 flex items-center justify-between text-xs font-mono font-bold uppercase tracking-widest text-[#6B7280]">
          <span className="text-[#1F6F50] flex items-center gap-1.5 font-bold">
            <Flame className="h-3.5 w-3.5 text-[#34A853]" />
            <span>FEATURE HIGHLIGHTS</span>
          </span>
          <span className="flex items-center gap-1 text-[#6B7280]">
            <span>Swipe</span>
            <ChevronRight className="h-3.5 w-3.5 text-[#34A853]" />
          </span>
        </div>

        {/* Horizontal Swipeable Feature Card Carousel */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 sm:px-6 py-2 scrollbar-none"
        >
          {CARDS.map((card) => {
            const TagIcon = card.tagIcon;
            return (
              <div
                key={card.id}
                className="snap-center shrink-0 w-[88vw] max-w-[360px] sm:w-[420px] lg:w-[460px] h-[480px] sm:h-[510px] rounded-3xl overflow-hidden shadow-lg border border-[#E507EB]/20 bg-white relative flex flex-col justify-between p-6 sm:p-7"
              >
                {/* Single Clean Background Image per Card */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <Image
                    src={card.bgImage}
                    alt="Youth Gym Feature"
                    fill
                    priority={card.id === 1}
                    className="object-cover object-center filter brightness-[0.9] contrast-[1.05]"
                  />
                  {/* Light Soft Gradient for Crisp Text Legibility */}
                  <div className="absolute inset-0 bg-white/70" />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/50 to-white/95" />
                </div>

                {/* Card Header Tag */}
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#1F6F50]/10 px-3.5 py-1 border border-[#1F6F50]/20 text-[11px] font-mono font-bold uppercase tracking-widest text-[#1F6F50] backdrop-blur-md shadow-sm">
                    <TagIcon className="h-3.5 w-3.5 text-[#34A853]" />
                    <span>{card.tag}</span>
                  </div>
                </div>

                {/* Card Main Typography & Body Content */}
                <div className="relative z-10 space-y-4 my-auto">
                  <h2 className="font-headline-lg text-2xl sm:text-3xl font-black uppercase text-[#1F2937] tracking-tight leading-tight">
                    {card.headline}
                  </h2>

                  {/* Standard Description */}
                  {card.description && (
                    <p className="text-xs sm:text-sm text-[#6B7280] font-normal leading-relaxed">
                      {card.description}
                    </p>
                  )}

                  {/* Membership Pricing Preview Grid (Card 2) */}
                  {card.highlights && (
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {card.highlights.map((h) => (
                        <div
                          key={h.label}
                          className="bg-white/90 border border-[#E5E7EB] p-2.5 rounded-xl text-center shadow-sm relative"
                        >
                          {h.badge && (
                            <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#F59E0B] text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase shadow-xs">
                              {h.badge}
                            </span>
                          )}
                          <div className="text-[10px] font-mono font-bold text-[#6B7280] uppercase">{h.label}</div>
                          <div className="text-xs font-black text-[#1F6F50] mt-0.5">{h.value}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Feature Lists (Cards 3, 4, 5) */}
                  {card.listHighlights && (
                    <div className="space-y-2 pt-1">
                      {card.listHighlights.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 bg-white/90 border border-[#E5E7EB] px-3 py-1.5 rounded-xl text-xs text-[#1F2937] shadow-xs"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#34A853] shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Action Buttons (Primary & Secondary CTA) */}
                <div className="relative z-10 flex items-center gap-2.5 pt-2">
                  <a
                    href={card.primaryCta.href}
                    className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-1.5 bg-[#34A853] text-white font-black text-[11px] sm:text-xs uppercase tracking-wider px-4 py-2.5 rounded-full hover:bg-[#2E9548] transition-all shadow-md cursor-pointer"
                  >
                    <span>{card.primaryCta.label}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>

                  <a
                    href={card.secondaryCta.href}
                    target={card.secondaryCta.isWhatsApp ? "_blank" : undefined}
                    rel={card.secondaryCta.isWhatsApp ? "noopener noreferrer" : undefined}
                    className={`flex-1 min-h-[44px] inline-flex items-center justify-center gap-1.5 border font-bold text-[11px] sm:text-xs uppercase tracking-wider px-4 py-2.5 rounded-full transition-all cursor-pointer ${
                      card.secondaryCta.isWhatsApp
                        ? "bg-[#25D366]/10 border-[#25D366]/50 text-[#25D366] hover:bg-[#25D366] hover:text-white"
                        : "border-[#1F6F50]/30 bg-white text-[#1F6F50] hover:bg-[#1F6F50] hover:text-white"
                    }`}
                  >
                    <card.secondaryCta.icon className={`h-3.5 w-3.5 ${card.secondaryCta.isWhatsApp ? "" : "text-[#1F6F50]"}`} />
                    <span>{card.secondaryCta.label}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Small Touch-Friendly Pagination Dots */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {CARDS.map((card, index) => (
            <button
              key={card.id}
              type="button"
              onClick={() => scrollToCard(index)}
              aria-label={`Go to card ${index + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                activeCardIndex === index
                  ? "w-6 bg-[#34A853]"
                  : "w-2 bg-[#CBD5E1] hover:bg-neutral-400"
              }`}
            />
          ))}
        </div>

        {/* Trust Badges Positioned ONCE Below Hero Card Carousel */}
        <div className="px-4 sm:px-6 pt-4">
          <TrustBadges />
        </div>
      </div>
    </section>
  );
}
