import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { UserStore } from '../types/storeTypes';

export const useUserStore = create<UserStore>()(
  persist<UserStore>(
    (set) => ({
      token: null,
      name: null,
      setUser: (token, name) => set({ token, name }),
      clearUser: () => set({ token: null, name: null }),
    }),
    {
      name: 'userInfo',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
