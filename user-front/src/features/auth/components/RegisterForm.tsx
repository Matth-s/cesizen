import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { registerSchema, type registerType } from "../schemas/register-schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import FormErrorMessage from "@/components/FormError";
import SubmitButton from "@/components/SubmitButton";
import AuthFormFooter from "./AuthFormFooter";
import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../api/register-api";
import FormSuccess from "@/components/FormSuccess";

const RegisterForm = () => {
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined,
  );
  const form = useForm<registerType>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const {
    setError,
    handleSubmit,
    formState: {
      isSubmitting,
      errors: { root },
    },
  } = form;

  const registerMutation = useMutation({
    mutationFn: registerApi,

    onSuccess: (data) => {
      setSuccessMessage(data.message);
      console.log("p");
    },

    onError: (err) => {
      let errorMessage = "Une erreur est survenue";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError("root", {
        message: errorMessage,
      });
    },
  });

  const handleFormSubmit = (data: registerType) => {
    setSuccessMessage(undefined);
    registerMutation.mutate(data);
  };

  return (
    <Card className="w-4/5">
      <CardHeader>
        <CardTitle>Créer un compte</CardTitle>
        <CardDescription>
          Rejoignez CESIZen et prenez soin de vous
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-y-2"
        >
          <FieldGroup>
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

            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Confirmez le mot de passe</FieldLabel>
                  <Input {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <FormSuccess message={successMessage} />

          <FormErrorMessage message={root?.message} />

          <SubmitButton
            className="h-10 w-full rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 text-base font-semibold text-white shadow-lg hover:from-teal-600 hover:to-blue-600"
            isDisabled={isSubmitting}
            textButton="Connexion"
          />
        </form>
      </CardContent>

      <CardFooter>
        <AuthFormFooter
          answer="Vous avez déjà un compte ?"
          pathTo="connexion"
          linkName="Se connecter"
        />
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
