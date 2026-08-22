"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { applyRestaurant } from "@/redux/slice/partner-slice";
import type { AppDispatch, RootState } from "@/redux/store/store";
import {
  partnerLoginSchema,
  TPartnerLoginPayload,
} from "@/schema/partner-login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function PartnerApplyRestaurantPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { loading } = useSelector(
    (state: RootState) => state.partner,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TPartnerLoginPayload>({
    resolver: zodResolver(partnerLoginSchema),
  });

  const onSubmit = async (data: TPartnerLoginPayload) => {
    try {
      await dispatch(applyRestaurant(data)).unwrap();

      toast.success("OTP sent successfully");

      router.push(
        `/partner/otp?email=${encodeURIComponent(data.email)}`,
      );
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            Become a Restaurant Partner
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <div>
              <Input
                type="email"
                placeholder="Restaurant Email"
                {...register("email")}
              />

              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Continue"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}