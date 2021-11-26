<template>
  <el-select 
    v-bind="attrs" 
    :multiple="multiple" 
    collapse-tags 
    clearable
    placeholder="请选择">
    <el-option 
      v-for="{ name, id } in options" 
      :key="id" 
      :label="name" 
      :value="id" />
  </el-select>
</template>

<script>
export default {
  name: 'BasicSelect',

  props: {
    type: String,
    clearable: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
    },
    filter: Function,
    options: [Array, Function],
  },

  setup (props, content) {
    const { attrs } = content
    return { attrs }
  }
}
</script>

<style lang="scss" scoped></style>
