import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  EvaluationDropDown,
  PlanDropDown,
  useEvaluationContext,
  usePlanContext,
} from '@/features';

export const PatientEvalAndPlanSelect = ({
  patientId,
}: {
  patientId: number;
}) => {
  const { evalOpen } = useEvaluationContext();
  const { planOpen } = usePlanContext();

  return (
    <Card className='my-5'>
      <CardHeader>
        <CardTitle>평가 및 계획</CardTitle>
      </CardHeader>
      <EvaluationDropDown patientId={patientId} />
      <PlanDropDown patientId={patientId} />
      <Button className='mx-6' onClick={evalOpen}>
        평가 추가
      </Button>
      <Button className='mx-6' onClick={planOpen}>
        계획 추가
      </Button>
    </Card>
  );
};
