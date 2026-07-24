export * from "./theme";
export * from "./forms";

export interface NavItem {
  title: string;
  href: string;
  external?: boolean;
  disabled?: boolean;
}

export interface MembershipPlanPlaceholder {
  id: string;
  name: string;
  price: number;
  period: "monthly" | "yearly";
  description: string;
  features: string[];
  popular?: boolean;
}

export interface FAQItemPlaceholder {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface AmenityPlaceholder {
  id: string;
  title: string;
  description: string;
  iconName: string;
}
