"use client";

import { usePathname } from "next/navigation";

import { MobileAdminSidebar } from "./mobile-admin-sidebar";
import { AdminUserDropdown } from "./admin-user-dropdown";
import { AdminBreadcrumb } from "./admin-breadcrumb";

export function AdminHeader() {
  const pathname = usePathname();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <div className="lg:hidden">
          <MobileAdminSidebar />
        </div>

        <AdminBreadcrumb />
      </div>

      <AdminUserDropdown />
    </header>
  );
}
