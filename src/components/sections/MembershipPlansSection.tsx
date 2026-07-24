"use client";

import React from "react";
import { Check, Sparkles, Flame, Crown, ArrowRight } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";

export function MembershipPlansSection() {
  const plans = [
    {
      id: "monthly",
      title: "Monthly",
      price: "₹800",
      period: "/month",
      registration: "₹500 One-Time Registration",
      badge: null,
      highlight: false,
      features: [
        "Gym Access",
        "Cardio Deck",
        "Strength Area",
        "Locker Access",
        "Free Fitness Assessment",
      ],
      buttonText: "Choose Plan",
    },
    {
      id: "3_months",
      title: "3 Months",
      price: "₹2200",
      period: "",
      subtext: "₹733/month",
      registration: "Registration FREE",
      badge: "Most Popular",
      badgeIcon: Flame,
      highlight: true,
      saveTag: "Save ₹500",
      features: [
        "Everything in Monthly",
        "Nutrition Guidance",
        "Custom Workout Plan",
        "Save ₹500 Total",
        "Free Locker Access",
      ],
      buttonText: "Choose Plan",
    },
    {
      id: "6_months",
      title: "6 Months",
      price: "₹4000",
      period: "",
      subtext: "₹666/month",
      registration: "Registration FREE",
      badge: "Best Value",
      badgeIcon: Sparkles,
      highlight: false,
      saveTag: "Save ₹800+",
      features: [
        "Everything in 3 Months",
        "Priority Support",
        "Full Body Assessment",
        "Save ₹800+ Total",
        "Guest Pass Included",
      ],
      buttonText: "Choose Plan",
    },
    {
      id: "1_year",
      title: "1 Year",
      price: "₹6000",
      period: "",
      subtext: "₹500/month",
      registration: "Registration FREE",
      badge: "Best Deal",
      badgeIcon: Crown,
      highlight: false,
      saveTag: "Maximum Savings",
      features: [
        "Unlimited Gym Access",
        "Full VIP Benefits",
        "Best Annual Savings",
        "Priority Assistance",
        "Personalized Diet Chart",
      ],
      buttonText: "Choose Plan",
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative" id="membership">
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#151515] px-4 py-1.5 border border-white/10 text-xs font-mono font-bold uppercase tracking-widest text-[#E50914] mb-3">
              <span>Membership Plans</span>
            </div>
            <h2 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight leading-tight">
              Choose the Perfect Plan for <span className="text-[#E50914]">Your Fitness Goals</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-3">
              Flexible memberships designed for beginners and fitness enthusiasts. No hidden fees.
            </p>
          </div>

          {/* 4 Cards Grid with Mobile Swipe */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 pt-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:pb-0 scrollbar-none">
            {plans.map((plan) => {
              const BadgeIcon = plan.badgeIcon;
              return (
                <div
                  key={plan.id}
                  className={`snap-center shrink-0 w-[280px] sm:w-[320px] md:w-auto rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative transition-all duration-300 ${
                    plan.highlight
                      ? "bg-[#141414] border-2 border-[#E50914] shadow-[0_0_35px_rgba(229,9,20,0.3)] md:-translate-y-2"
                      : "bg-[#111111] border border-white/10 hover:border-[#E50914]/50 hover:-translate-y-1"
                  }`}
                >
                  {/* Card Badge */}
                  {plan.badge && (
                    <div className="absolute -top-3.5 right-6 bg-[#E50914] text-white text-[11px] font-mono font-extrabold uppercase px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                      {BadgeIcon && <BadgeIcon className="h-3.5 w-3.5" />}
                      <span>{plan.badge}</span>
                    </div>
                  )}

                  <div>
                    {/* Title */}
                    <div className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 mb-2">
                      {plan.title}
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="font-headline-lg text-4xl sm:text-5xl font-black text-white tracking-tight">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-xs text-neutral-400 font-medium">{plan.period}</span>
                      )}
                    </div>

                    {/* Monthly equivalent subtext */}
                    {plan.subtext && (
                      <div className="text-xs text-[#E50914] font-mono font-bold mb-2">
                        {plan.subtext}
                      </div>
                    )}

                    {/* Registration Tag */}
                    <div className="inline-block bg-[#1a1a1a] text-neutral-300 border border-white/10 rounded-lg px-3 py-1 text-xs font-mono font-semibold mb-6">
                      {plan.registration}
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 pt-2 border-t border-white/10">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-300">
                          <Check className="h-4 w-4 text-[#E50914] shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-8">
                    <a
                      href="#register"
                      className={`w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        plan.highlight
                          ? "bg-[#E50914] text-white hover:bg-[#c70710] shadow-[0_0_20px_rgba(229,9,20,0.4)]"
                          : "bg-transparent border border-white/20 text-white hover:border-[#E50914] hover:text-[#E50914]"
                      }`}
                    >
                      <span>{plan.buttonText}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Banner */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-[#171717] via-[#1f090a] to-[#171717] border border-[#E50914]/30 p-4 sm:p-6 text-center shadow-lg">
            <p className="text-sm sm:text-base font-mono font-bold text-white uppercase tracking-wider flex items-center justify-center gap-2">
              <span className="text-lg">🎉</span>
              <span>No Registration Fee on <strong className="text-[#E50914]">3, 6 & 12 Month</strong> Memberships</span>
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
