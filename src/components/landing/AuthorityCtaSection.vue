<script setup lang="ts">
import { useCloudinary } from '@/composables/useCloudinary'

const { img } = useCloudinary()
const luisPortrait = img('bakanology/luis-founder', { w: 400, h: 400, crop: 'fill', gravity: 'face' })
const denissePortrait = img('bakanology/denisse-cofounder', { w: 400, h: 400, crop: 'fill', gravity: 'face' })
</script>

<template>
  <section class="authority-cta" id="bakano">
    <div class="authority-cta__inner">
      <div class="authority-cta__content">
        <span class="authority-cta__eyebrow">Hecho por operadores, no por gurús</span>
        <h2 class="authority-cta__title">
          Si quieres que hagamos todo esto por ti<br />
          <span class="authority-cta__highlight">y solo te dediques a crecer</span>
        </h2>
        <p class="authority-cta__lede">
          Detrás de Bakanology Academy está <strong>bakano.ec</strong>: la agencia que ha transformado más de 150 negocios en Ecuador usando datos, marketing y tecnología.
        </p>
        <p class="authority-cta__body">
          No vendemos cursos de teoría. Operamos restaurantes, dark kitchens, marcas de servicios y e-commerce todos los días. Si prefieres que seamos nosotros quienes implementemos el sistema en tu negocio, escríbenos.
        </p>

        <div class="authority-cta__stats">
          <div class="authority-cta__stat">
            <strong>150+</strong>
            <span>negocios transformados</span>
          </div>
          <div class="authority-cta__stat">
            <strong>20%</strong>
            <span>aumento promedio en facturación</span>
          </div>
          <div class="authority-cta__stat">
            <strong>24h</strong>
            <span>diagnóstico inicial sin costo</span>
          </div>
        </div>

        <a
          href="https://bakano.ec/"
          target="_blank"
          rel="noopener"
          class="authority-cta__btn"
        >
          Escribirnos en bakano.ec
          <i class="fa-solid fa-arrow-up-right-from-square" />
        </a>
      </div>

      <div class="authority-cta__team">
        <div class="authority-cta__founder">
          <img :src="luisPortrait" alt="Luis Reyes — Founder & Estratega de Datos" loading="lazy" />
          <div>
            <strong>Luis Reyes</strong>
            <span>Founder & Estratega de Datos</span>
          </div>
        </div>
        <div class="authority-cta__founder">
          <img :src="denissePortrait" alt="Denisse Quimi — CMO & Estratega de Marketing Digital" loading="lazy" />
          <div>
            <strong>Denisse Quimi</strong>
            <span>CMO & Estratega de Marketing Digital</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.authority-cta {
  padding-block: clamp(4rem, 8vw, 6rem);
  background: linear-gradient(180deg, $bakano-dark 0%, #0f0d18 100%);
  color: $white;
}

.authority-cta__inner {
  max-width: 1100px;
  margin: 0 auto;
  padding-inline: clamp(1.5rem, 5vw, 3rem);
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: center;

  @media (min-width: 960px) {
    grid-template-columns: 1.1fr 0.9fr;
  }
}

.authority-cta__content {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (max-width: 960px) {
    text-align: center;
    align-items: center;
  }
}

.authority-cta__eyebrow {
  font-family: $font-mono;
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: $bakano-pink;
  font-weight: 700;
}

.authority-cta__title {
  font-family: $font-display;
  font-weight: 800;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  line-height: 1.1;
  margin: 0;
}

.authority-cta__highlight {
  color: $bakano-pink;
}

.authority-cta__lede,
.authority-cta__body {
  font-family: $font-sans;
  font-size: 1rem;
  line-height: 1.65;
  color: rgba($white, 0.75);
  margin: 0;
  max-width: 56ch;

  strong {
    color: $white;
    font-weight: 700;
  }
}

.authority-cta__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 520px;
  margin-top: 0.5rem;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
}

.authority-cta__stat {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem;
  background: rgba($white, 0.05);
  border: 1px solid rgba($white, 0.08);
  border-radius: 0.75rem;
  text-align: center;

  strong {
    font-family: $font-display;
    font-size: 1.6rem;
    font-weight: 800;
    color: $bakano-green;
  }

  span {
    font-family: $font-sans;
    font-size: 0.75rem;
    line-height: 1.4;
    color: rgba($white, 0.6);
  }
}

.authority-cta__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 0.5rem;
  background: $white;
  color: $bakano-dark;
  border-radius: 999px;
  padding: 1rem 1.75rem;
  font-family: $font-sans;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba($white, 0.2);
  }

  i {
    font-size: 0.85rem;
  }
}

.authority-cta__team {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.authority-cta__founder {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: rgba($white, 0.04);
  border: 1px solid rgba($white, 0.08);
  border-radius: 999px;
  transition: border-color 0.25s ease, transform 0.25s ease;

  &:hover {
    border-color: rgba($bakano-pink, 0.35);
    transform: translateX(4px);
  }

  img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid $bakano-pink;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  strong {
    font-family: $font-display;
    font-size: 1rem;
    font-weight: 700;
  }

  span {
    font-family: $font-mono;
    font-size: 0.7rem;
    letter-spacing: 0.04em;
    color: rgba($white, 0.55);
  }
}
</style>
