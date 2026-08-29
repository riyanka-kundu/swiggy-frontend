import { axiosInstance } from "@/lib/api";
import { EndPoints } from "@/lib/endpoints";

import {
  TContract,
  TMenu,
  TRestaurant,
  TRestaurantDoc,
} from "@/schema/restaurant-schema";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface RestaurantOnboardingState {
  restaurantDetails: TRestaurant | null;
  restaurantDocuments: TRestaurantDoc | null;
  menuItem: TMenu | null;
  contract: TContract | null;

  loading: boolean;
  error: string | null;

  completedSteps: number[];
}

const initialState: RestaurantOnboardingState = {
  restaurantDetails: null,
  restaurantDocuments: null,
  menuItem: null,
  contract: null,

  loading: false,
  error: null,

  completedSteps: [],
};

export const restaurantDetails = createAsyncThunk(
  "restaurant/restaurantDetails",

  async (payload: TRestaurant, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        EndPoints.onboard.RESTAURANT_DETAILS,
        payload,
      );

      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      return rejectWithValue(
        err.response?.data?.message || "Restaurant details failed",
      );
    }
  },
);

export const restaurantDocuments = createAsyncThunk(
  "restaurant/restaurantDocuments",

  async (payload: TRestaurantDoc, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        EndPoints.onboard.RESTAURANT_DOCUMENT,
        payload,
      );

      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      return rejectWithValue(
        err.response?.data?.message || "Restaurant documents failed",
      );
    }
  },
);

export const restaurantMenu = createAsyncThunk(
  "restaurant/restaurantMenu",
  async (payload: TMenu | FormData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        EndPoints.onboard.ADD_FOOD,
        payload,
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError<{
        message?: string;
      }>;

      return rejectWithValue(err.response?.data?.message || "Menu add failed");
    }
  },
);

export const restaurantContract = createAsyncThunk(
  "restaurant/restaurantContract",

  async (payload: TContract, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        EndPoints.onboard.PARTNER_CONTRACT,
        payload,
      );

      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      return rejectWithValue(
        err.response?.data?.message || "Restaurant contract failed",
      );
    }
  },
);

const restaurantSlice = createSlice({
  name: "restaurant",

  initialState,

  reducers: {
    clearRestaurantError: (state) => {
      state.error = null;
    },

    resetRestaurantOnboarding: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(restaurantDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(restaurantDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.restaurantDetails = action.payload.data;

        if (action.payload.data?.onboardingStep) {
          const step = action.payload.data.onboardingStep;
          if (!state.completedSteps.includes(step)) {
            state.completedSteps.push(step);
          }
        } else {
          if (!state.completedSteps.includes(1)) {
            state.completedSteps.push(1);
          }
        }

        toast.success(
          action.payload.message || "Restaurant details saved successfully",
        );
      })

      .addCase(restaurantDetails.rejected, (state, action) => {
        state.loading = false;

        const message =
          (action.payload as string) || "Restaurant details failed";

        state.error = message;

        toast.error(message);
      });

    builder
      .addCase(restaurantDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(restaurantDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.restaurantDocuments = action.payload.data ?? action.payload;

        if (!state.completedSteps.includes(2)) {
          state.completedSteps.push(2);
        }

        toast.success(
          action.payload.message || "Restaurant documents saved successfully",
        );
      })

      .addCase(restaurantDocuments.rejected, (state, action) => {
        state.loading = false;

        const message =
          (action.payload as string) || "Restaurant documents failed";

        state.error = message;

        toast.error(message);
      });

    builder
      .addCase(restaurantMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(restaurantMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.menuItem = action.payload.data ?? action.payload;

        if (!state.completedSteps.includes(3)) {
          state.completedSteps.push(3);
        }

        toast.success(action.payload.message || "Menu added successfully");
      })

      .addCase(restaurantMenu.rejected, (state, action) => {
        state.loading = false;

        const message = (action.payload as string) || "Menu add failed";

        state.error = message;

        toast.error(message);
      });

    builder
      .addCase(restaurantContract.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(restaurantContract.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.contract = action.payload.data ?? action.payload;

        if (!state.completedSteps.includes(4)) {
          state.completedSteps.push(4);
        }

        toast.success(
          action.payload.message || "Contract submitted successfully",
        );
      })

      .addCase(restaurantContract.rejected, (state, action) => {
        state.loading = false;

        const message =
          (action.payload as string) || "Restaurant contract failed";

        state.error = message;

        toast.error(message);
      });
  },
});

export const { clearRestaurantError, resetRestaurantOnboarding } =
  restaurantSlice.actions;

export default restaurantSlice.reducer;
