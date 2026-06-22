import { getDiagnosticApi } from "@/features/diagnostic/api/get-diagnostic-api";
import { QUERY_KEY } from "@/types/query-key-type";
import { useQuery } from "@tanstack/react-query";

import DiagnosticForm from "@/features/diagnostic/components/DiagnosticForm";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import HolmesRaheResultCard from "@/features/diagnostic/components/HolmesRaheResultCard";

const DiagnosticPage = () => {
  const [showForm, setShowForm] = useState(true);
  const [result, setResult] = useState<number>(0);

  const { data, isPending, error } = useQuery({
    queryFn: getDiagnosticApi,
    queryKey: [QUERY_KEY.QUIZ],
    retry: false,
  });

  if (isPending) return <p>chargement du quiz</p>;

  if (error || (!isPending && !data)) return <p>une erreur est survenue</p>;

  return (
    <div className="flex flex-col gap-y-3">
      {showForm ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Évaluation de votre niveau de stress</CardTitle>
              <CardDescription>
                Ce questionnaire vous aidera à évaluer votre niveau de stress
                actuel. Répondez honnêtement à chaque question en pensant aux 24
                derniers mois.
              </CardDescription>
            </CardHeader>
          </Card>
          <DiagnosticForm
            setShowForm={(value: boolean) => setShowForm(value)}
            setResult={setResult}
            answers={data.answer}
            id={data.id}
          />
        </>
      ) : (
        <HolmesRaheResultCard
          score={result}
          setShowForm={(value: boolean) => setShowForm(value)}
        />
      )}
    </div>
  );
};

export default DiagnosticPage;
