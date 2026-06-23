import axios from 'axios';

let csrfToken: string | null = null;

export const setCsrfToken = (token: string) => {
  csrfToken = token;
};

export const api = axios.create({
  baseURL: 'http://api:3000/api',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (csrfToken) {
    config.headers['x-csrf-token'] = csrfToken;
  }
  return config;
});

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
