"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useFoodDetail, useUpdateFood } from "@/hooks/restaurant-owner";
import { buildImageUrl } from "@/lib/utils";
import { AlertTriangle, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import type { Food } from "@/type";

const CATEGORIES = [
  "Starter",
  "Main Course",
  "Dessert",
  "Beverage",
  "Snack",
];

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

      <EditFoodForm key={food._id} food={food} onSave={onSave} isPending={isPending} />
    </div>
  );
};

type EditFoodFormProps = {
  food: Food;
  onSave: (formData: FormData) => void;
  isPending: boolean;
};

const EditFoodForm = ({ food, onSave, isPending }: EditFoodFormProps) => {
  const [itemName, setItemName] = useState(food.itemName ?? "");
  const [description, setDescription] = useState(food.description ?? "");
  const [foodType, setFoodType] = useState(food.foodType ?? "");
  const [category, setCategory] = useState(food.category ?? "");
  const [cuisine, setCuisine] = useState(food.cuisine ?? "");
  const [isVeg, setIsVeg] = useState(food.isVeg ?? true);
  const [basePrice, setBasePrice] = useState(
    food.basePrice != null ? String(food.basePrice) : "",
  );
  const [discountPrice, setDiscountPrice] = useState(
    food.discountPrice ? String(food.discountPrice) : "",
  );
  const [gst, setGst] = useState(food.gst != null ? String(food.gst) : "");
  const [preparationTime, setPreparationTime] = useState(
    food.preparationTime != null ? String(food.preparationTime) : "",
  );
  const [isAvailable, setIsAvailable] = useState(food.isAvailable ?? true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    food.image ? buildImageUrl(food.image) : null,
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("itemName", itemName.trim());
    formData.append("description", description || "");
    formData.append("category", category || "Main Course");
    formData.append("cuisine", cuisine || "");
    formData.append("foodType", foodType || "Main Course");
    formData.append("isVeg", String(isVeg));
    formData.append("isAvailable", String(isAvailable));
    formData.append("basePrice", String(Number(basePrice) || 0));
    if (discountPrice !== "" && discountPrice !== null) {
      formData.append("discountPrice", String(Number(discountPrice) || 0));
    }
    formData.append("gst", String(Number(gst) || 0));
    formData.append(
      "preparationTime",
      String(Number(preparationTime) || 0),
    );
    if (imageFile) {
      formData.append("image", imageFile);
    }

    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Paneer Butter Masala"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-food-type">Food Type</FieldLabel>
              <Select value={foodType} onValueChange={setFoodType}>
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
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-category">Category</FieldLabel>
              <Input
                id="edit-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Snack, Main Course…"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-veg">Veg / Non-Veg</FieldLabel>
              <Select
                value={isVeg ? "veg" : "non-veg"}
                onValueChange={(v) => setIsVeg(v === "veg")}
              >
                <SelectTrigger id="edit-veg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="veg">Veg</SelectItem>
                  <SelectItem value="non-veg">Non-Veg</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-cuisine">Cuisine</FieldLabel>
              <Input
                id="edit-cuisine"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                placeholder="Indian, Chinese"
              />
            </Field>

            <Field className="md:col-span-2">
              <FieldLabel htmlFor="edit-description">Description</FieldLabel>
              <Textarea
                id="edit-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
                placeholder="249"
              />
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
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                placeholder="199"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-gst">GST (%)</FieldLabel>
              <Input
                id="edit-gst"
                type="number"
                min={0}
                step="0.01"
                value={gst}
                onChange={(e) => setGst(e.target.value)}
                placeholder="5"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-prep-time">
                Preparation Time (mins)
              </FieldLabel>
              <Input
                id="edit-prep-time"
                type="number"
                min={0}
                value={preparationTime}
                onChange={(e) => setPreparationTime(e.target.value)}
                placeholder="20"
              />
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
              <Select
                value={isAvailable ? "available" : "unavailable"}
                onValueChange={(v) => setIsAvailable(v === "available")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="unavailable">Unavailable</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-image">Item Image</FieldLabel>
              <input
                id="edit-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-sm file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-2 file:text-sm file:text-primary-foreground"
              />
              {imagePreview && (
                <div className="mt-4 flex max-w-sm rounded-lg border p-2 shadow-sm">
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

export default EditFoodPage;
