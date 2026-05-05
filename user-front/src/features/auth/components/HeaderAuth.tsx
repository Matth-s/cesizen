import { Heart } from "lucide-react";

const HeaderAuth = () => {
  return (
    <div className="p-2 text-center">
      <div className="mb-2 flex items-center justify-center gap-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-blue-500 shadow-lg">
          <Heart className="h-7 w-7 text-white" aria-hidden="true" />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-gray-900">CESIZen</h1>
      <p className="mt-2 text-base text-gray-700">
        Votre bien-être mental au quotidien
      </p>
    </div>
  );
};

export default HeaderAuth;
