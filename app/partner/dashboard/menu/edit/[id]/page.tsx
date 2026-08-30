"use client";

import { EditFoodForm } from "@/components/restaurant-owner/edit-food-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useFoodDetail, useUpdateFood } from "@/hooks/restaurant-owner";
import { AlertTriangle, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const EditFoodPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const { data: food, isLoading, error } = useFoodDetail(id);
  const { mutate: updateFood, isPending } = useUpdateFood();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !food) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
          <AlertTriangle className="h-10 w-10 text-destructive" />
          <p className="font-medium">Failed to load food item</p>
          <p className="max-w-sm text-xs text-muted-foreground">
            {error
              ? "Something went wrong while loading this item."
              : "This food item may no longer exist."}
          </p>
          <Button variant="outline" onClick={() => router.back()}>
            Go back
          </Button>
        </CardContent>
      </Card>
    );
  }

  const onSave = (formData: FormData) => {
    if (!id) return;
    updateFood(
      { id, formData },
      {
        onSuccess: () => router.replace("/partner/dashboard/menu"),
      },
    );
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 p-4 md:space-y-6 md:p-6">
      <div className="flex items-center gap-3">
        <Link href="/partner/dashboard/menu">
          <Button variant="outline" size="icon" className="h-9 w-9 shrink-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Food Item</h1>
          <p className="text-sm text-muted-foreground">
            Update the details of {food.itemName}.
          </p>
        </div>
      </div>

      <EditFoodForm
        key={food._id}
        food={food}
        onSave={onSave}
        isPending={isPending}
      />
    </div>
  );
};

export default EditFoodPage;
