"use client";

import Link from "next/link";

import { Beer, Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { AdminNav } from "./admin-nav";

export function MobileAdminSidebar() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="size-5" />
      </SheetTrigger>

      <SheetContent side="left" className="flex w-72 flex-col p-0">
        <SheetHeader className="border-b p-6">
          <SheetTitle>
            <Link href="/admin" className="flex items-center gap-2">
              <Beer className="size-6 text-primary" />

              <span className="text-lg font-bold">Point do Grell</span>
            </Link>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4">
          <AdminNav />
        </div>

        <div className="border-t p-4">
          <p className="text-center text-xs text-muted-foreground">
            Versão 1.0.0
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
