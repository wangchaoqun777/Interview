import { TableColumnCtx } from 'element-plus/lib/el-table/src/table-column/defaults'
import { ComponentInternalInstance, RenderFunction, VNode } from 'vue'
import BasicDialog from './BasicDialog/index.vue'
import BasicPageList from './BasicPageList/index.vue'

type _column<T> = Partial<TableColumnCtx<T>>
export interface BasicTableColumns<T = Record<string, any>> extends Omit<_column<T>, 'columns' | 'formatter'> {
  label?: string
  type?: string
  prop?: string
  slotName?: string
  map?: string[] | Record<string | number, any>
  columns?: BasicTableColumns<T>[]
  header?: string
  width?: string | number
  minidth?: string | number
  showOverflowTooltip?: boolean
  render?: (this: ComponentInternalInstance, row: T, value: any, column: any, table?: ComponentInternalInstance) => string | VNode | undefined
  formatter?: (this: ComponentInternalInstance, row: T, value: any, column: any) => string | undefined
}

interface VoidFunction {
  (): void
}

type BasicDialogInstance = Exclude<ReturnType<Required<typeof BasicDialog>['setup']>, void | RenderFunction | Promise<any>>

type BasicPageListInstance = Exclude<ReturnType<Required<typeof BasicPageList>['setup']>, void | RenderFunction | Promise<any>>
