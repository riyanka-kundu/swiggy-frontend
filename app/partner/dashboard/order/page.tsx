/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CancelOrderButton from "@/components/cancel-order-button";
import {
  useRestaurantOrders,
  useUpdateOrderStatus,
} from "@/hooks/restaurant-owner";
import { buildImageUrl, cn, formatDate, formatPrice } from "@/lib/utils";
import { Order } from "@/type";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Loader2,
  Package,
  ShoppingBag,
  Truck,
  UtensilsCrossed,
  XCircle,
} from "lucide-react";
import { useState } from "react";

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

const NEXT_STATUS: Partial<Record<Order["status"], Order["status"]>> = {
  placed: "accepted",
  accepted: "preparing",
  preparing: "out_for_delivery",
  out_for_delivery: "delivered",
};

export default function RestaurantOrdersPage() {
  const { data: orders, isLoading, error } = useRestaurantOrders();
  const { mutate: updateStatus, isPending: updating } = useUpdateOrderStatus();
  const [activeTab, setActiveTab] = useState<string>("all");

  const orderList = Array.isArray(orders) ? orders : [];

  const filteredOrders = orderList.filter((order) => {
    if (activeTab === "all") return true;
    return order.status === activeTab;
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
          <p className="text-sm text-muted-foreground">
            Manage and track incoming food orders
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: "all", label: "All Orders" },
          { id: "placed", label: "Placed" },
          { id: "accepted", label: "Accepted" },
          { id: "preparing", label: "Preparing" },
          { id: "out_for_delivery", label: "Out for Delivery" },
          { id: "delivered", label: "Delivered" },
          { id: "cancelled", label: "Cancelled" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-medium transition-colors",
              activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/70",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {isLoading ? (
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-44 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      ) : error ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <AlertTriangle className="h-10 w-10 text-destructive" />
            <p className="font-medium">Failed to load orders</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Try again
            </Button>
          </CardContent>
        </Card>
      ) : filteredOrders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            <p className="font-medium">No orders found</p>
            <p className="max-w-sm text-xs text-muted-foreground">
              {activeTab === "all"
                ? "Incoming orders from customers will show up here in real time."
                : `There are no ${STATUS_CONFIG[activeTab as Order["status"]]?.label.toLowerCase() ?? activeTab} orders yet. New orders in this stage will appear here.`}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {filteredOrders.map((order) => {
            const statusInfo =
              STATUS_CONFIG[order.status] || STATUS_CONFIG.placed;
            const StatusIcon = statusInfo.icon;
            const nextStatus = NEXT_STATUS[order.status];

            return (
              <Card
                key={order._id}
                className="overflow-hidden [--card-spacing:--spacing(4)]"
              >
                <CardHeader className="border-b bg-muted/20 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <ShoppingBag className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-base font-semibold">
                          Order #{order._id.slice(-6).toUpperCase()}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge className={statusInfo.color}>
                        <StatusIcon className="mr-1.5 h-3.5 w-3.5" />
                        {statusInfo.label}
                      </Badge>

                      <Badge variant="outline" className="capitalize">
                        {order.paymentMethod?.replace(/_/g, " ") || "COD"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3 pt-1">
                  {/* Customer Info & Address */}
                  <div className="flex flex-col gap-3 rounded-xl border bg-muted/20 p-3 text-sm">
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Customer
                      </span>
                      {typeof order.user === "object" && order.user?.email && (
                        <span className="truncate text-muted-foreground">
                          {order.user.email}
                        </span>
                      )}
                    </div>

                    {order.address && (
                      <div className="min-w-0 flex-1">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Delivery Address
                        </span>
                        <p className="truncate text-muted-foreground">
                          {order.address}
                        </p>
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Items List */}
                  <div>
                    <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Items Ordered ({order.items?.length || 0})
                    </p>
                    <div className="divide-y rounded-xl border bg-card">
                      {order.items?.map((item, idx) => (
                        <div
                          key={item._id || idx}
                          className="flex items-center gap-3 p-3"
                        >
                          <div className="relative shrink-0">
                            {item.food?.image ? (
                              <img
                                src={buildImageUrl(item.food.image)}
                                alt={item.food.itemName || "Food"}
                                className="h-12 w-12 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                                <UtensilsCrossed className="h-5 w-5 text-muted-foreground" />
                              </div>
                            )}
                            <span
                              className={cn(
                                "absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-card",
                                item.food?.isVeg
                                  ? "bg-green-500"
                                  : "bg-red-500",
                              )}
                            />
                          </div>

                          <div className="flex flex-1 items-center justify-between gap-3">
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium">
                                {item.food?.itemName || "Food item"}
                              </p>
                              <p className="text-xs text-muted-foreground capitalize">
                                {item.quantity} × {formatPrice(item.price)}
                              </p>
                            </div>

                            <span className="shrink-0 text-sm font-semibold">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer / Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Total Amount
                      </p>
                      <p className="text-lg font-bold text-primary">
                        {formatPrice(order.totalAmount)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {nextStatus && (
                        <Button
                          size="sm"
                          disabled={updating}
                          onClick={() =>
                            updateStatus({
                              orderId: order._id,
                              status: nextStatus,
                            })
                          }
                        >
                          {updating ? (
                            <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                          )}
                          Mark as {STATUS_CONFIG[nextStatus]?.label}
                        </Button>
                      )}

                      {["placed", "accepted", "preparing"].includes(order.status) && (
                        <CancelOrderButton
                          subtitle={`Order #${order._id.slice(-6).toUpperCase()}`}
                          loading={updating}
                          onCancel={() =>
                            updateStatus({
                              orderId: order._id,
                              status: "cancelled",
                            })
                          }
                        />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
