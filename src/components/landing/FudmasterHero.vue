<script setup lang="ts">
import { onMounted } from 'vue'
import { usePricingModal } from '@/composables/usePricingModal'

const { open } = usePricingModal()

onMounted(() => {
  const existing = document.querySelector('script[src*="wistia.com/player.js"]')
  if (!existing) {
    const s1 = document.createElement('script')
    s1.src = 'https://fast.wistia.com/player.js'
    s1.async = true
    document.head.appendChild(s1)

    const s2 = document.createElement('script')
    s2.src = 'https://fast.wistia.com/embed/odis78v6mn.js'
    s2.async = true
    s2.type = 'module'
    document.head.appendChild(s2)
  }
})
</script>

<template>
  <section class="fud-hero" id="inicio">
    <div class="fud-hero__bg" />
    <div class="fud-hero__inner">
      <div class="fud-hero__video">
        <div class="fud-hero__player">
          <wistia-player media-id="odis78v6mn" aspect="1.7777777777777777" />
        </div>
      </div>

      <div class="fud-hero__content">
        <span class="fud-hero__eyebrow">Bakanology Academy</span>
        <h1 class="fud-hero__title">
          El regalo que necesitas<br />
          <span class="fud-hero__highlight">para transformar tu negocio</span>
        </h1>
        <p class="fud-hero__lede">
          Descubre la metodología de marketing de performance que bakano.ec ha usado con más de 70 clientes para escalar sus ventas sin depender de una agencia.
        </p>
        <div class="fud-hero__actions">
          <button type="button" class="fud-hero__btn fud-hero__btn--primary" @click="open">
            <i class="fa-solid fa-lock-open" />
            Desbloquea tu descuento
          </button>
          <span class="fud-hero__spots">
            <i class="fa-solid fa-fire" />
            Solo 30 cupos disponibles
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.fud-hero {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: $bakano-dark;
  color: $white;
  overflow: hidden;
  padding-top: 7rem;

  @media (min-width: 960px) {
    padding-top: 5.5rem;
  }
}

.fud-hero__bg {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    radial-gradient(ellipse 70% 50% at 10% 30%, rgba($bakano-pink, 0.12) 0%, transparent 55%),
    radial-gradient(ellipse 60% 50% at 90% 80%, rgba($bakano-purple, 0.1) 0%, transparent 55%);
  pointer-events: none;
}

.fud-hero__inner {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: clamp(2rem, 6vw, 5rem) clamp(1.5rem, 6vw, 5rem);
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: center;

  @media (min-width: 960px) {
    grid-template-columns: 1.1fr 0.9fr;
  }
}

.fud-hero__video {
  order: 2;

  @media (min-width: 960px) {
    order: 1;
  }
}

.fud-hero__player {
  width: 100%;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.45);

  wistia-player {
    display: block;
    width: 100%;
  }
}

.fud-hero__content {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  order: 1;

  @media (min-width: 960px) {
    order: 2;
  }

  @media (max-width: 960px) {
    text-align: center;
    align-items: center;
  }
}

.fud-hero__eyebrow {
  font-family: $font-mono;
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: $bakano-pink;
  font-weight: 700;
}

.fud-hero__title {
  font-family: $font-display;
  font-weight: 800;
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.08;
  margin: 0;
}

.fud-hero__highlight {
  color: $bakano-pink;
}

.fud-hero__lede {
  font-family: $font-sans;
  font-size: clamp(1rem, 1.5vw, 1.15rem);
  line-height: 1.65;
  color: rgba($white, 0.75);
  margin: 0;
  max-width: 46ch;
}

.fud-hero__actions {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin-top: 0.5rem;
  align-items: flex-start;

  @media (max-width: 960px) {
    align-items: center;
  }
}

.fud-hero__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1rem 1.75rem;
  border-radius: 999px;
  font-family: $font-sans;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.25s ease;
  border: none;
  text-decoration: none;

  &--primary {
    background: linear-gradient(90deg, $bakano-pink, $bakano-pink-dark);
    color: $white;
    box-shadow: 0 8px 28px rgba($bakano-pink, 0.35);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 34px rgba($bakano-pink, 0.45);
    }
  }
}

.fud-hero__spots {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: $font-mono;
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  color: rgba($white, 0.6);

  i {
    color: $alert-warning;
  }
}
</style>

<style lang="scss">
wistia-player[media-id='odis78v6mn']:not(:defined) {
  background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/odis78v6mn/swatch');
  display: block;
  filter: blur(5px);
  padding-top: 56.25%;
}
</style>
