<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { gsap } from 'gsap'
import BrandWordmark from '@/components/ui/BrandWordmark.vue'
import { buildVipUrl, SITE_COPY, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '@/config/site'

const scrolled = ref(false)
const open = ref(false)
const route = useRoute()
const menuContainer = ref<HTMLElement | null>(null)

const onScroll = () => {
  scrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const toggle = () => {
  open.value = !open.value
  document.body.style.overflow = open.value ? 'hidden' : ''
}

const close = () => {
  if (!open.value) return
  open.value = false
  document.body.style.overflow = ''
}

watch(open, async (val) => {
  if (val && window.innerWidth < 880) {
    await nextTick()
    const links = menuContainer.value?.querySelectorAll('.nav__link, .nav__cta, .nav__mobile-footer')
    if (links) {
      gsap.fromTo(links,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power3.out',
          clearProps: 'all',
        },
      )
    }
  }
})

watch(() => route.path, close)
</script>

<template>
  <header
    class="nav"
    :class="{
      'nav--scrolled': scrolled,
      'nav--open': open,
      'nav--legal': route.name !== 'home',
    }"
  >
    <div class="nav__inner">
      <RouterLink :to="{ name: 'home' }" class="nav__brand" @click="close">
        <BrandWordmark size="sm" />
      </RouterLink>

      <div class="nav__backdrop" :class="{ 'nav__backdrop--visible': open }" @click="close" />

      <div
        class="nav__content"
        :class="{ 'nav__content--open': open }"
        ref="menuContainer"
      >
        <nav class="nav__links">
          <a href="#filosofia" class="nav__link" @click="close">
            <span class="nav__num">01</span> Filosofía
          </a>
          <a href="#metodologia" class="nav__link" @click="close">
            <span class="nav__num">02</span> Metodología
          </a>
          <a href="#comunidad" class="nav__link" @click="close">
            <span class="nav__num">03</span> Comunidad
          </a>
          <a href="#historias" class="nav__link" @click="close">
            <span class="nav__num">04</span> Historias
          </a>

          <a :href="buildVipUrl('nav')" class="nav__cta" @click="close">
            <span>{{ SITE_COPY.ctaPrimary }}</span>
            <i class="fa-solid fa-arrow-right" />
          </a>
        </nav>

        <div class="nav__mobile-footer">
          <a :href="INSTAGRAM_URL" target="_blank" rel="noopener" class="nav__social">
            Instagram {{ INSTAGRAM_HANDLE }}
          </a>
          <p class="nav__copy">© {{ new Date().getFullYear() }} Luisa Pita Bejarano</p>
        </div>
      </div>

      <button
        class="nav__burger"
        type="button"
        @click="toggle"
        :aria-label="open ? 'Cerrar menú' : 'Abrir menú'"
      >
        <span />
        <span />
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding-block: 1.2rem;
  transition: padding 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  color: $lpb-black;

  &:not(.nav--scrolled):not(.nav--legal):not(.nav--open) {
    color: $lpb-white;
  }

  &--scrolled,
  &--legal {
    background: rgba($lpb-paper, 0.92);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    padding-block: 0.8rem;
    border-bottom: 1px solid rgba($lpb-black, 0.06);
  }
}

.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: clamp(1.2rem, 5vw, 2.5rem);
  max-width: 1440px;
  margin: 0 auto;
}

.nav__brand {
  z-index: 1101;
  position: relative;
}

.nav__burger {
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 1101;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  color: inherit;

  span {
    display: block;
    width: 24px;
    height: 2px;
    background: currentColor;
    border-radius: 1px;
    transition: transform 0.35s cubic-bezier(0.2, 0.7, 0, 1);
    transform-origin: center;
  }

  .nav--open & {
    span:nth-child(1) {
      transform: translateY(4px) rotate(45deg);
    }

    span:nth-child(2) {
      transform: translateY(-4px) rotate(-45deg);
    }
  }
}

/* Overlay backdrop: click-to-close area */
.nav__backdrop {
  position: fixed;
  inset: 0;
  z-index: 1049;
  background: rgba($lpb-black, 0.3);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.35s ease, visibility 0.35s ease;
  -webkit-tap-highlight-color: transparent;

  &--visible {
    opacity: 1;
    visibility: visible;
  }
}

/* Full-screen mobile menu */
.nav__content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  height: 100dvh;
  background: $lpb-paper;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5rem 2rem 3rem;
  z-index: 1050;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s ease, visibility 0.4s ease;

  &--open {
    opacity: 1;
    visibility: visible;
  }
}

.nav__links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  max-width: 380px;
  text-align: center;
}

.nav__link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-family: $font-display;
  font-size: 2rem;
  font-weight: 450;
  color: $lpb-black;
  text-decoration: none;
  padding: 0.6rem 0;
  border-bottom: 1px solid rgba($lpb-black, 0.05);
  transition: color 0.25s ease;

  &:hover {
    color: $lpb-green-dark;
  }

  .nav__num {
    font-family: $font-mono;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    color: $lpb-muted;
    margin-top: 0.25em;
  }
}

.nav__cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: $lpb-black;
  color: $lpb-white;
  padding: 1rem 1.5rem;
  border-radius: 999px;
  font-family: $font-mono;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  margin-top: 1.25rem;
  text-decoration: none;
  transition: background 0.25s ease, transform 0.3s ease;

  &:hover {
    background: $lpb-green-dark;
    transform: scale(1.02);
  }

  i {
    font-size: 0.75rem;
  }
}

.nav__mobile-footer {
  margin-top: auto;
  padding-top: 3rem;
  text-align: center;
  font-family: $font-mono;
  text-transform: uppercase;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: rgba($lpb-black, 0.35);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.25s ease;

    &:hover {
      color: $lpb-green-dark;
    }
  }
}

/* --- DESKTOP (min-width: 880px) --- */
@media (min-width: 880px) {
  .nav__inner {
    padding-inline: clamp(2.5rem, 9vw, 9rem);
  }

  .nav__backdrop {
    display: none !important;
  }

  .nav__burger,
  .nav__mobile-footer {
    display: none !important;
  }

  .nav__content {
    position: static;
    background: transparent;
    padding: 0;
    height: auto;
    width: auto;
    overflow: visible;
    opacity: 1 !important;
    visibility: visible !important;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .nav__links {
    flex-direction: row;
    max-width: none;
    width: auto;
    gap: 2.5rem;
    align-items: center;
  }

  .nav__link {
    font-family: $font-sans;
    font-size: 0.9rem;
    font-weight: 450;
    padding: 0;
    border: none;
    opacity: 0.7;
    gap: 0.4rem;

    &:hover {
      opacity: 1;
      color: inherit;
    }

    .nav__num {
      font-size: 0.6rem;
      color: inherit;
      opacity: 0.4;
      margin-top: 0;
    }
  }

  .nav__cta {
    background: $lpb-black;
    color: $lpb-white;
    padding: 0.65rem 1.35rem;
    font-size: 0.75rem;
    margin-top: 0;
    gap: 0.5rem;

    .nav:not(.nav--scrolled):not(.nav--legal) & {
      background: $lpb-white;
      color: $lpb-black;
    }

    &:hover {
      background: $lpb-green-dark;
      color: $lpb-white;
      transform: none;
    }
  }
}
</style>
