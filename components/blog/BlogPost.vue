<!-- eslint-disable vue/no-v-html -->
<template>
  <section class="page-margin blog-post">
    <nuxt-link to="/#blog" class="back flex align-center"><i class="fas fa-chevron-left pr-50" /> Back to blog</nuxt-link>

    <div v-if="fields.title" class="article">
      <h1 class="title">{{ fields.title }}</h1>
      <div class="meta flex wrap align-center">
        <span class="nowrap"><i class="fas fa-user pr-50" />{{ fields.author }}</span>
        <span class="dot">·</span>
        <span class="nowrap"><i class="far fa-clock pr-50" />{{ publishDate }}</span>
        <span class="dot">·</span>
        <span class="nowrap">{{ readTime }} min read</span>
      </div>

      <div v-if="heroImage" class="image-container" :style="heroImage" />

      <!-- Rendered from Contentful markdown via @nuxtjs/markdownit. -->
      <div class="content" v-html="$md.render(fields.body || '')" />
    </div>

    <div v-else class="not-found flex column flex-center text-center">
      <h2>Post not found</h2>
      <p class="pt-1">That post may have moved or never existed.</p>
    </div>
  </section>
</template>

<script>
  import { contentfulImage, formatDate, readingTime } from '@/lib/utils'

  export default {
    name: 'BlogPost',
    props: {
      post: {
        type: Object,
        required: false,
        default: () => ({})
      }
    },
    computed: {
      fields() {
        return this.post?.fields || {}
      },
      heroImage() {
        const image = contentfulImage(this.fields.heroImage?.fields?.file?.url, { width: 1400 })

        return image ? `background-image: url('${image}')` : ''
      },
      publishDate() {
        return formatDate(this.fields.publishDate)
      },
      readTime() {
        return readingTime(this.fields.body)
      }
    }
  }
</script>

<style lang="scss">
  @import './assets/styles/colors';
  @import './assets/styles/breaks';

  .blog-post {
    padding: 2rem 1.5rem 4rem 1.5rem;

    @media (min-width: breaks(phablet)) {
      padding: 3rem 3rem 5rem 3rem;
    }

    .back {
      font-weight: 600;
      color: color('primaryDark');

      &:hover {
        color: color('primary');
      }
    }

    .article {
      max-width: breaks(tablet);
      margin: 0 auto;
    }

    .title {
      margin-top: 1.5rem;
      font-weight: 600;
      font-size: 2em;
      line-height: 1.2;
      color: color('bg');

      @media (min-width: breaks(phablet)) {
        font-size: 2.6em;
      }
    }

    .meta {
      margin: 0.75rem 0 1.5rem;
      font-size: 0.85em;
      color: color('grey');

      .dot {
        margin: 0 0.6rem;
      }
    }

    .image-container {
      width: 100%;
      aspect-ratio: 16 / 9;
      border-radius: 10px;
      background-color: color('bg');
      background-size: cover;
      background-position: center;
      margin-bottom: 2rem;
    }

    // Prose styling for the rendered markdown body.
    .content {
      color: color('black');
      font-size: 1.05em;
      line-height: 1.7;

      h2 {
        font-weight: 600;
        font-size: 1.6em;
        margin: 2rem 0 1rem;
      }

      h3 {
        font-weight: 600;
        font-size: 1.3em;
        margin: 1.5rem 0 0.75rem;
      }

      p {
        margin-bottom: 1.25rem;
      }

      ul,
      ol {
        margin: 0 0 1.25rem 1.5rem;
        list-style: revert;
      }

      li {
        margin-bottom: 0.5rem;
      }

      a {
        color: color('primaryDark');
        font-weight: 600;
        text-decoration: underline;

        &:hover {
          color: color('primary');
        }
      }

      img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        margin: 1.5rem 0;
      }

      blockquote {
        margin: 1.5rem 0;
        padding: 0.5rem 1.25rem;
        border-left: 4px solid color('primary');
        color: color('fontDark');
        font-style: italic;
      }

      code {
        background-color: color('greyLight');
        padding: 0.15rem 0.4rem;
        border-radius: 4px;
        font-size: 0.9em;
      }

      pre {
        background-color: color('black');
        color: color('greyLight');
        padding: 1.25rem;
        border-radius: 8px;
        overflow-x: auto;
        margin-bottom: 1.25rem;

        code {
          background-color: transparent;
          padding: 0;
        }
      }
    }

    .not-found {
      padding: 4rem 1rem;
      color: color('fontDark');
    }
  }
</style>
