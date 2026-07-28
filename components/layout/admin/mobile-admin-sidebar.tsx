"use client";

import Link from "next/link";

import { Beer, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
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
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="border-b p-6">
          <SheetTitle>
            <Link href="/admin" className="flex items-center gap-2">
              <Beer className="size-6 text-primary" />

              <span className="text-lg font-bold">Point do Grell</span>
            </Link>
          </SheetTitle>
        </SheetHeader>

        <div className="p-4">
          <AdminNav />
        </div>
      </SheetContent>
    </Sheet>
  );
}
