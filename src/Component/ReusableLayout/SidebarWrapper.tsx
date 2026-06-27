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
      className={`relative text-slate-300 border-r dark:bg-slate-900 border-dotted dark:border-white border-slate-800 flex flex-col transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-12' : 'w-44'
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
