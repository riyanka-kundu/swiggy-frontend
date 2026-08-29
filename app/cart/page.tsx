"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import HomeNavbar from "@/components/home/navbar";
import { Separator } from "@/components/ui/separator";
import { useAddToCart, useCart, usePlaceOrder, useRemoveFromCart } from "@/hooks/user";
import { buildImageUrl, formatPrice } from "@/lib/utils";
import {
  ArrowLeft,
  Loader2,
  Minus,
  Package,
  Plus,
  ShoppingCart,
  Trash2,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function CartContent() {
  const { data: cart, isLoading } = useCart();
  const { mutate: removeItem, isPending: removing } = useRemoveFromCart();
  const { mutate: addToCart, isPending: adding } = useAddToCart();
  const { mutate: placeOrder, isPending: ordering } = usePlaceOrder();
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <ShoppingCart className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-bold">Your cart is empty</h2>
        <p className="max-w-xs text-sm text-muted-foreground">
          Looks like you haven&apos;t added anything yet. Browse restaurants and
          discover great food!
        </p>
        <Link href="/">
          <Button className="mt-2">
            <UtensilsCrossed className="mr-2 h-4 w-4" />
            Explore food
          </Button>
        </Link>
      </div>
    );
  }

  const deliveryFee = 30;
  const tax = Math.round(cart.totalAmount * 0.05);
  const grandTotal = cart.totalAmount + deliveryFee + tax;

  const handleCheckout = () => {
    if (!address.trim()) {
      setAddressError("Please enter your delivery address");
      return;
    }
    setAddressError("");
    placeOrder({ address, paymentMethod: "cash_on_delivery" });
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/">
          <Button variant="outline" size="icon" className="h-9 w-9">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Your Cart</h1>
          <p className="text-sm text-muted-foreground">
            {cart.items.length} item{cart.items.length !== 1 ? "s" : ""} from{" "}
            <span className="font-medium text-foreground">
              {typeof cart.restaurant === "object"
                ? cart.restaurant.restaurantName
                : "Restaurant"}
            </span>
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* Cart Items */}
        <div className="space-y-3">
          {cart.items.map((item) => {
            const food = item.food;
            const effectivePrice = item.price;
            return (
              <Card key={item._id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Food image / veg indicator */}
                    <div className="relative shrink-0">
                      {food.image ? (
                        <img
                          src={buildImageUrl(food.image)}
                          alt={food.itemName}
                          width={80}
                          height={80}
                          className="h-20 w-20 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-muted">
                          <UtensilsCrossed className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                      <span
                        className={`absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-background text-[8px] ${food.isVeg ? "bg-green-500" : "bg-red-500"}`}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex flex-1 flex-col justify-between gap-2">
                      <div>
                        <p className="font-semibold">{food.itemName}</p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {food.category} · {food.cuisine}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removeItem(food._id)}
                            disabled={removing}
                            className="flex h-7 w-7 items-center justify-center rounded-full border bg-background text-sm font-bold transition-colors hover:bg-accent disabled:opacity-50"
                          >
                            {item.quantity === 1 ? (
                              <Trash2 className="h-3.5 w-3.5 text-destructive" />
                            ) : (
                              <Minus className="h-3.5 w-3.5" />
                            )}
                          </button>
                          <span className="w-6 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => addToCart({ foodId: food._id, quantity: 1 })}
                            disabled={adding || removing}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="font-bold">
                            {formatPrice(effectivePrice * item.quantity)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatPrice(effectivePrice)} each
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(cart.totalAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery fee</span>
                  <span>{formatPrice(deliveryFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GST (5%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span className="text-primary">
                  {formatPrice(grandTotal)}
                </span>
              </div>

              {/* Delivery address */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Delivery Address</label>
                <textarea
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (addressError) setAddressError("");
                  }}
                  placeholder="Enter your delivery address…"
                  rows={3}
                  className="w-full resize-none rounded-lg border bg-background px-3 py-2 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-ring"
                />
                {addressError && (
                  <p className="text-sm text-red-500">{addressError}</p>
                )}
              </div>

              <Button
                onClick={handleCheckout}
                disabled={ordering}
                className="h-11 w-full font-semibold"
              >
                {ordering ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Placing order…
                  </>
                ) : (
                  <>
                    <Package className="mr-2 h-4 w-4" />
                    Place Order · {formatPrice(grandTotal)}
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Payment: Cash on delivery
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <main className="min-h-screen bg-background">
      <HomeNavbar />
      <CartContent />
    </main>
  );
}

