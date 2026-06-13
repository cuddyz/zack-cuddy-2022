<template>
  <section>
    <div class="page-margin py-3">
      <div class="flex flex-center mb-3">
        <h2 class="capitalize">Blog</h2>
      </div>
      <blog-grid />
    </div>
  </section>
</template>

<script>
  import BlogGrid from './BlogGrid'

  export default {
    name: 'BlogBlock',
    components: {
      BlogGrid
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

  .page-margin {
    width: 100%;
    max-width: breaks(laptop);
    margin: auto;
  }
</style>
