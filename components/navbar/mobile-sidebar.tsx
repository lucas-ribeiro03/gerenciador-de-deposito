"use client";

import Link from "next/link";
import {
  Menu,
  LogIn,
  MapPin,
  ShoppingCart,
  Package,
  User,
  LogOut,
} from "lucide-react";

import { logoutAction } from "@/actions/auth/logout-action";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

type MobileSidebarProps = {
  isAuthenticated: boolean;
};

export function MobileSidebar({ isAuthenticated }: MobileSidebarProps) {
  return (
    <Sheet>
      <SheetTrigger className={"lg:hidden"}>
        <Menu />
      </SheetTrigger>

      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle>Point do Grell</SheetTitle>
        </SheetHeader>

        <div className="mt-8 flex flex-col gap-2">
          {!isAuthenticated ? (
            <Button variant="outline" className="justify-start">
              <Link href="/login">
                <LogIn />
                Entrar
              </Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" className="justify-start">
                <MapPin />
                Endereço
              </Button>

              <Button variant="ghost" className="justify-start">
                <Link href="/cart">
                  <ShoppingCart />
                  Carrinho
                </Link>
              </Button>

              <Button variant="ghost" className="justify-start">
                <Link href="/profile">
                  <User />
                  Meu Perfil
                </Link>
              </Button>

              <Button variant="ghost" className="justify-start">
                <Link href="/orders">
                  <Package />
                  Meus Pedidos
                </Link>
              </Button>

              <Separator className="my-2" />

              <Button
                variant="ghost"
                className="justify-start text-destructive hover:text-destructive"
                onClick={() => logoutAction()}
              >
                <LogOut />
                Sair
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
