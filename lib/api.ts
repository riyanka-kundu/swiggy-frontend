import { ACCESS_TOKEN, REFRESH_TOKEN, USER_ROLE } from "@/lib/constant";

import { EndPoints } from "@/lib/endpoints";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { Cookies } from "react-cookie";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

const cookies = new Cookies();

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = cookies.get(ACCESS_TOKEN);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // IMPORTANT:
    // Do NOT manually set Content-Type for FormData.
    // Browser/Axios will set multipart/form-data + boundary automatically.

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isAuthRoute = [EndPoints.auth.LOG_IN, EndPoints.auth.REFRESH].some(
      (route) => originalRequest.url?.includes(route),
    );

    // Only refresh on 401.
    // 403 means authenticated but not authorized.
    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      isAuthRoute
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const refreshToken = cookies.get(REFRESH_TOKEN);

    if (!refreshToken) {
      return Promise.reject(error);
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}${EndPoints.auth.REFRESH}`,
        {
          refreshToken,
        },
        {
          withCredentials: true,
        },
      );

      const {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        role,
      } = response.data;

      if (!newAccessToken) {
        throw new Error("No access token returned from refresh");
      }

      cookies.set(ACCESS_TOKEN, newAccessToken, {
        path: "/",
        maxAge: 60 * 60 * 24,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      if (newRefreshToken) {
        cookies.set(REFRESH_TOKEN, newRefreshToken, {
          path: "/",
          maxAge: 60 * 60 * 24,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
      }

      // Keep role cookie synchronized if backend returns role.
      if (role) {
        cookies.set(USER_ROLE, role, {
          path: "/",
          maxAge: 60 * 60 * 24,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
      }

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return axiosInstance(originalRequest);
    } catch (refreshError) {
      cookies.remove(ACCESS_TOKEN, { path: "/" });
      cookies.remove(REFRESH_TOKEN, { path: "/" });
      cookies.remove(USER_ROLE, { path: "/" });

      if (typeof window !== "undefined") {
        window.location.href = "/signin";
      }

      return Promise.reject(refreshError);
    }
  },
);
