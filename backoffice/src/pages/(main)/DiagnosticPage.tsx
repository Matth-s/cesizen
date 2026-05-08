import { getQuizListApi } from '@/features/quiz/api/get-quiz-list-api';
import DiagnosticList from '@/features/quiz/components/DiagnosticList';
import { QUERY_KEY } from '@/types/query-key';
import { useQuery } from '@tanstack/react-query';

const DiagnosticPage = () => {
  const {
    data: diagnostics = [],
    error,
    isPending,
  } = useQuery({
    queryFn: getQuizListApi,
    queryKey: [QUERY_KEY.DIAG],
    retry: false,
  });

  return (
    <div className="w-3/5 mx-auto">
      <DiagnosticList
        isPending={isPending}
        error={error}
        diagnostics={diagnostics}
      />
    </div>
  );
};

export default DiagnosticPage;
