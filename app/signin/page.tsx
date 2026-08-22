"use client";

import { useRouter } from "next/navigation";

import Login from "@/components/auth/login";

export default function SignInPage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg border bg-background p-6 shadow">
        <Login
          onSuccess={() => {
            router.replace("/");
          }}
        />
      </div>
    </main>
  );
}
