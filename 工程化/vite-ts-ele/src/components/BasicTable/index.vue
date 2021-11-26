<template>
  <div class="basic-table" :class="classList">
    <div class="basic-table__wrapper">
      <el-table v-bind="attrs" :data="tableData" class="basic-table__inner" @selection-change="selectionChange">
        <template #empty>
          <div class="data-empty">
            <div v-loading="loading" :element-loading-text="loadingText" element-loading-spinner="el-icon-loading" class="basic-table__loading"></div>
            <slot name="empty">
              <span v-if="!loading">{{ noDataText }}</span>
            </slot>
          </div>
        </template>

        <el-table-column v-if="selectionRows && attrs.rowKey" reserve-selection type="selection" />

        <el-table-column v-if="showIndex" type="index" :label="indexLabel" :index="indexMethod()" />
        <el-table-column
          v-for="{ header, columns: cols, _id, ...colAttrs } in tableColumns"
          v-bind="Object.assign({}, columnAttrs, colAttrs)"
          :key="colAttrs.prop || _id"
          :index="indexMethod(colAttrs.index)"
        >
          <template v-if="header" #header="scope">
            <slot v-if="header && $slots[header]" :name="header" v-bind="scope" :row="colAttrs" />
          </template>
          <template v-if="!colAttrs.type" #default="scope">
            <NestColumn
              v-if="cols && cols.length > 0"
              :columns="cols"
              :options="Object.assign({ popoverOptions }, colAttrs)"
              :empty-text="colAttrs.emptyText"
              :empty-value="computedEmptyValue"
            />
            <BasicTableCell
              v-else
              v-bind="Object.assign({ popoverOptions, column: scope }, colAttrs)"
              :empty-text="colAttrs.emptyText"
              :empty-value="computedEmptyValue"
            />
          </template>
        </el-table-column>

        <slot />
      </el-table>
    </div>
    <div v-if="total >= 0" class="basic-table-pagination">
      <el-pagination
        v-bind="pageAttrs"
        ref="page"
        :current-page="page"
        :page-size="pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleChange('update:page', $event)"
        @size-change="handleChange('update:page-size', $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Table from 'element-plus/lib/el-table/src/table.vue'

import { ComponentInternalInstance, computed, defineComponent, getCurrentInstance, nextTick, onMounted, PropType, provide, ref, toRefs, watch } from 'vue'
import NestColumn from './NestColumn.vue'
import BasicTableCell from './Cell.vue'
import { computedColumns } from './utils'
import { BasicTableColumns } from '../basic'

type IndexMethodCallback = (index: number, page: number, pageSize: number, table: ComponentInternalInstance | null) => string

export default defineComponent({
  name: 'BasicTable',

  components: {
    BasicTableCell,
    NestColumn,
  },

  inheritAttrs: false,

  props: {
    columns: {
      type: Array as PropType<BasicTableColumns[]>,
    },
    loading: Boolean,
    data: {
      type: Array as PropType<Record<string, any>[]>,
      default: () => [],
    },
    noDataText: {
      type: String,
      default: '没有更多数据了',
    },
    loadingText: {
      type: String,
      default: '数据加载中...',
    },
    showOverflowTooltip: {
      type: Boolean,
      default: true,
    },
    changeOnInit: {
      type: Boolean,
      default: true,
    },
    selectionKey: String,
    selectionRows: Array,
    columnOptions: Object as PropType<BasicTableColumns>,
    emptyValue: null,
    page: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    total: Number,
    emptyText: {
      type: String,
      default: '-',
    },
    popoverOptions: {
      type: Object as PropType<Record<string, any> & { slot: string }>,
      default: () => ({}),
    },
    indexFn: {
      type: Function as PropType<IndexMethodCallback>,
    },
    showIndex: Boolean,
    indexLabel: {
      type: String,
      default: '序号',
    },
    pageOptions: Object,
  },

  emits: ['update:selection-rows', 'change', 'update:page', 'update:page-size'],

  setup(props, { attrs, emit }) {
    const table = getCurrentInstance()
    provide('table', table)
    const { loading, data, columns, selectionKey: key, selectionRows: rows, showOverflowTooltip, columnOptions, indexFn } = toRefs(props)
    const classList = computed(() => {
      return {
        'basic-table--loading': loading.value,
      }
    })
    const tableData = computed(() => (loading.value ? [] : data.value))
    const selectionChange = (value: any[]) => {
      const rows = key.value && typeof key.value === 'string' ? value.map((item) => item[key.value ?? '']) : value
      emit('update:selection-rows', rows)
    }
    const columnAttrs = computed(() => ({ showOverflowTooltip: showOverflowTooltip.value, align: 'center', ...columnOptions.value }))
    const computedEmptyValue = computed(() => {
      const values = [undefined, null, '']
      if (Array.isArray(props.emptyValue)) {
        return values.concat(props.emptyValue)
      }
      return values.concat([props.emptyValue])
    })

    const tableColumns = computed(() => computedColumns(columns.value, table))

    const pageAttrs = computed(() =>
      Object.assign(
        {
          pageSizes: [10, 15, 20, 25],
        },
        props.pageOptions
      )
    )

    watch(
      rows,
      (value) => {
        if (value) {
          const table = ref<typeof Table>()
          if (table.value) {
            for (const item of data.value) {
              const checked = key && typeof key === 'string' ? value.some((v) => item[key] === v) : value.includes(item)
              table.value.toggleRowSelection(item, checked)
            }
          }
        }
      },
      { immediate: true }
    )

    onMounted(() => {
      if (props.changeOnInit) {
        emit('change', props.page, props.pageSize)
      }
    })

    function indexMethod(callback?: IndexMethodCallback) {
      return (index: number) => {
        if (typeof callback === 'function') return callback(index, props.page, props.pageSize, table)
        if (indexFn.value) return indexFn.value(index, props.page, props.pageSize, table)
        return index + 1 + (props.page - 1) * props.pageSize
      }
    }

    function handleChange(type: 'update:page' | 'update:page-size', value: any) {
      emit(type, value)
      nextTick(() => {
        emit('change', props.page, props.pageSize)
      })
    }
    return {
      classList,
      attrs,
      tableData,
      selectionChange,
      columnAttrs,
      computedEmptyValue,
      tableColumns,
      indexMethod,
      pageAttrs,
      handleChange,
    }
  },
})
</script>

<style lang="less" scoped>
.basic-table {
  position: relative;
  background-color: #fff;
  &:deep(tr th) {
    background-color: #fafafa;
  }
  &:deep(.el-table__cell) {
    padding: 5px 0 !important;
  }
}

.basic-table--loading {
  .el-table__body-wrapper {
    overflow: hidden !important;
  }
  .basic-table__loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
    line-height: 1.5em;
    z-index: 999;
    font-size: 14px;
  }
}

.basic-table__wrapper {
  position: relative;
}

.basic-table-pagination {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  box-sizing: border-box;
}
</style>
