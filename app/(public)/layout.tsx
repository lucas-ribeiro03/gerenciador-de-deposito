import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

type PublicLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <Header />

      <main className="flex min-h-[calc(100vh-8rem)] flex-col">{children}</main>

      <Footer />
    </>
  );
}
