"use client";

import AgreementCard from "@/components/onboarding/step4/agreement-card";
import DeclareActionCard from "@/components/onboarding/step4/declare-action-card";
import { Button } from "@/components/ui/button";
import { restaurantContract } from "@/redux/slice/restaurant-slice";
import { AppDispatch } from "@/redux/store/store";
import { contractSchema, TContract } from "@/schema/restaurant-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

type Props = {
  onNext?: () => void;
};

export default function ContractForm({ onNext }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<TContract>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      fullName: "",
      designation: "",
      agreed: false,
    },
  });

  async function onSubmit(data: TContract) {
    try {
      const res = await dispatch(restaurantContract(data));

      if (res?.meta?.requestStatus === "fulfilled") {
        onNext?.();
      }
    } catch (error) {
      console.log("API Error:", error);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
