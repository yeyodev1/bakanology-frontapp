<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import AppButton from '@/components/ui/AppButton.vue'
import { productService, type PurchasedProduct } from '@/services/productService'

const products = ref<PurchasedProduct[]>([])
const loading = ref(true)
const error = ref('')
const readingSlug = ref<string | null>(null)
const readerProduct = ref<PurchasedProduct | null>(null)
const readerUrl = ref('')
const readerError = ref('')
let previousBodyOverflow = ''

function formatDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Fecha no disponible'

  return date.toLocaleDateString('es-EC', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function formatAmount(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount)
  } catch {
    return `${amount} ${currency.toUpperCase()}`
  }
}

async function loadProducts() {
  loading.value = true
  error.value = ''

  try {
    const response = await productService.purchased()
    products.value = response.data.data.products
  } catch (err: unknown) {
    const requestError = err as { message?: string }
    error.value = requestError.message || 'No pudimos cargar tus productos. Intenta de nuevo.'
  } finally {
    loading.value = false
  }
}

function releaseReaderUrl() {
  if (readerUrl.value) URL.revokeObjectURL(readerUrl.value)
  readerUrl.value = ''
}

function closeReader() {
  releaseReaderUrl()
  readerProduct.value = null
  document.body.style.overflow = previousBodyOverflow
}

async function readProduct(product: PurchasedProduct) {
  readingSlug.value = product.slug
  readerError.value = ''

  try {
    const response = await productService.read(product.slug)
    releaseReaderUrl()
    readerProduct.value = product
    readerUrl.value = URL.createObjectURL(response.data)
    previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  } catch (err: unknown) {
    const requestError = err as { message?: string }
    readerError.value = requestError.message || 'No pudimos abrir el ebook. Intenta de nuevo.'
  } finally {
    readingSlug.value = null
  }
}

onMounted(loadProducts)
onBeforeUnmount(closeReader)
</script>

<template>
  <main class="products-view">
    <p class="products-view__intro">
      Aquí encuentras los productos digitales que has comprado. Ábrelos y léelos directamente desde tu cuenta.
    </p>

    <div v-if="loading" class="products-list" aria-label="Cargando productos">
      <article v-for="index in 2" :key="index" class="product-card product-card--loading">
        <span class="product-card__cover product-card__cover--skeleton" />
        <div class="product-card__content">
          <span class="skeleton-line skeleton-line--tag" />
          <span class="skeleton-line skeleton-line--title" />
          <span class="skeleton-line" />
          <span class="skeleton-line skeleton-line--short" />
        </div>
      </article>
    </div>

    <section v-else-if="error" class="state-card" role="alert">
      <span class="state-card__icon"><i class="fa-solid fa-triangle-exclamation" /></span>
      <h2 class="state-card__title">No pudimos cargar tus productos</h2>
      <p class="state-card__text">{{ error }}</p>
      <AppButton variant="ghost" @click="loadProducts">Reintentar</AppButton>
    </section>

    <section v-else-if="products.length === 0" class="state-card">
      <span class="state-card__icon state-card__icon--empty"><i class="fa-solid fa-book-open" /></span>
      <h2 class="state-card__title">Aún no tienes productos adquiridos</h2>
      <p class="state-card__text">Cuando compres un ebook u otro recurso digital, aparecerá aquí.</p>
    </section>

    <template v-else>
      <p v-if="readerError" class="reader-error" role="alert">
        <i class="fa-solid fa-circle-exclamation" />
        {{ readerError }}
      </p>

      <div class="products-list">
        <article v-for="product in products" :key="product.slug" class="product-card">
          <div class="product-card__cover" aria-hidden="true">
            <span class="product-card__brand">Bakanology</span>
            <i class="fa-solid fa-file-pdf product-card__pdf" />
            <span class="product-card__format">Edición digital</span>
          </div>

          <div class="product-card__content">
            <span class="product-card__type">{{ product.type || 'Ebook' }}</span>
            <h2 class="product-card__title">{{ product.name }}</h2>
            <p class="product-card__description">{{ product.description }}</p>
            <div class="product-card__meta">
              <span><i class="fa-regular fa-calendar" /> Comprado el {{ formatDate(product.purchasedAt) }}</span>
              <span><i class="fa-solid fa-receipt" /> {{ formatAmount(product.amount, product.currency) }}</span>
            </div>
            <AppButton
              :loading="readingSlug === product.slug"
              :disabled="readingSlug !== null"
              @click="readProduct(product)"
            >
              <i v-if="readingSlug !== product.slug" class="fa-solid fa-book-open" />
              {{ readingSlug === product.slug ? 'Preparando lectura' : 'Leer ebook' }}
            </AppButton>
          </div>
        </article>
      </div>
    </template>
    <Teleport to="body">
      <Transition name="reader-fade">
        <div
          v-if="readerUrl && readerProduct"
          class="ebook-reader"
          role="dialog"
          aria-modal="true"
          :aria-label="`Lectura de ${readerProduct.name}`"
          @click.self="closeReader"
        >
          <section class="ebook-reader__panel">
            <header class="ebook-reader__header">
              <div>
                <span class="ebook-reader__eyebrow">Biblioteca Bakanology</span>
                <h2 class="ebook-reader__title">{{ readerProduct.name }}</h2>
              </div>
              <button class="ebook-reader__close" type="button" aria-label="Cerrar lector" @click="closeReader">
                <i class="fa-solid fa-xmark" />
              </button>
            </header>
            <p class="ebook-reader__notice">
              <i class="fa-solid fa-lock" />
              Lectura exclusiva para tu cuenta. El documento no ofrece descarga directa.
            </p>
            <iframe
              class="ebook-reader__frame"
              :src="`${readerUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`"
              :title="readerProduct.name"
            />
          </section>
        </div>
      </Transition>
    </Teleport>
  </main>
</template>

<style lang="scss" scoped>
.products-view {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.25rem;
}

.products-view__intro {
  max-width: 680px;
  margin: 0;
  color: $gray-600;
  font-family: $font-sans;
  line-height: 1.6;
}

.products-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.25rem;
}

.product-card {
  display: flex;
  width: 100%;
  min-height: 300px;
  overflow: hidden;
  background: $white;
  border: 1px solid var(--border);
  border-radius: 1.25rem;
  box-shadow: 0 14px 40px rgba($bakano-dark, 0.05);
}

.product-card__cover {
  position: relative;
  flex: 0 0 230px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 300px;
  padding: 1.5rem;
  overflow: hidden;
  color: $white;
  background: linear-gradient(145deg, $bakano-dark 0%, $bakano-purple 58%, $bakano-pink 100%);

  &::after {
    content: '';
    position: absolute;
    right: -55px;
    bottom: -70px;
    width: 190px;
    height: 190px;
    border: 1px solid rgba($white, 0.22);
    border-radius: 50%;
    box-shadow: 0 0 0 28px rgba($white, 0.05), 0 0 0 58px rgba($white, 0.04);
  }
}

.product-card__brand,
.product-card__format {
  position: relative;
  z-index: 1;
  font-family: $font-mono;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.product-card__pdf {
  position: relative;
  z-index: 1;
  align-self: center;
  font-size: 4.25rem;
  color: $bakano-green;
  filter: drop-shadow(0 12px 24px rgba($bakano-dark, 0.28));
}

.product-card__content {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.75rem;
  min-width: 0;
  padding: 2rem;
}

.product-card__type {
  padding: 0.3rem 0.65rem;
  color: $bakano-pink;
  background: rgba($bakano-pink, 0.08);
  border-radius: 999px;
  font-family: $font-mono;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.product-card__title {
  margin: 0;
  color: $bakano-dark;
  font-family: $font-display;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 400;
  line-height: 1.15;
}

.product-card__description {
  max-width: 720px;
  margin: 0;
  color: $gray-600;
  font-family: $font-sans;
  font-size: 0.95rem;
  line-height: 1.6;
}

.product-card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem 1.25rem;
  color: $gray-500;
  font-family: $font-mono;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;

  i { margin-right: 0.3rem; }
}

.state-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 3.5rem 1.5rem;
  text-align: center;
  background: $white;
  border: 1px solid var(--border);
  border-radius: 1.25rem;
}

.state-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  margin-bottom: 1rem;
  color: $alert-error;
  background: $alert-error-bg;
  border-radius: 50%;

  &--empty { color: $bakano-purple; background: rgba($bakano-purple, 0.1); }
}

.state-card__title { margin: 0; color: $bakano-dark; font-family: $font-display; font-size: 1.5rem; font-weight: 400; }
.state-card__text { max-width: 460px; margin: 0.5rem 0 1.25rem; color: $gray-600; }

.reader-error {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  padding: 0.8rem 1rem;
  color: $alert-error;
  background: $alert-error-bg;
  border-radius: 0.75rem;
  font-size: 0.9rem;
}

.ebook-reader {
  position: fixed;
  inset: 0;
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba($bakano-dark, 0.82);
  backdrop-filter: blur(8px);
}

.ebook-reader__panel {
  display: flex;
  flex-direction: column;
  width: min(1100px, 100%);
  height: min(92vh, 960px);
  overflow: hidden;
  background: $white;
  border: 1px solid rgba($white, 0.2);
  border-radius: 1.25rem;
  box-shadow: 0 28px 90px rgba($bakano-dark, 0.42);
}

.ebook-reader__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border);
}

.ebook-reader__eyebrow {
  color: $bakano-pink;
  font-family: $font-mono;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.ebook-reader__title {
  margin: 0.2rem 0 0;
  color: $bakano-dark;
  font-family: $font-display;
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  font-weight: 400;
}

.ebook-reader__close {
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  color: $bakano-dark;
  background: var(--cream);
  border-radius: 50%;
  font-size: 1.1rem;
}

.ebook-reader__notice {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin: 0;
  padding: 0.65rem 1.25rem;
  color: $gray-600;
  background: rgba($bakano-green, 0.08);
  font-size: 0.78rem;
}

.ebook-reader__frame {
  flex: 1 1 auto;
  width: 100%;
  min-height: 0;
  border: 0;
  background: $gray-100;
}

.reader-fade-enter-active,
.reader-fade-leave-active { transition: opacity 0.2s ease; }
.reader-fade-enter-from,
.reader-fade-leave-to { opacity: 0; }

.product-card--loading { min-height: 240px; }
.product-card__cover--skeleton { min-height: 240px; background: rgba($bakano-dark, 0.08); }
.product-card__cover--skeleton::after { display: none; }

.skeleton-line {
  display: block;
  width: 90%;
  height: 0.9rem;
  border-radius: 0.4rem;
  background: linear-gradient(90deg, rgba($bakano-dark, 0.05) 25%, rgba($bakano-dark, 0.1) 50%, rgba($bakano-dark, 0.05) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s ease-in-out infinite;

  &--tag { width: 80px; height: 1.4rem; }
  &--title { width: 55%; height: 1.8rem; }
  &--short { width: 65%; }
}

@keyframes shimmer { to { background-position: -200% 0; } }

@media (max-width: 700px) {
  .product-card { flex-direction: column; }
  .product-card__cover { flex-basis: auto; min-height: 210px; }
  .product-card__content { padding: 1.4rem; }
  .product-card--loading .product-card__cover { min-height: 150px; }
  .ebook-reader { padding: 0; }
  .ebook-reader__panel { height: 100dvh; border: 0; border-radius: 0; }
  .ebook-reader__header { padding: 0.85rem 1rem; }
  .ebook-reader__notice { padding: 0.55rem 1rem; font-size: 0.7rem; }
}
</style>
