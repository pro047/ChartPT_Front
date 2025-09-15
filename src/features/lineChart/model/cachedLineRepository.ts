'use client';

import { MultiLineResponse } from '@/shared';

export type SelectorSelection = {
  regionId?: number;
  movementId?: number;
  bodySideId?: number;
};

export type SelectorOptionDto = {
  regions: Array<{ id: number; label: string }>;
  movements: Map<number, { id: number; label: string }[]>;
  bodySides: Map<string, { id: number; label: string }[]>;
};

type ChartSeriesPoints = {
  x: number;
  rom: number | undefined;
  vas: number | undefined;
};
export type ChartSeries = {
  key: string;
  data: ChartSeriesPoints[];
};
interface CascadingRepository {
  getSelectorOptions(): SelectorOptionDto;
  buildChartSeries(selection: Required<SelectorSelection>): ChartSeries[];
}

export class CachedLineRepository implements CascadingRepository {
  constructor(private rows: MultiLineResponse[]) {}

  getSelectorOptions(): SelectorOptionDto {
    const regionMap = new Map<number, string>();
    const movementMap = new Map<number, Map<number, string>>();
    const bodySideMap = new Map<string, Map<number, string>>();

    for (const row of this.rows) {
      if (!regionMap.has(row.bodyRegionId))
        regionMap.set(row.bodyRegionId, row.region);

      if (!movementMap.has(row.bodyRegionId))
        movementMap.set(row.bodyRegionId, new Map());
      movementMap.get(row.bodyRegionId)?.set(row.movementId, row.movement);

      const comboKey = `${row.bodyRegionId} : ${row.movementId}`;
      if (!bodySideMap.has(comboKey)) bodySideMap.set(comboKey, new Map());
      bodySideMap.get(comboKey)?.set(row.bodySideId, row.bodySide);
    }

    return {
      regions: [...regionMap.entries()].map(([id, label]) => ({ id, label })),
      movements: new Map(
        [...movementMap.entries()].map(([regionId, mvMap]) => [
          regionId,
          [...mvMap.entries()].map(([id, label]) => ({ id, label })),
        ])
      ),
      bodySides: new Map(
        [...bodySideMap.entries()].map(([key, bsmap]) => [
          key,
          [...bsmap.entries()].map(([id, label]) => ({ id, label })),
        ])
      ),
    };
  }

  buildChartSeries(selection: SelectorSelection): ChartSeries[] {
    const { regionId, movementId, bodySideId } = selection;

    const filtered = this.rows.filter(
      (r) =>
        r.bodyRegionId === regionId &&
        r.movementId === movementId &&
        r.bodySideId === bodySideId
    );

    const sorted = [...filtered].sort((a, b) => a.x - b.x);

    return [
      {
        key: 'rom',
        data: sorted.map((r) => ({ x: r.x, rom: r.rom, vas: undefined })),
      },
      {
        key: 'vas',
        data: sorted.map((r) => ({ x: r.x, rom: undefined, vas: r.vas })),
      },
    ];
  }
}
