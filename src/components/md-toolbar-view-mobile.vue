<template>
    <div class="tool">
        <div class="tool-3 tool-item">
            <div class="item">
            </div>
            <div class="item">
            </div>
        </div>
        <div class="tool-4">
            <slot />
        </div>
        <div class="tool-3 tool-item">
            <div class="item">
            </div>
            <div class="item">
                <div class="item-btn"  @click.stop="$clickToggle('edit')">
                    <svg class="icon" t="1591076184171" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1989" width="200" height="200"><path d="M307.933767 709.191401l55.608246-121.906912 70.215853 67.788777-125.824099 54.118135z m95.818675-171.645022l366.409348-352.874171 82.001279 80.116062-365.732025 352.095249-82.678602-79.33714z m550.042994-370.90226l-50.505744 48.372175-81.854525-80.116062 49.704244-47.593254c8.003704-7.958549 23.435387-6.513593 32.150281 2.144858l48.281866 46.182162c5.147657 5.03477 8.071436 11.559652 8.071436 18.039379 0.011289 5.046059-2.201301 9.36964-5.847558 12.970742zM313.792614 530.299019c-0.745056 0.767633-1.467534 1.478823-2.21259 2.889913L259.640613 717.217683c-2.923779 10.78073 0 22.340381 8.071436 30.310219 6.581325 5.779826 14.607607 9.290618 23.390233 9.290619 2.935068 0 5.113791-0.699901 8.03757-1.399802l190.147239-49.749399h0.79021a8.048859 8.048859 0 0 0 5.791115-2.178724l507.721574-489.208069c15.28493-14.40441 23.356366-33.888744 23.356367-55.551803 0-24.519105-10.927483-49.03821-29.215214-67.077588l-48.281865-46.182163c-19.010208-18.039378-43.935707-28.853974-69.572396-28.853974-22.577445 0-43.145497 7.935972-57.707948 23.074149L314.503803 528.109007c-0.71119 0.699901-0.71119 1.478823-0.711189 2.190012zM100.932466 0C45.358086 0 0 44.70334 0 99.555242V923.530372c0 54.806747 45.358086 99.555242 100.932466 99.555241h806.082505c55.57438 0 100.864734-44.748495 100.864734-99.555241V397.543645h-86.290994v451.729511c0 49.049498-40.221718 87.939147-89.214772 87.939147H175.539632c-49.004344 0-89.214772-38.889648-89.214773-87.939147V173.157711c0-48.338309 40.210429-88.040745 89.214773-88.040745h457.904443V0H100.932466z" p-id="1990"></path></svg>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    editable: { // 是否开启编辑
      type: Boolean,
      default: true
    }
  },
  methods: {
    $clickToggle(_type) {
      // 让父节点来绑定事件并
      if (this.editable) {
        this.$emit('toolbar_toggle_click', _type);
      }
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
            fill: #B2B2B2;
            width: 1em;
            height: 1em;
            font-size: 18px;
        .icon.toggle-lock
            font-size: 38px
.tool-item::after
    content ''
    display block
    width 0
    height 0
    clear both
</style>
