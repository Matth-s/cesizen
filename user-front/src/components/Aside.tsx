import { Menu, User, LogIn, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useAppSelector } from "@/store/hooks";
import { Link } from "react-router";
import {
  DEFAULT_LINK,
  USER_CONNECTED_LINK,
  USER_NOT_CONNECT_LINK,
} from "@/constants/app-links";
import LogoutButton from "@/features/users/components/LogoutButton";
import { useQuery } from "@tanstack/react-query";
import { getMenuItemsApi } from "@/api/cms-api";

const Aside = () => {
  const { user } = useAppSelector((state) => state.user);

  const { data: dynamicMenuItems } = useQuery({
    queryKey: ["menuItems"],
    queryFn: getMenuItemsApi,
  });

  return (
    <Sheet>
      <SheetTrigger className="rounded-lg p-2 transition hover:bg-gray-100">
        <Menu />
      </SheetTrigger>

      <SheetContent className="flex flex-col p-6">
        <ul className="flex flex-col gap-2">
          {DEFAULT_LINK.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className="block rounded-lg px-3 py-2 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
              >
                {link.label}
              </Link>
            </li>
          ))}

          <li>
            <Link
              to="/recherche"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
            >
              <Search size={18} />
              Rechercher
            </Link>
          </li>

          {dynamicMenuItems?.map((link: any) => (
            <li key={link.id}>
              <Link
                to={link.path}
                className="block rounded-lg px-3 py-2 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
              >
                {link.label}
              </Link>
            </li>
          ))}

          {user &&
            USER_CONNECTED_LINK.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="block rounded-lg px-3 py-2 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  {link.label}
                </Link>
              </li>
            ))}
        </ul>

        <div className="mt-auto flex flex-col gap-y-3 border-t pt-3">
          {user ? (
            <div className="flex h-fit items-center gap-3">
              <div className="rounded-full bg-gray-200 p-2">
                <User size={18} />
              </div>
              <div>
                <p className="text-sm font-medium">
                  {user.username || "Utilisateur"}
                </p>
                <p className="text-xs text-gray-500">Connecté</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {USER_NOT_CONNECT_LINK.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                    index === 0
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <LogIn size={16} />
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {user && <LogoutButton />}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Aside;
