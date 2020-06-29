import hljs from 'highlight.js'
import unescapeHTML from 'lodash/unescape'
import Prism from 'prismjs'
import escapeHTML from 'lodash/escape'

function highlightRender (code, lang) {
  console.log('highlightRender', code, lang)

  if (!lang || /no(-?)highlight|plain|text/.test(lang)) { return }
  function parseFenceCodeParams (lang) {
    const attrMatch = lang.match(/{(.*)}/)
    const params = {}
    if (attrMatch && attrMatch.length >= 2) {
      const attrs = attrMatch[1]
      const paraMatch = attrs.match(/([#.](\S+?)\s)|((\S+?)\s*=\s*("(.+?)"|'(.+?)'|\[[^\]]*\]|\{[}]*\}|(\S+)))/g)
      paraMatch && paraMatch.forEach(param => {
        param = param.trim()
        if (param[0] === '#') {
          params['id'] = param.slice(1)
        } else if (param[0] === '.') {
          if (params['class']) params['class'] = []
          params['class'] = params['class'].concat(param.slice(1))
        } else {
          const offset = param.indexOf('=')
          const id = param.substring(0, offset).trim().toLowerCase()
          let val = param.substring(offset + 1).trim()
          const valStart = val[0]
          const valEnd = val[val.length - 1]
          if (['"', "'"].indexOf(valStart) !== -1 && ['"', "'"].indexOf(valEnd) !== -1 && valStart === valEnd) {
            val = val.substring(1, val.length - 1)
          }
          if (id === 'class') {
            if (params['class']) params['class'] = []
            params['class'] = params['class'].concat(val)
          } else {
            params[id] = val
          }
        }
      })
    }
    return params
  }
  function serializeParamToAttribute (params) {
    if (Object.getOwnPropertyNames(params).length === 0) {
      return ''
    } else {
      return ` data-params="${escape(JSON.stringify(params))}"`
    }
  }
  const fenceCodeAlias = {
    sequence: 'sequence-diagram',
    flow: 'flow-chart',
    graphviz: 'graphviz',
    mermaid: 'mermaid',
    abc: 'abc',
    vega: 'vega',
    geo: 'geo'
  }

  const params = parseFenceCodeParams(lang)
  const attr = serializeParamToAttribute(params)
  lang = lang.split(/\s+/g)[0]

  code = escapeHTML(code)

  const langAlias = fenceCodeAlias[lang]
  if (langAlias) {
    return `<div class="${langAlias} raw"${attr}>${code}</div>`
  }

  const result = {
    value: code
  }
  const showlinenumbers = /=$|=\d+$|=\+$/.test(lang)
  if (showlinenumbers) {
    let startnumber = 1
    const matches = lang.match(/=(\d+)$/)
    if (matches) { startnumber = parseInt(matches[1]) }
    const lines = result.value.split('\n')
    const linenumbers = []
    for (let i = 0; i < lines.length - 1; i++) {
      linenumbers[i] = `<span data-linenumber='${startnumber + i}'></span>`
    }
    const continuelinenumber = /=\+$/.test(lang)
    const linegutter = `<div class='gutter linenumber${continuelinenumber ? ' continue' : ''}'>${linenumbers.join('\n')}</div>`
    result.value = `<div class='wrapper'>${linegutter}<div class='code'>${result.value}</div></div>`
  }
  return result.value
}

export const md = require('markdown-it')({
  html: true,        // Enable HTML tags in source
  xhtmlOut: true,        // Use '/' to close single tags (<br />).
  breaks: true,        // Convert '\n' in paragraphs into <br>
  langPrefix: '',  // CSS language prefix for fenced blocks. Can be
  linkify: false,        // 自动识别url
  typographer: true,
  quotes: '“”‘’'
});

// dynamic event or object binding here
export function finishView (view) {
  // syntax highlighting
  view.find('code.raw').removeClass('raw')
    .each((key, value) => {
      const langDiv = $(value)
      if (langDiv.length > 0) {
        const reallang = langDiv[0].className.replace(/hljs|wrap/g, '').trim()
        const codeDiv = langDiv.find('.code')
        let code = ''
        if (codeDiv.length > 0) code = codeDiv.html()
        else code = langDiv.html()
        var result
        if (!reallang) {
          result = {
            value: code
          }
        } else if (reallang === 'haskell' || reallang === 'go' || reallang === 'typescript' || reallang === 'jsx' || reallang === 'gherkin') {
          code = unescapeHTML(code)
          result = {
            value: Prism.highlight(code, Prism.languages[reallang])
          }
        } else if (reallang === 'tiddlywiki' || reallang === 'mediawiki') {
          code = unescapeHTML(code)
          result = {
            value: Prism.highlight(code, Prism.languages.wiki)
          }
        } else if (reallang === 'cmake') {
          code = unescapeHTML(code)
          result = {
            value: Prism.highlight(code, Prism.languages.makefile)
          }
        } else {
          code = unescapeHTML(code)
          const languages = hljs.listLanguages()
          if (!languages.includes(reallang)) {
            result = hljs.highlightAuto(code)
          } else {
            result = hljs.highlight(reallang, code)
          }
        }
        if (codeDiv.length > 0) codeDiv.html(result.value)
        else langDiv.html(result.value)
      }
    })
}
