'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { LayoutForm } from '@/widgets';
import { PatientForm } from '@/features/patient';

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isEvaluationPage = /^\patient\/\d+/.test(pathname);
  return (
    <LayoutForm>
      {!isEvaluationPage && <PatientForm />}
      {children}
    </LayoutForm>
  );
}
