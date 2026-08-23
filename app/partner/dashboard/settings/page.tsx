"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useMyRestaurant,
  usePendingFoodCount,
  useToggleRestaurantStatus,
} from "@/hooks/restaurant-owner";
import {
  Building2,
  CheckCircle2,
  Clock,
  Loader2,
  Power,
  Store,
  XCircle,
} from "lucide-react";

import Link from "next/link";

export default function SettingsPage() {
  const { data: restaurant, isLoading } = useMyRestaurant();
  const { data: pendingCount } = usePendingFoodCount();
  const { mutate: toggleStatus, isPending: toggling } =
    useToggleRestaurantStatus();

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="h-52 animate-pulse rounded-xl bg-muted" />
          <div className="h-52 animate-pulse rounded-xl bg-muted" />
        </div>
      </div>
    );
  }

  const isOpen = restaurant?.isOpen ?? false;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Restaurant Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage operational availability and account details
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Open / Close Operational Status */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Store className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Store Status</CardTitle>
              </div>
              <Badge
                variant={isOpen ? "default" : "secondary"}
                className={isOpen ? "bg-green-600 hover:bg-green-600" : ""}
              >
                {isOpen ? (
                  <>
                    <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                    Open for Orders
                  </>
                ) : (
                  <>
                    <XCircle className="mr-1 h-3.5 w-3.5" />
                    Currently Closed
                  </>
                )}
              </Badge>
            </div>
            <CardDescription>
              Toggle your restaurant visibility to pause or accept new customer
              orders.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xs text-muted-foreground">
              {isOpen
                ? "Your restaurant is currently accepting online orders. Customers can view your menu and place orders."
                : "Your restaurant is currently closed. Customers cannot place new orders until you reopen."}
            </p>

            <Button
              onClick={() => toggleStatus(!isOpen)}
              disabled={toggling}
              variant={isOpen ? "destructive" : "default"}
              className="w-full"
            >

              {toggling ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Power className="mr-2 h-4 w-4" />
              )}
              {isOpen ? "Close Restaurant" : "Open Restaurant"}
            </Button>
          </CardContent>
        </Card>

        {/* Approval & Pending Status */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Approval & Menu Queue</CardTitle>
            </div>
            <CardDescription>
              Overview of your restaurant onboarding and menu approvals
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border bg-muted/20 p-3">
              <div>
                <p className="text-sm font-medium">Account Status</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {restaurant?.status || "Pending"}
                </p>
              </div>
              <Badge variant="outline" className="capitalize">
                {restaurant?.status}
              </Badge>
            </div>

            <div className="flex items-center justify-between rounded-lg border bg-muted/20 p-3">
              <div>
                <p className="text-sm font-medium">Pending Food Approvals</p>
                <p className="text-xs text-muted-foreground">
                  Items waiting for admin review
                </p>
              </div>
              <Badge
                className={
                  (pendingCount ?? 0) > 0
                    ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                    : "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300"
                }
              >
                <Clock className="mr-1 h-3 w-3" />
                {pendingCount ?? 0} Pending
              </Badge>
            </div>

            <Link href="/partner/dashboard/menu" className="block">
              <Button variant="outline" className="w-full text-xs">
                View Menu Items
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
