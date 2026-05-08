import type { IQuizArray } from '../schema/quiz-schema';
import DiagnosticCard from './DiagnosticCard';

type DiagnosticListProps = {
  error: Error | null;
  isPending: boolean;
  diagnostics: IQuizArray;
};
const DiagnosticList = ({
  error,
  isPending,
  diagnostics,
}: DiagnosticListProps) => {
  if (isPending) return <p>chargement des diags</p>;
  if (error) return <p>Une erreur esr survenue</p>;

  if (diagnostics.length === 0)
    return <p>Aucun diagnostic n'a été trouvé</p>;

  return (
    <div className="flex flex-col gap-3">
      {diagnostics.map((diag) => (
        <DiagnosticCard key={diag.id} diagnostic={diag} />
      ))}
    </div>
  );
};

export default DiagnosticList;
