import { QUERY_KEY } from "@/types/query-key-type";
import { useQuery } from "@tanstack/react-query";
import { getMenuItemsApi } from "../api/get-menu-api";
import { Link } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";

type MenuListProps = {
  setIsOpen: () => void;
};

const MenuList = ({ setIsOpen }: MenuListProps) => {
  const {
    data: dynamicMenuItems = [],
    error,
    isPending,
  } = useQuery({
    queryKey: [QUERY_KEY.MENU],
    queryFn: getMenuItemsApi,
    retry: false,
  });

  if (isPending) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
        Une erreur est survenue lors du chargement du menu.
      </div>
    );
  }

  return (
    <>
      {dynamicMenuItems.map((link) => (
        <li key={link.id}>
          <Link
            to={`/dynamic/${link.id}`}
            onClick={() => setIsOpen()}
            className="block rounded-lg px-3 py-2 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </>
  );
};

export default MenuList;
