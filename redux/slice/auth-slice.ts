import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { Cookies } from "react-cookie";

import { axiosInstance } from "@/lib/api";
import { EndPoints } from "@/lib/endpoints";

import { TLoginPayload } from "@/schema/login";
import { TVerifyOtpPayload } from "@/schema/otp";
import { TRegisterPayload } from "@/schema/register";

import { ACCESS_TOKEN, REFRESH_TOKEN, USER_ROLE } from "@/lib/constant";
import { IApiResponse } from "@/type/auth";

// ================= REGISTER =================

export const register = createAsyncThunk<
  IApiResponse["Register"],
  TRegisterPayload,
  {
    rejectValue: string;
  }
>(
  "auth/register",

  async (payload, { rejectWithValue }) => {
    const cookies = new Cookies();

    try {
      const res = await axiosInstance.post<IApiResponse["Register"]>(
        EndPoints.auth.REGISTER,
        payload,
      );

      // save user id for OTP verification

      cookies.set("id", res.data.data.id, {
        path: "/",
        maxAge: 60 * 60 * 24,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      return rejectWithValue(
        err.response?.data?.message || "Registration failed",
      );
    }
  },
);

// ================= LOGIN =================

export const login = createAsyncThunk<
  IApiResponse["Login"],
  TLoginPayload,
  {
    rejectValue: string;
  }
>(
  "auth/login",

  async (payload, { rejectWithValue }) => {
    const cookies = new Cookies();

    try {
      const res = await axiosInstance.post<IApiResponse["Login"]>(
        EndPoints.auth.LOG_IN,
        payload,
      );

      cookies.set(ACCESS_TOKEN, res.data.accessToken, {
        path: "/",
        maxAge: 60 * 60 * 24,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      cookies.set(REFRESH_TOKEN, res.data.refreshToken, {
        path: "/",
        maxAge: 60 * 60 * 24,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      if (res.data.data?.role) {
        cookies.set(USER_ROLE, res.data.data.role, {
          path: "/",
          maxAge: 60 * 60 * 24,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        });
      }

      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  },
);

// ================= VERIFY OTP =================

export const verifyOtp = createAsyncThunk<
  IApiResponse["VerifyOtp"],
  TVerifyOtpPayload,
  {
    rejectValue: string;
  }
>(
  "auth/verifyOtp",

  async (payload, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post<IApiResponse["VerifyOtp"]>(
        EndPoints.auth.OTP,

        payload,
      );

      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      return rejectWithValue(
        err.response?.data?.message || "OTP verification failed",
      );
    }
  },
);
export const applyRestaurant = createAsyncThunk(
  "partner/apply",

  async (payload: { email: string }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(EndPoints.partner.APPLY, payload);

      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      return rejectWithValue(err.response?.data?.message || "Failed");
    }
  },
);
export const verifyRestaurantOtp = createAsyncThunk(
  "partner/verifyOtp",
  async (
    payload: {
      email: string;
      otp: string;
    },
    { rejectWithValue },
  ) => {
    const cookies = new Cookies();

    try {
      const res = await axiosInstance.post(
        EndPoints.partner.VERIFY_OTP,
        payload,
      );

      cookies.set("partnerToken", res.data.accessToken, {
        path: "/",
        maxAge: 60 * 60 * 24,
      });

      cookies.set("partnerRefresh", res.data.refreshToken, {
        path: "/",
        maxAge: 60 * 60 * 24,
      });

      cookies.set(USER_ROLE, "restaurant_owner", {
        path: "/",
        maxAge: 60 * 60 * 24,
      });

      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      return rejectWithValue(
        err.response?.data?.message || "OTP Verification Failed",
      );
    }
  },
);

// ================= STATE =================

interface IAuthState {
  loading: boolean;

  data: IApiResponse["Login"] | null;

  registerData: IApiResponse["Register"] | null;

  otpData: IApiResponse["VerifyOtp"] | null;

  error: string | null;
}

const initialState: IAuthState = {
  loading: false,

  data: null,

  registerData: null,

  otpData: null,

  error: null,
};

// ================= SLICE =================

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    clearError: (state) => {
      state.error = null;
    },

    logout: (state) => {
      const cookies = new Cookies();

      cookies.remove(ACCESS_TOKEN, { path: "/" });
      cookies.remove(REFRESH_TOKEN, { path: "/" });
      cookies.remove(USER_ROLE, { path: "/" });
      cookies.remove("id", { path: "/" });
      cookies.remove("partnerToken", { path: "/" });
      cookies.remove("partnerRefresh", { path: "/" });

      state.data = null;
      state.registerData = null;
      state.otpData = null;
    },

    resetAuth: (state) => {
      state.registerData = null;

      state.otpData = null;

      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // REGISTER

      .addCase(register.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;

        state.registerData = action.payload;
      })

      .addCase(register.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Registration failed";
      })

      // LOGIN

      .addCase(login.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        state.data = action.payload;
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Login failed";
      })

      // VERIFY OTP

      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;

        state.otpData = action.payload;

        const cookies = new Cookies();
        cookies.remove("id");
      })

      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "OTP verification failed";
      });
  },
});

export const { clearError, logout, resetAuth } = authSlice.actions;

export default authSlice.reducer;
