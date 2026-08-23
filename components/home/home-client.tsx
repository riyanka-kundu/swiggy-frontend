
import HeroSection from "@/components/home/hero-section";
import HomeNavbar from "@/components/home/navbar";

import CTASection from "@/components/home/cta-section";
import DineOutSection from "@/components/home/dineout-section";
import FeaturesSection from "@/components/home/feature-section";
import FoodItemsSection from "@/components/home/food-items-section";
import Footer from "@/components/home/footer";
import RestaurantSection from "@/components/home/restaurant-section";

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
      <RestaurantSection />
      <FoodItemsSection />
      <DineOutSection />
      <CTASection />
      <Footer />
    </main>
  );
}

