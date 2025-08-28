'use client';

import { EvaluationResponseType } from '@/shared';
import { useEffect, useMemo, useState } from 'react';
import { buildTargetIndex } from '../model';

export const useCascadingSelector = (
  evaluations?: EvaluationResponseType[]
) => {
  const index = useMemo(
    () => (evaluations ? buildTargetIndex(evaluations) : null),
    [evaluations]
  );

  const [selectedRegionId, setSelectedRegionId] = useState<number | null>(null);
  const [selectedMovementId, setSelectedMovementId] = useState<number | null>(
    null
  );
  const [selectedBodySideId, setSelectedBodySideId] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (index && !selectedRegionId) {
      const firstRegion = index.regionOptions[0];
      if (!firstRegion) return;

      const firstMovement = index.getMovementOptions(firstRegion.id)[0];
      if (!firstMovement) return;

      const firstbodySide = index.getBodySideOptions(
        firstRegion.id,
        firstMovement.id
      )[0];
      if (!firstbodySide) return;

      setSelectedRegionId(firstRegion.id);
      setSelectedMovementId(firstMovement.id);
      setSelectedBodySideId(firstbodySide.id);
    }
  }, [index, selectedRegionId]);

  const regionOptions = index?.regionOptions ?? [];
  const movementOptions = selectedRegionId
    ? (index?.getMovementOptions(selectedRegionId) ?? [])
    : [];
  const bodySideOptions =
    selectedRegionId && selectedMovementId
      ? (index?.getBodySideOptions(selectedRegionId, selectedMovementId) ?? [])
      : [];

  const onChangeRegion = (value: string) => {
    setSelectedRegionId(Number(value));
    setSelectedMovementId(null);
    setSelectedBodySideId(null);
  };

  const onChangeMovement = (value: string) => {
    setSelectedMovementId(Number(value));
    setSelectedBodySideId(null);
  };

  const onChangeBodySide = (value: string) =>
    setSelectedBodySideId(Number(value));

  const isTargetReady = Boolean(
    selectedRegionId && selectedMovementId && selectedBodySideId
  );

  return {
    regionOptions,
    movementOptions,
    bodySideOptions,
    selected: { selectedRegionId, selectedMovementId, selectedBodySideId },
    actions: { onChangeRegion, onChangeMovement, onChangeBodySide },
    isTargetReady,
  };
};
