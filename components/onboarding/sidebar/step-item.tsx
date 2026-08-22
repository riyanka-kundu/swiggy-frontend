import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Link from "next/link";

type StepItemProps = {
  title: string;
  href: string;
  step: number;
  currentStep: number;
  isLast?: boolean;
};

export default function StepItem({
  title,
  href,
  step,
  currentStep,
  isLast = false,
}: StepItemProps) {
  const completed = step < currentStep;
  const active = step === currentStep;
  const pending = !completed && !active;

  return (
    <Link
      href={pending ? "#" : href}
      aria-disabled={pending}
      onClick={(e) => pending && e.preventDefault()}
      className={cn(pending && "cursor-not-allowed")}
    >
      <div
        className={cn(
          "relative flex items-center gap-4 rounded-xl p-3 transition-all duration-200",

          active && "bg-primary/10",

          !active && !pending && "hover:bg-muted",
        )}
      >
        {/* connecting line */}
        {!isLast && (
          <span
            className={cn(
              "absolute left-8.75 top-13 h-[calc(100%-8px)] w-0.5",

              completed ? "bg-green-600" : "bg-muted-foreground/30",
            )}
          />
        )}

        <div
          className={cn(
            "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-semibold",

            completed && "border-green-600 bg-green-600 text-white",

            active && "border-primary bg-primary text-primary-foreground",

            pending && "border-muted-foreground/30 text-muted-foreground",
          )}
        >
          {completed ? <Check className="h-5 w-5" /> : step}
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Step {step}
          </span>

          <span
            className={cn(
              "text-sm font-medium",

              active && "text-primary",

              completed && "text-foreground",

              pending && "text-muted-foreground",
            )}
          >
            {title}
          </span>

          {active && (
            <span className="mt-0.5 text-xs font-medium text-orange-500">
              In Progress
            </span>
          )}

          {completed && (
            <span className="mt-0.5 text-xs font-medium text-green-600">
              Completed
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
