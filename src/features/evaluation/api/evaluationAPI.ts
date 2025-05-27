import { EvaluationType } from '@/entities';
import { Instance } from '@/shared';

export const saveEvaluation = async (
  patientId: number,
  data: EvaluationType
): Promise<number> => {
  try {
    const result = await Instance.post(
      `/patient/${patientId}/evaluation`,
      data
    );
    console.log('[saveEval data] :', result);
    return result.data.evaluationNumber;
  } catch (err) {
    console.error('[saveEval error] :', err);
    throw new Error('평가 저장 실패');
  }
};

export const updateEvaluation = async (
  patientId: number,
  evaluationNumber: number,
  updateData: Partial<EvaluationType>
): Promise<void> => {
  try {
    await Instance.put(
      `/patient/${patientId}/evaluation/${evaluationNumber}`,
      updateData
    );
  } catch (err) {
    console.error('[updateEval error] :', err);
    throw new Error('평가 수정 실패');
  }
};

export const deleteEvaluation = async (
  patientId: number,
  evaluationNumber: number
): Promise<void> => {
  try {
    await Instance.delete(
      `/patient/${patientId}/evaluation/${evaluationNumber}`
    );
  } catch (err) {
    console.error('[deleteEval error] :', err);
    throw new Error('평가 삭제 실패');
  }
};
