"use client";

import { usePathname } from "next/navigation";

import { MobileAdminSidebar } from "./mobile-admin-sidebar";
import { AdminUserDropdown } from "./admin-user-dropdown";

const titles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/products": "Produtos",
  "/admin/categories": "Categorias",
  "/admin/orders": "Pedidos",
  "/admin/employees": "Funcionários",
  "/admin/settings": "Configurações",
};

export function AdminHeader() {
  const pathname = usePathname();

  const title = titles[pathname] ?? "Painel Administrativo";

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <MobileAdminSidebar />

        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      <AdminUserDropdown />
    </header>
  );
}
