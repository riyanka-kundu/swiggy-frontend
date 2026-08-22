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

export default function BasicDetailsCard({ form }: Props) {
  return (
    <Card className="rounded-2xl border-border/60 bg-background shadow-sm">
      <CardHeader className="space-y-1.5 px-6 pt-6">
        <CardTitle className="text-lg font-semibold tracking-tight">
          Basic Details
        </CardTitle>

        <CardDescription className="text-sm text-muted-foreground">
          Enter your restaurant&apos;s basic information.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <FieldGroup className="grid gap-x-6 gap-y-5 md:grid-cols-2">
          {/* Restaurant Name */}
          <Controller
            name="restaurantName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-2">
                <FieldLabel
                  htmlFor="basic-details-restaurant-name"
                  className="text-sm font-medium"
                >
                  Restaurant Name
                </FieldLabel>

                <Input
                  {...field}
                  id="basic-details-restaurant-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Spice Garden"
                  autoComplete="off"
                  className="h-11 rounded-lg border-border bg-background px-3.5 text-sm shadow-none transition focus-visible:ring-2"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Owner Name */}
          <Controller
            name="ownerName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-2">
                <FieldLabel
                  htmlFor="basic-details-owner-name"
                  className="text-sm font-medium"
                >
                  Owner Name
                </FieldLabel>

                <Input
                  {...field}
                  id="basic-details-owner-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="John Doe"
                  autoComplete="off"
                  className="h-11 rounded-lg border-border bg-background px-3.5 text-sm shadow-none transition focus-visible:ring-2"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Location */}
          <Controller
            name="location"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-2">
                <FieldLabel
                  htmlFor="basic-details-location"
                  className="text-sm font-medium"
                >
                  Location
                </FieldLabel>

                <Input
                  {...field}
                  id="basic-details-location"
                  aria-invalid={fieldState.invalid}
                  placeholder="Kolkata, West Bengal"
                  autoComplete="off"
                  className="h-11 rounded-lg border-border bg-background px-3.5 text-sm shadow-none transition focus-visible:ring-2"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Email */}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-2">
                <FieldLabel
                  htmlFor="basic-details-email"
                  className="text-sm font-medium"
                >
                  Email
                </FieldLabel>

                <Input
                  {...field}
                  id="basic-details-email"
                  type="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="owner@spicegarden.com"
                  autoComplete="off"
                  className="h-11 rounded-lg border-border bg-background px-3.5 text-sm shadow-none transition focus-visible:ring-2"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Phone */}
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-2">
                <FieldLabel
                  htmlFor="basic-details-phone"
                  className="text-sm font-medium"
                >
                  Phone Number
                </FieldLabel>

                <Input
                  {...field}
                  id="basic-details-phone"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  aria-invalid={fieldState.invalid}
                  placeholder="9876543210"
                  autoComplete="off"
                  className="h-11 rounded-lg border-border bg-background px-3.5 text-sm shadow-none transition focus-visible:ring-2"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* WhatsApp Number */}
          <Controller
            name="whatsappNumber"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-2">
                <FieldLabel
                  htmlFor="basic-details-whatsapp"
                  className="text-sm font-medium"
                >
                  WhatsApp Number
                </FieldLabel>

                <Input
                  {...field}
                  id="basic-details-whatsapp"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  aria-invalid={fieldState.invalid}
                  placeholder="9876543210"
                  autoComplete="off"
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
