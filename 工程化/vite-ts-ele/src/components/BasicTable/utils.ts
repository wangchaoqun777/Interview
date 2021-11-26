let temp = 0
export const computedColumns = (data = [] as any[], context: any, level = 0) => {
  const len = data.length
  const columns = []
  temp++
  for (let i = 0; i < len; i++) {
    const item = { ...data[i] }
    if (!item._id) {
      item._id = `id_${temp}_${level}_${i}`
    }
    if (typeof item.hide === 'function' && item.hide.call(context, context)) continue
    if (typeof item.hide === 'boolean' && item.hide) continue
    columns.push(item)

    const children = item.columns
    if (Array.isArray(children)) {
      item.columns = computedColumns(children, context, level + 1)
    }
  }
  return columns
}
