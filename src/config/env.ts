export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  googleMapsKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "",
  recaptchaSiteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
} as const;
