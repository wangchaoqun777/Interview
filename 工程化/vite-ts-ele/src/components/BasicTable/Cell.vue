<script lang="tsx">
import { inject, toRefs, getCurrentInstance, PropType, defineComponent, ComponentInternalInstance } from 'vue'
import { useStore } from 'vuex'
interface Column {
  row: Record<string, any>
  column: any
  $index: number
}
export default defineComponent({
  name: 'BasicTableCell',

  inheritAttrs: false,

  props: {
    column: Object as PropType<Column>,
    prop: String,
    slotName: String,
    map: [Array, Object] as PropType<any[] | Record<string, any>>,
    emptyText: {
      type: String,
      default: '-',
    },
    emptyValue: Array as PropType<any[]>,
    popoverOptions: Object,
    formatter: Function,
    render: Function,
    dictName: String,
    cellClass: [String] as PropType<string>,
  },

  setup(props) {
    const instance = getCurrentInstance()
    const { render, prop, column, popoverOptions, cellClass, slotName, dictName, formatter, emptyValue, emptyText, map } = toRefs(props)
    const table = inject<ComponentInternalInstance>('table')
    const store = useStore()
    const row = column.value?.row ?? {}
    // const className = typeof cellClass.value === 'function' ? cellClass.value(row) : cellClass.value
    const className = cellClass.value
    const popOpt = Object.assign(
      {
        trigger: 'hover',
        slot: null,
      },
      popoverOptions.value
    )
    function valueFormat() {
      let value = row?.[prop?.value ?? '']
      // if (dictName && (value || value === 0)) {
      //   value = store.getters['dictionary/getDictLabel'](dictName, value)
      // }
      if (render.value) return render.value.call(table, row, value, column.value, table)
      if (formatter.value) return formatter.value.call(table, row, value, column.value)
      if (typeof prop !== 'undefined') {
        if (map.value) {
          if (emptyValue.value) {
            let v = ''
            if (Array.isArray(map.value)) {
              v = map.value[value]
            } else if (map.value) {
              v = map.value[value] || map.value.default
            }
            if (!emptyValue.value.includes(v)) return v
          }
        }
        return emptyValue.value?.includes(value) ? emptyText.value : value
      }
      return emptyText.value
    }
    const value = valueFormat()
    function buildCell() {
      if (slotName.value) {
        const scopedSlot = slotName.value ? table?.slots?.[slotName.value] : null
        if (scopedSlot) return scopedSlot({ prop, row, value, column: column.value })
      }
      return <span class={className}>{value}</span>
    }
    const { slot, ...opts } = popOpt
    const content = slot ? instance?.parent?.slots[slot || ''] : undefined
    if (content) {
      return () => (
        <el-popover {...{ opts }}>
          {content({ prop, row, value, column: column.value })}
          {{
            reference: () => <span class={className}>{buildCell()}</span>,
          }}
        </el-popover>
      )
    }
    return buildCell
  },
})
</script>

<style lang="less" scoped></style>
