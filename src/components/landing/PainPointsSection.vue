<script setup lang="ts">
import { usePricingModal } from '@/composables/usePricingModal'

const { open } = usePricingModal()

const points = [
  { icon: 'fa-solid fa-bug', title: 'Tienes robo hormiga', body: 'Sabes que te roban, pero no sabes dónde ni cuánto. Gastas en pauta sin saber qué trae ventas.' },
  { icon: 'fa-solid fa-chain', title: 'Eres esclavo operativo', body: 'Si tú no abres el local o no respondes los mensajes, nada funciona. No has tenido vacaciones en meses.' },
  { icon: 'fa-solid fa-eye-slash', title: 'Usas marketing ciego', body: 'Pagas el botón "Promocionar" pero no sabes si eso trajo clientes reales ni cuánto te costó cada uno.' },
  { icon: 'fa-solid fa-chart-line', title: 'Tienes ventas estancadas', body: 'Tienes buen producto, pero no tienes clientes o pedidos suficientes para crecer de verdad.' },
  { icon: 'fa-solid fa-water', title: 'Te sientes ahogado', body: 'Ventes bien algunos días, pero al final del mes los números no cierran y no sabes por qué.' },
]
</script>

<template>
  <section class="pain-points" id="para-ti">
    <div class="pain-points__inner">
      <h2 class="pain-points__title">Esto es para ti si...</h2>

      <div class="pain-points__grid">
        <article v-for="(point, i) in points" :key="i" class="pain-points__card">
          <div class="pain-points__icon">
            <i :class="point.icon" />
          </div>
          <div class="pain-points__text">
            <h3>{{ point.title }}</h3>
            <p>{{ point.body }}</p>
          </div>
        </article>
      </div>

      <button type="button" class="pain-points__cta" @click="open">
        <i class="fa-solid fa-gift" />
        Reclama tu descuento de fundador
      </button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.pain-points {
  padding-block: clamp(4rem, 8vw, 6rem);
  background: $bakano-dark;
  color: $white;
}

.pain-points__inner {
  max-width: 1100px;
  margin: 0 auto;
  padding-inline: clamp(1.5rem, 5vw, 3rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.pain-points__title {
  font-family: $font-display;
  font-weight: 800;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  margin: 0;
  text-align: center;
}

.pain-points__grid {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.pain-points__card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba($white, 0.04);
  border: 1px solid rgba($white, 0.08);
  border-radius: 1rem;
  transition: background 0.25s ease, border-color 0.25s ease;

  &:hover {
    background: rgba($white, 0.07);
    border-color: rgba($bakano-pink, 0.3);
  }
}

.pain-points__icon {
  width: 3rem;
  height: 3rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba($bakano-pink, 0.15);
  color: $bakano-pink;
  border-radius: 0.75rem;
  font-size: 1.25rem;
}

.pain-points__text {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  h3 {
    font-family: $font-sans;
    font-size: 1.05rem;
    font-weight: 700;
    margin: 0;
  }

  p {
    font-family: $font-sans;
    font-size: 0.92rem;
    line-height: 1.55;
    color: rgba($white, 0.7);
    margin: 0;
  }
}

.pain-points__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 0.5rem;
  background: linear-gradient(90deg, $bakano-pink, $bakano-pink-dark);
  color: $white;
  border: none;
  border-radius: 999px;
  padding: 1rem 1.75rem;
  font-family: $font-sans;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 8px 28px rgba($bakano-pink, 0.35);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 36px rgba($bakano-pink, 0.45);
  }
}
</style>
