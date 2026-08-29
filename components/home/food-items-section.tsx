"use client";

import FoodCard from "@/components/home/food-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useUserFoodList } from "@/hooks/user";
import { RootState } from "@/redux/store/store";
import { Search, Sparkles } from "lucide-react";
import { useState } from "react";

import { useSelector } from "react-redux";

export default function FoodItemsSection() {
  const { data: authData } = useSelector((state: RootState) => state.auth);
  const isLoggedInUser = authData?.data?.role === "user";

  const [search, setSearch] = useState("");

  const { data: foods, isLoading } = useUserFoodList(search, isLoggedInUser);

  const foodList = Array.isArray(foods) ? foods : [];

  if (!isLoggedInUser) {
    return null;
  }

  return (
    <section id="food-items" className="mx-auto max-w-6xl px-6 pb-20 md:px-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Featured Menu
          </p>
          <h2 className="text-2xl font-black md:text-3xl">
            Order from Top Kitchens
          </h2>
        </div>
        <Badge variant="outline" className="hidden sm:flex">
          <Sparkles className="mr-1 h-3.5 w-3.5 text-primary" />
          Fresh & Hot
        </Badge>
      </div>

      <div className="relative mb-8 max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search food items…"
          className="pl-10"
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>
      ) : foodList.length === 0 ? (
        <p className="py-10 text-center text-muted-foreground">
          No food items found.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {foodList.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>
      )}
    </section>
  );
}
