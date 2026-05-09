import { getDynamicPageApi } from "@/features/dynamic-page/api/get-dynamic-page-api";
import { QUERY_KEY } from "@/types/query-key-type";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";

import PageList from "@/features/dynamic-page/components/PageList";

const DynamicPage = () => {
  const { id } = useParams();

  const {
    data: pages = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_KEY.PAGES, id],
    queryFn: () => getDynamicPageApi(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border bg-white p-4 shadow-sm"
          >
            <Skeleton className="h-48 w-full rounded-xl" />
            <div className="mt-4 space-y-3">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600 shadow-sm">
          <p>Une erreur est survenue lors du chargement des pages.</p>
        </div>
      </div>
    );
  }

  if (pages.length === 0) {
    return (
      <div className="p-4">
        <div className="rounded-2xl border bg-white p-6 text-center shadow-sm">
          <p className="text-gray-500">
            Aucune page disponible pour le moment.
          </p>

          <Link
            to="/"
            className="mt-4 inline-flex items-center rounded-xl bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
          >
            Revenir à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <PageList pages={pages} />
    </div>
  );
};

export default DynamicPage;
