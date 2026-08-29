"use client";

import { ModeToggle } from "@/components/mode-toggle";
import DeliveryContent from "@/components/partner/delivery-content";
import DineoutContent from "@/components/partner/dineout-content";
import PartnerHero from "@/components/partner/partner-hero";
import PartnerToggle from "@/components/partner/partner-toggle";

import { applyRestaurant } from "@/redux/slice/partner-slice";
import type { AppDispatch, RootState } from "@/redux/store/store";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function RestaurantLandingPage() {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const { loading } = useSelector((state: RootState) => state.partner);

  const [activeTab, setActiveTab] = useState<"delivery" | "dineout">(
    "delivery",
  );

  const [email, setEmail] = useState("");

  const handleContinue = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    if (loading) return;

    console.log("Sending payload:", {
      email,
    });

    try {
      const res = await dispatch(applyRestaurant({ email })).unwrap();

      console.log("Response:", res);

      toast.success("OTP sent successfully");

      router.push(`/partner/otp?email=${encodeURIComponent(res.data.email)}`);
    } catch (error) {
      console.log("Apply error:", error);
      toast.error(error as string);
    }
  };

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      {/* Theme Toggle */}
      <div className="absolute right-6 top-6 z-50">
        <ModeToggle />
      </div>

      <PartnerHero
        activeTab={activeTab}
        email={email}
        setEmail={setEmail}
        onContinue={handleContinue}
        loading={loading}
      />

      <PartnerToggle activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "delivery" ? <DeliveryContent /> : <DineoutContent />}
    </main>
  );
}
