import { usePatientStore } from '@/shared';
import { getAllEvaluationByPatientId } from '../api';
import { useQuery } from '@tanstack/react-query';

type EvalRomData = {
  evaluationNumber: number;
  rom: number;
};

export const useFetchRomDataPoints = () => {
  const patientId = usePatientStore((state) => state.patientId);

  return useQuery<EvalRomData[]>({
    queryKey: ['romPoints', patientId],
    queryFn: async () => {
      if (!patientId) throw new Error('No patientId');
      const result = await getAllEvaluationByPatientId(patientId);
      return result.evaluations
        .filter(
          (i) =>
            i.rom !== undefined &&
            i.rom !== null &&
            i.evaluationNumber !== undefined &&
            i.evaluationNumber !== null
        )
        .map((i) => ({
          evaluationNumber: i.evaluationNumber ?? 0,
          rom: i.rom,
        }));
    },
    enabled: !!patientId,
  });
};
