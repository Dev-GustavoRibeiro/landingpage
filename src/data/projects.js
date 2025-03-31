// projects.js

export const projects = [

  {
    id: "landingpage-2024",
    name: "LANDINGPAGE",
    shortDescription: "Portfolio profissional com animações fluidas",
    description: `Portfolio profissional desenvolvido com Next.js e Framer Motion, 
focando em performance e experiência do usuário. O projeto apresenta animações 
suaves e transições fluidas, mantendo excelentes métricas de performance.`,
    features: [
      "Animações fluidas e responsivas",
      "Carregamento otimizado de imagens",
      "Integração com GitHub API",
      "Modo escuro/claro",
      "SEO otimizado"
    ],
    highlights: {
      performance: "100/100",
      seo: "100/100",
      accessibility: "98/100"
    },
    createdAt: "2024-03-26",
    status: "active",
    stars: 5,
    techs: {
      frontend: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
      tools: ["TypeScript", "Prettier"]
    },
    colors: {
      primary: "#4F46E5",
      secondary: "#818CF8"
    },
    url: "https://github.com/Dev-GustavoRibeiro/landingpage",
    homepage: "https://gustavoribeiro.dev",
    repoName: "landingpage",
    previewImages: [
      "/images/projects/landingpage/home.jpg",
      "/images/projects/landingpage/projects.jpg",
      "/images/projects/landingpage/contact.jpg"
    ]
  },
  {
    id: "loading-2024",
    name: "LOADING",
    shortDescription: "Dashboard empresarial com análise de dados",
    description: `Dashboard corporativo desenvolvido para visualização e análise 
de dados empresariais. O sistema inclui autenticação JWT, gráficos interativos
e relatórios personalizados, além de integração com múltiplas fontes de dados.`,
    features: [
      "Autenticação JWT com refresh token",
      "Gráficos interativos em tempo real",
      "Exportação de relatórios em PDF/Excel",
      "Filtros avançados de dados",
      "Interface adaptativa"
    ],
    highlights: {
      security: "Autenticação em 2 fatores",
      performance: "96/100",
      dataProcessing: "10k registros/segundo"
    },
    createdAt: "2024-02-08",
    status: "development",
    stars: 5,
    techs: {
      frontend: ["React", "Next.js", "Tailwind", "Material-UI"],
      backend: ["Node.js", "Express", "MongoDB"],
      tools: ["Docker", "Jest", "GitHub Actions"]
    },
    colors: {
      primary: "#2563EB",
      secondary: "#60A5FA"
    },
    url: "https://github.com/Dev-GustavoRibeiro/loading",
    homepage: "https://loading-dashboard.dev",
    repoName: "loading",
    previewImages: [
      "/images/projects/loading/dashboard.jpg",
      "/images/projects/loading/analytics.jpg",
      "/images/projects/loading/reports.jpg"
    ]
  },
  {
    id: "etamainha-2024",
    name: "ETAMAINHA",
    shortDescription: "Sistema completo para gerenciamento de confeitaria",
    description: `Sistema web completo desenvolvido para uma confeitaria artesanal, 
incluindo catálogo de produtos, sistema de pedidos e painel administrativo.
O projeto foi construído com foco na usabilidade tanto para clientes quanto para
a equipe administrativa.`,
    features: [
      "Catálogo dinâmico de bolos e doces",
      "Sistema de pedidos online",
      "Painel administrativo completo",
      "Gestão de estoque e ingredientes",
      "Relatórios de vendas e produtos"
    ],
    highlights: {
      performance: "98/100",
      security: "Proteção contra SQL Injection e XSS",
      accessibility: "WCAG 2.1 Compliant"
    },
    createdAt: "2024-11-23",
    status: "prodution",
    stars: 5,
    techs: {
      frontend: ["Bootstrap", "jQuery", "SASS"],
      backend: ["PHP 8", "MySQL"],
      tools: ["Docker", "PHPUnit"]
    },
    colors: {
      primary: "#FF69B4",
      secondary: "#FFB6C1"
    },
    url: "https://github.com/Dev-GustavoRibeiro/etamainha",
    homepage: "https://etamainha.com.br",
    repoName: "etamainha",
    previewImages: [
      "/images/projects/etamainha/dashboard.jpg",
      "/images/projects/etamainha/catalog.jpg",
      "/images/projects/etamainha/orders.jpg"
    ]
  }
]

// Função auxiliar para filtrar projetos por status
export const getProjectsByStatus = (status) => {
  return projects.filter(project => project.status === status)
}

// Função para obter projeto por ID
export const getProjectById = (id) => {
  return projects.find(project => project.id === id)
}
