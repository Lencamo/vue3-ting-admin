// ===================
// ==== 核心技术
// ===================

export interface IDescItem {
  label: string
  value: string
  linkUrl?: string
  isTag?: boolean
}

// ===================
// ==== 数据统计
// ===================

export interface ICountCard {
  name: string
  title: string
  value: string
  total: string
  icon: string
  color: string
}
