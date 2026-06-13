<template>
  <article class="blog-card">
    <nuxt-link :to="url" class="image-container" :style="heroImage" :aria-label="fields.title" />
    <div class="text flex column">
      <nuxt-link :to="url" class="blog-link">{{ fields.title }}</nuxt-link>
      <span class="meta color-grey my-50">{{ publishDate }} · {{ readTime }} min read</span>
      <p>{{ fields.description }}</p>
      <ul v-if="tags.length" class="tags flex wrap">
        <li v-for="tag in tags" :key="tag" class="tag">{{ tag }}</li>
      </ul>
      <nuxt-link :to="url" class="read-more mt-50">Read more <i class="fas fa-caret-right" /></nuxt-link>
    </div>
  </article>
</template>

<script>
  import { contentfulImage, formatDate, readingTime } from '@/lib/utils'

  export default {
    name: 'BlogPostPreview',
    props: {
      post: {
        type: Object,
        required: true
      }
    },
    computed: {
      fields() {
        return this.post.fields || {}
      },
      url() {
        return `/blog/${this.fields.slug}`
      },
      heroImage() {
        const image = contentfulImage(this.fields.heroImage?.fields?.file?.url, { width: 600, height: 600, fit: 'fill' })

        return image ? `background-image: url('${image}')` : ''
      },
      publishDate() {
        return formatDate(this.fields.publishDate)
      },
      readTime() {
        return readingTime(this.fields.body)
      },
      tags() {
        return this.fields.tags || []
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './assets/styles/colors';
  @import './assets/styles/breaks';

  .blog-card {
    display: flex;
    flex-direction: column;
    background-color: color('white');
    border: 1px solid color('greyLight');
    border-radius: 10px;
    overflow: hidden;
    transition: transform 300ms, box-shadow 300ms;

    &:hover,
    &:focus-within {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(color('bg'), 0.15);
    }

    .image-container {
      display: block;
      width: 100%;
      aspect-ratio: 16 / 10;
      background-color: color('bg');
      background-size: cover;
      background-position: center;
    }

    .text {
      flex: 1;
      padding: 1.25rem;

      .blog-link {
        font-weight: 600;
        font-size: 1.15em;
        color: color('bg');
        line-height: 1.3;

        &:hover {
          color: color('primaryDark');
        }
      }

      .meta {
        font-size: 0.8em;
      }

      p {
        color: color('fontDark');
        font-size: 0.9em;
      }

      .tags {
        gap: 0.4rem;
        list-style: none;
        margin: 0.5rem 0;
        padding: 0;

        .tag {
          font-size: 0.7em;
          font-weight: 600;
          color: color('primaryDark');
          background: rgba(color('primary'), 0.12);
          padding: 0.2rem 0.55rem;
          border-radius: 999px;
        }
      }

      .read-more {
        margin-top: auto;
        font-weight: 600;
        color: color('primaryDark');

        i {
          transition: transform 300ms;
        }

        &:hover i {
          transform: translateX(3px);
        }
      }
    }
  }
</style>
