import { useMutation } from '@tanstack/react-query';
import { loginApi } from '../api/login-api';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type loginType } from '../schemas/login-schema';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/SubmitButton';
import FormErrorMessage from '@/components/FormError';
import AuthFormFooter from './AuthFormFooter';

const LoginForm = () => {
  const form = useForm<loginType>({
    defaultValues: {
      email: '',
      password: '',
    },

    resolver: zodResolver(loginSchema),
  });

  const {
    handleSubmit,
    setError,
    formState: {
      isSubmitting,
      errors: { root },
    },
  } = form;

  const loginMutation = useMutation({
    mutationFn: loginApi,

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

  const handleFormSubmit = (credentials: loginType) => {
    loginMutation.mutate(credentials);
  };

  return (
    <Card className="w-4/5">
      <CardHeader>
        <CardTitle>Connexion</CardTitle>
        <CardDescription>
          Connectez-vous pour continuer
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-y-2"
        >
          <FieldGroup>
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
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Password</FieldLabel>
                  <Input {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <FormErrorMessage message={root?.message} />

          <SubmitButton
            className="w-full h-10 text-base font-semibold bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white rounded-xl shadow-lg"
            isDisabled={isSubmitting}
            textButton="Connexion"
          />
        </form>
      </CardContent>

      <CardFooter>
        <AuthFormFooter
          answer="Pas encore de compte ?"
          pathTo="inscription"
          linkName="Créer un compte"
        />
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
