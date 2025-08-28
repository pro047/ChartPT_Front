'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MultiLineResponse } from '@/shared';
import { CachedLineRepository } from '../model';

export const CascadingSelector = ({ rows }: { rows: MultiLineResponse[] }) => {
  const [selectedRegionId, setSelectedRegionId] = useState<number | undefined>(
    undefined
  );
  const [selectedMovementId, setSelectedMovementId] = useState<
    number | undefined
  >(undefined);
  const [selectedBodySideId, setSelectedBodySideId] = useState<
    number | undefined
  >(undefined);

  const repository = useMemo(() => new CachedLineRepository(rows), [rows]);

  const regionOptions = useMemo(() => repository.getRegions(), [repository]);
  const movementOptions = useMemo(
    () =>
      selectedRegionId !== undefined
        ? repository.getMovements(selectedRegionId)
        : [],
    [repository, selectedRegionId]
  );
  const bodySideOptions = useMemo(
    () =>
      selectedRegionId != undefined && selectedMovementId !== undefined
        ? repository.getBodySides(selectedRegionId, selectedMovementId)
        : [],
    [repository, selectedRegionId, selectedMovementId]
  );

  useEffect(() => {
    setSelectedMovementId(undefined);
    setSelectedBodySideId(undefined);
    console.log(selectedMovementId);
    console.log(selectedRegionId);
  }, [selectedRegionId]);

  return (
    <div>
      <Select
        value={
          selectedRegionId !== undefined ? String(selectedRegionId) : undefined
        }
        onValueChange={(v) => {
          const nextId = Number(v);
          setSelectedRegionId(nextId);
          setSelectedMovementId(undefined);
          setSelectedBodySideId(undefined);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder='Select Region' />
        </SelectTrigger>
        <SelectContent>
          {regionOptions.map((o) => (
            <SelectItem key={o.key} value={String(o.key)}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={
          selectedMovementId !== undefined
            ? String(selectedMovementId)
            : undefined
        }
        onValueChange={(v) => {
          const nextId = Number(v);
          setSelectedMovementId(nextId);
          setSelectedBodySideId(undefined);
        }}
        disabled={selectedRegionId === undefined}
      >
        <SelectTrigger>
          <SelectValue
            placeholder={
              selectedRegionId ? 'Select Movement' : 'Select Region First'
            }
          />
        </SelectTrigger>
        <SelectContent>
          {movementOptions.map((o) => (
            <SelectItem key={o.key} value={String(o.key)}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={
          selectedBodySideId !== undefined
            ? String(selectedBodySideId)
            : undefined
        }
        onValueChange={(v) => {
          const nextId = Number(v);
          setSelectedBodySideId(nextId);
        }}
        disabled={
          selectedRegionId === undefined || selectedMovementId === undefined
        }
      >
        <SelectTrigger>
          <SelectValue
            placeholder={
              selectedMovementId ? 'Select bodySide' : 'Select movement First'
            }
          />
        </SelectTrigger>
        <SelectContent>
          {bodySideOptions.map((o) => (
            <SelectItem key={o.key} value={String(o.key)}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
