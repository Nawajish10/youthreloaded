"use client";

import { motion } from "framer-motion";
import * as React from "react";

export interface ScaleProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  initialScale?: number;
  className?: string;
}

export function Scale({
  children,
  delay = 0,
  duration = 0.4,
  initialScale = 0.9,
  className,
}: ScaleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: initialScale }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
