"use client";

import { User, Package, LogOut } from "lucide-react";

import { logoutAction } from "@/actions/auth/logout-action";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState, useTransition } from "react";
import { ProfileDialog } from "./profile/profile-dialog";
import { useRouter } from "next/navigation";

type UserDropdownProps = {
  user: {
    name: string;
    email: string;
    phone: string;
  };
};

export function UserDropdown({ user }: UserDropdownProps) {
  const [_, startTransition] = useTransition();
  function logout() {
    startTransition(async () => {
      await logoutAction();
    });
  }

  const router = useRouter();

  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarFallback>
              <User className="size-5" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="center"
          className="w-56 rounded-xl border border-border bg-popover backdrop-blur-xl shadow-xl text-popover-foreground"
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel>Minha conta</DropdownMenuLabel>

            <DropdownMenuSeparator className="w-full h-[0.5px] bg-border" />

            <DropdownMenuItem onClick={() => setProfileOpen(true)}>
              <User className="mr-2 size-4" />
              Meu Perfil
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                router.push("/orders");
              }}
            >
              <Package className="mr-2 size-4" />
              Meus Pedidos
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={logout}
            className="text-destructive focus:text-destructive"
          >
            <LogOut className="mr-2 size-4" />
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ProfileDialog
        open={profileOpen}
        onOpenChange={setProfileOpen}
        user={user}
      />
    </>
  );
}
