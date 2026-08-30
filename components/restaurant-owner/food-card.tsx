/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDeleteFood, useToggleAvailability } from "@/hooks/restaurant-owner";
import { buildImageUrl, cn, formatPrice } from "@/lib/utils";
import { Food } from "@/type";
import {
  CheckCircle2,
  ChefHat,
  Loader2,
  Pencil,
  Trash2,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function OwnerFoodCard({ food }: { food: Food }) {
  const { mutate: toggle, isPending: toggling } = useToggleAvailability();
  const { mutate: deleteFood, isPending: deleting } = useDeleteFood();
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <Card className="overflow-hidden pt-0! transition-shadow hover:shadow-md">
      {/* Image */}
      <div className="relative h-40 w-full sm:h-44">
        {food.image ? (
          <img
            src={buildImageUrl(food.image)}
            alt={food.itemName}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <ChefHat className="h-10 w-10 text-muted-foreground" />
          </div>
        )}

        {/* Top-right corner actions */}
        <div className="absolute right-3 top-3 flex items-center gap-1.5">
          {/* Edit */}
          <Link href={`/partner/dashboard/menu/edit/${food._id}`}>
            <Button
              variant="secondary"
              size="icon-sm"
              className="h-8 w-8 bg-background/90 text-foreground shadow-md backdrop-blur hover:bg-background"
              aria-label="Edit item"
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>
          </Link>

          {/* Delete / Confirm */}
          {confirmDelete ? (
            <>
              <Button
                variant="destructive"
                size="icon-sm"
                className="h-8 w-8 shadow-md"
                onClick={() => deleteFood(food._id)}
                disabled={deleting}
                aria-label="Confirm delete"
              >
                {deleting ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                )}
              </Button>
              <Button
                variant="secondary"
                size="icon-sm"
                className="h-8 w-8 bg-background/90 text-foreground shadow-md backdrop-blur hover:bg-background"
                onClick={() => setConfirmDelete(false)}
                aria-label="Cancel delete"
              >
                <XCircle className="h-3.5 w-3.5" />
              </Button>
            </>
          ) : (
            <Button
              variant="secondary"
              size="icon-sm"
              className="h-8 w-8 bg-background/90 text-destructive shadow-md backdrop-blur hover:bg-background"
              onClick={() => setConfirmDelete(true)}
              aria-label="Delete item"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>

        {/* Veg/Non-veg dot */}
        <span
          className={cn(
            "absolute left-3 top-3 h-4 w-4 rounded-full border-2 border-background",
            food.isVeg ? "bg-green-500" : "bg-red-500",
          )}
        />
      </div>

      {/* Bottom info */}
      <div className="space-y-2 p-4">
        <div className="min-w-0">
          <h3 className="truncate font-semibold">{food.itemName}</h3>
          <p className="truncate text-xs text-muted-foreground capitalize">
            {food.foodType}
          </p>
        </div>

        {/* Prices */}
        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold">
            {food.discountPrice > 0
              ? formatPrice(food.discountPrice)
              : formatPrice(food.basePrice)}
          </span>
          {food.discountPrice > 0 && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(food.basePrice)}
            </span>
          )}
        </div>

        {/* Availability toggle */}
        <div className="flex flex-wrap items-center gap-2 pt-0.5">
          <button
            onClick={() => toggle(food._id)}
            disabled={toggling}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
              food.isAvailable
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-muted text-muted-foreground hover:bg-muted/70",
            )}
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
        </div>
      </div>
    </Card>
  );
}
