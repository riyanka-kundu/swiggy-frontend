"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { verifyRestaurantOtp } from "@/redux/slice/partner-slice";
import type { AppDispatch, RootState } from "@/redux/store/store";
import { partnerOtpSchema, TPartnerOtpPayload } from "@/schema/partner-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function PartnerOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const dispatch = useDispatch<AppDispatch>();

  const { loading } = useSelector((state: RootState) => state.partner);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TPartnerOtpPayload>({
    resolver: zodResolver(partnerOtpSchema),
  });

  const onSubmit = async (data: TPartnerOtpPayload) => {
    if (!email) {
      toast.error("Email not found.");
      return;
    }

    try {
      await dispatch(
        verifyRestaurantOtp({
          email,
          otp: data.otp,
        }),
      ).unwrap();

      toast.success("Email verified successfully");

      router.push("/partner/onboarding/restaurant");
    } catch (error) {
      toast.error(error as string);
    }
  };

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
            <div>
              <Input
                placeholder="Enter 6 digit OTP"
                maxLength={6}
                inputMode="numeric"
                {...register("otp")}
              />

              {errors.otp && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.otp.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
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
