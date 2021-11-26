<template>
  <div
    :class="wrapClasses"
    :style="{ fontSize }"
  >
    <div class="zr-title-top__left">
      <span
        class="zr-title-top__left-content"
      >{{ title }}</span>
    </div>
    <div v-if="back" class="zr-title-top__subitlte">
      <span class="zr-title-top__subitlte-content" @click="goBack">返回上一级</span>
    </div>
    <div
      v-if="content || $slots.default"
      class="zr-title__right"
    >
      <div class="zr-title__right-content">
        <slot>{{ content }}</slot>
      </div>
    </div>
  </div>
</template>
<script>
const themes = ['default']
export default {
  name: 'BasicTitle',

  props: {
    title: {
      type: String,
      default: ''
    },
    back: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: '',
      validator (value) {
        return value === '' || themes.includes(value)
      }
    },
    fontSize: {
      type: String,
      default: ''
    },
    hideline: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    wrapClasses () {
      return [
        'zr-title-top',
        this.theme,
        {
          'hideline': this.hideline
        }
      ]
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
  .zr-title-top {
    padding-right: 0;
    width: 100%;
    height: 76px;
    font-size: 16px;
    line-height: 2;
    background: #fff;
    border-bottom: 1px solid transparent;
    @include clearfix;
  }
  .zr-title-top__left {
    position: relative;
    height: 100%;
    line-height:76px;
    font-size: 18px;
    color: #333;
    float: left;
    vertical-align: middle;
    &:before {
      content: '';
      position: absolute;
      left: -10px;
      top: 50%;
      background-color: #409eff;
      width: 3px;
      height: 23px;
      transform: translateY(-50%);
    }
  }
  .zr-title.border--visible {
    border-color: #e6ebf5;
  }
  .zr-title-top__subitlte {
    margin-left: 16px;
    float: left;
    line-height: 76px;
    color: #999;
    font-size: 12px;
    &-content {
      cursor: pointer;
      &:hover {
        color: mix(#999, #fff, 70%);
      }
    }
  }
  .zr-title__right {
    padding-top: 25px;
    float: right;
    vertical-align: middle;
    text-align: right;
    font-size: initial;
  }
  .zr-title__right-content {
    display: inline-block;
    text-align: left;
  }
  .zr-title--small {
    font-size: (14 / 16) em;
  }
  .zr-title--mini {
    font-size: (12 / 16) em;
  }
</style>
