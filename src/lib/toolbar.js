/**
 * @Author: HuaChao Chen <CHC>
 * @Date:   2017-05-03T01:23:38+08:00
 * @Email:  chenhuachaoxyz@gmail.com
 * @Filename: toolbar_left_click.js
 * @Last modified by:   CHC
 * @Last modified time: 2017-08-10T12:43:22+08:00
 * @License: MIT
 * @Copyright: 2017
 */

function $toolbar_left_undo_click($vm) {
  if ($vm.d_history_index > 0) {
    $vm.d_history_index--
  }
  // $vm.$refs.vNoteDivEdit.innerHTML = $vm.s_markdown.render($vm.d_value)
  if ($vm.s_preview_switch) {
    let start = $vm.getTextareaDom().selectionStart
    let currentLength = $vm.d_value.length
    $vm.$nextTick(() => {
      // 光标操作
      start -= currentLength - $vm.d_value.length
      $vm.getTextareaDom().selectionStart = start
      $vm.getTextareaDom().selectionEnd = start
    })
  }
  $vm.getTextareaDom().focus()
}
// redo
function $toolbar_left_redo_click($vm) {
  if ($vm.d_history_index < $vm.d_history.length - 1) {
    $vm.d_history_index++
  }
  $vm.getTextareaDom().focus()
  // $vm.$refs.vNoteDivEdit.innerHTML = $vm.s_markdown.render($vm.d_value)
}
function $toolbar_left_trash_click($vm) {
  $vm.d_value = ''
  $vm.getTextareaDom().focus()
  // $vm.$refs.vNoteDivEdit.innerHTML = $vm.s_markdown.render($vm.d_value)
}
function $toolbar_left_save_click($vm) {
  $vm.save($vm.d_value, $vm.d_render)
}
// ol
function $toolbar_left_ol_click($vm) {
  $vm.insertOl()
}
// ul
function $toolbar_left_ul_click($vm) {
  $vm.insertUl()
}
function $toolbar_left_remove_line_click($vm) {
  $vm.removeLine()
}
// 直接添加链接
export const toolbar_left_addlink = (type, text, link, $vm) => {
  let insert_text = {
    prefix: type === 'link' ? `[${text}](` : `![${text}](`,
    subfix: ')',
    str: link
  };
  $vm.insertText($vm.getTextareaDom(), insert_text);
}
export const toolbar_left_click = (_type, $vm) => {
  var _param_of_insert_text = {
    'bold': {
      prefix: '**',
      subfix: '**',
      str: $vm.d_words.tl_bold
    },
    'italic': {
      prefix: '*',
      subfix: '*',
      str: $vm.d_words.tl_italic
    },
    'header': {
      prefix: '# ',
      subfix: '',
      str: $vm.d_words.tl_header
    },
    'header1': {
      prefix: '# ',
      subfix: '',
      str: $vm.d_words.tl_header_one
    },
    'header2': {
      prefix: '## ',
      subfix: '',
      str: $vm.d_words.tl_header_two
    },
    'header3': {
      prefix: '### ',
      subfix: '',
      str: $vm.d_words.tl_header_three
    },
    'header4': {
      prefix: '#### ',
      subfix: '',
      str: $vm.d_words.tl_header_four
    },
    'header5': {
      prefix: '##### ',
      subfix: '',
      str: $vm.d_words.tl_header_five
    },
    'header6': {
      prefix: '###### ',
      subfix: '',
      str: $vm.d_words.tl_header_six
    },
    'underline': {
      prefix: '++',
      subfix: '++',
      str: $vm.d_words.tl_underline
    },
    'strikethrough': {
      prefix: '~~',
      subfix: '~~',
      str: $vm.d_words.tl_strikethrough
    },
    'mark': {
      prefix: '==',
      subfix: '==',
      str: $vm.d_words.tl_mark
    },
    'superscript': {
      prefix: '^',
      subfix: '^',
      str: $vm.d_words.tl_superscript
    },
    'subscript': {
      prefix: '~',
      subfix: '~',
      str: $vm.d_words.tl_subscript
    },
    'quote': {
      prefix: '> ',
      subfix: '',
      str: $vm.d_words.tl_quote
    },
    'link': {
      prefix: '[](',
      subfix: ')',
      str: $vm.d_words.tl_link
    },
    'imagelink': {
      prefix: '![](',
      subfix: ')',
      str: $vm.d_words.tl_image
    },
    'code': {
      prefix: '```',
      subfix: '\n\n```\n',
      str: 'language'
    },
    'table': {
      prefix: '',
      subfix: '',
      str: '|column1|column2|column3|\n|-|-|-|\n|content1|content2|content3|\n'
    },
    'aligncenter': {
      prefix: '::: hljs-center\n\n',
      subfix: '\n\n:::\n',
      str: $vm.d_words.tl_aligncenter
    },
    'alignright': {
      prefix: '::: hljs-right\n\n',
      subfix: '\n\n:::\n',
      str: $vm.d_words.tl_alignright
    },
    'alignleft': {
      prefix: '::: hljs-left\n\n',
      subfix: '\n\n:::\n',
      str: $vm.d_words.tl_alignleft
    }
  };
  if (_param_of_insert_text.hasOwnProperty(_type)) {
    // 插入对应的内容
    $vm.insertText($vm.getTextareaDom(),
      _param_of_insert_text[_type]);
  }
  var _other_left_click = {
    'undo': $toolbar_left_undo_click,
    'redo': $toolbar_left_redo_click,
    'trash': $toolbar_left_trash_click,
    'save': $toolbar_left_save_click,
    'ol': $toolbar_left_ol_click,
    'ul': $toolbar_left_ul_click,
    'removeLine': $toolbar_left_remove_line_click
  };
  if (_other_left_click.hasOwnProperty(_type)) {
    _other_left_click[_type]($vm);
  }
}

// new
// 编辑器工具栏
// 插入符号 ** *
function insertSymbol (modifier, editor) {
  if (!editor.somethingSelected()) {
    const word = editor.findWordAt(editor.getCursor())
    editor.setSelection(word.anchor, word.head)
  }
  editor.replaceSelection(modifier + editor.getSelection() + modifier)
  editor.focus()
}
// 插入标题
function insertHeader (editor) {
  const cursor = editor.getCursor()
  const startOfLine = { line: cursor.line, ch: 0 }
  const startOfLineText = editor.getRange(startOfLine, { line: cursor.line, ch: 1 })
  // See if it is already a header
  if (startOfLineText === '#') {
    editor.replaceRange('#', startOfLine, startOfLine)
  } else {
    editor.replaceRange('# ', startOfLine, startOfLine)
  }
  editor.focus()
}
// 插入code
function insertCode (editor) {
  editor.replaceSelection(`\n\`\`\`\n${editor.getSelection()}\n\`\`\`\n`)
  editor.focus()
}
// 行首插入 -- hackmk
function insertOnStartOfLines (cm, symbol) {
  const cursor = cm.getCursor()
  const ranges = cm.listSelections()

  for (let i = 0; i < ranges.length; i++) {
    const range = ranges[i]
    if (!range.empty()) {
      const from = range.from()
      const to = range.to()
      let selection = cm.getRange({ line: from.line, ch: 0 }, to)
      selection = selection.replace(/\n/g, '\n' + symbol)
      selection = symbol + selection
      cm.replaceRange(selection, from, to)
    } else {
      cm.replaceRange(symbol, { line: cursor.line, ch: 0 }, { line: cursor.line, ch: 0 })
    }
  }
  cm.setCursor({ line: cursor.line, ch: cursor.ch + symbol.length })
  cm.focus()
}
// 插入link
function insertLink (cm, isImage) {
  const cursor = cm.getCursor()
  const ranges = cm.listSelections()
  const linkEnd = '](https://)'
  const symbol = (isImage) ? '![' : '['

  for (let i = 0; i < ranges.length; i++) {
    const range = ranges[i]
    if (!range.empty()) {
      const from = range.from()
      const to = range.to()
      const anchorIndex = cm.indexFromPos(ranges[i].anchor)
      const headIndex = cm.indexFromPos(ranges[i].head)
      let selection = cm.getRange(from, to)
      selection = symbol + selection + linkEnd
      cm.replaceRange(selection, from, to)
      if (anchorIndex > headIndex) {
        ranges[i].anchor.ch += symbol.length
        ranges[i].head.ch += symbol.length
      } else {
        ranges[i].head.ch += symbol.length
        ranges[i].anchor.ch += symbol.length
      }
      cm.setSelections(ranges)
    } else {
      cm.replaceRange(symbol + linkEnd, cursor, cursor)
      cm.setCursor({ line: cursor.line, ch: cursor.ch + symbol.length + linkEnd.length })
    }
  }
  cm.focus()
}
// 插入文字
function insertText (cm, text, cursorEnd = 0) {
  const cursor = cm.getCursor()
  cm.replaceSelection(text, cursor, cursor)
  cm.focus()
  cm.setCursor({ line: cursor.line, ch: cursor.ch + cursorEnd })
}
export const toolbar = (_type, $vm, data) => {
  console.log('type', _type)
  const editor = $vm.codemirror

  const insertSymbolType = {
    'bold': '**',
    'italic': '*',
    'strikethrough': '~~'
  }

  if (insertSymbolType[_type]) {
    insertSymbol(insertSymbolType[_type], editor)
  } else if (_type === 'header') {
    insertHeader(editor)
  } else if (_type === 'code') {
    insertCode(editor)
  } else if (_type === 'quote') {
    insertOnStartOfLines(editor, '> ')
  } else if (_type === 'ol') {
    insertOnStartOfLines(editor, '1. ')
  } else if (_type === 'ul') {
    insertOnStartOfLines(editor, '* ')
  } else if (_type === 'task') {
    insertOnStartOfLines(editor, '- [ ] ')
  } else if (_type === 'link') {
    insertLink(editor, false)
  } else if (_type === 'imagelink') {
    if (data.action === 'default') {
      insertLink(editor, true)
    } else {
      insertText(editor, `\n![${data.title}](${data.url})\n`)
    }
  } else if (_type === 'table') {
    insertText(editor, '\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text     | Text     |\n')
  } else if (_type === 'line') {
    insertText(editor, '\n----\n')
  } else if (_type === 'encryption') {
    // insertText(editor, '\n\n[read hold="SYMBOL amount"]\n\n隐藏内容\n\n[else]\n\n预览内容\n\n[/read]\n')
    insertText(editor, data.string)
  } else {

  }
}
