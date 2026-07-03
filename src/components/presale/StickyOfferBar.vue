<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const deadlineStr = import.meta.env.VITE_PRESALE_DEADLINE as string

const now = ref(Date.now())
let timer: ReturnType<typeof setInterval> | null = null

const diff = computed(() => Math.max(0, new Date(deadlineStr).getTime() - now.value))
const expired = computed(() => diff.value === 0)

const pad = (n: number) => n.toString().padStart(2, '0')

const days = computed(() => pad(Math.floor(diff.value / 86400000)))
const hours = computed(() => pad(Math.floor((diff.value % 86400000) / 3600000)))
const minutes = computed(() => pad(Math.floor((diff.value % 3600000) / 60000)))
const seconds = computed(() => pad(Math.floor((diff.value % 60000) / 1000)))

onMounted(() => { timer = setInterval(() => { now.value = Date.now() }, 1000) })
onBeforeUnmount(() => { if (timer) clearInterval(timer) })

const scrollToPlans = () => {
  document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="sticky-bar" v-if="!expired">
    <div class="sticky-bar__inner">
      <div class="sticky-bar__offer">
        <span class="sticky-bar__deal">🔥 $297 USD</span>
        <span class="sticky-bar__sep">·</span>
        <span class="sticky-bar__desc">Pago único — Acceso de por vida</span>
      </div>

      <div class="sticky-bar__countdown">
        <span class="sticky-bar__label">Cierra en:</span>
        <div class="sticky-bar__timer">
          <div class="sticky-bar__unit">
            <span class="sticky-bar__num">{{ days[0] }}</span>
            <span class="sticky-bar__num">{{ days[1] }}</span>
            <span class="sticky-bar__tag">días</span>
          </div>
          <span class="sticky-bar__col">:</span>
          <div class="sticky-bar__unit">
            <span class="sticky-bar__num">{{ hours[0] }}</span>
            <span class="sticky-bar__num">{{ hours[1] }}</span>
            <span class="sticky-bar__tag">horas</span>
          </div>
          <span class="sticky-bar__col">:</span>
          <div class="sticky-bar__unit">
            <span class="sticky-bar__num">{{ minutes[0] }}</span>
            <span class="sticky-bar__num">{{ minutes[1] }}</span>
            <span class="sticky-bar__tag">min</span>
          </div>
          <span class="sticky-bar__col">:</span>
          <div class="sticky-bar__unit">
            <span class="sticky-bar__num">{{ seconds[0] }}</span>
            <span class="sticky-bar__num">{{ seconds[1] }}</span>
            <span class="sticky-bar__tag">seg</span>
          </div>
        </div>
      </div>

      <button type="button" class="sticky-bar__btn" @click="scrollToPlans">
        Quiero este precio
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sticky-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10000;
  background: $bakano-dark;
  border-bottom: 1px solid rgba($white, 0.08);
  padding: 0.4rem 1rem;
}

.sticky-bar__inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.sticky-bar__offer {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.sticky-bar__deal {
  font-family: $font-display;
  font-weight: 800;
  font-size: 0.85rem;
  color: $bakano-pink;
  white-space: nowrap;
}

.sticky-bar__sep {
  color: rgba($white, 0.15);
  font-size: 0.85rem;
}

.sticky-bar__desc {
  font-family: $font-sans;
  font-size: 0.78rem;
  color: rgba($white, 0.7);
  white-space: nowrap;
}

.sticky-bar__countdown {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sticky-bar__label {
  font-family: $font-mono;
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: rgba($white, 0.4);
}

.sticky-bar__timer {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.sticky-bar__unit {
  display: flex;
  gap: 1px;
  background: rgba($white, 0.07);
  border-radius: 4px;
  padding: 2px;
  position: relative;
}

.sticky-bar__num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.15rem;
  height: 1.4rem;
  background: rgba($white, 0.1);
  border-radius: 3px;
  font-family: $font-mono;
  font-size: 0.8rem;
  font-weight: 700;
  color: $white;
  line-height: 1;
}

.sticky-bar__tag {
  position: absolute;
  bottom: -0.65rem;
  left: 50%;
  transform: translateX(-50%);
  font-family: $font-mono;
  font-size: 0.45rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: rgba($white, 0.3);
  white-space: nowrap;
}

.sticky-bar__col {
  font-family: $font-mono;
  font-size: 0.8rem;
  font-weight: 700;
  color: rgba($white, 0.2);
  line-height: 1.4rem;
}

.sticky-bar__btn {
  font-family: $font-sans;
  font-size: 0.72rem;
  font-weight: 700;
  color: $white;
  background: $bakano-pink;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 0.35rem;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;

  &:hover {
    background: $bakano-pink-dark;
  }
}

@media (max-width: 640px) {
  .sticky-bar__desc,
  .sticky-bar__sep,
  .sticky-bar__label,
  .sticky-bar__tag {
    display: none;
  }

  .sticky-bar__num {
    width: 1rem;
    height: 1.2rem;
    font-size: 0.7rem;
  }
}
</style>
