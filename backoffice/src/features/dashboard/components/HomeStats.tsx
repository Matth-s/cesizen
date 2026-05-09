import { QUERY_KEY } from '@/types/query-key';
import { useQuery } from '@tanstack/react-query';
import { getStatsApi } from '../api/get-stats-api';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText, Menu, Users, Activity } from 'lucide-react';

const HomeStats = () => {
  const { data, error, isPending } = useQuery({
    queryKey: [QUERY_KEY.STATS],
    queryFn: getStatsApi,
  });

  const stats = [
    {
      title: 'Pages',
      value: data?.totalPages ?? 0,
      icon: FileText,
    },

    {
      title: 'Menus',
      value: data?.totalMenus ?? 0,
      icon: Menu,
    },

    {
      title: 'Utilisateurs',
      value: data?.totalUsers ?? 0,
      icon: Users,
    },

    {
      title: 'Pages publiées',
      value: data?.totalPublishedPages ?? 0,
      icon: Activity,
    },
  ];

  if (isPending) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-4 w-24" />

              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="border border-red-200 bg-red-50 text-red-600 rounded-xl p-4">
            Une erreur est survenue lors du chargement des
            statistiques.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.title}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {stat.title}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {stat.value}
                </h2>
              </div>

              <div className="p-3 rounded-xl bg-muted">
                <Icon className="size-6" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default HomeStats;
