import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-0.5 text-xs font-semibold tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-primary-light)] text-[var(--color-primary)] border border-[var(--color-primary)]/30",
        secondary:
          "bg-cyan-500/10 text-[var(--color-secondary)] border border-cyan-500/30",
        accent:
          "bg-purple-500/10 text-[var(--color-accent)] border border-purple-500/30",
        neutral:
          "bg-neutral-800 text-neutral-300 border border-neutral-700",
        success:
          "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
        warning:
          "bg-amber-500/10 text-amber-400 border border-amber-500/30",
        danger:
          "bg-red-500/10 text-red-400 border border-red-500/30",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
