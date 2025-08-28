'use client';

import { EvaluationResponseType } from '@/shared';
import {
  BiaxialPoint,
  buildResultIndex,
  queryBiaxialSeriesFromIndex,
  Target,
} from '../model';
import { useMemo } from 'react';

export const useEvaluationChart = (
  evaluations: EvaluationResponseType[] | undefined,
  selected: Target | null
) => {
  const built = useMemo(() => {
    if (!evaluations) return null;
    return buildResultIndex(evaluations);
  }, [evaluations]);

  const data = useMemo<BiaxialPoint[] | null>(() => {
    if (!built || !selected) return null;
    return queryBiaxialSeriesFromIndex(built, selected);
  }, [built, selected]);

  return data;
};
