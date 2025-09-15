import z from 'zod';

export type PatientInfo = {
  id: number;
  name: string;
  age: number;
  gender: string;
  firstVisit: Date;
  occupation: string;
};

export type PatientStore = {
  patientId: number | null;
  patientInfo: PatientInfo | null;
  setPatientId: (id: number) => void;
  setPatientInfo: (info: PatientInfo) => void;
  clearPatient: () => void;
};

export const chartSchema = z.object({
  userId: z.number().optional(),
  name: z.string().nonempty('이름은 필수항목입니다'),
  gender: z.enum(['male', 'female']),
  age: z.coerce.number().min(1, { message: '나이는 필수항목입니다' }),
  firstVisit: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
    message: '유효한 날짜 형식이어야 합니다',
  }),
  occupation: z.string(),
});

export type ChartSchemaType = z.infer<typeof chartSchema>;
