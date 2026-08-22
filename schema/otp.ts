import { z } from "zod";

// Form validation schema
export const VerifyOtpSchema = z.object({
  otp: z
    .string()
    .min(6, {
      message: "OTP must be 6 digits",
    })
    .max(6, {
      message: "OTP must be 6 digits",
    })
    .regex(/^[0-9]{6}$/, {
      message: "OTP must contain only numbers",
    }),
});

// Only form data
export type TVerifyOtpForm = z.infer<typeof VerifyOtpSchema>;

// API payload
export type TVerifyOtpPayload = TVerifyOtpForm & {
  userId: string;
};
