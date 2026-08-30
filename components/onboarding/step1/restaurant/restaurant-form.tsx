"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import BasicDetailsCard from "@/components/onboarding/step1/basic-details-card";
import OpeningHoursCard from "@/components/onboarding/step1/opening-hour-card";
import WorkingDaysCard from "@/components/onboarding/step1/working-day-card";
import { Button } from "@/components/ui/button";
import { restaurantDetails } from "@/redux/slice/restaurant-slice";
import { AppDispatch } from "@/redux/store/store";
import { restaurantSchema, TRestaurant } from "@/schema/restaurant-schema";

import { useMyRestaurant } from "@/hooks/restaurant-owner";
import { useEffect } from "react";

type Props = {
  onNext?: () => void;
};

export default function RestaurantForm({ onNext }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { data: restaurant } = useMyRestaurant();

  const form = useForm<TRestaurant>({
    resolver: zodResolver(restaurantSchema),
    defaultValues: {
      ownerName: "",
      restaurantName: "",
      location: "",
      email: "",
      phone: "",
      whatsappNumber: "",
      workingDays: [],
      openingClosing: {
        sameForAllDays: true,
        slots: [{ open: "", close: "" }],
      },
    },
  });

  useEffect(() => {
    if (restaurant) {
      const cleanNumber = (num?: string) =>
        (num || "").replace(/^\+91/, "").replace(/\D/g, "").slice(-10);

      form.reset({
        ownerName: restaurant.ownerName || "",
        restaurantName: restaurant.restaurantName || "",
        location: restaurant.location || "",
        email: restaurant.email || "",
        phone: cleanNumber(restaurant.phone),
        whatsappNumber: cleanNumber(restaurant.whatsappNumber),
        workingDays: (restaurant.workingDays || []).map((d) => d.toLowerCase()),
        openingClosing: restaurant.openingClosing || {
          sameForAllDays: true,
          slots: [{ open: "10:00", close: "22:00" }],
        },
      });
    }
  }, [restaurant, form]);

  async function onSubmit(data: TRestaurant) {
    const payload = {
      ownerName: data.ownerName,
      restaurantName: data.restaurantName,
      location: data.location,
      email: data.email,
      phone: data.phone,
      whatsappNumber: data.whatsappNumber,

      workingDays: data.workingDays.map((d: string) => d.toLowerCase()),

      openingClosing: {
        sameForAllDays: true,
        slots: data.openingClosing.slots,
      },
    };

    try {
      const res = await dispatch(restaurantDetails(payload));

      if (res?.meta?.requestStatus === "fulfilled") {
        onNext?.();
      }
    } catch (error) {
      console.log("API Error:", error);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <BasicDetailsCard form={form} />
      <WorkingDaysCard form={form} />
      <OpeningHoursCard form={form} />

      <div className="flex items-center justify-end gap-3 border-t border-border/60 pt-5">
        <Button
          type="button"
          variant="outline"
          onClick={() => form.reset()}
          className="h-10 rounded-lg px-5"
        >
          Reset
        </Button>

        <Button
          type="submit"
          className="h-10 rounded-lg px-6 font-medium shadow-sm"
        >
          Save & Continue
        </Button>
      </div>
    </form>
  );
}
