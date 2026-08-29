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

const isSelected = (value: string[] | undefined, day: string) =>
  (value || []).some((item) => item.toLowerCase() === day.toLowerCase());

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
          render={({ field, fieldState }) => {
            const selectedCount = days.filter((day) =>
              isSelected(field.value, day),
            ).length;
            const allSelected = selectedCount === days.length;

            const toggleDay = (day: string, isChecked: boolean) => {
              const current = field.value || [];

              if (isChecked) {
                if (!isSelected(current, day)) {
                  field.onChange([...current, day]);
                }
              } else {
                field.onChange(
                  current.filter((item) => item.toLowerCase() !== day.toLowerCase()),
                );
              }
            };

            return (
              <Field data-invalid={fieldState.invalid} className="space-y-3">
                <FieldLabel className="text-sm font-medium">
                  Available Days
                </FieldLabel>

                <FieldGroup className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    <label
                      className={[
                        "flex min-h-12 cursor-pointer items-center gap-3",
                        "rounded-lg border px-4 py-3",
                        "transition-all duration-150",
                        "hover:bg-muted/50",
                        allSelected
                          ? "border-primary/40 bg-primary/5"
                          : "border-border bg-background",
                      ].join(" ")}
                    >
                      <Checkbox
                        checked={allSelected}
                        onCheckedChange={(isChecked) => {
                          field.onChange(isChecked ? [...days] : []);
                        }}
                        className="size-4"
                      />

                      <span className="text-sm font-medium text-foreground">
                        Everyday
                      </span>
                    </label>

                    {days.map((day) => {
                      const checked = isSelected(field.value, day);

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
                            onCheckedChange={(isChecked) =>
                              toggleDay(day, !!isChecked)
                            }
                            className="size-4"
                          />

                          <span className="text-sm font-medium text-foreground">
                            {day}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </FieldGroup>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            );
          }}
        />
      </CardContent>
    </Card>
  );
}
