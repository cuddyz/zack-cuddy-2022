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
