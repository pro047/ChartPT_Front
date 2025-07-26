import { EvaluationUpdateFormType, EvaluationCreateType } from '@/shared';

export const toEvaluationPayload = (
  flat: EvaluationUpdateFormType,
  patientId: number
): EvaluationCreateType => ({
  patientId,
  targets: [
    {
      regionId: flat.regionId!,
      movementId: flat.movementId!,
      bodySideId: flat.bodySideId!,
      results: [
        {
          rom: flat.rom!,
          vas: flat.vas!,
          hx: flat.hx!,
          sx: flat.sx!,
          note: flat.note!,
        },
      ],
    },
  ],
});
