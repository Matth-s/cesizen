import { Button } from '@/components/ui/button';
import UpdateDiagnosticForm from '@/features/quiz/components/UpdateDiagnosticForm';
import ViewDiagnostic from '@/features/quiz/components/ViewDiagnostic';
import { useGetDiagnostic } from '@/features/quiz/hooks/use-get-diagnostic';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router';

const DiagnosticIdPage = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { id } = useParams();

  const { data, isPending, error } = useGetDiagnostic(id);

  if (isPending) return <p>chargement data</p>;

  if (error) {
    return <p>une erreur est survenue</p>;
  }

  return (
    <div className="w-4/5 mx-auto">
      <div className="flex items-center justify-between">
        <Link
          to={'/diagnostics'}
          className="w-fit flex items-center gap-x-3 hover:underline"
        >
          <ArrowLeft size={16} /> Liste des diagnostics
        </Link>

        {data && isEditing ? (
          <Button onClick={() => setIsEditing(false)}>
            Afficher le diagnostic
          </Button>
        ) : (
          <Button onClick={() => setIsEditing(true)}>
            Modifier le diagnostic
          </Button>
        )}
      </div>

      {isEditing ? (
        <UpdateDiagnosticForm diagnostic={data} />
      ) : (
        <ViewDiagnostic diagnostic={data} />
      )}
    </div>
  );
};

export default DiagnosticIdPage;
