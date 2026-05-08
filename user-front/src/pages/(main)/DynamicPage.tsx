import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getPageBySlugApi } from "@/api/cms-api";

const DynamicPage = () => {
  const { slug } = useParams();

  const { data: page, isLoading, error } = useQuery({
    queryKey: ["page", slug],
    queryFn: () => getPageBySlugApi(slug!),
    enabled: !!slug,
  });

  if (isLoading) return <div className="p-8 text-center text-gray-600">Chargement...</div>;
  if (error || !page) return <div className="p-8 text-center text-red-500">Page non trouvée</div>;

  return (
    <article className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-4xl font-bold text-gray-900">{page.title}</h1>

      {page.imageUrl && (
        <div className="mb-8 overflow-hidden rounded-2xl shadow-lg">
          <img
            src={page.imageUrl}
            alt={page.title}
            className="h-auto w-full object-cover"
          />
        </div>
      )}

      <div className="prose prose-blue max-w-none whitespace-pre-wrap text-lg leading-relaxed text-gray-700">
        {page.content}
      </div>
    </article>
  );
};

export default DynamicPage;
