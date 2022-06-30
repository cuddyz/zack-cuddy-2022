<template>
  <section class="portfolio-modal-wrapper flex">
    <div v-click-outside="closeModal" class="portfolio-modal" :class="{ 'hiding': hiding }">
      <i class="fas fa-times" @click="closeModal" />
      <portfolio-gallery :image-path="portfolioItem.portfolioName" :total-images="portfolioItem.totalImages" />
      <div class="modal-content">
        <div class="flex align-center">
          <h3>{{ portfolioItem.title }}</h3>
          <h5 class="ml-a">{{ portfolioItem.language }}</h5>
        </div>
        <p>{{ portfolioItem.description }}</p>
        <ul class="mt-1">
          <li v-for="(line, index) in portfolioItem.technology" :key="index">{{ line }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
  import PortfolioGallery from './PortfolioGallery'

  export default {
    name: 'PortfolioModal',
    components: {
      PortfolioGallery
    },
    props: {
      portfolioItem: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        hiding: false
      }
    },
    methods: {
      closeModal() {
        this.hiding = true

        // allows the shrink animation to kick off before we destroy the component
        // shrink is 500ms, v-if transition is 400ms.  With the 100ms timeout they end together
        setTimeout(() => {
          this.$emit('close')
        }, 100)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './assets/styles/colors';

  .portfolio-modal-wrapper {
    z-index: 101;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(color('black'), 0.8);

    .portfolio-modal {
      animation: 400ms ease 0s 1 grow;
      position: relative;
      max-width: 600px;
      height: 95vh;
      max-height: 800px;
      margin: auto;
      overflow-y: scroll;
      background-color: color('font');
      color: color('fontDark');
      border: 3px solid color('primary');

      &.hiding {
        animation: 500ms ease 0s 1 shrink;
      }

      .fa-times {
        z-index: 102;
        position: absolute;
        font-size: 1.7em;
        top: 1rem;
        right: 1rem;
        opacity: 1;
        transition: all 400ms;
        color: color('primary');

        &:hover,
        &:active {
          cursor: pointer;
          color: color('primaryDark');
        }
      }

      .modal-content {
        padding: 1rem 3rem 3rem 3rem;

        ul {
          padding-left: 1rem;
        }

        li {
          list-style-type: circle;
        }
      }
    }
  }

  @keyframes grow {
    0% {
      transform: scale(0);
    }

    100% {
      transform: scale(1);
    }
  }

  @keyframes shrink {
    0% {
      transform: scale(1);
    }

    100% {
      transform: scale(0);
    }
  }
</style>
