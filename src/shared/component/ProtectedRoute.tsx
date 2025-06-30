'use client';

import React, { useEffect } from 'react';
import { useUserStore } from '../store';
import { useRouter } from 'next/navigation';
import { useHydrated } from '../hooks';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const userId = useUserStore((state) => state.userId);
  const hydrated = useHydrated();
  const router = useRouter();

  useEffect(() => {
    if (!hydrated) return;
    if (!userId) {
      router.replace('/');
    }
  }, [hydrated, userId, router]);

  if (!hydrated) return null;

  return <>{children}</>;
};
