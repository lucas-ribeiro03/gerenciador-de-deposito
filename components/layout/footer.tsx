import { Container } from "./container";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <Container className="flex h-16 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Point do Grell. Todos os direitos
          reservados.
        </p>
      </Container>
    </footer>
  );
}
