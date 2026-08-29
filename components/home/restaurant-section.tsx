"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useUserRestaurantList } from "@/hooks/user";
import { cn, formatTime } from "@/lib/utils";
import { RestaurantListItem } from "@/type";
import { Clock, MapPin, Store, UtensilsCrossed } from "lucide-react";

import Link from "next/link";

function getTodaySlot(restaurant: RestaurantListItem) {
  return restaurant.openingClosing?.slots?.[0];
}

function RestaurantCard({ restaurant }: { restaurant: RestaurantListItem }) {
  const initials = restaurant.restaurantName
    .split(" ")
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  const slot = getTodaySlot(restaurant);
  const isOpen = Boolean(restaurant.isOpen);

  return (
    <Link href={`/restaurant/${restaurant._id}`} className="group">
      <Card className="h-full overflow-hidden pt-0! transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
        <div className="relative flex h-32 items-center justify-center bg-linear-to-br from-primary/15 via-primary/5 to-transparent sm:h-32">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-xl font-black text-primary-foreground shadow-md transition-transform duration-300 group-hover:scale-110">
            {initials || <UtensilsCrossed className="h-7 w-7" />}
          </span>

          <span
            className={cn(
              "absolute right-3 top-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide shadow-sm",
              isOpen
                ? "bg-green-600 text-white"
                : "bg-muted text-muted-foreground",
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                isOpen ? "animate-pulse bg-white" : "bg-muted-foreground",
              )}
            />
            {isOpen ? "Open now" : "Closed"}
          </span>
        </div>

        <CardContent className="space-y-2 p-4">
          <div>
            <h3 className="truncate font-bold">{restaurant.restaurantName}</h3>
            <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 shrink-0" />
              {restaurant.location || "Location unavailable"}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {restaurant.outletType && (
              <Badge variant="secondary" className="text-[10px] capitalize">
                <Store className="mr-1 h-2.5 w-2.5" />
                {restaurant.outletType}
              </Badge>
            )}
            {slot && (
              <Badge
                variant="outline"
                className="text-[10px] font-normal whitespace-nowrap"
              >
                <Clock className="mr-1 h-2.5 w-2.5 shrink-0" />
                {formatTime(slot.open)} - {formatTime(slot.close)}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function RestaurantSection() {
  const { data: restaurants, isLoading } = useUserRestaurantList();

  const restaurantList = Array.isArray(restaurants) ? restaurants : [];

  if (!isLoading && restaurantList.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 md:px-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Restaurants
          </p>
          <h2 className="text-2xl font-black md:text-3xl">
            Explore Places Near You
          </h2>
        </div>
        <Badge variant="outline" className="hidden sm:flex">
          {restaurantList.length} outlet{restaurantList.length !== 1 && "s"}
        </Badge>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-60 animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {restaurantList.map((restaurant) => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </section>
  );
}
