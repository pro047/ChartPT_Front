'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PlanCreateType, usePatientStore } from '@/shared';
import { savePlan } from '../api';

type CreatePlanParam = {
  data: PlanCreateType;
};

export const useCreatePlan = () => {
  const queryClient = useQueryClient();

  const patientId = usePatientStore((state) => state.patientId);

  return useMutation({
    mutationFn: ({ data }: CreatePlanParam) => {
      if (!patientId) throw new Error('Invalid patientId');
      return savePlan(patientId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['plans', patientId],
      });
    },
  });
};
