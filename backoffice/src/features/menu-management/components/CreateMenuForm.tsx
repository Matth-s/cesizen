import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import {
  createMenuSchema,
  type ICreateMenu,
} from '../schema/menu-schema';
import { createMenuApi } from '../api/menu-api';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import SubmitButton from '@/components/SubmitButton';
import FormErrorMessage from '@/components/FormErrorMessage';

import { QUERY_KEY } from '@/types/query-key';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const CreateMenuForm = () => {
  const queryClient = useQueryClient();

  const form = useForm<ICreateMenu>({
    defaultValues: {
      label: '',
      path: '',
      show: true,
    },
    resolver: zodResolver(createMenuSchema),
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: {
      errors: { root },
    },
  } = form;

  const createMutation = useMutation({
    mutationFn: createMenuApi,

    onSuccess() {
      toast.success('Le menu a été créé avec succès');
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MENUS],
      });
      form.reset();
    },

    onError(error) {
      let message = 'Une erreur est survenue';

      if (error instanceof Error) {
        message = error.message;
      }

      setError('root', {
        message,
      });
    },
  });

  const handleFormSubmit = (data: ICreateMenu) => {
    createMutation.mutate(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Créer un menu</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-y-4"
        >
          <Controller
            name="label"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Label</FieldLabel>

                <Input placeholder="Ex: Accueil" {...field} />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="path"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Lien</FieldLabel>

                <Input placeholder="/accueil" {...field} />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="show"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Afficher dans le menu</FieldLabel>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="show-menu"
                    checked={field.value}
                    onCheckedChange={(value: boolean) =>
                      field.onChange(value)
                    }
                  />

                  <Label htmlFor="show-menu">
                    Afficher le menu pour les utilisateurs
                  </Label>
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <FormErrorMessage message={root?.message} />

          <SubmitButton
            isDisabled={createMutation.isPending}
            text="Ajouter"
          />
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateMenuForm;
