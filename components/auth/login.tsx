"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { login } from "@/redux/slice/auth-slice";
import { AppDispatch, RootState } from "@/redux/store/store";
import { LoginSchema, TLoginPayload } from "@/schema/login";

type Props = {
  onSuccess: () => void;
};

export default function Login({ onSuccess }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginPayload>({
    resolver: zodResolver(LoginSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data: TLoginPayload) => {
    try {
      const res = await dispatch(login(data)).unwrap();
      toast.success(res.message || "Login successful");
      onSuccess();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Email */}
      <div>
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="w-full rounded-lg border px-4 py-3.5 outline-none focus:ring-2 focus:ring-orange-500"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full rounded-lg border px-4 py-3.5 pr-12 outline-none focus:ring-2 focus:ring-orange-500"
          />

          <Button
            type="button"
            onClick={togglePasswordVisibility}
            tabIndex={-1}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </Button>
        </div>

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        disabled={loading}
        type="submit"
        className="w-full rounded-lg bg-orange-500 py-4 font-bold text-white hover:bg-orange-600 disabled:opacity-50"
      >
        {loading ? "LOGGING IN..." : "LOGIN"}
      </button>
    </form>
  );
}
