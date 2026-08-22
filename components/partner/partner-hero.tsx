"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type PartnerHeroProps = {
  activeTab: "delivery" | "dineout";
  email: string;
  setEmail: (value: string) => void;
  onContinue: () => void;
};

export default function PartnerHero({
  activeTab,
  email,
  setEmail,
  onContinue,
}: PartnerHeroProps) {
  return (
    <section
      className="relative h-[600px] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4')",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        {/* Left */}
        <div className="max-w-lg text-white">
          <div className="mb-6 flex items-center gap-3">
            <div className="text-4xl">🍴</div>

            <div>
              <p className="text-sm tracking-widest uppercase">
                {activeTab === "delivery" ? "PARTNER WITH US" : "JOIN DINEOUT"}
              </p>
            </div>
          </div>

          <h1 className="text-5xl font-bold leading-tight">
            {activeTab === "delivery"
              ? "Reach customers far away from you"
              : "Grow your dine-in business with us"}
          </h1>

          <p className="mt-5 text-lg text-gray-200">
            {activeTab === "delivery"
              ? "Start delivering food online and grow your restaurant."
              : "Get more table bookings and increase your dine-in customers."}
          </p>

          <div className="mt-8 h-1 w-16 bg-orange-500" />
        </div>

        {/* Right Card */}
        <Card className="w-[420px] rounded-3xl bg-card shadow-xl">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold">
              {activeTab === "delivery"
                ? "Become a Delivery Partner"
                : "Join Dineout"}
            </h2>

            <p className="mt-4 text-sm text-muted-foreground">
              Enter your email to continue
            </p>

            <Input
              className="mt-5 h-14 rounded-xl"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              onClick={onContinue}
              className="mt-5 h-12 w-full rounded-xl"
            >
              Continue
            </Button>

            <p className="mt-5 text-center text-xs text-muted-foreground">
              By continuing, you agree to our Terms & Conditions.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
