"use client";

import { useRouter } from "next/navigation";

import ContractForm from "@/components/onboarding/step4/contract/contract-form";

export default function ContractPage() {
  const router = useRouter();

  return (
    <ContractForm
      onNext={() => {
        router.push("/partner/onboarding/success");
      }}
    />
  );
}
