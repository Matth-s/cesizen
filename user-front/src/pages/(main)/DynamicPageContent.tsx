import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { QUERY_KEY } from "@/types/query-key-type";
import { getDynamicPageByIdApi } from "@/features/dynamic-page/api/get-dynamic-page-api";
import PageContent from "@/features/dynamic-page/components/PageContent";

const DynamicPageContent = () => {
  const { pageId } = useParams();

  const { data, isPending, error } = useQuery({
    queryKey: [QUERY_KEY.PAGES, pageId],
    queryFn: () => getDynamicPageByIdApi(pageId),
    enabled: !!pageId,
    retry: false,
  });

  if (isPending) {
    return (
      <div className="h-fit p-4">
        <Card className="mx-auto max-w-4xl overflow-hidden">
          <Skeleton className="h-[300px] w-full" />

          <CardContent className="space-y-6 p-6">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-12 w-2/3" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />

            <div className="space-y-3 pt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-4">
        <Card className="mx-auto max-w-2xl">
          <CardContent className="p-6">
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">
              Une erreur est survenue lors du chargement de la page.
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <PageContent page={data} />;
};

export default DynamicPageContent;
