import { zodResolver } from '@hookform/resolvers/zod';

import { Controller, useForm } from 'react-hook-form';
import {
  updatePageSchema,
  type IPageObject,
  type IUpdatePage,
} from '../schemas/pages-schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePageApi } from '../api/page-api';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import SubmitButton from '@/components/SubmitButton';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router';
import { Label } from '@/components/ui/label';
import FormErrorMessage from '@/components/FormErrorMessage';
import { toast } from 'sonner';
import { QUERY_KEY } from '@/types/query-key';

type UpdatePageFormProps = {
  page: IPageObject;
};

const UpdatePageForm = ({ page }: UpdatePageFormProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const form = useForm<IUpdatePage>({
    defaultValues: {
      ...page,
    },
    resolver: zodResolver(updatePageSchema),
  });

  const {
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: {
      errors: { root },
    },
  } = form;

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue('imageUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateMutation = useMutation({
    mutationFn: updatePageApi,

    onSuccess() {
      toast.success('La page à été crée avec succès');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PAGES] });
      navigate('/pages');
    },

    onError(err) {
      let error = 'Une erreur est survenue';

      if (err instanceof Error) {
        error = err.message;
      }

      setError('root', {
        message: error,
      });
    },
  });

  const handleFormSubmit = async (formData: IUpdatePage) => {
    updateMutation.mutate(formData);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Modifier la page {page.title}
      </h1>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-y-3 bg-white p-6"
      >
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Titre</FieldLabel>
              <Input {...field} />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="slug"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Slug</FieldLabel>
              <Input {...field} />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <div className="space-y-2">
          <Label htmlFor="image">Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {watch('imageUrl') && (
            <img
              src={watch('imageUrl')}
              alt="Preview"
              className="mt-2 h-32 object-cover rounded border"
            />
          )}
        </div>

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Résumé</FieldLabel>
              <Textarea {...field} />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="content"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Contenu</FieldLabel>
              <Textarea {...field} />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="isPublished"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Publication</FieldLabel>

              <div className="flex items-center gap-2">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(value: boolean) =>
                    field.onChange(value)
                  }
                />

                <span>Publier la page</span>
              </div>

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <FormErrorMessage message={root?.message} />

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/pages')}
          >
            Annuler
          </Button>
          <SubmitButton
            isDisabled={updateMutation.isPending}
            text="Enregistrer"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdatePageForm;
