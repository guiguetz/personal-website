export function Footer() {
  return (
    <footer className="border-t border-border pt-8 text-sm text-muted-foreground">
      <p className="max-w-md leading-relaxed">
        Construído com React, TypeScript, Tailwind CSS e Framer Motion. Design inspirado em
        portfolios de alta performance.
      </p>
      <p className="mt-3 font-mono text-xs">
        © {new Date().getFullYear()} Guilherme Aguiar. Todos os direitos reservados.
      </p>
    </footer>
  );
}