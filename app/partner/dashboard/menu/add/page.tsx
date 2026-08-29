"use client";

import Menu from "@/components/food-menu-details/menu/food-menu";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DashboardAddFoodPage() {
  const router = useRouter();

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Add Food Item</h1>
        <p className="text-sm text-muted-foreground">
          Add a new item to your restaurant&apos;s menu.
        </p>
      </div>

      <Menu
        onNext={() => {
          toast.success("Food item added successfully!");
          router.push("/partner/dashboard/menu");
        }}
      />
    </div>
  );
}
