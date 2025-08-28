import { EvaluationApiResponse } from '@/entities';
import { MultiLineResponse } from '@/shared';

export const transformToRows = (
  data: EvaluationApiResponse | undefined
): MultiLineResponse[] | undefined => {
  const rows = [];

  const evaluations = data?.evaluations;

  if (!evaluations) return undefined;

  for (const evaluation of evaluations) {
    const evaluationNumber = evaluation.evaluationNumber;

    const targets = evaluation.targets;
    for (const target of targets) {
      const regionId = target.regionId;
      const region = target.region;
      const movementId = target.movementId;
      const movement = target.movement;
      const bodySideId = target.bodySideId;
      const bodySide = target.bodySide;

      const results = target.results;

      for (const result of results) {
        const rom = result.rom;
        const vas = result.vas;

        const row = {
          x: evaluationNumber,
          rom: rom,
          vas: vas,
          bodyRegionId: regionId,
          movementId: movementId,
          bodySideId: bodySideId,
          region: region,
          movement: movement,
          bodySide: bodySide,
        };

        rows.push(row);
      }
    }
  }
  return rows;
};
