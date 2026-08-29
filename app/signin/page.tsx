"use client";

import { useRouter } from "next/navigation";

import Login from "@/components/auth/login";

export default function SignInPage() {
  const router = useRouter();

  const handleSuccess = (role: string) => {
    if (role === "restaurant_owner") {
      router.replace("/partner/dashboard");
    } else {
      router.replace("/");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-background via-secondary/20 to-background px-4">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md rounded-2xl border bg-card/80 p-8 shadow-xl backdrop-blur-md">
        <Login onSuccess={handleSuccess} />
      </div>
    </main>
  );
}
