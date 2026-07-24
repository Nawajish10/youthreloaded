export type ColorVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "neutral"
  | "dark"
  | "light";

export type ComponentSize = "sm" | "md" | "lg" | "xl";

export type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface ThemeTokens {
  colors: Record<ColorVariant, string>;
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    glow: string;
  };
}
