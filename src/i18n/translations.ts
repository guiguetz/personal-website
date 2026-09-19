export type Locale = 'pt' | 'en';

const pt = {
  a11y: {
    toggleTheme: 'Alternar tema',
    switchLanguage: 'Mudar para inglês',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
  },
  sidebar: {
    role: 'Front-end / Mobile Sênior',
    tagline: 'Construo produtos financeiros e logísticos usados por milhões de pessoas.',
    location: 'São Vicente, SP · Remoto',
    download: 'Baixar currículo',
  },
  nav: {
    about: 'Sobre',
    impact: 'Impacto',
    experience: 'Experiência',
    skills: 'Competências',
    projects: 'Projetos',
    contact: 'Contato',
  },
  hero: {
    availability: 'Disponível para oportunidades',
    titleLine1: 'Construo produtos digitais',
    titleLine2: 'usados por milhões',
    paragraph:
      'Desenvolvedor Front-end / Mobile Sênior com mais de 10 anos de experiência. Combino React, React Native e IA generativa aplicada a UI para transformar rollout de dias em minutos.',
    download: 'Baixar currículo',
    contact: 'Fale comigo',
    highlights: [
      { value: 'R$ 1,57 bi+', label: 'originados' },
      { value: '900 mil+', label: 'usuários' },
      { value: '6 devs', label: 'liderados' },
    ],
  },
  about: {
    title: 'Sobre mim',
    description:
      'Mais de 10 anos construindo produtos digitais de alto impacto para os setores financeiro, logístico e de saúde.',
    paragraph:
      'Minha trajetória inclui liderança de equipes técnicas, migração de sistemas legados para stacks modernas e a criação de produtos que impactam milhões de usuários — sempre com foco em performance, acessibilidade e resultados de negócio.',
    pillars: [
      {
        title: 'Especialista em Front-end',
        detail: 'React, React Native, Next.js, TypeScript',
      },
      {
        title: 'Arquitetura escalável',
        detail: 'Design Systems, performance, micro-frontends',
      },
      { title: 'Liderança técnica', detail: 'Mentoria, code review, Agile/Scrum' },
      { title: 'Mobile & cross-platform', detail: 'React Native, Expo, Redux, Jest, RTL' },
      { title: 'Backend & dados', detail: 'Node.js, GraphQL, Firebase, MongoDB' },
      { title: 'DevOps & ferramentas', detail: 'Git, Docker, Azure DevOps, Vite, Nx' },
    ],
  },
  impact: {
    title: 'Impacto em números',
    description: 'Resultados mensuráveis dos produtos que desenvolvi e liderei.',
    metrics: [
      { label: 'Originação anual', value: 'R$ 1,57 bi+', note: 'Consignado Privado CLT' },
      { label: 'Usuários impactados', value: '900 mil+', note: 'Setor financeiro' },
      { label: 'Equipe liderada', value: '6 devs', note: 'Liderança técnica e mentoria' },
      { label: 'Tempo de rollout', value: '6 dias → min', note: 'Plataforma MCP + IA generativa' },
    ],
  },
  experience: {
    title: 'Experiência profissional',
    description: 'Minha trajetória profissional, com foco em resultados e tecnologias aplicadas.',
    items: [
      {
        position: 'Desenvolvedor Front-end Sênior',
        period: 'Jul 2023 — Presente',
        location: 'Remoto',
        description:
          'Soluções mobile para o setor financeiro (React Native, TypeScript, Redux, Jest, RTL); fluxos transacionais do Consignado Privado CLT (900 mil+ usuários, R$ 1,57 bi+ em 2025); liderança técnica dos fluxos de autorização/validação de cartão do Pix Parcelado (BaaS Dock); idealização de plataforma de geração dinâmica de telas via protocolo MCP do Figma + APIs da Anthropic (Claude) para UI aderente a design tokens e guard rails; arquitetura de atualização de telas em tempo real sem publicação em loja.',
      },
      {
        position: 'Team Lead / Dev Front-end',
        period: 'Fev 2021 — Jul 2023',
        location: 'Santos, SP',
        description:
          'Liderança de 6 devs em ecossistema com 12+ soluções logísticas (Porto de Santos); migração de Angular 6 para React (TypeScript, Vite, Tailwind, RTL, Cypress); mentoria e code review; representação da empresa no Web Summit Lisboa 2022.',
      },
      {
        position: 'Consultor / Dev Front-end',
        period: 'Out 2020 — Fev 2021',
        location: 'Santos, SP',
        description:
          'Plataforma para construção civil (React, styled-components, Materialize); Figma → produção; projeto que originou a startup Hexagon Pro (depois HX-TOS, selecionada pelo Cubo Itaú).',
      },
      {
        position: 'Consultor de Front-end',
        period: 'Jul — Out 2020',
        location: 'Santos, SP',
        description:
          'Backoffice de entregas (Next.js, styled-components); integração em tempo real; operação presente em 30+ municípios, 1 milhão+ de entregas.',
      },
      {
        position: 'Dev Front-end',
        period: 'Dez 2019 — Jul 2020',
        location: 'São Paulo, SP',
        description:
          'Único dev front-end da equipe mobile (React Native, Redux); app de monitoramento de motoristas com geolocalização; portal de leilão de frete.',
      },
      {
        position: 'Estagiário → Jr → Pleno',
        period: 'Jul 2018 — Dez 2019',
        location: 'Santos, SP',
        description:
          'Angular/AngularJS/Python; sistema de monitoramento para o Porto de Santos; app hospitalar com 20 mil+ downloads; mentoria técnica.',
      },
    ],
    extraToggle: 'Experiência adicional (2014 — 2018)',
    extraText: 'Projetos com PHP (Zend), WordPress, Joomla, SEO, Photoshop e Mailchimp.',
  },
  skills: {
    title: 'Competências técnicas',
    description: 'Tecnologias que domino, agrupadas por área de atuação.',
    primaryLabel: 'Principal',
    categories: [
      {
        category: 'Frontend',
        main: 'React',
        items: ['React Native', 'Next.js', 'TypeScript', 'JavaScript', 'Angular', 'HTML5', 'CSS3'],
      },
      {
        category: 'Gerenciamento de Estado',
        main: 'Redux',
        items: ['Redux Saga', 'Redux Thunk', 'Context API'],
      },
      {
        category: 'UI & Design Systems',
        main: 'Tailwind CSS',
        items: ['Styled Components', 'Framer Motion', 'Material UI', 'Design Systems', 'Figma'],
      },
      { category: 'Testes', main: 'Jest', items: ['React Testing Library', 'Cypress'] },
      { category: 'Backend & Dados', main: 'Node.js', items: ['GraphQL', 'Firebase', 'MongoDB'] },
      {
        category: 'DevOps & Ferramentas',
        main: 'Git',
        items: ['Azure DevOps', 'Docker', 'Linux/Unix', 'Vite', 'Lerna', 'Nx', 'TurboRepo'],
      },
      {
        category: 'Liderança',
        main: 'Mentoria Técnica',
        items: ['Arquitetura Front-end', 'Code Review', 'Agile/Scrum'],
      },
    ],
  },
  caseStudy: {
    title: 'Destaque: IA Generativa',
    description:
      'O projeto mais desafiador da minha carreira — unindo design, IA e engenharia de plataforma.',
    headline: 'Plataforma de geração dinâmica de interfaces',
    subtitle: 'Reduzindo o rollout de dias para minutos com atualização em tempo real',
    steps: [
      {
        label: 'Problema',
        text: 'Atualizações de UI exigiam publicação nas lojas, levando até 6 dias para chegar ao usuário — um gargalo para correções críticas, testes A/B e personalização em tempo real.',
      },
      {
        label: 'Solução',
        text: 'Uma plataforma que usa o protocolo MCP (Model Context Protocol) do Figma para extrair design tokens e componentes, combinado com APIs da Anthropic (Claude) para gerar variações de UI aderentes aos guard rails da marca.',
      },
      {
        label: 'Resultado',
        text: 'Interfaces renderizadas em tempo real no app via bridge nativa, sem publicação na loja — reduzindo o rollout de dias para minutos em um produto com 900 mil+ usuários.',
      },
    ],
    cta: 'Ver detalhes do case',
  },
  contact: {
    title: 'Contato',
    description:
      'Aberto a oportunidades como Front-end / Mobile Sênior ou Tech Lead. Vamos conversar?',
    locationLine: 'São Vicente, SP · Disponível para trabalho remoto',
    channels: {
      email: 'E-mail',
      phone: 'Telefone / WhatsApp',
      linkedin: 'LinkedIn',
      github: 'GitHub',
    },
    download: 'Baixar currículo (PDF)',
    formTitle: 'Envie uma mensagem',
    name: 'Nome',
    email: 'E-mail',
    message: 'Mensagem',
    namePlaceholder: 'Seu nome',
    emailPlaceholder: 'seu@email.com',
    messagePlaceholder: 'Como posso ajudar?',
    submit: 'Enviar mensagem',
  },
  footer: {
    builtWith:
      'Construído com React, TypeScript, Tailwind CSS e Framer Motion. Design inspirado em portfolios de alta performance.',
    rights: 'Todos os direitos reservados.',
  },
};

export type Dictionary = typeof pt;

const en: Dictionary = {
  a11y: {
    toggleTheme: 'Toggle theme',
    switchLanguage: 'Switch to Portuguese',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  sidebar: {
    role: 'Senior Front-end / Mobile Engineer',
    tagline: 'I build financial and logistics products used by millions of people.',
    location: 'São Vicente, SP · Remote',
    download: 'Download résumé',
  },
  nav: {
    about: 'About',
    impact: 'Impact',
    experience: 'Experience',
    skills: 'Skills',
    projects: 'Projects',
    contact: 'Contact',
  },
  hero: {
    availability: 'Open to opportunities',
    titleLine1: 'I build digital products',
    titleLine2: 'used by millions',
    paragraph:
      'Senior Front-end / Mobile engineer with 10+ years of experience. I combine React, React Native and generative AI applied to UI to turn rollouts from days into minutes.',
    download: 'Download résumé',
    contact: 'Get in touch',
    highlights: [
      { value: 'R$ 1.57bn+', label: 'originated' },
      { value: '900k+', label: 'users' },
      { value: '6 devs', label: 'led' },
    ],
  },
  about: {
    title: 'About me',
    description:
      'Over 10 years building high-impact digital products for the financial, logistics and healthcare sectors.',
    paragraph:
      'My journey includes leading technical teams, migrating legacy systems to modern stacks, and building products that impact millions of users — always focused on performance, accessibility and business results.',
    pillars: [
      { title: 'Front-end specialist', detail: 'React, React Native, Next.js, TypeScript' },
      { title: 'Scalable architecture', detail: 'Design Systems, performance, micro-frontends' },
      { title: 'Technical leadership', detail: 'Mentoring, code review, Agile/Scrum' },
      { title: 'Mobile & cross-platform', detail: 'React Native, Expo, Redux, Jest, RTL' },
      { title: 'Backend & data', detail: 'Node.js, GraphQL, Firebase, MongoDB' },
      { title: 'DevOps & tooling', detail: 'Git, Docker, Azure DevOps, Vite, Nx' },
    ],
  },
  impact: {
    title: 'Impact in numbers',
    description: 'Measurable results from the products I built and led.',
    metrics: [
      { label: 'Annual origination', value: 'R$ 1.57bn+', note: 'Private payroll loan (CLT)' },
      { label: 'Users impacted', value: '900k+', note: 'Financial sector' },
      { label: 'Team led', value: '6 devs', note: 'Technical leadership and mentoring' },
      { label: 'Rollout time', value: '6 days → min', note: 'MCP + generative AI platform' },
    ],
  },
  experience: {
    title: 'Professional experience',
    description: 'My professional journey, focused on results and applied technologies.',
    items: [
      {
        position: 'Senior Front-end Developer',
        period: 'Jul 2023 — Present',
        location: 'Remote',
        description:
          'Mobile solutions for the financial sector (React Native, TypeScript, Redux, Jest, RTL); transactional flows for the Private Payroll Loan (900k+ users, R$ 1.57bn+ in 2025); technical leadership of the card authorization/validation flows for Pix Installments (Dock BaaS); conceived a platform for dynamic screen generation using Figma’s MCP protocol + Anthropic (Claude) APIs for UI compliant with design tokens and guard rails; architecture for real-time screen updates without store releases.',
      },
      {
        position: 'Team Lead / Front-end Dev',
        period: 'Feb 2021 — Jul 2023',
        location: 'Santos, SP',
        description:
          'Led 6 devs across an ecosystem of 12+ logistics solutions (Port of Santos); migrated Angular 6 to React (TypeScript, Vite, Tailwind, RTL, Cypress); mentoring and code review; represented the company at Web Summit Lisbon 2022.',
      },
      {
        position: 'Consultant / Front-end Dev',
        period: 'Oct 2020 — Feb 2021',
        location: 'Santos, SP',
        description:
          'Platform for the construction industry (React, styled-components, Materialize); Figma → production; the project that originated the startup Hexagon Pro (later HX-TOS, selected by Cubo Itaú).',
      },
      {
        position: 'Front-end Consultant',
        period: 'Jul — Oct 2020',
        location: 'Santos, SP',
        description:
          'Delivery backoffice (Next.js, styled-components); real-time integration; operation across 30+ municipalities, 1 million+ deliveries.',
      },
      {
        position: 'Front-end Dev',
        period: 'Dec 2019 — Jul 2020',
        location: 'São Paulo, SP',
        description:
          'Sole front-end dev on the mobile team (React Native, Redux); driver monitoring app with geolocation; freight auction portal.',
      },
      {
        position: 'Intern → Jr → Mid-level',
        period: 'Jul 2018 — Dec 2019',
        location: 'Santos, SP',
        description:
          'Angular/AngularJS/Python; monitoring system for the Port of Santos; healthcare app with 20k+ downloads; technical mentoring.',
      },
    ],
    extraToggle: 'Additional experience (2014 — 2018)',
    extraText: 'Projects with PHP (Zend), WordPress, Joomla, SEO, Photoshop and Mailchimp.',
  },
  skills: {
    title: 'Technical skills',
    description: 'Technologies I master, grouped by area of expertise.',
    primaryLabel: 'Primary',
    categories: [
      {
        category: 'Frontend',
        main: 'React',
        items: ['React Native', 'Next.js', 'TypeScript', 'JavaScript', 'Angular', 'HTML5', 'CSS3'],
      },
      {
        category: 'State Management',
        main: 'Redux',
        items: ['Redux Saga', 'Redux Thunk', 'Context API'],
      },
      {
        category: 'UI & Design Systems',
        main: 'Tailwind CSS',
        items: ['Styled Components', 'Framer Motion', 'Material UI', 'Design Systems', 'Figma'],
      },
      { category: 'Testing', main: 'Jest', items: ['React Testing Library', 'Cypress'] },
      { category: 'Backend & Data', main: 'Node.js', items: ['GraphQL', 'Firebase', 'MongoDB'] },
      {
        category: 'DevOps & Tooling',
        main: 'Git',
        items: ['Azure DevOps', 'Docker', 'Linux/Unix', 'Vite', 'Lerna', 'Nx', 'TurboRepo'],
      },
      {
        category: 'Leadership',
        main: 'Technical Mentoring',
        items: ['Front-end Architecture', 'Code Review', 'Agile/Scrum'],
      },
    ],
  },
  caseStudy: {
    title: 'Highlight: Generative AI',
    description:
      'The most challenging project of my career — combining design, AI and platform engineering.',
    headline: 'Dynamic UI generation platform',
    subtitle: 'Cutting rollout from days to minutes with real-time updates',
    steps: [
      {
        label: 'Problem',
        text: 'UI updates required publishing to the app stores, taking up to 6 days to reach users — a bottleneck for critical fixes, A/B tests and real-time personalization.',
      },
      {
        label: 'Solution',
        text: 'A platform that uses Figma’s MCP (Model Context Protocol) to extract design tokens and components, combined with Anthropic (Claude) APIs to generate UI variations that comply with the brand’s guard rails.',
      },
      {
        label: 'Result',
        text: 'Interfaces rendered in real time in the app via a native bridge, with no store release — cutting rollout from days to minutes in a product with 900k+ users.',
      },
    ],
    cta: 'View case details',
  },
  contact: {
    title: 'Contact',
    description:
      'Open to opportunities as a Senior Front-end / Mobile Engineer or Tech Lead. Let’s talk?',
    locationLine: 'São Vicente, SP · Available for remote work',
    channels: {
      email: 'Email',
      phone: 'Phone / WhatsApp',
      linkedin: 'LinkedIn',
      github: 'GitHub',
    },
    download: 'Download résumé (PDF)',
    formTitle: 'Send a message',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'you@email.com',
    messagePlaceholder: 'How can I help?',
    submit: 'Send message',
  },
  footer: {
    builtWith:
      'Built with React, TypeScript, Tailwind CSS and Framer Motion. Design inspired by high-performance portfolios.',
    rights: 'All rights reserved.',
  },
};

export const dictionaries: Record<Locale, Dictionary> = { pt, en };

export const pageTitles: Record<Locale, string> = {
  pt: 'Guilherme Aguiar — Desenvolvedor Front-end / Mobile Sênior',
  en: 'Guilherme Aguiar — Senior Front-end / Mobile Engineer',
};