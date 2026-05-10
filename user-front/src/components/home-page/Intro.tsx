import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const Intro = () => {
  return (
    <Card className="overflow-hidden border-0 shadow-sm">
      <CardHeader className="bg-white">
        <div className="flex items-center gap-4">
          <div>
            <CardTitle className="text-3xl font-black text-gray-900">
              CESIZen
            </CardTitle>

            <CardDescription className="mt-1 text-sm">
              Votre espace bien-être & accompagnement.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-3xl bg-gradient-to-r from-teal-500 to-blue-500 p-6 text-white shadow-lg">
          <h2 className="mt-4 text-2xl leading-tight font-black">
            Prenez soin de votre santé mentale au quotidien.
          </h2>

          <p className="mt-3 text-sm leading-6 text-white/90">
            Retrouvez vos ressources, questionnaires et outils de suivi.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Intro;
