import { PatientInfo } from '@/shared';

export const getPatientById = (
  groupedPatient: Record<string, PatientInfo[]>,
  id: number
): PatientInfo | undefined => {
  for (const groupd of Object.values(groupedPatient)) {
    const patient = groupd.find((e) => e.id === id);
    if (patient) return patient;
  }
  return undefined;
};
