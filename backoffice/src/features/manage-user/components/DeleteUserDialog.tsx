import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Trash } from 'lucide-react';
import type { IUserObject } from '../schemas/user-list-schema';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  deleteUserSchema,
  type IDeleteUser,
} from '../schemas/delete-user-schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useState } from 'react';
import { deleteUserApi } from '../api/delete-user-api';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/SubmitButton';
import FormErrorMessage from '@/components/FormErrorMessage';
import { QUERY_KEY } from '@/types/query-key';

type DeleteUserDialogProps = {
  user: IUserObject;
};

const DeleteUserDialog = ({ user }: DeleteUserDialogProps) => {
  const queryClient = useQueryClient();
  const { username, id: userId, role } = user;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const form = useForm<IDeleteUser>({
    defaultValues: {
      confirm: '',
    },
    resolver: zodResolver(deleteUserSchema(username)),
  });

  const {
    handleSubmit,
    setError,
    formState: {
      errors: { root },
    },
  } = form;

  const deleteMutation = useMutation({
    mutationFn: deleteUserApi,

    onSuccess() {
      toast.success(
        `L'utilisateur ${username} a été supprimé avec succès`,
      );
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USERS] });
    },

    onError(err) {
      let message = 'Une erreur est survenue';

      if (err instanceof Error) {
        message = err.message;
      }

      setError('root', {
        message,
      });
    },
  });

  const handleFormSubmit = () => {
    deleteMutation.mutate(userId);
  };

  if (role === 'ADMIN') return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Trash className="cursor-pointer" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Voulez-vous supprimer l'utilisateur {username}
          </DialogTitle>
          <DialogDescription>
            Attention cette action est irréversible
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-y-3"
        >
          <Controller
            name="confirm"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="font-light">
                  Tapez :
                  <span className="font-bold">"{username}"</span> pour
                  pouvoir supprimer l'utilisateur
                </FieldLabel>
                <Input {...field} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <FormErrorMessage message={root?.message} />

          <SubmitButton
            variant="destructive"
            isDisabled={
              deleteMutation.isPending ||
              form.watch('confirm')?.trim().toLowerCase() !==
                username.toLowerCase()
            }
            text="Supprimer"
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserDialog;
