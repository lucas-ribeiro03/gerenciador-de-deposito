"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { loginAction } from "@/actions/auth/login-action";
import { Logo } from "@/components/layout/logo";
import { FieldError } from "@/components/common/field-error";
import { SubmitButton } from "@/components/common/submit-button";
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
import { loginSchema, type LoginSchema } from "@/schemas/auth/login-schema";

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
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-6">
          <Logo className="mx-auto rounded-lg" h={80} w={80} />

          <div className="space-y-2 text-center">
            <CardTitle className="text-3xl">Bem-vindo</CardTitle>

            <CardDescription>Entre para acessar sua conta.</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(handleLogin)}
              className="space-y-5"
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
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-center text-sm text-muted-foreground">
            Não possui uma conta?{" "}
            <Link
              href="/register"
              className="font-medium text-primary hover:underline"
            >
              Cadastre-se
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
