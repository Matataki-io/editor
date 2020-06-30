<template>
        <div class="head-toolbar-right">
                <slot name="right-toolbar-before" />
                <div class="toggle">
                        <div @click="$clicks('edit')" :class="toggleRadio === 'edit' && 'active'" class="toggle-item">
                                <svg t="1587538645109" class="edit-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3796" width="200" height="200"><path d="M64.5 927.7c-3.7 18.7 13.1 35.5 31.8 31.8l203.8-48.6c7.5-1.9 13.1-5.6 16.8-9.3l3.7-3.7c3.7-3.7 5.6-16.8-1.9-24.3L150.5 705.2c-7.5-7.5-20.6-5.6-24.3-1.9l-3.7 3.7c-5.6 5.6-7.5 11.2-9.3 16.8L64.5 927.7z m635.7-794.6c-7.5 7.5-7.5 18.7 0 26.2l164.5 164.5c7.5 7.5 18.7 7.5 26.2 0l46.7-46.7c29.9-28 29.9-72.9 0-102.8l-87.9-87.9c-29.9-29.9-76.7-29.9-106.6 0l-42.9 46.7zM202.8 651l166.4 166.4c7.5 7.5 18.7 7.5 26.2 0l415.1-416.9c7.5-7.5 7.5-18.7 0-26.2L645.9 209.8c-7.5-7.5-18.7-7.5-26.2 0L202.8 626.7c-7.4 7.5-7.4 18.7 0 24.3z" p-id="3797"></path></svg>
                        </div>
                        <div @click="$clicks('compared')" :class="toggleRadio === 'compared'  && 'active'" class="toggle-item op-icon fa fa-mavon-columns"></div>
                        <div @click="$clicks('view')" :class="toggleRadio === 'view'  && 'active'" class="toggle-item op-icon fa fa-mavon-eye"></div>
                </div>
                <!-- <div class="help op-icon fa fa-mavon-question-circle" @click="$clicks('help')"></div> -->
                <slot name="right-toolbar-after" />

        <!-- <button type="button" v-if="toolbars.navigation" @click="$clicks('navigation')" v-show="!s_navigation"
                class="op-icon fa fa-mavon-bars"
                aria-hidden="true" :title="`${d_words.tl_navigation_on} (F8)`"></button> -->
        <!-- <button type="button" v-if="toolbars.navigation" @click="$clicks('navigation')" v-show="s_navigation"
                class="op-icon fa fa-mavon-bars selected"
                aria-hidden="true" :title="`${d_words.tl_navigation_off} (F8)`"></button> -->
        <!-- <button type="button" v-if="toolbars.preview" @click="$clicks('preview')" v-show="s_preview_switch"
                class="op-icon fa fa-mavon-eye-slash selected"
                aria-hidden="true" :title="`${d_words.tl_edit} (F9)`"></button>
        <button type="button" v-if="toolbars.preview" @click="$clicks('preview')" v-show="!s_preview_switch"
                class="op-icon fa fa-mavon-eye"
                aria-hidden="true" :title="`${d_words.tl_preview} (F9)`"></button>
        <button type="button" v-if="toolbars.fullscreen" @click="$clicks('fullscreen')" v-show="!s_fullScreen"
                class="op-icon fa fa-mavon-arrows-alt"
                :title="`${d_words.tl_fullscreen_on} (F10)`" aria-hidden="true"></button>
        <button type="button" v-if="toolbars.fullscreen" @click="$clicks('fullscreen')" v-show="s_fullScreen"
                class="op-icon fa fa-mavon-compress selected"
                :title="`${d_words.tl_fullscreen_off} (F10)`" aria-hidden="true"></button>
        <button type="button" v-if="toolbars.readmodel" @click="$clicks('read')" class="op-icon fa fa-mavon-window-maximize" aria-hidden="true"
                :title="`${d_words.tl_read} (F11)`"></button>
        <button type="button" v-if="toolbars.subfield" @click="$clicks('subfield')" class="op-icon fa fa-mavon-columns" aria-hidden="true"
                :class = "{'selected': s_subfield}" :title="`${s_subfield ? d_words.tl_single_column : d_words.tl_double_column} (F12)`"></button>
        <span
                v-if=" toolbars.help && toolbars.htmlcode && toolbars.readmodel && toolbars.fullscreen && toolbars.subfield && toolbars.navigation"
                class="op-icon-divider"></span>
        <button type="button" v-if="toolbars.htmlcode" @click="$clicks('html')" v-show="!s_html_code" class="op-icon fa fa-mavon-code"
                :title="d_words.tl_html_on"
                aria-hidden="true"></button>
        <button type="button" v-if="toolbars.htmlcode" @click="$clicks('html')" v-show="s_html_code"
                class="op-icon fa fa-mavon-code selected"
                :title="d_words.tl_html_off" aria-hidden="true"></button>
        <button type="button"  v-if="toolbars.help" @click="$clicks('help')" class="op-icon fa fa-mavon-question-circle"
                 style="font-size: 17px;padding: 5px 6px 5px 3px"
                 :title="d_words.tl_help" aria-hidden="true"></button> -->
      </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 's-md-toolbar-right',
  props: {
    // 工具栏
    s_subfield: {
      type: Boolean ,
      required: true
    },
    toolbars: { type: Object, required: true },
    s_preview_switch: { type: Boolean, required: true },
    s_fullScreen: { type: Boolean, required: true },
    s_html_code: { type: Boolean, required: true },
    s_navigation: { type: Boolean, required: true },
    d_words: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      toggleRadio: 'compared'
    }
  },
  methods: {
    // 工具栏功能图标click-----------------
    $clicks(_type) {
      // 相同事件禁止切换
      if (_type === this.toggleRadio) return
      // toggle click
      const toggleList = ['edit', 'compared', 'view']
      if (toggleList.includes(_type)) {
        this.toggleRadio = _type
      }
      // 让父节点来绑定事件并
      this.$emit('toolbar_right_click', _type);
    }
  }
}
</script>

<style lang="stylus" scoped>
.head-toolbar-right
        display: flex
        align-items: center
        .toggle
                display flex
                border: 1px solid #e7e7e7
                border-radius: 8px
                margin 2px 0
                &-item
                        padding: 10px
                        cursor: pointer
                        display: flex
                        align-items: center
                        justify-content: center
                        &.active
                                color: #333
                                background-color: #e6e6e6
                                border-color: #adadad
                .edit-icon
                        font-family: fontello;
                        font-style: normal;
                        font-weight: 400;
                        speak: none;
                        display: inline-block;
                        text-decoration: inherit;
                        width: 1em;
                        height 1em;
                        margin-right: .2em;
                        text-align: center;
                        font-variant: normal;
                        text-transform: none;
                        line-height: 1em;
                        margin-left: .2em;

        .help
                cursor pointer
                margin-left: 10px

</style>