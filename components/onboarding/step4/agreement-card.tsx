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
import { TContract } from "@/schema/restaurant-schema";

type Props = {
  form: UseFormReturn<TContract>;
};

export default function AgreementCard({ form }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Partner Agreement</CardTitle>
        <CardDescription>
          Enter the authorized signatory details for this contract.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup className="grid gap-5 md:grid-cols-2">
          {/* Full Name */}
          <Controller
            name="fullName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="contract-full-name">
                  Authorized Signatory Name
                </FieldLabel>
                <Input
                  {...field}
                  id="contract-full-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="John Doe"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Designation */}
          <Controller
            name="designation"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="contract-designation">
                  Designation
                </FieldLabel>
                <Input
                  {...field}
                  id="contract-designation"
                  aria-invalid={fieldState.invalid}
                  placeholder="Owner / Manager"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="rounded-md border bg-muted/40 p-4 text-sm text-muted-foreground md:col-span-2">
            By proceeding, you confirm that the details entered above are
            accurate and that you are authorized to enter into this partnership
            agreement on behalf of the restaurant.
          </div>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
