<template>
  <BasicForm
    v-if="formItems.length > 0"
    ref="formEl"
    :model="params"
    :label-width="labelWidth"
    editable
    inline
    :options="formItems"
    size="small"
    class="page-list__form"
    :class="formClass"
    @enter="search()"
  >
    <slot name="form" :search="search" :data="params" :list="list" :total="total" :update="update">
      <el-form-item class="page-list__form-actions">
        <el-button type="primary" icon="el-icon-search" size="small" @click="search">查询</el-button>
        <el-button type="default" plain size="small" @click="reset">重置</el-button>
        <el-Button v-if="expand" type="text" @click="changeCollapsed">
          {{ isCollapsed ? '展开' : '收起' }}
          <i v-if="isCollapsed" class="el-icon-arrow-down"></i>
          <i v-else class="el-icon-arrow-up"></i>
        </el-Button>
      </el-form-item>
    </slot>
    <div class="page-list__action">
      <slot name="action" />
    </div>
  </BasicForm>
  <slot />
  <BasicTable
    v-bind="attrs"
    :class="['page-list__table', tableClass]"
    :data="tableData"
    :total="total"
    :loading="loading"
    :columns="columns"
    :page="params.page"
    :page-size="params.size"
    @Change="onChange"
    @update:page="updatePage"
    @update:page-size="updatePageSize"
  >
    <template v-for="name in slotNames" #[name]="scope">
      <slot :name="name" v-bind="scope" />
    </template>
  </BasicTable>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, onBeforeUnmount, PropType, reactive, ref, watch } from 'vue'
import ElForm from 'element-plus/lib/el-form/src/form.vue'
import { BasicTableColumns } from '../basic'
import { FormOption } from '../BasicForm/components'
import axiosInstance from 'axios'
import dayjs from 'dayjs'
import axios from '@/axios'
import { formatList } from '@/utils/utils'
import BasicTable from '../BasicTable/index.vue'
import BasicForm from '../BasicForm/index.vue'
import './style.less'

const { CancelToken } = axiosInstance

function initParameters(options: FormOption[], data: Record<string, any>, initalValue: Record<string, any>) {
  if (Array.isArray(options)) {
    return options.reduce(
      (params, item) => {
        const key = item.prop
        if (item.type === 'daterange' && key) {
          params[key] = initalValue[key] || (Array.isArray(item.initalValue) ? item.initalValue : []) || ''
        } else if (item.prop) {
          params[key] = initalValue[key] || item.defaultValue || ''
        }
        return params
      },
      Object.assign(
        {
          page: 1,
          size: 10,
        },
        data,
        initalValue
      )
    )
  }
  return data || {}
}

let id = 0
export default defineComponent({
  name: 'BasicPageList',

  components: {
    BasicTable,
    BasicForm,
  },

  inheritAttrs: false,

  props: {
    formFields: Array as PropType<FormOption[]>,
    columns: {
      type: Array as PropType<BasicTableColumns>,
    },
    url: {
      type: String,
      required: true,
    },
    method: {
      type: String as PropType<'get' | 'post' | 'delete' | 'put'>,
      default: 'post',
    },
    /**
     * 请求参数
     */
    data: Object,
    initalValue: Object,
    /**
     * 格式化数据
     */
    dataFormat: Function,
    labelWidth: String,
    formClass: String,
    tableClass: String,
    expand: Boolean,
    collapsed: {
      type: Boolean,
      default: false,
    },
    /**
     * expand生效时表单项默认展示的数量
     */
    maxColumns: {
      type: Number,
      default: 4,
    },
    virtualData: Array,
  },

  emits: ['error', 'getParams'],

  setup(props, { emit, attrs, slots }) {
    const slotNames = Object.keys(slots).filter((key) => !['action', 'form', 'default'].includes(key))
    const instance = getCurrentInstance()
    const params = reactive(initParameters(props.formFields || [], props.data || {}, props.initalValue || {}))
    // console.log('params', initParameters(props.formFields || [], props.data || {}, {}))
    const list = ref<any[]>([])
    const total = ref(0)
    const isCollapsed = ref(props.collapsed)
    const loading = ref(false)
    const _cancel = ref<(() => void) | null>(null)
    const form = computed(() => {
      const items = props.formFields || []
      return items
        .map((item) => {
          if (item.type === 'daterange') {
            return {
              ...item,
              prop: item.prop || `_time_${id++}`,
            }
          }
          return item
        })
        .filter((item) => (typeof item.hide === 'function' ? !item.hide(params, instance) : !item.hide))
    })
    const formEl = ref<typeof ElForm>()
    const formItems = computed(() => {
      if (props.expand) {
        const len = Math.max(0, props.maxColumns)
        if (isCollapsed.value) return form.value.slice(0, len)
      }
      return form.value
    })
    const tableData = computed(() => {
      if (props.virtualData) {
        const { page, size } = params
        return props.virtualData.slice((page - 1) * size, size * page)
      }
      return list.value
    })

    watch(
      () => props.data,
      (value) => {
        Object.assign(params, value)
      },
      {
        deep: true
      }
    )

    watch(
      () => form,
      (value) => {
        Object.assign(params, initParameters(value.value, props.data || {}, params))
      },
      { immediate: true }
    )

    watch(
      () => props.collapsed,
      (value) => {
        isCollapsed.value = value
      }
    )

    watch(
      () => props.virtualData,
      (value) => {
        if (value) {
          total.value = value.length
        }
      },
      { immediate: true }
    )

    onBeforeUnmount(() => {
      if (_cancel.value) {
        _cancel.value()
      }
    })

    const changeCollapsed = () => {
      isCollapsed.value = !isCollapsed.value
    }

    function dateRangeFormat(data: any) {
      const daterange = form.value.filter((item) => item.type === 'daterange')
      let _params = data
      for (const item of daterange) {
        const key = item.prop
        const { [key]: time, ..._data } = _params
        _params = _data
        if (Array.isArray(time)) {
          const [start, end] = time
          const startTime = start ? dayjs(start).format('YYYY-MM-DD') : ''
          const endTime = end ? dayjs(end).format('YYYY-MM-DD') : ''
          _params = Object.assign(_params, {
            [key]: [startTime, endTime]
          })
        }
      }
      return _params
    }

    function search(data?: any) {
      Object.assign(params, { page: 1 }, data)
      update()
    }

    function reset() {
      formEl.value?.resetFields?.()
      search()
    }

    function update(data?: any) {
      if (props.virtualData || props.url === '#') return
      if (!props.url) return Promise.reject(new Error('Missing required prop: "url"'))
      if (typeof _cancel.value === 'function') {
        _cancel.value()
        _cancel.value = null
      }
      const cancelToken = new CancelToken(function executor(c) {
        _cancel.value = c
      })
      const formatValue = props.dataFormat ? props.dataFormat(params.value, props) : params
      const _params = dateRangeFormat(formatValue)
      loading.value = true
      return axios[props.method](props.url, Object.assign(_params, data), { cancelToken })
        .then(({ data: res}:any) => {
          const data = formatList({ ...res?.data?.pagination, list: res.data?.list, total:res.data?.total })
          return data
        })
        .then(
          (data:any) => {
            list.value = data.list
            total.value = data.total
            _cancel.value = null
            loading.value = false
            emit('getParams', Object.assign(_params, data))
          },
          (error:any) => {
            emit('error', error)
            list.value = []
            if (!props.virtualData) {
              total.value = 0
            }
            _cancel.value = null
            loading.value = false
          }
        )
    }
    function updatePage(value: number) {
      params.page = value
    }

    function updatePageSize(value: number) {
      params.size = value
    }

    function onChange() {
      update()
    }

    return {
      params,
      list,
      total,
      isCollapsed,
      loading,
      form,
      formItems,
      formEl,
      tableData,
      search,
      reset,
      update,
      updatePage,
      updatePageSize,
      onChange,
      attrs,
      changeCollapsed,
      slotNames
    }
  },
})
</script>

<style lang="scss" scoped></style>
