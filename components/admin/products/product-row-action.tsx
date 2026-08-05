"use client";

import Link from "next/link";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { DeleteProductDialog } from "./delete-product-dialog";

interface ProductRowActionsProps {
  productId: string;
}

export function ProductRowActions({ productId }: ProductRowActionsProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal className="size-5" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48 flex flex-col">
        <DropdownMenuItem>
          <Link
            href={`/admin/products/${productId}/edit`}
            className="flex items-center gap-2 w-full"
          >
            <Pencil className="mr-2 size-4" />
            Editar
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-destructive"
          onClick={() => setDeleteDialogOpen(true)}
        >
          <Trash2 className="mr-2 size-4" />
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
      <DeleteProductDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        productId={productId}
      />
    </DropdownMenu>
  );
}
