'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { LayoutForm, PatientMainWiget } from '@/widgets';
import { PatientChartModalForm } from '@/features';

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isEvaluationPage = /^\/patient\/\d+/.test(pathname);
  return (
    <LayoutForm>
      {!isEvaluationPage && <PatientMainWiget />}
      <PatientChartModalForm />
      {children}
    </LayoutForm>
  );
}
