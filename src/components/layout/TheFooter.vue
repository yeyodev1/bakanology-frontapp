<script setup lang="ts">
import { RouterLink } from 'vue-router'
import BrandWordmark from '@/components/ui/BrandWordmark.vue'
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '@/config/site'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer__top">
      <div class="footer__mark">
        <BrandWordmark size="lg" />
        <p class="footer__tagline">
          Marketing de performance sin pagar una agencia.<br />
          Creado por bakano.ec.
        </p>
      </div>

      <div class="footer__cta">
        <RouterLink
          class="footer__cta-link"
          :to="{ name: 'register' }"
        >
          <span>Registrarse ahora</span>
          <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </RouterLink>
      </div>
    </div>

    <div class="footer__rule" aria-hidden="true" />

    <div class="footer__bottom">
      <nav class="footer__nav">
        <a :href="INSTAGRAM_URL" target="_blank" rel="noopener" class="footer__link">
          Instagram <em>{{ INSTAGRAM_HANDLE }}</em>
        </a>
        <RouterLink :to="{ name: 'privacy-policy' }" class="footer__link">Políticas de privacidad</RouterLink>
        <RouterLink :to="{ name: 'legal-notice' }" class="footer__link">Aviso legal</RouterLink>
      </nav>
      <p class="footer__copy">© {{ year }} bakano.ec · Ecuador</p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  background: $bakano-dark;
  color: $white;
  padding-block: clamp(3rem, 6vw, 5rem) clamp(1.5rem, 3vw, 2.5rem);
  padding-inline: clamp(2.5rem, 9vw, 9rem);
  width: 100%;
}

.footer__top {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  align-items: flex-start;
  width: 100%;
  margin-inline: auto;
  max-width: 1440px;

  @media (min-width: 880px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    gap: 4rem;
  }
}

.footer__mark {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  color: $white;

  :deep(svg) {
    filter: brightness(0) invert(1);
  }
}

.footer__tagline {
  font-family: $font-sans;
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  line-height: 1.4;
  color: rgba($white, 0.7);
  max-width: 40ch;
}

.footer__cta {
  flex-shrink: 0;
}

.footer__cta-link {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1.1rem 1.7rem;
  border: 1px solid rgba($white, 0.25);
  border-radius: 999px;
  color: $white;
  font-family: $font-mono;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: background .25s ease, color .25s ease, border-color .25s ease, transform .25s ease;

  &:hover {
    background: $bakano-green;
    color: $bakano-dark;
    border-color: $bakano-green;
    transform: translateY(-1px);
  }
}

.footer__rule {
  height: 1px;
  background: rgba($white, 0.12);
  margin-block: clamp(2rem, 4vw, 3rem);
  width: 100%;
  margin-inline: auto;
  max-width: 1440px;
}

.footer__bottom {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-inline: auto;
  max-width: 1440px;
}

.footer__nav {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(1rem, 2vw, 1.75rem);
}

.footer__link {
  font-family: $font-mono;
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba($white, 0.65);
  transition: color .25s ease;

  em {
    font-style: normal;
    color: $bakano-green;
  }

  &:hover {
    color: $white;
  }
}

.footer__copy {
  font-family: $font-mono;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba($white, 0.45);
  margin: 0;
}
</style>
