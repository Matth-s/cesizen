import { Controller, useFieldArray, useForm } from 'react-hook-form';
import {
  diagnosticWithAnswerSchema,
  type IDiagnosticWithAnswer,
} from '../schema/quiz-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateDiagnosticApi } from '../api/update-diagnostic-api';
import SubmitButton from '@/components/SubmitButton';
import { toast } from 'sonner';
import { QUERY_KEY } from '@/types/query-key';

type UpdateDiagnosticFormProps = {
  diagnostic: IDiagnosticWithAnswer;
  switchToView: () => void;
};

const UpdateDiagnosticForm = ({
  diagnostic,
  switchToView,
}: UpdateDiagnosticFormProps) => {
  const queryClient = useQueryClient();
  const form = useForm<IDiagnosticWithAnswer>({
    defaultValues: { ...diagnostic },
    resolver: zodResolver(diagnosticWithAnswerSchema),
  });

  const { control, handleSubmit } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'answer',
  });

  const diagnosticMutation = useMutation({
    mutationFn: updateDiagnosticApi,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.DIAG, diagnostic.id],
      });
      switchToView();
      toast.success('Le diagnostic à été modifié avec succès');
      window.scrollTo(0, 0);
    },

    onError(err) {
      let error = 'Une erreur est survenue';

      if (err instanceof Error) {
        error = err.message;
      }

      toast.error(error);
    },
  });

  const handleFormSubmit = (data: IDiagnosticWithAnswer) => {
    diagnosticMutation.mutate(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Modification du diagnostic : {diagnostic.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Nom du diagnostic</FieldLabel>
                <Input {...field} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <div className="space-y-4">
            <h3 className="font-semibold">Questions</h3>

            {fields.map((item, index) => (
              <div
                key={item.id}
                className="flex gap-3 items-center border p-3 rounded-lg"
              >
                <div className="flex gap-3 items-top w-full ">
                  <Controller
                    name={`answer.${index}.name`}
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field className="flex-1">
                        <FieldLabel>Question</FieldLabel>
                        <Input {...field} />{' '}
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name={`answer.${index}.value`}
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field className="w-24">
                        <FieldLabel>Points</FieldLabel>
                        <Input
                          min={1}
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>

                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                >
                  Supprimer
                </Button>
              </div>
            ))}

            <Button
              type="button"
              className="w-full"
              onClick={() =>
                append({
                  id: crypto.randomUUID(),
                  name: '',
                  value: 0,
                  quizId: diagnostic.id,
                })
              }
            >
              Ajouter une question
            </Button>
          </div>

          <SubmitButton
            text="Modifier le diagnostic"
            isDisabled={diagnosticMutation.isPending}
          />
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateDiagnosticForm;
