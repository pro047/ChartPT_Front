import { getInitialConsnant } from '../lib';
import { Patients } from '../types';

export const groupedPatientByInitial = (id: number | null) => {
  const patients: Patients[] = [];
  const groupedPatient: Record<string, Patients[]> = {};

  patients
    .filter((patient) => patient.id === id)
    .forEach((patient) => {
      const initial = getInitialConsnant(patient.name);

      if (!groupedPatient[initial]) {
        groupedPatient[initial] = [];
      }
      groupedPatient[initial].push(patient);
    });
  return groupedPatient;
};
