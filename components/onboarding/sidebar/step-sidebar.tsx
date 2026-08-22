"use client";

import StepItem from "@/components/onboarding/sidebar/step-item";
import { UtensilsCrossed } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const steps = [
  {
    step: 1,
    title: "Restaurant Information",
    href: "/partner/onboarding/restaurant",
  },
  {
    step: 2,
    title: "Restaurant Documents",
    href: "/partner/onboarding/document",
  },
  {
    step: 3,
    title: "Menu Setup",
    href: "/partner/onboarding/add-food",
  },
  {
    step: 4,
    title: "Partner Agreement",
    href: "/partner/onboarding/contract",
  },
];

export default function StepSidebar() {
  const pathname = usePathname();

  const currentStep = useMemo(() => {
    const activeStep = steps.find((step) => pathname.startsWith(step.href));

    return activeStep?.step ?? 1;
  }, [pathname]);

  return (
    <aside className="sticky top-20 h-fit w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
      {/* Brand header */}
      <div className="mb-6 flex items-center gap-2 border-b border-gray-100 pb-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-white">
          <UtensilsCrossed className="h-4.5 w-4.5" />
        </span>
        <div>
          <p className="text-[15px] font-semibold leading-tight text-gray-900">
            FoodExpress
          </p>
          <p className="text-[12px] leading-tight text-gray-400">
            Partner Onboarding
          </p>
        </div>
      </div>

      <div>
        {steps.map((step, idx) => (
          <StepItem
            key={step.step}
            step={step.step}
            currentStep={currentStep}
            title={step.title}
            href={step.href}
            isLast={idx === steps.length - 1}
          />
        ))}
      </div>
    </aside>
  );
}
