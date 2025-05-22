import { Instance } from '@/shared';
import { UserData } from '../types';
import { usePatientStore } from '@/shared/store/patientStore';

export const getAllPatients = async (): Promise<UserData[]> => {
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

export const getPatientInfoById = async (): Promise<UserData[]> => {
  try {
    const patientId = usePatientStore.getState().patientId;
    const result = await Instance.get(`patient/${patientId}/evaluation`);
    if (!result?.data.patientChart) {
      throw new Error('No patientchart data');
    }
    return result.data.patientChart;
  } catch (err) {
    console.error(err);
    throw new Error('Failed fetch patientchart data');
  }
};
