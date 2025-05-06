import React from 'react';
import { LayoutForm } from '@/widgets/index';
import { PatientForm } from '@/features/patient';
import { Outlet } from 'react-router-dom';

export const PatientPage: React.FC = () => {
  return (
    <LayoutForm>
      <PatientForm />
      <Outlet />
    </LayoutForm>
  );
};
