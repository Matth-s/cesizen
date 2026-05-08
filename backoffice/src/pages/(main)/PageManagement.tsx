import { useQuery } from '@tanstack/react-query';

import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { QUERY_KEY } from '@/types/query-key';
import PageList from '@/features/pages-management/components/PageList';
import { getPageListApi } from '@/features/pages-management/api/page-api';

const PageManagement = () => {
  const { data: pages = [], isLoading } = useQuery({
    queryKey: [QUERY_KEY.PAGES],
    queryFn: getPageListApi,
  });

  if (isLoading) {
    return (
      <div className="p-8 space-y-4">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Pages</h1>
        <Link to="/pages/nouveau">
          <Button>Créer une page</Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <PageList pages={pages} />
      </div>
    </div>
  );
};

export default PageManagement;
