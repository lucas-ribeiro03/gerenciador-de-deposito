import Link from "next/link";

import { auth } from "@/lib/auth";
import { Logo } from "@/components/layout/logo";

import { MobileSidebar } from "./mobile-sidebar";
import { UserDropdown } from "./user-dropdown";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-36 max-w-7xl items-center justify-between px-4 ">
        <div className="flex items-center gap-4">
          <MobileSidebar isAuthenticated={!!session} />

          <Logo w={120} h={120} className="rounded-full" />
        </div>

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

            {/* Carrinho */}

            <UserDropdown />
          </div>
        )}
      </div>
    </header>
  );
}
