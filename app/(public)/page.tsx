import { Container } from "@/components/layout/container";
import { PageTitle } from "@/components/layout/page-title";

export default function HomePage() {
  return (
    <Container className="py-8">
      <PageTitle>Point do Grell</PageTitle>

      <p className="mt-2 text-muted-foreground">Seu depósito de bebidas.</p>
    </Container>
  );
}
