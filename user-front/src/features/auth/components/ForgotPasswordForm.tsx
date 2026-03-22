import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  forgotPasswordSchema,
  type forgotPasswordType,
} from "../schemas/forgot-password-schema";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
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
import { forgotPasswordApi } from "../api/forgot-password-api";
import FormErrorMessage from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";

const ForgotPasswordForm = () => {
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined,
  );

  const form = useForm<forgotPasswordType>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  const {
    setError,
    handleSubmit,
    formState: {
      errors: { root },
    },
  } = form;

  const resetPasswordMutation = useMutation({
    mutationFn: forgotPasswordApi,

    onSuccess(data) {
      setSuccessMessage(data.message);
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

  const handleFormSubmit = (formData: forgotPasswordType) => {
    setSuccessMessage(undefined);
    resetPasswordMutation.mutate(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mot de passe oublié ?</CardTitle>
        <CardDescription>
          Pas de souci ! Entrez votre adresse e-mail et nous vous enverrons un
          lien pour réinitialiser votre mot de passe.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="form">
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
          </FieldGroup>

          <FormSuccess message={successMessage} />
          <FormErrorMessage message={root?.message} />

          <SubmitButton
            className="submit-button"
            textButton="Envoyer le lien de réinitialisation"
            isDisabled={resetPasswordMutation.isPending}
          />
        </form>
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordForm;
