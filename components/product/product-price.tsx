import { formatCurrency } from "@/lib/formatters/currency";

type ProductPriceProps = {
  price: number;
  promotionalPrice: number | null;
};

export function ProductPrice({ price, promotionalPrice }: ProductPriceProps) {
  if (!promotionalPrice) {
    return (
      <p className="text-xl font-bold text-primary">{formatCurrency(price)}</p>
    );
  }

  return (
    <div className="flex flex-col">
      <span className="text-sm text-muted-foreground line-through">
        {formatCurrency(price)}
      </span>

      <span className="text-xl font-bold text-primary">
        {formatCurrency(promotionalPrice)}
      </span>
    </div>
  );
}
