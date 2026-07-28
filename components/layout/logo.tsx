import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  href?: string;
  className?: string;
  w: number;
  h: number;
};

export function Logo({ href = "/", className, w, h }: LogoProps) {
  return (
    <Link href={href}>
      <Image
        src="/logo.png"
        alt="Point do Grell"
        width={w}
        height={h}
        priority
        className={className}
      />
    </Link>
  );
}
