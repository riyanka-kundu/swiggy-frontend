"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import Login from "@/components/auth/login";

export default function SignInModal() {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  return (
    <Sheet
      open={open}
      onOpenChange={(value) => {
        setOpen(value);

        if (!value) {
          router.back();
        }
      }}
    >
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Welcome back</SheetTitle>
          <SheetDescription>Sign in to continue ordering.</SheetDescription>
        </SheetHeader>

        <div className="mt-6">
          <Login
            onSuccess={() => {
              setOpen(false);

              setTimeout(() => {
                router.replace("/");
              }, 200);
            }}
          />

          <p className="mt-5 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup">Create account</Link>
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
