import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { EvaluationDropDown, PlanDropDown, usePlanContext } from '@/features';
import { usePatientStore, useEvaluationContext } from '@/shared';

export const PatientEvalAndPlanSelect = () => {
  const { evalOpen, setCreate } = useEvaluationContext();
  const { planOpen } = usePlanContext();

  const patientId = usePatientStore((state) => state.patientId);

  if (patientId === null) {
    throw new Error('PatientId is Null at PatientEvalAndPlanSelcet');
  }

  return (
    <Card className='my-5'>
      <CardHeader>
        <CardTitle>평가 및 계획</CardTitle>
      </CardHeader>
      <EvaluationDropDown patientId={patientId} />
      <PlanDropDown patientId={patientId} />
      <Button
        className='mx-6'
        onClick={() => {
          setCreate();
          evalOpen();
        }}
      >
        평가 추가
      </Button>
      <Button className='mx-6' onClick={planOpen}>
        계획 추가
      </Button>
    </Card>
  );
};
