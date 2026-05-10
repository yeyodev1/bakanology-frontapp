<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import BrandWordmark from '@/components/ui/BrandWordmark.vue'
import { buildVipUrl, SITE_COPY } from '@/config/site'

const scrolled = ref(false)
const open = ref(false)
const route = useRoute()

const onScroll = () => {
  scrolled.value = window.scrollY > 24
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const toggle = () => (open.value = !open.value)
const close = () => (open.value = false)
</script>

<template>
  <header class="nav" :class="{ 'nav--scrolled': scrolled, 'nav--open': open, 'nav--legal': route.name !== 'home' }">
    <div class="nav__inner container">
      <RouterLink :to="{ name: 'home' }" class="nav__brand" @click="close" aria-label="Luisa Pita Bejarano — inicio">
        <BrandWordmark size="sm" />
      </RouterLink>

      <nav class="nav__links" :aria-expanded="open">
        <a href="#filosofia" class="nav__link" @click="close">Filosofía</a>
        <a href="#metodologia" class="nav__link" @click="close">Metodología</a>
        <a href="#comunidad" class="nav__link" @click="close">Comunidad</a>
        <a href="#historias" class="nav__link" @click="close">Historias</a>
        <a
          class="nav__cta"
          :href="buildVipUrl('nav')"
          target="_blank"
          rel="noopener"
          @click="close"
        >
          <span>{{ SITE_COPY.ctaPrimary }}</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </nav>

      <button class="nav__burger" type="button" @click="toggle" :aria-label="open ? 'Cerrar menú' : 'Abrir menú'" :aria-expanded="open">
        <span /><span /><span />
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.nav {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 100;
  padding-block: 1.1rem;
  transition: background-color .35s ease, border-color .35s ease, padding .25s ease, color .35s ease;
  color: $lpb-black;
  border-bottom: 1px solid transparent;

  // Cuando está sobre el hero negro
  &:not(.nav--scrolled):not(.nav--legal) {
    color: $lpb-white;
  }

  &--scrolled,
  &--legal,
  &--open {
    background-color: rgba($lpb-paper, 0.85);
    backdrop-filter: saturate(160%) blur(14px);
    -webkit-backdrop-filter: saturate(160%) blur(14px);
    border-bottom-color: $lpb-line;
    color: $lpb-black;
    padding-block: 0.85rem;
  }
}

.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.nav__brand {
  display: inline-flex;
  align-items: center;
  height: 28px;
  flex-shrink: 0;
}

.nav__logo {
  height: 26px;
  width: auto;
  color: currentColor;
}

.nav__links {
  display: flex;
  align-items: center;
  gap: clamp(1rem, 2.5vw, 2rem);
  margin-left: auto;

  @media (max-width: 880px) {
    position: fixed;
    inset: 64px 0 auto 0;
    flex-direction: column;
    align-items: stretch;
    background: $lpb-paper;
    padding: 1.5rem clamp(1.25rem, 4vw, 2.5rem) 2rem;
    gap: 0.25rem;
    border-bottom: 1px solid $lpb-line;
    transform: translateY(-110%);
    transition: transform .4s cubic-bezier(.2,.7,0,1);
  }
}

.nav--open .nav__links {
  transform: translateY(0);
}

.nav__link {
  font-family: $font-mono;
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  position: relative;
  padding: 0.4rem 0;
  color: currentColor;
  opacity: 0.85;
  transition: opacity .2s ease;

  &::after {
    content: '';
    position: absolute;
    inset: auto 0 -2px 0;
    height: 1px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform .35s cubic-bezier(.2,.7,0,1);
  }

  &:hover {
    opacity: 1;

    &::after {
      transform: scaleX(1);
    }
  }

  @media (max-width: 880px) {
    padding: 0.85rem 0;
    border-bottom: 1px solid rgba($lpb-black, 0.08);
    font-size: 0.95rem;

    &::after {
      display: none;
    }
  }
}

.nav__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  background: $lpb-black;
  color: $lpb-white;
  padding: 0.7rem 1.1rem;
  border-radius: 999px;
  font-family: $font-mono;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: background .25s ease, transform .25s ease;

  &:hover {
    background: $lpb-green;
    color: $lpb-black;
    transform: translateY(-1px);
  }
}

// Cuando estamos sobre hero negro, invertimos el CTA para contraste
.nav:not(.nav--scrolled):not(.nav--legal) .nav__cta {
  background: $lpb-white;
  color: $lpb-black;

  &:hover {
    background: $lpb-green;
  }
}

.nav__burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 8px;

  span {
    display: block;
    width: 22px;
    height: 1.5px;
    background: currentColor;
    transition: transform .3s ease, opacity .25s ease;
  }

  @media (max-width: 880px) {
    display: inline-flex;
  }
}

.nav--open .nav__burger {
  span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  span:nth-child(2) { opacity: 0; }
  span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
}
</style>
