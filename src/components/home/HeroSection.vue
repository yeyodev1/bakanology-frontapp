<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useCloudinary } from '@/composables/useCloudinary'
import { gsap, ScrollTrigger } from '@/composables/useScrollReveal'
import { buildVipUrl } from '@/config/site'
import AppButton from '@/components/ui/AppButton.vue'
import RevealText from '@/components/ui/RevealText.vue'

const { luisa } = useCloudinary()

// Imagen principal (Cloudinary). Como hero usamos foto editorial.
const heroImage = luisa(2, { w: 2200, h: 2600, crop: 'fill', gravity: 'face' })
const heroImagePoster = luisa(2, { w: 800, crop: 'fill', gravity: 'face', blur: 800 })

// Video opcional — del funnel: 'IMG_8601_y5tgbu.mov' (vertical). Se usa como capa secundaria.
const heroVideo = 'https://res.cloudinary.com/dpimsaaa4/video/upload/q_auto,f_auto/v1772741967/IMG_8601_y5tgbu.mov'

const root = ref<HTMLElement | null>(null)
const imageEl = ref<HTMLImageElement | null>(null)

let ctx: gsap.Context | null = null

onMounted(() => {
  if (!root.value) return
  ctx = gsap.context(() => {
    if (imageEl.value) {
      gsap.to(imageEl.value, {
        yPercent: 15,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: root.value,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }

    const cue = root.value!.querySelector('.hero__scroll-cue')
    if (cue) {
      gsap.fromTo(cue, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 1, delay: 1.4, ease: 'power2.out' })
    }
  }, root.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
  ScrollTrigger.refresh()
})
</script>

<template>
  <section class="hero" ref="root" data-theme="dark">
    <div class="hero__media">
      <img
        ref="imageEl"
        class="hero__image"
        :src="heroImage"
        :style="{ backgroundImage: `url(${heroImagePoster})` }"
        alt="Luisa Pita Bejarano — coach de transformación corporal"
        loading="eager"
        fetchpriority="high"
      />
      <video class="hero__video" :src="heroVideo" autoplay loop muted playsinline preload="metadata" aria-hidden="true"></video>
      <div class="hero__veil" aria-hidden="true" />
    </div>

    <div class="hero__inner container">
      <span class="hero__eyebrow eyebrow eyebrow--green">
        <span class="hero__dot" aria-hidden="true" />
        Por invitación · Comunidad anual cerrada
      </span>

      <h1 class="hero__title display-xxl">
        <span class="hero__line">
          <RevealText text="Un año" tag="span" :stagger="0.06" />
        </span>
        <span class="hero__line">
          <RevealText text="con Luisa" tag="span" :stagger="0.06" :delay="0.15" />
        </span>
        <span class="hero__line hero__line--italic">
          <RevealText text="cerca." tag="span" :stagger="0.06" :delay="0.3" />
        </span>
      </h1>

      <p class="hero__lede">
        Coaching anual de transformación corporal para mujeres ocupadas, dueñas de negocio y madres
        decididas a no llegar al próximo año exactamente igual.
      </p>

      <div class="hero__cta-row">
        <AppButton :href="buildVipUrl('hero')" variant="primary" size="lg">Únete a la comunidad</AppButton>
        <a href="#filosofia" class="hero__quiet" data-lenis-prevent>
          <span>Conocer el método</span>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 3v10M3 8l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>

      <p class="hero__legal">No es para todas. Si calificas, recibes el aviso primero.</p>

      <div class="hero__scroll-cue" aria-hidden="true">
        <span>Scroll</span>
        <span class="hero__scroll-line" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  align-items: flex-end;
  padding-block: clamp(7rem, 14vh, 9rem) clamp(2.5rem, 6vw, 4.5rem);
  background: $lpb-black;
  color: $lpb-white;
  overflow: clip;
  isolation: isolate;
}

.hero__media {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: clip;
}

.hero__image {
  position: absolute;
  inset: -10% 0 -10% 0;
  width: 100%;
  height: 120%;
  object-fit: cover;
  object-position: center 30%;
  background-size: cover;
  background-position: center;
  background-color: $lpb-black;
}

.hero__video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  opacity: 0.32;
  mix-blend-mode: screen;
  pointer-events: none;

  @media (max-width: 720px) {
    display: none;
  }
}

.hero__veil {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(60% 80% at 50% 110%, rgba(13, 17, 23, 0.95) 30%, rgba(13, 17, 23, 0.35) 70%, rgba(13, 17, 23, 0) 100%),
    linear-gradient(180deg, rgba(13, 17, 23, 0.65) 0%, rgba(13, 17, 23, 0.15) 40%, rgba(13, 17, 23, 0.85) 100%);
}

.hero__inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 1.6vw, 1.5rem);
  max-width: 1240px;
  width: 100%;
  margin-inline: auto;
}

.hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  color: $lpb-green;
  width: max-content;
}

.hero__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: $lpb-green;
  box-shadow: 0 0 0 4px rgba($lpb-green, 0.25);
  animation: pulse 1.8s ease-in-out infinite;
}

@keyframes pulse {
  50% { box-shadow: 0 0 0 10px rgba($lpb-green, 0); }
}

.hero__title {
  font-family: $font-display;
  font-style: italic;
  font-weight: 400;
  line-height: 0.92;
  margin: 0;
  letter-spacing: -0.025em;
  color: $lpb-white;
  text-wrap: balance;
  max-width: 16ch;
}

.hero__line {
  display: block;
  overflow: hidden;
}

.hero__line--italic {
  font-style: italic;
  color: $lpb-green;
}

.hero__lede {
  font-family: $font-sans;
  font-size: clamp(1.05rem, 1.5vw, 1.3rem);
  line-height: 1.55;
  color: rgba($lpb-white, 0.78);
  max-width: 52ch;
  margin: 0.5rem 0 0;
}

.hero__cta-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem 2rem;
  margin-top: clamp(1rem, 2vw, 1.75rem);
}

.hero__quiet {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  color: $lpb-white;
  font-family: $font-mono;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.85;
  transition: opacity .2s ease, gap .25s ease;

  svg {
    transition: transform .35s ease;
  }

  &:hover {
    opacity: 1;
    gap: 0.85rem;

    svg {
      transform: translateY(3px);
    }
  }
}

.hero__legal {
  font-family: $font-mono;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  color: rgba($lpb-white, 0.55);
  margin: 0.25rem 0 0;
}

.hero__scroll-cue {
  position: absolute;
  right: 0;
  bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  font-family: $font-mono;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba($lpb-white, 0.6);

  @media (max-width: 720px) {
    display: none;
  }
}

.hero__scroll-line {
  width: 1px;
  height: 64px;
  background: linear-gradient(180deg, rgba($lpb-white, 0.6), transparent);
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0 0 auto 0;
    height: 30%;
    background: $lpb-green;
    animation: scroll-cue 2.2s ease-in-out infinite;
  }
}

@keyframes scroll-cue {
  0% { transform: translateY(-100%); }
  60% { transform: translateY(220%); }
  100% { transform: translateY(220%); }
}
</style>
