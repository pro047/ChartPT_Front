import { Instance } from '@/shared';
import { EvaluationType } from '../types';

export const saveEvaluation = async (data: EvaluationType): Promise<number> => {
  try {
    let id = data.id;

    if (id === undefined) {
      const stored = localStorage.getItem('patientId');
      if (!stored) {
        throw new Error('환자 ID를 찾을 수 없습니다');
      }
      id = JSON.parse(stored);
    }

    const result = await Instance.post(`/patient/${id}/evaluation`, data);
    console.log('[saveEval data] :', result);
    return result.data.id;
  } catch (err) {
    console.error('[saveEval error] :', err);
    throw new Error('평가 저장 실패');
  }
};

export const getEvaluation = async () => {};
