import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../api/login-api";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type loginType } from "../schemas/login-schema";
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
import { useState } from "react";
import { setUser } from "@/store/slices/user-slice";
import { NavLink, useNavigate } from "react-router";
import { useAppDispatch } from "@/store/hooks";

import SubmitButton from "@/components/SubmitButton";
import FormErrorMessage from "@/components/FormError";
import AuthFormFooter from "./AuthFormFooter";
import FormSuccess from "@/components/FormSuccess";
import ShowFormPassword from "./ShowFormPassword";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined,
  );
  const form = useForm<loginType>({
    defaultValues: {
      email: "",
      password: "",
    },

    resolver: zodResolver(loginSchema),
  });

  const {
    handleSubmit,
    setError,
    formState: {
      errors: { root },
    },
  } = form;

  const loginMutation = useMutation({
    mutationFn: loginApi,

    onSuccess(data) {
      const { message, user } = data;

      setSuccessMessage(message);

      if (!user) return;

      dispatch(setUser(user));
      navigate("/");
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

  const handleFormSubmit = (credentials: loginType) => {
    setSuccessMessage(undefined);
    loginMutation.mutate(credentials);
  };

  return (
    <Card className="w-4/5">
      <CardHeader>
        <CardTitle>Connexion</CardTitle>
        <CardDescription>Connectez-vous pour continuer</CardDescription>
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

            <ShowFormPassword
              showPassword={showPassword}
              toggleShowPassword={() => setShowPassword((prev) => !prev)}
              label="Afficher le mot de passe"
            />

            <NavLink
              to={"/authentification/mot-de-passe-oublie"}
              className="text-end text-base font-medium text-teal-600 underline hover:text-teal-700"
            >
              Mot de passe oublié ?
            </NavLink>
          </FieldGroup>

          <FormSuccess message={successMessage} />
          <FormErrorMessage message={root?.message} />

          <SubmitButton
            className="submit-button"
            isDisabled={loginMutation.isPending}
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
