import { z } from "zod";

export const RegisterSchema = z
  .object({
    full_name: z
      .string()
      .min(5, { message: "Full name must be at least 5 characters" })
      .max(20, { message: "Full name must not exceed 20 characters" }),

    mobile_Number: z
      .string()
      .min(1, { message: "Mobile number is required" })
      .regex(/^[0-9]{10}$/, {
        message: "Mobile number must be exactly 10 digits",
      }),

    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Please enter a valid email address" }),

    address: z
      .string()
      .min(8, { message: "Address must be at least 8 characters" })
      .max(50, { message: "Address must not exceed 50 characters" }),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),

    confirm_password: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type TRegisterPayload = z.infer<typeof RegisterSchema>;
