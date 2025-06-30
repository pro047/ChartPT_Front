'use client';

import { RecentPatientList, WelcomeSection } from '@/entities';
import { DashboardPatientAddButton, TodoForm } from '@/features';
import { useHydrated } from '@/shared';

export const DashboardWidget = () => {
  const hydrated = useHydrated();

  if (!hydrated) return null;

  return (
    <>
      <WelcomeSection />
      <TodoForm />
      <RecentPatientList />
      <div className='flex justify-center'>
        <DashboardPatientAddButton />
      </div>
    </>
  );
};
