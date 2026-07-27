import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  href?: string;
  className?: string;
};

export function Logo({ href = "/", className }: LogoProps) {
  return (
    <Link href={href} className={className}>
      <Image
        src="/logo.png"
        alt="Point do Grell"
        width={180}
        height={180}
        priority
      />
    </Link>
  );
}
