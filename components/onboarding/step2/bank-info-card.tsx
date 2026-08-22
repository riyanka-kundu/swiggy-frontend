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

export default function BankInfoCard({ form }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bank Details</CardTitle>
        <CardDescription>
          Enter your bank account information for payouts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup className="grid gap-5 md:grid-cols-2">
          {/* IFSC Code */}
          <Controller
            name="ifscCode"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="doc-ifsc-code">IFSC Code</FieldLabel>
                <Input
                  {...field}
                  id="doc-ifsc-code"
                  aria-invalid={fieldState.invalid}
                  placeholder="HDFC0001234"
                  autoComplete="off"
                  className="uppercase"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Bank Account Number */}
          <Controller
            name="bankAccountNumber"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="doc-bank-account-number">
                  Bank Account Number
                </FieldLabel>
                <Input
                  {...field}
                  id="doc-bank-account-number"
                  inputMode="numeric"
                  aria-invalid={fieldState.invalid}
                  placeholder="1234567890123"
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
