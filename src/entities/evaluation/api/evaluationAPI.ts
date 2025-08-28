import { EvaluationResponseType, Instance } from '@/shared';

export type EvaluationApiResponse = {
  evaluations: EvaluationResponseType[];
};

export const getAllEvaluationByPatientId = async (
  patientId: number
): Promise<EvaluationApiResponse> => {
  if (!patientId) throw new Error('환자 ID를 찾을 수 없습니다');

  try {
    const result = await Instance.get(`/patient/${patientId}`);
    console.log('result.data.evaluations', result.data);
    return result.data;
  } catch (err) {
    console.error('[getEval error] :', err);
    throw new Error('평가 조회 실패');
  }
};

export const getEvaluationByPateintIdAndEvaluationNumber = async (
  patientId: number,
  evaluationNumber: number
): Promise<EvaluationResponseType> => {
  try {
    const result = await Instance.get(
      `/patient/${patientId}/evaluation/${evaluationNumber}`
    );
    return result.data.evaluations;
  } catch (err) {
    console.error('[getEval by eval number error] :', err);
    throw new Error('평가 번호로 조회 실패');
  }
};
