"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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

export default function Otpverify() {
  const dispatch = useDispatch<AppDispatch>();

  const { loading } = useSelector((state: RootState) => state.auth);

  const cookies = new Cookies();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TVerifyOtpForm>({
    resolver: zodResolver(VerifyOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: TVerifyOtpForm) => {
    try {
      const userId = cookies.get("id");

      if (!userId) {
        toast.error("User id not found");
        return;
      }

      const payload: TVerifyOtpPayload = {
        otp: data.otp,
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

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <input
            {...register("otp")}
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="Enter OTP"
            className="
              w-full
              rounded-lg
              border
              p-4
              outline-none
              focus:ring-2
              focus:ring-orange-500
            "
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
