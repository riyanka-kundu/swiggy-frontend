import StepSidebar from "@/components/onboarding/sidebar/step-sidebar";
import { ReactNode } from "react";

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full gap-6 px-4 py-10">
      <div className="hidden w-70 shrink-0 md:block">
        <StepSidebar />
      </div>

      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
