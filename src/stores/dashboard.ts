import { defineStore } from 'pinia'

export interface Lesson {
  id: string
  title: string
  duration: string
  isLocked: boolean
  isCompleted: boolean
  videoUrl?: string
  description: string
}

export interface Course {
  id: string
  title: string
  subtitle: string
  thumbnail: string
  progress: number
  totalLessons: number
  completedLessons: number
  category: string
  totalDuration: string
  lessons: Lesson[]
}

export interface Comment {
  id: string
  author: string
  avatar: string
  authorPicture: string | null
  content: string
  date: string
  likes: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  iconClass: string
  unlockedAt: string | null
  isLocked: boolean
}

export interface LiveClass {
  id: string
  title: string
  description: string
  type: string
  date: string
  time: string
  duration: string
  coach: string
  isLive: boolean
  zoomUrl?: string
}

export interface ScheduleItem {
  id: string
  day: string
  time: string
  title: string
  type: 'live' | 'qa' | 'workshop' | 'review'
}

export interface Resource {
  id: string
  title: string
  category: string
  image: string
  description: string
  time: string
  tags: string[]
}

export interface Subscription {
  status: 'none' | 'pending' | 'active'
  plan: 'annual' | null
  startedAt: string | null
  expiresAt: string | null
  amount: number | null
}

const CDN = 'https://res.cloudinary.com/mrp1wwq1/image/upload/w_800,h_450,c_fill,g_face,q_auto,f_auto/bakanology'

function generateLessons(courseId: string, count: number): Lesson[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${courseId}-lesson-${i + 1}`,
    title: `Clase ${i + 1}: ${lessonTitles[courseId]?.[i] ?? `Módulo ${i + 1}`}`,
    duration: `${12 + (i % 5) * 4}:${['30', '45', '00', '15', '20'][i % 5]}`,
    isLocked: i > 2,
    isCompleted: i < 2,
    description: `En esta clase profundizamos en los conceptos clave del módulo ${i + 1} con ejercicios prácticos y material descargable.`,
  }))
}

const lessonTitles: Record<string, string[]> = {
  'course-1': [
    'Fundamentos del marketing de performance',
    'Customer journey y embudos de venta',
    'Copywriting que convierte',
    'Facebook Ads desde cero',
    'Google Ads estratégico',
    'Email marketing automatizado',
    'Analítica y optimización',
    'Escalado de campañas',
    'CRM y seguimiento de leads',
    'Cierre: tu plan de acción',
  ],
  'course-2': [
    'Instagram para negocios',
    'Contenido que vende',
    'TikTok orgánico y ads',
    'LinkedIn para B2B',
    'YouTube y video marketing',
    'Meta Business Suite',
    'Community management',
    'Inbound marketing',
    'Landing pages que convierten',
    'Estrategia omnicanal',
  ],
  'course-3': [
    'Google Analytics avanzado',
    'Dashboards y reportes',
    'Attribution modeling',
    'Pruebas A/B',
    'Optimización de tasa de conversión',
    'Heatmaps y grabaciones',
    'Segmentación avanzada',
    'Retargeting inteligente',
    'ROI y CAC',
    'Auditoría de campañas',
  ],
  'course-4': [
    'CRM desde cero',
    'Automatización con herramientas no-code',
    'Pipeline de ventas',
    'Lead scoring',
    'Email flows automatizados',
    'Webhooks e integraciones',
    'Chatbots y atención al cliente',
    'Seguimiento de oportunidades',
    'Reportes de ventas',
    'Estrategia de retención',
  ],
  'course-5': [
    'Posicionamiento de marca',
    'Branding para tu negocio',
    'Storytelling',
    'construcción de autoridad',
    'Gestión de crisis',
    'PR digital',
    'Newsletter y comunidad',
    'Co-branding y partnerships',
    'Eventos y webinars',
    'Tu marca personal',
  ],
}

const coursesData: Course[] = [
  {
    id: 'course-1',
    title: 'Marketing de Performance',
    subtitle: 'Aprende a invertir en ads como un experto y escala tu facturación.',
    thumbnail: `${CDN}/luis-founder.jpg`,
    progress: 22,
    totalLessons: 10,
    completedLessons: 2,
    category: 'Fundamentos',
    totalDuration: '5h 20min',
    lessons: generateLessons('course-1', 10),
  },
  {
    id: 'course-2',
    title: 'Redes Sociales que Venden',
    subtitle: 'Domina Instagram, TikTok, LinkedIn y YouTube para atraer clientes.',
    thumbnail: `${CDN}/luis-founder.jpg`,
    progress: 0,
    totalLessons: 10,
    completedLessons: 0,
    category: 'Redes Sociales',
    totalDuration: '4h 50min',
    lessons: generateLessons('course-2', 10),
  },
  {
    id: 'course-3',
    title: 'Analítica y Optimización',
    subtitle: 'Toma decisiones basadas en datos y maximiza tu retorno de inversión.',
    thumbnail: `${CDN}/luis-founder.jpg`,
    progress: 0,
    totalLessons: 10,
    completedLessons: 0,
    category: 'Analítica',
    totalDuration: '4h 10min',
    lessons: generateLessons('course-3', 10),
  },
  {
    id: 'course-4',
    title: 'CRM y Automatización',
    subtitle: 'Implementa sistemas que trabajen por ti mientras duermes.',
    thumbnail: `${CDN}/luis-founder.jpg`,
    progress: 0,
    totalLessons: 10,
    completedLessons: 0,
    category: 'CRM',
    totalDuration: '5h 00min',
    lessons: generateLessons('course-4', 10),
  },
  {
    id: 'course-5',
    title: 'Marca y Autoridad',
    subtitle: 'Construye una marca que atraiga clientes sin esfuerzo.',
    thumbnail: `${CDN}/luis-founder.jpg`,
    progress: 0,
    totalLessons: 10,
    completedLessons: 0,
    category: 'Marca',
    totalDuration: '6h 30min',
    lessons: generateLessons('course-5', 10),
  },
]

const commentsData: Comment[] = [
  {
    id: 'c1',
    author: 'María G.',
    avatar: 'MG',
    authorPicture: null,
    content: 'Esta clase me cambió la perspectiva. ¡Gracias, coaches!',
    date: '2026-06-18T10:30:00Z',
    likes: 12,
  },
  {
    id: 'c2',
    author: 'Ana R.',
    avatar: 'AR',
    authorPicture: null,
    content: '¿Alguien más hizo el ejercicio de la clase 2? Me costó un poco pero valió la pena.',
    date: '2026-06-19T14:15:00Z',
    likes: 8,
  },
  {
    id: 'c3',
    author: 'Carla T.',
    avatar: 'CT',
    authorPicture: null,
    content: 'Me encanta la calidad del contenido. Muy claro y aplicable.',
    date: '2026-06-20T09:00:00Z',
    likes: 5,
  },
]

const achievementsData: Achievement[] = [
  {
    id: 'a1',
    title: 'Primeros pasos',
    description: 'Completaste tu primera clase.',
    iconClass: 'fa-solid fa-shoe-prints',
    unlockedAt: '2026-06-18T10:00:00Z',
    isLocked: false,
  },
  {
    id: 'a2',
    title: 'Constancia',
    description: 'Completaste 5 clases.',
    iconClass: 'fa-solid fa-fire',
    unlockedAt: null,
    isLocked: true,
  },
  {
    id: 'a3',
    title: 'Comunidad',
    description: 'Dejaste tu primer comentario.',
    iconClass: 'fa-solid fa-comments',
    unlockedAt: '2026-06-19T16:00:00Z',
    isLocked: false,
  },
  {
    id: 'a4',
    title: 'En vivo',
    description: 'Asististe a tu primera clase en vivo.',
    iconClass: 'fa-solid fa-video',
    unlockedAt: null,
    isLocked: true,
  },
  {
    id: 'a5',
    title: 'Transformación',
    description: 'Completaste tu primer curso.',
    iconClass: 'fa-solid fa-trophy',
    unlockedAt: null,
    isLocked: true,
  },
]

const liveClassesData: LiveClass[] = [
  {
    id: 'live-1',
    title: 'Q&A con Luis: Estrategia de ads',
    description: 'Sesión de preguntas y respuestas sobre publicidad digital.',
    type: 'qa',
    date: '2026-07-23',
    time: '19:00',
    duration: '60 min',
    coach: 'Luis (bakano.ec)',
    isLive: false,
    zoomUrl: '#',
  },
  {
    id: 'live-2',
    title: 'Taller de optimización de campañas',
    description: 'Aprende a optimizar tus campañas en vivo con Denisse.',
    type: 'live',
    date: '2026-07-25',
    time: '07:00',
    duration: '45 min',
    coach: 'Denisse (bakano.ec)',
    isLive: false,
    zoomUrl: '#',
  },
  {
    id: 'live-3',
    title: 'Cierre de mes: métricas y resultados',
    description: 'Revisemos juntos los resultados del mes y planifiquemos el siguiente.',
    type: 'workshop',
    date: '2026-07-28',
    time: '18:00',
    duration: '90 min',
    coach: 'Luis y Denisse',
    isLive: false,
    zoomUrl: '#',
  },
]

const scheduleData: ScheduleItem[] = [
  { id: 's1', day: 'Lunes', time: '07:00', title: 'Clase en vivo', type: 'live' },
  { id: 's2', day: 'Martes', time: '12:00', title: 'Preguntas y respuestas', type: 'qa' },
  { id: 's3', day: 'Miércoles', time: '19:00', title: 'Taller práctico', type: 'workshop' },
  { id: 's4', day: 'Jueves', time: '07:00', title: 'Clase en vivo', type: 'live' },
  { id: 's5', day: 'Viernes', time: '18:00', title: 'Revisión de avances', type: 'review' },
  { id: 's6', day: 'Sábado', time: '09:00', title: 'Mentoría grupal', type: 'workshop' },
]

const resourcesData: Resource[] = [
  {
    id: 'r-1',
    title: 'Guía rápida: Facebook Ads',
    category: 'guía',
    image: `${CDN}/back-tshirt.jpg`,
    description: 'Plantilla configurable para campañas de Facebook Ads optimizadas.',
    time: '10 min',
    tags: ['ads', 'facebook', 'plantilla'],
  },
  {
    id: 'r-2',
    title: 'Brief creativo para campañas',
    category: 'plantilla',
    image: `${CDN}/back-tshirt.jpg`,
    description: 'Estructura para briefs de campañas publicitarias.',
    time: '15 min',
    tags: ['creative', 'brief', 'plantilla'],
  },
  {
    id: 'r-3',
    title: 'Checklist de lanzamiento',
    category: 'guía',
    image: `${CDN}/back-tshirt.jpg`,
    description: 'Lista completa de pasos antes de lanzar una campaña.',
    time: '5 min',
    tags: ['lanzamiento', 'checklist'],
  },
  {
    id: 'r-4',
    title: 'Calculadora de CAC y ROAS',
    category: 'herramienta',
    image: `${CDN}/back-tshirt.jpg`,
    description: 'Spreadsheet para calcular costo de adquisición y retorno de inversión.',
    time: '20 min',
    tags: ['cac', 'roas', 'métrica'],
  },
  {
    id: 'r-5',
    title: 'Guía de copywriting persuasivo',
    category: 'guía',
    image: `${CDN}/back-tshirt.jpg`,
    description: 'Técnicas de copywriting para anuncios que convierten.',
    time: '15 min',
    tags: ['copy', 'persuasión', 'ads'],
  },
  {
    id: 'r-6',
    title: 'Plantilla de email marketing',
    category: 'plantilla',
    image: `${CDN}/back-tshirt.jpg`,
    description: 'Estructura lista para secuencias de email automatizadas.',
    time: '10 min',
    tags: ['email', 'automatización', 'plantilla'],
  },
]

const subscriptionData: Subscription = {
  status: 'active',
  plan: 'annual',
  startedAt: '2026-06-15T00:00:00Z',
  expiresAt: '2027-06-15T23:59:59Z',
  amount: 297,
}

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    courses: coursesData,
    comments: commentsData,
    achievements: achievementsData,
    liveClasses: liveClassesData,
    schedule: scheduleData,
    resources: resourcesData,
    subscription: subscriptionData,
  }),

  getters: {
    courseById: (state) => {
      return (id: string) => state.courses.find((c) => c.id === id)
    },
    lessonById: (state) => {
      return (courseId: string, lessonId: string) => {
        const course = state.courses.find((c) => c.id === courseId)
        return course?.lessons.find((l) => l.id === lessonId)
      }
    },
    nextLiveClass: (state): LiveClass | null => {
      const now = new Date()
      const upcoming = state.liveClasses
        .map((live) => ({ ...live, dateObj: new Date(`${live.date}T${live.time}`) }))
        .filter((live) => live.dateObj > now)
        .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())
      return upcoming[0] ?? null
    },
    completedAchievements: (state) => state.achievements.filter((a) => !a.isLocked),
    resourceById: (state) => {
      return (id: string) => state.resources.find((r) => r.id === id)
    },
    resourcesByCategory: (state) => {
      return (category: string | 'todas') => {
        if (category === 'todas') return state.resources
        return state.resources.filter((r) => r.category === category)
      }
    },
    totalProgress: (state) => {
      const totalLessons = state.courses.reduce((acc, c) => acc + c.totalLessons, 0)
      const completedLessons = state.courses.reduce((acc, c) => acc + c.completedLessons, 0)
      return totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100)
    },
  },

  actions: {
    completeLesson(courseId: string, lessonId: string) {
      const course = this.courses.find((c) => c.id === courseId)
      const lesson = course?.lessons.find((l) => l.id === lessonId)
      if (course && lesson && !lesson.isCompleted) {
        lesson.isCompleted = true
        course.completedLessons += 1
        course.progress = Math.round((course.completedLessons / course.totalLessons) * 100)
      }
    },

    addComment(content: string, authorName: string, authorPicture: string | null = null) {
      const initials = authorName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
      this.comments.unshift({
        id: `c-${Date.now()}`,
        author: authorName,
        avatar: initials || 'YO',
        authorPicture,
        content,
        date: new Date().toISOString(),
        likes: 0,
      })
    },
  },
})
