export const siteConfig = {
  name: "Youth Gym Reloaded",
  description:
    "BURN | BUILD | BECOME. Transform your body and mind with modern state-of-the-art gym facilities, elite trainers, and custom workout plans.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/images/youth-gym-logo.jpg",
  links: {
    instagram: "https://www.instagram.com/youthgym_reloaded?igsh=ZGp3bnBqMHNwNWlp",
    whatsapp: "https://wa.me/917479207804?text=Hi%20Youth%20Gym%20Reloaded!%20I%20want%20to%20know%20more%20about%20membership%20plans.",
    facebook: "https://facebook.com/youthgymreloaded",
    youtube: "https://youtube.com/youthgymreloaded",
  },
  contact: {
    email: "info@youthgymreloaded.com",
    phone: "+91 70749 75231",
    rawPhone: "+917074975231",
    whatsapp: "+91 74792 07804",
    rawWhatsapp: "917479207804",
    address: "124 Fitness Boulevard, Suite 100, Metro City",
  },
};

export type SiteConfig = typeof siteConfig;
