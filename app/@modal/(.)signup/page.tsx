"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import Otpverify from "@/components/auth/otp";
import RegisterPage from "@/components/auth/register";

import { resetAuth } from "@/redux/slice/auth-slice";

import { AppDispatch, RootState } from "@/redux/store/store";

type Step = "register" | "otp";

const STEP_CONTENT = {
  register: {
    title: "Create an account",
    description: "Sign up to start ordering your favorite food.",
  },
   
  otp: {
    title: "Verify your mobile",
    description: "Enter the OTP sent to your email.",
  },
};

export default function SignUpPage() {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const dispatch = useDispatch<AppDispatch>();

  const { registerData, otpData } = useSelector(
    (state: RootState) => state.auth,
  );

  const step: Step = registerData ? "otp" : "register";

  useEffect(() => {
    return () => {
      dispatch(resetAuth());
    };
  }, [dispatch]);

  useEffect(() => {
    if (otpData) {
      dispatch(resetAuth());
      router.replace("/signin");
    }
  }, [otpData, dispatch, router]);


  const copy = STEP_CONTENT[step];

  return (
    <Sheet
      open={open}
      onOpenChange={(value) => {
        setOpen(value);

        if (!value) {
          dispatch(resetAuth());
          router.back();
        }
      }}
    >
      <SheetContent
        side="right"
        className="
          w-full
          overflow-y-auto
          sm:max-w-md
        "
      >
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">{copy.title}</SheetTitle>

          <SheetDescription>{copy.description}</SheetDescription>
        </SheetHeader>

        <div className="mt-6 px-4 pb-6">
          {step === "register" ? (
            <>
              <RegisterPage />

              <p
                className="
                  mt-5
                  text-center
                  text-sm
                  text-muted-foreground
                "
              >
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="
                    font-medium
                    text-orange-500
                    hover:underline
                  "
                >
                  Sign in
                </Link>
              </p>
            </>
          ) : (
            <Otpverify />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
