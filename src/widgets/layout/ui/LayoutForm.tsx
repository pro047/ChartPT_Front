'use client';

import React from 'react';
import { NavBarForm } from '@/widgets';
import { LayoutProps } from '../types';
import { PatientProvider } from '@/entities';

export const LayoutForm: React.FC<LayoutProps> = ({ children }) => {
  return (
    <PatientProvider>
      <div className='flex flex-col'>
        <NavBarForm />
        <main className='flex flex-col'>{children}</main>
      </div>
    </PatientProvider>
  );
};
