<script setup lang="ts">
const releases = [
  { status: 'SEMANA PASADA', title: 'Lanzamiento: CRM de Ventas', done: true },
  { status: 'ESTA SEMANA', title: 'Nuevo: Ads que Sí Venden', done: true },
  { status: 'PRÓXIMA SEMANA', title: 'Próximamente: Funnels de Alta Conversión', done: false },
]
</script>

<template>
  <section class="live-academy" id="academia">
    <div class="live-academy__inner">
      <span class="live-academy__eyebrow">📅 No compras un curso estático. Compras una Academia Viva.</span>
      <h2 class="live-academy__title">
        Esto es lo que estamos cocinando<br />
        <span class="live-academy__highlight">para las próximas semanas</span>
      </h2>

      <div class="live-academy__timeline">
        <article
          v-for="(item, i) in releases"
          :key="i"
          class="live-academy__card"
          :class="{ 'live-academy__card--done': item.done, 'live-academy__card--future': !item.done }"
        >
          <span class="live-academy__status">{{ item.status }}</span>
          <h3 class="live-academy__card-title">
            {{ item.title }}
            <i v-if="item.done" class="fa-solid fa-check" />
            <i v-else class="fa-solid fa-fire" />
          </h3>
        </article>
      </div>

      <p class="live-academy__note">
        *Al ser Miembro Fundador, recibes todo esto sin pagar un centavo extra.
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.live-academy {
  padding-block: clamp(4rem, 8vw, 6rem);
  background: $bakano-light;
  color: $bakano-dark;
}

.live-academy__inner {
  max-width: 900px;
  margin: 0 auto;
  padding-inline: clamp(1.5rem, 5vw, 3rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.75rem;
}

.live-academy__eyebrow {
  font-family: $font-mono;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: $bakano-pink;
  font-weight: 700;
}

.live-academy__title {
  font-family: $font-display;
  font-weight: 800;
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  line-height: 1.12;
  margin: 0;
}

.live-academy__highlight {
  color: $bakano-pink;
}

.live-academy__timeline {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 720px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.live-academy__card {
  background: $white;
  border: 1px solid $gray-200;
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-align: left;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba($bakano-dark, 0.08);
  }

  &--done {
    border-color: rgba($bakano-green, 0.35);
  }

  &--future {
    border-color: rgba($bakano-pink, 0.35);
  }
}

.live-academy__status {
  font-family: $font-mono;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: $gray-500;
}

.live-academy__card-title {
  font-family: $font-sans;
  font-size: 1rem;
  font-weight: 700;
  color: $bakano-dark;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;

  i {
    font-size: 0.9rem;
    color: $bakano-green;
  }

  .live-academy__card--future & i {
    color: $bakano-pink;
  }
}

.live-academy__note {
  font-family: $font-sans;
  font-size: 0.85rem;
  color: $gray-600;
  margin: 0;
}
</style>
