import { Divider, Header } from '@/shared';

export const PatientHeader = () => {
  return (
    <>
      <Header>Patient</Header>
      <Divider />
      <div className='text-m font-semibold text-muted-foreground my-5'>
        환자를 추가하고 평가를 진행해보세요
      </div>
    </>
  );
};
