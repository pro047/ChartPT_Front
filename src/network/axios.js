import axios from 'axios';
import * as csrfToken from '../service/auth/token/csrf';
import useUserStore from '../store/userStore';

export const Instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});

Instance.interceptors.request.use(
  async (config) => {
    const token = await csrfToken.getCsrfToken();
    const user = useUserStore.getState().token;
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
