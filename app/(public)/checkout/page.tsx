import { CheckoutPage } from "@/components/checkout/checkout-page";
import { auth } from "@/lib/auth";
import { getUserAddresses } from "@/services/address/get-user-addresses";
import { redirect } from "next/navigation";

export default async function Checkout() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/checkout");
  }

  console.log(session.user.id, "usuario");

  const addresses = await getUserAddresses(session.user.id);
  return <CheckoutPage addresses={addresses} />;
}
