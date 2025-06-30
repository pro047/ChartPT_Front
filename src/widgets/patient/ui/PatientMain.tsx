import {
  PatientAddButton,
  PatientHeader,
  PatientSearchSection,
} from '@/features';
import { Container } from '@/shared';

export const PatientMainWiget = () => {
  return (
    <Container>
      <PatientHeader />
      <PatientAddButton />
      <PatientSearchSection />
    </Container>
  );
};
