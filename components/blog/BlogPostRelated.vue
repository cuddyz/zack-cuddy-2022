<template>
  <section v-if="relatedPosts.length" class="blog-related">
    <div class="inner">
      <h2 class="heading">Keep reading</h2>
      <div class="related-grid">
        <blog-post-preview v-for="related in relatedPosts" :key="related.fields.slug" :post="related" />
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  import BlogPostPreview from './BlogPostPreview'

  export default {
    name: 'BlogPostRelated',
    components: {
      BlogPostPreview
    },
    props: {
      post: {
        type: Object,
        required: false,
        default: () => ({})
      }
    },
    computed: {
      ...mapGetters({ getRelatedBlogPosts: 'blog/getRelatedBlogPosts' }),
      relatedPosts() {
        return this.getRelatedBlogPosts(this.post?.fields?.slug, 3)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './assets/styles/colors';
  @import './assets/styles/breaks';

  .blog-related {
    background-color: color('greyLight');
    padding: 3rem 1.5rem 4rem;

    @media (min-width: breaks(phablet)) {
      padding: 4rem 3rem 5rem;
    }

    .inner {
      max-width: breaks(laptop);
      margin: 0 auto;
    }

    .heading {
      margin-bottom: 1.5rem;
      font-weight: 600;
      font-size: 1.6em;
      color: color('bg');
    }

    .related-grid {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 1.5rem;

      @media (min-width: breaks(phablet)) {
        grid-template-columns: 1fr 1fr;
      }

      @media (min-width: breaks(laptop)) {
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 2rem;
      }
    }
  }
</style>
