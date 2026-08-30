import { z } from "zod";

const nonNegativeNumberString = (message: string) =>
  z
    .string()
    .refine((v) => v === "" || (!Number.isNaN(Number(v)) && Number(v) >= 0), {
      message,
    });

export const editFoodSchema = z.object({
  itemName: z.string().min(1, "Item name is required"),
  description: z.string().optional().or(z.literal("")),
  foodType: z.string().optional().or(z.literal("")),
  category: z.string().optional().or(z.literal("")),
  cuisine: z.string().optional().or(z.literal("")),
  isVeg: z.boolean(),
  basePrice: nonNegativeNumberString("Base price must be a valid number"),
  discountPrice: nonNegativeNumberString("Discount price must be a valid number"),
  gst: nonNegativeNumberString("GST must be a valid number"),
  preparationTime: nonNegativeNumberString(
    "Preparation time must be a valid number",
  ),
  isAvailable: z.boolean(),
});

export type TEditFoodForm = z.infer<typeof editFoodSchema>;
