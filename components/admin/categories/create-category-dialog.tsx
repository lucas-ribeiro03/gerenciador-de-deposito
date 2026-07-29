"use client";

import { createCategoryAction } from "@/actions/category/create-category-action";
import { FieldError } from "@/components/common/field-error";
import { SubmitButton } from "@/components/common/submit-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  type CategorySchema,
  categorySchema,
} from "@/schemas/category/category-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function CreateCategoryDialog() {
  const [open, setOpen] = useState(false);

  const form = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    mode: "onChange",
  });

  async function handleCreate(data: CategorySchema) {
    const formData = new FormData();

    formData.append("name", data.name);

    const response = await createCategoryAction(formData);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    toast.success(response.message);

    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={"cursor-pointer"}>
        <div className="flex items-center gap-2">
          <Plus className="size-4" />
          Nova Categoria
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Categoria</DialogTitle>

          <DialogDescription>Informe o nome da categoria.</DialogDescription>
        </DialogHeader>

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreate)}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label>Nome</Label>

              <Input
                placeholder="Ex.: Refrigerantes"
                {...form.register("name")}
              />

              <FieldError message={form.formState.errors.name?.message} />
            </div>

            <SubmitButton loadingText="Criando...">
              Criar categoria
            </SubmitButton>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
