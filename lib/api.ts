import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/lib/constant";
import { EndPoints } from "@/lib/endpoints";
import axios from "axios";
import { Cookies } from "react-cookie";
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

const cookies = new Cookies();

axiosInstance.interceptors.request.use(
  function (config) {
    const token = cookies.get(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAuthRoute = [EndPoints.auth.LOG_IN, EndPoints.auth.REFRESH].some(
      (route) => originalRequest.url?.includes(route),
    );

    if (
      error?.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute
    ) {
      originalRequest._retry = true;
      try {
        const refresh = cookies.get(REFRESH_TOKEN);

        const { data, status } = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}${EndPoints.auth.REFRESH}`,
          { refreshToken: refresh },
          { withCredentials: true },
        );
        if (status !== 200) {
          throw new Error(data);
        }
        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        cookies.set(ACCESS_TOKEN, newAccessToken, {
          path: "/",
          maxAge: 60 * 60 * 24,
          //? This tells the browser:
          // “Only send this cookie over HTTPS connections when its true.”
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
        cookies.set(REFRESH_TOKEN, newRefreshToken, {
          path: "/",
          maxAge: 60 * 60 * 24,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.log(refreshError);
        cookies.remove(ACCESS_TOKEN);
        cookies.remove(REFRESH_TOKEN);

        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
