import { Instance, MultiLineResponse, SingleLineResponse } from '@/shared';

type DefaultLineData = {
  patientId: number;
  bodyRegionId: number;
};

export const getRomLine = async ({
  patientId,
  bodyRegionId,
}: DefaultLineData): Promise<SingleLineResponse> => {
  try {
    const result = await Instance.get(
      `/patient/${patientId}/rom/${bodyRegionId}`
    );
    return result.data;
  } catch (err) {
    console.error(err);
    throw new Error('Failed get Rom Line');
  }
};
export const getVasLine = async ({
  patientId,
  bodyRegionId,
}: DefaultLineData): Promise<SingleLineResponse> => {
  try {
    const result = await Instance.get(
      `/patient/${patientId}/vas/${bodyRegionId}`
    );
    return result.data;
  } catch (err) {
    console.error(err);
    throw new Error('Failed get Vas Line');
  }
};
export const getMultiline = async ({
  patientId,
  bodyRegionId,
}: DefaultLineData): Promise<MultiLineResponse> => {
  try {
    const result = await Instance.get(
      `/patient/${patientId}/multi/${bodyRegionId}`
    );
    console.log('get multiline result:', result.data);
    return result.data;
  } catch (err) {
    console.error(err);
    throw new Error('Failed get Multi line');
  }
};
