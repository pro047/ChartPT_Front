import { PlanUpdateForm } from '@/features';

type Props = {
  params: {
    patientId: string;
    planNumber: string;
  };
};

export default async function PlanUpdatePage({ params }: Props) {
  const { patientId, planNumber } = params;
  return <PlanUpdateForm params={{ patientId, planNumber }} />;
}
