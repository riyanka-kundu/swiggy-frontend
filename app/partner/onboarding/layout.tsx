import StepSidebar from "@/components/onboarding/sidebar/step-sidebar";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto grid w-full grid-cols-1 gap-6 px-4 py-10 md:grid-cols-[280px_1fr]">
      <StepSidebar />

      <main>{children}</main>
    </div>
  );
}
