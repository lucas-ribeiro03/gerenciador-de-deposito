import type { CheckoutAddress } from "@/types/address";

type GeocodingResult = {
  latitude: number;
  longitude: number;
};

type MapboxGeocodingResponse = {
  features: Array<{
    properties: {
      coordinates: {
        latitude: number;
        longitude: number;
        routable_points?: Array<{
          latitude: number;
          longitude: number;
        }>;
      };
    };
  }>;
};

export async function geocodeAddress(
  address: Pick<CheckoutAddress, "street" | "number" | "district" | "zipCode">,
): Promise<GeocodingResult | null> {
  const token = process.env.MAPBOX_ACCESS_TOKEN;

  if (!token) {
    throw new Error("MAPBOX_ACCESS_TOKEN não configurado.");
  }

  const query = [
    address.street,
    address.number,
    address.district,
    address.zipCode,
    "Rio de Janeiro",
    "RJ",
    "Brasil",
  ]
    .filter(Boolean)
    .join(", ");

  const params = new URLSearchParams({
    q: query,
    country: "BR",
    types: "address",
    limit: "1",
    language: "pt-BR",
    access_token: token,
  });

  const response = await fetch(
    `https://api.mapbox.com/search/geocode/v6/forward?${params}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Erro ao consultar o Mapbox: ${response.status}`);
  }

  const data = (await response.json()) as MapboxGeocodingResponse;

  const coordinates = data.features[0]?.properties.coordinates;

  if (!coordinates) {
    return null;
  }

  const routablePoint = coordinates.routable_points?.[0];

  if (routablePoint) {
    return routablePoint;
  }

  return {
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
  };
}
