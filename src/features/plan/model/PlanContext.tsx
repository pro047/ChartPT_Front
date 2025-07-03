'use client';

import { createContext, useContext, useState } from 'react';

type PlanMode = 'create' | 'edit';

type PlanContextType = {
  isOpen: boolean;
  mode: PlanMode;
  shouldRefresh: boolean;
  planOpen: () => void;
  close: () => void;
  setCreate: () => void;
  setEdit: () => void;
  triggerPlanDropdownRefresh: () => void;
};

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [mode, setMode] = useState<PlanMode>('create');

  const planOpen = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const setCreate = () => setMode('create');
  const setEdit = () => setMode('edit');
  const triggerPlanDropdownRefresh = () => setShouldRefresh((prev) => !prev);

  return (
    <PlanContext.Provider
      value={{
        isOpen,
        mode,
        shouldRefresh,
        planOpen,
        close,
        setCreate,
        setEdit,
        triggerPlanDropdownRefresh,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlanContext = () => {
  const context = useContext(PlanContext);
  if (!context)
    throw new Error('usePlanContext must be used within PlanProvider');
  return context;
};
