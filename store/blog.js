import client from '~/plugins/contentful'

export const state = () => ({
  blogPosts: [],
})

export const mutations = {
  LOAD_BLOG_POSTS: (state, blogPosts) => {
    state.blogPosts = blogPosts
  },
}

export const getters = {
  getSubsetOfBlogPosts: state => (num) => {
    return state.blogPosts ? state.blogPosts.slice(0, num) : []
  },
  getBlogPostBySlug: state => (slug) => {
    if (!slug) {
      return null
    }

    return state.blogPosts.find(post => post.fields.slug === slug)
  },
  // Suggest the next reads for a given post: rank the other posts by how many
  // tags they share with the current one, falling back to recency for ties.
  // state.blogPosts is already sorted publishDate-desc, and Array.sort is
  // stable, so equal-score posts keep that recency order.
  getRelatedBlogPosts: state => (slug, limit = 3) => {
    const posts = state.blogPosts || []
    const current = posts.find(post => post.fields.slug === slug)

    if (!current) {
      return posts.slice(0, limit)
    }

    const currentTags = current.fields.tags || []

    return posts
      .filter(post => post.fields.slug !== slug)
      .map(post => ({
        post,
        shared: (post.fields.tags || []).filter(tag => currentTags.includes(tag)).length
      }))
      .sort((a, b) => b.shared - a.shared)
      .slice(0, limit)
      .map(scored => scored.post)
  },
}

export const actions = {
  async getBlogPosts({ commit }) {
    try {
      if (!client) {
        return
      }

      const response = await client.getEntries({
        content_type: 'blogPost',
        order: '-fields.publishDate',
      })

      if (response.items.length > 0) {
        commit('LOAD_BLOG_POSTS', response.items)
      }
    } catch (err) {
      // Missing keys / network errors are non-fatal: the blog just renders empty.
      // console.error(err)
    }
  },
}
