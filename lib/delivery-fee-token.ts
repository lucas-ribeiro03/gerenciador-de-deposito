import crypto from "node:crypto";

type DeliveryFeeTokenPayload = {
  userId: string;
  addressId: string;
  deliveryFee: number;
  createdAt: number;
  expiresAt: number;
};

function getDeliveryFeeKey() {
  const key = process.env.DELIVERY_FEE_KEY;

  if (!key) {
    throw new Error("DELIVERY_FEE_KEY não está configurada.");
  }

  return key;
}

const DELIVERY_FEE_TOKEN_TTL = 10 * 60 * 1000;

export function createDeliveryFeeToken(
  payload: Omit<DeliveryFeeTokenPayload, "createdAt" | "expiresAt">,
) {
  const createdAt = Date.now();
  const expiresAt = createdAt + DELIVERY_FEE_TOKEN_TTL;

  const tokenPayload: DeliveryFeeTokenPayload = {
    ...payload,
    createdAt,
    expiresAt,
  };

  const data = JSON.stringify(tokenPayload);

  const signature = crypto
    .createHmac("sha256", getDeliveryFeeKey())
    .update(data)
    .digest("hex");

  const encodedData = Buffer.from(data).toString("base64url");

  return `${encodedData}.${signature}`;
}

export function verifyDeliveryFeeToken(
  token: string,
): DeliveryFeeTokenPayload | null {
  try {
    const [encodedData, signature] = token.split(".");

    if (!encodedData || !signature) {
      return null;
    }

    const data = Buffer.from(encodedData, "base64url").toString("utf-8");

    const expectedSignature = crypto
      .createHmac("sha256", getDeliveryFeeKey())
      .update(data)
      .digest("hex");

    const receivedSignature = Buffer.from(signature, "hex");

    const expectedSignatureBuffer = Buffer.from(expectedSignature, "hex");

    if (receivedSignature.length !== expectedSignatureBuffer.length) {
      return null;
    }

    if (!crypto.timingSafeEqual(receivedSignature, expectedSignatureBuffer)) {
      return null;
    }

    const payload = JSON.parse(data) as DeliveryFeeTokenPayload;

    if (
      !payload.userId ||
      !payload.addressId ||
      typeof payload.deliveryFee !== "number" ||
      typeof payload.createdAt !== "number" ||
      typeof payload.expiresAt !== "number"
    ) {
      return null;
    }

    if (Date.now() > payload.expiresAt) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
