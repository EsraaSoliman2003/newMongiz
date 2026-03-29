import axios from "axios";
import { getCookie } from "cookies-next";
import { toast } from "sonner";

const base = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

const instance = axios.create({
  baseURL: `${base}/api/`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// =========================
// Request Interceptor
// =========================
instance.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const lang = getCookie("NEXT_LOCALE") || "en";
    config.headers["Accept-Language"] = lang;

    return config;
  },
  (error) => Promise.reject(error)
);

// =========================
// Response Interceptor
// =========================
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.title ||
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.";

      toast.error(message);
    } else {
      toast.error("An unexpected error occurred. Please try again later.");
    }

    return Promise.reject(error);
  }
);

export default instance;
