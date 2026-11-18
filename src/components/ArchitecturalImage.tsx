import React, { useState } from 'react';
import { Compass } from 'lucide-react';

interface ArchitecturalImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  loading?: 'eager' | 'lazy';
}

export const ArchitecturalImage: React.FC<ArchitecturalImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle,
  loading = 'lazy',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-surface text-muted p-8 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Compass className="w-7 h-7 stroke-[1.25] mb-3 text-foreground/60" aria-hidden="true" />
        <span className="font-display text-lg text-foreground">
          {fallbackTitle || 'Registro Arquitetônico'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
