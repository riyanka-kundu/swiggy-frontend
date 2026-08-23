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

export default function AddOns({ form }: Props) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "addons",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add-ons</CardTitle>
        <CardDescription>
          Optional extras customers can add (e.g. Extra Cheese).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup className="gap-4">
          {fields.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No add-ons yet. Add one below if this item has extras.
            </p>
          )}

          {fields.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-1 gap-3 rounded-md border p-3 md:grid-cols-[1fr_1fr_auto] md:items-end"
            >
              <Controller
                name={`addons.${index}.name`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`addon-name-${index}`}>
                      Add-on Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id={`addon-name-${index}`}
                      aria-invalid={fieldState.invalid}
                      placeholder="Extra Cheese"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name={`addons.${index}.price`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`addon-price-${index}`}>
                      Price
                    </FieldLabel>
                    <Input
                      {...field}
                      value={(field.value ?? "") as string | number}
                      id={`addon-price-${index}`}
                      type="number"
                      min={0}
                      step="0.01"
                      aria-invalid={fieldState.invalid}
                      placeholder="30"
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
                aria-label="Remove addon"
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
            Add Add-on
          </Button>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
