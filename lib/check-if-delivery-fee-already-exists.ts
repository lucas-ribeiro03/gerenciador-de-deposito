import { cookies } from "next/headers";

export const checkIfDeliveryFeeAlreadyExists = async () => {
  type PayloadType = {
    deliveryFee: number;
  };
  const cookieStore = await cookies();

  const deliveryCookie = cookieStore.get("delivery_fee_quote");
  if (deliveryCookie) {
    const [encodedPayload] = deliveryCookie.value.split(".");

    const payload: PayloadType = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf-8"),
    );

    return payload.deliveryFee;
  }

  return 0;
};
