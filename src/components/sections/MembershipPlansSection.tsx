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
      badge: "Most Popular ⭐",
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
      badge: "Best Value ⭐",
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
      badge: "Best Deal 👑",
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
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#F8FAF8] relative border-b border-[#E5E7EB]" id="membership">
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#1F6F50]/10 px-4 py-1.5 border border-[#1F6F50]/20 text-xs font-mono font-bold uppercase tracking-widest text-[#1F6F50] mb-3">
              <span>Membership Plans</span>
            </div>
            <h2 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-[#1F2937] tracking-tight leading-tight">
              Choose the Perfect Plan for <span className="text-[#1F6F50]">Your Fitness Goals</span>
            </h2>
            <p className="text-sm sm:text-base text-[#6B7280] mt-3">
              Flexible memberships designed for beginners, students, and fitness enthusiasts. No hidden fees.
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
                      ? "bg-white border-2 border-[#34A853] shadow-xl md:-translate-y-2"
                      : "bg-white border border-[#E5E7EB] hover:border-[#34A853]/50 shadow-md hover:-translate-y-1"
                  }`}
                >
                  {/* Card Badge */}
                  {plan.badge && (
                    <div className="absolute -top-3.5 right-6 bg-[#F59E0B] text-white text-[11px] font-mono font-extrabold uppercase px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                      {BadgeIcon && <BadgeIcon className="h-3.5 w-3.5" />}
                      <span>{plan.badge}</span>
                    </div>
                  )}

                  <div>
                    {/* Title */}
                    <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#6B7280] mb-2">
                      {plan.title}
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="font-headline-lg text-4xl sm:text-5xl font-black text-[#1F2937] tracking-tight">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-xs text-[#6B7280] font-medium">{plan.period}</span>
                      )}
                    </div>

                    {/* Monthly equivalent subtext */}
                    {plan.subtext && (
                      <div className="text-xs text-[#1F6F50] font-mono font-bold mb-2">
                        {plan.subtext}
                      </div>
                    )}

                    {/* Registration Tag */}
                    <div className="inline-block bg-[#F8FAF8] text-[#1F2937] border border-[#E5E7EB] rounded-lg px-3 py-1 text-xs font-mono font-semibold mb-6">
                      {plan.registration}
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 pt-2 border-t border-[#E5E7EB]">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1F2937]">
                          <Check className="h-4 w-4 text-[#34A853] shrink-0" />
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
                          ? "bg-[#34A853] text-white hover:bg-[#2E9548] shadow-md"
                          : "bg-white border border-[#1F6F50]/30 text-[#1F6F50] hover:bg-[#1F6F50] hover:text-white"
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
          <div className="mt-12 rounded-2xl bg-[#1F6F50] border border-[#1F6F50]/30 p-4 sm:p-6 text-center shadow-md">
            <p className="text-sm sm:text-base font-mono font-bold text-white uppercase tracking-wider flex items-center justify-center gap-2">
              <span className="text-lg">🎉</span>
              <span>No Registration Fee on <strong className="text-[#F59E0B]">3, 6 & 12 Month</strong> Memberships</span>
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
