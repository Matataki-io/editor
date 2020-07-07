import hljs from 'highlight.js'
import $ from 'jquery'

var supportCodeModes = ['javascript', 'typescript', 'jsx', 'htmlmixed', 'htmlembedded', 'css', 'xml', 'clike', 'clojure', 'ruby', 'python', 'shell', 'php', 'sql', 'haskell', 'coffeescript', 'yaml', 'pug', 'lua', 'cmake', 'nginx', 'perl', 'sass', 'r', 'dockerfile', 'tiddlywiki', 'mediawiki', 'go', 'gherkin'].concat(hljs.listLanguages())
var supportCharts = ['sequence', 'flow', 'graphviz', 'mermaid', 'abc', 'plantuml', 'vega', 'geo']

export function textcomplete(editor) {
  return
  $(editor.getInputField())
    .textcomplete([
      { // emoji strategy
        match: /(^|\n|\s)\B:([-+\w]*)$/,
        search: function (term, callback) {
          var line = editor.getLine(editor.getCursor().line)
          term = line.match(this.match)[2]
          var list = []
          $.map(window.emojify.emojiNames, function (emoji) {
            if (emoji.indexOf(term) === 0) { // match at first character
              list.push(emoji)
            }
          })
          $.map(window.emojify.emojiNames, function (emoji) {
            if (emoji.indexOf(term) !== -1) { // match inside the word
              list.push(emoji)
            }
          })
          callback(list)
        },
        template: function (value) {
          return `1111 ${value}`
        },
        replace: function (value) {
          return '$1:' + value + ': '
        },
        index: 1,
        context: function (text) {
          return text
        }
      }
    ])
}
