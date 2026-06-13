<template>
  <section class="pt-3">
    <div class="flex flex-center mb-3">
      <h2 class="capitalize">Blog</h2>
    </div>
    <blog-grid />
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

  h2 {
    font-size: 2em;
    border-bottom: 3px solid color('primary');
  }
</style>
