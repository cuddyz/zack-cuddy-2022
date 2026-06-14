const contentful = require('contentful')

// Single shared read-only delivery client. Keys come from the environment
// (see .env.example) and are injected at build/dev time via nuxt.config env.
module.exports = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_ACCESSTOKEN,
})
