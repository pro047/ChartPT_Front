'use client';

import { useEffect, useState } from 'react';
import { getAllPatients } from '../api';
import { getInitialConsnant } from '../lib';
import { Patients } from '../types';

export const useGroupedPatient = () => {
  const [data, setData] = useState<Record<string, Patients[]>>({});
  const [isloading, setisLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = async () => {
    try {
      const patients = await getAllPatients();
      console.log('patients :', patients);
      const groupedPatient: Record<string, Patients[]> = {};

      patients.forEach((patient) => {
        const initial = getInitialConsnant(patient.name);
        console.log('initial :', initial);

        if (!groupedPatient[initial]) {
          groupedPatient[initial] = [];
        }
        groupedPatient[initial].push(patient);
      });
      console.log('groupedPatient :', groupedPatient);
      setData(groupedPatient);
    } catch (err) {
      setError(err as Error);
    } finally {
      setisLoading(false);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  return { data, isloading, error, refetch: fetch };
};
