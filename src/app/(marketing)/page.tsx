import { Hero } from "@/components/sections/Hero/Hero";
import { RegistrationFormSection } from "@/components/sections/RegistrationFormSection";
import { MembershipPlansSection } from "@/components/sections/MembershipPlansSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { FacilitiesSection } from "@/components/sections/FacilitiesSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <RegistrationFormSection />
      <MembershipPlansSection />
      <WhyChooseUsSection />
      <FacilitiesSection />
      <FAQSection />
      <ContactSection />
      <FinalCTASection />
    </>
  );
}
