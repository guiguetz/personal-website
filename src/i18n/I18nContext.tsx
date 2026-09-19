import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { dictionaries, pageTitles, type Dictionary, type Locale } from './translations';

interface I18nValue {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const STORAGE_KEY = 'locale';

/** Leaf text elements (no element children) that can be animated text-only. */
const TEXT_TAGS =
  'p, span, h1, h2, h3, h4, h5, h6, a, li, label, strong, em, small, figcaption, code, dt, dd, blockquote, td, th';

let localeHiddenTimer: number | undefined;

function isLeafTextElement(el: Element): boolean {
  if (el.children.length > 0) return false;
  if (el.hasAttribute('aria-hidden')) return false;
  const cls = el.getAttribute('class') ?? '';
  if (cls.includes('animate-')) return false;
  return (el.textContent ?? '').trim().length > 0;
}

/** Find the nearest ancestor that clips overflowing content, such as nav. */
function getClippingParent(el: HTMLElement): HTMLElement | null {
  let parent = el.parentElement;
  while (parent && parent !== document.body) {
    const style = getComputedStyle(parent);
    const clips = [style.overflow, style.overflowX, style.overflowY].some((value) =>
      ['hidden', 'auto', 'scroll', 'clip'].includes(value),
    );
    if (clips) return parent;
    parent = parent.parentElement;
  }
  return null;
}

/**
 * Snapshot each leaf text element into a floating overlay that fades
 * out sliding down — text only, no borders/panels.
 */
function playTextExit() {
  if (typeof document === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const mobileDrawer = document.querySelector('[data-mobile-drawer="true"]');
  const drawerIsOpen = mobileDrawer instanceof HTMLElement && mobileDrawer.offsetWidth > 0;

  document.querySelectorAll(TEXT_TAGS).forEach((el) => {
    // When the mobile drawer is open, never create body-level overlays for
    // content behind it. Those overlays would paint above the drawer's z-50
    // layer; the hidden real text is enough for the covered page content.
    if (drawerIsOpen && !mobileDrawer.contains(el)) return;
    if (!isLeafTextElement(el)) return;
    const htmlEl = el as HTMLElement;
    const rect = htmlEl.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const s = getComputedStyle(el);
    const overlay = document.createElement('span');
    const st = overlay.style;
    st.overflow = 'hidden';
    st.boxSizing = 'border-box';
    st.margin = '0';
    st.padding = '0';
    st.border = '0';
    st.pointerEvents = 'none';
    st.zIndex = '9999';
    st.visibility = 'visible'; // exempt from the .locale-hidden rule
    overlay.setAttribute('aria-hidden', 'true');
    st.whiteSpace = 'pre-wrap';
    st.wordBreak = 'break-word';
    st.fontFamily = s.fontFamily;
    st.fontSize = s.fontSize;
    st.fontWeight = s.fontWeight;
    st.fontStyle = s.fontStyle;
    st.lineHeight = s.lineHeight;
    st.letterSpacing = s.letterSpacing;
    st.textAlign = s.textAlign;
    st.textTransform = s.textTransform;
    st.textShadow = s.textShadow;
    st.color = s.color;
    overlay.textContent = el.textContent ?? '';

    // Keep the overlay inside the nearest clipping ancestor. In particular,
    // sidebar nav has overflow-y-auto, so an item moving down cannot paint
    // over the language/theme controls in the footer.
    const clippingParent = getClippingParent(htmlEl);
    const offsetParent = htmlEl.offsetParent;
    const parent = clippingParent ?? (offsetParent !== document.body ? offsetParent : null);

    if (parent instanceof HTMLElement) {
      if (getComputedStyle(parent).position === 'static') {
        parent.style.position = 'relative';
      }
      const parentRect = parent.getBoundingClientRect();
      st.position = 'absolute';
      st.left = `${rect.left - parentRect.left + parent.scrollLeft}px`;
      st.top = `${rect.top - parentRect.top + parent.scrollTop}px`;
      st.width = `${rect.width}px`;
      parent.appendChild(overlay);
    } else {
      // Fallback for elements without a useful positioned/clipping ancestor.
      st.position = 'fixed';
      st.left = `${rect.left}px`;
      st.top = `${rect.top}px`;
      st.width = `${rect.width}px`;
      document.body.appendChild(overlay);
    }
    st.maxHeight = `${rect.height}px`;

    const anim = overlay.animate(
      [
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(28px)' },
      ],
      { duration: 200, easing: 'ease-in', fill: 'both' },
    );
    anim.addEventListener('finish', () => overlay.remove());
  });
}

/** Fade the new text in rising from below (runs after React commits). */
function animateTextEnter() {
  if (typeof document === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll(TEXT_TAGS).forEach((el) => {
    if (!isLeafTextElement(el)) return;
    el.animate(
      [
        { opacity: 0, transform: 'translateY(16px)' },
        { opacity: 1, transform: 'none' },
      ],
      { duration: 450, delay: 50, easing: 'ease-out', fill: 'backwards' },
    );
  });
}

/**
 * Start the switch: hide the real text (invisible swap), play the exit
 * overlays, then fade the new text in from below after the overlays end.
 */
function beginLocaleSwitch() {
  if (typeof document === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.documentElement.classList.add('locale-hidden');
  playTextExit();
  window.clearTimeout(localeHiddenTimer);
  localeHiddenTimer = window.setTimeout(finishLocaleSwitch, 200);
}

function finishLocaleSwitch() {
  if (typeof document === 'undefined') return;
  // Start the enter animation BEFORE unhiding: WAAPI 'backwards' fill pins
  // every text element at opacity 0 from this frame, so removing the
  // hidden-class underneath causes no visible swap/flash.
  requestAnimationFrame(() => {
    animateTextEnter();
    document.documentElement.classList.remove('locale-hidden');
  });
}

function playLocaleTextTransition() {
  beginLocaleSwitch();
}

const I18nContext = createContext<I18nValue | null>(null);

function readInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'pt';
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === 'en' || saved === 'pt' ? saved : 'pt';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale);

  const setLocale = useCallback((next: Locale) => {
    playLocaleTextTransition();
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggleLocale = useCallback(() => {
    playLocaleTextTransition();
    setLocaleState((prev) => {
      const next: Locale = prev === 'pt' ? 'en' : 'pt';
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en';
    document.title = pageTitles[locale];
  }, [locale]);

  const value = useMemo<I18nValue>(
    () => ({ locale, t: dictionaries[locale], setLocale, toggleLocale }),
    [locale, setLocale, toggleLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}