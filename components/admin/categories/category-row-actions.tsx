"use client";

import { Pencil, Power, PowerOff, Trash2 } from "lucide-react";

import { CategoryStatus } from "@prisma/client";

import { DeleteCategoryDialog } from "./delete-category-dialog";
import { EditCategoryDialog } from "./edit-category-dialog";
import { UpdateCategoryStatusDialog } from "./update-category-status-dialog";

interface CategoryRowActionsProps {
  category: {
    id: string;
    name: string;
    slug: string;
    status: CategoryStatus;
  };
}

export function CategoryRowActions({ category }: CategoryRowActionsProps) {
  return (
    <div className="flex justify-end gap-2">
      <EditCategoryDialog category={category}>
        <div>
          <Pencil className="size-4" />
        </div>
      </EditCategoryDialog>

      <UpdateCategoryStatusDialog category={category}>
        <div>
          {category.status === CategoryStatus.ACTIVE ? (
            <PowerOff className="size-4 text-orange-500" />
          ) : (
            <Power className="size-4 text-green-600" />
          )}
        </div>
      </UpdateCategoryStatusDialog>

      <DeleteCategoryDialog category={category}>
        <div>
          <Trash2 className="size-4 text-destructive" />
        </div>
      </DeleteCategoryDialog>
    </div>
  );
}
