import { EvaluationResponseType, EvaluationResultResponseType } from '@/shared';

export type Target = {
  regionId: number;
  movementId: number;
  bodySideId: number;
};

export type BiaxialPoint = {
  x: number;
  rom: number[] | null;
  vas: number[] | null;
};

type TargetIndex = {
  movementByRegion: Map<number, Map<number, { id: number; label?: string }>>;
  bodySideByRegionMovment: Map<
    string,
    Map<number, { id: number; label?: string }>
  >;
  regionOptions: { id: number; label?: string }[];
  getMovementOptions(regionId: number): { id: number; label?: string }[];
  getBodySideOptions(
    regionId: number,
    movementId: number
  ): { id: number; label?: string }[];
};

const makeTargetKey = ({ regionId, movementId, bodySideId }: Target) =>
  `${regionId} | ${movementId} | ${bodySideId}`;

const makeFullKey = (
  { regionId, movementId, bodySideId }: Target,
  evaluationNumber: number
) =>
  `${makeTargetKey({ regionId, movementId, bodySideId })} | ${evaluationNumber}`;

const pickRomVas = (
  results: EvaluationResultResponseType[]
): { rom: number[] | null; vas: number[] | null } => {
  if (!results) return { rom: null, vas: null };

  const romValues = results.map((r) => r.rom);
  const vasValues = results.map((r) => r.vas);

  return { rom: romValues, vas: vasValues };
};

export const toBiaxialSeries = (
  evaluations: EvaluationResponseType[],
  selected: Target
): BiaxialPoint[] => {
  const sorted = [...evaluations].sort(
    (a, b) => a.evaluationNumber - b.evaluationNumber
  );

  const points = sorted.map((evaluation) => {
    const matched = evaluation.targets.find(
      (t) =>
        t.regionId === selected.regionId &&
        t.movementId === selected.movementId &&
        t.bodySideId === selected.bodySideId
    );

    if (!matched)
      return { x: evaluation.evaluationNumber, rom: null, vas: null };

    const { rom, vas } = pickRomVas(matched.results);
    return { x: evaluation.evaluationNumber, rom: rom, vas: vas };
  });

  return points;
};

export const buildTargetIndex = (
  evaluations: EvaluationResponseType[]
): TargetIndex => {
  const movementByRegion = new Map<
    number,
    Map<number, { id: number; label?: string }>
  >();
  const bodySideByRegionMovment = new Map<
    string,
    Map<number, { id: number; label?: string }>
  >();
  const regionMap = new Map<number, { id: number; label?: string }>();

  for (const evaluation of evaluations) {
    for (const target of evaluation.targets) {
      if (!regionMap.has(target.regionId)) {
        regionMap.set(target.regionId, {
          id: target.regionId,
          label: target.region,
        });
      }

      if (!movementByRegion.has(target.regionId)) {
        movementByRegion.set(target.regionId, new Map());
      }
      const movementMap = movementByRegion.get(target.regionId)!;
      if (!movementMap.has(target.movementId)) {
        movementMap.set(target.movementId, {
          id: target.movementId,
          label: target.movement,
        });
      }

      const key = `${target.regionId} | ${target.movementId}`;
      if (!bodySideByRegionMovment.has(key)) {
        bodySideByRegionMovment.set(key, new Map());
      }
      const bodySideMap = bodySideByRegionMovment.get(key)!;
      if (!bodySideMap.has(target.bodySideId)) {
        bodySideMap.set(target.bodySideId, {
          id: target.bodySideId,
          label: target.bodySide,
        });
      }
    }
  }

  return {
    movementByRegion,
    bodySideByRegionMovment,
    regionOptions: [...regionMap.values()],
    getMovementOptions(regionId: number) {
      return movementByRegion.get(regionId)
        ? [...movementByRegion.get(regionId)!.values()]
        : [];
    },
    getBodySideOptions(regionId: number, movementId: number) {
      const key = `${regionId} | ${movementId}`;
      return bodySideByRegionMovment.get(key)
        ? [...bodySideByRegionMovment.get(key)!.values()]
        : [];
    },
  };
};

export const buildResultIndex = (evaluations: EvaluationResponseType[]) => {
  const index = new Map<
    string,
    { rom: number[] | null; vas: number[] | null }
  >();

  for (const evaluation of evaluations) {
    for (const target of evaluation.targets) {
      const { rom, vas } = pickRomVas(target.results);
      const key = makeFullKey(
        {
          regionId: target.regionId,
          movementId: target.movementId,
          bodySideId: target.bodySideId,
        },
        evaluation.evaluationNumber
      );
      index.set(key, { rom, vas });
    }
  }
  const evaluationNumbers = [
    ...new Set(evaluations.map((e) => e.evaluationNumber)),
  ];

  return { index, evaluationNumbers };
};

export const queryBiaxialSeriesFromIndex = (
  built: ReturnType<typeof buildResultIndex>,
  selected: Target
): BiaxialPoint[] => {
  const targetKey = makeTargetKey({
    regionId: selected.regionId,
    movementId: selected.movementId,
    bodySideId: selected.bodySideId,
  });

  return built.evaluationNumbers.map((evaluationNumber) => {
    const key = `${targetKey} | ${evaluationNumber}`;
    const hit = built.index.get(key);
    return {
      x: evaluationNumber,
      rom: hit?.rom ?? null,
      vas: hit?.vas ?? null,
    };
  });
};
