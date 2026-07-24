"use client";

import { motion } from "framer-motion";
import * as React from "react";

export interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.4,
  className,
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
