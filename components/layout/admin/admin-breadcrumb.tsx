"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const labels: Record<string, string> = {
  admin: "Dashboard",
  products: "Produtos",
  categories: "Categorias",
  orders: "Pedidos",
  employees: "Funcionários",
  settings: "Configurações",
};

export function AdminBreadcrumb() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;

          const isLast = index === segments.length - 1;

          const label =
            labels[segment] ??
            segment.charAt(0).toUpperCase() + segment.slice(1);

          return (
            <BreadcrumbItem key={href}>
              {isLast ? (
                <BreadcrumbPage>{label}</BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink>{label}</BreadcrumbLink>

                  <BreadcrumbSeparator />
                </>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
