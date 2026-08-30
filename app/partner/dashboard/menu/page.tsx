"use client";

import { OwnerFoodCard } from "@/components/restaurant-owner/food-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useMenuList } from "@/hooks/restaurant-owner";
import { cn } from "@/lib/utils";
import { AlertTriangle, ChefHat, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MenuPage() {
  const { data: foods, isLoading, error } = useMenuList();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "available" | "unavailable">(
    "all",
  );

  const filtered = (foods ?? []).filter((f) => {
    const matchesSearch = f.itemName
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "available" && f.isAvailable) ||
      (filter === "unavailable" && !f.isAvailable);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 p-4 md:space-y-6 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Menu Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage your restaurant&apos;s food items
          </p>
        </div>
        <Link href="/partner/dashboard/menu/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Food Item
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search food items…"
              className="w-full rounded-lg border bg-background py-2 pl-9 pr-4 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex items-center gap-2">
            {(["all", "available", "unavailable"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors",
                  filter === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/70",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-36 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      ) : error ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <AlertTriangle className="h-10 w-10 text-destructive" />
            <p className="font-medium">Failed to load menu</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Try again
            </Button>
          </CardContent>
        </Card>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <ChefHat className="h-10 w-10 text-muted-foreground" />
            <p className="font-medium">
              {foods?.length === 0
                ? "No food items yet"
                : "No items match your search"}
            </p>
            {foods?.length === 0 && (
              <Link href="/partner/dashboard/menu/add">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add your first item
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            {filtered.length} item{filtered.length !== 1 ? "s" : ""}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((food) => (
              <OwnerFoodCard key={food._id} food={food} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
