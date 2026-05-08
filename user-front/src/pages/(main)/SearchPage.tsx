import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPagesApi } from "@/api/cms-api";
import { Link } from "react-router";
import { Search } from "lucide-react";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: pages, isLoading } = useQuery({
    queryKey: ["pages"],
    queryFn: getPagesApi,
  });

  const filteredPages = pages?.filter((page: any) =>
    page.isPublished && (
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (page.description?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      page.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-8 text-3xl font-bold">Rechercher une page</h1>

      <div className="relative mb-8">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full rounded-xl border border-gray-200 bg-white p-4 pl-10 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Titre, contenu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="text-center text-gray-500">Chargement...</div>
      ) : (
        <div className="space-y-4">
          {filteredPages?.length > 0 ? (
            filteredPages.map((page: any) => (
              <Link
                key={page.id}
                to={`/page/${page.slug}`}
                className="block rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <h2 className="text-xl font-semibold text-blue-600">{page.title}</h2>
                {page.description && (
                  <p className="mt-1 font-medium text-gray-800 line-clamp-1">
                    {page.description}
                  </p>
                )}
                <p className="mt-2 line-clamp-2 text-gray-600">
                  {page.content}
                </p>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">Aucun résultat trouvé.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
