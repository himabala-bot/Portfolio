export type Project = {
  slug: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  build: string;
  techStack: string[];
  liveUrl: string;
  accent: string;
};

export const projects: Project[] = [
  {
    slug: 'vesto',
    number: '01',
    name: 'VESTO',
    tagline: 'Personal Finance Management Platform',
    description:
      'A full-stack personal finance platform bringing expense tracking, budgeting, savings goals, recurring expenses, and financial insights into one interface.',
    problem:
      'Managing personal finances across expenses, budgets, savings goals, and recurring payments can become fragmented and difficult to track. Users often lack a clear understanding of their spending patterns and how much they can safely spend.',
    solution:
      'Vesto is a full-stack personal finance platform that brings expense tracking, budgeting, savings goals, recurring expenses, and financial insights into one interface. Users can record transactions, organize spending by category, set monthly budgets, track savings goals, and monitor their overall financial health through an interactive dashboard. The platform provides contextual financial insights such as spending breakdowns, budget progress, recurring expenses, and a Safe-to-Spend view that helps users understand their available discretionary money.',
    build:
      'Built with a Next.js + TypeScript frontend paired with a Django REST Framework backend over PostgreSQL. JWT authentication secures every request. Recharts powers the interactive dashboard visualizations. Deployed across Vercel for the frontend and Render for the backend, with WhiteNoise for static asset serving and CORS configured for cross-origin API access.',
    techStack: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Recharts',
      'Lucide React',
      'Django',
      'Django REST Framework',
      'PostgreSQL',
      'JWT',
      'Vercel',
      'Render',
    ],
    liveUrl: 'https://vaulty-navy.vercel.app/',
    accent: '#2997E8',
  },
  {
    slug: 'nivo',
    number: '02',
    name: 'NIVO',
    tagline: 'AI-Powered Study & Learning Platform',
    description:
      'A centralized learning platform bringing studying, revision, and productivity into one workspace, with a gamified Brain Roulette experience.',
    problem:
      'Students often study using disconnected tools for notes, flashcards, quizzes, revision, and productivity. This makes it difficult to organize learning material and maintain consistent study habits in one place.',
    solution:
      'Nivo is a centralized learning platform designed to bring studying, revision, and productivity into one workspace. Users can organize their study materials, manage tasks and goals, track progress, use focused study sessions, and monitor their learning activity through dashboards and analytics. The platform also incorporates Brain Roulette, a gamified learning experience with trivia, logic puzzles, riddles, pattern recognition, memory challenges, and general knowledge. Users earn XP, maintain streaks, and track high scores, adding an interactive element to the learning experience.',
    build:
      'A Next.js + TypeScript frontend with Recharts analytics and Lucide React iconography, backed by Django REST Framework and PostgreSQL. JWT authentication gates access. The gamification engine runs server-side with XP, streaks, and high-score tracking through Django Admin and REST APIs. Deployed on Vercel and Render.',
    techStack: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Recharts',
      'Lucide React',
      'Django',
      'Django REST Framework',
      'PostgreSQL',
      'JWT',
      'Vercel',
      'Render',
    ],
    liveUrl: 'https://nivo-ai-study.vercel.app/',
    accent: '#54D68A',
  },
  {
    slug: 'flowport',
    number: '03',
    name: 'FLOWPORT',
    tagline: 'Shared Container Cargo Marketplace',
    description:
      'A logistics marketplace concept connecting businesses that need to ship smaller cargo volumes with available container capacity.',
    problem:
      'Shipping cargo through containers can be inefficient when businesses do not have enough goods to fill an entire container. At the same time, available container capacity may go unused, leading to higher shipping costs and inefficient logistics planning.',
    solution:
      'FlowPort is a logistics marketplace concept designed to connect businesses that need to ship smaller cargo volumes with available container capacity. The platform provides a centralized interface for managing cargo requirements, available capacity, shipment details, and matching opportunities. Users can create and manage cargo requirements, view suitable container opportunities, track shipment information, and organize logistics activity through a structured dashboard. The platform focuses on making shared-container logistics more transparent, organized, and accessible.',
    build:
      'A React + TypeScript frontend styled with Tailwind CSS, backed by a Node.js + Express.js API using Prisma ORM over PostgreSQL. JWT authentication secures the marketplace. Recharts visualizes shipment and capacity data. Deployed on Vercel with the backend on cloud infrastructure, exposing REST APIs for the marketplace architecture.',
    techStack: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Prisma',
      'JWT',
      'Recharts',
      'Vercel',
    ],
    liveUrl: 'https://flowport-nine.vercel.app/',
    accent: '#FF7B42',
  },
  {
    slug: 'focusflow',
    number: '04',
    name: 'FOCUSFLOW',
    tagline: 'Productivity & Pomodoro UI Concept',
    description:
      'A UI-focused productivity and Pomodoro application concept designed around simplicity, focus, and distraction-free work.',
    problem:
      'Many productivity tools are overloaded with features and distracting interfaces, making it harder for users to maintain focus and build a consistent work routine.',
    solution:
      'FocusFlow is a product-focused productivity and Pomodoro application concept designed around simplicity, focus, and distraction-free work. It provides a clean interface for managing tasks, starting focused Pomodoro sessions, tracking session progress, and maintaining a streamlined daily workflow. The project primarily focused on product design, interaction design, visual hierarchy, and responsive interface development, rather than complex backend functionality.',
    build:
      'A React + JavaScript frontend styled with Tailwind CSS, designed end-to-end in Figma first. The build centered on interaction design — a custom Pomodoro timer, task management, and modern UI animations — with a fully responsive layout and interactive components prioritized over backend complexity.',
    techStack: ['React', 'JavaScript', 'Tailwind CSS', 'Figma', 'Pomodoro Timer', 'Responsive Design'],
    liveUrl: 'https://focusflowpomo.netlify.app/',
    accent: '#F04BC4',
  },
];

export const stackChapters = [
  {
    key: 'pixels',
    label: 'PIXELS',
    caption: 'Design',
    items: ['Figma', 'Illustrator', 'Canva', 'Visual Design', 'Wireframes'],
    accent: '#F04BC4',
  },
  {
    key: 'interface',
    label: 'INTERFACE',
    caption: 'Frontend',
    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS'],
    accent: '#2997E8',
  },
  {
    key: 'logic',
    label: 'LOGIC',
    caption: 'Backend',
    items: ['Python', 'Django', 'Django REST Framework', 'Node.js', 'REST APIs'],
    accent: '#54D68A',
  },
  {
    key: 'data',
    label: 'DATA',
    caption: 'Database',
    items: ['PostgreSQL', 'MySQL', 'SQLite'],
    accent: '#FF7B42',
  },
  {
    key: 'ship',
    label: 'SHIP',
    caption: 'Deploy',
    items: ['Git', 'Docker', 'Postman', 'Vercel'],
    accent: '#35C6C1',
  },
];

export const experiences = [
  {
    number: '01',
    type: 'FREELANCE',
    company: 'AUTHENTIC AYURVEDA',
    role: 'DESIGNER + DEVELOPER',
    year: '2026',
    scope: [
      'React',
      'Vite',
      'Tailwind CSS',
      'JavaScript',
      'Figma',
      'Git',
      'GitHub',
      'Vercel',
    ],
    implementation: [
      'Responsive UI',
      'Component Architecture',
      'Contact Integration',
      'SEO',
      'Domain Configuration',
      'Production Deployment',
    ],
    description:
      'Designed and developed the complete responsive clinic website, handling product design, frontend implementation, contact and third-party integrations, SEO optimization, domain configuration, and production deployment.',
    liveUrl: 'https://authentic-ayurveda.vercel.app/',
    accent: '#54D68A',
  },
  {
    number: '02',
    type: 'FULL-TIME',
    company: 'CCC',
    sub: 'DIGITAL INDIA',
    role: 'PRODUCT DESIGNER',
    year: '2025 — PRESENT',
    location: 'HYDERABAD',
    scopeWords: ['WEBSITES', 'DASHBOARDS', 'DIGITAL PRODUCTS', 'BRANDING', 'MARKETING'],
    description:
      'Working across websites, dashboards, digital products, branding, and marketing experiences, translating requirements into functional and visually engaging digital products.',
    accent: '#2997E8',
  },
];

export const contactLinks = [
  {
    type: 'email',
    label: 'SAY HELLO',
    value: 'himabalabandaru@gmail.com',
    href: 'mailto:himabalabandaru@gmail.com',
  },
  {
    type: 'phone',
    label: 'CALL ME',
    value: '6301245815',
    href: 'tel:+916301245815',
  },
  {
    type: 'linkedin',
    label: 'CONNECT',
    value: 'https://www.linkedin.com/in/himabala-bandaru-176508281/',
    href: 'https://www.linkedin.com/in/himabala-bandaru-176508281/',
  },
  {
    type: 'github',
    label: 'SEE MY CODE',
    value: 'https://github.com/himabala-bot',
    href: 'https://github.com/himabala-bot',
  },
] as const;
