<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

interface Notification {
  business: string
  city: string
  action: string
  timeAgo: string
}

const notifications: Notification[] = [
  { business: 'Taz Taz', city: 'Guayaquil', action: 'compró Bakanology Academy y está mejorando su facturación', timeAgo: 'hace 2 min' },
  { business: 'Sweet Glase', city: 'Quito', action: 'se unió como miembro fundador', timeAgo: 'hace 5 min' },
  { business: 'Restaurante La Canoa', city: 'Cuenca', action: 'activó su acceso de por vida', timeAgo: 'hace 8 min' },
  { business: 'Nicole Pastry Arts', city: 'Guayaquil', action: 'está aplicando la metodología de ventas', timeAgo: 'hace 12 min' },
  { business: 'Café del Barrio', city: 'Manta', action: 'compró Bakanology Academy y está mejorando su facturación', timeAgo: 'hace 15 min' },
  { business: 'Fritega', city: 'Quito', action: 'se unió como miembro fundador', timeAgo: 'hace 19 min' },
  { business: 'Sucree', city: 'Guayaquil', action: 'activó su acceso de por vida', timeAgo: 'hace 23 min' },
  { business: 'Los Hornos de María', city: 'Ambato', action: 'está aplicando la metodología de ventas', timeAgo: 'hace 27 min' },
  { business: 'Sushi Roll', city: 'Cuenca', action: 'compró Bakanology Academy y está mejorando su facturación', timeAgo: 'hace 31 min' },
  { business: 'El Mercado Gastro', city: 'Loja', action: 'se unió como miembro fundador', timeAgo: 'hace 36 min' },
  { business: 'La Pizarra', city: 'Guayaquil', action: 'activó su acceso de por vida', timeAgo: 'hace 42 min' },
  { business: 'Crepes & Waffles Local', city: 'Quito', action: 'está aplicando la metodología de ventas', timeAgo: 'hace 48 min' },
]

const currentIndex = ref(0)
const visible = ref(false)
const current = ref<Notification>(notifications[0]!)
let intervalTimer: ReturnType<typeof setInterval> | null = null
let showTimer: ReturnType<typeof setTimeout> | null = null

function nextNotification() {
  visible.value = false
  setTimeout(() => {
    currentIndex.value = (currentIndex.value + 1) % notifications.length
    current.value = notifications[currentIndex.value]!
    visible.value = true
  }, 400)
}

onMounted(() => {
  showTimer = setTimeout(() => { visible.value = true }, 2000)
  intervalTimer = setInterval(nextNotification, 7000)
})

onBeforeUnmount(() => {
  if (intervalTimer) clearInterval(intervalTimer)
  if (showTimer) clearTimeout(showTimer)
})
</script>

<template>
  <Transition name="bubble">
    <div v-if="visible" class="social-proof" role="status" aria-live="polite">
      <div class="social-proof__avatar">
        <i class="fa-solid fa-store" />
      </div>
      <div class="social-proof__content">
        <p class="social-proof__text">
          <strong>{{ current.business }}</strong> {{ current.action }}
        </p>
        <span class="social-proof__meta">
          <i class="fa-solid fa-location-dot" /> {{ current.city }} · {{ current.timeAgo }}
        </span>
      </div>
      <div class="social-proof__pulse" aria-hidden="true" />
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.social-proof {
  position: fixed;
  left: 1rem;
  bottom: 1rem;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  max-width: 360px;
  padding: 0.85rem 1rem;
  background: $white;
  border: 1px solid $gray-200;
  border-radius: 1rem;
  box-shadow: 0 12px 40px rgba($bakano-dark, 0.18);

  @media (max-width: 520px) {
    left: 0.75rem;
    right: 0.75rem;
    bottom: 0.75rem;
    max-width: none;
  }
}

.social-proof__avatar {
  width: 2.75rem;
  height: 2.75rem;
  flex-shrink: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, $bakano-pink, $bakano-purple);
  color: $white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.social-proof__content {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
}

.social-proof__text {
  font-family: $font-sans;
  font-size: 0.85rem;
  line-height: 1.45;
  color: $bakano-dark;
  margin: 0;

  strong {
    font-weight: 700;
  }
}

.social-proof__meta {
  font-family: $font-mono;
  font-size: 0.65rem;
  letter-spacing: 0.04em;
  color: $gray-500;
  display: flex;
  align-items: center;
  gap: 0.35rem;

  i {
    font-size: 0.6rem;
    color: $bakano-pink;
  }
}

.social-proof__pulse {
  position: absolute;
  top: 0.55rem;
  right: 0.55rem;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: $bakano-green;
  box-shadow: 0 0 0 0 rgba($bakano-green, 0.6);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba($bakano-green, 0.6);
  }
  70% {
    box-shadow: 0 0 0 8px rgba($bakano-green, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba($bakano-green, 0);
  }
}

.bubble-enter-active,
.bubble-leave-active {
  transition: transform 0.4s cubic-bezier(0.2, 0.7, 0, 1), opacity 0.4s ease;
}

.bubble-enter-from,
.bubble-leave-to {
  opacity: 0;
  transform: translateX(-120%);
}

.bubble-enter-to,
.bubble-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
