import { z } from "zod";

export const partnerOtpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^[0-9]+$/, "OTP must contain only numbers"),
});

export type TPartnerOtpPayload = z.infer<typeof partnerOtpSchema>;
