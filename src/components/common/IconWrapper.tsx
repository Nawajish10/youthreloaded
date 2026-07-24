import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

export interface IconWrapperProps {
  name: string;
  className?: string;
  size?: number;
  color?: string;
}

export function IconWrapper({
  name,
  className,
  size = 24,
  color,
}: IconWrapperProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (LucideIcons as Record<string, any>)[name] || LucideIcons.HelpCircle;

  return (
    <IconComponent
      size={size}
      color={color}
      className={cn("inline-block shrink-0 transition-colors", className)}
    />
  );
}
