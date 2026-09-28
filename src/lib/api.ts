import router from "@/router";
import axios from "axios";
import { ApiError } from "./api-error";
import type { ApiErrorResponse } from "@/types/api-error";

export const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const status = error.response?.status;
    const data = error.response?.data as ApiErrorResponse | undefined;

    switch(status) {
      case 401:
        await router.push({ name: 'unauthorized' })
        break
      case 403:
        await router.push({ name: 'forbidden' })
        break
      case 404:
        await router.push({ name: 'not-found' })
        break
    }

    if (data && typeof data === 'object' && ('message' in data || 'errors' in data)) {
      throw new ApiError(status ?? 500, data);
    }

    throw error;
  }
)