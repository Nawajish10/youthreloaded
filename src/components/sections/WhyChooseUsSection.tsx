"use client";

import React from "react";
import {
  Dumbbell,
  Zap,
  Target,
  Utensils,
  Sparkles,
  ShowerHead,
  Lock,
  Video,
  Wifi,
  Car,
  HeartPulse,
  Users,
} from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";

export function WhyChooseUsSection() {
  const features = [
    {
      title: "Certified Trainers",
      description: "Train with experienced professionals who guide you safely toward your fitness goals.",
      icon: Dumbbell,
    },
    {
      title: "Modern Equipment",
      description: "High-end machinery and free weights for all strength and cardio levels.",
      icon: Zap,
    },
    {
      title: "Personal Training",
      description: "Tailored 1-on-1 coaching designed around your specific fitness targets.",
      icon: Target,
    },
    {
      title: "Nutrition Guidance",
      description: "Expert diet plans to fuel your workouts and accelerate results.",
      icon: Utensils,
    },
    {
      title: "Recovery Area",
      description: "Dedicated spaces for stretching, foam rolling, and post-workout cool down.",
      icon: HeartPulse,
    },
    {
      title: "Steam & Shower",
      description: "Clean, luxurious steam rooms and hot showers to refresh after workouts.",
      icon: ShowerHead,
    },
    {
      title: "Locker Rooms",
      description: "Secure keyless lockers for your peace of mind while training.",
      icon: Lock,
    },
    {
      title: "CCTV Security",
      description: "24/7 round-the-clock video monitoring for maximum safety.",
      icon: Video,
    },
    {
      title: "Free Wi-Fi",
      description: "High-speed internet access throughout the entire facility.",
      icon: Wifi,
    },
    {
      title: "Parking Facility",
      description: "Spacious, dedicated parking for cars and two-wheelers.",
      icon: Car,
    },
    {
      title: "Hygienic Environment",
      description: "Sanitized equipment and spotless workout zones continuously maintained.",
      icon: Sparkles,
    },
    {
      title: "Friendly Community",
      description: "A welcoming, highly supportive atmosphere for beginners & pros alike.",
      icon: Users,
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#070707] relative" id="why-choose-us">
      {/* Subtle Glow Background */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#E50914]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <FadeUp>
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#151515] px-4 py-1.5 border border-white/10 text-xs font-mono font-bold uppercase tracking-widest text-[#E50914] mb-3">
              <span>Why Choose Us</span>
            </div>
            <h2 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight leading-tight">
              Everything You Need to <span className="text-[#E50914]">Achieve More</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-3">
              Train smarter with expert guidance, premium facilities, and a motivating environment.
            </p>
          </div>

          {/* 12 Feature Cards Grid (4x3 Desktop / 2-Column Mobile) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group rounded-2xl bg-[#111111] border border-white/10 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:border-[#E50914] hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(229,9,20,0.2)]"
                >
                  <div>
                    {/* Icon */}
                    <div className="h-12 w-12 rounded-xl bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-[#E50914] mb-4 group-hover:bg-[#E50914]/20 group-hover:border-[#E50914]/40 transition-all">
                      <Icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300 text-[#E50914]" />
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-base sm:text-lg text-white uppercase tracking-tight mb-2 group-hover:text-[#E50914] transition-colors">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
