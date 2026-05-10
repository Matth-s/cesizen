import { Card, CardContent } from "../ui/card";
import { Brain, ShieldCheck } from "lucide-react";

const AppDescription = () => {
  return (
    <div className="flex flex-col gap-y-3">
      <Card>
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-teal-100 p-3">
              <ShieldCheck className="size-6 text-teal-600" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Accompagnement sécurisé
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Toutes vos informations restent privées et protégées.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-blue-100 p-3">
              <Brain className="size-6 text-blue-600" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Questionnaires & suivi
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Évaluez votre état émotionnel grâce à des outils simples et
                rapides.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppDescription;
