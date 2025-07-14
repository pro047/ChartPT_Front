'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getAllPatients } from '../api';
import { getInitialConsnant } from '../lib';
import { PatientInfo, useUserStore } from '@/shared';

type PatientContextType = {
  groupedPatients: Record<string, PatientInfo[]>;
  isLoading: boolean;
  isOpen: boolean;
  error: Error | null;
  refetch: () => void;
  setIsOpen: (value: boolean) => void;
};

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export const PatientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [groupedPatients, setGroupedPatients] = useState<
    Record<string, PatientInfo[]>
  >({});
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { token } = useUserStore();

  const fetch = async () => {
    try {
      if (!token) return;

      const patients = await getAllPatients();
      console.log('patients :', patients);
      const groupedPatient: Record<string, PatientInfo[]> = {};

      patients.forEach((patient) => {
        const initial = getInitialConsnant(patient.name);

        if (!groupedPatient[initial]) {
          groupedPatient[initial] = [];
        }
        groupedPatient[initial].push(patient);
      });
      console.log('groupedPatient :', groupedPatient);
      setGroupedPatients(groupedPatient);
    } catch (err) {
      setError(err as Error);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <PatientContext.Provider
      value={{
        groupedPatients,
        isOpen,
        isLoading,
        error,
        refetch: fetch,
        setIsOpen,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export const usePatientContext = () => {
  const context = useContext(PatientContext);
  if (!context) throw new Error('Must be used within PatientProvider');
  return context;
};
