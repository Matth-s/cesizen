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

const DiagnosticPage = () => {
  const { data, isPending, error } = useQuery({
    queryFn: getDiagnosticApi,
    queryKey: [QUERY_KEY.QUIZ],
    retry: false,
  });

  if (isPending) return <p>chargement du quiz</p>;

  if (error || (!isPending && !data)) return <p>une erreur est survenue</p>;

  return (
    <div className="flex flex-col gap-y-3">
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
      <DiagnosticForm answers={data.answer} id={data.id} />
    </div>
  );
};

export default DiagnosticPage;
