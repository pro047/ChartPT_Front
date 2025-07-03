'use client';

import React from 'react';
import { NavBarForm } from '@/widgets';
import { PatientProvider } from '@/entities';
import {
  PatientChartProvider,
  PlanProvider,
  EvaluationProvider,
} from '@/features';
import { useHydrated } from '@/shared';
import {} from '@/features/plan/model';

export type LayoutProps = {
  children: React.ReactNode;
};

export const LayoutForm: React.FC<LayoutProps> = ({ children }) => {
  const hydrated = useHydrated();

  return (
    <PatientChartProvider>
      <EvaluationProvider>
        <PlanProvider>
          <PatientProvider>
            <div className='flex flex-col'>
              {hydrated && <NavBarForm />}
              <main>{children}</main>
            </div>
          </PatientProvider>
        </PlanProvider>
      </EvaluationProvider>
    </PatientChartProvider>
  );
};
