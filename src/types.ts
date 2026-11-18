export type ProjectCategory = 'Todos' | 'Residencial' | 'Comercial';

export interface ArchitecturalProject {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'Todos'>;
  year: string;
  area: string;
  location: string;
  image: string;
  imageAlt: string;
  summary: string;
  concept: string;
  materials: string[];
  featured?: boolean;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  deliverable: string;
}

export interface StudioMetric {
  value: number;
  suffix: string;
  label: string;
  context: string;
}
