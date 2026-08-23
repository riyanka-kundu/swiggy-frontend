import { ElementType } from "react";

export const InfoItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: ElementType;
  label: string;
  value?: string | number | null;
}) => {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
        <Icon className="size-4" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>

        <p className="mt-1 wrap-break-word text-sm font-medium">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
};
