import type { IDynamicPageObject } from "../schema/dynamic-page-schema";

import { CalendarDays } from "lucide-react";

import { Link } from "react-router";

type PageCardProps = {
  page: IDynamicPageObject;
};

const PageCard = ({ page }: PageCardProps) => {
  const { title, id, description, createdAt, imageUrl } = page;

  return (
    <Link
      to={`${id}`}
      className="block rounded-2xl border bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="space-y-4">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="h-48 w-full rounded-xl object-cover"
          />
        )}

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CalendarDays className="size-4" />

            <span>
              {new Date(createdAt).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <h2 className="line-clamp-2 text-xl font-bold text-gray-900">
            {page.title}
          </h2>

          <p className="line-clamp-3 text-sm leading-6 text-gray-600">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PageCard;
