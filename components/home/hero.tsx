import { SearchProducts } from "./search-products";

export function Hero() {
  return (
    <section className="bg-brand-dark">
      <div className="mx-auto flex min-h-112.5 w-full max-w-7xl flex-col items-center justify-center px-4 text-center">
        <span className="mb-4 text-sm font-semibold uppercase tracking-[0.25rem] text-brand-gold">
          Point do Grell
        </span>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-6xl">
          As melhores bebidas da região entregues até você.
        </h1>

        <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
          Encontre cervejas, refrigerantes, destilados, energéticos e muito mais
          com entrega rápida.
        </p>

        <div className="mt-10 w-full max-w-2xl">
          <SearchProducts />
        </div>
      </div>
    </section>
  );
}
