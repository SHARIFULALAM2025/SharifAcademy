'use client'
import { useState } from 'react'
import ToggleButton from './ToggleButton'
import Language from './Language'
import { SidebarItem } from './sidebar'

interface SidebarWrapperProps {
  items: SidebarItem[]
}

const SidebarWrapper = ({ items }: SidebarWrapperProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside
      className={`relative bg-foreground text-background/80 border-r border-dotted border-background/15 flex flex-col transition-all duration-300 ease-in-out shrink-0 ${
        isCollapsed ? 'w-12' : 'w-44 sm:w-48'
      }`}
    >
      <ToggleButton
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
      />

      <nav className="pt-10 px-2">
        <Language isCollapsed={isCollapsed} items={items} />
      </nav>
    </aside>
  )
}

export default SidebarWrapper
