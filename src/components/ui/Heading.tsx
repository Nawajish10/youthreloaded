import * as React from "react";
import { HeadingTag } from "@/types";
import { cn } from "@/lib/utils";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingTag;
  subtitle?: string;
  badge?: string;
  align?: "left" | "center" | "right";
  gradient?: boolean;
}

export function Heading({
  as: Component = "h2",
  subtitle,
  badge,
  align = "left",
  gradient = false,
  className,
  children,
  ...props
}: HeadingProps) {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  const tagSizes: Record<HeadingTag, string> = {
    h1: "text-4xl sm:text-5xl md:text-6xl font-black tracking-tight",
    h2: "text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight",
    h3: "text-2xl sm:text-3xl font-bold tracking-tight",
    h4: "text-xl sm:text-2xl font-bold",
    h5: "text-lg sm:text-xl font-semibold",
    h6: "text-base font-semibold",
  };

  return (
    <div className={cn("flex flex-col mb-8 max-w-3xl", alignClasses[align])}>
      {badge && (
        <span className="mb-3 inline-block rounded-full bg-[var(--color-primary-light)] px-3 py-1 text-xs font-semibold text-[var(--color-primary)] border border-[var(--color-primary)]/30 uppercase tracking-widest">
          {badge}
        </span>
      )}
      <Component
        className={cn(
          tagSizes[Component],
          "text-white leading-tight",
          gradient && "bg-gradient-to-r from-white via-neutral-200 to-[var(--color-primary)] bg-clip-text text-transparent",
          className
        )}
        {...props}
      >
        {children}
      </Component>
      {subtitle && (
        <p className="mt-3 text-base sm:text-lg text-neutral-400 font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
