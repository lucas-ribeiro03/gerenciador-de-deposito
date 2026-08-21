"use client";

import { Truck, Store } from "lucide-react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import type { DeliveryType } from "@prisma/client";

type CheckoutDeliveryMethodProps = {
  value: DeliveryType;
  onChange: (value: DeliveryType) => void;
};

export function CheckoutDeliveryMethod({
  value,
  onChange,
}: CheckoutDeliveryMethodProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Como deseja receber?
        </h2>

        <p className="text-sm text-muted-foreground">
          Escolha como deseja receber seu pedido.
        </p>
      </div>

      <RadioGroup
        value={value}
        onValueChange={(value) => onChange(value as DeliveryType)}
        className="grid gap-3 sm:grid-cols-2"
      >
        <Label
          htmlFor="delivery"
          className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-colors ${
            value === "DELIVERY"
              ? "border-primary bg-primary/5"
              : "border-border bg-card hover:bg-muted/50"
          }`}
        >
          <RadioGroupItem id="delivery" value="DELIVERY" className="mt-1" />

          <div className="flex gap-3">
            <Truck className="mt-0.5 size-5 shrink-0 text-muted-foreground" />

            <div className="flex flex-col gap-2">
              <p className="font-semibold text-foreground">Entrega</p>

              <p className="text-sm font-normal text-muted-foreground">
                Receba seu pedido no endereço escolhido.
              </p>
            </div>
          </div>
        </Label>

        <Label
          htmlFor="pickup"
          className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-colors ${
            value === "PICKUP"
              ? "border-primary bg-primary/5"
              : "border-border bg-card hover:bg-muted/50"
          }`}
        >
          <RadioGroupItem id="pickup" value="PICKUP" className="mt-1" />

          <div className="flex gap-3">
            <Store className="mt-0.5 size-5 shrink-0 text-muted-foreground" />

            <div className="space-y-1">
              <p className="font-semibold text-foreground">Retirar na loja</p>

              <p className="text-sm font-normal text-muted-foreground">
                Retire seu pedido diretamente na loja.
              </p>
            </div>
          </div>
        </Label>
      </RadioGroup>
    </section>
  );
}
