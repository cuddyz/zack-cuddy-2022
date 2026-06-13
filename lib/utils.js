const WORDS_PER_MINUTE = 200

// Contentful images are served from their Images API, so we can ask for a
// resized, modern-format, quality-tuned derivative right in the URL instead of
// shipping the full-res original. Big perf/SEO win on the blog grid + hero.
export const contentfulImage = (url, { width, height, quality = 70, format = 'webp', fit } = {}) => {
  if (!url) {
    return ''
  }

  // Contentful asset URLs come back protocol-relative (//images.ctfassets.net/...)
  const base = url.startsWith('//') ? `https:${url}` : url
  const params = new URLSearchParams()

  if (width) params.set('w', Math.round(width))
  if (height) params.set('h', Math.round(height))
  if (quality) params.set('q', quality)
  if (format) params.set('fm', format)
  if (fit) params.set('fit', fit)

  const query = params.toString()

  return query ? `${base}?${query}` : base
}

// Human-friendly publish date, e.g. "June 13, 2026".
export const formatDate = (date) => {
  if (!date) {
    return ''
  }

  return new Date(date).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Rough reading-time estimate from raw markdown body text.
export const readingTime = (body) => {
  if (!body) {
    return 1
  }

  const words = body.trim().split(/\s+/).length

  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
}
