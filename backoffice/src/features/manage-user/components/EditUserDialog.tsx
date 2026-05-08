import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Edit } from 'lucide-react';
import type { IUserObject } from '../schemas/user-list-schema';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  updateUserSchema,
  type IUpdateUserType,
} from '../schemas/update-user-schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserApi } from '../api/update-user-api';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { useState } from 'react';
import { QUERY_KEY } from '@/types/query-key';
import { toast } from 'sonner';
import SubmitButton from '@/components/SubmitButton';
import FormErrorMessage from '@/components/FormErrorMessage';
import { Field, FieldLabel } from '@/components/ui/field';

type EditUserDialogProps = {
  user: IUserObject;
};

const EditUserDialog = ({ user }: EditUserDialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isActive, username, id } = user;
  const queryClient = useQueryClient();

  const form = useForm<IUpdateUserType>({
    defaultValues: {
      id,
      isActive,
    },
    resolver: zodResolver(updateUserSchema),
  });

  const {
    handleSubmit,
    setError,
    formState: {
      errors: { root },
    },
  } = form;

  const editMutation = useMutation({
    mutationFn: updateUserApi,

    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USERS] });
      setIsOpen(false);
      toast.success(data.message);
    },

    onError(err) {
      let errorMessage = 'Une erreur est survenue';

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError('root', {
        message: errorMessage,
      });
    },
  });

  const handleFormSubmit = (formData: IUpdateUserType) => {
    editMutation.mutate(formData);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => setIsOpen((prev) => !prev)}
    >
      <DialogTrigger>
        <Edit className="cursor-pointer" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier le compte de {username}</DialogTitle>
        </DialogHeader>

        <form
          className="flex flex-col gap-y-3"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <Controller
            name="isActive"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Modifier l'état du compte</FieldLabel>
                <Select
                  onValueChange={(value) =>
                    field.onChange(value === 'true')
                  }
                  defaultValue={field.value ? 'true' : 'false'}
                >
                  <SelectTrigger className="w-full">
                    <span>
                      {field.value
                        ? 'Activer le compte'
                        : 'Désactiver le compte'}
                    </span>
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="true">
                        Activer le compte
                      </SelectItem>
                      <SelectItem value="false">
                        Désactiver le compte
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />

          <FormErrorMessage message={root?.message} />

          <SubmitButton
            isDisabled={editMutation.isPending}
            text="Modifier"
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
