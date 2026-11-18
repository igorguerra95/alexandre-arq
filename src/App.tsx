import React, { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  Check,
  Clock,
  Expand,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
} from 'lucide-react';
import {
  CONTACT_INFO,
  CREATIVE_PROCESS,
  PORTFOLIO_PROJECTS,
  STUDIO_MEDIA,
  STUDIO_METRICS,
} from './data/studioData';
import type { ArchitecturalProject, ProjectCategory } from './types';
import { ArchitecturalImage } from './components/ArchitecturalImage';
import { CountUpMetric } from './components/CountUpMetric';
import { ProjectLightbox } from './components/ProjectLightbox';
import { SheetDrawer } from './components/SheetDrawer';

const NAV_ITEMS = [
  { label: 'Início', href: '#inicio' },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
];

const FILTER_CATEGORIES: ProjectCategory[] = ['Todos', 'Residencial', 'Comercial'];

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('Todos');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    typology: 'Residencial',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const contactNameInputRef = useRef<HTMLInputElement | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'Todos') return PORTFOLIO_PROJECTS;
    return PORTFOLIO_PROJECTS.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  const activeLightboxIndex = useMemo(() => {
    if (!selectedProjectId) return -1;
    return PORTFOLIO_PROJECTS.findIndex((item) => item.id === selectedProjectId);
  }, [selectedProjectId]);

  const activeLightboxProject: ArchitecturalProject | null =
    activeLightboxIndex >= 0 ? PORTFOLIO_PROJECTS[activeLightboxIndex] : null;

  const scrollToContact = (projectReference?: string) => {
    setMobileMenuOpen(false);
    setSelectedProjectId(null);

    if (projectReference) {
      setFormState((prev) => ({
        ...prev,
        message: `Gostaria de solicitar uma consultoria inicial com referência à obra "${projectReference}".`,
      }));
      setFormSubmitted(false);
    }

    const contactEl = document.getElementById('contato');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      window.setTimeout(() => {
        contactNameInputRef.current?.focus({ preventScroll: true });
      }, 450);
    }
  };

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  const handlePrevProject = () => {
    if (activeLightboxIndex < 0) return;
    const prevIdx =
      (activeLightboxIndex - 1 + PORTFOLIO_PROJECTS.length) % PORTFOLIO_PROJECTS.length;
    setSelectedProjectId(PORTFOLIO_PROJECTS[prevIdx].id);
  };

  const handleNextProject = () => {
    if (activeLightboxIndex < 0) return;
    const nextIdx = (activeLightboxIndex + 1) % PORTFOLIO_PROJECTS.length;
    setSelectedProjectId(PORTFOLIO_PROJECTS[nextIdx].id);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setFormError('Por favor, preencha nome completo, e-mail e o resumo do projeto.');
      return;
    }
    setFormError('');
    setFormSubmitted(true);
  };

  const whatsappDirectUrl = `https://wa.me/${CONTACT_INFO.phoneWhatsappDigits}?text=${encodeURIComponent(
    'Olá, gostaria de agendar uma conversa sobre um projeto com o escritório Alexandre - Arquitetura.'
  )}`;

  const heroStagger = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 22 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.72,
        delay: prefersReducedMotion ? 0 : index * 0.08,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-primary selection:text-primary-foreground">
      {/* Textura arquitetônica sutil sobre a tela */}
      <div
        className="pointer-events-none fixed inset-0 z-0 architectural-grain"
        aria-hidden="true"
      />

      {/* Barra Superior (3 zonas rígidas, altura compacta) */}
      <header className="sticky top-0 z-30 h-16 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-8">
          {/* Zona 1: Marca em linha única */}
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#inicio');
            }}
            className="font-display text-xl sm:text-2xl font-medium tracking-[-0.02em] text-foreground whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Alexandre - Arquitetura
          </a>

          {/* Zona 2: 4 links concisos de navegação */}
          <nav
            aria-label="Navegação principal"
            className="hidden md:flex items-center gap-8 text-sm text-muted"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="relative py-1 hover:text-foreground transition-colors whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-px after:bg-foreground after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zona 3: 1 ação primária */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => scrollToContact()}
              className="hidden md:inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 text-xs font-medium tracking-wide hover:bg-primary-hover transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span>Entrar em contato</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.5]" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Abrir menu de navegação"
              className="md:hidden inline-flex items-center justify-center w-11 h-11 border border-border text-foreground hover:bg-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Menu className="w-5 h-5 stroke-[1.5]" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Menu Mobile (Sheet / Drawer) */}
      <SheetDrawer
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        title="Navegação"
      >
        <nav aria-label="Menu móvel" className="flex flex-col space-y-5">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className="font-display text-2xl text-foreground hover:text-muted transition-colors py-1"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mt-10 pt-6 border-t border-border">
          <button
            type="button"
            onClick={() => scrollToContact()}
            className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3.5 text-sm font-medium hover:bg-primary-hover transition-colors whitespace-nowrap shrink-0"
          >
            <span>Entrar em contato</span>
            <ArrowUpRight className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
          </button>
        </div>
      </SheetDrawer>

      <main className="relative z-10">
        {/* SEÇÃO 1: INÍCIO (Hero Split + Projeto Autoral + Métricas) */}
        <section
          id="inicio"
          className="pt-10 pb-16 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-28 border-b border-border bg-mist-gradient"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Coluna Editorial Esquerda */}
              <div className="lg:col-span-5 flex flex-col justify-between py-2 lg:py-4">
                <div>
                  <motion.p
                    custom={0}
                    initial="hidden"
                    animate="visible"
                    variants={heroStagger}
                    className="text-xs sm:text-sm text-muted tracking-wide"
                  >
                    Arquitetura Autoral · Residencial &amp; Comercial
                  </motion.p>

                  <motion.h1
                    custom={1}
                    initial="hidden"
                    animate="visible"
                    variants={heroStagger}
                    className="mt-6 font-display font-normal text-foreground tracking-[-0.03em] leading-[0.96] text-balance"
                    style={{ fontSize: 'clamp(3rem, 5.4vw, 5.5rem)' }}
                  >
                    A matéria em silêncio constrói o espaço.
                  </motion.h1>

                  <motion.p
                    custom={2}
                    initial="hidden"
                    animate="visible"
                    variants={heroStagger}
                    className="mt-7 text-base sm:text-lg text-muted leading-relaxed max-w-md"
                  >
                    Projetos concebidos sob rigor estrutural, luz natural calibrada e permanência
                    material — do primeiro traço à entrega executiva.
                  </motion.p>
                </div>

                <motion.div
                  custom={3}
                  initial="hidden"
                  animate="visible"
                  variants={heroStagger}
                  className="mt-10 lg:mt-14 flex flex-wrap items-center gap-6"
                >
                  <button
                    type="button"
                    onClick={() => scrollToContact()}
                    className="inline-flex items-center justify-center gap-2.5 bg-primary text-primary-foreground px-7 py-4 text-sm font-medium tracking-wide hover:bg-primary-hover transition-colors shadow-card whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <span>Entrar em contato</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
                  </button>

                  <a
                    href="#portfolio"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('#portfolio');
                    }}
                    className="text-sm text-foreground hover:text-muted transition-colors py-2 border-b border-foreground/30 hover:border-foreground whitespace-nowrap shrink-0"
                  >
                    Explorar obras selecionadas
                  </a>
                </motion.div>
              </div>

              {/* Coluna Visual Direita: Projeto Autoral */}
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7"
              >
                <button
                  type="button"
                  onClick={() => setSelectedProjectId('pavilhao-mirante')}
                  aria-label="Ampliar fotografia e ficha técnica do projeto Pavilhão Mirante"
                  className="group relative w-full h-full min-h-[300px] sm:min-h-[420px] lg:min-h-[540px] block overflow-hidden border border-border bg-surface shadow-editorial text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <ArchitecturalImage
                    src={STUDIO_MEDIA.heroPavilion}
                    alt="Pavilhão Mirante: residência minimalista em concreto aparente sobre espelho d'água ao entardecer"
                    fallbackTitle="Pavilhão Mirante"
                    loading="eager"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  />

                  <div
                    className="absolute inset-0 bg-editorial-scrim pointer-events-none"
                    aria-hidden="true"
                  />

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 flex items-end justify-between gap-4 text-primary-foreground">
                    <div>
                      <p className="text-xs text-primary-foreground/80 tracking-wide tabular-nums">
                        Obra em destaque · 2025 · 680 m²
                      </p>
                      <h2 className="mt-1 font-display text-2xl sm:text-3xl tracking-tight">
                        Pavilhão Mirante
                      </h2>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-xs tracking-wide border border-primary-foreground/35 bg-primary/40 backdrop-blur-xs px-3 py-1.5 whitespace-nowrap shrink-0 group-hover:bg-primary group-hover:border-primary transition-colors">
                      <Expand className="w-3.5 h-3.5 stroke-[1.5]" aria-hidden="true" />
                      <span>Ver ficha</span>
                    </span>
                  </div>
                </button>
              </motion.div>
            </div>

            {/* Faixa de Métricas Arquitetônicas (Full-width abaixo do split) */}
            <div className="mt-14 pt-10 border-t border-border grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
              {STUDIO_METRICS.map((metric, idx) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.6,
                    delay: prefersReducedMotion ? 0 : idx * 0.08,
                    ease: 'easeOut',
                  }}
                  className="space-y-1.5"
                >
                  <div className="font-display text-4xl sm:text-5xl tracking-[-0.02em] text-foreground tabular-nums">
                    <CountUpMetric value={metric.value} suffix={metric.suffix} />
                  </div>
                  <p className="text-sm font-medium text-foreground">{metric.label}</p>
                  <p className="text-xs text-muted">{metric.context}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SEÇÃO 2: PORTFÓLIO (Residencial & Comercial + Galeria Interativa) */}
        <section id="portfolio" className="py-20 sm:py-28 lg:py-32 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-border"
            >
              <div className="max-w-2xl">
                <p className="text-xs sm:text-sm text-muted tracking-wide">
                  Acervo Técnico · 2023 — 2025
                </p>
                <h2 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl tracking-[-0.025em] text-foreground leading-[1.02] text-balance">
                  Portfólio Selecionado
                </h2>
                <p className="mt-4 text-base text-muted leading-relaxed">
                  Residências autorais e sedes corporativas onde proporção, concreto, pedra e luz
                  estabelecem diálogos duradouros com o entorno.
                </p>
              </div>

              {/* Controle de Filtro Interativo */}
              <div
                role="group"
                aria-label="Filtrar projetos por categoria"
                className="inline-flex items-center p-1 bg-surface border border-border self-start md:self-auto"
              >
                {FILTER_CATEGORIES.map((category) => {
                  const isActive = activeFilter === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveFilter(category)}
                      aria-pressed={isActive}
                      className={`px-4 py-2 text-xs font-medium tracking-wide transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-hairline'
                          : 'text-muted hover:text-foreground'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Grid Assimétrico de 12 Colunas */}
            <motion.div
              layout
              className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, idx) => {
                  // Distribuição assimétrica equilibrada em 12 colunas
                  let colSpanClass = 'md:col-span-6';
                  if (activeFilter === 'Todos') {
                    if (idx === 0) colSpanClass = 'md:col-span-7';
                    else if (idx === 1) colSpanClass = 'md:col-span-5';
                    else colSpanClass = 'md:col-span-4';
                  } else if (filteredProjects.length === 3 && idx === 0) {
                    colSpanClass = 'md:col-span-12 lg:col-span-6';
                  }

                  return (
                    <motion.article
                      layout
                      key={project.id}
                      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{
                        duration: 0.65,
                        delay: prefersReducedMotion ? 0 : Math.min(idx * 0.07, 0.28),
                        ease: 'easeOut',
                      }}
                      className={`${colSpanClass} group bg-surface-elevated border border-border shadow-card hover:shadow-editorial hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col`}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedProjectId(project.id)}
                        aria-label={`Abrir galeria do projeto ${project.title}`}
                        className="relative aspect-[4/3] w-full overflow-hidden bg-surface block text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <ArchitecturalImage
                          src={project.image}
                          alt={project.imageAlt}
                          fallbackTitle={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-primary/85 text-primary-foreground px-3 py-1.5 text-xs inline-flex items-center gap-1.5 backdrop-blur-xs">
                          <Expand className="w-3.5 h-3.5 stroke-[1.5]" aria-hidden="true" />
                          <span>Ampliar obra</span>
                        </div>
                      </button>

                      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between gap-6">
                        <div>
                          {/* Metadados limpos sem pílulas */}
                          <div className="flex flex-wrap items-center gap-2 text-xs text-muted tabular-nums">
                            <span>{project.category}</span>
                            <span aria-hidden="true">·</span>
                            <span>{project.year}</span>
                            <span aria-hidden="true">·</span>
                            <span>{project.area}</span>
                            <span aria-hidden="true">·</span>
                            <span>{project.location}</span>
                          </div>

                          <h3 className="mt-2.5 font-display text-2xl sm:text-3xl tracking-[-0.015em] text-foreground">
                            {project.title}
                          </h3>

                          <p className="mt-3 text-sm text-muted leading-relaxed">
                            {project.summary}
                          </p>
                        </div>

                        <div className="pt-5 border-t border-border flex items-center justify-between gap-4">
                          <button
                            type="button"
                            onClick={() => setSelectedProjectId(project.id)}
                            className="text-xs font-medium text-foreground hover:text-muted transition-colors whitespace-nowrap shrink-0"
                          >
                            Ver memorial e fotos
                          </button>

                          <button
                            type="button"
                            onClick={() => scrollToContact(project.title)}
                            className="inline-flex items-center gap-1 text-xs font-medium text-foreground hover:text-muted transition-colors whitespace-nowrap shrink-0"
                          >
                            <span>Entrar em contato</span>
                            <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.5]" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* SEÇÃO 3: SOBRE (Visão Estética + Processo Criativo) */}
        <section
          id="sobre"
          className="py-20 sm:py-28 lg:py-32 bg-surface border-y border-border"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Retrato Editorial */}
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="lg:col-span-5 lg:sticky lg:top-24"
              >
                <div className="border border-border bg-surface-elevated p-3 shadow-card">
                  <div className="aspect-[3/4] overflow-hidden bg-surface">
                    <ArchitecturalImage
                      src={STUDIO_MEDIA.architectPortrait}
                      alt="Retrato de Alexandre em seu estúdio de arquitetura diante de maquete volumétrica em madeira"
                      fallbackTitle="Alexandre · Arquiteto Titular"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-muted">
                  <span className="font-medium text-foreground">Alexandre · Arquiteto Titular</span>
                  <span>São Paulo · Brasil</span>
                </div>
              </motion.div>

              {/* Visão Estética & Processo Criativo */}
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                  <p className="text-xs sm:text-sm text-muted tracking-wide">
                    Sobre o Escritório · Visão Estética
                  </p>
                  <h2 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl tracking-[-0.025em] text-foreground leading-[1.03] text-balance">
                    Arquitetura como síntese permanente entre estrutura e silêncio.
                  </h2>

                  <div className="mt-8 space-y-5 text-base text-muted leading-relaxed max-w-2xl">
                    <p>
                      Fundado com o propósito de devolver calma e rigor técnico ao espaço construído,
                      o estúdio <strong className="font-medium text-foreground">Alexandre - Arquitetura</strong>{' '}
                      desenvolve projetos residenciais e corporativos em que cada linha cumpre uma
                      função estrutural ou luminosa precisa.
                    </p>
                    <p>
                      Rejeitamos o excesso ornamental em favor da honestidade dos materiais: concreto
                      aparente de fôrma limpa, pedras naturais sem polimento artificial, madeiras
                      certificadas e grandes vãos que privilegiam ventilação cruzada e insolação
                      inteligente.
                    </p>
                  </div>
                </motion.div>

                {/* Processo Criativo em 4 Etapas Editoriais */}
                <div className="mt-14 pt-12 border-t border-border">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                    <div>
                      <p className="text-xs text-muted tracking-wide">Metodologia de Trabalho</p>
                      <h3 className="mt-1.5 font-display text-3xl sm:text-4xl tracking-[-0.02em] text-foreground">
                        Processo Criativo
                      </h3>
                    </div>
                    <p className="text-xs text-muted">Do levantamento físico à fiscalização da obra</p>
                  </div>

                  <div className="divide-y divide-border border-y border-border">
                    {CREATIVE_PROCESS.map((step, idx) => (
                      <motion.div
                        key={step.number}
                        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{
                          duration: 0.6,
                          delay: prefersReducedMotion ? 0 : idx * 0.08,
                          ease: 'easeOut',
                        }}
                        className="py-7 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 items-start"
                      >
                        <div className="sm:col-span-2 font-display text-3xl text-muted tabular-nums">
                          {step.number}.
                        </div>
                        <div className="sm:col-span-10">
                          <h4 className="font-display text-2xl text-foreground tracking-tight">
                            {step.title}
                          </h4>
                          <p className="mt-2 text-sm text-muted leading-relaxed">
                            {step.description}
                          </p>
                          <p className="mt-3 text-xs text-foreground/80">
                            Entrega: {step.deliverable}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-10">
                    <button
                      type="button"
                      onClick={() => scrollToContact()}
                      className="inline-flex items-center gap-2.5 bg-primary text-primary-foreground px-7 py-4 text-sm font-medium tracking-wide hover:bg-primary-hover transition-colors shadow-card whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <span>Entrar em contato</span>
                      <ArrowUpRight className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO 4: CONTATO (Dark Architectural Contrast + Formulário + Dados) */}
        <section
          id="contato"
          className="pt-20 pb-12 sm:pt-28 sm:pb-14 bg-architectural-gradient text-primary-foreground"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-16 sm:pb-24">
              {/* Coluna Esquerda: Convite e Informações de Contato */}
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="lg:col-span-5 space-y-10"
              >
                <div>
                  <p className="text-xs sm:text-sm text-muted-on-dark tracking-wide">
                    Atendimento sob agendamento · Novos Projetos
                  </p>
                  <h2 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl tracking-[-0.025em] leading-[1.02] text-balance">
                    Inicie seu Projeto
                  </h2>
                  <p className="mt-5 text-base text-muted-on-dark leading-relaxed max-w-md">
                    Compartilhe a localização, metragem estimada e os objetivos do seu empreendimento.
                    Retornamos com proposta metodológica e agendamento de reunião preliminar.
                  </p>
                </div>

                <div className="pt-8 border-t border-border-on-dark space-y-6 text-sm">
                  <div className="flex items-start gap-4">
                    <MapPin
                      className="w-4 h-4 stroke-[1.5] text-muted-on-dark mt-1 shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-xs text-muted-on-dark">Endereço do Estúdio</p>
                      <p className="mt-0.5 text-primary-foreground font-medium">
                        {CONTACT_INFO.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone
                      className="w-4 h-4 stroke-[1.5] text-muted-on-dark mt-1 shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-xs text-muted-on-dark">Telefone e WhatsApp</p>
                      <a
                        href={whatsappDirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-0.5 inline-block text-primary-foreground font-medium tabular-nums hover:underline underline-offset-4"
                      >
                        {CONTACT_INFO.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock
                      className="w-4 h-4 stroke-[1.5] text-muted-on-dark mt-1 shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-xs text-muted-on-dark">Horário de Atendimento</p>
                      <p className="mt-0.5 text-primary-foreground font-medium">
                        {CONTACT_INFO.hours}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Coluna Direita: Formulário de Briefing Arquitetônico */}
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
                className="lg:col-span-7 bg-primary/45 border border-border-on-dark p-6 sm:p-10"
              >
                {formSubmitted ? (
                  <div className="py-10 space-y-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 border border-primary-foreground/30 text-primary-foreground">
                      <Check className="w-5 h-5 stroke-[1.5]" aria-hidden="true" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-display text-3xl tracking-tight text-primary-foreground">
                        Solicitação registrada com sucesso.
                      </h3>
                      <p className="text-sm text-muted-on-dark leading-relaxed max-w-lg">
                        Agradecemos o contato, {formState.name}. Nossa equipe analisará as
                        informações enviadas para o projeto de tipologia{' '}
                        <strong className="text-primary-foreground font-medium">
                          {formState.typology}
                        </strong>{' '}
                        e retornará em breve.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <a
                        href={`https://wa.me/${CONTACT_INFO.phoneWhatsappDigits}?text=${encodeURIComponent(
                          `Olá, sou ${formState.name}. Enviei um briefing pelo site para um projeto ${formState.typology}: ${formState.message}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-6 py-3.5 text-sm font-medium hover:bg-secondary transition-colors whitespace-nowrap shrink-0"
                      >
                        <span>Prosseguir pelo WhatsApp</span>
                        <ArrowUpRight className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          setFormSubmitted(false);
                          setFormState({
                            name: '',
                            email: '',
                            phone: '',
                            typology: 'Residencial',
                            message: '',
                          });
                        }}
                        className="text-xs text-muted-on-dark hover:text-primary-foreground transition-colors py-2"
                      >
                        Enviar nova solicitação
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} noValidate className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-xs text-muted-on-dark mb-2"
                        >
                          Nome completo
                        </label>
                        <input
                          ref={contactNameInputRef}
                          id="contact-name"
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) =>
                            setFormState((prev) => ({ ...prev, name: e.target.value }))
                          }
                          placeholder="Seu nome"
                          className="w-full bg-transparent border-b border-border-on-dark py-3 text-sm text-primary-foreground placeholder:text-muted-on-dark/50 focus:outline-none focus:border-primary-foreground transition-colors"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs text-muted-on-dark mb-2"
                        >
                          E-mail corporativo ou pessoal
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) =>
                            setFormState((prev) => ({ ...prev, email: e.target.value }))
                          }
                          placeholder="nome@dominio.com.br"
                          className="w-full bg-transparent border-b border-border-on-dark py-3 text-sm text-primary-foreground placeholder:text-muted-on-dark/50 focus:outline-none focus:border-primary-foreground transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="block text-xs text-muted-on-dark mb-2"
                        >
                          Telefone / WhatsApp
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          value={formState.phone}
                          onChange={(e) =>
                            setFormState((prev) => ({ ...prev, phone: e.target.value }))
                          }
                          placeholder="(00) 00000-0000"
                          className="w-full bg-transparent border-b border-border-on-dark py-3 text-sm text-primary-foreground placeholder:text-muted-on-dark/50 focus:outline-none focus:border-primary-foreground transition-colors tabular-nums"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-typology"
                          className="block text-xs text-muted-on-dark mb-2"
                        >
                          Tipologia do projeto
                        </label>
                        <select
                          id="contact-typology"
                          value={formState.typology}
                          onChange={(e) =>
                            setFormState((prev) => ({ ...prev, typology: e.target.value }))
                          }
                          className="w-full bg-primary border-b border-border-on-dark py-3 text-sm text-primary-foreground focus:outline-none focus:border-primary-foreground transition-colors"
                        >
                          <option value="Residencial">Residencial</option>
                          <option value="Comercial">Comercial</option>
                          <option value="Arquitetura de Interiores">Arquitetura de Interiores</option>
                          <option value="Consultoria Técnica">Consultoria Técnica</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs text-muted-on-dark mb-2"
                      >
                        Escopo, localização e prazo desejado
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        required
                        value={formState.message}
                        onChange={(e) =>
                          setFormState((prev) => ({ ...prev, message: e.target.value }))
                        }
                        placeholder="Descreva brevemente o terreno, imóvel ou programa arquitetônico."
                        className="w-full bg-transparent border-b border-border-on-dark py-3 text-sm text-primary-foreground placeholder:text-muted-on-dark/50 focus:outline-none focus:border-primary-foreground transition-colors resize-none"
                      />
                    </div>

                    {formError && (
                      <p role="alert" className="text-xs text-primary-foreground underline underline-offset-4">
                        {formError}
                      </p>
                    )}

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2.5 bg-primary-foreground text-primary px-7 py-4 text-sm font-medium tracking-wide hover:bg-secondary transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground"
                      >
                        <span>Entrar em contato</span>
                        <ArrowUpRight className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
                      </button>

                      <span className="text-xs text-muted-on-dark">
                        Atendimento direto pelo escritório
                      </span>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>

            {/* Rodapé Editorial */}
            <footer className="pt-8 border-t border-border-on-dark flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-muted-on-dark">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-display text-base text-primary-foreground">
                  Alexandre - Arquitetura
                </span>
                <span aria-hidden="true">·</span>
                <span>© {new Date().getFullYear()} Todos os direitos reservados</span>
              </div>

              <div className="flex items-center gap-6">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="hover:text-primary-foreground transition-colors whitespace-nowrap shrink-0"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </footer>
          </div>
        </section>
      </main>

      {/* Lightbox da Galeria de Fotos */}
      <ProjectLightbox
        project={activeLightboxProject}
        onClose={() => setSelectedProjectId(null)}
        onPrev={handlePrevProject}
        onNext={handleNextProject}
        onContactProject={(projectTitle) => scrollToContact(projectTitle)}
        currentIndex={activeLightboxIndex}
        totalCount={PORTFOLIO_PROJECTS.length}
      />

      {/* Botão WhatsApp Flutuante Fixo (bottom-right) */}
      <a
        href={whatsappDirectUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Entrar em contato via WhatsApp pelo telefone (00) 00000-0000"
        title="Conversar pelo WhatsApp: (00) 00000-0000"
        className="fixed bottom-5 right-5 z-40 group inline-flex items-center justify-center w-12 h-12 rounded-full bg-whatsapp text-whatsapp-foreground shadow-float hover:scale-105 transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <span
          className="absolute inset-0 rounded-full bg-whatsapp animate-whatsapp-pulse pointer-events-none"
          aria-hidden="true"
        />
        <MessageCircle className="relative w-5 h-5 stroke-[1.75]" aria-hidden="true" />
      </a>
    </div>
  );
}
