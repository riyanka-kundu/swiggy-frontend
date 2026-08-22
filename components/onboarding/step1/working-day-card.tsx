"use client";

import { Controller, UseFormReturn } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { TRestaurant } from "@/schema/restaurant-schema";

type Props = {
  form: UseFormReturn<TRestaurant>;
};

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function WorkingDaysCard({ form }: Props) {
  return (
    <Card className="rounded-2xl border-border/60 bg-background shadow-sm">
      <CardHeader className="space-y-1.5 px-6 pt-6">
        <CardTitle className="text-lg font-semibold tracking-tight">
          Working Days
        </CardTitle>

        <CardDescription className="text-sm text-muted-foreground">
          Select the days your restaurant is open.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <Controller
          name="workingDays"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="space-y-3">
              <FieldLabel className="text-sm font-medium">
                Available Days
              </FieldLabel>

              <FieldGroup className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {days.map((day) => {
                  const checked = field.value?.includes(day);

                  return (
                    <label
                      key={day}
                      className={[
                        "flex min-h-12 cursor-pointer items-center gap-3",
                        "rounded-lg border px-4 py-3",
                        "transition-all duration-150",
                        "hover:bg-muted/50",
                        checked
                          ? "border-primary/40 bg-primary/5"
                          : "border-border bg-background",
                      ].join(" ")}
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={(isChecked) => {
                          if (isChecked) {
                            field.onChange([...(field.value || []), day]);
                          } else {
                            field.onChange(
                              field.value?.filter((item) => item !== day),
                            );
                          }
                        }}
                        className="size-4"
                      />

                      <span className="text-sm font-medium text-foreground">
                        {day}
                      </span>
                    </label>
                  );
                })}
              </FieldGroup>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </CardContent>
    </Card>
  );
}
