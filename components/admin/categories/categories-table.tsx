import { CategoryStatus } from "@prisma/client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import { EmptyCategories } from "./empty-categories";
import { CategoryRowActions } from "./category-row-actions";

interface CategoriesTableProps {
  categories: {
    id: string;
    name: string;
    slug: string;
    status: CategoryStatus;
  }[];
}

export function CategoriesTable({ categories }: CategoriesTableProps) {
  if (categories.length === 0) {
    return <EmptyCategories />;
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>

            <TableHead>Slug</TableHead>

            <TableHead>Status</TableHead>

            <TableHead className="w-[150px] text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>

              <TableCell className="text-muted-foreground">
                {category.slug}
              </TableCell>

              <TableCell>
                {category.status === CategoryStatus.ACTIVE ? (
                  <Badge className="bg-green-600 hover:bg-green-600">
                    Ativa
                  </Badge>
                ) : (
                  <Badge variant="secondary">Inativa</Badge>
                )}
              </TableCell>

              <TableCell>
                <CategoryRowActions category={category} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
