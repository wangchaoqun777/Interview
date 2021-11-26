<template>
  <el-form v-bind="attrs" ref="form" :size="size" :model="model" @keypress.enter="onEnter">
    <el-form-item
      v-for="{ label, rules, type, required, prop, render, formatter, ...item } in options"
      :key="prop"
      class="formClass"
      :label="label"
      :prop="prop"
      :rules="generalRules(rules || [], !!required, label, prop)"
    >
      <template v-if="editable">
        <formItem :render="render" :type="type" :model="model" :prop="prop" :option="item"></formItem>
      </template>
      <span v-else>{{ formatter ? formatter(model, prop, item) : model[prop] }}</span>
    </el-form-item>
    <slot />
  </el-form>
</template>

<script lang="tsx">
import { defineComponent, getCurrentInstance, inject, PropType, provide, reactive, ref, toRefs, watchEffect } from 'vue'
import components, { FormOption, FieldType } from './components'

export default defineComponent({
  name: 'BasicForm',

  components: {
    formItem(props) {
      const context = inject('basicForm')
      if (props.render) return props.render.call(context, props.model, props.option, context)
      const type: FieldType = props.type || 'input'
      const method = components[type]
      if (method) return method(props.model, props.prop, props.option)
    },
  },

  inheritAttrs: false,

  props: {
    model: {
      type: Object,
      required: true,
    },
    options: {
      type: Array as PropType<FormOption[]>,
      required: true,
    },
    editable: {
      type: Boolean,
      default: true,
    },
    size: String as PropType<'large' | 'medium' | 'small' | 'mini'>,
  },

  emits: ['enter'],

  setup(props, { emit, attrs }) {
    const instance = getCurrentInstance()
    provide('basicForm', instance)

    function onEnter(e: KeyboardEvent) {
      emit('enter', props.model, e)
    }

    function generalRules(rules: any, required: boolean, label = '', prop: string) {
      const result = Array.isArray(rules) ? rules : [rules]
      if (result.some((item) => item && item.required)) return result
      if (required) {
        result.push({
          required: true,
          message: typeof required === 'string' ? required : `${label || prop}是必填项`,
        })
      }
      return result
    }

    const form = ref()

    const formMethodMap = ['resetFields', 'clearValidate', 'validate', 'validateField']

    const methods = reactive<Record<string, any>>(
      formMethodMap.reduce((obj, key) => {
        obj[key] = null
        return obj
      }, {} as Record<string, any>)
    )

    watchEffect(
      () => {
        formMethodMap.forEach((key) => {
          if (typeof form.value[key] === 'function') {
            methods[key] = form.value[key]
          }
        })
      },
      { flush: 'post' }
    )

    return {
      form,
      generalRules,
      onEnter,
      attrs,
      ...toRefs(methods),
    }
  },
})
</script>

<style lang="scss" scoped></style>
