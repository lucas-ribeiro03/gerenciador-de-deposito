"use client";

import { registerAction } from "@/actions/auth/register-action";
import { FieldError } from "@/components/common/field-error";
import { SubmitButton } from "@/components/common/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  registerSchema,
  type RegisterSchema,
} from "@/schemas/auth/register-schema";

export function RegisterForm() {
  const router = useRouter();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  async function handleRegister(data: RegisterSchema) {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);

    const response = await registerAction(formData);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    toast.success(response.message);

    router.push("/login");
    router.refresh();
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleRegister)}
        className="flex flex-col gap-4"
      >
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>

          <Input
            id="name"
            placeholder="Digite seu nome"
            {...form.register("name")}
          />

          <FieldError message={form.formState.errors.name?.message} />
        </div>

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
          <Label htmlFor="phone">Telefone</Label>

          <Input
            id="phone"
            placeholder="(21) 99999-9999"
            {...form.register("phone")}
          />

          <FieldError message={form.formState.errors.phone?.message} />
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

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmar senha</Label>

          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirme sua senha"
            {...form.register("confirmPassword")}
          />

          <FieldError
            message={form.formState.errors.confirmPassword?.message}
          />
        </div>

        <SubmitButton loadingText="Criando conta...">Criar conta</SubmitButton>
      </form>
    </FormProvider>
  );
}
