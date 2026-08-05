import Link from "next/link";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export function NewProductButton() {
  return (
    <Button>
      <Link href="/admin/products/new" className="flex items-center gap-2">
        <Plus className="mr-2 size-4" />
        Novo Produto
      </Link>
    </Button>
  );
}
