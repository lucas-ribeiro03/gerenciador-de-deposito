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
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const { update } = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

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

    await update();

    toast.success(response.message);

    router.push(callbackUrl);
  }
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <Card className="w-full max-w-md border-primary/10 bg-card shadow-2xl">
        <CardHeader className="space-y-6">
          <Logo
            className="mx-auto rounded-xl ring-2 ring-primary/20"
            h={80}
            w={80}
          />

          <div className="space-y-2 text-center">
            <CardTitle className="text-3xl font-bold text-foreground">
              Bem-vindo
            </CardTitle>

            <CardDescription className="text-muted-foreground">
              Entre para acessar sua conta.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(handleLogin)}
              className="space-y-5"
            >
              <div className="space-y-2">
                <Label htmlFor="email" className="font-medium text-foreground">
                  E-mail
                </Label>

                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  {...form.register("email")}
                />

                <FieldError message={form.formState.errors.email?.message} />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="font-medium text-foreground"
                >
                  Senha
                </Label>

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

        <CardFooter className="justify-center border-t border-border/50 pt-6">
          <p className="text-center text-sm text-muted-foreground">
            Não possui uma conta?{" "}
            <Link
              href="/register"
              className="font-semibold text-primary transition-colors hover:text-accent hover:underline"
            >
              Cadastre-se
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
