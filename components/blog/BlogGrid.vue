<template>
  <section class="blog-list">
    <div v-if="blogPosts.length" class="blog-grid mx-1">
      <blog-post-preview v-for="post in visiblePosts" :key="post.fields.slug" :post="post" />
    </div>
    <div v-else class="empty flex column flex-center text-center">
      <i class="far fa-newspaper" />
      <p class="pt-1">No posts yet — check back soon.</p>
    </div>

    <div v-if="hasMore" class="flex flex-center mt-2">
      <button class="btn-link" @click="showMore">View more</button>
    </div>
  </section>
</template>

<script>
  import { mapState } from 'vuex'
  import BlogPostPreview from './BlogPostPreview'

  const PAGE_SIZE = 6

  export default {
    name: 'BlogGrid',
    components: {
      BlogPostPreview
    },
    data() {
      return {
        visibleCount: PAGE_SIZE
      }
    },
    computed: {
      ...mapState('blog', ['blogPosts']),
      visiblePosts() {
        return this.blogPosts.slice(0, this.visibleCount)
      },
      hasMore() {
        return this.blogPosts.length > this.visibleCount
      }
    },
    methods: {
      showMore() {
        this.visibleCount += PAGE_SIZE
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './assets/styles/colors';
  @import './assets/styles/breaks';

  .blog-list {
    background-color: color('font');

    .blog-grid {
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

    .empty {
      padding: 4rem 1rem;
      color: color('grey');

      i {
        font-size: 3em;
      }
    }

    .btn-link {
      font-size: 0.9em;
      border-color: color('primary');
      color: color('bg');

      &:hover {
        color: color('font');
        background-color: color('primary');
      }
    }
  }
</style>
