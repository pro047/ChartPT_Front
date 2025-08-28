import { MultiLineResponse } from '@/shared';
import { useMemo } from 'react';

export const useFilter = ({
  allData,
  selected,
  viewMode,
}: {
  allData: MultiLineResponse[] | undefined;
  selected: { movementId: number | null; bodySideId: number | null };
  viewMode: 'rom' | 'vas' | 'multi';
}) =>
  useMemo(() => {
    if (!allData)
      return {
        romSeries: [] as { x: number; y: number | null }[],
        vasSeries: [] as { x: number; y: number | null }[],
        multiSeries: [] as {
          x: number;
          y: { rom: number | null; vas: number | null };
        }[],
      };

    const filtered = allData.filter(
      (r) =>
        (selected.movementId == null || r.movementId === selected.movementId) &&
        (selected.bodySideId == null || r.bodySideId === selected.bodySideId)
    );

    const romSeries =
      viewMode === 'rom' ? filtered.map((r) => ({ x: r.x, y: r.rom })) : [];
    const vasSeries =
      viewMode === 'vas' ? filtered.map((r) => ({ x: r.x, y: r.vas })) : [];
    const multiSeries =
      viewMode === 'multi'
        ? filtered.map((r) => ({ x: r.x, y: { rom: r.rom, vas: r.vas } }))
        : [];

    return { romSeries, vasSeries, multiSeries };
  }, [allData, selected.movementId, selected.bodySideId, viewMode]);
