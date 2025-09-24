import axios, { AxiosInstance } from 'axios';
import * as csrfToken from '@/shared';
import { AppConifg } from '@/appConfig';
import { getAccessToken, getEmail, useAccessTokenStore } from '@/shared';

const Url = AppConifg.apiUrl;

export const Instance: AxiosInstance = axios.create({
  baseURL: Url,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshClient: AxiosInstance = axios.create({
  baseURL: Url,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

Instance.interceptors.request.use(
  async (config) => {
    const { url = '' } = config;

    const accessToken = getAccessToken();
    console.log('accessToken :', accessToken);

    console.log('[Interceptor] 요청 url :', config.url);

    const publicUrls = [
      '/auth/login',
      '/auth/signup',
      '/forgot-password',
      '/reset-password',
    ];

    const isPublic = publicUrls.some((path) => url.includes(path));
    const csrf = await csrfToken.getCsrfToken();
    config.headers['Chartpt-Csrf-Token'] = csrf;

    if (!isPublic && accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    console.log('config ', config);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let waitingResolvers: Array<(token: string | null) => void> = [];

function notifyWaitingRequests(token: string | null) {
  waitingResolvers.forEach((resolve) => {
    resolve(token);
  });
  waitingResolvers = [];
}

Instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const original = error.config;
    const statusCode = error?.response?.status;
    const isRefreshCall = error?.config?.url.includes('/auth/refresh');
    const accToken = useAccessTokenStore.getState().accessToken;

    if (statusCode !== 401 || isRefreshCall || original._retry) {
      throw error;
    }

    original._retry = true;

    if (!isRefreshing) {
      isRefreshing = true;

      try {
        const csrf = await csrfToken.getCsrfToken();
        const email = getEmail();
        const response = await refreshClient.post(
          '/auth/refresh',
          { email },
          {
            headers: { 'Chartpt-Csrf-Token': csrf },
          }
        );
        const newAccessToken = response.data?.accessToken as string | undefined;
        if (!newAccessToken) throw new Error('missing accessToken');
        useAccessTokenStore.getState().setAccessToken(newAccessToken);

        notifyWaitingRequests(newAccessToken);
      } catch (err) {
        notifyWaitingRequests(null);
        throw err;
      } finally {
        isRefreshing = false;
      }
    } else {
      await new Promise<string | null>((resolve) =>
        waitingResolvers.push(resolve)
      );
    }

    if (accToken) {
      original.headers = {
        ...(original.headers || {}),
        Authorization: `Bearer ${accToken}`,
      };
    }
    return Instance(original);
  }
);
