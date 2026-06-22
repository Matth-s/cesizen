import type { answerType } from "../schema/quiz-schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDiagnostic } from "../hooks/use-diagnostic";
import SubmitButton from "@/components/SubmitButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  postDiagnosticSchema,
  type postDiagnosticType,
} from "../schema/post-diagnostic-schema";
import ChoiceDiagCard from "./ChoiceDiagCard";
import DiagnosticProgressStatus from "./DiagnosticProgressStatus";
import { useMutation } from "@tanstack/react-query";
import { postDiagnosticApi } from "../api/post-diagnostic-api";
import FormErrorMessage from "@/components/FormError";

type DiagnosticFormProps = {
  setShowForm: (value: boolean) => void;
  setResult: (value: number) => void;
  answers: answerType[];
  id: string;
};

const DiagnosticForm = ({
  setShowForm,
  setResult,
  answers,
  id,
}: DiagnosticFormProps) => {
  const {
    currentAnswer,
    currentIndex,
    isLastAnswer,
    handleNextAnswer,
    handlePrevAnswer,
    setCurrentIndex,
  } = useDiagnostic(answers);

  const form = useForm<postDiagnosticType>({
    defaultValues: {
      id,
      answers: answers.map((ans) => {
        return {
          id: ans.id,
          value: false,
        };
      }),
    },
    resolver: zodResolver(postDiagnosticSchema),
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: {
      errors: { root },
    },
    setError,
  } = form;

  const currentValue = watch(`answers.${currentIndex}.value`);

  const handleSelect = (value: boolean) => {
    setValue(`answers.${currentIndex}.value`, value);
  };

  const diagMutation = useMutation({
    mutationFn: postDiagnosticApi,

    onSuccess(data) {
      setShowForm(false);
      setResult(data.result);

      form.reset();
      setCurrentIndex(0);
    },

    onError(err) {
      let error =
        "Une erreur est survenue lors de la soumission du diagnostic.";

      if (err instanceof Error) {
        error = err.message;
      }

      setError("root", { message: error });
    },
  });

  const handleFormSubmit = (diag: postDiagnosticType) => {
    diagMutation.mutate(diag);
  };

  return (
    <div className="flex flex-col gap-y-3">
      <DiagnosticProgressStatus
        currentIndex={currentIndex + 1}
        answerTotal={answers.length}
      />

      <Card>
        <CardHeader>
          <CardTitle>{currentAnswer.name}</CardTitle>
          <CardDescription aria-describedby="undefined" />
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="flex flex-col gap-y-3"
          >
            <div className="flex flex-col gap-3">
              <ChoiceDiagCard
                label="Oui"
                selected={currentValue === true}
                onClick={() => handleSelect(true)}
              />

              <ChoiceDiagCard
                label="Non"
                selected={currentValue === false}
                onClick={() => handleSelect(false)}
              />
            </div>

            <FormErrorMessage message={root?.message} />

            {isLastAnswer ? (
              <SubmitButton
                className="submit-button"
                isDisabled={false}
                textButton="Soumettre le diagnostic"
              />
            ) : (
              <div className="flex w-full items-center justify-center gap-x-3">
                <Button
                  type="button"
                  className={"h-10 w-2/5"}
                  onClick={handlePrevAnswer}
                  disabled={currentIndex === 0}
                >
                  Précédent
                </Button>

                <Button
                  type="button"
                  className={"h-10 w-2/5"}
                  onClick={handleNextAnswer}
                >
                  Suivant
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiagnosticForm;
