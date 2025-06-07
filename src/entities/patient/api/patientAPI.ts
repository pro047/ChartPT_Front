import { Instance, PatientInfo } from '@/shared';

export const getAllPatients = async (): Promise<PatientInfo[]> => {
  try {
    const result = await Instance.get('/patient/patients');
    if (!result?.data.patients) {
      throw new Error('No patient');
    }
    return result.data.patients;
  } catch (err) {
    console.error(err);
    throw new Error('No patients');
  }
};

export const getPatientInfoById = async (
  patientId: number
): Promise<PatientInfo> => {
  try {
    const result = await Instance.get(`patient/${patientId}`);
    if (!result?.data.patient) {
      throw new Error('No patientchart data');
    }
    return result.data.patient;
  } catch (err) {
    console.error(err);
    throw new Error('Failed fetch patientchart data');
  }
};
