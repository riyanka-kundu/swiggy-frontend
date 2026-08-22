"use client";

import DocumentsForm from "@/components/onboarding/step2/documents/document-form";
import { useRouter } from "next/navigation";

export default function DocumentPage() {
  const router = useRouter();

  return (
    <DocumentsForm onNext={() => router.push("/partner/onboarding/add-food")} />
  );
}
