'use client';

import React from 'react';
import { NavBarForm } from '@/widgets';
import { PatientProvider } from '@/entities';
import { PatientChartProvider } from '@/features';
import { useHydrated } from '@/shared';
export type LayoutProps = {
  children: React.ReactNode;
};

export const LayoutForm: React.FC<LayoutProps> = ({ children }) => {
  const hydrated = useHydrated();

  return (
    <PatientChartProvider>
      <PatientProvider>
        <div className='flex flex-col'>
          {hydrated && <NavBarForm />}
          <main>{children}</main>
        </div>
      </PatientProvider>
    </PatientChartProvider>
  );
};
