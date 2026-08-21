"use client";

import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SearchProducts() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateSearch(value: string) {
    const params = new URLSearchParams(searchParams);

    if (!value.trim()) {
      params.delete("search");
    } else {
      params.set("search", value);
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  const debouncedSearch = useDebouncedCallback((value: string) => {
    updateSearch(value);
  }, 300);

  return (
    <div className="relative w-full">
      <Search className="text-muted-foreground absolute top-1/2 left-4 size-5 -translate-y-1/2" />

      <Input
        placeholder="Buscar cerveja, refrigerante, whisky..."
        className="h-12 rounded-full pr-4 pl-12 text-base shadow-lg bg-brand border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-brand-gold/50"
        defaultValue={searchParams.get("search") ?? ""}
        onChange={(event) => debouncedSearch(event.target.value)}
      />
    </div>
  );
}
