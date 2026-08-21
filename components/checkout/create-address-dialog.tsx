"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { CreateAddressForm } from "./create-address-form";

import type { CreatedAddress } from "@/actions/address/create-address-action";

type CreateAddressDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (address: CreatedAddress) => void;
};

export function CreateAddressDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateAddressDialogProps) {
  function handleSuccess(address: CreatedAddress) {
    onSuccess(address);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Adicionar endereço</DialogTitle>

          <DialogDescription>
            Cadastre um novo endereço para receber seus pedidos.
          </DialogDescription>
        </DialogHeader>

        <CreateAddressForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}
