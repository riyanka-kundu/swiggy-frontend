import { z } from "zod";

export const applyRestaurantSchema = z.object({
  phone: z
    .string()
    .min(1, "Mobile number is required")
    .regex(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
});

export const restaurantOtpSchema = z.object({
  otp: z
    .array(z.string().min(1, "OTP digit is required"))
    .length(6, "OTP must be 6 digits"),
});

export const restaurantSchema = z.object({
  ownerName: z.string().min(1, "Owner name is required"),

  restaurantName: z.string().min(1, "Restaurant name is required"),

  location: z.string().min(1, "Location is required"),

  email: z.string().min(1, "Email is required").email("Invalid email address"),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^(\+91)?[0-9]{10}$/, "Phone number must be 10 digits"),

  whatsappNumber: z
    .string()
    .min(1, "WhatsApp number is required")
    .regex(/^(\+91)?[0-9]{10}$/, "WhatsApp number must be 10 digits"),


  workingDays: z.array(z.string()).min(1, "Select at least one working day"),

  openingClosing: z.object({
    sameForAllDays: z.boolean(),

    slots: z.array(
      z.object({
        open: z.string().min(1, "Opening time is required"),
        close: z.string().min(1, "Closing time is required"),
      }),
    ),
  }),
});

export const restaurantDocSchema = z.object({
  outletType: z.string().min(1, "Outlet type is required"),

  pan: z.string().min(1, "PAN number is required"),

  gstin: z.string().min(1, "GSTIN is required"),

  ifscCode: z.string().min(1, "IFSC code is required"),

  bankAccountNumber: z.string().min(1, "Bank account number is required"),

  fssaiNumber: z.string().min(1, "FSSAI number is required"),
});

export const menuSchema = z.object({
  itemName: z.string().min(1, "Item name is required"),

  description: z.string().min(1, "Description is required"),

  foodType: z.enum(["veg", "non-veg"], {
    error: "Food type is required",
  }),

  category: z.string().min(1, "Category is required"),

  image: z.any().nullable().optional(),

  basePrice: z.coerce.number().positive("Base price must be greater than 0"),

  discountPrice: z.coerce.number().nullable().optional(),

  gst: z.coerce.number().min(0, "GST is required"),

  variants: z.array(
    z.object({
      name: z.string().min(1, "Variant name is required"),
      price: z.coerce.number(),
    }),
  ).optional().default([]),

  addons: z.array(
    z.object({
      name: z.string().min(1, "Addon name is required"),
      price: z.coerce.number(),
    }),
  ),

  tags: z.array(z.string()),

  isAvailable: z.boolean(),

  enablePreOrder: z.boolean(),

  allowSpecialInstructions: z.boolean(),

  eligibleForOffers: z.boolean(),

  preparationTime: z.object({
    min: z.coerce.number(),

    max: z.coerce.number(),
  }),
});

export const contractSchema = z.object({
  fullName: z.string().min(1, "Authorized signatory name is required"),

  designation: z.string().min(1, "Designation is required"),

  place: z.string().min(1, "Place / City is required"),

  agreed: z.boolean().refine((value) => value === true, {
    message: "You must accept all terms to proceed",
  }),
});


export type TApplyRestaurant = z.infer<typeof applyRestaurantSchema>;

export type TRestaurantOtp = z.infer<typeof restaurantOtpSchema>;

export type TRestaurant = z.infer<typeof restaurantSchema>;

export type TRestaurantDoc = z.infer<typeof restaurantDocSchema>;

export type TMenu = z.infer<typeof menuSchema>;
export type TMenuInput = z.input<typeof menuSchema>;

export type TContract = z.infer<typeof contractSchema>;
