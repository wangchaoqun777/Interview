<template>
  <basic-page-list 
    ref="listRef" 
    :columns="columns" 
    :data="id"
    :expand="false"
    url="/home/log/noticelog"
    method="get"
    @update:selection-rows="handleSelectionChange"
    >
    <basic-title title="查询结果">
    </basic-title>
  </basic-page-list>
</template>

<script setup lang="ts">
  import { ref, onMounted} from 'vue'
  import { useRoute } from "vue-router";
  const listRef = ref<HTMLElement | null>(null)
  const route = useRoute()
  const { id } = route.params
  const columns = [
    {
      label: '序号',
      prop: 'num',
      width: 50
    },
    {
      label: '创建时间',
      prop: 'created_at',
      width: 180
    },
    {
      label: '通知内容',
      prop: 'content',
    }
  ]

  const multipleSelection = ref<number[]>([])
  
  onMounted( ()=> {
    listRef.value?.update?.()
  })

  const handleSelectionChange = (row: any) => {
    multipleSelection.value = row.map((item:any) => item.id)
  }
</script>
<style lang="less" scoped >
</style>
