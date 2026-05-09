import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Skeleton } from '../../../components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/types/query-key';
import { getPublishPageApi } from '@/features/pages-management/api/page-api';
import { Link } from 'react-router';
import { Button } from '../../../components/ui/button';

const HomePageLastPageUploaded = () => {
  const {
    data: pages = [],
    isPending,
    error,
  } = useQuery({
    queryFn: getPublishPageApi,
    queryKey: [QUERY_KEY.PAGES_UPLOADED],
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dernières pages</CardTitle>

        <CardDescription>
          Les contenus récemment ajoutés.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {isPending &&
          Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-14 w-full rounded-lg"
            />
          ))}

        {error && (
          <div className="border border-red-200 bg-red-50 text-red-600 rounded-lg p-4 text-sm">
            Une erreur est survenue lors du chargement des pages.
          </div>
        )}

        {!isPending && !error && pages.length === 0 && (
          <div className="border rounded-lg p-4 text-sm text-muted-foreground">
            Aucune page publiée pour le moment.
          </div>
        )}

        {!isPending &&
          !error &&
          pages.slice(0, 5).map((page) => (
            <div
              key={page.id}
              className="flex items-center justify-between border rounded-lg p-3"
            >
              <span>{page.title}</span>

              <Link to={`/pages/${page.id}`}>
                <Button size="sm" variant="ghost">
                  Voir
                </Button>
              </Link>
            </div>
          ))}
      </CardContent>
    </Card>
  );
};

export default HomePageLastPageUploaded;
