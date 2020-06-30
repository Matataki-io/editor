<template>
    <div :class="[{ 'fullscreen': s_fullScreen, 'shadow': boxShadow }]" class="v-note-wrapper markdown-body" :style="{'box-shadow': boxShadow ? boxShadowStyle : ''}">
        <!--工具栏-->
        <div class="v-note-op" v-show="toolbarsFlag" :style="{'background': toolbarsBackground}">
            <v-md-toolbar-left ref="toolbar_left" :editable="editable" :transition="transition" :d_words="d_words"
                               @toolbar_left_click="toolbar_left_click" @toolbar_left_addlink="toolbar_left_addlink" :toolbars="toolbars"
                               @imgAdd="$imgAdd" @imgDel="$imgDel" @imgTouch="$imgTouch" :image_filter="imageFilter"
                               :class="{'transition': transition}">
                <slot name="left-toolbar-before" slot="left-toolbar-before" />
                <slot name="left-toolbar-after" slot="left-toolbar-after" />
            </v-md-toolbar-left>
            <v-md-toolbar-right ref="toolbar_right" :d_words="d_words" @toolbar_right_click="toolbar_right_click"
                                :toolbars="toolbars"
                                :s_subfield="s_subfield"
                                :s_preview_switch="s_preview_switch" :s_fullScreen="s_fullScreen"
                                :s_html_code="s_html_code"
                                :s_navigation="s_navigation"
                                :class="{'transition': transition}">
                <slot name="right-toolbar-before" slot="right-toolbar-before" />
                <slot name="right-toolbar-after" slot="right-toolbar-after" />
            </v-md-toolbar-right>
        </div>
        <!--编辑展示区域-->
        <div class="v-note-panel">
            <!--编辑区-->
            <!-- @scroll="$v_edit_scroll" -->
            <div ref="vNoteEdit" class="v-note-edit divarea-wrapper"
                 :class="{'scroll-style': s_scrollStyle, 'scroll-style-border-radius': s_scrollStyle && !s_preview_switch && !s_html_code, 'single-edit': !s_preview_switch && !s_html_code, 'single-show': (!s_subfield && s_preview_switch) || (!s_subfield && s_html_code), 'transition': transition}"
                 >
                 <!-- @click="textAreaFocus" -->
                <div class="content-input-wrapper" :style="{'background-color': editorBackground}">
                    <!-- 双栏 -->
                    <v-autoTextarea ref="vNoteTextarea" :placeholder="placeholder ? placeholder : d_words.start_editor"
                                    class="content-input" :fontSize="fontSize"
                                    lineHeight="1.5" v-model="d_value" fullHeight
                                    :style="{'background-color': editorBackground, 'position': 'fixed', 'top': 0, 'left': '0', height: '100px', display: 'none'}"></v-autoTextarea>
                    <codemirror 
                        @scroll="$v_edit_scroll__left"
                        ref="myCm" 
                        class="codemirror-editor" 
                        v-model="d_value"  
                        :options="cmOptions"></codemirror>
                    
                </div>
            </div>
            <!--展示区-->
            <div :class="{'single-show': (!s_subfield && s_preview_switch) || (!s_subfield && s_html_code)}"
                 v-show="s_preview_switch || s_html_code" class="v-note-show">
                <div @scroll="$v_edit_scroll__right" ref="vShowContent" v-html="d_render" v-show="!s_html_code"
                     :class="{'scroll-style': s_scrollStyle, 'scroll-style-border-radius': s_scrollStyle}" class="v-show-content"
                     :style="{'background-color': previewBackground}">
                </div>
                <div v-show="s_html_code" :class="{'scroll-style': s_scrollStyle, 'scroll-style-border-radius': s_scrollStyle}" class="v-show-content-html spoiler"
                  :style="{'background-color': previewBackground}">
                    {{d_render}}
                </div>
            </div>

            <!--标题导航-->
            <transition name="slideTop">
                <div v-show="s_navigation" class="v-note-navigation-wrapper" :class="{'transition': transition}">
                    <div class="v-note-navigation-title">
                        {{d_words.navigation_title}}<i @click="toolbar_right_click('navigation')"
                                                       class="fa fa-mavon-times v-note-navigation-close"
                                                       aria-hidden="true"></i>
                    </div>
                    <div ref="navigationContent" class="v-note-navigation-content" :class="{'scroll-style': s_scrollStyle}">
                    </div>
                </div>
            </transition>

        </div>
        <!--帮助文档-->
        <transition name="fade">
            <div ref="help">
                <div class="v-note-help-wrapper" v-if="s_help">
                    <div class="v-note-help-content markdown-body" :class="{'shadow': boxShadow}">
                        <i @click.stop.prevent="toolbar_right_click('help')" class="fa fa-mavon-times"
                           aria-hidden="true"></i>
                        <div class="scroll-style v-note-help-show" v-html="d_help"></div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- 预览图片 -->
        <transition name="fade">
            <div @click="d_preview_imgsrc=null" class="v-note-img-wrapper" v-if="d_preview_imgsrc">
                <img :src="d_preview_imgsrc" alt="none">
            </div>
        </transition>
        <!--阅读模式-->
        <div :class="{'show': s_readmodel}" class="v-note-read-model scroll-style" ref="vReadModel">
            <div ref="vNoteReadContent" class="v-note-read-content" v-html="d_render">
            </div>
        </div>
    </div>
</template>
<script>
    // import tomarkdown from './lib/core/to-markdown.js'
import {autoTextarea} from 'auto-textarea'
import {keydownListen} from './lib/core/keydown-listen.js'
import hljsCss from './lib/core/hljs/lang.hljs.css.js'
import hljsLangs from './lib/core/hljs/lang.hljs.js'

import utils from './lib/utils'

import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/keymap/sublime.js'
// Hint
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/anyword-hint'
import 'codemirror/addon/selection/active-line.js'

// foldGutter
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/comment-fold.js'
import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/indent-fold.js'
import 'codemirror/addon/fold/markdown-fold.js'

import 'codemirror/addon/display/fullscreen.css'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/scroll/simplescrollbars.css'
// serch
import 'codemirror/addon/search/matchesonscrollbar.css'
// CloseBrackets
import 'codemirror/addon/edit/closebrackets'

// Mode
import 'codemirror/mode/css/css'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/javascript/javascript'

import 'codemirror/mode/gfm/gfm'

// Theme
import 'xiaotian-codemirror/theme/one-dark.css'

import {
    fullscreenchange,
  /* windowResize, */
    scrollLink,
    insertTextAtCaret,
    getNavigation,
    insertTab,
    unInsertTab,
    insertOl,
    insertUl,
    insertEnter,
    removeLine,
    loadLink,
    loadScript,
    ImagePreviewListener
} from './lib/core/extra-function.js'
import {p_ObjectCopy_DEEP, stopEvent} from './lib/util.js'
import {toolbar_left_click, toolbar_left_addlink} from './lib/toolbar_left_click.js'
import {toolbar_right_click} from './lib/toolbar_right_click.js'
import {CONFIG} from './lib/config.js'
import hljs from './lib/core/highlight.js'
import markdown from './lib/mixins/markdown.js'

import md_toolbar_left from './components/md-toolbar-left.vue'
import md_toolbar_right from './components/md-toolbar-right.vue'
import "./lib/font/css/fontello.css"
import './lib/css/md.css'
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
import anime from 'animejs/lib/anime.es.js';

const isMac = true
export default {
    mixins: [markdown],
    props: {
        scrollStyle: {  // 是否渲染滚动条样式(webkit)
          type: Boolean,
          default: true
        },
        boxShadow: { // 是否添加阴影
          type: Boolean,
          default: true
        },
        transition: { // 是否开启动画过渡
          type: Boolean,
          default: true
        },
        autofocus: { // 是否自动获取焦点
          type: Boolean,
          default: true
        },
        fontSize: { // 字体大小
          type: String,
          default: '15px'
        },
        toolbarsBackground: { // 工具栏背景色
          type: String,
          default: '#ffffff'
        },
        editorBackground: { // TODO: 编辑栏背景色
          type: String,
          default: '#ffffff'
        },
        previewBackground: { // 预览栏背景色
          type: String,
          default: '#fbfbfb'
        },
        boxShadowStyle: { // 阴影样式
          type: String,
          default: '0 2px 12px 0 rgba(0, 0, 0, 0.1)'
        },
        help: {
          type: String,
          default: null
        },
        value: { // 初始 value
          type: String,
          default: ''
        },
        language: {  // 初始语言
          type: String,
          default: 'zh-CN'
        },
        subfield: {
          type: Boolean,
          default: true
        },
        navigation: {
          type: Boolean,
          default: false
        },
        defaultOpen: {
          type: String,
          default: null
        },
        editable: { // 是否开启编辑
          type: Boolean,
          default: true
        },
        toolbarsFlag: { // 是否开启工具栏
          type: Boolean,
          default: true
        },
        toolbars: { // 工具栏
          type: Object,
          default() {
            return CONFIG.toolbars
          }
        },
        codeStyle: { // <code></code> 样式
          type: String,
          default() {
            return 'github';
          }
        },
        placeholder: { // 编辑器默认内容
          type: String,
          default: null
        },
        ishljs: {
          type: Boolean,
          default: true
        },
        externalLink: {
          type: [Object, Boolean],
          default: true
        },
        imageFilter: {
          type: Function,
          default: null
        },
        imageClick: {
          type: Function,
          default: null
        },
        tabSize: {
          type: Number,
          default: 0
        },
        shortCut:{
          type: Boolean,
          default: true
        }
    },
    data() {
        this.defaultExtraKeys = {
          F10: function (cm) {
            cm.setOption('fullScreen', !cm.getOption('fullScreen'))
          },
          'Cmd-S': function () {
            return false
          },
          'Ctrl-S': function () {
            return false
          },
          Enter: 'newlineAndIndentContinueMarkdownList',
          Tab: function (cm) {
            var tab = '\t'

            // contruct x length spaces
            var spaces = Array(parseInt(cm.getOption('indentUnit')) + 1).join(' ')

            // auto indent whole line when in list or blockquote
            var cursor = cm.getCursor()
            var line = cm.getLine(cursor.line)

            // this regex match the following patterns
            // 1. blockquote starts with "> " or ">>"
            // 2. unorder list starts with *+-
            // 3. order list starts with "1." or "1)"
            var regex = /^(\s*)(>[> ]*|[*+-]\s|(\d+)([.)]))/

            var match
            var multiple = cm.getSelection().split('\n').length > 1 ||
                cm.getSelections().length > 1

            if (multiple) {
              cm.execCommand('defaultTab')
            } else if ((match = regex.exec(line)) !== null) {
              var ch = match[1].length
              var pos = {
                line: cursor.line,
                ch: ch
              }
              if (cm.getOption('indentWithTabs')) {
                cm.replaceRange(tab, pos, pos, '+input')
              } else {
                cm.replaceRange(spaces, pos, pos, '+input')
              }
            } else {
              if (cm.getOption('indentWithTabs')) {
                cm.execCommand('defaultTab')
              } else {
                cm.replaceSelection(spaces)
              }
            }
          },
          'Cmd-Left': 'goLineLeftSmart',
          'Cmd-Right': 'goLineRight',
          Home: 'goLineLeftSmart',
          End: 'goLineRight',
          'Ctrl-C': function (cm) {
            if (!isMac && cm.getOption('keyMap').substr(0, 3) === 'vim') {
              document.execCommand('copy')
            } else {
              return this.codemirror.Pass
            }
          },
          'Ctrl-*': cm => {
            utils.wrapTextWith(this.codemirror, cm, '*')
          },
          'Shift-Ctrl-8': cm => {
            utils.wrapTextWith(this.codemirror, cm, '*')
          },
          'Ctrl-_': cm => {
            utils.wrapTextWith(this.codemirror, cm, '_')
          },
          'Shift-Ctrl--': cm => {
            utils.wrapTextWith(this.codemirror, cm, '_')
          },
          'Ctrl-~': cm => {
            utils.wrapTextWith(this.codemirror, cm, '~')
          },
          'Shift-Ctrl-`': cm => {
            utils.wrapTextWith(this.codemirror, cm, '~')
          },
          'Ctrl-^': cm => {
            utils.wrapTextWith(this.codemirror, cm, '^')
          },
          'Shift-Ctrl-6': cm => {
            utils.wrapTextWith(this.codemirror, cm, '^')
          },
          'Ctrl-+': cm => {
            utils.wrapTextWith(this.codemirror, cm, '+')
          },
          'Shift-Ctrl-=': cm => {
            utils.wrapTextWith(this.codemirror, cm, '+')
          },
          'Ctrl-=': cm => {
            utils.wrapTextWith(this.codemirror, cm, '=')
          },
          'Shift-Ctrl-Backspace': cm => {
            utils.wrapTextWith(this.codemirror, cm, 'Backspace')
          }
        }
        return {
          s_right_click_menu_show: false,
          right_click_menu_top: 0,
          right_click_menu_left: 0,
          s_subfield: (() => {
            return this.subfield;
          })(),
          s_autofocus: true,
          // 标题导航
          s_navigation: (() => {
            return this.navigation;
          })(),
          s_scrollStyle: (() => {
            return this.scrollStyle
          })(),// props 是否渲染滚动条样式
          d_value: '',// props 文本内容
          d_render: '',// props 文本内容render
          s_preview_switch: (() => {
            let default_open_ = this.defaultOpen;
            if (!default_open_) {
              default_open_ = this.subfield ? 'preview' : 'edit';
            }
            return default_open_ === 'preview' ? true : false;
          })(), // props true 展示编辑 false展示预览
          s_fullScreen: false,// 全屏编辑标志
          s_help: false,// markdown帮助
          s_html_code: false,// 分栏情况下查看html
          d_help: null,
          d_words: null,
          edit_scroll_height: -1,
          s_readmodel: false,
          s_table_enter: false, // 回车事件是否在表格中执行
          d_history: (() => {
            let temp_array = []
            temp_array.push(this.value)
            return temp_array;
          })(), // 编辑记录
          d_history_index: 0, // 编辑记录索引
          currentTimeout: '',
          d_image_file: [],
          d_preview_imgsrc: null, // 图片预览地址
          s_external_link: {
            markdown_css: function() {
              return 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.9.0/github-markdown.min.css';
            },
            hljs_js: function() {
              return 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js';
            },
            hljs_lang: function(lang) {
              return 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/languages/' + lang + '.min.js';
            },
            hljs_css: function(css) {
              if (hljsCss[css]) {
                return 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/' + css + '.min.css';
              }
              return '';
            },
            katex_js: function() {
              return 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.8.3/katex.min.js';
            },
            katex_css: function() {
              return 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.8.3/katex.min.css';
            }
          },
          p_external_link: {},
          timer: null,
          cmOptions: {
            line: true,
            mode: 'gfm',
            backdrop: 'gfm',
            keyMap: 'sublime',
            viewportMargin: 20,
            styleActiveLine: true,
            lineNumbers: true,
            lineWrapping: true,
            showCursorWhenSelecting: true,
            highlightSelectionMatches: true,
            indentUnit: 4,
            continueComments: 'Enter',
            theme: 'one-dark',
            inputStyle: 'textarea',
            matchBrackets: true,
            autoCloseBrackets: true,
            matchTags: {
              bothTags: true
            },
            autoCloseTags: true,
            foldGutter: true,
            gutters: [
              'CodeMirror-linenumbers',
              'authorship-gutters',
              'CodeMirror-foldgutter'
            ],
            flattenSpans: true,
            addModeClass: true,
            // readOnly: true,
            // autoRefresh: true,
            otherCursors: true
          },
          scrollSwitchLeft: false,
          scrollSwitchTimerLeft: null,
          scrollSwitchRight: false,
          scrollSwitchTimerRight: null
        };
    },
    created() {
        var $vm = this;
        // 初始化语言
        this.initLanguage();
        this.initExternalFuc();
        this.$nextTick(() => {
          // 初始化Textarea编辑开关
          $vm.editableTextarea();

          setTimeout(() => {
            window.codemirror = this.codemirror
          }, 2000)
        })
    },
    mounted() {
        var $vm = this;
        this.$el.addEventListener('paste', function (e) {
          $vm.$paste(e);
        })
        this.$el.addEventListener('drop', function (e) {
          $vm.$drag(e);
        })
        // 浏览器siz大小
        /* windowResize(this); */
        keydownListen(this);
        // 图片预览事件监听
        ImagePreviewListener(this);
        // 设置默认焦点
        if (this.autofocus) {
          this.getTextareaDom().focus();
        }
        // fullscreen事件
        fullscreenchange(this);
        this.d_value = this.value;
        // 将help添加到末尾
        document.body.appendChild(this.$refs.help);
        this.loadExternalLink('markdown_css', 'css');
        this.loadExternalLink('katex_css', 'css')
        this.loadExternalLink('katex_js', 'js', function() {
          $vm.iRender(true);
        })
        this.loadExternalLink('hljs_js', 'js', function() {
          $vm.iRender(true);
        })

        if (!(typeof $vm.externalLink === 'object' && typeof $vm.externalLink['markdown_css'] === 'function')) {
          // 没有外部文件要来接管markdown样式，可以更改markdown样式。
          $vm.codeStyleChange($vm.codeStyle, true)
        }
    },
    beforeDestroy() {
        document.body.removeChild(this.$refs.help);
    },
    getMarkdownIt() {
        return this.mixins[0].data().markdownIt
    },
    methods: {
        loadExternalLink(name, type, callback) {
          if (typeof this.p_external_link[name] !== 'function') {
            if (this.p_external_link[name] != false) {
              console.error('external_link.' + name, 'is not a function, if you want to disabled this error log, set external_link.' + name, 'to function or false');
            }
            return;
          }
          var _obj = {
            'css': loadLink,
            'js': loadScript
          };
          if (_obj.hasOwnProperty(type)) {
            _obj[type](this.p_external_link[name](), callback);
          }
        },
        initExternalFuc() {
          var $vm = this;
          var _external_ = ['markdown_css', 'hljs_js', 'hljs_css', 'hljs_lang', 'katex_js', 'katex_css'];
          var _type_ = typeof $vm.externalLink;
          var _is_object = (_type_ === 'object');
          var _is_boolean = (_type_ === 'boolean');
          for (var i = 0; i < _external_.length; i++) {
            if ((_is_boolean && !$vm.externalLink) || (_is_object && $vm.externalLink[_external_[i]] === false)) {
              $vm.p_external_link[_external_[i]] = false;
            } else if (_is_object && typeof $vm.externalLink[_external_[i]] === 'function') {
              $vm.p_external_link[_external_[i]] = $vm.externalLink[_external_[i]];
            } else {
              $vm.p_external_link[_external_[i]] = $vm.s_external_link[_external_[i]];
            }
          }
        },
        textAreaFocus() {
          this.$refs.vNoteTextarea.$refs.vTextarea.focus();
        },
        $drag($e) {
          var dataTransfer = $e.dataTransfer;
          if (dataTransfer) {
            var files = dataTransfer.files;
            if (files.length > 0) {
              $e.preventDefault();
              this.$refs.toolbar_left.$imgFilesAdd(files);
            }
          }
        },
        $paste($e) {
          var clipboardData = $e.clipboardData;
          if (clipboardData) {
            var items = clipboardData.items;
            if (!items) return;
            var types = clipboardData.types || [];
            var item = null;
            for (var i = 0; i < types.length; i++) {
              if (types[i] === 'Files') {
                item = items[i];
                break;
              }
            }
            if (item && item.kind === 'file') {
              // prevent filename being pasted parallel along
              // with the image pasting process
              stopEvent($e)
              var oFile = item.getAsFile();
              this.$refs.toolbar_left.$imgFilesAdd([oFile]);
            }
          }
        },
        $imgTouch(file) {
          var $vm = this;
          // TODO 跳转到图片位置
        },
        $imgDel(file) {
          this.markdownIt.image_del(file[1]);
          // 删除所有markdown中的图片
          let fileReg = file[0]
          let reg = new RegExp(`\\!\\[${file[1]._name}\\]\\(${fileReg}\\)`, "g")

          this.d_value = this.d_value.replace(reg, '');
          this.iRender();
          this.$emit('imgDel', file);
        },
        $imgAdd(pos, $file, isinsert) {
          if (isinsert === undefined) isinsert = true;
          var $vm = this;
          if (this.__rFilter == null) {
            // this.__rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
            this.__rFilter = /^image\//i;
          }
          this.__oFReader = new FileReader();
          this.__oFReader.onload = function (oFREvent) {
            $vm.markdownIt.image_add(pos, oFREvent.target.result);
            $file.miniurl = oFREvent.target.result;
            if (isinsert === true) {
              // 去除特殊字符
              $file._name = $file.name.replace(/[\[\]\(\)\+\{\}&\|\\\*^%$#@\-]/g, '');
    
              $vm.insertText($vm.getTextareaDom(),
                {
                  prefix: '![' + $file._name + '](' + pos + ')',
                  subfix: '',
                  str: ''
                });
              $vm.$nextTick(function () {
                $vm.$emit('imgAdd', pos, $file);
              })
            }
          }
          if ($file) {
            var oFile = $file;
            if (this.__rFilter.test(oFile.type)) {
              this.__oFReader.readAsDataURL(oFile);
            }
          }
        },
        $imgUpdateByUrl(pos, url) {
          var $vm = this;
          this.markdownIt.image_add(pos, url);
          this.$nextTick(function () {
            $vm.d_render = this.markdownIt.render(this.d_value);
          })
        },
        $imgAddByUrl(pos, url) {
          if (this.$refs.toolbar_left.$imgAddByUrl(pos, url)) {
            this.$imgUpdateByUrl(pos, url);
            return true;
          }
          return false;
        },
        $img2Url(fileIndex, url) {
          // x.replace(/(\[[^\[]*?\](?=\())\(\s*(\.\/2)\s*\)/g, "$1(http://path/to/png.png)")
          var reg_str = "/(!\\[\[^\\[\]*?\\]\(?=\\(\)\)\\(\\s*\(" + fileIndex + "\)\\s*\\)/g"
          var reg = eval(reg_str);
          this.d_value = this.d_value.replace(reg, "$1(" + url + ")")
          this.$refs.toolbar_left.$changeUrl(fileIndex, url)
          this.iRender()
        },
        $imglst2Url(imglst) {
          if (imglst instanceof Array) {
            for (var i = 0; i < imglst.length; i++) {
              this.$img2Url(imglst[i][0], imglst[i][1]);
            }
          }
        },
        toolbar_left_click(_type) {
          toolbar_left_click(_type, this);
        },
        toolbar_left_addlink(_type, text, link) {
          toolbar_left_addlink(_type, text, link, this);
        },
        toolbar_right_click(_type) {
          toolbar_right_click(_type, this);
        },
        getNavigation($vm, full) {
          return getNavigation($vm, full);
        },
        // @event
        // 修改数据触发 （val ， val_render）
        change(val, render) {
          this.$emit('change', val, render)
        },
        // 切换全屏触发 （status , val）
        fullscreen(status, val) {
          this.$emit('fullScreen', status, val)
        },
        // 打开阅读模式触发（status , val）
        readmodel(status, val) {
          this.$emit('readModel', status, val)
        },
        // 切换阅读编辑触发 （status , val）
        previewtoggle(status, val) {
          this.$emit('previewToggle', status, val)
        },
        // 切换分栏触发 （status , val）
        subfieldtoggle(status, val) {
          this.$emit('subfieldToggle', status, val)
        },
        // 切换htmlcode触发 （status , val）
        htmlcode(status, val) {
          this.$emit('htmlCode', status, val)
        },
        // 打开 , 关闭 help触发 （status , val）
        helptoggle(status, val) {
          this.$emit('helpToggle', status, val)
        },
        // 监听ctrl + s
        save(val, render) {
          this.$emit('save', val, render)
        },
        // 导航栏切换
        navigationtoggle(status, val) {
          this.$emit('navigationToggle', status, val)
        },
        $toolbar_right_read_change_status() {
          this.s_readmodel = !this.s_readmodel
          if (this.readmodel) {
            this.readmodel(this.s_readmodel, this.d_value)
          }
          if (this.s_readmodel && this.toolbars.navigation) {
            this.getNavigation(this, true)
          }
        },
        // ---------------------------------------
        // 滚动条联动
        $v_edit_scroll($event) {
          scrollLink($event, this);
        },
        // 同步滚动
        asyncScroll(e, side = 'left') {
          // 设置右侧滚动
          const setPreview = (domClass, scrollTop) => {
            try {
              anime({
                targets: domClass,
                scrollTop: scrollTop,
                duration: 100,
                easing: 'linear'
              });
            } catch (e) {
              console.log(e)
              document.querySelector(domClass).scrollTop = scrollTop
            }
          }

          if (e.type && e.type === 'scroll') {
            // console.log(side, e)
          }
          // 公共变量
          const deviation = 10 // 偏差距离
          const showContent = document.querySelector('.v-show-content') // 预览高度

          if (side === 'left') {
            // console.log('scrollSwitchRight', this.scrollSwitchRight)
            if (this.scrollSwitchRight) return

            // 滚动信息
            const scrollInfo = this.codemirror.getScrollInfo()

            // 判断到达顶部
            if (scrollInfo.top <= deviation) {
              setPreview('.v-show-content', 0)
              return
            }

            // 判断到达底部
            if (scrollInfo.top >= (scrollInfo.height - scrollInfo.clientHeight - deviation)) {
              let scrollTop = showContent.scrollHeight
              setPreview('.v-show-content', scrollTop)
              return
            }

            // 总行数
            const lineCount = this.codemirror.lineCount()

            const lineHeight = 24 // 写死的行高
            const line = Math.floor(scrollInfo.top / lineHeight) + 1

            // todo 到底部判断

            // 找到行数并设置scrollTop
            let view = document.querySelectorAll('.v-show-content > [data-startline]')
            for (let i = 0; i < view.length; i++) {
              let dataLine = view[i].getAttribute('data-startline')
              if (line === Number(dataLine)) {
                setPreview('.v-show-content', view[i].offsetTop)
                // 找到减少开销
                break;
              }
            }
          } else if (side === 'right') {
            // console.log('scrollSwitchLeft', this.scrollSwitchLeft)
            if (this.scrollSwitchLeft) return

            const lineMarkers = document.querySelectorAll('.v-show-content > [data-startline]')
            const viewParentScroll = showContent.scrollTop

            // 判断到达顶部
            if (showContent.scrollTop <= deviation) {
              this.codemirror.scrollTo(null, 0)
              return
            }

            // 判断到达底部
            if (showContent.scrollTop >= (showContent.scrollHeight - showContent.clientHeight - deviation)) {
              const lineCount = this.codemirror.lineCount()
              this.codemirror.scrollTo(null, lineCount * 24)
              return
            }
    
            for (let i = 0; i < lineMarkers.length; i++) {
              let line = lineMarkers[i]
              let dataLine = line.getAttribute('data-startline')
              if (line.offsetTop >= viewParentScroll) {
                this.codemirror.scrollTo(null, (dataLine * 24 - 24))
                break;
              }
            }
          } else {
            //
          }
        },
        $v_edit_scroll__left: throttle(function($event) {
          this.scrollSwitchLeft = true
          this.asyncScroll($event, 'left')
          clearTimeout(this.scrollSwitchTimerLeft)
          this.scrollSwitchTimerLeft = setTimeout(() => {
            this.scrollSwitchLeft = false
          }, 300)
        }, 5),
        $v_edit_scroll__right: throttle(function($event) {
          this.scrollSwitchRight = true
          this.asyncScroll($event, 'right')
          clearTimeout(this.scrollSwitchTimerRight)
          this.scrollSwitchTimerRight = setTimeout(() => {
            this.scrollSwitchRight = false
          }, 300)
        }, 5),
        // 获取textarea dom节点
        getTextareaDom() {
          return this.$refs.vNoteTextarea.$refs.vTextarea;
        },
        // 工具栏插入内容
        insertText(obj, {prefix, subfix, str, type}) {
          // if (this.s_preview_switch) {
    
          insertTextAtCaret(obj, {prefix, subfix, str, type}, this);
        },
        insertTab() {
          insertTab(this, this.tabSize)
        },
        insertOl() {
          insertOl(this)
        },
        removeLine() {
          removeLine(this)
        },
        insertUl() {
          insertUl(this)
        },
        unInsertTab() {
          unInsertTab(this, this.tabSize)
        },
        insertEnter(event) {
          insertEnter(this, event)
        },
        saveHistory() {
          this.d_history.splice(this.d_history_index + 1, this.d_history.length)
          this.d_history.push(this.d_value)
          this.d_history_index = this.d_history.length - 1
        },
        initLanguage() {
          let lang = CONFIG.langList.indexOf(this.language) >= 0 ? this.language : 'zh-CN';
          var $vm = this;
          $vm.$render(CONFIG[`help_${lang}`], function(res) {
            $vm.d_help = res;
          })
          this.d_words = CONFIG[`words_${lang}`];
        },
        // 编辑开关
        editableTextarea() {
          let text_dom = this.$refs.vNoteTextarea.$refs.vTextarea;
          if (this.editable) {
            text_dom.removeAttribute('disabled');
          } else {
            text_dom.setAttribute('disabled', 'disabled');
          }
        },
        codeStyleChange(val, isInit) {
          isInit = isInit ? isInit : false;
          if (typeof this.p_external_link.hljs_css !== 'function') {
            if (this.p_external_link.hljs_css != false)
            { console.error('external_link.hljs_css is not a function, if you want to disabled this error log, set external_link.hljs_css to function or false'); }
            return;
          }
          var url = this.p_external_link.hljs_css(val);
          if (url.length === 0 && isInit) {
            console.warn('hljs color scheme', val, 'do not exist, loading default github');
            url = this.p_external_link.hljs_css('github')
          }
          if (url.length > 0) {
            loadLink(url)
          } else {
            console.warn('hljs color scheme', val, 'do not exist, hljs color scheme will not change');
          }
        },
        // iRender(toggleChange) {
        //     var $vm = this;
        //     this.$render($vm.d_value, function(res) {
        //         console.log(res)
        //         // render
        //         $vm.d_render = res;
        //         // change回调  toggleChange == false 时候触发change回调
        //         if (!toggleChange)
        //         {
        //             if ($vm.change) $vm.change($vm.d_value, $vm.d_render);
        //         }
        //         // 改变标题导航
        //         if ($vm.s_navigation) getNavigation($vm, false);
        //         // v-model 语法糖
        //         $vm.$emit('input', $vm.d_value)
        //         // 塞入编辑记录数组
        //         if ($vm.d_value === $vm.d_history[$vm.d_history_index]) return
        //         window.clearTimeout($vm.currentTimeout)
        //         $vm.currentTimeout = setTimeout(() => {
        //             $vm.saveHistory();
        //         }, 500);
        //     })
        // },
        optimizationTag(arr, tag) {
          const sleep = time => new Promise(resolve => setTimeout(resolve, time))
          const updateSrc = async (idx = 0) => {
            let allTag = this.$refs.vShowContent.querySelectorAll(tag)
            if (!allTag) return
            await sleep(300)
            let len = allTag.length
            if (idx >= len) return false
            else {
              // console.log(idx)
              let el = allTag[idx]
              el.setAttribute('src', arr[idx])
              // iframe onload after set next iframe src
              if (el.attachEvent) el.attachEvent('onload', () => updateSrc(++idx))
              else el.onload = () => updateSrc(++idx)
            }
          }
          updateSrc()
        },
        getTagSrcArrAndRemoveTagSrc(res, tag) {
          try {
            let divDom = document.createElement('div')
            divDom.innerHTML = res
            let allTag = divDom.querySelectorAll(tag)
            let srcArr = []
            let result = ''
            allTag.forEach((el, i) => {
              srcArr.push(el.getAttribute('src'))
              el.setAttribute('src', '')
            })
            return {result: divDom.innerHTML, srcArr}
          } catch (error) {
            return {result: '', srcArr: []}
          }
        },
        // 添加防抖 渲染内容
        iRender: debounce(function (toggleChange) {
          var $vm = this;
          this.$render($vm.d_value, function(res) {
            // render
            let { result, srcArr } = $vm.getTagSrcArrAndRemoveTagSrc(res, 'iframe')
            // console.log(result, srcArr)
            $vm.d_render = result;

            $vm.$nextTick(() => {
              clearTimeout($vm.timer)
              $vm.timer = setTimeout(() => {
                // console.log('数组没有数据可供修改')
                if (srcArr.length <= 0) return
                $vm.optimizationTag(srcArr, 'iframe')
              }, 1600)
            })
            // $vm.nowTime = Date.now()

            // console.log($vm.$refs.vShowContent)
            // change回调  toggleChange == false 时候触发change回调
            if (!toggleChange)
            {
              if ($vm.change) $vm.change($vm.d_value, $vm.d_render);
            }
            // 改变标题导航
            if ($vm.s_navigation) getNavigation($vm, false);
            // v-model 语法糖
            $vm.$emit('input', $vm.d_value)
            // 塞入编辑记录数组
            if ($vm.d_value === $vm.d_history[$vm.d_history_index]) return
            window.clearTimeout($vm.currentTimeout)
            $vm.currentTimeout = setTimeout(() => {
              $vm.saveHistory();
            }, 500);
          })
        }, 500),
        // 清空上一步 下一步缓存
        $emptyHistory() {
          this.d_history = [this.d_value] // 编辑记录
          this.d_history_index = 0 // 编辑记录索引
        }
    },
    computed: {
        codemirror() {
          return this.$refs.myCm.codemirror
        }
    },
    watch: {
        d_value: function (val, oldVal) {
          this.iRender();
        },
        value: function (val, oldVal) {
          if (val !== this.d_value) {
            this.d_value = val
          }
        },
        subfield: function (val, oldVal) {
          this.s_subfield = val
        },
        d_history_index() {
          if (this.d_history_index > 20) {
            this.d_history.shift()
            this.d_history_index = this.d_history_index - 1
          }
          this.d_value = this.d_history[this.d_history_index]
        },
        language: function (val) {
          this.initLanguage();
        },
        editable: function () {
          this.editableTextarea();
        },
        defaultOpen: function (val) {
          let default_open_ = val;
          if (!default_open_) {
            default_open_ = this.subfield ? 'preview' : 'edit';
          }
          return this.s_preview_switch = default_open_ === 'preview' ? true : false;
        },
        codeStyle: function (val) {
          this.codeStyleChange(val)
        }
    },
    components: {
        'v-autoTextarea': autoTextarea,
        'v-md-toolbar-left': md_toolbar_left,
        'v-md-toolbar-right': md_toolbar_right,
        codemirror
    }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import 'lib/css/scroll.styl';
@import 'lib/css/mavon-editor.styl';
</style>
<style lang="css" scoped>
.auto-textarea-wrapper {
  height: 100%;
}
.codemirror-editor {
    width: 100%;
    height: 100%;
}
.codemirror-editor /deep/ .CodeMirror {
    height: 100%;
}


</style>


<style lang="css">
/* 折叠 */
.CodeMirror-foldmarker {
    color: #d0d0d0;
    text-shadow: none;
    font-family: Arial;
    font-size: 1em;
    line-height: .3;
    cursor: pointer;
    margin: 2px;
    padding-bottom: 2px;
}
.CodeMirror-foldgutter {
    /*width: 1em;*/
    cursor: default;
    line-height: 100%;
}
.CodeMirror-foldgutter-open,
.CodeMirror-foldgutter-folded {
    line-height: 1em;
    cursor: pointer;
}
.CodeMirror-foldgutter-open {
    padding-top: 1px;
}
.CodeMirror-foldgutter-folded {
    padding-top: 2px;
}
.CodeMirror-foldgutter-open:after {
    content: "⌵";
    font-size: 1em;
/*    opacity: 0.5;*/
}
.CodeMirror-foldgutter-folded:after {
    content: "+";
    font-size: 1em;
    font-weight: 700;
}
.CodeMirror-foldmarker, .CodeMirror-foldgutter-folded:after {
    color: #78B2F2 !important;
}
</style>