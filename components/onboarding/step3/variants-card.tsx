"use client";

import { Plus, Trash2 } from "lucide-react";
import { Controller, useFieldArray, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
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

export default function VariantsCard({ form }: Props) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portion / Size Variants</CardTitle>
        <CardDescription>
          Add different sizes or portion options (e.g. Half, Full, Small, Medium, Large).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup className="gap-4">
          {fields.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No variants added. Click below if this item is offered in multiple sizes or portions.
            </p>
          )}

          {fields.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-1 gap-3 rounded-md border p-3 md:grid-cols-[1fr_1fr_auto] md:items-end"
            >
              <Controller
                name={`variants.${index}.name`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`variant-name-${index}`}>
                      Variant Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id={`variant-name-${index}`}
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g. Full Plate / Large"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name={`variants.${index}.price`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`variant-price-${index}`}>
                      Price
                    </FieldLabel>
                    <Input
                      {...field}
                      value={(field.value ?? "") as string | number}
                      id={`variant-price-${index}`}
                      type="number"
                      min={0}
                      step="0.01"
                      aria-invalid={fieldState.invalid}
                      placeholder="250"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => remove(index)}
                aria-label="Remove variant"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            className="w-fit"
            onClick={() => append({ name: "", price: 0 })}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Variant
          </Button>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
