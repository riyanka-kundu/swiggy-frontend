"use client";

import SignInSheet from "@/components/auth/signin-sheet";
import { useRouter } from "next/navigation";

export default function SignInModal() {
  const router = useRouter();

  return <SignInSheet open onOpenChange={() => router.back()} />;
}
