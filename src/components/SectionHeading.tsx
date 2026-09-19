interface SectionHeadingProps {
  number: string;
  title: string;
  description?: string;
}

export function SectionHeading({ number, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm font-medium text-primary">{number}.</span>
        <h2 className="text-2xl font-bold tracking-tight sm:text-[1.75rem]">{title}</h2>
        <span
          className="hidden h-px flex-1 bg-gradient-to-r from-border to-transparent sm:block"
          aria-hidden
        />
      </div>
      {description && (
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}