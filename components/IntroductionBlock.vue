<template>
  <main class="flex column flex-center">
    <section class="flex column flex-center mb-2">
      <h1>Hey there I'm <span class="bold">Zack Cuddy</span>.</h1>
      <h3>I build things for the web.</h3>
    </section>
    <a href="#portfolio" class="flex align-center btn-link" @click="scrollToPortfolio" ><span class="pr-50">View my work</span><i class="fas fa-caret-right" /></a>
  </main>
</template>

<script>
  export default {
    name: 'IntroductionBlock',
    methods: {
      scrollToPortfolio(e) {
        e.preventDefault();

        document.getElementById('portfolio').scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './assets/styles/colors';
  @import './assets/styles/breaks';

  main {
    height: 100vh;
    background-image: url('/images/space.jpg');
    background-size: cover;

    section {
      font-size: 1.1em;

      @media (min-width: breaks(legacy-phone)) {
        font-size: 1.3em;
      }

      @media (min-width: breaks(phone)) {
        font-size: 1.5em;
      }

      @media (min-width: breaks(phablet)) {
        font-size: 2em;
      }

      h1 {
        .bold {
          color: color('primary');
       }
      }
    }

    .btn-link {
      font-size: 0.9em;

      @media (min-width: breaks(legacy-phone)) {
        font-size: 1.1em;
      }

      @media (min-width: breaks(phablet)) {
        font-size: 1.3em;
      }

      i {
        transition: transform 400ms;
      }

      &:hover,
      &:focus,
      &:active,
      &:focus-visible,
      &:focus-within {
        color: color('font');
        background-color: color('primary');
        border-color: transparent;
        outline: color('primary') auto 1px;


        i {
          transform: rotate(90deg);
        }
      }
    }

    h1,
    h3,
    button {
      font-weight: normal;
    }
  }
</style>
