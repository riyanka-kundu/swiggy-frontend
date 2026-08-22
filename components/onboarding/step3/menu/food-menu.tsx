"use client";

import AddOns from "@/components/onboarding/step3/addon-card";
import BasicDetails from "@/components/onboarding/step3/basic-food-info-card";
import ImageUpload from "@/components/onboarding/step3/food-image-card";
import Price from "@/components/onboarding/step3/pricing-card";
import { Button } from "@/components/ui/button";
import { restaurantMenu } from "@/redux/slice/restaurant-slice";
import { AppDispatch } from "@/redux/store/store";
import { menuSchema, TMenu, TMenuInput } from "@/schema/restaurant-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

type Props = {
  onNext?: () => void;
};

export default function Menu({ onNext }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<TMenuInput, any, TMenu>({
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
      variants: [{ name: "", price: 0 }],
      addons: [],
      tags: [],
      isAvailable: true,
      enablePreOrder: false,
      allowSpecialInstructions: false,
      eligibleForOffers: false,
      preparationTime: { min: 0, max: 0 },
    },
  });

  async function onSubmit(data: TMenu) {
    try {
      const res = await dispatch(restaurantMenu(data));

      if (res?.meta?.requestStatus === "fulfilled") {
        onNext?.();
      }
    } catch (error) {
      console.log("API Error:", error);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <BasicDetails form={form} />
      <ImageUpload form={form} />
      <Price form={form} />
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
