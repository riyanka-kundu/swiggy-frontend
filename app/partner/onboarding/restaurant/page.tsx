"use client";

import { useRouter } from "next/navigation";

import RestaurantForm from "@/components/onboarding/step1/restaurant/restaurant-form";

export default function RestaurantPage() {
  const router = useRouter();

  return (
    <RestaurantForm
      onNext={() => router.push("/partner/onboarding/document")}
    />
  );
}
