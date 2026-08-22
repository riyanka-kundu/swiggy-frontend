"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { RootState } from "@/redux/store/store";
import { Loader2, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function HomeNavbar() {
  const { data, loading } = useSelector((state: RootState) => state.auth);

  return (
    <nav className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/80 px-6 py-4 backdrop-blur md:px-10">
      {/* Logo */}
      <div className="flex items-center gap-2 text-lg font-black">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-white">
          <UtensilsCrossed className="h-4.5 w-4.5" />
        </span>
        FoodExpress
      </div>

      {/* Menu */}
      <div className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
        <Link href="/">Home</Link>
        <Link href="/partner">Partner with us</Link>
        <Link href="#">Get the app</Link>
        <ModeToggle />
      </div>

      {/* User */}
      {loading ? (
        <button
          disabled
          className="flex min-w-24 cursor-not-allowed items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground opacity-70"
        >
          <Loader2 className="h-4 w-4 animate-spin" />
        </button>
      ) : data ? (
        <button className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
          {data.data?.name}
        </button>
      ) : (
        <Link
          href="/signin"
          className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Sign in
        </Link>
      )}
    </nav>
  );
}
