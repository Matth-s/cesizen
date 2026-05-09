import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="flex h-full items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md rounded-3xl border bg-white p-8 text-center shadow-sm">
        <h2 className="mt-2 text-xl font-semibold text-gray-800">
          Page introuvable
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-600"
        >
          <ArrowLeft className="size-4" />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
