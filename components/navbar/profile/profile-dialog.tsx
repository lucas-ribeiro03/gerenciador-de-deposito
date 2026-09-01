"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { updateProfileAction } from "@/actions/profile/update-profile-action";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type ProfileDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    name: string;
    email: string;
    phone: string;
  };
};

type ProfileFormData = {
  name: string;
  phone: string;
};

export function ProfileDialog({
  open,
  onOpenChange,
  user,
}: ProfileDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { isDirty, isSubmitting },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user.name,
      phone: user.phone,
    },
  });

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [, startTransition] = useTransition();
  const { update } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (open) {
      reset({
        name: user.name,
        phone: user.phone,
      });
    }
  }, [open, user.name, user.phone, reset]);

  function handleCancel() {
    reset({
      name: user.name,
      phone: user.phone,
    });

    onOpenChange(false);
  }

  function onSubmit() {
    setConfirmOpen(true);
  }

  function handleConfirmUpdate() {
    const data = getValues();
    console.log(data);
    startTransition(async () => {
      const result = await updateProfileAction(data);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      await update({
        name: data.name,
        phone: data.phone,
      });
      setConfirmOpen(false);
      onOpenChange(false);
      router.refresh();
    });
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Meu perfil</DialogTitle>

            <DialogDescription>Atualize seus dados pessoais.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="profile-email">E-mail</Label>

              <Input id="profile-email" value={user.email} readOnly disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile-name">Nome</Label>

              <Input id="profile-name" {...register("name")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile-phone">Telefone</Label>

              <Input id="profile-phone" {...register("phone")} />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>

              <Button type="submit" disabled={!isDirty || isSubmitting}>
                {isSubmitting ? "Salvando..." : "Salvar alterações"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Salvar alterações?</AlertDialogTitle>

            <AlertDialogDescription>
              Deseja realmente salvar as alterações feitas no seu perfil?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>

            <AlertDialogAction onClick={handleConfirmUpdate}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
