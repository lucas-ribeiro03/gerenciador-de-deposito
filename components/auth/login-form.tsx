"use client";

import { loginAction } from "@/actions/auth/login-action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { loginSchema, type LoginSchema } from "@/schemas/auth/login-schema";
import { SubmitButton } from "../common/submit-button";
import { FieldError } from "../common/field-error";

export function LoginForm() {
  const router = useRouter();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  async function handleLogin(data: LoginSchema) {
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("password", data.password);

    const response = await loginAction(formData);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    toast.success(response.message);

    router.push("/");
    router.refresh();
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleLogin)}
        className="flex flex-col gap-4"
      >
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>

          <Input
            id="email"
            type="email"
            placeholder="Digite seu e-mail"
            {...form.register("email")}
          />

          <FieldError message={form.formState.errors.email?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>

          <Input
            id="password"
            type="password"
            placeholder="Digite sua senha"
            {...form.register("password")}
          />

          <FieldError message={form.formState.errors.password?.message} />
        </div>

        <SubmitButton loadingText="Entrando...">Entrar</SubmitButton>
      </form>
    </FormProvider>
  );
}
