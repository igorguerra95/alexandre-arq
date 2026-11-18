import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';

interface SheetDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const SheetDrawer: React.FC<SheetDrawerProps> = ({
  open,
  onClose,
  title,
  children,
}) => {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/55 backdrop-blur-xs"
            aria-hidden="true"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-xs bg-background text-foreground border-l border-border shadow-editorial flex flex-col justify-between p-6 sm:p-8 h-full"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-border">
                <span className="font-display text-xl tracking-tight text-foreground">
                  {title}
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Fechar menu"
                  className="inline-flex items-center justify-center w-11 h-11 rounded-sm border border-border text-foreground hover:bg-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <X className="w-5 h-5 stroke-[1.5]" aria-hidden="true" />
                </button>
              </div>
              <div className="pt-8">{children}</div>
            </div>

            <div className="pt-6 border-t border-border text-xs text-muted space-y-1">
              <p className="font-medium text-foreground">Alexandre - Arquitetura</p>
              <p>(00) 00000-0000</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
