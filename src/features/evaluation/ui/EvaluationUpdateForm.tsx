'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { EvaluationForm } from '@/features';
import {
  EvaluationType,
  getEvaluationByPateintIdAndEvaluationNumber,
} from '@/entities';
import { useUpdateEvaluation } from '../hooks';

export const EvaluationUpdateForm = ({
  params,
}: {
  params: { patientId: string; evaluationNumber: string };
}) => {
  const [evaluation, setEvaluation] = useState<EvaluationType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const updated = useUpdateEvaluation();

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getEvaluationByPateintIdAndEvaluationNumber(
          Number(params.patientId),
          Number(params.evaluationNumber)
        );
        setEvaluation(data);
      } catch (err) {
        console.error('Failed fetch :', err);
        setError('Failed fetch');
      }
    };
    fetch();
  }, [params]);

  if (error) return <div>{error}</div>;
  if (!evaluation) return <div>로딩 중..</div>;

  const handleSubmit = async (data: EvaluationType) => {
    if (!evaluation || !evaluation.evaluationNumber)
      throw new Error('Not found data or evaluationNumber');

    await updated(evaluation.evaluationNumber, data);
    router.back();
  };

  return (
    <EvaluationForm initialData={evaluation} onSubmitAction={handleSubmit} />
  );
};
