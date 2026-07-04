<script setup lang="ts">
import { useCloudinary } from '@/composables/useCloudinary'

const { img } = useCloudinary()
const luisPortrait = img('bakanology/luis-founder', { w: 400, h: 400, crop: 'fill', gravity: 'face' })
const denissePortrait = img('bakanology/denisse-cofounder', { w: 400, h: 400, crop: 'fill', gravity: 'face' })
</script>

<template>
  <section class="guarantee" id="garantia">
    <div class="guarantee__inner">
      <div class="guarantee__badge">
        <span>100%</span>
        <small>HONESTO</small>
      </div>

      <div class="guarantee__content">
        <h2 class="guarantee__title">
          No somos gurús.<br />
          <span class="guarantee__highlight">Somos operadores.</span>
        </h2>
        <p class="guarantee__lede">
          Nuestra garantía es nuestra propia reputación y resultados. A diferencia de otros cursos, nosotros operamos negocios todos los días.
        </p>
        <p class="guarantee__body">
          Si aplicas la metodología de Bakanology, demuestras que no has mejorado tus números en 30 días y has visto todos los cursos, te regalamos una sesión de auditoría 1 a 1 para arreglarlo personalmente contigo.
        </p>
      </div>

      <div class="guarantee__founders">
        <div class="guarantee__founder">
          <img :src="luisPortrait" alt="Luis — Fundador de bakano.ec" loading="lazy" />
          <div>
            <strong>Luis</strong>
            <span>Fundador & Operador</span>
          </div>
        </div>
        <div class="guarantee__founder">
          <img :src="denissePortrait" alt="Denisse — Cofundadora de bakano.ec" loading="lazy" />
          <div>
            <strong>Denisse</strong>
            <span>Cofundadora & Operadora</span>
          </div>
        </div>
      </div>

      <p class="guarantee__role">FUNDADORES & OPERADORES ACTIVOS</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.guarantee {
  padding-block: clamp(4rem, 8vw, 6rem);
  background: linear-gradient(180deg, #0f0d18 0%, $bakano-dark 100%);
  color: $white;
}

.guarantee__inner {
  max-width: 900px;
  margin: 0 auto;
  padding-inline: clamp(1.5rem, 5vw, 3rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.75rem;
}

.guarantee__badge {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background: conic-gradient(from 180deg, $bakano-green, $bakano-pink, $bakano-green);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: $white;
  box-shadow: 0 12px 40px rgba($bakano-green, 0.25);

  span {
    font-family: $font-display;
    font-size: 1.6rem;
    font-weight: 800;
    line-height: 1;
  }

  small {
    font-family: $font-mono;
    font-size: 0.55rem;
    letter-spacing: 0.12em;
    font-weight: 700;
  }
}

.guarantee__title {
  font-family: $font-display;
  font-weight: 800;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  line-height: 1.1;
  margin: 0;
}

.guarantee__highlight {
  color: $bakano-pink;
}

.guarantee__lede {
  font-family: $font-sans;
  font-size: 1.05rem;
  line-height: 1.6;
  color: rgba($white, 0.85);
  margin: 0;
  max-width: 56ch;
}

.guarantee__body {
  font-family: $font-sans;
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba($white, 0.65);
  margin: 0;
  max-width: 64ch;
}

.guarantee__founders {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 0.5rem;
}

.guarantee__founder {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  background: rgba($white, 0.05);
  border: 1px solid rgba($white, 0.1);
  border-radius: 999px;
  padding: 0.5rem 1.25rem 0.5rem 0.5rem;

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid $bakano-pink;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }

  strong {
    font-family: $font-display;
    font-size: 1rem;
    font-weight: 700;
  }

  span {
    font-family: $font-mono;
    font-size: 0.65rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba($white, 0.55);
  }
}

.guarantee__role {
  font-family: $font-mono;
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba($white, 0.4);
  margin: 0.5rem 0 0;
}
</style>
