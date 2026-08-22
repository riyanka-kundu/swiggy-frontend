import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { axiosInstance } from "@/lib/api";
import { EndPoints } from "@/lib/endpoints";

interface PartnerApplyPayload {
  email: string;
}

interface PartnerApplyResponse {
  status: boolean;
  message: string;
  data: {
    id: string;
    email: string;
  };
}

interface PartnerOtpPayload {
  email: string;
  otp: string;
}

interface PartnerOtpResponse {
  status: boolean;
  message: string;
  data: unknown;
}

interface PartnerState {
  loading: boolean;
  data: unknown | null;
  email: string | null;
  error: string | null;
}

const initialState: PartnerState = {
  loading: false,
  data: null,
  email: null,
  error: null,
};

// ================= APPLY =================

export const applyRestaurant = createAsyncThunk<
  PartnerApplyResponse,
  PartnerApplyPayload,
  {
    rejectValue: string;
  }
>("partner/applyRestaurant", async (payload, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post(EndPoints.partner.APPLY, payload);

    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return rejectWithValue(err.response?.data?.message || "Failed to send OTP");
  }
});

// ================= VERIFY OTP =================

export const verifyRestaurantOtp = createAsyncThunk<
  PartnerOtpResponse,
  PartnerOtpPayload,
  {
    rejectValue: string;
  }
>("partner/verifyOtp", async (payload, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post(EndPoints.partner.VERIFY_OTP, payload);

    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return rejectWithValue(
      err.response?.data?.message || "OTP verification failed",
    );
  }
});

const partnerSlice = createSlice({
  name: "partner",

  initialState,

  reducers: {
    clearPartnerError: (state) => {
      state.error = null;
    },

    resetPartner: (state) => {
      state.loading = false;
      state.data = null;
      state.email = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // APPLY

      .addCase(applyRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(applyRestaurant.fulfilled, (state, action) => {
        state.loading = false;

        state.email = action.payload.data.email;

        state.data = action.payload;
      })

      .addCase(applyRestaurant.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload ?? "Failed to send OTP";
      })

      // VERIFY OTP

      .addCase(verifyRestaurantOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(verifyRestaurantOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(verifyRestaurantOtp.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload ?? "OTP verification failed";
      });
  },
});

export const { clearPartnerError, resetPartner } = partnerSlice.actions;

export default partnerSlice.reducer;
