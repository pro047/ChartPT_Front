export type SinglePoint = {
  x: number;
  y: number;
};

export type SingleLineResponse = { data: SinglePoint[] };

export type MultiLineResponse = {
  x: number;
  rom: number | null;
  vas: number | null;
  bodyRegionId: number;
  movementId: number;
  bodySideId: number;
  region: string;
  movement: string;
  bodySide: string;
};
