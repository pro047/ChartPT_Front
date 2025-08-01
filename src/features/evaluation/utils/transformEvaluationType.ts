import { FlatEvaluationCreateType, EvaluationCreateType } from '@/shared';

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
        hx: f.hx,
        sx: f.sx,
        note: f.note,
      },
    ],
  })),
});
