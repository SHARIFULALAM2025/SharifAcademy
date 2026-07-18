'use client'
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
            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg font-medium transition-colors ${
              isActive
                ? 'text-accent bg-[color-mix(in_oklab,var(--accent)_16%,transparent)]'
                : 'text-background/70 hover:text-accent hover:bg-[color-mix(in_oklab,var(--accent)_8%,transparent)]'
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
