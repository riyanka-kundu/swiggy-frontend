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

import { TMenuInput } from "@/schema/restaurant-schema";

type Props = {
  form: UseFormReturn<TMenuInput>;
};

export default function Price({ form }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing</CardTitle>
        <CardDescription>
          Set the base price, discount, GST, and preparation time.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup className="grid gap-5 md:grid-cols-2">
          {/* Base Price */}
          <Controller
            name="basePrice"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="menu-base-price">Base Price</FieldLabel>
                <Input
                  {...field}
                  value={(field.value ?? "") as string | number}
                  id="menu-base-price"
                  type="number"
                  min={0}
                  step="0.01"
                  aria-invalid={fieldState.invalid}
                  placeholder="249"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Discount Price */}
          <Controller
            name="discountPrice"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="menu-discount-price">
                  Discount Price
                </FieldLabel>
                <Input
                  {...field}
                  value={(field.value ?? "") as string | number}
                  id="menu-discount-price"
                  type="number"
                  min={0}
                  step="0.01"
                  aria-invalid={fieldState.invalid}
                  placeholder="199"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* GST */}
          <Controller
            name="gst"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="menu-gst">GST (%)</FieldLabel>
                <Input
                  {...field}
                  value={(field.value ?? "") as string | number}
                  id="menu-gst"
                  type="number"
                  min={0}
                  step="0.01"
                  aria-invalid={fieldState.invalid}
                  placeholder="5"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Preparation Time */}
          <div className="grid grid-cols-2 gap-3">
            <Controller
              name="preparationTime.min"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="menu-prep-time-min">
                    Prep Time Min (mins)
                  </FieldLabel>
                  <Input
                    {...field}
                    value={(field.value ?? "") as string | number}
                    id="menu-prep-time-min"
                    type="number"
                    min={0}
                    aria-invalid={fieldState.invalid}
                    placeholder="10"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="preparationTime.max"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="menu-prep-time-max">
                    Prep Time Max (mins)
                  </FieldLabel>
                  <Input
                    {...field}
                    value={(field.value ?? "") as string | number}
                    id="menu-prep-time-max"
                    type="number"
                    min={0}
                    aria-invalid={fieldState.invalid}
                    placeholder="20"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
