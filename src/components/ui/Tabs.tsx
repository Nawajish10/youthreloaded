"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
  className?: string;
}

export function Tabs({ tabs, defaultTabId, className }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(
    defaultTabId || tabs[0]?.id || ""
  );

  const currentTab = tabs.find((t) => t.id === activeTab);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex border-b border-neutral-800 space-x-2 overflow-x-auto pb-1">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative px-4 py-2.5 text-sm font-semibold transition-colors shrink-0",
                isActive ? "text-[var(--color-primary)]" : "text-neutral-400 hover:text-white"
              )}
            >
              {tab.label}
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
      <div className="py-4 text-neutral-200">{currentTab?.content}</div>
    </div>
  );
}
