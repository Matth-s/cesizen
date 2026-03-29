import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  resetPasswordSchema,
  type resetPasswordType,
} from "../schemas/reset-password-schema";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordApi } from "../api/reset-password-api";
import {
  Card,
  CardContent,
  CardDescription,
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
import SubmitButton from "@/components/SubmitButton";
import FormSuccess from "@/components/FormSuccess";
import FormErrorMessage from "@/components/FormError";
import ShowFormPassword from "./ShowFormPassword";

type ResetPasswordFormProps = {
  token: string;
};

const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined,
  );
  const form = useForm<resetPasswordType>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  const {
    setError,
    handleSubmit,
    formState: {
      errors: { root },
    },
  } = form;

  const resetPasswordMutation = useMutation({
    mutationFn: resetPasswordApi,

    onSuccess() {
      setSuccessMessage("Le mot de passe a été modifié");
    },

    onError(err) {
      let errorMessage = "Une erreur est survenue";

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError("root", {
        message: errorMessage,
      });
    },
  });

  const handleFormSubmit = (formData: resetPasswordType) => {
    resetPasswordMutation.mutate({ formData, token });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Modifier votre mot de passe</CardTitle>
        <CardDescription>Réinitialisation du mot de passe</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="form">
          <FieldGroup>
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Mot de passe</FieldLabel>
                  <Input {...field} type={showPassword ? "text" : "password"} />
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

                  <Input {...field} type={showPassword ? "text" : "password"} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <ShowFormPassword
            showPassword={showPassword}
            toggleShowPassword={() => setShowPassword((prev) => !prev)}
            label="Afficher les mots de passe"
          />

          <FormSuccess message={successMessage} />
          <FormErrorMessage message={root?.message} />

          <SubmitButton
            className="submit-button"
            isDisabled={resetPasswordMutation.isPending}
            textButton="Modifier le mot de passe"
          />
        </form>
      </CardContent>
    </Card>
  );
};

export default ResetPasswordForm;
