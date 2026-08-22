
import HeroSection from "@/components/home/hero-section";
import HomeNavbar from "@/components/home/navbar";

import CategorySection from "@/components/home/category-section";
import CTASection from "@/components/home/cta-section";
import DineOutSection from "@/components/home/dineout-section";
import FeaturesSection from "@/components/home/feature-section";
import Footer from "@/components/home/footer";
import MartSection from "@/components/home/mart-section";

export default function HomeClient() {
  return (
    <main
      className="
        min-h-screen
        bg-background
        font-sans
        text-foreground
        selection:bg-primary
        selection:text-primary-foreground
      "
    >
      <HomeNavbar />

      <HeroSection />

      <FeaturesSection />

      <MartSection />

      <DineOutSection />

      <CategorySection />

      <CTASection />

      <Footer />
    </main>
  );
}
