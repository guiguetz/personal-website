import { useI18n } from '@/i18n/I18nContext';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border pt-8 text-sm text-muted-foreground">
      <p className="max-w-md leading-relaxed">{t.footer.builtWith}</p>
      <p className="mt-3 font-mono text-xs">
        © {new Date().getFullYear()} Guilherme Aguiar. {t.footer.rights}
      </p>
    </footer>
  );
}