import { SectionHeading } from "@/components/SectionHeading";

export default function UsesPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      <SectionHeading title="Uses" subtitle="Meu setup e ferramentas do dia a dia" />
      <div className="grid md:grid-cols-2 gap-8 mt-12">
        <div>
          <h3 className="text-xl font-bold mb-3">Hardware</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>MacBook Pro M3 Pro 14"</li>
            <li>Monitor LG UltraFine 27"</li>
            <li>Keychron Q1 Pro</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-3">Editor</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>VS Code + Neovim (NvChad)</li>
            <li>Font: JetBrains Mono</li>
            <li>Theme: Tokyo Night</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
