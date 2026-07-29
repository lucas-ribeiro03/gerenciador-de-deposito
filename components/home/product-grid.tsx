import { ProductCard } from "@/components/product/product-card";

const products = [
  {
    id: "1",
    name: "Heineken Long Neck",
    imageUrl: "/products/heineken.png",
    price: 8.99,
    promotionalPrice: 6.99,
    isAvailable: true,
  },
  {
    id: "2",
    name: "Coca-Cola 2L",
    imageUrl: "/products/coca.png",
    price: 12.9,
    promotionalPrice: null,
    isAvailable: true,
  },
  {
    id: "3",
    name: "Red Bull 250ml",
    imageUrl: "/products/redbull.png",
    price: 11.5,
    promotionalPrice: null,
    isAvailable: true,
  },
  {
    id: "4",
    name: "Budweiser 600ml",
    imageUrl: "/products/bud.png",
    price: 9.9,
    promotionalPrice: 8.5,
    isAvailable: true,
  },
  {
    id: "5",
    name: "Corona Extra",
    imageUrl: "/products/corona.png",
    price: 10.9,
    promotionalPrice: null,
    isAvailable: true,
  },
  {
    id: "6",
    name: "Jack Daniel's",
    imageUrl: "/products/jack.png",
    price: 149.9,
    promotionalPrice: 139.9,
    isAvailable: true,
  },
  {
    id: "7",
    name: "Guaraná Antarctica 2L",
    imageUrl: "/products/guarana.png",
    price: 10.99,
    promotionalPrice: null,
    isAvailable: true,
  },
  {
    id: "8",
    name: "Água Mineral Crystal",
    imageUrl: "/products/agua.png",
    price: 2.99,
    promotionalPrice: null,
    isAvailable: true,
  },
];

export function ProductsGrid() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 bg-background">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Produtos</h2>

          <p className="mt-2 text-muted-foreground">
            Confira os produtos disponíveis.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
