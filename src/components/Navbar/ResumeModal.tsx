import { motion, AnimatePresence } from "framer-motion";
import { Download, ExternalLink, X, FileText } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
}

export default function ResumeModal({ isOpen, onClose, pdfUrl }: ResumeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
            className="relative z-10 flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-panel-border bg-panel shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-panel-border px-4 py-3 sm:px-6">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 text-accent">
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-tight text-ink sm:text-base">
                    Mohammad's Resume
                  </h3>
                  <p className="hidden text-xs text-ink-muted sm:block">
                    Preview document or download a copy
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Download Button */}
                <a
                  href={pdfUrl}
                  download="Mohammad_Pakkir_Mydeen_Resume.pdf"
                  className="flex items-center gap-1.5 rounded-lg border border-accent bg-accent px-3 py-1.5 text-xs font-medium text-white transition-all hover:opacity-90 active:scale-95 sm:px-4 sm:py-2 sm:text-sm"
                >
                  <Download size={15} />
                  <span>Download</span>
                </a>

                {/* Open in new tab (helpful for mobile or fallback) */}
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden items-center gap-1.5 rounded-lg border border-panel-border bg-panel-raised px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:text-accent sm:flex sm:py-2 sm:text-sm"
                  title="Open in new tab"
                >
                  <ExternalLink size={15} />
                  <span className="hidden md:inline">Open Tab</span>
                </a>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="rounded-lg border border-panel-border p-1.5 text-ink-muted transition-colors hover:bg-panel-raised hover:text-ink sm:p-2"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Body / PDF Viewer */}
            <div className="relative flex-1 bg-neutral-900/5">
              <iframe
                src={`${pdfUrl}#toolbar=0`}
                title="Resume Preview"
                className="h-full w-full border-none"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
