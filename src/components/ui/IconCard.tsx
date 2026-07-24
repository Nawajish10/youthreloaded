import * as React from "react";
import { IconWrapper } from "@/components/common/IconWrapper";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export interface IconCardProps extends React.HTMLAttributes<HTMLDivElement> {
  iconName: string;
  title: string;
  description: string;
  iconColor?: string;
}

export function IconCard({
  iconName,
  title,
  description,
  iconColor = "text-[var(--color-primary)]",
  className,
  ...props
}: IconCardProps) {
  return (
    <Card hoverEffect glow className={cn("group relative", className)} {...props}>
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900 border border-neutral-800 transition-transform duration-300 group-hover:scale-110">
        <IconWrapper name={iconName} className={cn("h-6 w-6", iconColor)} />
      </div>
      <h3 className="mb-2 text-lg font-bold text-white group-hover:text-[var(--color-primary)] transition-colors">
        {title}
      </h3>
      <p className="text-sm text-neutral-400 leading-relaxed">{description}</p>
    </Card>
  );
}
