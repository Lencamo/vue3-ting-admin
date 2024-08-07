// entries 中的 DepartmentList数据
export function generateListToTree(departmentList, rootId) {
  const result = [] as any

  departmentList.forEach((item) => {
    if (item.parentId === rootId) {
      const children = generateListToTree(departmentList, item.id)
      if (children.length) {
        item.children = children
      }
      result.push(item)
    }
  })
  return result
}
