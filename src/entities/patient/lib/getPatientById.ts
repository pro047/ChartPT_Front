import { UserData } from '../types';

export const getPatientById = (
  groupedPatient: Record<string, UserData[]>,
  id: number
): UserData | undefined => {
  for (const groupd of Object.values(groupedPatient)) {
    const patient = groupd.find((e) => e.id === id);
    if (patient) return patient;
  }
  return undefined;
};
