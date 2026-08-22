"use client";

import { useState } from "react";
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

import { TMenuInput } from "@/schema/restaurant-schema";

type Props = {
  form: UseFormReturn<TMenuInput>;
};

export default function ImageUpload({ form }: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Food Image</CardTitle>
        <CardDescription>
          Upload a photo of the dish (optional).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Controller
            name="image"
            control={form.control}
            render={({ field: { onChange, ref, ...field }, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="menu-image">Item Image</FieldLabel>
                <input
                  {...field}
                  ref={ref}
                  id="menu-image"
                  type="file"
                  accept="image/*"
                  value={undefined}
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    onChange(file);

                    if (file) {
                      setPreview(URL.createObjectURL(file));
                    } else {
                      setPreview(null);
                    }
                  }}
                  className="text-sm file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-2 file:text-sm file:text-primary-foreground"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}

                {preview && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={preview}
                    alt="Food preview"
                    className="mt-3 h-32 w-32 rounded-md object-cover border"
                  />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
