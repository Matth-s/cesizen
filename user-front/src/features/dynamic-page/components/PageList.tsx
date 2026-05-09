import type { IDynamicPageArray } from "../schema/dynamic-page-schema";
import PageCard from "./PageCard";

type PageListProps = {
  pages: IDynamicPageArray;
};

const PageList = ({ pages }: PageListProps) => {
  return (
    <div className="flex flex-col gap-4">
      {pages.map((page) => (
        <PageCard key={page.id} page={page} />
      ))}
    </div>
  );
};

export default PageList;
