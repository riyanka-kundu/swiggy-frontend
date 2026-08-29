"use client";

import {
  Building2,
  CheckCircle2,
  Clock3,
  FileCheck2,
  FileText,
  Landmark,
  Loader2,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Power,
  TrendingUp,
  UserRound,
  WalletCards,
  XCircle,
} from "lucide-react";

import {
  useToggleRestaurantStatus,
  useMyRestaurant,
} from "@/hooks/restaurant-owner";

import { InfoItem } from "@/components/restaurant-owner/info-item";
import { SectionHeader } from "@/components/restaurant-owner/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn, DAYS, formatDay, formatTime, maskAccountNumber } from "@/lib/utils";
import Link from "next/link";

const MyRestaurant = () => {
  const { data: restaurant, isLoading, error } = useMyRestaurant();
  const { mutate: toggleStatus, isPending: toggling } =
    useToggleRestaurantStatus();

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto w-full max-w-7xl space-y-6 p-4 md:p-6 lg:p-8">
          {/* Header skeleton */}

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <div className="h-8 w-64 animate-pulse rounded-md bg-muted" />

              <div className="h-4 w-80 animate-pulse rounded-md bg-muted" />
            </div>

            <div className="h-10 w-36 animate-pulse rounded-md bg-muted" />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <div className="h-64 animate-pulse rounded-xl bg-muted" />

            <div className="h-64 animate-pulse rounded-xl bg-muted" />
          </div>

          {/* Opening hours skeleton */}

          <div className="h-125 animate-pulse rounded-xl bg-muted" />

          {/* Other cards */}

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="h-72 animate-pulse rounded-xl bg-muted" />

            <div className="h-72 animate-pulse rounded-xl bg-muted" />
          </div>

          <div className="h-48 animate-pulse rounded-xl bg-muted" />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <XCircle className="size-6" />
            </div>

            <CardTitle className="mt-4">Unable to load restaurant</CardTitle>

            <CardDescription>
              Something went wrong while fetching your restaurant details.
            </CardDescription>
          </CardHeader>

          <CardContent className="text-center">
            <Button onClick={() => window.location.reload()}>Try again</Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (!restaurant) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center p-6">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
              <Building2 className="size-6 text-muted-foreground" />
            </div>

            <CardTitle className="mt-4">No restaurant found</CardTitle>

            <CardDescription>
              We couldn&apos;t find a restaurant associated with your account.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Button>Set up restaurant</Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  const workingDays = Array.isArray(restaurant.workingDays)
    ? restaurant.workingDays.map((day) => day.toLowerCase())
    : [];

  const openingClosing = restaurant.openingClosing;

  const slots = openingClosing?.slots ?? [];

  const isSameForAllDays = openingClosing?.sameForAllDays;

  const commonSlot = slots[0];

  const isFullyOnboarded =
    restaurant.contract?.accepted ||
    restaurant.status === "approved" ||
    (restaurant.onboardingStep ?? 0) >= 4;

  const onboardingProgress = isFullyOnboarded
    ? 100
    : Math.min(Math.max(((restaurant.onboardingStep ?? 0) / 4) * 100, 0), 100);

  const getStepRoute = (step?: number) => {
    switch (step) {
      case 1:
        return "/partner/onboarding/restaurant";
      case 2:
        return "/partner/onboarding/document";
      case 3:
        return "/partner/onboarding/add-food";
      case 4:
        return "/partner/onboarding/contract";
      default:
        return "/partner/onboarding/restaurant";
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-7xl space-y-6 p-4 md:p-6 lg:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                {restaurant.restaurantName}
              </h1>

              <Badge
                variant={restaurant.isOpen ? "default" : "secondary"}
                className={
                  restaurant.isOpen
                    ? "bg-green-600 hover:bg-green-600"
                    : "bg-muted text-muted-foreground"
                }
              >
                {restaurant.isOpen ? (
                  <>
                    <CheckCircle2 className="mr-1 size-3.5" />
                    Open
                  </>
                ) : (
                  <>
                    <XCircle className="mr-1 size-3.5" />
                    Closed
                  </>
                )}
              </Badge>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4" />
                {restaurant.location}
              </span>

              <span className="hidden sm:inline">•</span>

              <span>{restaurant.outletType || "Restaurant"}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Link href="/partner/onboarding/restaurant">
              <Button className="w-full sm:w-auto">
                <Pencil className="mr-2 size-4" />
                Edit Restaurant
              </Button>
            </Link>

            <Button
              onClick={() => toggleStatus(!restaurant.isOpen)}
              disabled={toggling}
              variant={restaurant.isOpen ? "destructive" : "default"}
              className="w-full sm:w-auto"
            >
              {toggling ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : (
                <Power className="mr-2 size-4" />
              )}
              {restaurant.isOpen ? "Close Restaurant" : "Open Restaurant"}
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* Restaurant Overview */}

          <Card className="overflow-hidden">
            <CardHeader className="border-b bg-muted/30">
              <SectionHeader
                icon={Building2}
                title="Restaurant Overview"
                description="Your restaurant's basic information"
              />
            </CardHeader>

            <CardContent className="grid gap-6 pt-6 sm:grid-cols-2">
              <InfoItem
                icon={UserRound}
                label="Owner Name"
                value={restaurant.ownerName || "-"}
              />

              <InfoItem
                icon={Mail}
                label="Email"
                value={restaurant.email || "-"}
              />

              <InfoItem
                icon={Phone}
                label="Phone"
                value={restaurant.phone || "-"}
              />

              <InfoItem
                icon={Phone}
                label="WhatsApp"
                value={restaurant.whatsappNumber || "-"}
              />

              <InfoItem
                icon={MapPin}
                label="Location"
                value={restaurant.location || "-"}
              />

              <InfoItem
                icon={Building2}
                label="Outlet Type"
                value={restaurant.outletType || "Restaurant"}
              />
            </CardContent>
          </Card>

          {/* Onboarding Progress */}

          <Card className="overflow-hidden">
            <CardHeader className="border-b bg-muted/30">
              <SectionHeader
                icon={TrendingUp}
                title="Onboarding Status"
                description="Track your onboarding progress"
              />
            </CardHeader>

            <CardContent className="space-y-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    {Math.round(onboardingProgress)}%
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Profile completed
                  </p>
                </div>

                <Badge variant="outline">
                  {isFullyOnboarded
                    ? "Step 4 / 4 Completed"
                    : `Step ${restaurant.onboardingStep || 1} / 4`}
                </Badge>
              </div>

              <Progress value={onboardingProgress} className="h-2" />

              <div className="rounded-lg border bg-muted/30 p-4">
                <div className="flex items-start gap-3">
                  {isFullyOnboarded ? (
                    <CheckCircle2 className="mt-0.5 size-5 text-green-600" />
                  ) : (
                    <Clock3 className="mt-0.5 size-5 text-primary" />
                  )}

                  <div>
                    <p className="text-sm font-medium">
                      {isFullyOnboarded
                        ? "Restaurant setup completed"
                        : "Complete your restaurant setup"}
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      Keep your restaurant information updated to ensure
                      everything is ready for operations.
                    </p>
                  </div>
                </div>
              </div>

              {!isFullyOnboarded && (
                <Link
                  href={getStepRoute(restaurant.onboardingStep)}
                  className="block w-full"
                >
                  <Button variant="outline" className="w-full">
                    Continue Setup
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="[--card-spacing:--spacing(4)] md:[--card-spacing:--spacing(6)]">
          <CardHeader className="border-b bg-muted/30">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <SectionHeader
                icon={Clock3}
                title="Opening Hours"
                description="Your restaurant's weekly operating hours"
              />

              <Badge variant="outline">
                {isSameForAllDays ? "Same hours every day" : "Custom hours"}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="overflow-hidden rounded-xl border">
              {DAYS.map((day, index) => {
                const isOpen = workingDays.includes(day);

                const slot = isSameForAllDays ? commonSlot : slots[index];

                return (
                  <div
                    key={day}
                    className={cn(
                      "flex min-h-14 items-center justify-between gap-3 px-4 py-3 sm:px-6",
                      index !== DAYS.length - 1 ? "border-b" : "",
                    )}
                  >
                    {/* Day */}

                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "size-2.5 shrink-0 rounded-full",
                          isOpen ? "bg-green-500" : "bg-muted-foreground/30",
                        )}
                      />

                      <span className="text-sm font-medium sm:text-base">
                        {formatDay(day)}
                      </span>
                    </div>

                    {/* Hours */}

                    {isOpen && slot ? (
                      <div className="flex items-center gap-2 text-right">
                        <Clock3 className="hidden size-4 text-muted-foreground sm:block" />

                        <span className="text-sm font-medium sm:text-base">
                          {formatTime(slot.open)}

                          <span className="mx-1.5 text-muted-foreground">
                            -
                          </span>

                          {formatTime(slot.close)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm font-medium text-muted-foreground">
                        Closed
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
              <Clock3 className="mt-0.5 size-3.5 shrink-0" />

              <p>
                {isSameForAllDays
                  ? "The same opening hours are applied to all working days."
                  : "Opening hours are configured separately for each working day."}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Business Details */}
        <Card>
          <CardHeader>
            <SectionHeader
              icon={FileText}
              title="Business Details"
              description="Legal and registration information"
            />
          </CardHeader>

          <CardContent className="grid gap-5 sm:grid-cols-2">
            <InfoItem
              icon={FileCheck2}
              label="FSSAI Number"
              value={restaurant.fssaiNumber}
            />

            <InfoItem icon={FileText} label="GSTIN" value={restaurant.gstin} />

            <InfoItem
              icon={FileText}
              label="PAN Number"
              value={restaurant.panNumber}
            />

            <InfoItem
              icon={Landmark}
              label="IFSC Code"
              value={restaurant.ifscCode}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b bg-muted/30">
            <SectionHeader
              icon={WalletCards}
              title="Bank Account"
              description="Settlement and payment account information"
            />
          </CardHeader>

          <CardContent className="grid gap-6 pt-6 md:grid-cols-2">
            <InfoItem
              icon={WalletCards}
              label="Bank Account Number"
              value={maskAccountNumber(restaurant.bankAccountNumber)}
            />

            <InfoItem
              icon={Landmark}
              label="IFSC Code"
              value={restaurant.ifscCode}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default MyRestaurant;
