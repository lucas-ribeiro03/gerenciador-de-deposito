"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import { useOrderFilters } from "@/hooks/use-order-filters";

export function OrderSearch() {
  const { search, updateParams } = useOrderFilters();

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        defaultValue={search}
        placeholder="Buscar por cliente ou pedido..."
        className="pl-9"
        onKeyDown={(event) => {
          if (event.key !== "Enter") {
            return;
          }

          const value = event.currentTarget.value.trim();

          updateParams({
            search: value || null,
          });
        }}
      />
    </div>
  );
}
