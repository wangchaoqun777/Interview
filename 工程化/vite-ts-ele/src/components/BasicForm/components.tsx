import { getCurrentInstance, VNodeChild } from 'vue'
type CompoentInstance = ReturnType<typeof getCurrentInstance>

export type FieldType = 'input' | 'select' | 'daterange' | 'datepicker' | 'date'

export interface FormOption {
  label?: string
  prop: string
  type?: FieldType
  formClass?: string
  rules?: any
  dateType?: string,
  required?: boolean
  readonly?: boolean | ((model: any) => boolean)
  disabled?: boolean | ((model: any) => boolean)
  formatter?: (model: any, prop: any, option: _option) => string | undefined
  toggle?: (model: any, prop: any, option: _option) => boolean | undefined
  render?: (this: CompoentInstance, model: any, prop: any, option: _option, context: CompoentInstance) => VNodeChild
  hide?: boolean | ((params: any, instance: any) => boolean)
  defaultValue?: any
  startTimeField?: string
  endTimeField?: string
  initalValue?: any
}

type _option = Omit<FormOption, 'prop'>

export default {
  input: (model: any, prop: string, option: _option) => <el-input v-model_trim={model[prop]} {...option} />,
  select: (model: any, prop: string, option: _option) => <basic-select v-model={model[prop]} {...option} />,
  daterange: (model: any, prop: string, option: _option) => <el-date-picker
    v-model={model[prop]}
    clearable
    type="daterange"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    {...option}
  />,
  datepicker: (model: any, prop: string, option: _option) => {
    const { dateType = 'datetime', ...attrs } = option
    const value = model[prop]
    const [startTime, endTime] = Array.isArray(value) ? value : []
    return <date-picker
      type={dateType}
      unit={false}
      start-time={startTime}
      end-time={endTime}
      { ...attrs }
    />
  },
  date: (model: any, prop: string, option: _option) => <el-date-picker v-model={model[prop]} {...option} />
}
