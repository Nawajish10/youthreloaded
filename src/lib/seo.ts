import { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  canonicalUrl?: string;
}

export function generateSEO({
  title,
  description,
  image,
  noIndex = false,
  canonicalUrl,
}: SEOProps = {}): Metadata {
  const metaTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const metaDescription = description || siteConfig.description;
  const metaImage = image || siteConfig.ogImage;
  const url = canonicalUrl || siteConfig.url;

  return {
    metadataBase: new URL(url),
    title: metaTitle,
    description: metaDescription,
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateGymJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "124 Fitness Boulevard, Suite 100",
      addressLocality: "Metro City",
      addressRegion: "NY",
      postalCode: "10001",
      addressCountry: "US",
    },
    openingHours: "Mo-Su 05:00-23:00",
    priceRange: "$$",
  };
}
