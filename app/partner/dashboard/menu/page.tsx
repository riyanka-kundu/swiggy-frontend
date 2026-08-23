"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  useDeleteFood,
  useMenuList,
  useToggleAvailability,
} from "@/hooks/restaurant-owner";
import { buildImageUrl, formatPrice } from "@/lib/utils";
import { Food } from "@/type";
import {
  AlertTriangle,
  CheckCircle2,
  ChefHat,
  Loader2,
  Pencil,
  Plus,
  Search,
  Trash2,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function FoodCard({ food }: { food: Food }) {
  const { mutate: toggle, isPending: toggling } = useToggleAvailability();
  const { mutate: deleteFood, isPending: deleting } = useDeleteFood();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const isApproved = food.approvalStatus === "approved";
  const isPending = food.approvalStatus === "pending";
  const isRejected = food.approvalStatus === "rejected";

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <div className="flex gap-4 p-4">
        {/* Image */}
        <div className="relative shrink-0">
          {food.image ? (
            <img
              src={buildImageUrl(food.image)}
              alt={food.itemName}
              width={88}
              height={88}
              className="h-22 w-22 rounded-xl object-cover"
            />
          ) : (
            <div className="flex h-22 w-22 items-center justify-center rounded-xl bg-muted">
              <ChefHat className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
          {/* Veg/Non-veg dot */}
          <span
            className={`absolute -right-1.5 -top-1.5 h-4 w-4 rounded-full border-2 border-background ${food.isVeg ? "bg-green-500" : "bg-red-500"}`}
          />
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col gap-2 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate font-semibold">{food.itemName}</h3>
              <p className="text-xs text-muted-foreground capitalize">
                {food.category} · {food.cuisine} · {food.foodType}
              </p>
            </div>
            {/* Approval status badge */}
            <Badge
              variant={isApproved ? "default" : isRejected ? "destructive" : "secondary"}
              className={`shrink-0 text-xs ${isApproved ? "bg-green-600 hover:bg-green-600" : ""}`}
            >
              {isApproved && <CheckCircle2 className="mr-1 h-3 w-3" />}
              {isPending && <Loader2 className="mr-1 h-3 w-3 animate-spin" />}
              {isRejected && <XCircle className="mr-1 h-3 w-3" />}
              {food.approvalStatus}
            </Badge>
          </div>

          {/* Prices */}
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold">
              {food.discountPrice > 0 ? formatPrice(food.discountPrice) : formatPrice(food.basePrice)}
            </span>
            {food.discountPrice > 0 && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(food.basePrice)}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Availability toggle */}
            <button
              onClick={() => toggle(food._id)}
              disabled={toggling || !isApproved}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${food.isAvailable
                ? "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-950 dark:text-green-400"
                : "bg-muted text-muted-foreground hover:bg-muted/70"
                }`}
            >
              {toggling ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : food.isAvailable ? (
                <CheckCircle2 className="h-3 w-3" />
              ) : (
                <XCircle className="h-3 w-3" />
              )}
              {food.isAvailable ? "Available" : "Unavailable"}
            </button>

            {/* Edit */}
            <Link href={`/partner/dashboard/menu/edit/${food._id}`}>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                <Pencil className="mr-1 h-3 w-3" />
                Edit
              </Button>
            </Link>

            {/* Delete */}
            {confirmDelete ? (
              <div className="flex items-center gap-1">
                <Button
                  variant="destructive"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => deleteFood(food._id)}
                  disabled={deleting}
                >
                  {deleting ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    "Confirm"
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setConfirmDelete(false)}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={() => setConfirmDelete(true)}
              >
                <Trash2 className="mr-1 h-3 w-3" />
                Delete
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function MenuPage() {
  const { data: foods, isLoading, error } = useMenuList();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "available" | "unavailable">("all");

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
    <div className="space-y-6 p-6">
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
                className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors ${filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2">
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
          <div className="grid gap-4 sm:grid-cols-2">
            {filtered.map((food) => (
              <FoodCard key={food._id} food={food} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
