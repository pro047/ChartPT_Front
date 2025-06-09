import { Instance } from '@/shared';
import { RecentPatientType } from '../types';

export const recentPatientListApi = async (): Promise<RecentPatientType[]> => {
  try {
    const result = await Instance.get('/dashboard');

    return result.data?.recentPatients;
  } catch (err) {
    console.error('Failed fetch recent patient :', err);
    throw new Error('Failed fetch recent patient');
  }
};
