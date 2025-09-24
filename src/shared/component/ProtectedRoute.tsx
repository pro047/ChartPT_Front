'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAccessTokenStore } from '../store';
import { useHydrated } from '../hooks';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const accessToken = useAccessTokenStore((state) => state.accessToken);
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
    if (!accessToken && !isPublicRoutes) {
      router.replace('/');
    }
  }, [hydrated, accessToken, pathName]);

  if (!hydrated) return null;

  return <>{children}</>;
};
