const DEFAULT_TITLE = 'Zack Cuddy'

const TITLE_META = [
  { hid: 'og:title', name: 'og:title' },
  { hid: 'og:site_name', name: 'og:site_name' },
  { hid: 'twitter:title', name: 'twitter:title' },
]

const DESCRIPTION_META = [
  { hid: 'description', name: 'description' },
  { hid: 'og:description', name: 'og:description' },
  { hid: 'twitter:description', name: 'twitter:description' },
]

const IMAGE_META = [
  { hid: 'og:image', name: 'og:image' },
  { hid: 'twitter:image', name: 'twitter:image' },
]

const URL_META = [
  { hid: 'og:url', name: 'og:url' },
  { hid: 'twitter:site', name: 'twitter:site' },
]

// headBuilder centralizes the per-page <head> so every page only declares the
// handful of values it actually overrides. Anything omitted falls back to the
// global defaults set in nuxt.config.js.
export const headBuilder = ({ title, description, image, url, type }) => {
  let meta = []

  if (title) {
    meta = meta.concat(TITLE_META.map(item => ({ ...item, content: title })))
  }

  if (description) {
    meta = meta.concat(DESCRIPTION_META.map(item => ({ ...item, content: description })))
  }

  if (image) {
    meta = meta.concat(IMAGE_META.map(item => ({ ...item, content: image })))
  }

  if (url) {
    meta = meta.concat(URL_META.map(item => ({ ...item, content: url })))
  }

  // og:type lets social crawlers treat posts as articles rather than a website.
  meta.push({ hid: 'og:type', name: 'og:type', content: type || 'website' })

  return {
    title: title || DEFAULT_TITLE,
    meta,
    // Canonical URL is the single biggest SEO win for syndicated content.
    link: url ? [{ hid: 'canonical', rel: 'canonical', href: url }] : [],
  }
}
