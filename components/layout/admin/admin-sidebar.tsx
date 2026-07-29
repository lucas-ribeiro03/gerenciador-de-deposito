import Link from "next/link";

import { Beer } from "lucide-react";

import { AdminNav } from "./admin-nav";

export function AdminSidebar() {
  return (
    <aside className="hidden h-screen w-72 shrink-0 border-r bg-background lg:flex lg:flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/admin" className="flex items-center gap-2">
          <Beer className="size-6 text-primary" />

          <span className="text-lg font-bold">Point do Grell</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <AdminNav />
      </div>

      <div className="border-t p-4">
        <p className="text-center text-xs text-muted-foreground">
          Versão 1.0.0
        </p>
      </div>
    </aside>
  );
}
