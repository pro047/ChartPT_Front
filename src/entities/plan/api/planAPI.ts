import { Instance, PatientInfo } from '@/shared';
import { PlanType } from '../types';

type PlanApiResponse = {
  message: string;
  patient: PatientInfo;
  plans: PlanType[];
};

export const getAllplansByPatientId = async (
  patientId: number
): Promise<PlanApiResponse> => {
  if (!patientId) throw new Error('Not found patient ID');

  try {
    const result = await Instance.get(`/patient/${patientId}`);
    return result.data;
  } catch (err) {
    console.error('[get all plan error] :', err);
    throw new Error('계획 조회 실패');
  }
};

export const getPlanByPatientIdAndPlanNumber = async (
  patientId: number,
  planNumber: number
): Promise<PlanType> => {
  try {
    const result = await Instance.get(
      `/patient/${patientId}/plan/${planNumber}`
    );
    console.log('[getPlan by planNumber] :', result.data.plan);
    return result.data.plan;
  } catch (err) {
    console.error('[getPlan by planNumber error] :', err);
    throw new Error('계획 번호로 조회 실패');
  }
};
