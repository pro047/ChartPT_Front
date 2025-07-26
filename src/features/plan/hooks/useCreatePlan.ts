'use client';

import { PlanType } from '@/entities';
import { usePatientStore } from '@/shared';
import { usePlanStore } from '@/shared/store/planStore';
import { savePlan } from '../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type CreatePlanParam = {
  data: PlanType;
};

export const useCreatePlan = () => {
  const queryClient = useQueryClient();

  const setPlanNumber = usePlanStore((state) => state.setPlanNumber);
  const setPlanInfo = usePlanStore((state) => state.setPlanInfo);
  const patientId = usePatientStore((state) => state.patientId);

  return useMutation({
    mutationFn: ({ data }: CreatePlanParam) => {
      if (!patientId) throw new Error('Invalid patientId');
      return savePlan(patientId, data);
    },
    onSuccess: (planNumber, variable) => {
      setPlanNumber(planNumber);
      setPlanInfo(variable.data);

      queryClient.invalidateQueries({
        queryKey: ['plans', patientId],
      });
    },
  });
};
