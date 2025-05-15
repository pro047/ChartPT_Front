import { Instance } from '@/shared';

interface UserData {
  name: string;
  age: number;
  gender: string;
  firstVisit: Date;
  occupation: string;
}

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
