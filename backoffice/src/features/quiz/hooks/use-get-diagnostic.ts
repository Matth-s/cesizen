import { useQuery } from '@tanstack/react-query';
import { getDiagnosticById } from '../api/get-diagnostic-by-id-api';
import { QUERY_KEY } from '@/types/query-key';

export const useGetDiagnostic = (id?: string) => {
  return useQuery({
    queryFn: () => getDiagnosticById(id),
    queryKey: [QUERY_KEY.DIAG, id],
    retry: false,
    enabled: !!id,
  });
};
