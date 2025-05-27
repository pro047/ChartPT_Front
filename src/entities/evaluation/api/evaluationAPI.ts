import { EvaluationType } from '../types';
import { Instance, PatientInfo } from '@/shared';

type EvaluationApiResponse = {
  messege: string;
  patient: PatientInfo;
  evaluations: EvaluationType[];
};

export const getAllEvaluationByPatientId = async (
  patientId: number
): Promise<EvaluationApiResponse> => {
  if (!patientId) throw new Error('환자 ID를 찾을 수 없습니다');

  try {
    const result = await Instance.get(`/patient/${patientId}`);
    console.log('[getEval data] :', result);
    return result.data;
  } catch (err) {
    console.error('[getEval error] :', err);
    throw new Error('평가 조회 실패');
  }
};

export const getEvaluationByPateintIdAndEvaluationNumber = async (
  patientId: number,
  evaluationNumber: number
): Promise<EvaluationType> => {
  try {
    const result = await Instance.get(
      `/patient/${patientId}/evaluation/${evaluationNumber}`
    );
    console.log('[getEval by eval] :', result.data.evaluation);
    return result.data.evaluation;
  } catch (err) {
    console.error('[getEval by eval number error] :', err);
    throw new Error('평가 번호로 조회 실패');
  }
};
