'use client';

import { initAuthOnBoot } from '@/shared';
import { useEffect, useRef } from 'react';

export default function BootStrapOnce() {
  const hasBootedRef = useRef(false);
  useEffect(() => {
    if (hasBootedRef.current) return;
    hasBootedRef.current = true;
    void initAuthOnBoot();
  }, []);
  return null;
}
