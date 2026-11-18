import heroPavilionImg from '../assets/images/hero_pavilion_concrete_1795000792615.jpg';
import residenciaHorizonteImg from '../assets/images/project_residencia_horizonte_1795000793187.jpg';
import galeriaAtrioImg from '../assets/images/project_galeria_atrio_1795000793374.jpg';
import casaVazioImg from '../assets/images/project_casa_vazio_1795000793655.jpg';
import sedeMonolitoImg from '../assets/images/project_sede_monolito_1795000794362.jpg';
import alexandrePortraitImg from '../assets/images/architect_portrait_alexandre_1795000795001.jpg';
import type { ArchitecturalProject, ProcessStep, StudioMetric } from '../types';

export const STUDIO_MEDIA = {
  heroPavilion: heroPavilionImg,
  architectPortrait: alexandrePortraitImg,
};

export const STUDIO_METRICS: StudioMetric[] = [
  {
    value: 42,
    suffix: '+',
    label: 'Obras executadas',
    context: 'Residências e sedes autorais',
  },
  {
    value: 14,
    suffix: '',
    label: 'Anos de prática',
    context: 'Arquitetura e design estrutural',
  },
  {
    value: 28500,
    suffix: ' m²',
    label: 'Área projetada',
    context: 'Precisão do estudo à entrega',
  },
  {
    value: 9,
    suffix: '',
    label: 'Publicações',
    context: 'Anuários e mostras de design',
  },
];

export const PORTFOLIO_PROJECTS: ArchitecturalProject[] = [
  {
    id: 'pavilhao-mirante',
    title: 'Pavilhão Mirante',
    category: 'Residencial',
    year: '2025',
    area: '680 m²',
    location: 'Costa Atlântica',
    image: heroPavilionImg,
    imageAlt:
      'Pavilhão residencial minimalista em concreto aparente com cobertura em balanço sobre espelho d’água ao entardecer',
    summary:
      'Cobertura monolítica em balanço de 7 metros flutua sobre o espelho d’água, dissolvendo o limite entre o interior em freijó e a paisagem costeira.',
    concept:
      'Concebido como um observatório horizontal, o Pavilhão Mirante apoia uma laje protendida de concreto ripado sobre apenas dois núcleos estruturais. As esquadrias piso-teto recolhem-se integralmente, transformando o estar em varanda contínua.',
    materials: ['Concreto aparente ripado', 'Madeira freijó', 'Vidro estrutural extra-clear', 'Pedra basalto'],
    featured: true,
  },
  {
    id: 'residencia-horizonte',
    title: 'Residência Horizonte',
    category: 'Residencial',
    year: '2024',
    area: '540 m²',
    location: 'Jardins · São Paulo',
    image: residenciaHorizonteImg,
    imageAlt:
      'Fachada interna de residência contemporânea em concreto e travertino romano voltada para pátio ajardinado',
    summary:
      'Dois volumes em L articulados em torno de um pátio silencioso, onde o travertino bruto filtra a luz da manhã e preserva a privacidade urbana.',
    concept:
      'Diante de um lote urbano adensado, a implantação volta-se para o próprio centro. O espelho d’água perimetral promove resfriamento evaporativo natural enquanto guia o percurso entre a galeria social e os dormitórios.',
    materials: ['Travertino romano bruto', 'Concreto armado', 'Carvalho europeu', 'Basalto levigado'],
  },
  {
    id: 'galeria-atrio',
    title: 'Galeria Átrio',
    category: 'Comercial',
    year: '2024',
    area: '1.120 m²',
    location: 'Pinheiros · São Paulo',
    image: galeriaAtrioImg,
    imageAlt:
      'Galeria e sede corporativa minimalista com pé-direito duplo, pilares rítmicos de concreto e recepção monolítica em pedra calcária',
    summary:
      'Sede institucional e espaço expositivo organizados por um eixo zenital de concreto que ordena a luz natural ao longo do dia.',
    concept:
      'O programa comercial foi tratado com rigor museológico: circulação ampla sobre piso de ardósia escovada, balcão monolítico esculpido em bloco único de calcário e acústica calibrada por painéis ocultos.',
    materials: ['Calcário monolítico', 'Ardósia natural', 'Concreto arquitetônico', 'Aço escovado'],
    featured: true,
  },
  {
    id: 'casa-vazio',
    title: 'Casa do Vazio',
    category: 'Residencial',
    year: '2023',
    area: '430 m²',
    location: 'Vila Nova Conceição',
    image: casaVazioImg,
    imageAlt:
      'Sala de estar com pé-direito duplo, painéis em carvalho, parede em pedra travertino e cortinas de linho com luz difusa',
    summary:
      'Interiores de escala generosa onde o pé-direito duplo, a marcenaria em carvalho contínuo e a pedra natural criam atmosfera de permanência.',
    concept:
      'A proposta elimina ornamentos superficiais para evidenciar a proporção do vazio. A luz lateral filtrada por linho natural revela a textura porosa do travertino e aquece a paleta neutra ao longo das estações.',
    materials: ['Carvalho natural', 'Travertino navona', 'Cimento queimado mineral', 'Linho belga'],
  },
  {
    id: 'sede-monolito',
    title: 'Estúdio Monólito',
    category: 'Comercial',
    year: '2023',
    area: '890 m²',
    location: 'Itaim Bibi · São Paulo',
    image: sedeMonolitoImg,
    imageAlt:
      'Edifício comercial contemporâneo com fachada em aço anodizado escuro, vidro estrutural e praça de acesso em basalto',
    summary:
      'Edifício boutique com fachada modulada em aço anodizado e brises de madeira termotratada sobre uma praça de acesso aberta à cidade.',
    concept:
      'Pensado para integrar ambiente de trabalho e galeria térrea, o recuo frontal cria um banco de concreto que convida o pedestre à pausa, protegendo o pavimento superior da insolação oeste com precisão técnica.',
    materials: ['Aço anodizado grafite', 'Vidro insulado', 'Madeira termotratada', 'Basalto serrado'],
  },
];

export const CREATIVE_PROCESS: ProcessStep[] = [
  {
    number: '01',
    title: 'Diagnóstico e Implantação',
    description:
      'Leitura minuciosa do terreno, orientação solar, ventilação cruzada e restrições legais para fundamentar cada decisão volumétrica.',
    deliverable: 'Estudo de viabilidade e partido arquitetônico',
  },
  {
    number: '02',
    title: 'Conceito e Volumetria',
    description:
      'Desenvolvimento de maquetes físicas, estudos de proporção áurea e definição da honestidade estrutural entre vãos, cheios e vazios.',
    deliverable: 'Anteprojeto tridimensional e caderno material',
  },
  {
    number: '03',
    title: 'Detalhamento Executivo',
    description:
      'Compatibilização integral com engenharia estrutural, luminotécnica arquitetônica, acústica e marcenaria autoral desenhada sob medida.',
    deliverable: 'Projeto executivo completo e especificações',
  },
  {
    number: '04',
    title: 'Acompanhamento de Obra',
    description:
      'Curadoria de fornecedores e visitas técnicas programadas para assegurar fidelidade absoluta ao desenho original até a entrega final.',
    deliverable: 'Fiscalização estética e controle executivo',
  },
];

export const CONTACT_INFO = {
  brandName: 'Alexandre - Arquitetura',
  address: 'SEU ENDEREÇO AQUI',
  phoneDisplay: '(00) 00000-0000',
  phoneWhatsappDigits: '5500000000000',
  hours: 'Não informado',
};
