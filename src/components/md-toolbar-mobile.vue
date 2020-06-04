<template>
    <div class="tool">
        <div class="tool-3 tool-item">
            <div class="item-edit">
                <div class="item-btn" @click="$emit('tool-mobile-import')">
                  <svg width="13px" height="14px" viewBox="0 0 13 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <g transform="translate(-20.000000, -785.000000)" fill="#CDCDCD" fill-rule="nonzero">
                              <g transform="translate(20.000000, 785.000000)">
                                  <polygon points="10.1869688 13.9742716 12.1208029 11.5188029 10.1869688 11.5188029"></polygon>
                                  <path d="M10.9915312,0.0104831731 L1.14820192,0.0104831731 C0.521483173,0.0104831731 0.0130576923,0.517882212 0.0117283654,1.14460096 L0.0117283654,12.8401538 C0.0130408654,13.4668726 0.521483173,13.9742716 1.14820192,13.9742716 L9.09414423,13.9742716 L9.09414423,10.7703245 C9.09414497,10.6700801 9.13398051,10.5739446 9.20488221,10.5030793 C9.2757506,10.4321823 9.37188414,10.3923476 9.4721274,10.3923413 L12.1207861,10.3923413 L12.1207861,1.14460096 C12.1194736,0.520675481 11.6154736,0.0144543269 10.9915312,0.0104831731 Z M5.94545894,10.8089663 L2.96010457,7.18008706 L4.90397723,7.18008706 C4.90397723,7.18008706 5.30594896,3.87502225 7.57379091,3.02215671 C7.89777917,2.88005062 8.2865575,2.80896635 8.67535481,2.80896635 C7.96258822,3.16432526 7.50898186,4.0171908 7.31463066,4.51461415 C7.17117374,4.85654326 7.01615597,5.0479336 7.01615597,7.18008706 L8.96010457,7.18008706 L5.94545894,10.8089663 Z" id="形状"></path>
                              </g>
                          </g>
                      </g>
                  </svg>
                  <!-- <svg t="1591089217565" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3500" width="200" height="200"><path d="M480.1776 722.6464c8.6064 8.6048 19.2016 12.9056 31.7824 12.9056l0.0352 0.0352c12.5888 0 23.1856-4.3008 31.7888-12.9072l223.5568-223.5552c8.6064-9.0784 12.912-19.6736 12.912-31.7888 0-12.3408-4.3712-22.8816-13.1152-31.6208-8.7408-8.7392-19.2784-13.1088-31.6224-13.1088-12.1152 0-22.712 4.3024-31.7872 12.9104l-147.032 147.4016L556.696 64.92c0-12.336-4.3712-22.8752-13.1152-31.6208-8.7408-8.7376-19.2784-13.1072-31.6208-13.1072-12.336 0-22.8736 4.3696-31.6192 13.1072-8.7408 8.7456-13.1088 19.2848-13.1088 31.6208l0 517.9984-147.0384-147.4016c-8.6064-8.608-19.2016-12.9104-31.7888-12.9104-12.8064 0-23.4576 4.2464-31.9536 12.7408-8.4928 8.4928-12.7392 19.1456-12.7392 31.9568 0 12.5824 4.3024 23.1776 12.9088 31.7856L480.1776 722.6464z" p-id="3501"></path><path d="M959.0816 646.1264c0.016 0 0.032 0.0016 0.0464 0.0016s0.032-0.0016 0.0496-0.0016L959.0816 646.1264z" p-id="3502"></path><path d="M990.7008 659.2384c-8.7248-8.7328-19.2528-13.1008-31.5712-13.1104-12.3152 0.0112-22.8368 4.3776-31.5712 13.1104-8.7408 8.7408-13.1056 19.2816-13.1056 31.6224l0 178.8224c0 12.3408-4.2496 22.8816-12.7408 31.6208-8.5008 8.7408-18.8032 13.1088-30.9184 13.1088L154.3888 914.4128c-12.3408 0-22.8816-4.368-31.6256-13.1088-8.7408-8.7392-13.1088-19.28-13.1088-31.6208L109.6544 690.8608c0-12.3408-4.368-22.8816-13.1088-31.6224-8.744-8.744-19.2832-13.112-31.6192-13.112-12.3424 0-22.8816 4.368-31.6256 13.112-8.7408 8.7408-13.1088 19.2816-13.1088 31.6224l0 178.8224c0 36.5472 13.04 68.2144 39.1312 94.9936 26.7776 26.0896 58.4464 39.1312 94.9936 39.1312l716.4048 0c36.5744 0 68.016-13.1552 94.3248-39.464 25.8432-25.8448 38.7632-57.3968 38.7632-94.6608L1003.8096 690.8608C1003.8096 678.52 999.44 667.9792 990.7008 659.2384z" p-id="3503"></path></svg> -->
                </div>
            </div>
            <div class="item-edit">
                <div class="item-btn image-upload" v-if="toolbars.imagelink" @click.stop="defaultImageUpload">
                    <svg t="1591075950671" class="icon img-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1152" width="32" height="32"><path d="M736 448c53 0 96-43 96-96 0-53-43-96-96-96-53 0-96 43-96 96C640 405 683 448 736 448z" p-id="1153"></path><path d="M904 128 120 128c-31.2 0-56 25.4-56 56.6l0 654.8c0 31.2 24.8 56.6 56 56.6l784 0c31.2 0 56-25.4 56-56.6L960 184.6C960 153.4 935.2 128 904 128zM697.8 523.4c-6-7-15.2-12.4-25.6-12.4-10.2 0-17.4 4.8-25.6 11.4l-37.4 31.6c-7.8 5.6-14 9.4-23 9.4-8.6 0-16.4-3.2-22-8.2-2-1.8-5.6-5.2-8.6-8.2L448 430.6c-8-9.2-20-15-33.4-15-13.4 0-25.8 6.6-33.6 15.6L128 736.4 128 215.4c2-13.6 12.6-23.4 26.2-23.4l715.4 0c13.8 0 25 10.2 25.8 24l0.6 520.8L697.8 523.4z" p-id="1154"></path></svg>
                    <input v-if="imageUploadAction !== 'default'" id="_toolbar-file__mobile" class="image-file" type="file" accept="image/*" @change="$upload($event)" multiple="multiple"/>
                </div>
            </div>
            <div class="item-edit">
                <div class="item-btn" v-if="toolbars.encryption" @click.stop="$clickEncryption('encryption')">
                    <svg t="1587969444818" class="icon lock-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1130" width="200" height="200"><path d="M256 448V320a256 256 0 0 1 512 0v128h64a64 64 0 0 1 64 64v448a64 64 0 0 1-64 64H192a64 64 0 0 1-64-64V512a64 64 0 0 1 64-64h64z m224.448 346.688a29.248 29.248 0 0 0-0.448 5.312v64a32 32 0 0 0 64 0v-64a29.248 29.248 0 0 0-0.448-5.312 96 96 0 1 0-63.104 0zM512 192a128 128 0 0 0-128 128v128h256V320a128 128 0 0 0-128-128z" p-id="1131"></path></svg>
                </div>
            </div>
        </div>
        <div class="tool-4">
            <slot />
        </div>
        <div class="tool-3 tool-item">
            <div class="item">
            </div>
            <div class="item">
                <div class="item-btn"  @click.stop="$clickToggle('view')">
                    <svg t="1591078212470" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2741" width="200" height="200"><path d="M512 870.4C229.2224 870.4 0 595.4048 0 512 0 428.5952 229.2224 153.6 512 153.6s512 283.4688 512 358.4c0 74.9312-229.2224 358.4-512 358.4z m0.384-76.8c240.5632 0 426.496-245.3248 425.9072-281.6-0.5888-36.2752-182.9376-281.6-423.5008-281.6-240.5632 0-423.5264 215.6288-424.1152 281.6-0.5888 65.9712 181.1456 281.6 421.7088 281.6zM512 665.6a153.6 153.6 0 1 1 0-307.2 153.6 153.6 0 0 1 0 307.2z m0-76.8a76.8 76.8 0 1 0 0-153.6 76.8 76.8 0 0 0 0 153.6z" p-id="2742"></path></svg>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
import { uploadImage } from '../lib/image_upload'
export default {
  props: {
    editable: { // 是否开启编辑
      type: Boolean,
      default: true
    },
    transition: { // TODO: 是否开启动画过渡
      type: Boolean,
      default: true
    },
    toolbars: { // 工具栏
      type: Object,
      required: true
    },
    image_filter: {
      type: Function,
      default: null
    },
    // 上传图片动作
    // default 默认行为是写入markdown标签
    // customize 根据自定义的路径上传图片
    imageUploadAction: {
      type: String,
      default: 'default'
      // default: 'customize'
    },
    // 图片上传方法
    imageUploadFn: {
      type: Function,
      default: () => {}
    },
    // 加密语法内容
    encryption: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // [index, file]
      img_file: [[0, null]],
      img_timer: null,
      header_timer: null,
      s_img_dropdown_open: false,
      s_header_dropdown_open: false,
      s_img_link_open: false,
      trigger: null,
      num: 0,
      link_text: '',
      link_addr: '',
      link_type: 'link',
      read_tags_display_mode: 0,
      read_mode_labels: [
        '同时查看锁状态',
        '只看解锁状态',
        '只看未解锁状态'
      ],
      windowToggle: 'compared'
    }
  },
  watch: {
    read_tags_display_mode(newVal) {
      this.$emit('read_tags_display_mode', newVal);
    }
  },
  created() {
    // 删除莫名其妙出现的undefined hack...
    this.$nextTick(() => {
      try {
        const itemNodes = document.querySelector('.v-left-item').childNodes
        if (itemNodes[itemNodes.length - 1].textContent === 'undefined') {
          itemNodes[itemNodes.length - 1].remove()
        }
      } catch (e) {
        console.log(e)
      }
    })
  },
  methods: {
    $imgLinkAdd() {
      this.$emit('toolbar_left_addlink', this.link_type, this.link_text, this.link_addr);
      this.s_img_link_open = false;
    },
    $toggle_imgLinkAdd(type) {
      this.link_type = type;
      this.link_text = this.link_addr = '';
      this.s_img_link_open = true;
      this.$nextTick(() => {
        this.$refs.linkTextInput.focus()
      })
      this.s_img_dropdown_open = false;
    },
    $imgFileListClick(pos) {
      this.$emit('imgTouch', this.img_file[pos]);
    },
    $changeUrl(index,url) {
      this.img_file[index][0] = url;
    },
    $imgFileAdd($file) {
      // this.img_file[0][0] = this.num;
      // this.img_file[0][1] = $file;
      // this.img_file.unshift([(this.num + 1), null]);
      // this.num = this.num + 1;
      this.img_file.push([++this.num, $file])
      this.$emit('imgAdd', this.num, $file);
      this.s_img_dropdown_open = false;
    },
    $imgFilesAdd($files) {
      // valid means if the image_filter exist.
      let valid = (typeof this.image_filter === 'function');
      for (let i = 0; i < $files.length; i++) {
        if (valid && this.image_filter($files[i]) === true) {
          this.$imgFileAdd($files[i]);
        } else if (!valid && $files[i].type.match(/^image\//i)) {
          this.$imgFileAdd($files[i]);
        }
      }
    },
    $imgAdd($e) {
      this.$imgFilesAdd($e.target.files);
      $e.target.value = ''; // 初始化
    },

    async $upload($e) {
      // 如果是默认行为 阻止
      if (this.imageUploadAction === 'default') return

      let files = [...$e.target.files]

      // console.log('files', files)

      // 移动端修改这个会 bug  safari刷新 chrome崩溃
      // hack file 无法选择同一文件bug
      // document.querySelector('#_toolbar-file__mobile').setAttribute("type", "text");

      this.$emit('imageMultipleUpload', files)

      // hack file 无法选择同一文件bug
      // document.querySelector('#_toolbar-file__mobile').setAttribute("type", "file");
    },
    // 图片图片上传
    defaultImageUpload() {
      if (this.imageUploadAction === 'default') {
        this.$emit('toolbar_click', 'imagelink', {
          action: this.imageUploadAction
        })
      }
    },
    $imgDel(pos) {
      this.$emit('imgDel', this.img_file[pos]);
      this.img_file.splice(pos, 1);
      this.num--;

      this.s_img_dropdown_open = false;
    },
    isEqualName(filename, pos) {
      if (this.img_file[pos][1]) {
        if (this.img_file[pos][1].name == filename || this.img_file[pos][1]._name == filename) {
          return true
        }
      }
      return false
    },
    $imgDelByFilename(filename) {
      var pos = 0;
      while (this.img_file.length > pos) {
        if (this.img_file[pos][1] == filename || this.isEqualName(filename, pos)) {
          this.$imgDel(pos);
          return true;
        }
        pos += 1;
      }
      return false;
    },
    $imgAddByFilename(filename, $file) {
      for (var i = 0; i < this.img_file.length; i++)
      { if (this.img_file[i][0] == filename) return false; }
      this.img_file[0][0] = filename;
      this.img_file[0][1] = $file;
      this.img_file[0][2] = filename;
      this.img_file.unshift(['./' + (this.num), null])
      this.$emit('imgAdd', this.img_file[1][0], $file, false);
      return true;
    },
    $imgAddByUrl(filename, $url) {
      for (var i = 0; i < this.img_file.length; i++)
      { if (this.img_file[i][0] == filename) return false; }
      this.img_file[0][0] = filename;
      this.img_file[0][1] = $url;
      this.img_file.unshift(['./' + (this.num), null])
      return true;
    },
    $imgUpdateByFilename(filename, $file) {
      for (var i = 0; i < this.img_file.length; i++) {
        if (this.img_file[i][0] == filename || this.isEqualName(filename, i)) {
          this.img_file[i][1] = $file;
          this.$emit('imgAdd', filename, $file, false);
          return true;
        }
      }
      return false;
    },
    // 工具栏功能图标click-----------------
    $mouseenter_img_dropdown() {
      if (this.editable) {
        clearTimeout(this.img_timer)
        this.s_img_dropdown_open = true
      }
    },
    $mouseleave_img_dropdown() {
      let vm = this
      this.img_timer = setTimeout(function() {
        vm.s_img_dropdown_open = false
      },200)
    },
    $mouseenter_header_dropdown() {
      if (this.editable) {
        clearTimeout(this.header_timer)
        this.s_header_dropdown_open = true
      }
    },
    $mouseleave_header_dropdown() {
      let vm = this
      this.header_timer = setTimeout(function() {
        vm.s_header_dropdown_open = false
      },200)
    },
    $clicks(_type) {
      // 让父节点来绑定事件并
      if (this.editable) {
        this.$emit('toolbar_click', _type);
      }
    },
    $clickToggle(_type) {
      // 让父节点来绑定事件并
      if (this.editable) {
        this.windowToggle = _type;
        this.$emit('toolbar_toggle_click', _type);
      }
    },
    $clickEncryption(_type) {
      // 让父节点来绑定事件并
      if (this.editable) {
        this.$emit('toolbar_click', _type, {
          string: this.encryption
        });
      }
    },
    $click_header(_type) {
      // 让父节点来绑定事件并
      this.$emit('toolbar_click', _type);
      this.s_header_dropdown_open = false
    },
    handleClose(e) {
      this.s_img_dropdown_open = false;
    }
  }
}
</script>
<style lang="stylus" scoped>
.tool
    display: flex;
    align-items: center;
    justify-content: space-between;
.tool::after
    content ''
    display block
    width 0
    height 0
    clear both
.tool-3
    width 30%
    float left
    box-sizing border-box
.tool-4
    width 40%
    float left
    box-sizing border-box
.tool-item
    .item-edit
        width 33.33%
        height 39px
        float left
        display flex
        align-items center
        justify-content center;
        box-sizing border-box
    .item
        width 50%
        height 39px
        float left
        display flex
        align-items center
        justify-content center;
        box-sizing border-box
    .item-btn
        display flex
        align-items center
        justify-content center;
        box-sizing border-box 
        cursor: pointer;
        .icon
            fill: #CDCDCD;
            width: 1em;
            height: 1em;
            font-size: 16px;
        .icon.toggle-lock
            font-size: 36px
.tool-item::after
    content ''
    display block
    width 0
    height 0
    clear both
.image-upload
    overflow hidden
    position relative
    cursor pointer
.image-file
    position absolute
    top 0
    left 0
    bottom 0
    opacity 0
    cursor pointer
</style>
