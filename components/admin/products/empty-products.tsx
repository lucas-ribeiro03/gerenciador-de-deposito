import Link from "next/link";

import { PackagePlus } from "lucide-react";

import { Button } from "@/components/ui/button";

export function EmptyProducts() {
  return (
    <div className="flex min-h-[450px] flex-col items-center justify-center rounded-xl border border-dashed bg-card">
      <PackagePlus className="mb-6 size-16 text-primary" />

      <h2 className="text-2xl font-bold">Nenhum produto cadastrado</h2>

      <p className="mt-2 max-w-md text-center text-muted-foreground">
        Cadastre seu primeiro produto para começar a vender.
      </p>

      <Button className="mt-8">
        <Link href="/admin/products/new">Novo Produto</Link>
      </Button>
    </div>
  );
}
