'use client';

import { LayoutForm } from '@/widgets';
import React from 'react';

export default function userLayuout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutForm>{children}</LayoutForm>;
}
