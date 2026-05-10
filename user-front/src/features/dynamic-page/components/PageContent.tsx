import type { IDynamicPageObject } from "@/features/dynamic-page/schema/dynamic-page-schema";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router";

type PageContentProps = {
  page: IDynamicPageObject;
};

const PageContent = ({ page }: PageContentProps) => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto w-full px-4 py-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-blue-600"
        >
          <ArrowLeft className="size-4" />
          Retour
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <CalendarDays className="size-4" />

          <span>
            {new Date(page.createdAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      <div className="pt-6">
        <h1 className="text-4xl leading-tight font-black text-gray-900">
          {page.title}
        </h1>

        {page.imageUrl && (
          <img
            src={page.imageUrl}
            alt={page.title}
            className="mt-8 max-h-[450px] w-full rounded-2xl object-cover"
          />
        )}

        <p className="mt-8 text-lg leading-8 text-gray-600">
          {page.description}
        </p>

        <div className="mt-8 whitespace-pre-wrap text-gray-700">
          {page.content}
        </div>
      </div>
    </div>
  );
};

export default PageContent;
