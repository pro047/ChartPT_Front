import { Button } from '@/components/ui/button';
import { CardContent, CardTitle } from '@/components/ui/card';
import { usePatientChartContext } from '@/features';
import { CardLayout } from '@/shared';

export const PatientAddButton = () => {
  const { open } = usePatientChartContext();

  return (
    <CardLayout>
      <CardContent>
        <CardTitle className='text-xl'>환자 추가</CardTitle>
        <Button className='mt-5' onClick={open}>
          환자 추가하기
        </Button>
      </CardContent>
    </CardLayout>
  );
};
