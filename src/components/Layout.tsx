import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Grid + ambient glow backdrop */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.4] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-40 right-[-15%] h-[520px] w-[520px] rounded-full bg-primary/10 blur-[130px]" />
        <div className="absolute top-1/3 left-[-15%] h-[420px] w-[420px] rounded-full bg-fuchsia-500/10 blur-[130px]" />
        <div className="absolute bottom-0 left-1/3 h-[360px] w-[360px] rounded-full bg-sky-500/5 blur-[130px]" />
      </div>

      <Sidebar />

      <main className="lg:pl-72">
        <div className="mx-auto max-w-3xl px-6 pb-20 pt-16 sm:px-8 lg:px-12 lg:pt-16">
          {children}
        </div>
      </main>

      {/* Soft fade at the top/bottom edges of the scrollable content. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-[60px] z-30 h-16 bg-gradient-to-b from-background via-background/80 to-transparent lg:left-72 lg:top-0"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 bottom-0 z-30 h-16 bg-gradient-to-t from-background via-background/80 to-transparent lg:left-72"
      />
    </div>
  );
}