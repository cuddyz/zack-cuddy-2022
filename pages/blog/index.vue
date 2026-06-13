<template>
  <section class="blog-redirect flex column flex-center text-center">
    <p>Redirecting to the blog…</p>
    <nuxt-link to="/#blog" class="link">Continue to the blog</nuxt-link>
  </section>
</template>

<script>
  export default {
    name: 'BlogIndexRedirect',
    head() {
      return {
        title: 'Blog · Zack Cuddy',
        meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
      }
    },
    // There is no dedicated /blog landing page — the post list lives in the
    // #blog section on the home page. Bounce any direct hits there. Runs
    // client-side only (beforeMount is skipped during SSR/generate), and the
    // hash is applied by the router so it survives — unlike an edge redirect.
    beforeMount() {
      this.$router.replace('/#blog')
    }
  }
</script>

<style lang="scss" scoped>
  @import './assets/styles/colors';

  .blog-redirect {
    min-height: 60vh;
    padding: 2rem;
    color: color('font');

    .link {
      margin-top: 1rem;
      font-weight: 600;
      color: color('primary');

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
