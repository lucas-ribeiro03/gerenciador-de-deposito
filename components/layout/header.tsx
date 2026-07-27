import Link from "next/link";

import { Container } from "./container";
import { Logo } from "./logo";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-card/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Início
          </Link>

          <Link
            href="/products"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Produtos
          </Link>
        </nav>
      </Container>
    </header>
  );
}
