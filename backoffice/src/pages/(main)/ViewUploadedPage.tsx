import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { QUERY_KEY } from '@/types/query-key';
import { getPagePageById } from '@/features/pages-management/api/page-api';

import ViewPage from '@/features/pages-management/components/ViewPage';

const ViewUploadedPage = () => {
  const { id } = useParams();

  const { data, error, isPending } = useQuery({
    queryKey: [QUERY_KEY.PAGES, id],
    queryFn: () => getPagePageById(id),
    enabled: !!id,
  });

  if (isPending) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <Card>
          <CardContent className="space-y-6 p-6">
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-75 w-full rounded-xl" />

            <div className="space-y-3">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-24 w-full" />
            </div>

            <div className="space-y-3">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-62.5 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Card>
          <CardContent className="p-6">
            <div className="border border-red-200 bg-red-50 text-red-600 rounded-xl p-4">
              Une erreur est survenue lors du chargement de la page.
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <ViewPage page={data} />;
};

export default ViewUploadedPage;
