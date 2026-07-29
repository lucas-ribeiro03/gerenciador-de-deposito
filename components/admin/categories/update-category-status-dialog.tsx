"use client";

import { useState } from "react";

import { CategoryStatus } from "@prisma/client";

import { updateCategoryStatusAction } from "@/actions/category/update-category-status-action";

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
import toast from "react-hot-toast";

interface UpdateCategoryStatusDialogProps {
  children: React.ReactNode;
  category: {
    id: string;
    status: CategoryStatus;
  };
}

export function UpdateCategoryStatusDialog({
  children,
  category,
}: UpdateCategoryStatusDialogProps) {
  const [open, setOpen] = useState(false);

  async function handleConfirm() {
    const formData = new FormData();

    formData.append("id", category.id);

    const response = await updateCategoryStatusAction(formData);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    toast.success(response.message);

    setOpen(false);
  }

  const isActive = category.status === CategoryStatus.ACTIVE;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isActive ? "Desativar categoria" : "Ativar categoria"}
          </AlertDialogTitle>

          <AlertDialogDescription>
            {isActive
              ? "Deseja realmente desativar esta categoria?"
              : "Deseja ativar novamente esta categoria?"}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <AlertDialogAction onClick={handleConfirm}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
