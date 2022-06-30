<template>
  <div id="app">
    <introduction-block id="home" />
    <sticky-nav />
    <article>
      <about-block id="about" />
      <experience-block id="experience" />
      <portfolio-block id="portfolio"/>
      <contact-block id="contact"/>
    </article>
    <bottom-footer />
  </div>
</template>

<script>
import IntroductionBlock from '@/components/IntroductionBlock';
import StickyNav from '@/components/StickyNav';
import AboutBlock from '@/components/about/AboutBlock';
import ExperienceBlock from '@/components/experience/ExperienceBlock';
import PortfolioBlock from '@/components/portfolio/PortfolioBlock';
import ContactBlock from '@/components/contact/ContactBlock';
import BottomFooter from '@/components/BottomFooter'

export default {
  name: 'HomeView',
  components: {
    IntroductionBlock,
    StickyNav,
    AboutBlock,
    ExperienceBlock,
    PortfolioBlock,
    ContactBlock,
    BottomFooter
  }
}
</script>

<style lang="scss" scoped>
  @import './assets/styles/colors';

  article {
    background-color: color('font');
    color: color('primary');
  }
</style>
