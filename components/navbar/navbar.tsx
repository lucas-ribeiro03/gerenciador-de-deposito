import Link from "next/link";

import { auth } from "@/lib/auth";
import { Logo } from "@/components/layout/logo";

import { UserDropdown } from "./user-dropdown";
import { CartButton } from "./cart-button";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 bg-">
      <div className="mx-auto flex h-36 max-w-7xl items-center justify-between px-4 ">
        <div className="flex items-center gap-4">
          <Logo w={120} h={120} className="rounded-full" />
        </div>
        <div className="flex gap-3 items-center">
          {!session ? (
            <Link
              href="/login"
              className="text-sm font-medium hover:text-primary"
            >
              Entrar
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              {/* Endereço */}

              <UserDropdown />
            </div>
          )}
          <CartButton />
        </div>
      </div>
    </header>
  );
}
