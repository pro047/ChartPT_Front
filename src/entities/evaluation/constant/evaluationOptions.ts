export type Option = { id: number; label: string };

export const defaultRegions: Option[] = [
  { id: 1, label: 'Cervical' },
  { id: 2, label: 'Thoracic' },
  { id: 3, label: 'lumber' },
  { id: 4, label: 'Pelvic' },
  { id: 5, label: 'Knee' },
  { id: 6, label: 'Ankle' },
  { id: 7, label: 'Elbow' },
  { id: 8, label: 'Wrist' },
];

export const defaultMovemetns: Option[] = [
  { id: 1, label: 'Flexion' },
  { id: 2, label: 'Extension' },
  { id: 3, label: 'Abduction' },
  { id: 4, label: 'Adduction' },
  { id: 5, label: 'External Rotation' },
  { id: 6, label: 'Internal Rotation' },
];

export const defaultBodySides: Option[] = [
  { id: 1, label: 'Left' },
  { id: 2, label: 'Right' },
  { id: 3, label: 'Bilateral' },
  { id: 4, label: 'Unilateral' },
];
