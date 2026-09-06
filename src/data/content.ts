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
  image: string;
};

export const projects: Project[] = [
  {
    slug: 'vesto',
    number: '01',
    name: 'VESTO',
    tagline: 'Personal Finance & Cash Flow Intelligence',
    description:
      'VESTO is a proactive personal finance platform designed to answer one simple question: “How much can I safely spend today?” Instead of only showing users where their money went, VESTO continuously calculates a Safe-to-Spend allowance based on income, recurring commitments, savings goals, current spending, and the remaining days in the month.',
    problem:
      'Traditional budgeting tools tend to focus on historical spending, showing users where their money has already gone through detailed category-based dashboards. While this helps users review past expenses, it does not always answer the more immediate question: how much can I safely spend right now?\n\nUsers may have upcoming bills or savings targets that are not reflected clearly in their available spending amount. As a result, they are left to mentally account for future commitments while trying to decide whether a purchase is affordable today. What is missing is clear, forward-looking guidance that connects current spending with upcoming bills and savings goals.',
    solution:
      "VESTO addresses this through a real-time Safe-to-Spend engine that first accounts for committed bills and savings targets before calculating the user's remaining discretionary allowance. Instead of treating available money as fully spendable, VESTO separates money that already has a purpose from what is actually available for everyday spending.\n\nThe Safe-to-Spend calculation works alongside recurring bill tracking, category budgets, savings goals, and spending-velocity analytics to give users a clearer view of their current financial position. Proactive financial warnings add another layer of guidance when spending patterns or upcoming commitments require attention.\n\nTogether, these features turn budgeting from a review of past spending into clear, actionable guidance for everyday financial decisions.",
    build:
      'Built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4 on the frontend, powered by a Django 5 and Django REST Framework backend with PostgreSQL. Features SimpleJWT authentication, Recharts financial visualizations, Python Decimal precision for exact currency calculations, Gunicorn WSGI server, and WhiteNoise static serving.',
    techStack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS v4',
      'Django 5',
      'Django REST Framework',
      'PostgreSQL',
      'SimpleJWT',
      'Recharts',
      'Python Decimal',
      'Gunicorn',
      'WhiteNoise',
    ],
    liveUrl: 'https://vesto-orcin.vercel.app/',
    accent: '#2997E8',
    image: '/images/vesto.png',
  },
  {
    slug: 'duo',
    number: '02',
    name: 'DUO',
    tagline: 'Private Two-Person Connection Platform',
    description:
      'DUO is a privacy-first digital space built exclusively for two people. It combines real-time communication with shared rituals such as blind daily questions, collaborative drawing, voice notes, little keepsakes, and shared tasks, creating a private alternative to noisy social and messaging platforms.',
    problem:
      'Most communication platforms are built around large networks, group conversations, feeds, and a constant stream of notifications. They make it easy to stay connected with many people, but they are not designed around the needs of a relationship between exactly two people.\n\nMessaging is available, but the experience is spread across conversations, media, notifications, and separate tools. There is no dedicated space where two people can intentionally communicate, collaborate, build small shared rituals, and keep moments that matter to them. The result is a communication experience that focuses on sending messages rather than creating a private space designed specifically for two people.',
    solution:
      'DUO creates a strict two-person digital environment where two accounts connect through a unique pairing code or QR-based pairing. Once connected, the pair gets a private space built around their shared communication and activities, without the noise of larger social platforms.\n\nThe space brings together real-time chat, read receipts, voice notes, blind-reveal daily questions, collaborative drawing, little notes, keepsakes, notifications, and a shared task board. Each feature supports a different way for the two users to communicate, collaborate, or preserve something they have shared.\n\nBehind the experience, Django acts as the backend authority for identity, pairing, permissions, and relationship-level data isolation. This ensures that the two-person relationship is treated as the core boundary of the platform, rather than simply another chat between users.',
    build:
      'Engineered with Next.js 16, React 19, TypeScript, and Tailwind CSS v4. Backend powered by Django 5.1 and Django REST Framework alongside Supabase PostgreSQL, Supabase Auth, Realtime channels, and Storage. Security relies on PyJWT and Cryptography libraries, while interactive features leverage HTML5 Canvas and Framer Motion.',
    techStack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS v4',
      'Django 5.1',
      'Django REST Framework',
      'Supabase PostgreSQL',
      'Supabase Auth',
      'Supabase Realtime',
      'Supabase Storage',
      'PyJWT',
      'Cryptography',
      'HTML5 Canvas',
      'Framer Motion',
    ],
    liveUrl: 'https://duo-one-snowy.vercel.app/',
    accent: '#FF7B42',
    image: '/images/duo.png',
  },
  {
    slug: 'lifeos',
    number: '03',
    name: 'LifeOS',
    tagline: 'Personal Operating System',
    description:
      'LifeOS is an all-in-one personal operating system that connects daily tasks, habits, long-term goals, finances, energy, and productivity in one cohesive dashboard. Its core idea is to connect small daily actions with measurable long-term outcomes instead of treating every productivity metric as an isolated activity.',
    problem:
      'People often rely on multiple disconnected tools to manage tasks, habits, finances, goals, journaling, and day-to-day productivity. Each tool handles one part of life, but the information remains separated across different places.\n\nThis creates constant context switching and makes it harder to see how different areas of life affect each other. Completing a task, maintaining a habit, saving money, or making progress toward a goal can each feel like an isolated activity, making it difficult to understand how everyday actions contribute to larger goals and long-term progress.',
    solution:
      'LifeOS brings these different areas into one unified personal dashboard, giving users a single place to understand and manage their progress. It combines a dynamic Life Score with task management, habit streaks, financial runway, goal milestones, and analytics.\n\nThe platform also includes a Trajectory Simulator that models how changes in focus, savings, and consistency can compound over time. Instead of viewing individual tasks, habits, finances, and goals separately, LifeOS connects them into a broader view of how everyday decisions can influence long-term outcomes.',
    build:
      'Full-stack architecture with Next.js, React 19, TypeScript, and Tailwind CSS v4 on the client, interfacing with a Django 5 & Django REST Framework backend. Data integrity is handled via PostgreSQL, secured with SimpleJWT, with analytical visualizations rendered via Recharts and production delivery served via Gunicorn.',
    techStack: [
      'Next.js',
      'React 19',
      'TypeScript',
      'Tailwind CSS v4',
      'Django 5',
      'Django REST Framework',
      'PostgreSQL',
      'SimpleJWT',
      'Recharts',
      'Gunicorn',
    ],
    liveUrl: 'https://life-os-alpha-fawn-27.vercel.app/',
    accent: '#54D68A',
    image: '/images/lifeos.png',
  },
  {
    slug: 'anim8',
    number: '04',
    name: 'Anim8',
    tagline: 'Browser-Based 2D Animation Studio',
    description:
      'Anim8 is a production-grade browser-based 2D frame-by-frame hand-drawn animation studio designed to bring professional animation workflows directly to the web. It provides a dedicated drawing engine, multi-layer timeline, onion skinning, audio synchronization, multi-touch navigation, offline-first storage, cloud synchronization, and multi-format export.',
    problem:
      'Traditional animation software can be expensive, resource-intensive, and limited to desktop workflows. This can make frame-by-frame animation less accessible when users want to work directly in a browser.\n\nBrowser-based art tools introduce a different set of challenges. Canvas lag and touch jitter can make drawing feel imprecise, while unreliable browser storage can put projects at risk. Limited offline support can also interrupt the workflow, and complicated export processes make it harder to move finished work into usable formats.',
    solution:
      'Anim8 uses a local-first IndexedDB architecture to keep projects, frames, layers, artwork, undo history, and audio stored directly in the browser. This data is then asynchronously synchronized with Neon PostgreSQL, allowing the animation workflow to remain centered around the browser while keeping project data synchronized.\n\nIts custom Canvas engine supports smooth pressure-sensitive drawing and multi-touch zooming, alongside animation features such as onion skinning, timeline editing, audio synchronization, and reference tracing. Anim8 also handles export directly in the browser, supporting WebM, GIF, PNG sequences, spritesheets, and native project backups without requiring a separate export workflow.',
    build:
      'Built with React 18, TypeScript, Vite, and Tailwind CSS with state managed via Zustand. Canvas performance powered by raw HTML5 Canvas 2D and IndexedDB for local persistence. Cloud backend uses Neon PostgreSQL with Drizzle ORM and Vercel Serverless Functions, protected with JWT and bcryptjs. In-browser client export utilizes MediaRecorder API, gifshot, and JSZip.',
    techStack: [
      'React 18',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Zustand',
      'HTML5 Canvas 2D',
      'IndexedDB',
      'Neon PostgreSQL',
      'Drizzle ORM',
      'Vercel Serverless Functions',
      'JWT',
      'bcryptjs',
      'MediaRecorder API',
      'gifshot',
      'JSZip',
    ],
    liveUrl: 'https://anima8.vercel.app/',
    accent: '#F04BC4',
    image: '/images/anim8.png',
  },
];

export const stackChapters = [
  {
    key: 'pixels',
    label: 'PIXELS',
    caption: 'Design',
    items: ['Figma', 'Illustrator', 'Canva', 'Prototyping', 'Visual Design'],
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
    items: ['Python', 'Django', 'Django REST Framework', 'REST APIs', 'Node.js', 'JWT Authentication'],
    accent: '#54D68A',
  },
  {
    key: 'data',
    label: 'DATA',
    caption: 'Database',
    items: ['PostgreSQL', 'SQL', 'Supabase', 'IndexedDB'],
    accent: '#FF7B42',
  },
  {
    key: 'ship',
    label: 'SHIP',
    caption: 'Deploy',
    items: ['Git', 'Vercel', 'Render'],
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
    bullets: [
      'Product & System Design: Designed end-to-end digital experiences across web and SaaS products, including the redesign of a B2C analytics platform by optimizing information architecture, navigation, and core user workflows.',
      'Design Systems: Created scalable UI systems, reusable components, and consistent design patterns to streamline product development.',
      'Visual & Brand Design: Developed brand identities, marketing collateral, and visual assets across multiple digital initiatives.',
      'Cross-functional Delivery: Partnered with developers and stakeholders across discovery, ideation, prototyping, and production handoff.',
      'Product Strategy: Contributed to requirement analysis, feature planning, design reviews, and iterative product improvements.',
    ],
    description:
      'Product & System Design: Designed end-to-end digital experiences across web and SaaS products. Design Systems: Created scalable UI systems and reusable components. Visual & Brand Design: Developed brand identities and visual assets. Cross-functional Delivery: Partnered with developers and stakeholders across discovery to handoff. Product Strategy: Contributed to requirement analysis, feature planning, and design reviews.',
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
