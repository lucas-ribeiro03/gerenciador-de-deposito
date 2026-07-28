"use client";

import { User, Package, LogOut } from "lucide-react";

import { logoutAction } from "@/actions/auth/logout-action";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className="cursor-pointer outline-none">
          <Avatar>
            <AvatarFallback>
              <User className="size-5" />
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <User className="mr-2 size-4" />
          Meu Perfil
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Package className="mr-2 size-4" />
          Meus Pedidos
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => logoutAction()}
          className="text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 size-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
