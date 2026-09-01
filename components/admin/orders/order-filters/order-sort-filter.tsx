"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useOrderFilters } from "@/hooks/use-order-filters";

export function OrderSortFilter() {
  const { sort, updateParams } = useOrderFilters();

  return (
    <Select
      value={sort}
      onValueChange={(value) =>
        updateParams({
          sort: value,
        })
      }
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="newest">Mais recentes</SelectItem>

        <SelectItem value="oldest">Mais antigos</SelectItem>

        <SelectItem value="highestTotal">Maior valor</SelectItem>

        <SelectItem value="lowestTotal">Menor valor</SelectItem>
      </SelectContent>
    </Select>
  );
}
