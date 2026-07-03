<script setup lang="ts">
import { useCloudinary } from '@/composables/useCloudinary'
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '@/config/site'

const { img } = useCloudinary()
const luisPortrait = img('bakanology/luis-founder', { w: 800, h: 1000, crop: 'fill', gravity: 'face' })
const denissePortrait = img('bakanology/denisse-cofounder', { w: 800, h: 1000, crop: 'fill', gravity: 'face' })
</script>

<template>
  <section class="authority">
    <div class="authority__inner">
      <span class="authority__eyebrow">Creado por bakano.ec</span>
      <h2 class="authority__title">Más de 70 clientes escalaron su facturación con nuestra metodología</h2>
      <p class="authority__lede">
        En bakano.ec hemos ayudado a más de 70 clientes a escalar su facturación en tan solo 6 meses.
        Trabajamos con restaurantes que facturan desde $15K/mes y servicios desde $10K/mes.
        Ahora ponemos toda esa experiencia en tus manos.
      </p>

      <div class="authority__founders">
        <div class="authority__founder">
          <div class="authority__founder-img">
            <img :src="luisPortrait" alt="Luis — Fundador de bakano.ec" loading="lazy" />
          </div>
          <div class="authority__founder-info">
            <strong class="authority__founder-name">Luis</strong>
            <span class="authority__founder-role">Fundador · bakano.ec</span>
          </div>
        </div>
        <div class="authority__founder">
          <div class="authority__founder-img">
            <img :src="denissePortrait" alt="Denisse — Cofundadora de bakano.ec" loading="lazy" />
          </div>
          <div class="authority__founder-info">
            <strong class="authority__founder-name">Denisse</strong>
            <span class="authority__founder-role">Cofundadora · bakano.ec</span>
          </div>
        </div>
      </div>

      <div class="authority__stats">
        <div class="authority__stat">
          <span class="authority__stat-value">70+</span>
          <span class="authority__stat-label">Clientes atendidos</span>
        </div>
        <div class="authority__stat">
          <span class="authority__stat-value">6</span>
          <span class="authority__stat-label">Meses para escalar</span>
        </div>
        <div class="authority__stat">
          <span class="authority__stat-value">$15K</span>
          <span class="authority__stat-label">Facturación mínima</span>
        </div>
      </div>

      <a :href="INSTAGRAM_URL" target="_blank" rel="noopener" class="authority__instagram">
        <i class="fa-brands fa-instagram" aria-hidden="true" />
        <span>{{ INSTAGRAM_HANDLE }}</span>
      </a>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.authority {
  padding-block: 5rem;
  background: $white;
}

.authority__inner {
  max-width: 800px;
  margin: 0 auto;
  padding-inline: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
}

.authority__eyebrow {
  font-family: $font-mono;
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: $bakano-pink;
  font-weight: 600;
}

.authority__title {
  font-family: $font-display;
  font-weight: 800;
  font-size: clamp(1.5rem, 3.5vw, 2.2rem);
  color: $bakano-dark;
  margin: 0;
  max-width: 600px;
}

.authority__lede {
  font-family: $font-sans;
  font-size: 1rem;
  line-height: 1.65;
  color: $gray-600;
  max-width: 600px;
  margin: 0;
}

.authority__founders {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  margin-top: 1rem;
}

.authority__founder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.authority__founder-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid $bakano-pink;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.authority__founder-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
}

.authority__founder-name {
  font-family: $font-display;
  font-weight: 700;
  font-size: 1.1rem;
  color: $bakano-dark;
}

.authority__founder-role {
  font-family: $font-mono;
  font-size: 0.75rem;
  color: $gray-500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.authority__stats {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  margin-top: 1rem;
}

.authority__stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.authority__stat-value {
  font-family: $font-display;
  font-weight: 800;
  font-size: 2rem;
  color: $bakano-pink;
  line-height: 1;
}

.authority__stat-label {
  font-family: $font-mono;
  font-size: 0.72rem;
  color: $gray-500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.authority__instagram {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: $bakano-dark;
  font-family: $font-mono;
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-top: 0.5rem;
  transition: color .25s ease;

  &:hover {
    color: $bakano-pink;
  }
}
</style>
