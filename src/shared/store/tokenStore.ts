import { create } from 'zustand';
import { AccesstokenState } from '../types';

export const useAccessTokenStore = create<AccesstokenState>((set) => ({
  accessToken: null,
  setAccessToken(token) {
    set({ accessToken: token });
  },
  clearAccessToken() {
    set({ accessToken: null });
  },
}));

export const getAccessToken = () => useAccessTokenStore.getState().accessToken;
