"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Flame,
  Phone,
  MessageCircle,
  Dumbbell,
  Zap,
  Target,
  Crown,
  HeartPulse,
  Sun,
  Sunrise,
  Moon,
  Clock,
  RotateCcw,
} from "lucide-react";

// Form Schema for all 8 Steps
const onboardingSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  mobile: z
    .string()
    .min(10, "Valid 10-digit mobile number required")
    .regex(/^[0-9+\s-]{10,15}$/, "Invalid phone number format"),
  age: z.string().min(1, "Select or enter your age"),
  gender: z.string().min(1, "Please select your gender"),
  fitnessGoal: z.string().min(1, "Please select a fitness goal"),
  preferredTime: z.string().min(1, "Please select a preferred workout time"),
  membershipPlan: z.string().min(1, "Please select a membership plan"),
  email: z.string().email("Valid email required").optional().or(z.literal("")),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to be contacted",
  }),
});

type OnboardingValues = z.infer<typeof onboardingSchema>;

const TOTAL_STEPS = 8;

export function RegistrationFormSection() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [regId, setRegId] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<OnboardingValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      fullName: "",
      mobile: "",
      age: "18_25",
      gender: "male",
      fitnessGoal: "weight_loss",
      preferredTime: "morning",
      membershipPlan: "3_months",
      email: "",
      agreeToTerms: true,
    },
  });

  const formValues = watch();

  // Focus active input on step change
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentStep]);

  // Handle Step Validation and Advancement
  const handleNextStep = async () => {
    let isValid = false;

    if (currentStep === 1) {
      isValid = await trigger("fullName");
    } else if (currentStep === 2) {
      isValid = await trigger("mobile");
    } else if (currentStep === 3) {
      isValid = await trigger("age");
    } else if (currentStep === 4) {
      isValid = await trigger("gender");
    } else if (currentStep === 5) {
      isValid = await trigger("fitnessGoal");
    } else if (currentStep === 6) {
      isValid = await trigger("preferredTime");
    } else if (currentStep === 7) {
      isValid = await trigger("membershipPlan");
    }

    if (isValid && currentStep < TOTAL_STEPS) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Keyboard "Enter" key handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (currentStep < TOTAL_STEPS) {
        handleNextStep();
      }
    }
  };

  // Final Form Submission
  const onSubmit = async (data: OnboardingValues) => {
    setLoading(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        setRegId(result.registrationId);
        setSubmitted(true);
      } else {
        alert("Registration error: " + (result.message || "Please check details"));
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const progressPercentage = Math.round((currentStep / TOTAL_STEPS) * 100);

  // Animation variants
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.96,
    }),
  };

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#070707] relative overflow-hidden" id="register">
      {/* Ambient Red Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#E50914]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header Section Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#171717] px-4 py-1.5 border border-[#E50914]/40 text-xs font-mono font-bold uppercase tracking-widest text-[#E50914] shadow-[0_0_15px_rgba(229,9,20,0.25)]">
            <Flame className="h-4 w-4 animate-pulse text-[#E50914]" />
            <span>Fast 1-Minute Registration</span>
          </div>
        </div>

        {/* Main Card Container */}
        <div className="w-full rounded-3xl bg-[#111111] border border-white/10 p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl relative min-h-[500px] flex flex-col justify-between">
          {!submitted ? (
            <>
              {/* Progress Indicator Header */}
              <div className="mb-6 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider">
                  <span className="text-[#E50914]">Step {currentStep} of {TOTAL_STEPS}</span>
                  <span className="text-neutral-400">{progressPercentage}% Complete</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 rounded-full bg-[#1a1a1a] overflow-hidden border border-white/5">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#c70710] to-[#E50914] rounded-full shadow-[0_0_12px_rgba(229,9,20,0.6)]"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Form Content / Cards */}
              <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown} className="flex-1 flex flex-col justify-between">
                <div className="relative overflow-hidden py-2 my-auto">
                  <AnimatePresence custom={direction} mode="wait">
                    {/* CARD 1: Full Name */}
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="space-y-5"
                      >
                        <div>
                          <h3 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white tracking-tight leading-tight">
                            Welcome! What&apos;s your <span className="text-[#E50914]">full name?</span>
                          </h3>
                          <p className="text-sm text-neutral-400 mt-2">
                            We&apos;ll use this to personalize your experience & membership pass.
                          </p>
                        </div>

                        <div className="pt-2">
                          <input
                            {...register("fullName")}
                            ref={(e) => {
                              register("fullName").ref(e);
                              inputRef.current = e;
                            }}
                            placeholder="John Doe"
                            className="w-full h-14 rounded-2xl bg-[#080808] border border-white/15 px-5 text-base sm:text-lg text-white placeholder-neutral-600 focus:border-[#E50914] focus:ring-2 focus:ring-[#E50914]/30 focus:outline-none transition-all"
                          />
                          {errors.fullName && (
                            <p className="text-xs text-red-400 mt-2 font-medium">{errors.fullName.message}</p>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* CARD 2: Mobile Number */}
                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="space-y-5"
                      >
                        <div>
                          <h3 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white tracking-tight leading-tight">
                            What&apos;s your <span className="text-[#E50914]">mobile number?</span>
                          </h3>
                          <p className="text-sm text-neutral-400 mt-2">
                            Our fitness advisor will contact you within 30 minutes to confirm your visit.
                          </p>
                        </div>

                        <div className="pt-2">
                          <input
                            {...register("mobile")}
                            ref={(e) => {
                              register("mobile").ref(e);
                              inputRef.current = e;
                            }}
                            type="tel"
                            placeholder="+91 98765 43210"
                            className="w-full h-14 rounded-2xl bg-[#080808] border border-white/15 px-5 text-base sm:text-lg text-white placeholder-neutral-600 focus:border-[#E50914] focus:ring-2 focus:ring-[#E50914]/30 focus:outline-none transition-all font-mono"
                          />
                          {errors.mobile && (
                            <p className="text-xs text-red-400 mt-2 font-medium">{errors.mobile.message}</p>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* CARD 3: Age */}
                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="space-y-5"
                      >
                        <div>
                          <h3 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white tracking-tight leading-tight">
                            What&apos;s your <span className="text-[#E50914]">age group?</span>
                          </h3>
                          <p className="text-sm text-neutral-400 mt-2">
                            Helps us tailor your workout intensity and safety guidelines.
                          </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                          {[
                            { label: "Under 18", val: "under_18" },
                            { label: "18 - 25 Years", val: "18_25" },
                            { label: "26 - 35 Years", val: "26_35" },
                            { label: "36 - 50 Years", val: "36_50" },
                            { label: "50+ Years", val: "50_plus" },
                          ].map((item) => {
                            const isSelected = formValues.age === item.val;
                            return (
                              <button
                                type="button"
                                key={item.val}
                                onClick={() => setValue("age", item.val, { shouldValidate: true })}
                                className={`p-4 rounded-2xl border text-sm font-bold text-center transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-[#E50914] border-[#E50914] text-white shadow-[0_0_20px_rgba(229,9,20,0.4)] scale-[1.02]"
                                    : "bg-[#080808] border-white/10 text-neutral-300 hover:border-white/30"
                                }`}
                              >
                                {item.label}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* CARD 4: Gender */}
                    {currentStep === 4 && (
                      <motion.div
                        key="step4"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="space-y-5"
                      >
                        <div>
                          <h3 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white tracking-tight leading-tight">
                            Select your <span className="text-[#E50914]">gender</span>
                          </h3>
                          <p className="text-sm text-neutral-400 mt-2">
                            Used for customized training recommendations and facility access.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                          {[
                            { label: "Male", val: "male", icon: "🏃‍♂️" },
                            { label: "Female", val: "female", icon: "🏃‍♀️" },
                            { label: "Other", val: "other", icon: "✨" },
                          ].map((item) => {
                            const isSelected = formValues.gender === item.val;
                            return (
                              <button
                                type="button"
                                key={item.val}
                                onClick={() => {
                                  setValue("gender", item.val, { shouldValidate: true });
                                  handleNextStep();
                                }}
                                className={`p-5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-[#1f090a] border-[#E50914] text-white shadow-[0_0_25px_rgba(229,9,20,0.3)] scale-[1.02]"
                                    : "bg-[#080808] border-white/10 text-neutral-300 hover:border-white/30"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl">{item.icon}</span>
                                  <span className="font-bold text-base uppercase tracking-wide">{item.label}</span>
                                </div>
                                <div
                                  className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                                    isSelected ? "border-[#E50914] bg-[#E50914]" : "border-neutral-700"
                                  }`}
                                >
                                  {isSelected && <CheckCircle2 className="h-3.5 w-3.5 text-white" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* CARD 5: Fitness Goal */}
                    {currentStep === 5 && (
                      <motion.div
                        key="step5"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="space-y-5"
                      >
                        <div>
                          <h3 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white tracking-tight leading-tight">
                            What&apos;s your primary <span className="text-[#E50914]">fitness goal?</span>
                          </h3>
                          <p className="text-sm text-neutral-400 mt-2">
                            Select the main objective you want to achieve with Youth Gym Reloaded.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          {[
                            { label: "Weight Loss", desc: "Burn fat & get lean", val: "weight_loss", icon: Flame },
                            { label: "Muscle Gain", desc: "Build mass & strength", val: "muscle_gain", icon: Dumbbell },
                            { label: "Strength Training", desc: "Heavy lifting & power", val: "strength", icon: Zap },
                            { label: "Cardio & Stamina", desc: "Heart health & endurance", val: "endurance", icon: HeartPulse },
                            { label: "General Fitness", desc: "Overall tone & energy", val: "general", icon: Target },
                            { label: "Personal Training", desc: "1-on-1 expert coaching", val: "personal_training", icon: Crown },
                          ].map((item) => {
                            const Icon = item.icon;
                            const isSelected = formValues.fitnessGoal === item.val;
                            return (
                              <button
                                type="button"
                                key={item.val}
                                onClick={() => {
                                  setValue("fitnessGoal", item.val, { shouldValidate: true });
                                }}
                                className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-[#1f090a] border-[#E50914] text-white shadow-[0_0_20px_rgba(229,9,20,0.3)] scale-[1.01]"
                                    : "bg-[#080808] border-white/10 text-neutral-300 hover:border-white/30"
                                }`}
                              >
                                <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${isSelected ? "bg-[#E50914] text-white" : "bg-[#171717] text-[#E50914]"}`}>
                                  <Icon className="h-5 w-5" />
                                </div>
                                <div>
                                  <div className="font-bold text-sm uppercase text-white tracking-wide">{item.label}</div>
                                  <div className="text-[11px] text-neutral-400">{item.desc}</div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* CARD 6: Preferred Workout Time */}
                    {currentStep === 6 && (
                      <motion.div
                        key="step6"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="space-y-5"
                      >
                        <div>
                          <h3 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white tracking-tight leading-tight">
                            When do you prefer to <span className="text-[#E50914]">work out?</span>
                          </h3>
                          <p className="text-sm text-neutral-400 mt-2">
                            Select your preferred time slot for training.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                          {[
                            { label: "Morning", timing: "5:00 AM - 10:00 AM", val: "morning", icon: Sunrise },
                            { label: "Afternoon", timing: "10:00 AM - 4:00 PM", val: "afternoon", icon: Sun },
                            { label: "Evening", timing: "4:00 PM - 11:00 PM", val: "evening", icon: Moon },
                            { label: "Flexible Timing", timing: "Anytime", val: "flexible", icon: Clock },
                          ].map((item) => {
                            const Icon = item.icon;
                            const isSelected = formValues.preferredTime === item.val;
                            return (
                              <button
                                type="button"
                                key={item.val}
                                onClick={() => {
                                  setValue("preferredTime", item.val, { shouldValidate: true });
                                }}
                                className={`p-5 rounded-2xl border text-left flex items-center gap-4 transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-[#1f090a] border-[#E50914] text-white shadow-[0_0_20px_rgba(229,9,20,0.3)] scale-[1.01]"
                                    : "bg-[#080808] border-white/10 text-neutral-300 hover:border-white/30"
                                }`}
                              >
                                <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${isSelected ? "bg-[#E50914] text-white" : "bg-[#171717] text-[#E50914]"}`}>
                                  <Icon className="h-6 w-6" />
                                </div>
                                <div>
                                  <div className="font-bold text-base uppercase text-white tracking-wide">{item.label}</div>
                                  <div className="text-xs text-neutral-400 font-mono mt-0.5">{item.timing}</div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* CARD 7: Membership Plan */}
                    {currentStep === 7 && (
                      <motion.div
                        key="step7"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="space-y-5"
                      >
                        <div>
                          <h3 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white tracking-tight leading-tight">
                            Which membership are you <span className="text-[#E50914]">interested in?</span>
                          </h3>
                          <p className="text-sm text-neutral-400 mt-2">
                            Select a plan to lock in your pass & special registration offer.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                          {[
                            { label: "Monthly", price: "₹800/mo", sub: "+ ₹500 Registration", badge: null, val: "1_month" },
                            { label: "3 Months", price: "₹2200 Total", sub: "Registration FREE", badge: "Most Popular ⭐", val: "3_months" },
                            { label: "6 Months", price: "₹4000 Total", sub: "Registration FREE", badge: "Best Value ⭐", val: "6_months" },
                            { label: "1 Year", price: "₹6000 Total", sub: "Registration FREE", badge: "Best Deal 👑", val: "12_months" },
                          ].map((item) => {
                            const isSelected = formValues.membershipPlan === item.val;
                            return (
                              <button
                                type="button"
                                key={item.val}
                                onClick={() => {
                                  setValue("membershipPlan", item.val, { shouldValidate: true });
                                }}
                                className={`p-5 rounded-2xl border text-left relative transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-[#1f090a] border-[#E50914] text-white shadow-[0_0_25px_rgba(229,9,20,0.35)] scale-[1.02]"
                                    : "bg-[#080808] border-white/10 text-neutral-300 hover:border-white/30"
                                }`}
                              >
                                {item.badge && (
                                  <span className="absolute -top-2.5 right-4 bg-[#E50914] text-white text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded-full shadow-md">
                                    {item.badge}
                                  </span>
                                )}
                                <div className="font-headline-lg text-lg font-black uppercase text-white tracking-wide">{item.label}</div>
                                <div className="text-xl font-extrabold text-[#E50914] mt-1">{item.price}</div>
                                <div className="text-xs text-neutral-400 font-mono mt-1">{item.sub}</div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* CARD 8: Final Step & Confirmation */}
                    {currentStep === 8 && (
                      <motion.div
                        key="step8"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="space-y-5"
                      >
                        <div>
                          <h3 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white tracking-tight leading-tight">
                            Almost done! <span className="text-[#E50914]">Submit your registration</span>
                          </h3>
                          <p className="text-sm text-neutral-400 mt-2">
                            Provide an optional email for your digital membership pass & confirmation.
                          </p>
                        </div>

                        <div className="space-y-4 pt-2">
                          <div>
                            <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5 font-semibold">
                              Email Address (Optional)
                            </label>
                            <input
                              {...register("email")}
                              ref={(e) => {
                                register("email").ref(e);
                                inputRef.current = e;
                              }}
                              type="email"
                              placeholder="john@example.com"
                              className="w-full h-14 rounded-2xl bg-[#080808] border border-white/15 px-5 text-base text-white placeholder-neutral-600 focus:border-[#E50914] focus:ring-2 focus:ring-[#E50914]/30 focus:outline-none transition-all"
                            />
                            {errors.email && (
                              <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
                            )}
                          </div>

                          <div className="pt-2">
                            <label className="flex items-start gap-3 cursor-pointer text-xs sm:text-sm text-neutral-300">
                              <input
                                type="checkbox"
                                {...register("agreeToTerms")}
                                className="mt-1 rounded border-neutral-700 bg-neutral-900 text-[#E50914] focus:ring-[#E50914] h-4 w-4"
                              />
                              <span className="leading-relaxed">
                                I agree to be contacted regarding my membership enquiry.
                              </span>
                            </label>
                            {errors.agreeToTerms && (
                              <p className="text-xs text-red-400 mt-1 font-medium">{errors.agreeToTerms.message}</p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer Controls (Back & Continue / Submit Buttons) */}
                <div className="pt-8 border-t border-white/10 flex items-center justify-between gap-4 mt-6">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-5 py-3 rounded-full border border-white/20 text-neutral-300 hover:text-white hover:border-white text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Back</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {currentStep < TOTAL_STEPS ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-8 py-3.5 rounded-full bg-[#E50914] text-white text-xs font-black uppercase tracking-widest hover:bg-[#c70710] hover:scale-105 transition-all shadow-[0_0_20px_rgba(229,9,20,0.4)] flex items-center gap-2 cursor-pointer"
                    >
                      <span>Continue</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-4 rounded-full bg-[#E50914] text-white text-xs font-black uppercase tracking-widest hover:bg-[#c70710] hover:scale-105 transition-all shadow-[0_0_30px_rgba(229,9,20,0.5)] flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <span>{loading ? "SUBMITTING..." : "SUBMIT REGISTRATION"}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </form>
            </>
          ) : (
            /* SUCCESS SCREEN */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="py-12 text-center flex flex-col items-center justify-center space-y-6 my-auto"
            >
              <div className="h-24 w-24 rounded-full bg-[#E50914]/20 text-[#E50914] flex items-center justify-center shadow-[0_0_40px_rgba(229,9,20,0.4)] animate-bounce">
                <CheckCircle2 className="h-12 w-12" />
              </div>

              <div>
                <h4 className="font-headline-lg text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
                  🎉 Registration <span className="text-[#E50914]">Submitted Successfully!</span>
                </h4>
                {regId && (
                  <div className="inline-block mt-3 bg-[#171717] border border-[#E50914]/50 px-5 py-2 rounded-full text-xs font-mono font-bold text-[#E50914] shadow-md">
                    PASS ID: {regId}
                  </div>
                )}
              </div>

              <p className="text-sm sm:text-base text-neutral-300 max-w-md leading-relaxed">
                Thank you for your interest! Our certified fitness team will contact you shortly to help you begin your fitness journey.
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
                <a
                  href="tel:+917074975231"
                  className="w-full sm:flex-1 py-3.5 bg-[#E50914] text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-[#c70710] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(229,9,20,0.4)]"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call Now</span>
                </a>

                <a
                  href="https://wa.me/917479207804?text=Hi%20Youth%20Gym%20Reloaded!%20I%20just%20submitted%20my%20registration."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-3.5 bg-[#171717] border border-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-full hover:border-[#E50914] hover:text-[#E50914] transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-4 w-4 text-[#E50914]" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setCurrentStep(1);
                  reset();
                }}
                className="text-xs text-[#E50914] font-bold uppercase underline pt-4 cursor-pointer hover:text-white transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Register Another Member</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
