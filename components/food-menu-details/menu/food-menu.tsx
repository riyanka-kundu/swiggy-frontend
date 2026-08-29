"use client";

import AddOns from "@/components/food-menu-details/addon-card";
import BasicDetails from "@/components/food-menu-details/basic-food-info-card";
import ImageUpload from "@/components/food-menu-details/food-image-card";
import Price from "@/components/food-menu-details/pricing-card";
import VariantsCard from "@/components/food-menu-details/variants-card";
import { Button } from "@/components/ui/button";
import { restaurantMenu } from "@/redux/slice/restaurant-slice";
import { AppDispatch } from "@/redux/store/store";
import { menuSchema, TMenu, TMenuInput } from "@/schema/restaurant-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

type Props = {
  onNext?: () => void;
};

export default function Menu({ onNext }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<TMenuInput, unknown, TMenu>({
    resolver: zodResolver(menuSchema),

    defaultValues: {
      itemName: "",
      description: "",
      foodType: "veg",
      category: "",
      image: null,
      basePrice: 0,
      discountPrice: null,
      gst: 0,
      variants: [],
      addons: [],
      tags: [],
      isAvailable: true,
      enablePreOrder: false,
      allowSpecialInstructions: false,
      eligibleForOffers: false,
      preparationTime: { min: 0, max: 0 },
    },
  });

  const [serverError, setServerError] = useState<string | null>(null);

  async function onSubmit(data: TMenu) {
    setServerError(null);
    try {
      const validFoodTypes = [
        "Starter",
        "Main Course",
        "Dessert",
        "Beverage",
        "Snack",
      ];
      const resolvedFoodType = validFoodTypes.includes(data.category)
        ? data.category
        : "Main Course";

      const prepTime = Number(
        data.preparationTime?.max || data.preparationTime?.min || 15,
      );

      const formData = new FormData();
      formData.append("itemName", data.itemName.trim());
      formData.append("description", data.description || "");
      formData.append("foodType", resolvedFoodType);
      formData.append("category", data.category || "Main Course");
      formData.append("cuisine", data.category || "");
      formData.append("isVeg", String(data.foodType === "veg"));
      formData.append("basePrice", String(data.basePrice));
      if (data.discountPrice !== null && data.discountPrice !== undefined) {
        formData.append("discountPrice", String(data.discountPrice));
      }
      formData.append("gst", String(data.gst ?? 5));
      formData.append("preparationTime", String(prepTime));

      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      if (data.variants && data.variants.length > 0) {
        formData.append("variants", JSON.stringify(data.variants));
      }
      if (data.addons && data.addons.length > 0) {
        formData.append("addons", JSON.stringify(data.addons));
      }

      const res = await dispatch(restaurantMenu(formData as unknown as TMenu));

      if (res?.meta?.requestStatus === "fulfilled") {
        onNext?.();
      } else if (res?.payload) {
        setServerError(
          typeof res.payload === "string"
            ? res.payload
            : "Failed to add menu item",
        );
      }
    } catch (error) {
      console.log("API Error:", error);
      setServerError("An unexpected error occurred. Please try again.");
    }
  }

  const getErrorMessages = (errs: FieldErrors<TMenuInput>): string[] => {
    const messages: string[] = [];
    const extract = (obj: Record<string, unknown>) => {
      for (const key of Object.keys(obj)) {
        const val = obj[key];
        if (!val) continue;
        if (
          typeof val === "object" &&
          "message" in val &&
          typeof (val as { message?: unknown }).message === "string"
        ) {
          messages.push((val as { message: string }).message);
        } else if (typeof val === "object") {
          extract(val as Record<string, unknown>);
        }
      }
    };
    extract(errs as unknown as Record<string, unknown>);
    return Array.from(new Set(messages));
  };

  const errorMessages = getErrorMessages(form.formState.errors);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {(errorMessages.length > 0 || serverError) && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-destructive">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <AlertCircle className="h-4.5 w-4.5 shrink-0" />
            <span>Please fix the following issues before continuing:</span>
          </div>
          <ul className="mt-2 list-inside list-disc space-y-1 text-xs sm:text-sm">
            {serverError && <li>{serverError}</li>}
            {errorMessages.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      <BasicDetails form={form} />
      <ImageUpload form={form} />
      <Price form={form} />
      <VariantsCard form={form} />
      <AddOns form={form} />

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
        <Button type="submit">Save & Continue</Button>
      </div>
    </form>
  );
}
