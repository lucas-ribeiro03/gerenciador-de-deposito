import type { ReactNode } from "react";

import { AdminHeader } from "@/components/layout/admin/admin-header";
import { AdminSidebar } from "@/components/layout/admin/admin-sidebar";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="flex lg:block lg:fixed lg:inset-y-0 lg:left-0 lg:w-72">
        <AdminSidebar />
      </div>

      <div className="lg:ml-72 flex lg:flex-1 min-h-screen flex-col">
        <AdminHeader />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
