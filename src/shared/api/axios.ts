import axios, { AxiosInstance } from 'axios';
import * as csrfToken from '@/shared';
import { useUserStore } from '../store/userStore';

const Url = process.env.NEXT_PUBLIC_API_URL;

export const Instance: AxiosInstance = axios.create({
  baseURL: Url,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

Instance.interceptors.request.use(
  async (config) => {
    const { url = '', method = 'get' } = config;
    const user = useUserStore.getState();

    console.log('[Interceptor] 요청 url :', config.url);

    const publicUrls = [
      '/',
      '/auth/login',
      '/auth/signup',
      '/forgot-password',
      '/reset-password',
    ];
    const isPublic = publicUrls.some((path) => url.includes(path));

    if (method.toLowerCase() === 'get') {
      return config;
    }

    const csrf = await csrfToken.getCsrfToken();
    config.headers['Chartpt-Csrf-Token'] = csrf;

    if (!isPublic && user?.token) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn('[response interceptor] 401 발생 -> 로그아웃 처리');

      useUserStore.getState().clearUser();

      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
