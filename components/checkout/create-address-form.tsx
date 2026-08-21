"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Loader2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  createAddressSchema,
  type CreateAddressSchema,
} from "@/schemas/address/create-address-schema";
import {
  createAddressAction,
  type CreatedAddress,
} from "@/actions/address/create-address-action";

type ViaCepResponse = {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
};

type CreateAddressFormProps = {
  onSuccess: (address: CreatedAddress) => void;
};

export function CreateAddressForm({ onSuccess }: CreateAddressFormProps) {
  const [loadingCep, setLoadingCep] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const form = useForm<CreateAddressSchema>({
    resolver: zodResolver(createAddressSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      street: "",
      number: "",
      district: "",
      zipCode: "",
      complement: "",
    },
  });

  async function handleSearchCep() {
    const zipCode = form.getValues("zipCode") ?? "";

    const cleanedZipCode = zipCode.replace(/\D/g, "");

    if (cleanedZipCode.length !== 8) {
      toast.error("Informe um CEP válido.");
      return;
    }

    setLoadingCep(true);

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cleanedZipCode}/json/`,
      );

      if (!response.ok) {
        throw new Error("Erro ao consultar o CEP.");
      }

      const data: ViaCepResponse = await response.json();

      if (data.erro) {
        toast.error("CEP não encontrado.");
        return;
      }

      form.setValue("zipCode", data.cep, {
        shouldValidate: true,
      });

      form.setValue("street", data.logradouro, {
        shouldValidate: true,
      });

      form.setValue("district", data.bairro, {
        shouldValidate: true,
      });

      toast.success("Endereço encontrado.");
    } catch {
      toast.error(
        "Não foi possível consultar o CEP. Preencha o endereço manualmente.",
      );
    } finally {
      setLoadingCep(false);
    }
  }

  async function handleSubmit(data: CreateAddressSchema) {
    setLoadingSubmit(true);

    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("street", data.street);
      formData.append("number", data.number);
      formData.append("district", data.district);
      formData.append("zipCode", data.zipCode ?? "");
      formData.append("complement", data.complement ?? "");

      const response = await createAddressAction(formData);

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      if (!response.address) {
        toast.error(
          "O endereço foi criado, mas não foi possível atualizar a lista.",
        );
        return;
      }

      toast.success(response.message);

      onSuccess(response.address);
    } finally {
      setLoadingSubmit(false);
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>

          <Input
            id="title"
            placeholder="Ex.: Casa, Trabalho..."
            {...form.register("title")}
          />

          {form.formState.errors.title && (
            <p className="text-sm text-destructive">
              {form.formState.errors.title.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="zipCode">CEP</Label>

          <div className="flex gap-2">
            <Input
              id="zipCode"
              placeholder="00000-000"
              inputMode="numeric"
              maxLength={9}
              {...form.register("zipCode")}
            />

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleSearchCep}
              disabled={loadingCep}
              title="Buscar CEP"
            >
              {loadingCep ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Search className="size-4" />
              )}

              <span className="sr-only">Buscar CEP</span>
            </Button>
          </div>

          {form.formState.errors.zipCode && (
            <p className="text-sm text-destructive">
              {form.formState.errors.zipCode.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="street">Rua</Label>

          <Input
            id="street"
            placeholder="Nome da rua"
            {...form.register("street")}
          />

          {form.formState.errors.street && (
            <p className="text-sm text-destructive">
              {form.formState.errors.street.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_140px]">
          <div className="space-y-2">
            <Label htmlFor="district">Bairro</Label>

            <Input
              id="district"
              placeholder="Nome do bairro"
              {...form.register("district")}
            />

            {form.formState.errors.district && (
              <p className="text-sm text-destructive">
                {form.formState.errors.district.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="number">Número</Label>

            <Input id="number" placeholder="123" {...form.register("number")} />

            {form.formState.errors.number && (
              <p className="text-sm text-destructive">
                {form.formState.errors.number.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="complement">Complemento</Label>

          <Input
            id="complement"
            placeholder="Apartamento, bloco, casa..."
            {...form.register("complement")}
          />

          {form.formState.errors.complement && (
            <p className="text-sm text-destructive">
              {form.formState.errors.complement.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={!form.formState.isValid || loadingSubmit}
        >
          {loadingSubmit && <Loader2 className="size-4 animate-spin" />}

          {loadingSubmit ? "Salvando..." : "Salvar endereço"}
        </Button>
      </form>
    </FormProvider>
  );
}
