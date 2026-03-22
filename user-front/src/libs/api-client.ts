import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_ROUTE,
});

// 👇 Interceptor d'erreur
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      'Une erreur est survenue';

    return Promise.reject(new Error(message));
  },
);
