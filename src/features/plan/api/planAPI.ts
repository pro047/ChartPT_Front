import { Instance, PlanCreateType, PlanUpdateType } from '@/shared';

export const savePlan = async (
  patientId: number,
  data: PlanCreateType
): Promise<number> => {
  try {
    console.log('patientId :', patientId);
    console.log('data :', data);
    const result = await Instance.post(`/patient/${patientId}/plan`, data);
    console.log('result : ', result);
    return result.data.planNumber;
  } catch (err) {
    throw new Error('Failed save plan');
  }
};

export const updatePlan = async ({
  patientId,
  planNumber,
  updateData,
}: {
  patientId: number;
  planNumber: number;
  updateData: PlanUpdateType;
}): Promise<void> => {
  try {
    await Instance.put(`/patient/${patientId}/plan/${planNumber}`, updateData);
  } catch (err) {
    throw new Error('Failed update plan');
  }
};

export const deletePlan = async (
  patientId: number,
  planNumber: number
): Promise<void> => {
  try {
    await Instance.delete(`/patient/${patientId}/plan/${planNumber}`);
  } catch (err) {
    throw new Error('Failed delete plan');
  }
};
