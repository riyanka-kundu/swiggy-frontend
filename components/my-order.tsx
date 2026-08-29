/* eslint-disable @next/next/no-img-element */
"use client";

import HomeNavbar from "@/components/home/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useMyOrders } from "@/hooks/user";
import { buildImageUrl, formatDate, formatPrice } from "@/lib/utils";
import { RootState } from "@/redux/store/store";
import { Order } from "@/type";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Loader2,
  MapPin,
  Package,
  ReceiptText,
  ShoppingBag,
  Truck,
  UtensilsCrossed,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const STATUS_CONFIG: Record<
  Order["status"],
  { label: string; color: string; icon: React.ElementType }
> = {
  placed: {
    label: "Placed",
    color: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
    icon: Clock,
  },
  accepted: {
    label: "Accepted",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
    icon: CheckCircle2,
  },
  preparing: {
    label: "Preparing",
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300",
    icon: Package,
  },
  out_for_delivery: {
    label: "Out for Delivery",
    color:
      "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300",
    icon: Truck,
  },
  delivered: {
    label: "Delivered",
    color: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
    icon: XCircle,
  },
};

export default function MyOrdersPage() {
  const router = useRouter();
  const { data } = useSelector((state: RootState) => state.auth);
  const isAuthenticated = Boolean(data);

  const { data: orders, isLoading, error } = useMyOrders(isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/signin");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-background">
        <HomeNavbar />
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </main>
    );
  }

  const orderList = Array.isArray(orders) ? orders : [];

  return (
    <main className="min-h-screen bg-background">
      <HomeNavbar />
      <div className="mx-auto w-full max-w-4xl space-y-6 p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 shrink-0"
            aria-label="Go back"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Orders</h1>
            <p className="text-sm text-muted-foreground">
              Track and review all your orders
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-40 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : error ? (
          <Card>
            <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
              <AlertTriangle className="h-10 w-10 text-destructive" />
              <p className="font-medium">Failed to load your orders</p>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Try again
              </Button>
            </CardContent>
          </Card>
        ) : orderList.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              <p className="font-medium">No orders yet</p>
              <p className="max-w-sm text-xs text-muted-foreground">
                You haven&apos;t placed any orders yet. Explore restaurants and
                order your favourite food!
              </p>
              <Link href="/">
                <Button className="mt-2">
                  <UtensilsCrossed className="mr-2 h-4 w-4" />
                  Explore food
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orderList.map((order) => {
              const statusInfo =
                STATUS_CONFIG[order.status] || STATUS_CONFIG.placed;
              const StatusIcon = statusInfo.icon;

              const restaurantName =
                typeof order.restaurant === "object" && order.restaurant
                  ? order.restaurant.restaurantName
                  : "Restaurant";

              return (
                <Card key={order._id} className="overflow-hidden">
                  {/* Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b bg-muted/20 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <ReceiptText className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">
                          {restaurantName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          #{order._id.slice(-6).toUpperCase()} ·{" "}
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>

                    <Badge className={`${statusInfo.color} px-3 py-1`}>
                      <StatusIcon className="mr-1.5 h-3.5 w-3.5" />
                      {statusInfo.label}
                    </Badge>
                  </div>

                  <CardContent className="space-y-4 p-4">
                    {/* Items list */}
                    <div className="divide-y rounded-lg border">
                      {order.items?.map((item, idx) => (
                        <div
                          key={item._id || idx}
                          className="flex items-center gap-3 p-2.5"
                        >
                          {item.food?.image ? (
                            <img
                              src={buildImageUrl(item.food.image)}
                              alt={item.food.itemName || "Food"}
                              className="h-11 w-11 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted">
                              <UtensilsCrossed className="h-5 w-5 text-muted-foreground" />
                            </div>
                          )}

                          <div className="flex flex-1 items-center justify-between gap-3">
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium">
                                {item.food?.itemName || "Food item"}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Qty {item.quantity} × {formatPrice(item.price)}
                              </p>
                            </div>
                            <span className="shrink-0 text-sm font-semibold">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Address */}
                    {order.address && (
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                        <span className="line-clamp-2">{order.address}</span>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between gap-3 border-t pt-3">
                      <div>
                        <p className="text-xs text-muted-foreground capitalize">
                          {order.paymentMethod?.replace(/_/g, " ") || "COD"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {order.items?.length || 0} items
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                          Total Amount
                        </p>
                        <p className="text-lg font-bold text-primary">
                          {formatPrice(order.totalAmount)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
