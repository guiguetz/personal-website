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
  const [pageNumber, setPageNumber] = useState(1);
  const [displayedPage, setDisplayedPage] = useState(1);
  const [failed, setFailed] = useState(false);
  const [pageWidth, setPageWidth] = useState(600);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOpen = useCallback((next: boolean) => {
    onOpenChange(next);
    if (next) {
      setPageNumber(1);
      setDisplayedPage(1);
      setFailed(false);
    }
  }, [onOpenChange]);

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

  function onDocumentLoadSuccess({ numPages: total }: { numPages: number }) {
    setNumPages(total);
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
              <div className="relative">
                <Page
                  pageNumber={displayedPage}
                  width={pageWidth}
                  renderTextLayer
                  renderAnnotationLayer
                  loading={<div className="h-[70vh] w-full animate-pulse rounded-md bg-muted" />}
                />
                {pageNumber !== displayedPage && (
                  <div className="absolute inset-0 opacity-0" aria-hidden="true">
                    <Page
                      pageNumber={pageNumber}
                      width={pageWidth}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      onRenderSuccess={() => setDisplayedPage(pageNumber)}
                    />
                  </div>
                )}
              </div>
            </Document>
            {numPages && numPages > 1 && (
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={pageNumber <= 1}
                  onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                  aria-label={t.contact.resumePrevious}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground" aria-live="polite">
                  {t.contact.resumePage(pageNumber, numPages)}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={pageNumber >= numPages}
                  onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
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
