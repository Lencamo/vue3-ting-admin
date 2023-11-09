// entries 中的 DepartmentList数据
export function generateDepartmentListToTree(departmentList, rootId) {
  let result = [] as any

  departmentList.forEach((item) => {
    if (item.parentId === rootId) {
      let children = generateDepartmentListToTree(departmentList, item.id)
      if (children.length) {
        item.children = children
      }
      result.push(item)
    }
  })
  return result
}
