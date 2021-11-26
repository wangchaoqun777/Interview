<template>
  <el-table-column v-for="{ label, ...item } in columns" :key="item._id" :label="label" v-bind="item">
    <template #default="column">
      <BasicTableCell v-bind="{ ...item, column }" />
      <nest-column v-if="item.columns && item.columns.length > 0" :columns="item.columns" />
    </template>
  </el-table-column>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BasicTableCell from './Cell.vue'
export default defineComponent({
  name: 'NestColumn',

  components: {
    BasicTableCell,
  },

  inheritAttrs: false,

  props: {
    columns: {
      type: Array,
      required: true,
    },
    emptyText: String,
    emptyValue: Array,
  },
})
</script>

<style lang="less" scoped></style>
