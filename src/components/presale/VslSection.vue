<script setup lang="ts">
import { onMounted } from 'vue'

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
  <section class="vsl" id="vsl">
    <div class="vsl__inner">
      <h2 class="vsl__heading">Mira el video completo</h2>
      <p class="vsl__lede">Conoce la metodología que usamos en bakano.ec con más de 70 clientes.</p>
      <div class="vsl__player">
        <wistia-player media-id="odis78v6mn" aspect="1.7777777777777777"></wistia-player>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.vsl {
  padding: 5rem 1.5rem;
  background: $bakano-dark;
}

.vsl__inner {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
}

.vsl__heading {
  font-family: $font-display;
  font-weight: 800;
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  line-height: 1.1;
  color: $white;
  margin: 0;
}

.vsl__lede {
  font-family: $font-sans;
  font-size: clamp(0.95rem, 1.5vw, 1.1rem);
  line-height: 1.6;
  color: rgba($white, 0.65);
  max-width: 520px;
  margin: 0 0 1rem;
}

.vsl__player {
  width: 100%;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 8px 40px rgba($black, 0.45);

  wistia-player {
    display: block;
    width: 100%;
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
