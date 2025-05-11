'use client';

import { PatientForm } from '@/features/patient';
import { LayoutForm } from '@/widgets';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isEvaluationPage = pathname.includes('/evaluation');

  return (
    <LayoutForm>
      {!isEvaluationPage && <PatientForm />}
      {children}
    </LayoutForm>
  );
}
