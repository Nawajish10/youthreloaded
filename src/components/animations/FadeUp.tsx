"use client";

import { motion } from "framer-motion";
import * as React from "react";

export interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

export function FadeUp({
  children,
  delay = 0,
  duration = 0.5,
  distance = 30,
  className,
}: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
