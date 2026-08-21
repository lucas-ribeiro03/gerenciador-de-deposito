type Coordinates = {
  latitude: number;
  longitude: number;
};

const EARTH_RADIUS_KM = 6371;

function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

export function calculateDistance(
  origin: Coordinates,
  destination: Coordinates,
): number {
  const latitudeDifference = toRadians(destination.latitude - origin.latitude);

  const longitudeDifference = toRadians(
    destination.longitude - origin.longitude,
  );

  const originLatitude = toRadians(origin.latitude);
  const destinationLatitude = toRadians(destination.latitude);

  const a =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(originLatitude) *
      Math.cos(destinationLatitude) *
      Math.sin(longitudeDifference / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_KM * c;
}
