"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

export function SearchProducts() {
  return (
    <div className="relative w-full">
      <Search className="text-muted-foreground absolute top-1/2 left-4 size-5 -translate-y-1/2" />

      <Input
        placeholder="Buscar cerveja, refrigerante, whisky..."
        className="h-12 rounded-full pr-4 pl-12 text-base shadow-lg bg-brand border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-brand-gold/50"
      />
    </div>
  );
}
