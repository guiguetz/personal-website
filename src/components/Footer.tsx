export function Footer() {
  return (
    <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
      <p>
        © {new Date().getFullYear()} Guilherme Aguiar. Todos os direitos reservados.
      </p>
      <p className="mt-2">
        Construído com <span className="text-primary">React</span>, <span className="text-primary">TypeScript</span> e <span className="text-primary">Tailwind CSS</span>
      </p>
    </footer>
  );
}