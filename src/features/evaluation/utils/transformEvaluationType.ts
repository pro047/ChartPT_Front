import {
  FlatEvaluationCreateType,
  EvaluationCreateType,
  FlatEvaluationUpdateFormType,
  EvaluationUpdateType,
  FlatEvaluationUpdateType,
  EvaluationTargetResponseType,
  EvaluationCreateWithEvaluationNumberType,
  EvaluationResponseType,
} from '@/shared';
import React from 'react';
import { Eval } from '../model';

export const toEvaluationPayload = (
  form: FlatEvaluationCreateType[],
  patientId: number
): EvaluationCreateType => ({
  patientId,
  targets: form.map((f) => ({
    regionId: f.regionId,
    movementId: f.movementId,
    bodySideId: f.bodySideId,
    results: [
      {
        rom: f.rom,
        vas: f.vas,
        hx: f.hx ?? '',
        sx: f.sx ?? '',
        note: f.note ?? '',
      },
    ],
  })),
});

export const toEvaluationTargetPayload = ({
  patientId,
  evaluationNumber,
  form,
}: {
  patientId: number;
  evaluationNumber: number;
  form: FlatEvaluationCreateType[];
}): EvaluationCreateWithEvaluationNumberType => ({
  patientId,
  evaluationNumber,
  targets: form.map((f) => ({
    regionId: f.regionId,
    movementId: f.movementId,
    bodySideId: f.bodySideId,
    results: [
      {
        rom: f.rom,
        vas: f.vas,
        hx: f.hx ?? '',
        sx: f.sx ?? '',
        note: f.note ?? '',
      },
    ],
  })),
});

export const transformUpdateFormToUpdateType = ({
  patientId,
  evaluationNumber,
  updateData,
  ids,
}: {
  patientId: number;
  evaluationNumber: number;
  updateData: FlatEvaluationUpdateFormType;
  ids: React.RefObject<{ targetId: number; resultId: number } | null>;
}): EvaluationUpdateType => {
  if (!ids.current?.targetId || !ids.current.resultId) {
    throw new Error(
      'Missing targetId or resultId in transtormUpdateFormToUpdateType'
    );
  }

  return {
    patientId: patientId,
    evaluationNumber: evaluationNumber,
    targets: [
      {
        targetId: ids.current!.targetId,
        regionId: updateData.fields[0].regionId,
        movementId: updateData.fields[0].movementId,
        bodySideId: updateData.fields[0].bodySideId,
        results: [
          {
            resultId: ids.current!.resultId,
            rom: updateData.fields[0].rom,
            vas: updateData.fields[0].vas,
            hx: updateData.fields[0].hx,
            sx: updateData.fields[0].sx,
            note: updateData.fields[0].note,
          },
        ],
      },
    ],
  };
};

export const toFlatForUpdate = (
  data: EvaluationTargetResponseType
): FlatEvaluationUpdateType => {
  const results = data.results[0];
  if (!results) {
    throw new Error(`Target ${data.targetId} has no result`);
  }

  return {
    targetId: data.targetId,
    regionId: data.regionId,
    movementId: data.movementId,
    bodySideId: data.bodySideId,
    resultId: results.resultId,
    rom: results.rom,
    vas: results.vas,
    hx: results.hx,
    sx: results.sx,
    note: results.note,
  };
};

export const toFlatForAddTarget = (
  base?: Partial<
    Pick<FlatEvaluationUpdateType, 'regionId' | 'movementId' | 'bodySideId'>
  >
): FlatEvaluationUpdateType => ({
  regionId: base?.regionId ?? 0,
  movementId: base?.movementId ?? 0,
  bodySideId: base?.bodySideId ?? 0,
  rom: 0,
  vas: 0,
  hx: '',
  sx: '',
  note: '',
});

export const toEvalFromResponse = (data: EvaluationResponseType): Eval[] => {
  const targets = data.targets;

  const targetResponse = [];

  for (const target of targets) {
    for (const result of target.results) {
      const toPushResults = {
        regionId: target.regionId,
        movementId: target.movementId,
        bodySideId: target.bodySideId,
        rom: result.rom,
        vas: result.vas,
      };

      targetResponse.push(toPushResults);
    }
  }

  return [
    {
      evaluationNumber: data.evaluationNumber,
      targets: targetResponse,
    },
  ];
};
