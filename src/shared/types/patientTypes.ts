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
