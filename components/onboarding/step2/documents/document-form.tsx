"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import BankInfoCard from "@/components/onboarding/step2/bank-info-card";
import BuisnessInfoCard from "@/components/onboarding/step2/buisness-info-card";
import TaxInfoCard from "@/components/onboarding/step2/tax-info-card";
import { Button } from "@/components/ui/button";
import { restaurantDocuments } from "@/redux/slice/restaurant-slice";
import { AppDispatch } from "@/redux/store/store";
import {
  restaurantDocSchema,
  TRestaurantDoc,
} from "@/schema/restaurant-schema";

type Props = {
  onNext?: () => void;
};

export default function DocumentsForm({ onNext }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<TRestaurantDoc>({
    resolver: zodResolver(restaurantDocSchema),
    defaultValues: {
      outletType: "",
      pan: "",
      gstin: "",
      ifscCode: "",
      bankAccountNumber: "",
      fssaiNumber: "",
    },
  });

  async function onSubmit(data: TRestaurantDoc) {
    try {
      const res = await dispatch(restaurantDocuments(data));

      if (res?.meta?.requestStatus === "fulfilled") {
        onNext?.();
      }
    } catch (error) {
      console.log("API Error:", error);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <BuisnessInfoCard form={form} />
      <TaxInfoCard form={form} />
      <BankInfoCard form={form} />

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
        <Button type="submit">Save & Continue</Button>
      </div>
    </form>
  );
}
