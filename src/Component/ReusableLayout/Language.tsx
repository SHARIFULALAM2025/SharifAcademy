import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SidebarItem } from './sidebar'

interface LanguageProps {
  isCollapsed: boolean
  items: SidebarItem[]
}

const Language = ({ isCollapsed, items }: LanguageProps) => {
  const pathname = usePathname()
  return (
    <nav className="space-y-1">
      {items.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.id}
            href={item.href}
            className={`flex items-center gap-1  font-medium transition-colors ${
              isActive
                ? ' text-green-600'
                : 'text-slate-100  hover:text-red-600'
            }`}
          >
            <span className="text-xs min-w-3 flex justify-center">
              {item.icon}
            </span>
            <span
              className={`whitespace-nowrap overflow-hidden transition-opacity duration-200 ${
                isCollapsed
                  ? 'opacity-0 pointer-events-none hidden'
                  : 'opacity-100'
              }`}
            >
              {item.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}

export default Language
