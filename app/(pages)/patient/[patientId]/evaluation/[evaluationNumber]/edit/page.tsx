import { EvaluationUpdateForm } from '@/features';

type Props = {
  params: {
    patientId: string;
    evaluationNumber: string;
  };
};

export default async function EvaluationUpdatePage({ params }: Props) {
  const { patientId, evaluationNumber } = params;
  return <EvaluationUpdateForm params={{ patientId, evaluationNumber }} />;
}
