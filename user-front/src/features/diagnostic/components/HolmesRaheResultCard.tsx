import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getStressLevel } from "../helpers/calc-diag-result";

type HolmesRaheResultCardProps = {
  score: number;
  setShowForm: (value: boolean) => void;
};

const HolmesRaheResultCard = ({
  score,
  setShowForm,
}: HolmesRaheResultCardProps) => {
  const result = getStressLevel(score);
  const Icon = result.icon;

  return (
    <div className="flex flex-col gap-y-3">
      <Button
        variant="ghost"
        className="w-fit rounded-2xl px-2"
        onClick={() => setShowForm(true)}
      >
        <ArrowLeft className="mr-1 size-4" />
        Retour au questionnaire
      </Button>

      <Card className="w-full rounded-3xl border shadow-sm">
        <CardContent className="p-5">
          <div className="flex flex-col gap-5">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm">
                  Résultat du diagnostic
                </p>

                <h2 className="text-2xl font-bold tracking-tight">
                  {score} points
                </h2>
              </div>

              <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-2xl border",
                  result.color,
                )}
              >
                <Icon className="size-7" />
              </div>
            </div>

            <div className="bg-muted/50 flex items-center justify-between gap-2 rounded-2xl p-4">
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm">
                  Niveau de stress
                </p>

                <h3 className="text-lg font-semibold">{result.title}</h3>
              </div>

              <Badge variant="secondary" className="rounded-full px-3 py-1">
                {result.badge}
              </Badge>
            </div>

            <div className="bg-background rounded-2xl border p-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  Risque estimé sur la santé
                </span>

                <span className="text-xl font-bold">{result.risk}</span>
              </div>

              <div className="bg-muted mt-3 h-2 overflow-hidden rounded-full">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    score > 300
                      ? "w-[80%] bg-red-500"
                      : score >= 100
                        ? "w-[51%] bg-orange-500"
                        : "w-[30%] bg-emerald-500",
                  )}
                />
              </div>
            </div>

            <div className="bg-muted/40 space-y-3 rounded-2xl p-4">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {result.description}
              </p>

              <div className="bg-background rounded-xl border p-3">
                <p className="text-sm font-medium">Conseil</p>

                <p className="text-muted-foreground mt-1 text-sm">
                  {result.recommendation}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HolmesRaheResultCard;
