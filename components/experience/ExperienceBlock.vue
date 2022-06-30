<template>
  <section class="experience-block">
    <div class="page-margin py-3">
      <div class="flex flex-center mb-3">
        <h2 class="capitalize">Experience</h2>
      </div>
      <experience />
    </div>
  </section>
</template>

<script>
  import Experience from './Experience'

  export default {
    name: 'ExperienceBlock',
    components: {
      Experience
    }
  }
</script>

<style lang="scss" scoped>
  @import './assets/styles/colors';
  @import './assets/styles/breaks';

  .experience-block {
    background-color: color('greyLight');

    h2 {
      font-size: 2em;
      border-bottom: 3px solid color('primary');
    }

    .page-margin {
      width: 100%;
      max-width: breaks(laptop);
      margin: auto;
    }
  }
</style>
