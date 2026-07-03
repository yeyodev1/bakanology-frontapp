<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'

const dashboardStore = useDashboardStore()

const selectedCategory = ref<string>('todas')

const categories = [
  { value: 'todas', label: 'Todos' },
  { value: 'guía', label: 'Guías' },
  { value: 'plantilla', label: 'Plantillas' },
  { value: 'herramienta', label: 'Herramientas' },
]

const filtered = computed(() =>
  dashboardStore.resourcesByCategory(selectedCategory.value),
)

function categoryLabel(category: string) {
  const labels: Record<string, string> = {
    guía: 'Guía',
    plantilla: 'Plantilla',
    herramienta: 'Herramienta',
  }
  return labels[category] || category
}

const selectedResource = ref<typeof dashboardStore.resources[0] | null>(null)

function open(r: typeof dashboardStore.resources[0]) {
  selectedResource.value = r
}

function closeDetail() {
  selectedResource.value = null
}
</script>

<template>
  <div class="resources-view">
    <section class="stats">
      <div class="stat-card">
        <span class="stat-card__value">{{ filtered.length }}</span>
        <span class="stat-card__label">Recursos disponibles</span>
      </div>
    </section>

    <section class="filters">
      <button
        v-for="cat in categories"
        :key="cat.value"
        class="filter-btn"
        :class="{ 'filter-btn--active': selectedCategory === cat.value }"
        type="button"
        @click="selectedCategory = cat.value"
      >
        {{ cat.label }}
      </button>
    </section>

    <section class="grid">
      <article
        v-for="r in filtered"
        :key="r.id"
        class="card"
        @click="open(r)"
      >
        <div class="card__image">
          <img :src="r.image" :alt="r.title" loading="lazy" />
          <span class="card__category">{{ categoryLabel(r.category) }}</span>
        </div>
        <div class="card__body">
          <h3 class="card__title">{{ r.title }}</h3>
          <p class="card__desc">{{ r.description }}</p>
          <div class="card__meta">
            <span><i class="fa-regular fa-clock" /> {{ r.time }}</span>
          </div>
          <div class="card__tags">
            <span v-for="tag in r.tags" :key="tag" class="card__tag">{{ tag }}</span>
          </div>
        </div>
      </article>
    </section>

    <div v-if="filtered.length === 0" class="empty">
      <p>No hay recursos en esta categoría.</p>
    </div>

    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="selectedResource" class="modal" @click="closeDetail">
          <div class="modal__panel" @click.stop>
            <button class="modal__close" type="button" aria-label="Cerrar" @click="closeDetail">
              <i class="fa-solid fa-xmark" />
            </button>
            <div class="modal__hero">
              <img :src="selectedResource.image" :alt="selectedResource.title" />
              <span class="modal__category">{{ categoryLabel(selectedResource.category) }}</span>
            </div>
            <div class="modal__content">
              <h2 class="modal__title">{{ selectedResource.title }}</h2>
              <p class="modal__desc">{{ selectedResource.description }}</p>
              <div class="modal__meta">
                <span><i class="fa-regular fa-clock" /> {{ selectedResource.time }}</span>
              </div>
              <div class="modal__tags">
                <span v-for="tag in selectedResource.tags" :key="tag" class="modal__tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
.resources-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.stats {
  width: 100%;
}

.stat-card {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1.25rem;
  background: $light;
  border: 1px solid var(--border);
  border-radius: 1rem;

  &__value {
    font-family: $font-display;
    font-size: 1.75rem;
    color: $bakano-dark;
  }

  &__label {
    font-family: $font-sans;
    font-size: 0.85rem;
    color: $gray-500;
  }
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-btn {
  padding: 0.55rem 1rem;
  border-radius: 999px;
  background: $light;
  border: 1px solid var(--border);
  color: $gray-600;
  font-family: $font-mono;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: rgba($bakano-pink, 0.08);
  }

  &--active {
    background: $bakano-dark;
    color: $white;
    border-color: $bakano-dark;
  }
}

.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.card {
  width: calc((100% - 2 * 1.25rem) / 3);
  min-width: 260px;
  flex: 1 1 260px;
  background: $light;
  border: 1px solid var(--border);
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba($bakano-dark, 0.08);
  }

  &__image {
    position: relative;
    aspect-ratio: 4 / 3;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  &__category {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    background: $light;
    color: $bakano-dark;
    font-family: $font-mono;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.35rem 0.6rem;
    border-radius: 999px;
  }

  &__body {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__title {
    font-family: $font-display;
    font-size: 1.15rem;
    font-weight: 600;
    color: $bakano-dark;
    margin: 0;
  }

  &__desc {
    font-family: $font-sans;
    font-size: 0.85rem;
    line-height: 1.5;
    color: $gray-600;
    margin: 0;
  }

  &__meta {
    font-family: $font-sans;
    font-size: 0.8rem;
    color: $gray-500;

    i {
      margin-right: 0.25rem;
    }
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  &__tag {
    font-family: $font-mono;
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: $gray-500;
    padding: 0.25rem 0.5rem;
    border-radius: 999px;
    border: 1px solid var(--border);
  }
}

.empty {
  text-align: center;
  padding: 3rem 1rem;
  color: $gray-500;
  font-family: $font-sans;
}

.modal {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba($bakano-dark, 0.55);
  backdrop-filter: blur(6px);
  overflow-y: auto;
}

.modal__panel {
  position: relative;
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  background: $light;
  border: 1px solid var(--border);
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba($light, 0.92);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: $bakano-dark;
  font-size: 1.1rem;
  cursor: pointer;
  z-index: 2;
  transition: background 0.2s ease;

  &:hover {
    background: $light;
  }
}

.modal__hero {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.modal__category {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: $light;
  color: $bakano-dark;
  font-family: $font-mono;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.45rem 0.8rem;
  border-radius: 999px;
}

.modal__content {
  padding: 1.5rem 2rem 2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.modal__title {
  font-family: $font-display;
  font-size: 1.4rem;
  font-weight: 600;
  color: $bakano-dark;
  margin: 0;
}

.modal__desc {
  font-family: $font-sans;
  font-size: 0.95rem;
  line-height: 1.6;
  color: $gray-600;
  margin: 0;
}

.modal__meta {
  font-family: $font-sans;
  font-size: 0.9rem;
  color: $gray-500;

  i {
    margin-right: 0.3rem;
  }
}

.modal__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.modal__tag {
  font-family: $font-mono;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: $gray-500;
  padding: 0.3rem 0.55rem;
  border-radius: 999px;
  border: 1px solid var(--border);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
