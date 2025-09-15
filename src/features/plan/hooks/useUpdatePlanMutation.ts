'use client';

import { PlanUpdateType, usePatientStore, usePlanStore } from '@/shared';
import { updatePlan } from '../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type UpdatePlanParam = {
  updateData: PlanUpdateType;
};

export const useUpdatePlanMutation = () => {
  const queryClient = useQueryClient();

  const patientId = usePatientStore((state) => state.patientId);
  const planNumber = usePlanStore((state) => state.planNumber);

  return useMutation({
    mutationFn: ({ updateData }: UpdatePlanParam) => {
      if (patientId == null || planNumber == null) {
        throw new Error('Invalid data');
      }

      return updatePlan({ patientId, planNumber, updateData });
    },
    onSuccess: () => {
      if (patientId == null || planNumber == null) {
        throw new Error('Invalid data at useUpdatePlanMutation onSuccess');
      }

      queryClient.invalidateQueries({
        queryKey: ['updatePlan', patientId, planNumber],
      });
      queryClient.refetchQueries({
        queryKey: ['updatePlan', patientId, planNumber],
      });
    },
  });
};
