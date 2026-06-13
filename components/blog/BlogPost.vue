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

      <ul v-if="tags.length" class="tags flex wrap">
        <li v-for="tag in tags" :key="tag" class="tag">{{ tag }}</li>
      </ul>

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
      },
      tags() {
        return this.fields.tags || []
      }
    },
    mounted() {
      // The rendered markdown is injected via v-html, so the copy buttons can't
      // use Vue bindings. Delegate clicks from the component root instead.
      this.$el.addEventListener('click', this.onCopyClick)
    },
    beforeDestroy() {
      this.$el.removeEventListener('click', this.onCopyClick)
    },
    methods: {
      onCopyClick(e) {
        const btn = e.target.closest && e.target.closest('[data-copy]')
        if (!btn) return

        const wrap = btn.closest('.code-tab-panel') || btn.closest('.code-block')
        const code = wrap && wrap.querySelector('pre code')
        if (!code) return

        const text = code.textContent
        const done = () => {
          const original = btn.dataset.label || 'Copy'
          btn.textContent = 'Copied!'
          btn.classList.add('copied')
          setTimeout(() => {
            btn.textContent = original
            btn.classList.remove('copied')
          }, 1500)
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done).catch(() => {})
        } else {
          const ta = document.createElement('textarea')
          ta.value = text
          document.body.appendChild(ta)
          ta.select()
          try {
            document.execCommand('copy')
            done()
          } catch (err) {
            // Clipboard unavailable — leave the button untouched.
          }
          document.body.removeChild(ta)
        }
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
      margin: 0.75rem 0 1rem;
      font-size: 0.85em;
      color: color('grey');

      .dot {
        margin: 0 0.6rem;
      }
    }

    .tags {
      gap: 0.5rem;
      list-style: none;
      margin: 0 0 1.5rem;
      padding: 0;

      .tag {
        font-size: 0.78em;
        font-weight: 600;
        color: color('primaryDark');
        background: rgba(color('primary'), 0.12);
        padding: 0.25rem 0.7rem;
        border-radius: 999px;
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

      // Inline code only — highlighted blocks carry a language-* class and are
      // styled by the Prism theme + the code-block/code-tabs rules below.
      code:not([class*='language-']) {
        background-color: color('greyLight');
        padding: 0.15rem 0.4rem;
        border-radius: 4px;
        font-size: 0.9em;
        font-family: 'JetBrains Mono', monospace;
      }

      // --- VSCode-style code blocks & tabs ----------------------------------
      $code-bg: #1e1e1e;
      $code-chrome: #252526;
      $code-border: #333333;
      $code-fg: #d4d4d4;

      pre[class*='language-'],
      .code-block pre,
      .code-tabs pre {
        margin: 0;
        padding: 1.1rem 1.25rem;
        border-radius: 0;
        background: $code-bg;
        color: $code-fg;
        font-size: 0.9em;
        line-height: 1.6;
        max-height: 75vh;
        overflow: auto;

        code {
          font-family: 'JetBrains Mono', monospace;
          background: transparent;
          padding: 0;
        }
      }

      .code-block,
      .code-tabs {
        margin: 1.5rem 0;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid $code-border;
        font-family: 'JetBrains Mono', monospace;
      }

      .code-block-bar,
      .code-tabs-bar {
        display: flex;
        align-items: stretch;
        background: $code-chrome;
        border-bottom: 1px solid $code-border;
      }

      .code-block-bar {
        align-items: center;
        justify-content: space-between;
        padding: 0.35rem 0.5rem 0.35rem 0.9rem;

        .code-block-file {
          font-size: 0.78em;
          color: #9da5b4;
        }
      }

      .code-copy {
        font-family: inherit;
        font-size: 0.72em;
        color: #9da5b4;
        background: transparent;
        border: 1px solid transparent;
        border-radius: 4px;
        padding: 0.2rem 0.55rem;
        cursor: pointer;
        transition: all 200ms;

        &:hover {
          color: #fff;
          border-color: color('primary');
          background: rgba(color('primary'), 0.15);
        }

        &.copied {
          color: color('primary');
        }
      }

      // --- CSS-only tabs (hidden radios drive the active panel) -------------
      .code-tabs {
        position: relative;

        .code-tab-input {
          position: absolute;
          opacity: 0;
          pointer-events: none;
        }

        .code-tabs-bar {
          overflow-x: auto;
        }

        .code-tab-label {
          padding: 0.55rem 1rem;
          font-size: 0.78em;
          color: #9da5b4;
          background: $code-chrome;
          border-right: 1px solid $code-border;
          white-space: nowrap;
          cursor: pointer;
          transition: color 200ms, background 200ms;

          &:hover {
            color: #fff;
          }
        }

        .code-tab-panel {
          position: relative;
          display: none;

          .code-copy {
            position: absolute;
            top: 0.5rem;
            right: 0.6rem;
            z-index: 1;
            background: rgba(#000, 0.35);
          }
        }
      }

      // Map each checked radio to its label + panel (supports up to 8 tabs).
      @for $i from 1 through 8 {
        .code-tab-input:nth-of-type(#{$i}):checked {
          ~ .code-tabs-bar .code-tab-label:nth-child(#{$i}) {
            color: #fff;
            background: $code-bg;
          }

          ~ .code-tabs-panels .code-tab-panel:nth-child(#{$i}) {
            display: block;
          }
        }
      }
    }

    .not-found {
      padding: 4rem 1rem;
      color: color('fontDark');
    }
  }
</style>
