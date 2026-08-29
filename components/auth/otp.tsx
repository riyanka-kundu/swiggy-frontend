"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Cookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import {
  TVerifyOtpForm,
  TVerifyOtpPayload,
  VerifyOtpSchema,
} from "@/schema/otp";

import { verifyOtp } from "@/redux/slice/auth-slice";

import { AppDispatch, RootState } from "@/redux/store/store";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function Otpverify() {
  const dispatch = useDispatch<AppDispatch>();

  const { loading } = useSelector((state: RootState) => state.auth);

  const cookies = new Cookies();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TVerifyOtpForm>({
    resolver: zodResolver(VerifyOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const verify = async (otp: string) => {
    if (loading) return;

    try {
      const userId = cookies.get("id");

      if (!userId) {
        toast.error("User id not found");
        return;
      }

      const payload: TVerifyOtpPayload = {
        otp,
        userId,
      };

      const res = await dispatch(verifyOtp(payload)).unwrap();

      toast.success(res.message);
    } catch (error) {
      toast.error(
        typeof error === "string" ? error : "OTP verification failed",
      );
    }
  };

  const onSubmit = (data: TVerifyOtpForm) => verify(data.otp);

  return (
    <div className="w-full max-w-md mx-auto">
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
            <p className="mt-2 text-sm text-red-500">{errors.otp.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            rounded-lg
            bg-orange-500
            py-4
            font-bold
            text-white
            disabled:opacity-50
          "
        >
          {loading ? "VERIFYING..." : "VERIFY OTP"}
        </button>
      </form>
    </div>
  );
}
