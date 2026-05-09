import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getPagePageById } from '@/features/pages-management/api/page-api';
import { Skeleton } from '@/components/ui/skeleton';
import CreatePageForm from '@/features/pages-management/components/CreatePageForm';
import { QUERY_KEY } from '@/types/query-key';
import UpdatePageForm from '@/features/pages-management/components/UpdatePageForm';

const PageEditor = () => {
  const { id } = useParams();

  const isEdit = !!id;

  const { data: page, isLoading } = useQuery({
    queryKey: [QUERY_KEY.PAGES, id],
    queryFn: () => getPagePageById(id),
    enabled: isEdit,
  });

  if (isEdit && isLoading) {
    return (
      <div className="p-8 max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-8 w-62.5" />
        <Skeleton className="h-150 w-full" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {isEdit ? <UpdatePageForm page={page} /> : <CreatePageForm />}
    </div>
  );
};

export default PageEditor;
