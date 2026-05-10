import { Menu, User, LogIn } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useAppSelector } from "@/store/hooks";
import { Link } from "react-router";
import { DEFAULT_LINK, USER_NOT_CONNECT_LINK } from "@/constants/app-links";
import { useState } from "react";
import LogoutButton from "@/features/users/components/LogoutButton";
import MenuList from "@/features/menu/components/MenuList";

const Aside = () => {
  const [open, setIsOpen] = useState<boolean>(false);

  const { user } = useAppSelector((state) => state.user);

  return (
    <Sheet open={open} onOpenChange={setIsOpen}>
      <SheetTrigger className="rounded-lg p-2 transition hover:bg-gray-100">
        <Menu />
      </SheetTrigger>

      <SheetContent className="safe-area flex flex-col p-6">
        <ul className="flex flex-col gap-2">
          {DEFAULT_LINK.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-3 py-2 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
              >
                {link.label}
              </Link>
            </li>
          ))}

          <MenuList setIsOpen={() => setIsOpen((prev) => !prev)} />
        </ul>

        <div className="mt-auto flex flex-col gap-y-3 border-t pt-3">
          {user ? (
            <Link
              to={"/parametres"}
              onClick={() => setIsOpen(false)}
              className="flex h-fit items-center gap-3"
            >
              <div className="rounded-full bg-gray-200 p-2">
                <User size={18} />
              </div>
              <div>
                <p className="text-sm font-medium">
                  {user.username || "Utilisateur"}
                </p>
                <p className="text-xs text-gray-500">Connecté</p>
              </div>
            </Link>
          ) : (
            <div className="flex flex-col gap-3 pb-3">
              {USER_NOT_CONNECT_LINK.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
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
