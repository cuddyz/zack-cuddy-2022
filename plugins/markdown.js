// Owns the markdown-it instance used to render Contentful post bodies (injected
// as `$md`, so `$md.render(body)` works exactly as before). We build our own
// instance rather than using @nuxtjs/markdownit because we need a custom `fence`
// renderer for Prism (VSCode-style) syntax highlighting and the `code-tabs`
// block — and functions can't survive that module's option serialization.
import MarkdownIt from 'markdown-it'
import Prism from 'prismjs'

// Prism language grammars, loaded in dependency-safe order (core already ships
// markup, css, clike, javascript). Add a language here to support its fences.
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-java'
// markup-templating must load before php — php registers a global
// after-tokenize hook that calls into it on every highlight.
import 'prismjs/components/prism-markup-templating'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-sass'
import 'prismjs/components/prism-diff'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: true,
})

const escape = md.utils.escapeHtml

// Map a filename extension (or bare language token) to a Prism grammar name.
const LANG_BY_EXT = {
  js: 'javascript',
  mjs: 'javascript',
  cjs: 'javascript',
  ts: 'typescript',
  jsx: 'jsx',
  tsx: 'tsx',
  vue: 'markup',
  html: 'markup',
  htm: 'markup',
  xml: 'markup',
  svg: 'markup',
  css: 'css',
  scss: 'scss',
  sass: 'sass',
  json: 'json',
  yml: 'yaml',
  yaml: 'yaml',
  sh: 'bash',
  bash: 'bash',
  zsh: 'bash',
  py: 'python',
  rb: 'ruby',
  go: 'go',
  rs: 'rust',
  c: 'c',
  h: 'c',
  cpp: 'cpp',
  cc: 'cpp',
  java: 'java',
  php: 'php',
  sql: 'sql',
  md: 'markdown',
  markdown: 'markdown',
  diff: 'diff',
}

function resolveLang(token) {
  if (!token) return ''
  const key = token.toLowerCase()
  if (Prism.languages[key]) return key
  const ext = key.includes('.') ? key.split('.').pop() : key
  return LANG_BY_EXT[ext] || ''
}

// Highlighted inner HTML for a <code> element, falling back to escaped text.
function highlight(code, lang) {
  const grammar = lang && Prism.languages[lang]
  if (grammar) return Prism.highlight(code, grammar, lang)
  return escape(code)
}

function trimBlankEdges(str) {
  return str.replace(/^\n+/, '').replace(/\s+$/, '')
}

// A single code block with a VSCode-style header bar (filename/lang + copy).
function codeBlock({ code, lang, label }) {
  const cls = lang ? ` class="language-${lang}"` : ''
  const heading = label || lang || 'code'
  return (
    `<div class="code-block">` +
    `<div class="code-block-bar"><span class="code-block-file">${escape(heading)}</span>` +
    `<button type="button" class="code-copy" data-copy aria-label="Copy code">Copy</button></div>` +
    `<pre${cls}><code${cls}>${highlight(code, lang)}</code></pre>` +
    `</div>`
  )
}

// A `code-tabs` block: VSCode-style tabbed files, switched with pure CSS
// (hidden radio inputs). Files are delimited by `@tab <filename>` lines.
function codeTabs(content, group) {
  const lines = content.split('\n')
  const files = []
  let current = null

  for (const line of lines) {
    const match = line.match(/^@tab\s+(.+?)\s*$/)
    if (match) {
      current = { name: match[1].trim(), lines: [] }
      files.push(current)
    } else if (current) {
      current.lines.push(line)
    }
  }

  // No `@tab` markers — degrade to a plain code block so nothing is lost.
  if (!files.length) return codeBlock({ code: trimBlankEdges(content), lang: '', label: 'code' })

  const inputs = []
  const labels = []
  const panels = []

  files.forEach((file, i) => {
    const id = `ct-${group}-${i}`
    const lang = resolveLang(file.name)
    const code = trimBlankEdges(file.lines.join('\n'))
    const cls = lang ? ` class="language-${lang}"` : ''
    const checked = i === 0 ? ' checked' : ''

    inputs.push(`<input type="radio" name="ct-${group}" id="${id}" class="code-tab-input"${checked}>`)
    labels.push(`<label for="${id}" class="code-tab-label">${escape(file.name)}</label>`)
    panels.push(
      `<div class="code-tab-panel">` +
        `<button type="button" class="code-copy" data-copy aria-label="Copy code">Copy</button>` +
        `<pre${cls}><code${cls}>${highlight(code, lang)}</code></pre>` +
        `</div>`
    )
  })

  return (
    `<div class="code-tabs">` +
    inputs.join('') +
    `<div class="code-tabs-bar">${labels.join('')}</div>` +
    `<div class="code-tabs-panels">${panels.join('')}</div>` +
    `</div>`
  )
}

// Replace the default fence renderer: `code-tabs` becomes a tabbed block,
// everything else becomes a single highlighted code block.
md.renderer.rules.fence = function (tokens, idx) {
  const token = tokens[idx]
  const info = token.info.trim()
  const parts = info.split(/\s+/)
  const first = parts[0] || ''

  if (first.toLowerCase() === 'code-tabs') {
    return codeTabs(token.content, idx)
  }

  const lang = resolveLang(first)
  const label = parts.slice(1).join(' ') || first
  return codeBlock({ code: token.content, lang, label })
}

export default (_ctx, inject) => {
  inject('md', md)
}
