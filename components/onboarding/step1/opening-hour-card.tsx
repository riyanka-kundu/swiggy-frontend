"use client";

import { Controller, UseFormReturn } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { TRestaurant } from "@/schema/restaurant-schema";

type Props = {
  form: UseFormReturn<TRestaurant>;
};

export default function OpeningHoursCard({ form }: Props) {
  return (
    <Card className="rounded-2xl border-border/60 bg-background shadow-sm">
      <CardHeader className="space-y-1.5 px-6 pt-6">
        <CardTitle className="text-lg font-semibold tracking-tight">
          Opening Hours
        </CardTitle>

        <CardDescription className="text-sm text-muted-foreground">
          Set your restaurant opening and closing time.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <FieldGroup className="grid gap-x-6 gap-y-5 md:grid-cols-2">
          {/* Opening Time */}
          <Controller
            name="openingClosing.slots.0.open"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-2">
                <FieldLabel
                  htmlFor="opening-time"
                  className="text-sm font-medium"
                >
                  Opening Time
                </FieldLabel>

                <Input
                  {...field}
                  id="opening-time"
                  type="time"
                  aria-invalid={fieldState.invalid}
                  className="h-11 rounded-lg border-border bg-background px-3.5 text-sm shadow-none transition focus-visible:ring-2"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Closing Time */}
          <Controller
            name="openingClosing.slots.0.close"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-2">
                <FieldLabel
                  htmlFor="closing-time"
                  className="text-sm font-medium"
                >
                  Closing Time
                </FieldLabel>

                <Input
                  {...field}
                  id="closing-time"
                  type="time"
                  aria-invalid={fieldState.invalid}
                  className="h-11 rounded-lg border-border bg-background px-3.5 text-sm shadow-none transition focus-visible:ring-2"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
