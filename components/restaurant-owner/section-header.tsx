import { CardDescription, CardTitle } from "@/components/ui/card";
import { ElementType } from "react";

export const SectionHeader = ({
  icon: Icon,
  title,
  description,
}: {
  icon: ElementType;
  title: string;
  description?: string;
}) => {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-5" />
      </div>

      <div>
        <CardTitle className="text-base">{title}</CardTitle>

        {description && (
          <CardDescription className="mt-1">{description}</CardDescription>
        )}
      </div>
    </div>
  );
};
