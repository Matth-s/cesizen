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

type UpdateDiagnosticFormProps = {
  diagnostic: IDiagnosticWithAnswer;
};

const UpdateDiagnosticForm = ({
  diagnostic,
}: UpdateDiagnosticFormProps) => {
  const form = useForm<IDiagnosticWithAnswer>({
    defaultValues: { ...diagnostic },
    resolver: zodResolver(diagnosticWithAnswerSchema),
  });

  const { control, handleSubmit } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'answer',
  });

  const handleFormSubmit = (data: IDiagnosticWithAnswer) => {
    console.log(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Modification du diagnostic : {diagnostic.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
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
              className="flex gap-3 items-end border p-3 rounded-lg"
            >
              <Controller
                name={`answer.${index}.name`}
                control={control}
                render={({ field }) => (
                  <Field className="flex-1">
                    <FieldLabel>Question</FieldLabel>
                    <Input {...field} />
                  </Field>
                )}
              />

              <Controller
                name={`answer.${index}.value`}
                control={control}
                render={({ field }) => (
                  <Field className="w-24">
                    <FieldLabel>Points</FieldLabel>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number(e.target.value))
                      }
                    />
                  </Field>
                )}
              />

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

        <Button onClick={handleSubmit(handleFormSubmit)}>
          Enregistrer
        </Button>
      </CardContent>
    </Card>
  );
};

export default UpdateDiagnosticForm;
