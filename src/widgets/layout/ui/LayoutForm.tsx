'use client';

import React from 'react';
import { NavBarForm } from '@/widgets';
import { LayoutProps } from '../types';
import { PatientProvider } from '@/entities';
import { useHydrated } from '@/shared';

export const LayoutForm: React.FC<LayoutProps> = ({ children }) => {
  const hydrated = useHydrated();

  return (
    <PatientProvider>
      <div className='flex flex-col'>
        {hydrated && <NavBarForm />}
        <main className='flex flex-col'>{children}</main>
      </div>
    </PatientProvider>
  );
};
