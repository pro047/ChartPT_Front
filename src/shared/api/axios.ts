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
    const token = await csrfToken.getCsrfToken();
    const user = useUserStore.getState();
    console.log('[csrf Token]', token);
    console.log('[axios interceptor] 토큰', user);

    if (config.url?.includes('/auth/login')) {
      config.headers['Chartpt-Csrf-Token'] = token;
      return config;
    }

    if (!user?.token) {
      console.warn('No user token');
      return Promise.reject(new Error('No User Token'));
    }

    config.headers['Chartpt-Csrf-Token'] = token;
    config.headers['Authorization'] = `Bearer ${user.token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
