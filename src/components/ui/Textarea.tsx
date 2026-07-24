import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[100px] w-full rounded-[var(--radius-md)] border bg-[var(--color-dark-surface)] px-3.5 py-2.5 text-sm text-neutral-100 placeholder:text-neutral-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 resize-y",
          error
            ? "border-[var(--color-danger)] focus-visible:ring-[var(--color-danger)]"
            : "border-[var(--color-dark-border)] focus-visible:border-[var(--color-primary)] focus-visible:ring-[var(--color-primary)]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
