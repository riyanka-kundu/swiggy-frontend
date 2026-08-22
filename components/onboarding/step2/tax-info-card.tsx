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
import { TRestaurantDoc } from "@/schema/restaurant-schema";

type Props = {
  form: UseFormReturn<TRestaurantDoc>;
};

export default function TaxInfoCard({ form }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tax & Licensing</CardTitle>
        <CardDescription>
          Enter your GSTIN and FSSAI license details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup className="grid gap-5 md:grid-cols-2">
          {/* GSTIN */}
          <Controller
            name="gstin"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="doc-gstin">GSTIN</FieldLabel>
                <Input
                  {...field}
                  id="doc-gstin"
                  aria-invalid={fieldState.invalid}
                  placeholder="22AAAAA0000A1Z5"
                  autoComplete="off"
                  className="uppercase"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* FSSAI Number */}
          <Controller
            name="fssaiNumber"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="doc-fssai-number">FSSAI Number</FieldLabel>
                <Input
                  {...field}
                  id="doc-fssai-number"
                  inputMode="numeric"
                  aria-invalid={fieldState.invalid}
                  placeholder="12345678901234"
                  autoComplete="off"
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
