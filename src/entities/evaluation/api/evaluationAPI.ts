import {
  evaluationResponseSchema,
  EvaluationResponseType,
  Instance,
} from '@/shared';
import { z, ZodError } from 'zod';

export type EvaluationApiResponse = {
  message: string;
  evaluations: EvaluationResponseType[];
};

const evaluationApiResponseSchema = z.object({
  message: z.string(),
  evaluations: z.array(evaluationResponseSchema),
});

export const getAllEvaluationByPatientId = async (
  patientId: number
): Promise<EvaluationApiResponse> => {
  if (!patientId) throw new Error('환자 ID를 찾을 수 없습니다');

  try {
    const result = await Instance.get(`/patient/${patientId}`);
    console.log('[getEval data] :', result);
    const parsed = evaluationApiResponseSchema.parse(result.data);
    console.log('parsed:', parsed);
    return parsed;
  } catch (err) {
    console.error('[getEval error] :', err);
    if (err instanceof ZodError) {
      console.error('Zod parsing error :', err);
    }
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
    console.log('[getEval by eval] :', result.data.evaluations);
    return result.data.evaluations;
  } catch (err) {
    console.error('[getEval by eval number error] :', err);
    throw new Error('평가 번호로 조회 실패');
  }
};
