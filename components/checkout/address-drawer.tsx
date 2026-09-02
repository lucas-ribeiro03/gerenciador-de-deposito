"use client";

import { useState, useTransition } from "react";
import { Check, MapPin, Plus, TrashIcon } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

import type { CheckoutAddress } from "@/types/address";
import type { CreatedAddress } from "@/actions/address/create-address-action";

import { CreateAddressDialog } from "./create-address-dialog";
import { deleteAddressAction } from "@/actions/address/delete-address-action";
import toast from "react-hot-toast";

type AddressDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  addresses: CheckoutAddress[];
  selectedAddressId: string | null;
  onSelectAddress: (address: CheckoutAddress) => void;
  onAddressCreated: (address: CreatedAddress) => void;
  onDeleteAddress: (id: string) => void;
};

export function AddressDrawer({
  open,
  onOpenChange,
  addresses,
  selectedAddressId,
  onSelectAddress,
  onAddressCreated,
  onDeleteAddress,
}: AddressDrawerProps) {
  const [createAddressOpen, setCreateAddressOpen] = useState(false);
  const [, startTransition] = useTransition();

  function handleAddressCreated(address: CreatedAddress) {
    onAddressCreated(address);
  }

  function handleDeleteAddress(
    id: string,
    e: React.MouseEvent<HTMLDivElement>,
  ) {
    e.stopPropagation();
    startTransition(async () => {
      const result = await deleteAddressAction(id);
      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
    });

    onDeleteAddress(id);
  }

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Seus endereços</SheetTitle>

            <SheetDescription>
              Selecione o endereço onde deseja receber seu pedido.
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-1 flex-col gap-3 overflow-y-auto py-4">
            {addresses.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                  <MapPin className="size-5 text-muted-foreground" />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    Nenhum endereço cadastrado
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Adicione um endereço para continuar com seu pedido.
                  </p>
                </div>
              </div>
            ) : (
              addresses.map((address) => {
                const isSelected = address.id === selectedAddressId;

                return (
                  <button
                    key={address.id}
                    type="button"
                    onClick={() => {
                      onSelectAddress(address);
                      onOpenChange(false);
                    }}
                    className={`w-full rounded-xl border p-4 text-left transition-colors ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 space-y-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="size-4 shrink-0 text-muted-foreground" />

                          <span className="font-medium">
                            {address.title || "Endereço"}
                          </span>
                        </div>

                        <div className="space-y-0.5 pl-6 text-sm text-muted-foreground">
                          <p>
                            {address.street}, {address.number}
                          </p>

                          <p>
                            {address.district} - CEP {address.zipCode}
                          </p>

                          {address.complement && <p>{address.complement}</p>}
                        </div>
                      </div>

                      {isSelected && (
                        <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Check className="size-3" />
                        </div>
                      )}

                      <div
                        className="size-8 text-destructive hover:text-destructive"
                        onClick={(e) => {
                          handleDeleteAddress(address.id, e);
                        }}
                      >
                        <TrashIcon className="size-4" />
                        <span className="sr-only">Excluir endereço</span>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          <div className="border-t border-border pt-4">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setCreateAddressOpen(true)}
            >
              <Plus className="size-4" />
              Adicionar novo endereço
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <CreateAddressDialog
        open={createAddressOpen}
        onOpenChange={setCreateAddressOpen}
        onSuccess={handleAddressCreated}
      />
    </>
  );
}
