"use client";

import { motion } from "framer-motion";
import * as React from "react";

export interface StaggerProps {
  children: React.ReactNode;
  staggerChildren?: number;
  delayChildren?: number;
  className?: string;
}

export function Stagger({
  children,
  staggerChildren = 0.1,
  delayChildren = 0,
  className,
}: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren,
            delayChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
