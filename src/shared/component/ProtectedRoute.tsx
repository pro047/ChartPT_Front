'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUserStore } from '../store';
import { useHydrated } from '../hooks';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useUserStore((state) => state.token);
  const pathName = usePathname();
  const hydrated = useHydrated();
  const router = useRouter();

  const publicRoutes = [
    '/',
    '/auth/login',
    '/auth/signup',
    '/forgot-password',
    '/reset-password',
  ];

  const isPublicRoutes = publicRoutes.some((path) => pathName.startsWith(path));

  useEffect(() => {
    if (!hydrated) return;
    if (!token && !isPublicRoutes) {
      router.replace('/');
    }
  }, [hydrated, token, pathName]);

  if (!hydrated) return null;

  return <>{children}</>;
};
