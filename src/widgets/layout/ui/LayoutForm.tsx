import React from 'react';
import { NavBarForm } from '@/widgets/navbar/index';
import { LayoutProps } from '../types';

export const LayoutForm: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='flex flex-col'>
      <NavBarForm />
      <main className='flex flex-col'>{children}</main>
    </div>
  );
};
