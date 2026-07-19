'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import ToggleButton from './ToggleButton'
import Language from './Language'
import { SidebarItem } from './sidebar'

interface SidebarWrapperProps {
  items: SidebarItem[]
  mobileOpen: boolean
  onMobileClose: () => void
}

const SidebarWrapper = ({
  items,
  mobileOpen,
  onMobileClose,
}: SidebarWrapperProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  // পেজ বদলালে মোবাইল মেনু বন্ধ হয়ে যাবে
  useEffect(() => {
    onMobileClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <>
      {/* ── ডেস্কটপ সাইডবার (md এবং তার বড় স্ক্রিন) ──
          মোবাইলে এটা একদম render-ই হয় না (hidden), তাই fixed/absolute/z-index
          কোনো জটিলতা মোবাইলে আসবে না */}
      <aside
        className={`
          hidden md:flex relative bg-card text-foreground h-full border-r border-dotted border-border
          flex-col transition-all duration-300 ease-in-out shrink-0
          ${!isCollapsed ? 'md:w-44 lg:w-48' : 'md:w-12'}
        `}
      >
        <ToggleButton
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed(!isCollapsed)}
        />

        <nav className="pt-10 px-2 h-full overflow-y-auto">
          <Language isCollapsed={isCollapsed} items={items} />
        </nav>
      </aside>

      {/* ── মোবাইল ড্রপডাউন প্যানেল (md-এর নিচে) ──
          এটা fixed/absolute না — normal document flow-তে থাকে, খুললে
          content-কে নিচে push করে দেয়। কোনো backdrop/overlay/z-index লাগে না,
          তাই ছোট ডিভাইসে scroll-lock বা layering সমস্যা হবে না। */}
      <div
        className={`md:hidden w-full bg-card border-b border-dotted border-border overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          mobileOpen ? 'max-h-[70vh]' : 'max-h-0'
        }`}
      >
        <nav className="px-3 py-2 overflow-y-auto max-h-[70vh]">
          <Language isCollapsed={false} items={items} />
        </nav>
      </div>
    </>
  )
}

export default SidebarWrapper
