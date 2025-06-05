'use client';

import { RecentPatientList } from '@/entities';
import { PatientAddButton, TodoForm } from '@/features';
import { useHydrated } from '@/shared';

export const DashboardWidget = () => {
  const hydrated = useHydrated();

  if (!hydrated) return null;

  return (
    <>
      <TodoForm />
      <RecentPatientList />
      <PatientAddButton />
    </>
  );
};
