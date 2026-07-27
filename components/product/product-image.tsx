import Image from "next/image";

type ProductImageProps = {
  src: string;
  alt: string;
};

export function ProductImage({ src, alt }: ProductImageProps) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-t-xl bg-muted">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
}
