"use client";

import { register as registerUser } from "@/redux/slice/auth-slice";
import type { AppDispatch, RootState } from "@/redux/store/store";
import { RegisterSchema, TRegisterPayload } from "@/schema/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function RegisterPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { loading } = useSelector((state: RootState) => state.auth);

  const [visibility, setVisibility] = useState({
    password: false,
    confirm_password: false,
  });

  const toggleVisibility = (field: keyof typeof visibility) =>
    setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterPayload>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: TRegisterPayload) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      toast.success("Registration successful. Please verify your OTP.");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Registration failed");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name */}
      <div>
        <input
          {...registerField("full_name")}
          autoComplete="name"
          placeholder="Full Name"
          className="w-full rounded-lg border p-4 outline-none focus:ring-2 focus:ring-orange-500"
        />
        {errors.full_name && (
          <p className="mt-1 text-sm text-red-500">
            {errors.full_name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <input
          {...registerField("email")}
          type="email"
          autoComplete="email"
          placeholder="Email"
          className="w-full rounded-lg border p-4 outline-none focus:ring-2 focus:ring-orange-500"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Address */}
      <div>
        <input
          {...registerField("address")}
          autoComplete="street-address"
          placeholder="Address"
          className="w-full rounded-lg border p-4 outline-none focus:ring-2 focus:ring-orange-500"
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>
        )}
      </div>

      {/* Mobile */}
      <div>
        <input
          {...registerField("mobile_Number")}
          autoComplete="tel"
          placeholder="Mobile Number"
          className="w-full rounded-lg border p-4 outline-none focus:ring-2 focus:ring-orange-500"
        />
        {errors.mobile_Number && (
          <p className="mt-1 text-sm text-red-500">
            {errors.mobile_Number.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <div className="relative">
          <input
            {...registerField("password")}
            type={visibility.password ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Password"
            className="w-full rounded-lg border p-4 pr-12 outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="button"
            onClick={() => toggleVisibility("password")}
            tabIndex={-1}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {visibility.password ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <div className="relative">
          <input
            {...registerField("confirm_password")}
            type={visibility.confirm_password ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Confirm Password"
            className="w-full rounded-lg border p-4 pr-12 outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="button"
            onClick={() => toggleVisibility("confirm_password")}
            tabIndex={-1}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {visibility.confirm_password ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        {errors.confirm_password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.confirm_password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-orange-500 py-4 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Creating Account..." : "Continue"}
      </button>
    </form>
  );
}
