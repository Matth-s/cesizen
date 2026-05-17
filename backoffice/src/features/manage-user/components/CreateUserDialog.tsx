import FormErrorMessage from '@/components/FormErrorMessage';
import SubmitButton from '@/components/SubmitButton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import ShowFormPassword from '@/features/auth/components/ShowPassword';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import {
  createUserSchema,
  type ICreateUser,
} from '../schemas/create-user-schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUserApi } from '../api/create-user-api';
import { useState } from 'react';
import { USER_ROLE } from '@/types/user-role';

import SelectUserRole from './SelectUserRole';
import { toast } from 'sonner';
import { QUERY_KEY } from '@/types/query-key';
import { Button } from '@/components/ui/button';

const CreateUserDialog = () => {
  const queryClient = useQueryClient();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const form = useForm<ICreateUser>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      username: '',
      password: '',
      role: USER_ROLE.USER,
    },
    resolver: zodResolver(createUserSchema),
  });

  const {
    handleSubmit,
    setError,
    formState: {
      errors: { root },
    },
  } = form;

  const createUserMutation = useMutation({
    mutationFn: createUserApi,
    onSuccess() {
      toast.success("L'utilisateur a été crée avec succès");
      setIsOpen(false);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.USERS],
      });
      form.reset();
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

  const handleFormSubmit = (formData: ICreateUser) => {
    createUserMutation.mutate(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="ml-auto">
        <Button>Ajouter un utilisateur</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Créer un nouvel utilisateur</DialogTitle>
        <DialogDescription>
          L'utilisateur recevra un email de confirmation pour activer
          son compte
        </DialogDescription>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-y-3"
        >
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Nom d'utilisateur</FieldLabel>
                <Input {...field} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Email</FieldLabel>
                <Input {...field} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="role"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Rôle</FieldLabel>
                <SelectUserRole
                  onChange={field.onChange}
                  value={field.value}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Mot de passe</FieldLabel>
                <Input
                  {...field}
                  type={showPassword ? 'text' : 'password'}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Confirmez le mot de passe</FieldLabel>
                <Input
                  {...field}
                  type={showPassword ? 'text' : 'password'}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <ShowFormPassword
            showPassword={showPassword}
            onClick={() => setShowPassword((prev) => !prev)}
            text="Afficher les mots de passe"
          />

          <FormErrorMessage message={root?.message} />
          <SubmitButton
            className="submit-button"
            isDisabled={createUserMutation.isPending}
            text="Créer l'utilisateur"
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserDialog;
