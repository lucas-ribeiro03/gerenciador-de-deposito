"use client";

import { ChevronDown, Percent, Snowflake } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categories = [
  "Todas",
  "Cervejas",
  "Refrigerantes",
  "Destilados",
  "Whisky",
  "Vodka",
  "Gin",
  "Vinhos",
  "Energéticos",
  "Sucos",
  "Águas",
  "Gelo",
];

export function ProductFilters() {
  return (
    <section className="sticky top-16 z-40 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 overflow-x-auto px-4 scrollbar-none">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline">
              Categorias
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start">
            {categories.map((category) => (
              <DropdownMenuItem key={category}>{category}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline">
          <Percent />
          Promoções
        </Button>
        <Button variant="outline">
          <Snowflake />
          Geladas
        </Button>
      </div>
    </section>
  );
}
