import { z } from "zod";

export const partnerLoginSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export type TPartnerLoginPayload = z.infer<typeof partnerLoginSchema>;
