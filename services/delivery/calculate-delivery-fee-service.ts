import { STORE_COORDINATES } from "@/lib/constants";
import { calculateDistance } from "@/lib/calculate-distance-with-coordinates";
import { geocodeAddress } from "../geolocation/geocoding-service";
import calculateDeliveryFee from "@/lib/calculate-delivery-fee";

type SetDeliveryFeeParams = {
  address: {
    street: string;
    number: string;
    district: string;
    zipCode: string | null;
  };
};

export async function setDeliveryFee({ address }: SetDeliveryFeeParams) {
  const customerCoordinates = await geocodeAddress(address);

  if (!customerCoordinates) {
    throw new Error("Não foi possível localizar o endereço informado.");
  }

  const distance = calculateDistance(customerCoordinates, STORE_COORDINATES);

  const deliveryFee = calculateDeliveryFee(distance);

  return deliveryFee;
}
