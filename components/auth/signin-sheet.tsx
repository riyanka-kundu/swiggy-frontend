"use client";

import Login from "@/components/auth/login";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { UserRole } from "@/type/auth";
import { useRouter } from "next/navigation";

export default function SignInSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();

  const handleSuccess = (role: UserRole) => {
    onOpenChange(false);

    if (role === UserRole.Restaurant_Owner) {
      setTimeout(() => router.replace("/partner/dashboard"), 200);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full gap-0 overflow-y-auto p-6 pt-14 sm:max-w-md"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Welcome back</SheetTitle>
          <SheetDescription>Sign in to continue ordering.</SheetDescription>
        </SheetHeader>

        <Login onSuccess={handleSuccess} />
      </SheetContent>
    </Sheet>
  );
}
