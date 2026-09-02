"use client";

import Image from "next/image";

import { ChevronDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { formatCurrency } from "@/lib/formatters/currency";
import { ProductRowActions } from "./product-row-action";
import type { AdminProduct } from "@/services/product/get-products-service";

interface ProductsTableProps {
  products: AdminProduct[];
}
export function ProductsTableMobile({ products }: ProductsTableProps) {
  return (
    <div className="space-y-2">
      {products.map((product) => (
        <Collapsible key={product.id} className="rounded-xl border bg-card">
          <CollapsibleTrigger className="flex w-full items-center justify-between gap-4 p-4 text-left">
            <div className="min-w-0">
              <p className="truncate font-medium">{product.name}</p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <span className="font-medium">
                {formatCurrency(Number(product.price))}
              </span>

              <ChevronDown className="size-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div className="space-y-4 border-t p-4">
              <div className="flex items-start gap-4">
                <Image
                  src={product.imageUrl ?? "/placeholder.png"}
                  alt={product.name}
                  width={60}
                  height={60}
                  className="rounded-lg border object-cover"
                />

                {product.description && (
                  <p className="text-sm text-muted-foreground">
                    {product.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Categoria</p>
                  <p className="font-medium">{product.category.name}</p>
                </div>

                <div>
                  <p className="text-muted-foreground">Preço</p>
                  <p className="font-medium">
                    {formatCurrency(Number(product.price))}
                  </p>
                </div>

                <div>
                  <p className="text-muted-foreground">Promoção</p>
                  <p className="font-medium">
                    {product.promotionalPrice
                      ? formatCurrency(Number(product.promotionalPrice))
                      : "-"}
                  </p>
                </div>

                <div>
                  <p className="text-muted-foreground">Status</p>

                  <Badge
                    variant={product.isAvailable ? "default" : "destructive"}
                  >
                    {product.isAvailable ? "Disponível" : "Indisponível"}
                  </Badge>
                </div>
              </div>

              <div className="flex justify-end border-t pt-4">
                <ProductRowActions productId={product.id} />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}
