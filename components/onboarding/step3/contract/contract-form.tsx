"use client";

import { useEffect, useState } from "react";
import { useMyRestaurant } from "@/hooks/restaurant-owner";
import AgreementCard from "@/components/onboarding/step4/agreement-card";
import DeclareActionCard from "@/components/onboarding/step4/declare-action-card";
import { Button } from "@/components/ui/button";
import { restaurantContract } from "@/redux/slice/restaurant-slice";
import { AppDispatch } from "@/redux/store/store";
import { contractSchema, TContract } from "@/schema/restaurant-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

type Props = {
  onNext?: () => void;
};

export default function ContractForm({ onNext }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { data: restaurant } = useMyRestaurant();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<TContract>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      fullName: "",
      designation: "",
      place: "",
      agreed: false,
    },
  });

  useEffect(() => {
    if (restaurant) {
      form.reset({
        fullName:
          restaurant.contract?.signatory?.fullName ||
          restaurant.ownerName ||
          "",
        designation:
          restaurant.contract?.signatory?.designation || "Restaurant Owner",
        place:
          restaurant.contract?.signatory?.place ||
          restaurant.location ||
          "",
        agreed: restaurant.contract?.accepted || false,
      });
    }
  }, [restaurant, form]);


  async function onSubmit(data: TContract) {
    setServerError(null);
    try {
      // Transform frontend schema to backend expected payload
      const payload = {
        fullName: data.fullName.trim(),
        designation: data.designation.trim(),
        place: data.place.trim(),
        declarationAccepted: true,
        reviewedSections: [
          "terms_of_service",
          "commission_payment_terms",
          "operational_guidelines",
          "privacy_data_policy",
        ],
      };

      const res = await dispatch(
        restaurantContract(payload as unknown as TContract),
      );

      if (res?.meta?.requestStatus === "fulfilled") {
        onNext?.();
      } else if (res?.payload) {
        setServerError(
          typeof res.payload === "string"
            ? res.payload
            : "Failed to submit contract",
        );
      }
    } catch (error) {
      console.log("API Error:", error);
      setServerError("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {serverError && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-destructive">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <AlertCircle className="h-4.5 w-4.5 shrink-0" />
            <span>{serverError}</span>
          </div>
        </div>
      )}

      <AgreementCard form={form} />
      <DeclareActionCard form={form} />

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
        <Button type="submit">Submit Application</Button>
      </div>
    </form>
  );
}
