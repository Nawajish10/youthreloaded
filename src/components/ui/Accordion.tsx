"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemData {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  defaultOpenId?: string;
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({
  items,
  defaultOpenId,
  allowMultiple = false,
  className,
}: AccordionProps) {
  const [openIds, setOpenIds] = React.useState<string[]>(
    defaultOpenId ? [defaultOpenId] : []
  );

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn("space-y-3 w-full", className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div
            key={item.id}
            className="rounded-[var(--radius-lg)] border border-[var(--color-dark-border)] bg-[var(--color-dark-surface)] overflow-hidden transition-colors"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="flex w-full items-center justify-between p-4 sm:p-5 text-left font-semibold text-white hover:text-[var(--color-primary)] transition-colors focus:outline-none"
            >
              <span>{item.title}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 text-neutral-400 shrink-0 transition-transform duration-300",
                  isOpen && "rotate-180 text-[var(--color-primary)]"
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <div className="px-4 pb-5 sm:px-5 text-sm text-neutral-400 border-t border-neutral-800/60 pt-3 leading-relaxed">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
