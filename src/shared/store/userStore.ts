import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserStore } from '../types/userType';
import { encryptedStorage } from '../utils';

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userId: null,
      token: null,
      name: null,
      email: null,
      hospital: null,
      setUser: (userId, token, name, email, hospital) =>
        set({ userId, token, name, email, hospital }),
      clearUser: () => {
        set({
          userId: null,
          token: null,
          name: null,
          email: null,
          hospital: null,
        }),
          encryptedStorage?.removeItem('userInfo');
      },
    }),
    {
      name: 'userInfo',
      storage: encryptedStorage,
    }
  )
);
