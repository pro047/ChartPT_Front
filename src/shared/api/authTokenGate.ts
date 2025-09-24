import { useAccessTokenStore } from '../store';
import { Instance } from './axios';

let isSettingInProgress = false;
let waitingResolvers: Array<() => void> = [];

export const beginTokenSetting = () => {
  isSettingInProgress = true;
};

export const endTokenSetting = () => {
  isSettingInProgress = false;
  waitingResolvers.splice(0).forEach((fn) => fn());
};

export const waitUntilTokenReady = () => {
  isSettingInProgress
    ? new Promise<void>((r) => waitingResolvers.push(r))
    : Promise.resolve();
};

export const initAuthOnBoot = async () => {
  beginTokenSetting();
  try {
    const response = await Instance.post('/auth/refresh');
    const newAccessToken = response.data?.accessToken as string | undefined;
    if (newAccessToken)
      useAccessTokenStore.getState().setAccessToken(newAccessToken);
    else useAccessTokenStore.getState().clearAccessToken();
  } catch {
    useAccessTokenStore.getState().clearAccessToken();
  } finally {
    endTokenSetting();
  }
};
