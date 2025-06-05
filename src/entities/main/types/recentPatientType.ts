import { z } from 'zod';

const recentPatientTypeSchema = z.object({
  name: z.string(),
  firstVisit: z.coerce.date(),
});

export type RecentPatientType = z.infer<typeof recentPatientTypeSchema>;
