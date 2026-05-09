import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Controller, useForm } from 'react-hook-form';

import {
  updateMenuSchema,
  type IMenuObject,
  type IUpdateMenu,
} from '../schema/menu-schema';

import { updateMenuApi } from '../api/menu-api';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { QUERY_KEY } from '@/types/query-key';
import { toast } from 'sonner';
import { Pencil } from 'lucide-react';

import SubmitButton from '@/components/SubmitButton';
import FormErrorMessage from '@/components/FormErrorMessage';
import { useState } from 'react';

type UpdateMenuDialogProps = {
  menu: IMenuObject;
};

const UpdateMenuDialog = ({ menu }: UpdateMenuDialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const form = useForm<IUpdateMenu>({
    defaultValues: menu,
    resolver: zodResolver(updateMenuSchema),
  });

  const {
    control,
    handleSubmit,
    setError,

    formState: {
      errors: { root },
    },
  } = form;

  const updateMutation = useMutation({
    mutationFn: updateMenuApi,

    onSuccess() {
      toast.success('Menu modifié avec succès');

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MENUS],
      });

      setIsOpen(false);
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

  const handleFormSubmit = (data: IUpdateMenu) => {
    updateMutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button variant="outline" size="icon">
          <Pencil />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier le menu</DialogTitle>
        </DialogHeader>

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

                <Input {...field} />

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
                <FieldLabel>Path</FieldLabel>

                <Input {...field} />

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
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`show-${menu.id}`}
                    checked={field.value}
                    onCheckedChange={(value: boolean) =>
                      field.onChange(value)
                    }
                  />

                  <Label htmlFor={`show-${menu.id}`}>
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
            isDisabled={updateMutation.isPending}
            text="Enregistrer"
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateMenuDialog;
