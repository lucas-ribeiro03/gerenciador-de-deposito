"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { registerAction } from "@/actions/auth/register-action";
import { FieldError } from "@/components/common/field-error";
import { SubmitButton } from "@/components/common/submit-button";
import { Logo } from "@/components/layout/logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-6">
          <Logo className="mx-auto rounded-lg" w={80} h={80} />

          <div className="space-y-2 text-center">
            <CardTitle className="text-3xl">Criar conta</CardTitle>

            <CardDescription>
              Cadastre-se para começar a utilizar o Point do Grell.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(handleRegister)}
              className="space-y-5"
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

              <SubmitButton loadingText="Criando conta...">
                Criar conta
              </SubmitButton>
            </form>
          </FormProvider>
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-center text-sm text-muted-foreground">
            Já possui uma conta?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Entrar
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
