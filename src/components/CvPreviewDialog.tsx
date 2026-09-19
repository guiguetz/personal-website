import { useCallback, useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useI18n } from '@/i18n/I18nContext';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const CV_URL = '/guilherme-aguiar-cv.pdf';
const CV_FILENAME = 'Guilherme-Aguiar-CV.pdf';

export default function CvPreviewDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { t } = useI18n();
  const [numPages, setNumPages] = useState<number | null>(null);
  const [requested, setRequested] = useState(1); // target page the user asked for
  const [visible, setVisible] = useState(1); // page whose canvas is actually shown
  const [mountedPages, setMountedPages] = useState<number[]>([1]);
  const [failed, setFailed] = useState(false);
  const [pageWidth, setPageWidth] = useState(600);
  const [viewerHeight, setViewerHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const requestedRef = useRef(1);
  const readyRef = useRef<Set<number>>(new Set([1]));

  const mount = useCallback((n: number) => {
    setMountedPages((prev) => (prev.includes(n) ? prev : [...prev, n]));
  }, []);

  const handleOpen = useCallback(
    (next: boolean) => {
      onOpenChange(next);
      if (next) {
        setRequested(1);
        requestedRef.current = 1;
        setVisible(1);
        setMountedPages([1]);
        readyRef.current = new Set([1]);
        setFailed(false);
      }
    },
    [onOpenChange],
  );

  // Measure dialog width to size the PDF responsively.
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      if (width > 0) setPageWidth(Math.min(width, 720));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [open]);

  // Keep the viewer's height matching the currently visible page so the
  // absolutely-positioned pages reserve the right space.
  useEffect(() => {
    const element = viewerRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.height > 0) setViewerHeight(entry.contentRect.height);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [visible, mountedPages]);

  function onDocumentLoadSuccess({ numPages: total }: { numPages: number }) {
    setNumPages(total);
    // Preload the next page right away so the first navigation is instant.
    if (total > 1) mount(2);
  }

  function onPageRenderSuccess(n: number) {
    const isNew = !readyRef.current.has(n);
    readyRef.current.add(n);
    if (isNew && requestedRef.current === n) setVisible(n);
  }

  function goTo(n: number) {
    setRequested(n);
    requestedRef.current = n;
    mount(n);
    // If this page already rendered before, showing it is an instant CSS swap.
    if (readyRef.current.has(n)) setVisible(n);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="max-h-[90vh] w-[92vw] max-w-[760px] overflow-y-auto p-4 sm:p-6">
        <DialogHeader className="sr-only">
          <DialogTitle>{t.contact.download}</DialogTitle>
          <DialogDescription>{t.contact.viewResume}</DialogDescription>
        </DialogHeader>
        {failed ? (
          <div className="space-y-4 py-6 text-center">
            <p className="text-sm text-muted-foreground">{t.contact.resumeError}</p>
            <Button asChild>
              <a href={CV_URL} download={CV_FILENAME}>
                {t.contact.download}
              </a>
            </Button>
          </div>
        ) : (
          <div ref={containerRef} className="flex flex-col items-center gap-4">
            <Document
              file={CV_URL}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={() => setFailed(true)}
              loading={<p className="py-8 text-sm text-muted-foreground">{t.contact.resumeLoading}</p>}
              error={null}
            >
              <div className="relative" style={{ minHeight: viewerHeight }}>
                {mountedPages.map((n) => {
                  const active = n === visible && requested === n;
                  return (
                    <div
                      key={n}
                      ref={active ? viewerRef : undefined}
                      aria-hidden={!active}
                      className={`absolute left-0 top-0 transition-none ${
                        active ? '' : 'pointer-events-none opacity-0'
                      }`}
                    >
                      <Page
                        pageNumber={n}
                        width={pageWidth}
                        renderTextLayer
                        renderAnnotationLayer
                        onRenderSuccess={() => onPageRenderSuccess(n)}
                        loading={<div className="h-[70vh] w-full animate-pulse rounded-md bg-muted" />}
                      />
                    </div>
                  );
                })}
              </div>
            </Document>
            {numPages !== null && numPages > 1 && (
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={requested <= 1}
                  onClick={() => goTo(requested - 1)}
                  aria-label={t.contact.resumePrevious}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground" aria-live="polite">
                  {t.contact.resumePage(requested, numPages)}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={requested >= numPages}
                  onClick={() => goTo(requested + 1)}
                  aria-label={t.contact.resumeNext}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
            <Button asChild variant="secondary" className="gap-2">
              <a href={CV_URL} download={CV_FILENAME}>
                <Download className="h-4 w-4" />
                {t.contact.download}
              </a>
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}