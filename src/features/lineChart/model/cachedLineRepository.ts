'use client';

import { MultiLineResponse } from '@/shared';

interface CascadingRepository {
  getRegions(): Array<{ key: number; label: string }>;
  getMovements(regionId: number): Array<{ key: number; label: string }>;
  getBodySides(
    regionId: number,
    movementId: number
  ): Array<{ key: number; label: string }>;
}

export class CachedLineRepository implements CascadingRepository {
  private regions: Array<{ key: number; label: string }> = [];
  private movementIndex: Map<number, Array<{ key: number; label: string }>> =
    new Map();
  private bodySideIndex: Map<string, Array<{ key: number; label: string }>> =
    new Map();

  constructor(private rows: MultiLineResponse[]) {
    this.buildIndexes();
  }

  private buildIndexes() {
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

    this.regions = Array.from(regionMap.entries()).map(([key, label]) => ({
      key,
      label,
    }));

    for (const [regionId, mvMap] of movementMap.entries()) {
      const list = Array.from(mvMap.entries()).map(([key, label]) => ({
        key,
        label,
      }));
      this.movementIndex.set(regionId, list);
    }

    for (const [comboKey, bsMap] of bodySideMap.entries()) {
      const list = Array.from(bsMap.entries()).map(([key, label]) => ({
        key,
        label,
      }));
      this.bodySideIndex.set(comboKey, list);
    }
  }

  getRegions(): Array<{ key: number; label: string }> {
    return this.regions;
  }

  getMovements(regionId: number): Array<{ key: number; label: string }> {
    return this.movementIndex.get(regionId) ?? [];
  }

  getBodySides(
    regionId: number,
    movementId: number
  ): Array<{ key: number; label: string }> {
    return this.bodySideIndex.get(`${regionId} : ${movementId}`) ?? [];
  }
}
