"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAddToCart } from "@/hooks/user";
import { buildImageUrl, formatPrice } from "@/lib/utils";
import { RootState } from "@/redux/store/store";
import { Food } from "@/type";
import { Loader2, Plus, UtensilsCrossed } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

function FoodCard({ food }: { food: Food }) {
  const { mutate: addToCart, isPending } = useAddToCart();
  const { data: authData } = useSelector((state: RootState) => state.auth);
  const isLoggedInUser = authData?.data?.role === "user";

  const restaurantId =
    typeof food.restaurant === "object" && food.restaurant
      ? food.restaurant._id
      : undefined;
  const restaurantName =
    typeof food.restaurant === "object" && food.restaurant
      ? food.restaurant.restaurantName
      : "Restaurant";

  const effectivePrice =
    food.discountPrice > 0 ? food.discountPrice : food.basePrice;

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-44 w-full overflow-hidden bg-muted">
        {food.image ? (
          <Image
            src={buildImageUrl(food.image)}
            alt={food.itemName}
            fill
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
          className={`absolute left-3 top-3 flex h-5 w-5 items-center justify-center rounded-md border-2 border-background shadow-sm ${food.isVeg ? "bg-green-600" : "bg-red-600"
            }`}
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
          <h3 className="truncate font-bold text-base">{food.itemName}</h3>
          {restaurantId ? (
            <Link
              href={`/restaurant/${restaurantId}`}
              className="text-xs text-muted-foreground truncate hover:text-primary transition-colors"
            >
              {restaurantName} · {food.cuisine}
            </Link>
          ) : (
            <p className="text-xs text-muted-foreground truncate">
              {restaurantName} · {food.cuisine}
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
              className="h-8 rounded-lg px-3 text-xs font-semibold"
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
                className="h-8 rounded-lg px-3 text-xs font-semibold"
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
