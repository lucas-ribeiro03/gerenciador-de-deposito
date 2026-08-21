export default function calculateDeliveryFee(distance: number): number | null {
  if (distance > 5) {
    return null;
  }

  if (distance < 0.2) return 2;
  if (distance <= 0.6) return 3;
  if (distance <= 1) return 4;
  if (distance <= 1.5) return 5;
  if (distance <= 2) return 6;
  if (distance <= 2.5) return 7.5;
  if (distance <= 3) return 9;
  if (distance <= 3.5) return 11;
  return 12;
}
