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
    const csrf = await csrfToken.getCsrfToken();
    const user = useUserStore.getState();
    console.log('[csrf Token]', csrf);
    console.log('[axios interceptor] 토큰', user);

    if (
      config.url?.includes('/auth/login') ||
      config.url?.includes('/auth/signup')
    ) {
      config.headers['Chartpt-Csrf-Token'] = csrf;
      return config;
    }

    if (!user?.token) {
      console.warn('No user csrf');
      return Promise.reject(new Error('No User Token'));
    }

    config.headers['Chartpt-Csrf-Token'] = csrf;
    config.headers['Authorization'] = `Bearer ${user.token}`;
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
