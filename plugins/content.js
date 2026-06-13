// Prefetch Contentful content once on app boot so every page (and the static
// generate pass) has the blog posts available from the store immediately.
export default async ({ store }) => {
  await store.dispatch('blog/getBlogPosts', null, { root: true })
}
