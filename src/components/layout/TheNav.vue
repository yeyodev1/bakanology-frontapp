<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { gsap } from 'gsap'
import BrandWordmark from '@/components/ui/BrandWordmark.vue'
import { buildVipUrl, SITE_COPY, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '@/config/site'

const scrolled = ref(false)
const open = ref(false)
const route = useRoute()
const menuLinks = ref<HTMLElement | null>(null)

const onScroll = () => {
  scrolled.value = window.scrollY > 24
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const toggle = () => {
  open.value = !open.value
  if (open.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const close = () => {
  open.value = false
  document.body.style.overflow = ''
}

// Animación GSAP para los enlaces del menú
watch(open, async (val) => {
  if (val) {
    await nextTick()
    if (menuLinks.value) {
      const links = menuLinks.value.querySelectorAll('.nav__link, .nav__cta, .nav__mobile-footer')
      gsap.fromTo(links, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
      )
    }
  }
})

// Cerrar menú al cambiar de ruta
watch(() => route.path, close)
</script>

<template>
  <header class="nav" :class="{ 'nav--scrolled': scrolled, 'nav--open': open, 'nav--legal': route.name !== 'home' }">
    <div class="nav__inner">
      <RouterLink :to="{ name: 'home' }" class="nav__brand" @click="close" aria-label="Luisa Pita Bejarano — inicio">
        <BrandWordmark size="sm" />
      </RouterLink>

      <div class="nav__actions">
        <nav class="nav__links" :class="{ 'nav__links--open': open }" ref="menuLinks">
          <div class="nav__mobile-header">
             <BrandWordmark size="sm" />
          </div>
          
          <div class="nav__links-container">
            <a href="#filosofia" class="nav__link" @click="close"><span>01.</span> Filosofía</a>
            <a href="#metodologia" class="nav__link" @click="close"><span>02.</span> Metodología</a>
            <a href="#comunidad" class="nav__link" @click="close"><span>03.</span> Comunidad</a>
            <a href="#historias" class="nav__link" @click="close"><span>04.</span> Historias</a>
            
            <a
              class="nav__cta"
              :href="buildVipUrl('nav')"
              target="_blank"
              rel="noopener"
              @click="close"
            >
              <span>{{ SITE_COPY.ctaPrimary }}</span>
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>

          <div class="nav__mobile-footer">
            <a :href="INSTAGRAM_URL" target="_blank" rel="noopener" class="nav__social">
              Instagram {{ INSTAGRAM_HANDLE }}
            </a>
            <p class="nav__copy">© {{ new Date().getFullYear() }} Luisa Pita Bejarano</p>
          </div>
        </nav>

        <button class="nav__burger" type="button" @click="toggle" :aria-label="open ? 'Cerrar menú' : 'Abrir menú'" :aria-expanded="open">
          <span /><span />
        </button>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.nav {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 1000;
  padding-block: 1.5rem;
  transition: background-color .4s ease, padding .4s ease, color .4s ease;
  color: $lpb-black;

  &:not(.nav--scrolled):not(.nav--legal):not(.nav--open) {
    color: $lpb-white;
  }

  &--scrolled,
  &--legal,
  &--open {
    background-color: rgba($lpb-paper, 0.85);
    backdrop-filter: saturate(180%) blur(16px);
    -webkit-backdrop-filter: saturate(180%) blur(16px);
    color: $lpb-black;
    padding-block: 1.1rem;
    border-bottom: 1px solid rgba($lpb-black, 0.05);
  }

  &--open {
    background-color: $lpb-paper;
    height: 100vh;
  }
}

.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-inline: clamp(1.5rem, 6vw, 6rem);
  margin-inline: auto;
  max-width: 1440px;
}

.nav__brand {
  display: inline-flex;
  align-items: center;
  height: 28px;
  flex-shrink: 0;
  z-index: 1001;
}

.nav__actions {
  display: flex;
  align-items: center;
}

.nav__links {
  display: flex;
  align-items: center;
  gap: clamp(1.5rem, 3vw, 2.5rem);

  @media (max-width: 880px) {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100vh;
    background: $lpb-paper;
    flex-direction: column;
    justify-content: space-between;
    padding: 7rem 2rem 4rem;
    opacity: 0;
    pointer-events: none;
    transition: opacity .4s ease;
    z-index: 1000;

    &--open {
      opacity: 1;
      pointer-events: auto;
    }
  }
}

.nav__mobile-header {
  display: none;
  @media (max-width: 880px) {
    display: block;
    opacity: 0.1;
    position: absolute;
    top: 2rem;
    left: 2rem;
  }
}

.nav__links-container {
  display: flex;
  align-items: center;
  gap: inherit;

  @media (max-width: 880px) {
    flex-direction: column;
    width: 100%;
    gap: 1.5rem;
  }
}

.nav__link {
  font-family: $font-mono;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: currentColor;
  opacity: 0.8;
  transition: opacity .25s ease, color .25s ease;

  span {
    font-size: 0.7em;
    opacity: 0.5;
    margin-right: 0.5rem;
  }

  &:hover {
    opacity: 1;
    color: $lpb-green-dark;
  }

  @media (max-width: 880px) {
    font-family: $font-display;
    font-style: italic;
    font-size: clamp(2.5rem, 10vw, 4rem);
    text-transform: none;
    letter-spacing: -0.02em;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid rgba($lpb-black, 0.05);
    padding-bottom: 1rem;

    span {
      display: none;
    }
  }
}

.nav__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  background: $lpb-black;
  color: $lpb-white !important;
  padding: 0.8rem 1.4rem;
  border-radius: 999px;
  font-family: $font-mono;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: background .3s ease, transform .3s ease;

  &:hover {
    background: $lpb-green-dark;
    transform: translateY(-2px);
  }

  @media (max-width: 880px) {
    margin-top: 2rem;
    width: 100%;
    max-width: 320px;
    padding: 1.25rem 2rem;
    font-size: 0.9rem;
    justify-content: space-between;
  }
}

.nav__mobile-footer {
  display: none;
  @media (max-width: 880px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;
    padding-top: 2rem;
    border-top: 1px solid rgba($lpb-black, 0.1);
  }
}

.nav__social {
  font-family: $font-mono;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: $lpb-graphite;
}

.nav__copy {
  font-family: $font-mono;
  font-size: 0.65rem;
  color: rgba($lpb-black, 0.3);
  text-transform: uppercase;
}

.nav__burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  width: 32px;
  height: 32px;
  z-index: 1001;
  color: currentColor;

  span {
    display: block;
    width: 100%;
    height: 2px;
    background: currentColor;
    transition: transform .4s cubic-bezier(.2,.7,0,1), opacity .3s ease;
    transform-origin: center;
  }

  @media (max-width: 880px) {
    display: flex;
  }
}

.nav--open .nav__burger {
  span:nth-child(1) { transform: translateY(4px) rotate(45deg); }
  span:nth-child(2) { transform: translateY(-4px) rotate(-45deg); }
}

// Contraste para el CTA cuando no hay scroll y es home
.nav:not(.nav--scrolled):not(.nav--legal):not(.nav--open) .nav__cta {
  background: $lpb-white;
  color: $lpb-black !important;
}
</style>
