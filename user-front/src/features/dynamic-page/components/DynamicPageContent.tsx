import type { IDynamicPageObject } from "@/features/dynamic-page/schema/dynamic-page-schema";
import { CalendarDays } from "lucide-react";

type PageContentProps = {
  page: IDynamicPageObject;
};

const PageContent = ({ page }: PageContentProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <article className="mx-auto max-w-4xl px-4 py-8">
        <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
          {page.imageUrl && (
            <img
              src={page.imageUrl}
              alt={page.title}
              className="max-h-[450px] w-full object-cover"
            />
          )}

          <div className="p-6 md:p-10">
            <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
              <CalendarDays className="size-4" />

              <span>
                {new Date(page.createdAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            <h1 className="text-4xl leading-tight font-black text-gray-900">
              {page.title}
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              {page.description}
            </p>

            <div className="my-8 h-px bg-gray-200" />

            <div className="prose prose-gray max-w-none whitespace-pre-wrap text-gray-700">
              {page.content}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default PageContent;
