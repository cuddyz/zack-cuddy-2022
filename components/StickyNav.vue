<template>
  <section class="flex align-center">
    <button class="mobile-nav-collapse ml-a" @click="showNav = !showNav">
      <i class="fas fa-bars" />
    </button>
    <div class="collapse" :class="{ 'show': showNav }">
      <scrollactive class="page-margin links" :modify-url="false" :offset="200">
        <a href="#home" class="scrollactive-item">Home</a>
        <a href="#about" class="scrollactive-item">About</a>
        <a href="#experience" class="scrollactive-item">Experience</a>
        <a href="#portfolio" class="scrollactive-item">Portfolio</a>
        <a href="#contact" class="scrollactive-item">Contact</a>
      </scrollactive>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'StickyNav',
    data () {
    return {
        showNav: false
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import './assets/styles/colors';
  @import './assets/styles/breaks';

  section {
    top: 0;
    z-index: 1000;
    position: sticky;
    background-color: color('bg');
    border-bottom: 3px solid color('primary');

    .mobile-nav-collapse {
      display: none;
    }

    .links {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 1rem;
      font-size: 1.2em;
      transition: all 400ms;

      @media (min-width: breaks(phablet)) {

      }

      > a {
        color: color('font');
        margin-left: 1rem;
        margin-right: 1rem;
        transition: color 400ms;

        &:hover,
        &.is-active {
          cursor: pointer;
          color: color('primary');
        }
      }

      > a:first-child {
        margin-left: 0rem;
        margin-right: 1rem;
      }

      > a:last-child {
        margin-left: 1rem;
        margin-right: 0rem;
      }
    }

    @media (max-width: breaks(phablet)) {
      flex-direction: column;

      .mobile-nav-collapse {
        display: block;
        z-index: 1001;
        background-color: transparent;
        color: color(font);
        border: 0;
        font-size: 1.8em;
        padding: 1rem;
      }

      .collapse {
        margin-top: 4rem;
        position: absolute;
        visibility: hidden;
        width: 100%;
        background-color: color('bg');
        border-bottom: 3px solid color('primary');
        transition: all 400ms;
        transform-origin: left top;
        transform: scaleY(0);

        .links {
          opacity: 0;
          flex-direction: column;

          > a {
            font-size: 1.3em;
            padding: 1rem;
            margin: 0;
          }
        }

        &.show {
          opacity: 1;
          visibility: visible;
          transform: scaleY(100%);

          .links {
            opacity: 1;
          }
        }
      }
    }
  }
</style>
