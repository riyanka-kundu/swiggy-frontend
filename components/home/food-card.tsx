"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAddToCart } from "@/hooks/user";
import { buildImageUrl, cn, formatPrice } from "@/lib/utils";
import { RootState } from "@/redux/store/store";
import { Food } from "@/type";
import { Loader2, Plus, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";

function FoodCard({ food }: { food: Food }) {
  const { mutate: addToCart, isPending } = useAddToCart();
  const { data: authData } = useSelector((state: RootState) => state.auth);
  const isLoggedInUser = authData?.data?.role === "user";

  const effectivePrice =
    food.discountPrice > 0 ? food.discountPrice : food.basePrice;

  return (
    <Card className="group overflow-hidden !pt-0 transition-all hover:shadow-lg">
      <div className="relative h-44 w-full overflow-hidden bg-muted">
        {food.image ? (
          <img
            src={buildImageUrl(food.image)}
            alt={food.itemName}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <UtensilsCrossed className="h-10 w-10 text-muted-foreground" />
          </div>
        )}

        {/* Veg / Non-Veg badge */}
        <span
          className={cn(
            "absolute left-3 top-3 flex h-5 w-5 items-center justify-center rounded-md border-2 border-background shadow-sm",
            food.isVeg ? "bg-green-600" : "bg-red-600",
          )}
        >
          <span className="h-2 w-2 rounded-full bg-white" />
        </span>

        {food.discountPrice > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-primary-foreground shadow">
            OFFER
          </span>
        )}
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <h3 className="truncate text-base font-bold">{food.itemName}</h3>
          {food?.restaurant?._id ? (
            <Link
              href={`/restaurant/${food?.restaurant?._id}`}
              className="truncate text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              {food?.restaurant?.restaurantName} · {food.cuisine}
            </Link>
          ) : (
            <p className="truncate text-xs text-muted-foreground">
              {food?.restaurant?.restaurantName} · {food.cuisine}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-black text-foreground">
              {formatPrice(effectivePrice)}
            </span>
            {food.discountPrice > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(food.basePrice)}
              </span>
            )}
          </div>

          {isLoggedInUser ? (
            <Button
              size="sm"
              disabled={isPending || !food.isAvailable}
              onClick={() => addToCart({ foodId: food._id, quantity: 1 })}
              className="h-8 shrink-0 rounded-lg px-3 text-xs font-semibold"
            >
              {isPending ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <>
                  <Plus className="mr-1 h-3.5 w-3.5" />
                  ADD
                </>
              )}
            </Button>
          ) : (
            <Link href="/signin">
              <Button
                size="sm"
                variant="outline"
                className="h-8 shrink-0 rounded-lg px-3 text-xs font-semibold"
              >
                Sign in to Order
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default FoodCard;
