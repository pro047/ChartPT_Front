import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PlanStoreType } from '../types';
import { encryptedStorage } from '../utils';

export const usePlanStore = create<PlanStoreType>()(
  persist(
    (set) => ({
      planNumber: null,
      planInfo: null,
      plans: [],
      setPlanNumber: (value) => set({ planNumber: value }),
      setPlanInfo: (value) => set({ planInfo: value }),
      setPlans: (value) => set({ plans: value }),
      clearPlan: () => {
        set({ planNumber: null, planInfo: null }),
          encryptedStorage?.removeItem('planStorage');
      },
    }),
    {
      name: 'planStorage',
      storage: encryptedStorage,
    }
  )
);
