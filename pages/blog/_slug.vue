<template>
  <div id="app">
    <sticky-nav />
    <article>
      <blog-post :post="post" />
    </article>
    <blog-post-related v-if="post" :post="post" />
    <bottom-footer />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { headBuilder } from '@/lib/seo'
  import { contentfulImage } from '@/lib/utils'
  import StickyNav from '@/components/StickyNav'
  import BlogPost from '@/components/blog/BlogPost'
  import BlogPostRelated from '@/components/blog/BlogPostRelated'
  import BottomFooter from '@/components/BottomFooter'

  export default {
    name: 'BlogPostView',
    components: {
      StickyNav,
      BlogPost,
      BlogPostRelated,
      BottomFooter
    },
    data() {
      return {
        slug: this.$route.params.slug
      }
    },
    head() {
      const fields = this.post?.fields

      if (!fields) {
        return headBuilder({ title: 'Post not found | Zack Cuddy' })
      }

      const image = contentfulImage(fields.heroImage?.fields?.file?.url, { width: 1200, height: 630, fit: 'fill' })

      return headBuilder({
        title: `${fields.title} | Zack Cuddy`,
        description: fields.description,
        image,
        url: `https://zack-cuddy.com/blog/${fields.slug}`,
        type: 'article'
      })
    },
    computed: {
      ...mapGetters({ getBlogPostBySlug: 'blog/getBlogPostBySlug' }),
      post() {
        return this.getBlogPostBySlug(this.slug)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './assets/styles/colors';

  article {
    background-color: color('font');
    color: color('primary');
  }
</style>
