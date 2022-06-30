<template>
  <section class="page-margin py-3">
    <div class="flex flex-center mb-3">
      <h2 class="capitalize">About</h2>
    </div>
    <div class="about-block">
      <about-me />
      <skills />
    </div>
  </section>
</template>

<script>
  import AboutMe from './AboutMe'
  import Skills from './Skills'

  export default {
    name: 'AboutBlock',
    components: {
      AboutMe,
      Skills
    }
  }
</script>

<style lang="scss" scoped>
  @import './assets/styles/colors';
  @import './assets/styles/breaks';

  h2 {
    font-size: 2em;
    border-bottom: 3px solid color('primary');
  }

  .about-block {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    margin: 0 1rem;

    .skills,
    .about-me {
      width: 100%;
      max-width: breaks(tablet);
      margin: auto;
    }

    @media (min-width: breaks(desktop)) {
      grid-template-columns: 1fr 1fr;
      grid-gap: 3rem;
    }
  }
</style>
