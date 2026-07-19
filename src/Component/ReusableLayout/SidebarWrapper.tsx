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
      className={`
        relative bg-card text-foreground h-full border-r border-dotted border-border flex flex-col transition-all duration-300 ease-in-out shrink-0
        /* মোবাইলে ড্রয়ারের জন্য ফুল উইডথ, কিন্তু md স্ক্রিন থেকে কলাপ্সিবল উইডথ */
        w-64 md:w-auto
        ${!isCollapsed ? 'md:w-44 lg:w-48' : 'md:w-12'}
      `}
    >
      {/* টগল বাটনটি শুধুমাত্র md এবং তার বড় স্ক্রিনে দেখাবে */}
      <div className="hidden md:block">
        <ToggleButton
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed(!isCollapsed)}
        />
      </div>            

      {/* মোবাইলে pt-14 (যেহেতু টপ হেডার আছে) এবং ডেস্কে pt-10 */}
      <nav className="pt-14 md:pt-10 px-2 h-full overflow-y-auto">
        <Language isCollapsed={isCollapsed} items={items} />
      </nav>
    </aside>
  )
}

export default SidebarWrapper
