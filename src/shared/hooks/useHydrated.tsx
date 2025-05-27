'use client';

import { useEffect, useState } from 'react';

export const useHydrated = () => {
  const [hydrated, setHydrated] = useState(typeof window !== 'undefined');

  useEffect(() => setHydrated(true), []);
  return hydrated;
};
