import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { buildImageUrl } from "@/lib/utils";
import { editFoodSchema, TEditFoodForm } from "@/schema/edit-food";
import { Food } from "@/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const CATEGORIES = ["Starter", "Main Course", "Dessert", "Beverage", "Snack"];

type EditFoodFormProps = {
  food: Food;
  onSave: (formData: FormData) => void;
  isPending: boolean;
};

export const EditFoodForm = ({
  food,
  onSave,
  isPending,
}: EditFoodFormProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    food.image ? buildImageUrl(food.image) : null,
  );

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TEditFoodForm>({
    resolver: zodResolver(editFoodSchema),
    defaultValues: {
      itemName: food.itemName ?? "",
      description: food.description ?? "",
      foodType: food.foodType ?? "",
      category: food.category ?? "",
      cuisine: food.cuisine ?? "",
      isVeg: food.isVeg ?? true,
      basePrice: food.basePrice != null ? String(food.basePrice) : "",
      discountPrice: food.discountPrice ? String(food.discountPrice) : "",
      gst: food.gst != null ? String(food.gst) : "",
      preparationTime:
        food.preparationTime != null ? String(food.preparationTime) : "",
      isAvailable: food.isAvailable ?? true,
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const onSubmit = (data: TEditFoodForm) => {
    const formData = new FormData();
    formData.append("itemName", data.itemName.trim());
    formData.append("description", data.description || "");
    formData.append("category", data.category || "Main Course");
    formData.append("cuisine", data.cuisine || "");
    formData.append("foodType", data.foodType || "Main Course");
    formData.append("isVeg", String(data.isVeg));
    formData.append("isAvailable", String(data.isAvailable));
    formData.append("basePrice", String(Number(data.basePrice) || 0));
    if (data.discountPrice && data.discountPrice !== "") {
      formData.append("discountPrice", String(Number(data.discountPrice) || 0));
    }
    formData.append("gst", String(Number(data.gst) || 0));
    formData.append(
      "preparationTime",
      String(Number(data.preparationTime) || 0),
    );
    if (imageFile) {
      formData.append("image", imageFile);
    }

    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Details</CardTitle>
          <CardDescription>
            Edit the item name, description, type, and category.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup className="grid gap-5 md:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="edit-item-name">Item Name</FieldLabel>
              <Input
                id="edit-item-name"
                {...register("itemName")}
                placeholder="Paneer Butter Masala"
              />
              {errors.itemName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.itemName.message}
                </p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-food-type">Food Type</FieldLabel>
              <Controller
                name="foodType"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="edit-food-type">
                      <SelectValue placeholder="Select a food type" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-category">Category</FieldLabel>
              <Input
                id="edit-category"
                {...register("category")}
                placeholder="Snack, Main Course…"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-veg">Veg / Non-Veg</FieldLabel>
              <Controller
                name="isVeg"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ? "veg" : "non-veg"}
                    onValueChange={(v) => field.onChange(v === "veg")}
                  >
                    <SelectTrigger id="edit-veg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="veg">Veg</SelectItem>
                      <SelectItem value="non-veg">Non-Veg</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-cuisine">Cuisine</FieldLabel>
              <Input
                id="edit-cuisine"
                {...register("cuisine")}
                placeholder="Indian, Chinese"
              />
            </Field>

            <Field className="md:col-span-2">
              <FieldLabel htmlFor="edit-description">Description</FieldLabel>
              <Textarea
                id="edit-description"
                {...register("description")}
                rows={3}
                placeholder="Rich, creamy tomato-based curry with paneer cubes."
              />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pricing</CardTitle>
          <CardDescription>
            Set the base price, discount, GST, and preparation time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup className="grid gap-5 md:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="edit-base-price">Base Price</FieldLabel>
              <Input
                id="edit-base-price"
                type="number"
                min={0}
                step="0.01"
                {...register("basePrice")}
                placeholder="249"
              />
              {errors.basePrice && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.basePrice.message}
                </p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-discount-price">
                Discount Price
              </FieldLabel>
              <Input
                id="edit-discount-price"
                type="number"
                min={0}
                step="0.01"
                {...register("discountPrice")}
                placeholder="199"
              />
              {errors.discountPrice && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.discountPrice.message}
                </p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-gst">GST (%)</FieldLabel>
              <Input
                id="edit-gst"
                type="number"
                min={0}
                step="0.01"
                {...register("gst")}
                placeholder="5"
              />
              {errors.gst && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.gst.message}
                </p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-prep-time">
                Preparation Time (mins)
              </FieldLabel>
              <Input
                id="edit-prep-time"
                type="number"
                min={0}
                {...register("preparationTime")}
                placeholder="20"
              />
              {errors.preparationTime && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.preparationTime.message}
                </p>
              )}
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Availability & Image</CardTitle>
          <CardDescription>
            Toggle availability and update the item image.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup className="space-y-5">
            <Field>
              <FieldLabel>Availability</FieldLabel>
              <Controller
                name="isAvailable"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ? "available" : "unavailable"}
                    onValueChange={(v) => field.onChange(v === "available")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="unavailable">Unavailable</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-image">Item Image</FieldLabel>
              <input
                id="edit-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-sm file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-2 file:text-primary-foreground"
              />
              {imagePreview && (
                <div className="mt-4 flex max-w-sm p-2 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt="Food preview"
                    className="h-28 w-28 rounded object-cover"
                  />
                </div>
              )}
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Link href="/partner/dashboard/menu">
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </Link>
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </div>
    </form>
  );
};
