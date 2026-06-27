export interface NestedLink {
  id: number
  Name: {
    en: string
    bn: string
  }
  path: string
}

export interface SubLink {
  id: number
  Name: {
    en: string
    bn: string
  }
  path: string
  hasNested?: boolean
  nestedLink?: NestedLink[]
}

export interface NavItem {
  id: number
  Name: {
    en: string
    bn: string
  }
  path: string
  hasDropdown?: boolean
  subLink?: SubLink[]
}
