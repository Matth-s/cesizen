import { Heart } from "lucide-react";
import Aside from "./Aside";

export const HeaderPage = () => {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-x-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-blue-500 shadow-md">
          <Heart className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">CESIZen</h1>
      </div>

      <Aside />
    </div>
  );
};

export default HeaderPage;
