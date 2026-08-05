"use client";

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import { updateCategoryAction } from "@/actions/category/update-category-action";
import {
  categorySchema,
  type CategorySchema,
} from "@/schemas/category/category-schema";

import { FieldError } from "@/components/common/field-error";
import { SubmitButton } from "@/components/common/submit-button";

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

interface EditCategoryDialogProps {
  children: React.ReactNode;
  category: {
    id: string;
    name: string;
  };
}

export function EditCategoryDialog({
  children,
  category,
}: EditCategoryDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category.name,
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: category.name,
      });
    }
  }, [open, category, form]);

  async function handleSubmit(data: CategorySchema) {
    const formData = new FormData();

    formData.append("id", category.id);
    formData.append("name", data.name);

    const response = await updateCategoryAction(formData);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    toast.success(response.message);

    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Categoria</DialogTitle>

          <DialogDescription>Atualize o nome da categoria.</DialogDescription>
        </DialogHeader>

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>

              <Input id="name" {...form.register("name")} />

              <FieldError message={form.formState.errors.name?.message} />
            </div>

            <SubmitButton loadingText="Salvando...">
              Salvar alterações
            </SubmitButton>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
