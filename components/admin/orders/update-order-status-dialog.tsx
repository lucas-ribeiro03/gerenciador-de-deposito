"use client";

import { AlertTriangle } from "lucide-react";

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

import type { OrderStatus } from "@prisma/client";

type UpdateOrderStatusDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  status: OrderStatus | null;
  onConfirm: () => void;
  loading?: boolean;
};

const statusLabels: Record<OrderStatus, string> = {
  PENDING: "Pendente",
  CONFIRMED: "Confirmado",
  OUT_FOR_DELIVERY: "Saiu para entrega",
  DELIVERED: "Entregue",
  CANCELLED: "Cancelado",
};

export function UpdateOrderStatusDialog({
  open,
  onOpenChange,
  status,
  onConfirm,
  loading = false,
}: UpdateOrderStatusDialogProps) {
  if (!status) {
    return null;
  }

  const needsConfirmation = status === "CANCELLED";

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted">
              <AlertTriangle className="size-5" />
            </div>

            <AlertDialogTitle>Confirmar alteração de status</AlertDialogTitle>
          </div>

          <AlertDialogDescription className="pt-2">
            {needsConfirmation ? (
              <>
                Tem certeza que deseja <strong>cancelar este pedido</strong>?
                Essa ação não poderá ser desfeita.
              </>
            ) : (
              <>
                Deseja realmente marcar este pedido como{" "}
                <strong>{statusLabels[status].toLowerCase()}</strong>?
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Voltar</AlertDialogCancel>

          <AlertDialogAction onClick={onConfirm} disabled={loading}>
            {loading ? "Atualizando..." : "Confirmar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
