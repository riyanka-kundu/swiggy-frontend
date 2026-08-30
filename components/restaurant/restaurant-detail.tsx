"use client";

import FoodCard from "@/components/home/food-card";
import HomeNavbar from "@/components/home/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRestaurantFoods } from "@/hooks/user";
import { cn, formatTime } from "@/lib/utils";
import { RootState } from "@/redux/store/store";
import { UserRole } from "@/type/auth";
import {
  ArrowLeft,
  Clock,
  Loader2,
  LogIn,
  MapPin,
  SearchX,
  Store,
  UtensilsCrossed,
} from "lucide-react";

import Link from "next/link";
import { useSelector } from "react-redux";

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

export default function RestaurantDetail({
  restaurantId,
}: {
  restaurantId: string;
}) {
  const { data: authData } = useSelector((state: RootState) => state.auth);
  const isLoggedInUser = authData?.data?.role === UserRole.User;

  const { data, isLoading, isError } = useRestaurantFoods(
    restaurantId,
    isLoggedInUser,
  );

  const info = data?.restaurant;
  const foods = data?.foods ?? [];

  if (!isLoggedInUser) {
    return (
      <main className="min-h-screen bg-background">
        <HomeNavbar />
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <LogIn className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold">Sign in to view this menu</h2>
          <p className="max-w-xs text-sm text-muted-foreground">
            Create an account or sign in to explore dishes from this restaurant.
          </p>
          <Link href="/signin">
            <Button className="mt-2">
              <LogIn className="mr-2 h-4 w-4" />
              Sign in
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  if (!isLoading && (!info || isError)) {
    return (
      <main className="min-h-screen bg-background">
        <HomeNavbar />
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <SearchX className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold">Restaurant not found</h2>
          <p className="max-w-xs text-sm text-muted-foreground">
            This restaurant may no longer be available.
          </p>
          <Link href="/">
            <Button variant="outline" className="mt-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  const slot = info?.openingClosing?.slots?.[0];
  const isOpen = Boolean(info?.isOpen);

  return (
    <main className="min-h-screen bg-background">
      <HomeNavbar />

      {/* Restaurant header */}
      <section className="border-b border-border bg-linear-to-br from-primary/10 via-primary/5 to-transparent px-6 py-10 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center">
          <Link href="/" aria-label="Back to home">
            <Button variant="outline" size="icon" className="h-9 w-9 shrink-0">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>

          <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-primary text-3xl font-black text-primary-foreground shadow-lg">
            {info ? (
              getInitials(info.restaurantName) || (
                <UtensilsCrossed className="h-9 w-9" />
              )
            ) : (
              <Loader2 className="h-8 w-8 animate-spin" />
            )}
          </span>

          <div className="min-w-0 space-y-2">
            {info ? (
              <>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-black md:text-4xl">
                    {info.restaurantName}
                  </h1>
                  <span
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide",
                      isOpen
                        ? "bg-green-600 text-white"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        isOpen
                          ? "animate-pulse bg-white"
                          : "bg-muted-foreground",
                      )}
                    />
                    {isOpen ? "Open now" : "Closed"}
                  </span>
                </div>

                <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {info.location || "Location unavailable"}
                  </span>
                  {info.outletType && (
                    <span className="flex items-center gap-1.5 capitalize">
                      <Store className="h-3.5 w-3.5" />
                      {info.outletType}
                    </span>
                  )}
                  {slot && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {formatTime(slot.open)} - {formatTime(slot.close)}
                    </span>
                  )}
                </p>
              </>
            ) : (
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            )}
          </div>

          {!isLoading && (
            <Badge variant="outline" className="sm:ml-auto shrink-0">
              {foods.length} dish{foods.length !== 1 && "es"}
            </Badge>
          )}
        </div>
      </section>

      {/* Foods */}
      <section className="mx-auto max-w-6xl px-6 py-12 md:px-10">
        <div className="mb-8">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Menu
          </p>
          <h2 className="text-2xl font-black md:text-3xl">
            What&apos;s cooking
          </h2>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-2xl bg-muted"
              />
            ))}
          </div>
        ) : foods.length === 0 ? (
          <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <UtensilsCrossed className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold">No dishes available yet</h3>
            <p className="max-w-xs text-sm text-muted-foreground">
              This kitchen hasn&apos;t published any items. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {foods.map((food) => (
              <FoodCard key={food._id} food={food} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
