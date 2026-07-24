import type { Metadata } from "next";
import { Anton, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import QueryProvider from "@/components/providers/QueryProvider";
import { generateGymJsonLd, generateSEO } from "@/lib/seo";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = generateSEO({
  title: "Youth Reloaded - Premium Gym Registration",
  description:
    "Transform your body and build your strength at Youth Reloaded Gym. Premium facilities, certified trainers, and transparent membership plans.",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = generateGymJsonLd();

  return (
    <html
      lang="en"
      className={`dark bg-[#090909] ${anton.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="icon" href="/images/youth-gym-logo.jpg" type="image/jpeg" />
        <link rel="shortcut icon" href="/images/youth-gym-logo.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/images/youth-gym-logo.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-[#090909] text-[#e2e1eb] font-body-md min-h-screen selection:bg-[#E50914] selection:text-white">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
