import {
  EvaluationCreateType,
  EvaluationCreateWithEvaluationNumberType,
  EvaluationUpdateType,
  Instance,
} from '@/shared';

export const saveEvaluation = async (
  patientId: number,
  data: EvaluationCreateType
): Promise<EvaluationCreateType> => {
  try {
    const result = await Instance.post(
      `/patient/${patientId}/evaluation`,
      data
    );
    console.log('[saveEval data] :', result);
    return result.data;
  } catch (err) {
    console.error('[saveEval] :', err);
    throw new Error('평가 저장 실패');
  }
};

export const saveEvaluationTarget = async ({
  patientId,
  evaluationNumber,
  saveData,
}: {
  patientId: number;
  evaluationNumber: number;
  saveData: EvaluationCreateWithEvaluationNumberType;
}): Promise<EvaluationCreateType> => {
  console.log('saveData', saveData);

  try {
    const result = await Instance.post(
      `patient/${patientId}/evaluation/${evaluationNumber}`,
      saveData
    );
    console.log(
      '[Features - EvaluationAPI: saveEvaluationTarget] result',
      result
    );
    return result.data;
  } catch (err) {
    console.error('[Features - EvaluationAPI: saveEvaluationTarget]', err);
    throw new Error('Failed save Evaluation Target');
  }
};

export const updateEvaluation = async ({
  patientId,
  evaluationNumber,
  updateData,
}: {
  patientId: number;
  evaluationNumber: number;
  updateData: EvaluationUpdateType;
}): Promise<void> => {
  try {
    await Instance.put(
      `/patient/${patientId}/evaluation/${evaluationNumber}`,
      updateData
    );
  } catch (err) {
    console.error('[updateEval] :', err);
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
    console.error('[deleteEval] :', err);
    throw new Error('평가 삭제 실패');
  }
};

export const deleteEvaluationTarget = async ({
  patientId,
  evaluationNumber,
  evaluationTargetId,
}: {
  patientId: number;
  evaluationNumber: number;
  evaluationTargetId: number;
}): Promise<void> => {
  try {
    await Instance.delete(
      `/patient/${patientId}/evaluation/${evaluationNumber}/target`,
      { data: { targetId: evaluationTargetId } }
    );
  } catch (err) {
    console.error('[deleteEvaluationTarget]:', err);
    throw new Error('단일 평가 삭제 실패');
  }
};
