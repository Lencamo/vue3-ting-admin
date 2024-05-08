// “省份、城市” 二级联动数据
import pc from 'china-division/dist/pc.json'
import pcC from 'china-division/dist/pc-code.json'

// “省份、城市、区县” 三级联动数据
import pca from 'china-division/dist/pca.json'
import pcaC from 'china-division/dist/pca-code.json'

// “省份、城市、区县、乡镇” 四级联动数据
// import pcas from 'china-division/dist/pcas.json'
// import pcasC from 'china-division/dist/pcas-code.json'

import type { DataItem } from './china-division.d'

// =====工具函数======

const formatToCascader = (data: any[]): DataItem[] => {
  return data.map((item) => {
    const children = item.children ? formatToCascader(item.children) : undefined
    return {
      value: item.code,
      label: item.name,
      children
    }
  })
}

// =====前端组件库所需的cascader格式的数据======

// 1、二级联动
// 数字
const pcValueCode: DataItem[] = formatToCascader(pcC)
// 文字
const pcValueText: DataItem[] = Object.entries(pc).map(([province, cities]) => ({
  label: province,
  value: province,
  children: cities.map((city: string) => ({
    label: city,
    value: city
  }))
}))

// 2、三级联动
const pcaValueCode: DataItem[] = formatToCascader(pcaC)

const pcaValueText: DataItem[] = Object.entries(pca).map(([province, cities]) => ({
  label: province,
  value: province,
  children: Object.entries(cities).map(([city, areas]) => ({
    label: city,
    value: city,
    children: areas.map((area: string) => ({
      label: area,
      value: area
    }))
  }))
}))

// ========其他========

const codeToText: { [key: string]: string } = {}

pcaC.forEach((province) => {
  codeToText[province.code] = province.name
  province.children.forEach((city) => {
    codeToText[city.code] = city.name
    city.children.forEach((area) => {
      codeToText[area.code] = area.name
    })
  })
})

const getCodeText = (code: string) => {
  return codeToText[code]
}

export { pcValueCode, pcValueText, pcaValueCode, pcaValueText, getCodeText }
