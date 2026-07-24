import {
  AmenityPlaceholder,
  FAQItemPlaceholder,
  MembershipPlanPlaceholder,
  NavItem,
} from "@/types";

export const NAV_LINKS: NavItem[] = [
  { title: "Home", href: "#hero" },
  { title: "Programs", href: "#programs" },
  { title: "Amenities", href: "#amenities" },
  { title: "Plans", href: "#membership" },
  { title: "Trainers", href: "#trainers" },
  { title: "FAQ", href: "#faq" },
  { title: "Contact", href: "#contact" },
];

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/youthgym_reloaded?igsh=ZGp3bnBqMHNwNWlp", icon: "Instagram" },
  { label: "Facebook", href: "https://facebook.com", icon: "Facebook" },
  { label: "Twitter", href: "https://twitter.com", icon: "Twitter" },
  { label: "YouTube", href: "https://youtube.com", icon: "Youtube" },
];

export const CONTACT_INFO = {
  phone: "+91 70749 75231",
  rawPhone: "+917074975231",
  whatsapp: "+91 74792 07804",
  rawWhatsapp: "917479207804",
  email: "info@youthgymreloaded.com",
  address: "Youth Gym Reloaded, Main Fitness Boulevard",
  workingHours: "Mon - Sun: 5:00 AM - 11:00 PM",
};

export const MEMBERSHIP_PLANS_PLACEHOLDER: MembershipPlanPlaceholder[] = [
  {
    id: "basic",
    name: "Standard Pass",
    price: 39,
    period: "monthly",
    description: "Access to strength equipment & cardio zone.",
    features: [
      "Full Gym Floor Access",
      "Locker Room & Showers",
      "Free High-Speed Wi-Fi",
      "1 Fitness Consultation",
    ],
  },
  {
    id: "pro",
    name: "VIP Elite",
    price: 79,
    period: "monthly",
    description: "Full access + unlimited classes & sauna.",
    features: [
      "All Standard Pass Features",
      "Unlimited Group Classes",
      "Sauna & Recovery Spa",
      "2 Personal Training Sessions",
      "Guest Pass (2/month)",
    ],
    popular: true,
  },
  {
    id: "annual",
    name: "Ultra Founder Pass",
    price: 699,
    period: "yearly",
    description: "All-inclusive VIP treatment for 12 months.",
    features: [
      "Unlimited 24/7 VIP Access",
      "Private Locker Included",
      "Unlimited Personal Training Prep",
      "Nutrition & Body Scan Monthly",
      "Unlimited Guest Passes",
    ],
  },
];

export const AMENITIES_PLACEHOLDER: AmenityPlaceholder[] = [
  {
    id: "strength",
    title: "Heavy Iron Zone",
    description: "Custom power racks, olympic platforms & dumbells up to 150 lbs.",
    iconName: "Dumbbell",
  },
  {
    id: "cardio",
    title: "Cardio & HIIT Lab",
    description: "Interactive treadmills, stairmasters & assault bikes with media displays.",
    iconName: "Activity",
  },
  {
    id: "recovery",
    title: "Infrared Sauna & Cryo",
    description: "Advanced recovery pods, cold plunge tubs & hydro massage lounge.",
    iconName: "Zap",
  },
  {
    id: "coaching",
    title: "Elite Master Trainers",
    description: "Certified strength & conditioning coaches tailored to your targets.",
    iconName: "Award",
  },
];

export const FAQS_PLACEHOLDER: FAQItemPlaceholder[] = [
  {
    id: "faq-1",
    question: "What are the operating hours?",
    answer: "Our facilities are open 7 days a week from 5:00 AM to 11:00 PM.",
  },
  {
    id: "faq-2",
    question: "Is there a long-term commitment required?",
    answer: "No! We offer flexible month-to-month plans as well as discounted annual plans.",
  },
  {
    id: "faq-3",
    question: "Can I get a free trial pass before joining?",
    answer: "Yes, you can register on this page to claim a free 1-day pass.",
  },
];
