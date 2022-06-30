<template>
  <section class="pt-3">
    <div class="flex flex-center mb-3">
      <h2 class="capitalize">Portfolio</h2>
    </div>
    <portfolio @show="showPortfolioItem" />
    <transition name="modal-transition">
      <portfolio-modal v-if="focusedPortfolioItem" :portfolio-item="focusedPortfolioItem" @close="hidePortfolioItem" />
    </transition>
  </section>
</template>

<script>
  import Portfolio from './Portfolio'
  import PortfolioModal from './PortfolioModal'

  export default {
    name: 'PortfolioBlock',
    components: {
      Portfolio,
      PortfolioModal
    },
    data() {
      return {
        focusedPortfolioItem: null
      }
    },
    methods: {
      showPortfolioItem(portfolioItem) {
        this.focusedPortfolioItem = portfolioItem
      },
      hidePortfolioItem() {
        this.focusedPortfolioItem = null
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './assets/styles/colors';

  h2 {
    font-size: 2em;
    border-bottom: 3px solid color('primary');
  }

  .modal-transition-enter-active,
  .modal-transition-leave-active {
    transition: opacity 400ms;
  }

  .modal-transition-enter,
  .modal-transition-leave-to {
    opacity: 0;
  }
</style>
