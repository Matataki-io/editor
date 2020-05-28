<template>
<div class="v-left-item">
    <div class="toolbar-left">
        <div class="toolbar-btn">
            <slot name="left-toolbar-before" />
            <button :disabled="!editable" type="button" v-if="toolbars.bold" @click="$clicks('bold')"
                    class="op-icon fa fa-mavon-bold" aria-hidden="true"
                    :title="`${d_words.tl_bold} (Ctrl+B)`"></button>
            <button :disabled="!editable" type="button" v-if="toolbars.italic" @click="$clicks('italic')"
                    class="op-icon fa fa-mavon-italic" aria-hidden="true"
                    :title="`${d_words.tl_italic} (Ctrl+I)`"></button>
            <button :disabled="!editable" type="button" v-if="toolbars.strikethrough" @click="$clicks('strikethrough')"
                    class="op-icon fa fa-mavon-strikethrough"
                    :title="`${d_words.tl_strikethrough} (Ctrl+Shift+D)`" aria-hidden="true"></button>
            <button :disabled="!editable" type="button" v-if="toolbars.header" @click="$clicks('header')"
                    class="op-icon fa fa-mavon-header" aria-hidden="true"
                    :title="`${d_words.tl_header} (Ctrl+H)`"></button>
            <span v-if="toolbars.header || toolbars.italic || toolbars.bold || toolbar.strikethrough" class="toolbar-line"></span>
            <button :disabled="!editable" type="button" v-if="toolbars.code" @click="$clicks('code')"
                    class="op-icon fa fa-mavon-code" aria-hidden="true"
                    :title="`${d_words.tl_code} (Ctrl+Alt+C)`"></button>
            <button :disabled="!editable" type="button" v-if="toolbars.quote" @click="$clicks('quote')"
                    class="op-icon fa fa-mavon-quote-left" aria-hidden="true"
                    :title="`${d_words.tl_quote} (Ctrl+Q)`"></button>
            <button :disabled="!editable" type="button" v-if="toolbars.ol" @click="$clicks('ol')"
                    class="op-icon fa fa-mavon-list-ol" aria-hidden="true"
                    :title="`${d_words.tl_ol} (Ctrl+O)`"></button>
            <button :disabled="!editable" type="button" v-if="toolbars.ul" @click="$clicks('ul')"
                    class="op-icon fa fa-mavon-list-ul" aria-hidden="true"
                    :title="`${d_words.tl_ul} (Ctrl+Alt+U)`"></button>
            <button :disabled="!editable" type="button" v-if="toolbars.task" @click="$clicks('task')"
                    class="op-icon icon-btn" aria-hidden="true">
                    <svg t="1587552064824" class="task-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7961" width="200" height="200"><path d="M896 64H128a64 64 0 0 0-64 64v768a64 64 0 0 0 64 64h768a64 64 0 0 0 64-64V128a64 64 0 0 0-64-64z m-162.368 292.16l-223.36 358.784a44.864 44.864 0 0 1-35.904 20.928c-0.576 0.128-1.344 0.128-1.984 0.128a44.992 44.992 0 0 1-35.648-17.664L292.608 537.472a44.608 44.608 0 0 1 71.104-53.888l105.088 129.152 189.248-303.744a44.544 44.544 0 1 1 75.584 47.168z" p-id="7962" fill="#ccc"></path></svg>
                    </button>
            <span v-if="toolbars.code || toolbars.quote || toolbars.ol || toolbar.ul || toolbar.task" class="toolbar-line"></span>
            <button :disabled="!editable" type="button" v-if="toolbars.link" @click.stop="$clicks('link')"
                    class="op-icon fa fa-mavon-link" aria-hidden="true"
                    :title="`${d_words.tl_link} (Ctrl+L)`"></button>
                    <!-- @click.stop="$clicks('imagelink')" -->
            <button :disabled="!editable" type="button" v-if="toolbars.imagelink" @click.stop="defaultImageUpload"
                    class="image op-icon fa fa-mavon-picture-o" aria-hidden="true"
                    title="插入图片">
                <input v-if="imageUploadAction !== 'default'" id="_toolbar-file" class="image-file" type="file" accept="image/*" @change="$upload($event)" multiple="multiple"/>
            </button>
            <button :disabled="!editable" type="button" v-if="toolbars.table" @click="$clicks('table')"
                    class="op-icon fa fa-mavon-table" aria-hidden="true"
                    :title="`${d_words.tl_table} (Ctrl+Alt+T)`"></button>
            <button :disabled="!editable" type="button" v-if="toolbars.line" @click.stop="$clicks('line')"
                    title="插入分割线"
                    class="op-icon icon-btn" aria-hidden="true">
                    <svg t="1587552973767" class="line-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10053" width="200" height="200"><path d="M904 476H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z" p-id="10054" fill="#ccc"></path></svg>
            </button>
            <button :disabled="!editable" type="button" v-if="toolbars.encryption" @click.stop="$clickEncryption('encryption')"
                    title="插入加密内容"
                    class="op-icon icon-btn" aria-hidden="true">
                    <svg t="1587969444818" class="lock-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1130" width="200" height="200"><path d="M256 448V320a256 256 0 0 1 512 0v128h64a64 64 0 0 1 64 64v448a64 64 0 0 1-64 64H192a64 64 0 0 1-64-64V512a64 64 0 0 1 64-64h64z m224.448 346.688a29.248 29.248 0 0 0-0.448 5.312v64a32 32 0 0 0 64 0v-64a29.248 29.248 0 0 0-0.448-5.312 96 96 0 1 0-63.104 0zM512 192a128 128 0 0 0-128 128v128h256V320a128 128 0 0 0-128-128z" fill="#ccc" p-id="1131"></path></svg>
            </button>
            <slot name="left-toolbar-after"></slot>
        </div>
    </div>
    <div class="toolbar-right">
        <!-- 切换编辑语法的展示样式 -->
        <button :disabled="!editable" type="button" @click.stop="read_tags_display_mode = (read_tags_display_mode + 1) % 3"
            :title="read_mode_labels[read_tags_display_mode]"
            style="width: 56px" class="op-icon icon-btn" aria-hidden="true"
        >
            <svg v-show="read_tags_display_mode === 0" width="32" height="16" viewBox="0 0 64 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M57.6486032,4 C58.431251,4 59.1853755,4.14703731 59.9109485,4.44097107 C60.6366341,4.734933 61.2806878,5.13910952 61.8432502,5.65350061 C62.4058126,6.16800442 62.8582198,6.76815553 63.2006968,7.45403853 C63.5431457,8.14003422 63.7142857,8.87488267 63.7142857,9.65875295 L63.7142857,13.284396 L60.7547781,13.284396 L60.7547781,10.3447486 C60.7547781,9.31585371 60.4653815,8.5156428 59.886504,7.94394689 C59.3076546,7.37239183 58.5290855,7.08657203 57.5507687,7.08657203 C56.6701738,7.08657203 55.9609159,7.37239183 55.422798,7.94394689 C54.884652,8.51564283 54.6157056,9.31585371 54.6157056,10.3447486 L54.6157056,13.3333333 L51.5338346,13.3333333 L51.5338346,9.65875295 C51.5338346,8.87488267 51.6887439,8.14003419 51.9985625,7.45403853 C52.3083811,6.76815556 52.7364563,6.16800442 53.2827036,5.65350061 C53.8289509,5.13910949 54.4730045,4.734933 55.2148927,4.44097107 C55.956809,4.14703731 56.7680083,4 57.6486032,4 L57.6486032,4 Z M56.9473684,21.0825476 L56.9473684,23.3531617 L56.9473684,24.5940939 C56.9473684,25.0692476 56.8674391,25.5181659 56.7074062,25.9406057 C56.5474023,26.3630456 56.3284466,26.7238442 56.0505391,27.0230319 C55.7726315,27.3223715 55.4442561,27.5599483 55.0652674,27.7359143 C54.6863079,27.9120322 54.2694901,28 53.814727,28 L41.0315894,28 C40.5768263,28 40.1642215,27.9164655 39.7936587,27.7492143 C39.4231831,27.5819935 39.1031463,27.3531618 38.8336355,27.0627192 C38.5642119,26.7722766 38.3578369,26.4334017 38.2147137,26.0462158 C38.0715906,25.6589084 38,25.2453352 38,24.8052836 L38,16.409231 C38,15.9164655 38.1642458,15.5027405 38.4926213,15.1683292 C38.8210258,14.8338875 39.2041983,14.6666667 39.6421388,14.6666667 L55.2800102,14.6666667 C55.751625,14.6666667 56.1473491,14.8338875 56.4673568,15.1683292 C56.7873645,15.5027405 56.9473684,15.9164655 56.9473684,16.409231 L56.9473684,21.0825476 L56.9473684,21.0825476 Z" fill="#FFFFFF" fill-rule="nonzero" />
                <path d="M9.38132036,4 C10.168896,4 10.9277687,4.14542151 11.6579101,4.43612523 C12.3881648,4.72685681 13.0362737,5.12659183 13.6023781,5.63533028 C14.1684826,6.1441802 14.6237383,6.73773624 14.9683716,7.41608207 C15.3129767,8.09453934 15.4851943,8.82131253 15.4851943,9.59656885 L15.4851943,13.1823697 L12.5070527,13.1823697 L12.5070527,10.2750261 C12.5070527,9.25743774 12.215834,8.46602035 11.6333117,7.90060681 C11.0508176,7.33533257 10.2673465,7.05265366 9.28286987,7.05265366 C8.39673053,7.05265366 7.68300691,7.33533257 7.14150091,7.90060681 C6.59996658,8.46602038 6.32932682,9.25743774 6.32932682,10.2750261 L6.32932682,13.2307692 L3.22805139,13.2307692 L3.22805139,9.59656885 C3.22805139,8.82131253 3.38393607,8.09453931 3.69570539,7.41608207 C4.00747472,6.73773627 4.43824517,6.1441802 4.98793179,5.63533028 C5.53761841,5.12659181 6.18572723,4.72685681 6.93228654,4.43612523 C7.67887415,4.14542151 8.49518103,4 9.38132036,4 L9.38132036,4 Z M18.8571429,21.2953923 L18.8571429,23.4961414 L18.8571429,24.698891 C18.8571429,25.1594246 18.7775942,25.59453 18.6183233,26.0039717 C18.4590813,26.4134134 18.2411683,26.7631105 17.9645841,27.0530925 C17.6879999,27.3432216 17.3611882,27.5734884 16.9840043,27.7440401 C16.6068492,27.9147389 16.1920164,28 15.7394188,28 L3.01715327,28 C2.56455569,28 2.15391566,27.9190358 1.78511746,27.7569308 C1.41640601,27.5948552 1.09789323,27.3730645 0.829665838,27.0915586 C0.561525202,26.8100527 0.356132874,26.4816047 0.213691293,26.1063322 C0.0712497124,25.730942 1.29674049e-13,25.3300941 1.29674049e-13,24.9035825 L1.29674049e-13,16.7658701 C1.29674049e-13,16.2882666 0.163463717,15.8872715 0.49027549,15.5631498 C0.817116171,15.2389987 1.19846404,15.0769231 1.63431907,15.0769231 L17.1977245,15.0769231 C17.6670935,15.0769231 18.0609332,15.2389987 18.379417,15.5631498 C18.6979009,15.8872715 18.8571429,16.2882666 18.8571429,16.7658701 L18.8571429,21.2953923 L18.8571429,21.2953923 Z" fill="#FFFFFF" fill-rule="nonzero" />
                <rect fill="#B2B2B2" transform="translate(29.000000, 16.500000) rotate(30.000000) translate(-29.000000, -16.500000) " x="28" y="5" width="2" height="23" rx="1" />
            </svg>
            <svg v-show="read_tags_display_mode === 1" width="32" height="16" viewBox="0 0 64 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M57.6486032,4 C58.431251,4 59.1853755,4.14703731 59.9109485,4.44097107 C60.6366341,4.734933 61.2806878,5.13910952 61.8432502,5.65350061 C62.4058126,6.16800442 62.8582198,6.76815553 63.2006968,7.45403853 C63.5431457,8.14003422 63.7142857,8.87488267 63.7142857,9.65875295 L63.7142857,13.284396 L60.7547781,13.284396 L60.7547781,10.3447486 C60.7547781,9.31585371 60.4653815,8.5156428 59.886504,7.94394689 C59.3076546,7.37239183 58.5290855,7.08657203 57.5507687,7.08657203 C56.6701738,7.08657203 55.9609159,7.37239183 55.422798,7.94394689 C54.884652,8.51564283 54.6157056,9.31585371 54.6157056,10.3447486 L54.6157056,13.3333333 L51.5338346,13.3333333 L51.5338346,9.65875295 C51.5338346,8.87488267 51.6887439,8.14003419 51.9985625,7.45403853 C52.3083811,6.76815556 52.7364563,6.16800442 53.2827036,5.65350061 C53.8289509,5.13910949 54.4730045,4.734933 55.2148927,4.44097107 C55.956809,4.14703731 56.7680083,4 57.6486032,4 L57.6486032,4 Z M56.9473684,21.0825476 L56.9473684,23.3531617 L56.9473684,24.5940939 C56.9473684,25.0692476 56.8674391,25.5181659 56.7074062,25.9406057 C56.5474023,26.3630456 56.3284466,26.7238442 56.0505391,27.0230319 C55.7726315,27.3223715 55.4442561,27.5599483 55.0652674,27.7359143 C54.6863079,27.9120322 54.2694901,28 53.814727,28 L41.0315894,28 C40.5768263,28 40.1642215,27.9164655 39.7936587,27.7492143 C39.4231831,27.5819935 39.1031463,27.3531618 38.8336355,27.0627192 C38.5642119,26.7722766 38.3578369,26.4334017 38.2147137,26.0462158 C38.0715906,25.6589084 38,25.2453352 38,24.8052836 L38,16.409231 C38,15.9164655 38.1642458,15.5027405 38.4926213,15.1683292 C38.8210258,14.8338875 39.2041983,14.6666667 39.6421388,14.6666667 L55.2800102,14.6666667 C55.751625,14.6666667 56.1473491,14.8338875 56.4673568,15.1683292 C56.7873645,15.5027405 56.9473684,15.9164655 56.9473684,16.409231 L56.9473684,21.0825476 L56.9473684,21.0825476 Z" fill="#FFFFFF" fill-rule="nonzero" />
                <path d="M9.38132036,4 C10.168896,4 10.9277687,4.14542151 11.6579101,4.43612523 C12.3881648,4.72685681 13.0362737,5.12659183 13.6023781,5.63533028 C14.1684826,6.1441802 14.6237383,6.73773624 14.9683716,7.41608207 C15.3129767,8.09453934 15.4851943,8.82131253 15.4851943,9.59656885 L15.4851943,13.1823697 L12.5070527,13.1823697 L12.5070527,10.2750261 C12.5070527,9.25743774 12.215834,8.46602035 11.6333117,7.90060681 C11.0508176,7.33533257 10.2673465,7.05265366 9.28286987,7.05265366 C8.39673053,7.05265366 7.68300691,7.33533257 7.14150091,7.90060681 C6.59996658,8.46602038 6.32932682,9.25743774 6.32932682,10.2750261 L6.32932682,13.2307692 L3.22805139,13.2307692 L3.22805139,9.59656885 C3.22805139,8.82131253 3.38393607,8.09453931 3.69570539,7.41608207 C4.00747472,6.73773627 4.43824517,6.1441802 4.98793179,5.63533028 C5.53761841,5.12659181 6.18572723,4.72685681 6.93228654,4.43612523 C7.67887415,4.14542151 8.49518103,4 9.38132036,4 L9.38132036,4 Z M18.8571429,21.2953923 L18.8571429,23.4961414 L18.8571429,24.698891 C18.8571429,25.1594246 18.7775942,25.59453 18.6183233,26.0039717 C18.4590813,26.4134134 18.2411683,26.7631105 17.9645841,27.0530925 C17.6879999,27.3432216 17.3611882,27.5734884 16.9840043,27.7440401 C16.6068492,27.9147389 16.1920164,28 15.7394188,28 L3.01715327,28 C2.56455569,28 2.15391566,27.9190358 1.78511746,27.7569308 C1.41640601,27.5948552 1.09789323,27.3730645 0.829665838,27.0915586 C0.561525202,26.8100527 0.356132874,26.4816047 0.213691293,26.1063322 C0.0712497124,25.730942 1.29674049e-13,25.3300941 1.29674049e-13,24.9035825 L1.29674049e-13,16.7658701 C1.29674049e-13,16.2882666 0.163463717,15.8872715 0.49027549,15.5631498 C0.817116171,15.2389987 1.19846404,15.0769231 1.63431907,15.0769231 L17.1977245,15.0769231 C17.6670935,15.0769231 18.0609332,15.2389987 18.379417,15.5631498 C18.6979009,15.8872715 18.8571429,16.2882666 18.8571429,16.7658701 L18.8571429,21.2953923 L18.8571429,21.2953923 Z" fill="#B2B2B2" fill-rule="nonzero" />
                <rect fill="#B2B2B2" transform="translate(29.000000, 16.500000) rotate(30.000000) translate(-29.000000, -16.500000) " x="28" y="5" width="2" height="23" rx="1" />
            </svg>
            <svg v-show="read_tags_display_mode === 2" width="32" height="16" viewBox="0 0 64 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M57.6486032,4 C58.431251,4 59.1853755,4.14703731 59.9109485,4.44097107 C60.6366341,4.734933 61.2806878,5.13910952 61.8432502,5.65350061 C62.4058126,6.16800442 62.8582198,6.76815553 63.2006968,7.45403853 C63.5431457,8.14003422 63.7142857,8.87488267 63.7142857,9.65875295 L63.7142857,13.284396 L60.7547781,13.284396 L60.7547781,10.3447486 C60.7547781,9.31585371 60.4653815,8.5156428 59.886504,7.94394689 C59.3076546,7.37239183 58.5290855,7.08657203 57.5507687,7.08657203 C56.6701738,7.08657203 55.9609159,7.37239183 55.422798,7.94394689 C54.884652,8.51564283 54.6157056,9.31585371 54.6157056,10.3447486 L54.6157056,13.3333333 L51.5338346,13.3333333 L51.5338346,9.65875295 C51.5338346,8.87488267 51.6887439,8.14003419 51.9985625,7.45403853 C52.3083811,6.76815556 52.7364563,6.16800442 53.2827036,5.65350061 C53.8289509,5.13910949 54.4730045,4.734933 55.2148927,4.44097107 C55.956809,4.14703731 56.7680083,4 57.6486032,4 L57.6486032,4 Z M56.9473684,21.0825476 L56.9473684,23.3531617 L56.9473684,24.5940939 C56.9473684,25.0692476 56.8674391,25.5181659 56.7074062,25.9406057 C56.5474023,26.3630456 56.3284466,26.7238442 56.0505391,27.0230319 C55.7726315,27.3223715 55.4442561,27.5599483 55.0652674,27.7359143 C54.6863079,27.9120322 54.2694901,28 53.814727,28 L41.0315894,28 C40.5768263,28 40.1642215,27.9164655 39.7936587,27.7492143 C39.4231831,27.5819935 39.1031463,27.3531618 38.8336355,27.0627192 C38.5642119,26.7722766 38.3578369,26.4334017 38.2147137,26.0462158 C38.0715906,25.6589084 38,25.2453352 38,24.8052836 L38,16.409231 C38,15.9164655 38.1642458,15.5027405 38.4926213,15.1683292 C38.8210258,14.8338875 39.2041983,14.6666667 39.6421388,14.6666667 L55.2800102,14.6666667 C55.751625,14.6666667 56.1473491,14.8338875 56.4673568,15.1683292 C56.7873645,15.5027405 56.9473684,15.9164655 56.9473684,16.409231 L56.9473684,21.0825476 L56.9473684,21.0825476 Z" fill="#B2B2B2" fill-rule="nonzero" />
                <path d="M9.38132036,4 C10.168896,4 10.9277687,4.14542151 11.6579101,4.43612523 C12.3881648,4.72685681 13.0362737,5.12659183 13.6023781,5.63533028 C14.1684826,6.1441802 14.6237383,6.73773624 14.9683716,7.41608207 C15.3129767,8.09453934 15.4851943,8.82131253 15.4851943,9.59656885 L15.4851943,13.1823697 L12.5070527,13.1823697 L12.5070527,10.2750261 C12.5070527,9.25743774 12.215834,8.46602035 11.6333117,7.90060681 C11.0508176,7.33533257 10.2673465,7.05265366 9.28286987,7.05265366 C8.39673053,7.05265366 7.68300691,7.33533257 7.14150091,7.90060681 C6.59996658,8.46602038 6.32932682,9.25743774 6.32932682,10.2750261 L6.32932682,13.2307692 L3.22805139,13.2307692 L3.22805139,9.59656885 C3.22805139,8.82131253 3.38393607,8.09453931 3.69570539,7.41608207 C4.00747472,6.73773627 4.43824517,6.1441802 4.98793179,5.63533028 C5.53761841,5.12659181 6.18572723,4.72685681 6.93228654,4.43612523 C7.67887415,4.14542151 8.49518103,4 9.38132036,4 L9.38132036,4 Z M18.8571429,21.2953923 L18.8571429,23.4961414 L18.8571429,24.698891 C18.8571429,25.1594246 18.7775942,25.59453 18.6183233,26.0039717 C18.4590813,26.4134134 18.2411683,26.7631105 17.9645841,27.0530925 C17.6879999,27.3432216 17.3611882,27.5734884 16.9840043,27.7440401 C16.6068492,27.9147389 16.1920164,28 15.7394188,28 L3.01715327,28 C2.56455569,28 2.15391566,27.9190358 1.78511746,27.7569308 C1.41640601,27.5948552 1.09789323,27.3730645 0.829665838,27.0915586 C0.561525202,26.8100527 0.356132874,26.4816047 0.213691293,26.1063322 C0.0712497124,25.730942 1.29674049e-13,25.3300941 1.29674049e-13,24.9035825 L1.29674049e-13,16.7658701 C1.29674049e-13,16.2882666 0.163463717,15.8872715 0.49027549,15.5631498 C0.817116171,15.2389987 1.19846404,15.0769231 1.63431907,15.0769231 L17.1977245,15.0769231 C17.6670935,15.0769231 18.0609332,15.2389987 18.379417,15.5631498 C18.6979009,15.8872715 18.8571429,16.2882666 18.8571429,16.7658701 L18.8571429,21.2953923 L18.8571429,21.2953923 Z" fill="#FFFFFF" fill-rule="nonzero" />
                <rect fill="#B2B2B2" transform="translate(29.000000, 16.500000) rotate(30.000000) translate(-29.000000, -16.500000) " x="28" y="5" width="2" height="23" rx="1"></rect>
            </svg>
        </button>

        <button :disabled="!editable" type="button" @click.stop="windowToggle === 'edit'? $clickToggle('compared') : $clickToggle('edit')"
            :title="windowToggle === 'edit' ? '专注模式' : '对照模式'"
            class="op-icon icon-btn" aria-hidden="true">
            <svg v-show="windowToggle === 'compared'" width="16" height="16" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g><rect stroke="#ccc" stroke-width="3" x="1" y="1" width="30" height="30" rx="4" fill="#fff0"/><path d="M2 2h28v2H2zM2 28h28v2H2z" fill="#ccc" /><path d="M15 4h2v25h-2z" fill="#ccc" /></g></svg>
            <svg v-show="windowToggle === 'edit'" width="16" height="16" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g><rect stroke="#ccc" stroke-width="3" x="1" y="1" width="30" height="30" rx="4" fill="#fff0"/><path d="M2 2h28v2H2zM2 28h28v2H2z" fill="#ccc" /></g></svg>
        </button>
<!-- 
        <button :disabled="!editable" type="button" @click.stop=""
            title="对照模式"
            class="op-icon fa fa-mavon-columns" aria-hidden="true">
        </button> -->
    </div>
</div>
</template>
<script type="text/ecmascript-6">
import { uploadImage } from '../lib/image_upload'
export default {
    name: 's-md-toolbar',
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
        d_words: {
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

            // hack file 无法选择同一文件bug
            document.querySelector('#_toolbar-file').setAttribute("type", "text");

            this.$emit('imageMultipleUpload', files)

            // hack file 无法选择同一文件bug
            document.querySelector('#_toolbar-file').setAttribute("type", "file");
        },
        // 图片图片上传
        defaultImageUpload() {
            if (this.imageUploadAction === 'default') {
                this.$emit('toolbar_left_click', 'imagelink', {
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
                this.$emit('toolbar_left_click', _type);
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
                this.$emit('toolbar_left_click', _type, {
                    string: this.encryption
                });
            }
        },
        $click_header(_type) {
            // 让父节点来绑定事件并
            this.$emit('toolbar_left_click', _type);
            this.s_header_dropdown_open = false
        },
        handleClose(e) {
            this.s_img_dropdown_open = false;
        }
    }
}
</script>
<style lang="stylus" scoped>
    .op-icon.dropdown-wrapper.dropdown
        position relative
        &[type=button]
            -webkit-appearance unset
        .popup-dropdown
            position absolute
            display block
            background #fff
            top 32px
            left -45px
            min-width 130px
            z-index 1600
            border 1px solid #ebeef5
            border-radius 4px
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
            .dropdown-item:first-child
                border-top-left-radius 3px
                border-top-right-radius 3px
            .dropdown-item:last-child
                border-bottom-left-radius 3px
                border-bottom-right-radius 3px
            &.op-header
                left -30px
                min-width 90px
            &.fade-enter-active, &.fade-leave-active
                opacity 1
            &.fade-enter, &.fade-leave-active
                opacity 0
            &.transition
              &, .dropdown-item
                transition all 0.2s linear 0s
        .dropdown-item
            height 40px
            line-height @height
            font-size 14px
            color #606266
            position relative
            &:hover
                color #303133
                background-color #e9e9eb
            input
                position absolute
                font-size 100px
                right 0
                top 0
                opacity 0
                cursor pointer
        .dropdown-images
            box-sizing border-box
            button
                position absolute
                top -1px
                right 5px
                font-size: 14px
                &:hover
                    color #F56C6C
                    background-color: transparent
            span
                display inline-block
                width 80px
                white-space nowrap
                overflow hidden
                text-overflow ellipsis
            &:hover
                .image-show
                    display block !important
            .image-show
                display none
                position absolute
                left -128px
                top 0
                width 120px
                height 90px
                object-fit contain
                border 1px solid #F2F6FC
                &.transition
                    transition all 0.2s linear 0s
            &.transition
                transition all 0.2s linear 0s
.add-image-link-wrapper
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    background rgba(0, 0, 0, 0.7)
    z-index 1600
    transition all 0.1s linear 0s
    &.fade-enter-active, &.fade-leave-active
        opacity 1
    &.fade-enter, &.fade-leave-active
        opacity 0
    .add-image-link
        position fixed
        box-sizing border-box
        text-align center
        width 24%
        left 38%
        @media only screen and (max-width 1500px)
            width 34%
            left 33%
        @media only screen and (max-width 1000px)
            width 50%
            left 25%
        @media only screen and (max-width 600px)
            width 80%
            left 10%
        height auto
        padding 40px
        top 25%
        transition all 0.1s linear 0s
        z-index 3
        background #fff
        border-radius 2px

        i
            font-size 24px
            position absolute
            right 8px
            top 6px
            color rgba(0, 0, 0, 0.7)
            cursor pointer
        .title
            font-size 20px
            margin-bottom 30px
            margin-top 10px
            font-weight 500 !important
        .input-wrapper
            margin-top 10px
            width 80%
            border  1px solid #eeece8
            text-align left
            margin-left 10%
            height 35px
            input
                height 32px
                line-height 32px
                font-size 15px
                width 90%
                margin-left 8px
                border none
                outline none
        .op-btn
            width 100px
            height 35px
            display inline-block
            margin-top 30px
            cursor pointer
            text-align center
            line-height @height
            opacity 0.9
            border-radius 2px
            letter-spacing 1px
            font-size 15px
        .op-btn.sure
            background #2185d0
            color #fff
            margin-left 5%
            &:hover
                opacity 1
        .op-btn.cancel
            border 1px solid #bcbcbc
            color #bcbcbc
            &:hover
                color #000

.task-icon,
.line-icon,
.edit-icon
    width: 1em
    height: 1em
    font-size: 16px

.icon-btn
    position: relative
.task-icon,
.line-icon,
.edit-icon,
.lock-icon
    position: absolute
    top: 5px
    left: 5px
    font-size: 16px
    width: 1em
    height: 1em

.v-left-item 
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    width: 100%;
    box-sizing border-box
    .op-icon
        margin: 0 2px;
    .toolbar-left,
    .toolbar-right
        overflow: hidden;
        display: flex;
        align-items: center;
    .toolbar-left
        width: calc(100% - 80px)
        .toolbar-btn
            min-width 400px
            overflow: hidden;
            display: flex;
            align-items: center;

    .toolbar-right
        min-width 80px
        justify-content flex-end
    .toolbar-line
        border-left: 1px solid #4d4d4d
        height 22px
        margin 0 6px
.image
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
