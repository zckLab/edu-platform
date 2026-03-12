import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SocialProofSection from "@/components/SocialProofSection";
import CoursesSection from "@/components/CoursesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CareerSection from "@/components/CareerSection";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <SocialProofSection />
      <CoursesSection />
      <div id="como-funciona">
        <HowItWorksSection />
      </div>
      <CareerSection />
      <CTASection />
      <div id="faq">
        <FAQSection />
      </div>
      <FooterSection />
    </div>
  );
};

export default Index;
