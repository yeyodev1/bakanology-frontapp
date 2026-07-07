import { createRouter, createWebHistory, type RouteMeta, type RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    description?: string
    canonical?: string
    ogTitle?: string
    ogDescription?: string
    ogUrl?: string
    ogImage?: string
    requiresAuth?: boolean
    requiresAdmin?: boolean
  }
}

const SITE = 'https://bakanology.bakano.ec'
const OG_IMAGE = `${SITE}/logo-share.png`

const BRAND_TITLE =
  'Bakanology Academy | Marketing de performance sin pagar una agencia'
const BRAND_DESC =
  'Plataforma de e-learning de marketing de performance creada por bakano.ec. Metodología comprobada por 70+ clientes, CRM propio y soporte incluido.'

function routeMeta(title: string, description: string, path: string): RouteMeta {
  return {
    title: `${title} | Bakanology Academy`,
    description,
    canonical: `${SITE}${path}`,
    ogTitle: `${title} | Bakanology Academy`,
    ogDescription: description,
    ogUrl: `${SITE}${path}`,
    ogImage: OG_IMAGE,
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: BRAND_TITLE,
      description: BRAND_DESC,
      canonical: `${SITE}/`,
      ogTitle: BRAND_TITLE,
      ogDescription: BRAND_DESC,
      ogUrl: `${SITE}/`,
      ogImage: OG_IMAGE,
    } satisfies RouteMeta,
  },
  {
    path: '/politicas-privacidad',
    name: 'privacy-policy',
    component: () => import('@/views/PrivacyPolicyView.vue'),
    meta: routeMeta('Políticas de Privacidad', 'Cómo Bakanology Academy trata los datos personales recogidos en bakanology.bakano.ec.', '/politicas-privacidad'),
  },
  {
    path: '/aviso-legal',
    name: 'legal-notice',
    component: () => import('@/views/LegalNoticeView.vue'),
    meta: routeMeta('Aviso Legal', 'Términos de uso del sitio bakanology.bakano.ec.', '/aviso-legal'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: routeMeta('Iniciar sesión', 'Accede a tu cuenta de Bakanology Academy.', '/login'),
  },
  {
    path: '/registro',
    name: 'register',
    component: () => import('@/views/RegisterView.vue'),
    meta: routeMeta('Crear cuenta', 'Crea tu cuenta en Bakanology Academy y empieza a aprender marketing de performance.', '/registro'),
  },
  {
    path: '/verificar-email',
    name: 'verify-email',
    component: () => import('@/views/VerifyEmailView.vue'),
    meta: routeMeta('Verificar email', 'Confirma tu correo para activar tu cuenta en Bakanology Academy.', '/verificar-email'),
  },
  {
    path: '/recuperar-contrasena',
    name: 'forgot-password',
    component: () => import('@/views/ForgotPasswordView.vue'),
    meta: routeMeta('Recuperar contraseña', 'Recupera el acceso a tu cuenta de Bakanology Academy.', '/recuperar-contrasena'),
  },
  {
    path: '/restablecer-contrasena',
    name: 'reset-password',
    component: () => import('@/views/ResetPasswordView.vue'),
    meta: routeMeta('Restablecer contraseña', 'Crea una nueva contraseña para tu cuenta de Bakanology Academy.', '/restablecer-contrasena'),
  },
  {
    path: '/pago/confirmar',
    name: 'payment-result',
    component: () => import('@/views/PaymentResultView.vue'),
    meta: routeMeta('Confirmación de pago', 'Resultado de tu pago en Bakanology Academy.', '/pago/confirmar'),
  },
  {
    path: '/pay-response',
    name: 'pay-response',
    component: () => import('@/views/PaymentResultView.vue'),
    meta: routeMeta('Confirmación de pago', 'Resultado de tu pago en Bakanology Academy.', '/pay-response'),
  },
  {
    path: '/app',
    component: () => import('@/components/dashboard/DashboardLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/views/dashboard/DashboardView.vue'),
        meta: routeMeta('Mi cuenta', 'Tu espacio personal de Bakanology Academy.', '/app'),
      },
      {
        path: 'cursos',
        name: 'courses',
        component: () => import('@/views/dashboard/CoursesView.vue'),
        meta: routeMeta('Mis cursos', 'Todos tus cursos disponibles en Bakanology Academy.', '/app/cursos'),
      },
      {
        path: 'cursos/:courseId',
        name: 'course-detail',
        component: () => import('@/views/dashboard/CourseDetailView.vue'),
        meta: routeMeta('Curso', 'Contenido del curso en Bakanology Academy.', '/app/cursos'),
      },
      {
        path: 'cursos/:courseId/clases/:lessonId',
        name: 'lesson',
        component: () => import('@/views/dashboard/LessonView.vue'),
        meta: routeMeta('Clase', 'Clase en reproducción en Bakanology Academy.', '/app/cursos'),
      },
      {
        path: 'clases-en-vivo',
        name: 'live-classes',
        component: () => import('@/views/dashboard/LiveClassesView.vue'),
        meta: routeMeta('Clases en vivo', 'Próximas clases en vivo de Bakanology Academy.', '/app/clases-en-vivo'),
      },
      {
        path: 'horario',
        name: 'schedule',
        component: () => import('@/views/dashboard/ScheduleView.vue'),
        meta: routeMeta('Horario', 'Horario semanal de actividades de Bakanology Academy.', '/app/horario'),
      },
      {
        path: 'recetas',
        name: 'recipes',
        component: () => import('@/views/dashboard/RecipesView.vue'),
        meta: routeMeta('Recursos', 'Recursos disponibles en Bakanology Academy.', '/app/recetas'),
      },
      {
        path: 'logros',
        name: 'achievements',
        component: () => import('@/views/dashboard/AchievementsView.vue'),
        meta: routeMeta('Logros', 'Tus logros y reconocimientos en Bakanology Academy.', '/app/logros'),
      },
      {
        path: 'configuracion',
        name: 'settings',
        component: () => import('@/views/dashboard/SettingsView/index.vue'),
        meta: routeMeta('Configuración', 'Gestiona tu perfil y suscripción en Bakanology Academy.', '/app/configuracion'),
      },
      {
        path: 'pagos',
        name: 'payments',
        component: () => import('@/views/dashboard/PaymentsView/index.vue'),
        meta: routeMeta('Pagos', 'Gestiona tus pagos y suscripción en Bakanology Academy.', '/app/pagos'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('@/components/admin/AdminLayout.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: '',
        redirect: { name: 'admin-users' },
      },
      {
        path: 'usuarios',
        name: 'admin-users',
        component: () => import('@/views/admin/AdminUsersView/index.vue'),
        meta: routeMeta('Admin - Usuarios', 'Gestión de usuarios de Bakanology Academy.', '/admin/usuarios'),
      },
      {
        path: 'pagos',
        name: 'admin-payments',
        component: () => import('@/views/admin/AdminPaymentsView/index.vue'),
        meta: routeMeta('Admin - Pagos', 'Gestión de pagos de Bakanology Academy.', '/admin/pagos'),
      },
    ],
  },
  {
    path: '/no-permiso',
    name: 'no-permission',
    component: () => import('@/views/admin/NoPermissionView.vue'),
    meta: routeMeta('Sin permiso', 'No tienes permiso para acceder a esta sección.', '/no-permiso'),
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: (to, _from, savedPosition) => {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80,
      }
    }
    return { top: 0, behavior: 'instant' }
  },
})

router.beforeEach((to) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    return { name: 'login' }
  }
  if (to.meta.requiresAdmin && userStore.role !== 'admin') {
    return { name: 'no-permission' }
  }

  if (to.name === 'home' && userStore.isAuthenticated) {
    if (userStore.role === 'admin') return { name: 'admin-users' }
    if (userStore.hasActiveAccess) return { name: 'dashboard' }
    return { name: 'payments' }
  }

  if (
    to.name === 'dashboard' &&
    userStore.isAuthenticated &&
    userStore.role !== 'admin' &&
    !userStore.hasActiveAccess
  ) {
    return { name: 'payments' }
  }

  const publicAuthRoutes = ['login', 'register', 'forgot-password', 'reset-password']
  if (publicAuthRoutes.includes(String(to.name)) && userStore.isAuthenticated) {
    if (userStore.role === 'admin') return { name: 'admin-users' }
    if (userStore.hasActiveAccess) return { name: 'dashboard' }
    return { name: 'payments' }
  }
})

const setMeta = (name: string, content: string) => {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.name = name
    document.head.appendChild(el)
  }
  el.content = content
}

const setOgMeta = (property: string, content: string) => {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.content = content
}

const setCanonical = (href: string) => {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.href = href
}

router.afterEach((to) => {
  const meta = to.meta
  document.title = meta.title ?? BRAND_TITLE
  setMeta('description', meta.description ?? BRAND_DESC)
  setOgMeta('og:title', meta.ogTitle ?? meta.title ?? BRAND_TITLE)
  setOgMeta('og:description', meta.ogDescription ?? meta.description ?? BRAND_DESC)
  setOgMeta('og:url', meta.ogUrl ?? SITE)
  setOgMeta('og:image', meta.ogImage ?? OG_IMAGE)
  setOgMeta('twitter:title', meta.ogTitle ?? meta.title ?? BRAND_TITLE)
  setOgMeta('twitter:description', meta.ogDescription ?? meta.description ?? BRAND_DESC)
  setOgMeta('twitter:image', meta.ogImage ?? OG_IMAGE)
  setCanonical(meta.canonical ?? SITE)
})

export default router
