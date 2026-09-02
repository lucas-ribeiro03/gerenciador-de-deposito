"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { calculateDeliveryFeeAction } from "@/actions/delivery/calculate-delivery-fee-action";

import { AddressDrawer } from "./address-drawer";

import type { CheckoutAddress as Address } from "@/types/address";
import toast from "react-hot-toast";
import { formatCurrency } from "@/lib/formatters/currency";
import { useDelivery } from "@/providers/deliveryFeeProvider";

type CheckoutAddressProps = {
  addresses: Address[];
};

export function CheckoutAddress({
  addresses: initialAddresses,
}: CheckoutAddressProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { setDeliveryFee, deliveryFee } = useDelivery();

  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(
    initialAddresses[0] ?? null,
  );

  const [isCalculatingFee, setIsCalculatingFee] = useState(false);

  function handleDeleteAddress(id: string) {
    setAddresses((currentAddresses) => {
      return currentAddresses.filter((address: Address) => address.id !== id);
    });
  }

  function handleSelectAddress(address: Address) {
    setSelectedAddress(address);

    // O frete precisa ser recalculado
    // para o novo endereço.
    setDeliveryFee(null);
  }

  function handleAddressCreated(address: Address) {
    setAddresses((currentAddresses) => [...currentAddresses, address]);

    setSelectedAddress(address);

    // Novo endereço = novo cálculo de frete.
    setDeliveryFee(null);

    setDrawerOpen(false);
  }

  async function handleCalculateDeliveryFee() {
    if (!selectedAddress) {
      return;
    }

    setIsCalculatingFee(true);

    const formData = new FormData();

    formData.append("street", selectedAddress.street);
    formData.append("number", selectedAddress.number);
    formData.append("district", selectedAddress.district);
    formData.append("zipCode", selectedAddress.zipCode || "");
    formData.append("addressId", selectedAddress.id);

    if (selectedAddress.complement) {
      formData.append("complement", selectedAddress.complement);
    }

    try {
      const result = await calculateDeliveryFeeAction(formData);

      if (!result.success && !result.deliveryFee && result.message) {
        setDeliveryFee(null);
        toast.error(result.message);
        return;
      }

      setDeliveryFee(result.deliveryFee || 0);
    } finally {
      setIsCalculatingFee(false);
    }
  }

  return (
    <>
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Endereço para entrega
          </h2>

          <p className="text-sm text-muted-foreground">
            Escolha onde deseja receber seu pedido.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          {selectedAddress ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">
                      {selectedAddress.title || "Endereço"}
                    </span>
                  </div>

                  <div className="space-y-0.5 text-sm text-muted-foreground">
                    <p>
                      {selectedAddress.street}, {selectedAddress.number}
                    </p>

                    <p>
                      {selectedAddress.district} - CEP {selectedAddress.zipCode}
                    </p>

                    {selectedAddress.complement && (
                      <p>{selectedAddress.complement}</p>
                    )}
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="shrink-0"
                  onClick={() => setDrawerOpen(true)}
                >
                  <Plus className="size-4" />

                  <span className="sr-only">Alterar endereço</span>
                </Button>
              </div>

              <div className="border-t pt-4">
                <Button
                  type="button"
                  className="w-full"
                  onClick={handleCalculateDeliveryFee}
                  disabled={isCalculatingFee}
                >
                  {isCalculatingFee ? "Calculando frete..." : "Calcular frete"}
                </Button>
              </div>

              {deliveryFee !== null && (
                <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                  <span className="text-sm font-medium">Frete</span>

                  <span className="font-semibold">
                    {formatCurrency(deliveryFee)}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 py-6 text-center">
              <p className="text-sm text-muted-foreground">
                Você ainda não possui um endereço selecionado.
              </p>

              <Button
                type="button"
                variant="outline"
                onClick={() => setDrawerOpen(true)}
              >
                <Plus className="size-4" />
                Adicionar endereço para entrega
              </Button>
            </div>
          )}
        </div>
      </section>

      <AddressDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        addresses={addresses}
        selectedAddressId={selectedAddress?.id ?? null}
        onSelectAddress={handleSelectAddress}
        onAddressCreated={handleAddressCreated}
        onDeleteAddress={handleDeleteAddress}
      />
    </>
  );
}
