import * as React from "react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#0a0a0a] text-[#e2e1eb] selection:bg-[#E50914] selection:text-white">
      <AnnouncementBar />
      <Header />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
}
