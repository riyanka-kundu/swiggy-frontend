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
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { TContract } from "@/schema/restaurant-schema";

type Props = {
  form: UseFormReturn<TContract>;
};

export default function DeclareActionCard({ form }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Declaration</CardTitle>
        <CardDescription>
          Review and accept the terms to complete onboarding.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Controller
            name="agreed"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <label className="flex items-start gap-3 rounded-md border p-4 cursor-pointer">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(!!checked)}
                    aria-invalid={fieldState.invalid}
                  />
                  <span className="text-sm">
                    I have read and agree to the partner terms, commission
                    structure, and privacy policy. I confirm that all
                    information provided during onboarding is true and correct.
                  </span>
                </label>
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
