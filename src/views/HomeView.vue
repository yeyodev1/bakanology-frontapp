<script setup lang="ts">
import PresaleHero from '@/components/presale/PresaleHero.vue'
import VslSection from '@/components/presale/VslSection.vue'
import PlansSection from '@/components/presale/PlansSection.vue'
import BenefitsSection from '@/components/presale/BenefitsSection.vue'
import AuthoritySection from '@/components/home/AuthoritySection.vue'
import FaqSection from '@/components/home/FaqSection.vue'
import FinalCtaSection from '@/components/home/FinalCtaSection.vue'
</script>

<template>
  <div class="home">
    <PresaleHero />
    <VslSection />
    <BenefitsSection />
    <PlansSection />
    <AuthoritySection />
    <FaqSection />
    <FinalCtaSection />
  </div>
</template>

<style lang="scss" scoped>
.home {
  display: block;
  background: var(--bg);
}
</style>
