"use client";

import { useState } from "react";

import { toast } from "sonner";

import { deleteCategoryAction } from "@/actions/category/delete-category-action";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteCategoryDialogProps {
  children: React.ReactNode;
  category: {
    id: string;
  };
}

export function DeleteCategoryDialog({
  children,
  category,
}: DeleteCategoryDialogProps) {
  const [open, setOpen] = useState(false);

  async function handleDelete() {
    const formData = new FormData();

    formData.append("id", category.id);

    const response = await deleteCategoryAction(formData);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    toast.success(response.message);

    setOpen(false);
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir categoria</AlertDialogTitle>

          <AlertDialogDescription>
            Deseja realmente excluir esta categoria?
            <br />
            <br />
            Esta ação não poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <AlertDialogAction onClick={handleDelete}>Excluir</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
