"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock, CheckCircle } from "lucide-react";

const heroFormSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z
    .string()
    .min(10, "Valid phone number required")
    .regex(/^[0-9+\s-]{10,15}$/, "Invalid phone format"),
  email: z.string().email("Valid email required"),
  age: z.string().min(1, "Select age range"),
  gender: z.string().min(1, "Select gender"),
  fitnessGoal: z.string().min(1, "Select fitness goal"),
  preferredTiming: z.string().min(1, "Select preferred timing"),
  membershipPlan: z.string().min(1, "Select membership plan"),
});

type HeroFormValues = z.infer<typeof heroFormSchema>;

export function HeroForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<HeroFormValues>({
    resolver: zodResolver(heroFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      age: "",
      gender: "",
      fitnessGoal: "",
      preferredTiming: "",
      membershipPlan: "3_months",
    },
  });

  const onSubmit = async (data: HeroFormValues) => {
    setLoading(true);
    // Simulate lead registration API
    await new Promise((res) => setTimeout(res, 1200));
    console.log("Registered hero lead:", data);
    setLoading(false);
    setSubmitted(true);
    reset();
  };

  return (
    <div
      id="register"
      className="w-full rounded-3xl bg-[#151515] border border-white/[0.08] p-6 sm:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl relative z-20"
    >
      {/* Title */}
      <div className="mb-6 text-center">
        <h3 className="font-headline-lg text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
          START YOUR <span className="text-[#E50914]">FITNESS JOURNEY</span>
        </h3>
        <p className="text-xs sm:text-sm text-[#B5B5B5] mt-1">
          Fill out the form below to lock in your special offer.
        </p>
      </div>

      {submitted ? (
        <div className="py-8 text-center flex flex-col items-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-[#E50914]/20 text-[#E50914] flex items-center justify-center">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h4 className="text-xl font-bold uppercase text-white">Registration Received!</h4>
          <p className="text-sm text-[#B5B5B5] max-w-xs">
            Our certified trainer will contact you shortly to confirm your membership & schedule your first visit.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-xs text-[#E50914] font-bold uppercase underline pt-2 cursor-pointer"
          >
            Register Another Member
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Row 1: Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-[#B5B5B5] mb-1">
                Full Name *
              </label>
              <input
                {...register("fullName")}
                placeholder="John Doe"
                className="w-full h-11 rounded-xl bg-[#090909] border border-white/[0.08] px-3.5 text-sm text-white placeholder-neutral-500 focus:border-[#E50914] focus:outline-none transition-colors"
              />
              {errors.fullName && (
                <p className="text-[11px] text-red-400 mt-1">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#B5B5B5] mb-1">
                Phone Number *
              </label>
              <input
                {...register("phone")}
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="w-full h-11 rounded-xl bg-[#090909] border border-white/[0.08] px-3.5 text-sm text-white placeholder-neutral-500 focus:border-[#E50914] focus:outline-none transition-colors"
              />
              {errors.phone && (
                <p className="text-[11px] text-red-400 mt-1">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Row 2: Email & Age */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-[#B5B5B5] mb-1">
                Email Address *
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="john@example.com"
                className="w-full h-11 rounded-xl bg-[#090909] border border-white/[0.08] px-3.5 text-sm text-white placeholder-neutral-500 focus:border-[#E50914] focus:outline-none transition-colors"
              />
              {errors.email && (
                <p className="text-[11px] text-red-400 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#B5B5B5] mb-1">
                Age Group *
              </label>
              <select
                {...register("age")}
                className="w-full h-11 rounded-xl bg-[#090909] border border-white/[0.08] px-3.5 text-sm text-white focus:border-[#E50914] focus:outline-none transition-colors"
              >
                <option value="">Select Age</option>
                <option value="under_18">Under 18</option>
                <option value="18_25">18 - 25</option>
                <option value="26_35">26 - 35</option>
                <option value="36_50">36 - 50</option>
                <option value="50_plus">50+</option>
              </select>
              {errors.age && (
                <p className="text-[11px] text-red-400 mt-1">{errors.age.message}</p>
              )}
            </div>
          </div>

          {/* Row 3: Gender & Fitness Goal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-[#B5B5B5] mb-1">
                Gender *
              </label>
              <select
                {...register("gender")}
                className="w-full h-11 rounded-xl bg-[#090909] border border-white/[0.08] px-3.5 text-sm text-white focus:border-[#E50914] focus:outline-none transition-colors"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other / Prefer not to say</option>
              </select>
              {errors.gender && (
                <p className="text-[11px] text-red-400 mt-1">{errors.gender.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#B5B5B5] mb-1">
                Fitness Goal *
              </label>
              <select
                {...register("fitnessGoal")}
                className="w-full h-11 rounded-xl bg-[#090909] border border-white/[0.08] px-3.5 text-sm text-white focus:border-[#E50914] focus:outline-none transition-colors"
              >
                <option value="">Select Goal</option>
                <option value="weight_loss">Weight Loss</option>
                <option value="muscle_gain">Muscle Building</option>
                <option value="endurance">Endurance & Cardio</option>
                <option value="general">General Fitness</option>
              </select>
              {errors.fitnessGoal && (
                <p className="text-[11px] text-red-400 mt-1">{errors.fitnessGoal.message}</p>
              )}
            </div>
          </div>

          {/* Row 4: Preferred Timing & Membership Plan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-[#B5B5B5] mb-1">
                Preferred Timing *
              </label>
              <select
                {...register("preferredTiming")}
                className="w-full h-11 rounded-xl bg-[#090909] border border-white/[0.08] px-3.5 text-sm text-white focus:border-[#E50914] focus:outline-none transition-colors"
              >
                <option value="">Select Time</option>
                <option value="morning">Morning (5:00 AM - 10:00 AM)</option>
                <option value="afternoon">Afternoon (10:00 AM - 4:00 PM)</option>
                <option value="evening">Evening (4:00 PM - 11:00 PM)</option>
              </select>
              {errors.preferredTiming && (
                <p className="text-[11px] text-red-400 mt-1">{errors.preferredTiming.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#B5B5B5] mb-1">
                Membership *
              </label>
              <select
                {...register("membershipPlan")}
                className="w-full h-11 rounded-xl bg-[#090909] border border-white/[0.08] px-3.5 text-sm text-white focus:border-[#E50914] focus:outline-none transition-colors"
              >
                <option value="1_month">1 Month Standard</option>
                <option value="3_months">3 Months (No Reg Fee)</option>
                <option value="6_months">6 Months (Best Value)</option>
                <option value="12_months">12 Months (VIP Ultra)</option>
              </select>
              {errors.membershipPlan && (
                <p className="text-[11px] text-red-400 mt-1">{errors.membershipPlan.message}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-13 bg-[#E50914] text-white font-black text-sm uppercase tracking-widest rounded-full hover:bg-[#c70710] hover:scale-[1.02] transition-all shadow-[0_0_25px_rgba(229,9,20,0.4)] cursor-pointer mt-2 disabled:opacity-50"
          >
            {loading ? "REGISTERING..." : "REGISTER NOW"}
          </button>

          {/* Privacy Text */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#B5B5B5] pt-2">
            <Lock className="h-3.5 w-3.5 text-[#E50914]" />
            <span>Your information is safe with us.</span>
          </div>
        </form>
      )}
    </div>
  );
}
