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
    <section className="sticky top-16 z-40 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 overflow-x-auto px-4 scrollbar-none">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="border border-border bg-card text-card-foreground hover:bg-muted flex items-center gap-3 p-2 rounded-lg px-4 cursor-pointer">
              Categorias
              <ChevronDown />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start">
            {categories.map((category) => (
              <DropdownMenuItem key={category}>{category}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant="outline"
          className="text-muted-foreground hover:text-brand-gold border-border hover:border-brand-gold/40"
        >
          <Percent />
          Promoções
        </Button>
        <Button
          variant="outline"
          className="text-muted-foreground hover:text-brand-gold border-border hover:border-brand-gold/40"
        >
          <Snowflake />
          Geladas
        </Button>
      </div>
    </section>
  );
}
