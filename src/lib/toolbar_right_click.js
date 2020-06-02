/**
 * @Author: HuaChao Chen <CHC>
 * @Date:   2017-05-03T01:39:47+08:00
 * @Email:  chenhuachaoxyz@gmail.com
 * @Filename: toolbar_right_click.js
 * @Last modified by:   chc
 * @Last modified time: 2017-06-08T12:44:50+08:00
 * @License: MIT
 * @Copyright: 2017
 */

function $toolbar_right_html_click($vm) {
  $vm.s_html_code = !$vm.s_html_code
  if ($vm.htmlcode) {
    $vm.htmlcode($vm.s_html_code, $vm.d_value)
  }
}

function $toolbar_right_help_click($vm) {
  $vm.s_help = !$vm.s_help
  if ($vm.helptoggle) {
    $vm.helptoggle($vm.s_help, $vm.d_value)
  }
}
// 导航
function $toolbar_right_read_click($vm) {
  let element = $vm.$refs.vReadModel
  // 单栏编辑
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function $toolbar_right_preview_click($vm) {
  $vm.s_preview_switch = !$vm.s_preview_switch
  // $vm.$refs.vNoteDivEdit.innerHTML = $vm.s_markdown.render($vm.d_value)
  if ($vm.previewtoggle) {
    $vm.previewtoggle($vm.s_preview_switch, $vm.d_value)
  }
}

function $toolbar_right_fullscreen_click($vm) {
  $vm.s_fullScreen = !$vm.s_fullScreen
  if ($vm.fullscreen) {
    $vm.fullscreen($vm.s_fullScreen, $vm.d_value)
  }
}
function $toolbar_right_subfield_click ($vm) {
  $vm.s_subfield = !$vm.s_subfield
  $vm.s_preview_switch = $vm.s_subfield;

  // $vm.$refs.vNoteDivEdit.innerHTML = $vm.s_markdown.render($vm.d_value)
  if ($vm.previewtoggle) {
    console.log($vm.s_preview_switch)
    $vm.previewtoggle($vm.s_preview_switch, $vm.d_value)
  }
  // $vm.$refs.vNoteDivEdit.innerHTML = $vm.s_markdown.render($vm.d_value)
  if ($vm.subfieldtoggle) {
    console.log($vm.s_subfield)
    $vm.subfieldtoggle($vm.s_subfield, $vm.d_value)
  }
}
function $toolbar_right_navigation_click($vm) {
  $vm.s_navigation = !$vm.s_navigation
  if ($vm.s_navigation) {
    $vm.s_preview_switch = true;
  }
  if ($vm.navigationtoggle) {
    $vm.navigationtoggle($vm.s_navigation, $vm.d_value)
  }
  if ($vm.s_navigation) {
    // 绘制标题导航
    $vm.getNavigation($vm, false)
  }
}
// 编辑
function $toolbar_right_edit_click($vm) {
  // 阅读隐藏
  $vm.s_preview_switch = false
  // 编辑显示
  $vm.s_subfield = true

  // 切换编辑
  if ($vm.previewtoggle) {
    $vm.previewtoggle(true, $vm.d_value)
  }
}
// 对比
function $toolbar_right_compared_click($vm) {
  $vm.s_preview_switch = true
  $vm.s_subfield = true

  if ($vm.previewtoggle) {
    $vm.previewtoggle(true, $vm.d_value)
  }
  if ($vm.subfieldtoggle) {
    $vm.subfieldtoggle(true, $vm.d_value)
  }
}
// 阅读
function $toolbar_right_view_click($vm) {
  $vm.s_preview_switch = true
  $vm.s_subfield = false

  // 切换阅读
  if ($vm.subfieldtoggle) {
    $vm.subfieldtoggle(true, $vm.d_value)
  }
}
export const toolbar_right_click = (_type, $vm) => {
  var _other_right_click = {
    'help': $toolbar_right_help_click,
    'html': $toolbar_right_html_click,
    'read': $toolbar_right_read_click,
    'preview': $toolbar_right_preview_click,
    'fullscreen': $toolbar_right_fullscreen_click,
    'navigation': $toolbar_right_navigation_click,
    'subfield': $toolbar_right_subfield_click,
    // toggle
    'edit': $toolbar_right_edit_click,
    'compared': $toolbar_right_compared_click,
    'view': $toolbar_right_view_click
  }
  if (_other_right_click.hasOwnProperty(_type)) {
    _other_right_click[_type]($vm);
  }
}
