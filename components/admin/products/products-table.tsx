import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { EmptyProducts } from "./empty-products";
import { ProductRowActions } from "./product-row-action";
import { formatCurrency } from "@/lib/formatters/currency";
import { Badge } from "@/components/ui/badge";
import type { AdminProduct } from "@/services/product/get-products-service";
interface ProductsTableProps {
  products: AdminProduct[];
}

export function ProductsTable({ products }: ProductsTableProps) {
  if (products.length === 0) {
    return <EmptyProducts />;
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>

            <TableHead className="text-center">Categoria</TableHead>

            <TableHead className="text-center">Preço</TableHead>

            <TableHead className="text-center">Promoção</TableHead>

            <TableHead className="text-center">Status</TableHead>

            <TableHead className="text-center" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="flex items-center gap-4">
                  <Image
                    src={product.imageUrl ?? "/placeholder.png"}
                    alt={product.name}
                    width={60}
                    height={60}
                    className="rounded-lg border object-cover"
                  />

                  <div className="space-y-1">
                    <p className="font-medium">{product.name}</p>

                    {product.description && (
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {product.description}
                      </p>
                    )}
                  </div>
                </div>
              </TableCell>

              <TableCell className="text-center">
                {product.category.name}
              </TableCell>

              <TableCell className="text-center">
                {product.price ? (
                  <>{formatCurrency(Number(product.price))} </>
                ) : (
                  "-"
                )}
              </TableCell>

              <TableCell className="text-center">
                {product.promotionalPrice ? (
                  <>{formatCurrency(Number(product.promotionalPrice))} </>
                ) : (
                  "-"
                )}
              </TableCell>

              <TableCell className="text-center">
                <Badge
                  variant={product.isAvailable ? "default" : "destructive"}
                >
                  {product.isAvailable ? "Disponível" : "Indisponível"}
                </Badge>
              </TableCell>

              <TableCell className="text-center">
                <ProductRowActions productId={product.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
