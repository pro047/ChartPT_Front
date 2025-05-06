import axios, { AxiosInstance } from 'axios';
import * as csrfToken from '@/features/auth/token/CsrfToken';
import { useUserStore } from '../store/userStore';

const Url = import.meta.env.VITE_BASE_URL;

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
    const user: { token: string | null } = useUserStore.getState();
    console.log('[axios interceptor] 토큰', user);
    if (user?.token) {
      config.headers['chartpt-csrf-token'] = token;
      config.headers['Authorization'] = `Bearer ${user.token}`;
    } else {
      console.error('no token');
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
