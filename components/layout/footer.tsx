import Link from "next/link";

import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-10">
        <Logo h={100} w={100} className="rounded-full" />

        <p className="max-w-md text-center text-sm text-muted-foreground">
          As melhores bebidas da região, entregues com rapidez e praticidade.
        </p>

        <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <Link href="/" className="transition-colors hover:text-primary">
            Início
          </Link>

          <Link
            href="/products"
            className="transition-colors hover:text-primary"
          >
            Produtos
          </Link>

          <Link href="/login" className="transition-colors hover:text-primary">
            Entrar
          </Link>
        </nav>

        <span className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Point do Grell. Todos os direitos
          reservados.
        </span>
      </div>
    </footer>
  );
}
