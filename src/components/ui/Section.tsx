import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  spacing?: "sm" | "md" | "lg" | "none";
  dark?: boolean;
}

export function Section({
  id,
  className,
  children,
  spacing = "md",
  dark = false,
  ...props
}: SectionProps) {
  const spacingMap = {
    none: "py-0",
    sm: "py-12 md:py-16",
    md: "py-16 md:py-24",
    lg: "py-24 md:py-32",
  };

  return (
    <section
      id={id}
      className={cn(
        "relative w-full overflow-hidden",
        spacingMap[spacing],
        dark ? "bg-[var(--color-dark)]" : "bg-transparent",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
