"use client";

import { ChevronDown, Percent, Snowflake } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Category } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
type ProductFiltersProps = {
  categories: Category[];
  selectedCategory: string;
};

export function ProductFilters({
  categories,
  selectedCategory,
}: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isPromotionSelected = searchParams.get("promotion") === "true";
  function togglePromotion() {
    const params = new URLSearchParams(searchParams);

    if (isPromotionSelected) {
      params.delete("promotion");
    } else {
      params.set("promotion", "true");
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  function selectCategory(slug?: string) {
    const params = new URLSearchParams(searchParams);

    if (!slug) {
      params.delete("category");
    } else {
      params.set("category", slug);
    }

    router.push(`${pathname}?${params.toString()}`);
  }

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
            <DropdownMenuItem onClick={() => selectCategory()}>
              Todas as categorias
            </DropdownMenuItem>
            {categories.map((category) => (
              <DropdownMenuItem
                key={category.id}
                onClick={() => selectCategory(category.slug)}
                className={
                  category.slug === selectedCategory ? "bg-accent" : ""
                }
              >
                {category.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant={isPromotionSelected ? "default" : "outline"}
          onClick={togglePromotion}
          className="border-border"
        >
          <Percent />
          Promoções
        </Button>
      </div>
    </section>
  );
}
