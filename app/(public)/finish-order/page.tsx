"use server";

import { FinishOrderSummary } from "@/components/finish-order/finish-order-summary";
import { checkIfDeliveryFeeAlreadyExists } from "@/lib/check-if-delivery-fee-already-exists";

export default async function FinishOrderPage() {
  const deliveryFee = await checkIfDeliveryFeeAlreadyExists();
  return (
    <main className="container mx-auto px-4 py-6">
      <FinishOrderSummary deliveryFeeAlreadyExists={deliveryFee} />
    </main>
  );
}
