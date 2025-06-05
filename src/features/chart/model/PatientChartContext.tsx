'use client';

import React, { createContext, useContext, useState } from 'react';

type PatientChartContextType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  triggerRefresh: () => void;
  shouldRefresh: boolean;
};

const PatietChartContext = createContext<PatientChartContextType | undefined>(
  undefined
);

export const PatientChartProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const triggerRefresh = () => setShouldRefresh((prev) => !prev);

  console.log('is open :', isOpen);
  return (
    <PatietChartContext.Provider
      value={{ isOpen, open, close, triggerRefresh, shouldRefresh }}
    >
      {children}
    </PatietChartContext.Provider>
  );
};

export const usePatientChartContext = () => {
  const context = useContext(PatietChartContext);
  if (!context)
    throw new Error('usePatientChart must be used within PatientChartProvider');
  return context;
};
