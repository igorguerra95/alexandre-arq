import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import type { ArchitecturalProject } from '../types';
import { ArchitecturalImage } from './ArchitecturalImage';

interface ProjectLightboxProps {
  project: ArchitecturalProject | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onContactProject: (projectTitle: string) => void;
  currentIndex: number;
  totalCount: number;
}

export const ProjectLightbox: React.FC<ProjectLightboxProps> = ({
  project,
  onClose,
  onPrev,
  onNext,
  onContactProject,
  currentIndex,
  totalCount,
}) => {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onPrev();
      if (event.key === 'ArrowRight') onNext();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={`Galeria do projeto ${project.title}`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/85 backdrop-blur-sm"
            aria-hidden="true"
          />

          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 16, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.985 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-6xl max-h-[92vh] overflow-y-auto bg-background text-foreground border border-border shadow-editorial grid grid-cols-1 lg:grid-cols-12"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar galeria"
              className="absolute top-4 right-4 z-20 inline-flex items-center justify-center w-11 h-11 bg-background/90 text-foreground border border-border hover:bg-primary hover:text-primary-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <X className="w-5 h-5 stroke-[1.5]" aria-hidden="true" />
            </button>

            <div className="lg:col-span-7 bg-surface relative min-h-[280px] sm:min-h-[420px] lg:min-h-[560px]">
              <ArchitecturalImage
                src={project.image}
                alt={project.imageAlt}
                fallbackTitle={project.title}
                loading="eager"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-8">
              <div>
                <div className="flex items-center gap-2 text-xs text-muted tracking-wide tabular-nums pr-12">
                  <span>{project.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.year}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.area}</span>
                </div>

                <h3 className="mt-3 font-display text-3xl sm:text-4xl tracking-[-0.02em] text-foreground leading-tight">
                  {project.title}
                </h3>

                <p className="mt-1 text-sm text-muted">{project.location}</p>

                <div className="mt-6 pt-6 border-t border-border space-y-4">
                  <p className="text-sm sm:text-base text-foreground leading-relaxed">
                    {project.summary}
                  </p>
                  <p className="text-sm text-muted leading-relaxed">
                    {project.concept}
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="text-xs font-bold tracking-wider text-muted mb-3">
                    Materialidade predominante
                  </h4>
                  <p className="text-sm text-foreground leading-relaxed">
                    {project.materials.join(' · ')}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-border flex flex-col gap-5">
                <button
                  type="button"
                  onClick={() => onContactProject(project.title)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 text-sm font-medium hover:bg-primary-hover transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span>Entrar em contato</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
                </button>

                <div className="flex items-center justify-between text-xs text-muted tabular-nums">
                  <span>
                    Obra {String(currentIndex + 1).padStart(2, '0')} de{' '}
                    {String(totalCount).padStart(2, '0')}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={onPrev}
                      aria-label="Projeto anterior"
                      className="inline-flex items-center justify-center w-10 h-10 border border-border text-foreground hover:bg-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <ArrowLeft className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={onNext}
                      aria-label="Próximo projeto"
                      className="inline-flex items-center justify-center w-10 h-10 border border-border text-foreground hover:bg-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <ArrowRight className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
