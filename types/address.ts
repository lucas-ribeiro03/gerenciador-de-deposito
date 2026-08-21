export type CheckoutAddress = {
  id: string;
  title: string | null;
  street: string;
  number: string;
  district: string;
  zipCode: string | null;
  complement: string | null;
  lastUsedAt: string | null;
};
