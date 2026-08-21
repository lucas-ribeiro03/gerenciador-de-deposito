"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { PaymentMethod } from "@prisma/client";

type PaymentMethodSelectorProps = {
  value: PaymentMethod | null;
  onChange: (value: PaymentMethod) => void;
};

export function PaymentMethodSelector({
  value,
  onChange,
}: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-base font-semibold">Forma de pagamento</h2>

        <p className="text-sm text-muted-foreground">
          O pagamento será realizado pessoalmente.
        </p>
      </div>

      <RadioGroup
        value={value ?? ""}
        onValueChange={(value) => onChange(value as PaymentMethod)}
        className="space-y-2"
      >
        <div className="flex items-center gap-3 rounded-lg border p-3">
          <RadioGroupItem value="MONEY" id="payment-cash" />

          <Label htmlFor="payment-cash" className="cursor-pointer">
            Dinheiro
          </Label>
        </div>

        <div className="flex items-center gap-3 rounded-lg border p-3">
          <RadioGroupItem value="CREDIT_CARD" id="payment-credit-card" />

          <Label htmlFor="payment-card" className="cursor-pointer">
            Cartão de crédito
          </Label>
        </div>
        <div className="flex items-center gap-3 rounded-lg border p-3">
          <RadioGroupItem value="DEBIT_CARD" id="payment-debit-card" />

          <Label htmlFor="payment-card" className="cursor-pointer">
            Cartão
          </Label>
        </div>

        <div className="flex items-center gap-3 rounded-lg border p-3">
          <RadioGroupItem value="PIX" id="payment-pix" />

          <Label htmlFor="payment-pix" className="cursor-pointer">
            Pix
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
