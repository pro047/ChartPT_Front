import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserStore } from '../types/userType';
import { encryptedStorage } from '../utils';

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userId: null,
      name: null,
      email: null,
      hospital: null,
      setUser: (user) => set(user),
      clearUser: () => {
        set({
          userId: null,
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

export const getEmail = () => useUserStore.getState().email;
