"use client";

import {
  LayoutDashboard,
  Package,
  Tags,
  ClipboardList,
  Users,
  Settings,
} from "lucide-react";

import { AdminNavItem } from "./admin-nav-items";

export function AdminNav() {
  return (
    <nav className="flex flex-col gap-2">
      <AdminNavItem href="/admin" icon={LayoutDashboard}>
        Dashboard
      </AdminNavItem>

      <AdminNavItem href="/admin/products" icon={Package}>
        Produtos
      </AdminNavItem>

      <AdminNavItem href="/admin/categories" icon={Tags}>
        Categorias
      </AdminNavItem>

      <AdminNavItem href="/admin/orders" icon={ClipboardList}>
        Pedidos
      </AdminNavItem>

      <AdminNavItem href="/admin/employees" icon={Users}>
        Funcionários
      </AdminNavItem>

      <div className="my-2 border-t" />

      <AdminNavItem href="/admin/settings" icon={Settings}>
        Configurações
      </AdminNavItem>
    </nav>
  );
}
