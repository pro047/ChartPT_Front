import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { EvaluationDropDown, PlanDropDown } from '@/features';
import Link from 'next/link';

export const PatientEvalAndPlanSelect = ({
  patientId,
}: {
  patientId: number;
}) => {
  return (
    <Card className='my-5'>
      <CardHeader>
        <CardTitle>평가 및 계획</CardTitle>
      </CardHeader>
      <EvaluationDropDown patientId={patientId} />
      <PlanDropDown />
      <Button asChild className='mx-6'>
        <Link href={`/patient/${patientId}/evaluation`}>평가 추가</Link>
      </Button>
      <Button asChild className='mx-6'>
        <Link href={`/patient/${patientId}/plan`}>계획 추가</Link>
      </Button>
    </Card>
  );
};
