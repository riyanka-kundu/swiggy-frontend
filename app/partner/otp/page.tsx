"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyRestaurantOtp } from "@/redux/slice/partner-slice";
import type { AppDispatch, RootState } from "@/redux/store/store";
import { partnerOtpSchema, TPartnerOtpPayload } from "@/schema/partner-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function PartnerOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const dispatch = useDispatch<AppDispatch>();

  const { loading } = useSelector((state: RootState) => state.partner);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TPartnerOtpPayload>({
    resolver: zodResolver(partnerOtpSchema),
    defaultValues: { otp: "" },
  });

  const verify = async (otp: string) => {
    if (loading) return;

    if (!email) {
      toast.error("Email not found.");
      return;
    }

    try {
      await dispatch(
        verifyRestaurantOtp({
          email,
          otp,
        }),
      ).unwrap();

      toast.success("Email verified successfully");

      router.replace("/partner/onboarding/restaurant");
    } catch (error) {
      toast.error(error as string);
    }
  };

  const onSubmit = (data: TPartnerOtpPayload) => verify(data.otp);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Verify Restaurant Email</CardTitle>

          <p className="text-center text-sm text-muted-foreground">
            OTP sent to {email}
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex flex-col items-center gap-3">
              <Controller
                name="otp"
                control={control}
                render={({ field, fieldState }) => (
                  <InputOTP
                    {...field}
                    maxLength={6}
                    disabled={loading}
                    onComplete={verify}
                    aria-invalid={fieldState.invalid}
                  >
                    <InputOTPGroup>
                      {Array.from({ length: 6 }).map((_, index) => (
                        <InputOTPSlot key={index} index={index} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />

              {errors.otp && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.otp.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-orange-500 py-4 font-bold text-white disabled:opacity-50"
            >
              {loading ? "VERIFYING..." : "VERIFY OTP"}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PartnerOtpPage() {
  return (
    <Suspense>
      <PartnerOtpForm />
    </Suspense>
  );
}
