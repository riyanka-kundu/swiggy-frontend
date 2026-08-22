"use client";

import Menu from "@/components/onboarding/step3/menu/food-menu";
import { useRouter } from "next/navigation";

export default function AddFoodPage() {
  const router = useRouter();

  return <Menu onNext={() => router.push("/partner/onboarding/contract")} />;
}
