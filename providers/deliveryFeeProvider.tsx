"use client";

import type { DeliveryType } from "@prisma/client";
import { createContext, useContext, useState, type ReactNode } from "react";

type DeliveryContextValue = {
  deliveryFee: number | null;
  setDeliveryFee: (deliveryFee: number | null) => void;

  deliveryMethod: DeliveryType;
  setDeliveryMethod: (method: DeliveryType) => void;
};

const DeliveryContext = createContext<DeliveryContextValue | null>(null);

type DeliveryProviderProps = {
  children: ReactNode;
};

export function DeliveryProvider({ children }: DeliveryProviderProps) {
  const [deliveryFee, setDeliveryFee] = useState<number | null>(null);
  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryType>("DELIVERY");

  return (
    <DeliveryContext.Provider
      value={{
        deliveryFee,
        setDeliveryFee,
        deliveryMethod,
        setDeliveryMethod,
      }}
    >
      {children}
    </DeliveryContext.Provider>
  );
}

export function useDelivery() {
  const context = useContext(DeliveryContext);

  if (!context) {
    throw new Error("useDelivery deve ser usado dentro de DeliveryProvider.");
  }

  return context;
}
