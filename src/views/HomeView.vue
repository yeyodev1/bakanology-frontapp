<script setup lang="ts">
import UrgencyBanner from '@/components/landing/UrgencyBanner.vue'
import FudmasterHero from '@/components/landing/FudmasterHero.vue'
import LiveAcademySection from '@/components/landing/LiveAcademySection.vue'
import PainPointsSection from '@/components/landing/PainPointsSection.vue'
import ComparisonToggle from '@/components/landing/ComparisonToggle.vue'
import PricingSection from '@/components/landing/PricingSection.vue'
import ResultsSection from '@/components/landing/ResultsSection.vue'
import AuthorityCtaSection from '@/components/landing/AuthorityCtaSection.vue'
import GuaranteeSection from '@/components/landing/GuaranteeSection.vue'
import LandingFaqSection from '@/components/landing/LandingFaqSection.vue'
import LandingCtaSection from '@/components/landing/LandingCtaSection.vue'
import SocialProofBubble from '@/components/landing/SocialProofBubble.vue'
import PricingModal from '@/components/landing/PricingModal.vue'
</script>

<template>
  <div class="home">
    <UrgencyBanner />
    <FudmasterHero />
    <LiveAcademySection />
    <PainPointsSection />
    <ComparisonToggle />
    <PricingSection />
    <ResultsSection />
    <AuthorityCtaSection />
    <GuaranteeSection />
    <LandingFaqSection />
    <LandingCtaSection />
    <SocialProofBubble />
    <PricingModal />
  </div>
</template>

<style lang="scss" scoped>
.home {
  display: block;
  background: var(--bg);
  --sticky-offset: 4rem;
}
</style>
