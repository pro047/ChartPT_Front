'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SelectorOptionDto, SelectorSelection } from '../model';

type CascadingSelectorProps = {
  options: SelectorOptionDto;
  value: SelectorSelection | null;
  onChangeAction: (next: SelectorSelection | null) => void;
  placeholderText?: {
    region?: string;
    movement?: string;
    bodySide?: string;
  };
};

export const CascadingSelector = ({
  options,
  value,
  onChangeAction,
  placeholderText,
}: CascadingSelectorProps) => {
  const regionId = value?.regionId ?? undefined;
  const movementId = value?.movementId ?? undefined;
  const bodySideId = value?.bodySideId ?? undefined;

  const comboKey = `${regionId} : ${movementId}`;

  const movementOptions =
    regionId != null ? (options.movements.get(regionId) ?? []) : [];

  const bodySideOptions =
    regionId != null && movementId != null
      ? (options.bodySides.get(comboKey) ?? [])
      : [];

  const handleRegionChange = (nextRegionId?: number) => {
    if (nextRegionId == null) {
      onChangeAction(null);
      return;
    }
    onChangeAction({
      regionId: nextRegionId,
      movementId: undefined,
      bodySideId: undefined,
    });
  };

  const handleMovementChange = (nextMovementId?: number) => {
    if (regionId == null || nextMovementId == null) {
      onChangeAction(regionId != null ? { regionId } : null);
      return;
    }
    onChangeAction({
      regionId,
      movementId: nextMovementId,
      bodySideId: undefined,
    });
  };

  const handleBodySideChange = (nextBodySideId?: number) => {
    if (regionId == null || movementId == null || nextBodySideId == null) {
      onChangeAction(regionId != null ? { regionId, movementId } : null);
      return;
    }
    onChangeAction({
      regionId,
      movementId,
      bodySideId: nextBodySideId,
    });
  };

  return (
    <div className='flex gap-x-2 ml-6 text-sm tracking-wide'>
      <div className='flex flex-col gap-2'>
        <div className='pl-2 font-medium text-muted-foreground'>Region</div>
        <Select
          value={regionId != null ? String(regionId) : undefined}
          onValueChange={(v) => {
            handleRegionChange(v != null ? Number(v) : undefined);
          }}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={placeholderText?.region ?? 'Select Region'}
            />
          </SelectTrigger>
          <SelectContent>
            {options.regions.map((o) => (
              <SelectItem key={o.id} value={String(o.id)}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='flex flex-col gap-2'>
        <div className='pl-2 font-medium text-muted-foreground'>Movement</div>
        <Select
          key={regionId ?? 'none'}
          value={movementId != null ? String(movementId) : undefined}
          onValueChange={(v) => {
            handleMovementChange(v != null ? Number(v) : undefined);
          }}
          disabled={regionId == null}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={placeholderText?.movement ?? 'Select Movement'}
            />
          </SelectTrigger>
          <SelectContent>
            {movementOptions?.map((o) => (
              <SelectItem key={o.id} value={String(o.id)}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='flex flex-col gap-2'>
        <div className='pl-2 font-medium text-muted-foreground'>BodySide</div>
        <Select
          key={`${regionId ?? 'none'}-${movementId ?? 'none'}`}
          value={bodySideId != null ? String(bodySideId) : undefined}
          onValueChange={(v) => {
            handleBodySideChange(v != null ? Number(v) : undefined);
          }}
          disabled={regionId == null || movementId == null}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={placeholderText?.bodySide ?? 'Select bodySide'}
            />
          </SelectTrigger>
          <SelectContent>
            {bodySideOptions?.map((o) => (
              <SelectItem key={o.id} value={String(o.id)}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
