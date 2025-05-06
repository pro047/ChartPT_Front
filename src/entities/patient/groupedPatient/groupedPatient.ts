import { getInitialConsnant } from '../lib';
import { Patients } from '../types';

export const groupedPatientByInitial = () => {
  const patients: Patients[] = [];
  const groupedPatient: Record<string, Patients[]> = {};

  patients
    .filter((patient) => patient.hasChart)
    .forEach((patient) => {
      const initial = getInitialConsnant(patient.name);

      if (!groupedPatient[initial]) {
        groupedPatient[initial] = [];
      }
      groupedPatient[initial].push(patient);
    });
  return groupedPatient;
};
