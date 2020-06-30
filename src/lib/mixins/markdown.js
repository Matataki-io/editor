import hljsLangs from '../core/hljs/lang.hljs.js'
import { loadScript } from '../core/extra-function.js'
import { injectLineNumber } from '../../lib/syncscroll.js'

import { formatReadTags } from '../extmarkdown.js'
import { md } from '../extra'

var markdown = md
// 表情
var emoji = require('markdown-it-emoji');
// 下标
var sub = require('markdown-it-sub')
// 上标
var sup = require('markdown-it-sup')
// <dl/>
var deflist = require('markdown-it-deflist')
// <abbr/>
var abbr = require('markdown-it-abbr')
// footnote
var footnote = require('markdown-it-footnote')
// insert 带有下划线 样式 ++ ++
var insert = require('markdown-it-ins')
// mark
var mark = require('markdown-it-mark')
// taskLists
var taskLists = require('markdown-it-task-lists')
// container
var container = require('markdown-it-container')
// 注释原因: 因为和markdown-it-anchor的功能冲突了(他们的实现方法不一样)
// var toc = require('markdown-it-toc')
// anchor
// error: plugin.apply is not a function
// fix: https://github.com/tylingsoft/markdown-it-mermaid/issues/4
var anchor = require('markdown-it-anchor').default
// markdown-it-table-of-contents
var tableOfContents = require('markdown-it-table-of-contents')
// https://www.npmjs.com/package/markdown-it-container
const miContainer = require('markdown-it-container')

// add target="_blank" to all link
var defaultRender = markdown.renderer.rules.link_open || function(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};
markdown.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  var hIndex = tokens[idx].attrIndex('href');
  if (tokens[idx].attrs[hIndex][1].startsWith('#')) return defaultRender(tokens, idx, options, env, self);
  // If you are sure other plugins can't add `target` - drop check below
  var aIndex = tokens[idx].attrIndex('target');

  if (aIndex < 0) {
    tokens[idx].attrPush(['target', '_blank']); // add new attribute
  } else {
    tokens[idx].attrs[aIndex][1] = '_blank';    // replace value of existing attr
  }

  // pass token to default renderer.
  return defaultRender(tokens, idx, options, env, self);
};
// var mihe = require('markdown-it-highlightjs-external');
// math katex
var katex = require('markdown-it-katex-external');
var miip = require('markdown-it-images-preview');
var missLangs = {};
var needLangs = [];
var hljs_opts = {
  hljs: 'auto',
  highlighted: true,
  langCheck: function(lang) {
    if (lang && hljsLangs[lang] && !missLangs[lang]) {
      missLangs[lang] = 1;
      needLangs.push(hljsLangs[lang])
    }
  }
};

// use(mihe, hljs_opts)
markdown
  .use(emoji)
  .use(sup)
  .use(sub)
  .use(container)
  .use(container, 'hljs-left') /* align left */
  .use(container, 'hljs-center')/* align center */
  .use(container, 'hljs-right')/* align right */
  .use(deflist)
  .use(abbr)
  .use(footnote)
  .use(insert)
  .use(mark)
  .use(container)
  .use(miip)
  .use(katex)
  .use(taskLists)
  .use(anchor)
  .use(tableOfContents, {
    includeLevel: [1,2,3], // hackmd 也只支持到了h3
    markerPattern: /^\[toc\]|^\[\[toc\]\]/im // 如果想 支持 [[toc]] [toc] 的话不能添加 $
  })
// .use(toc)

injectLineNumber(markdown)

export default {
  data() {
    return {
      markdownIt: markdown
    }
  },
  mounted() {
    var $vm = this;
    hljs_opts.highlighted = this.ishljs;
  },
  methods: {
    $render(src, func, readTagsDisplayMode = 0) {
      var $vm = this;
      missLangs = {};
      needLangs = [];
      const formatResult = formatReadTags(src, readTagsDisplayMode);
      var res = markdown.render(formatResult);
      if (this.ishljs) {
        if (needLangs.length > 0) {
          $vm.$_render(src, func, res);
        }
      }
      func(res);
    },
    $_render(src, func, res) {
      var $vm = this;
      var deal = 0;
      for (var i = 0; i < needLangs.length; i++) {
        var url = $vm.p_external_link.hljs_lang(needLangs[i]);
        loadScript(url, function() {
          deal = deal + 1;
          if (deal === needLangs.length) {
            res = markdown.render(src);
            func(res);
          }
        })
      }
    }
  },
  watch: {
    ishljs: function(val) {
      hljs_opts.highlighted = val;
    }
  }
};
