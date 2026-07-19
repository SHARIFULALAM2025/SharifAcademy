'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import ToggleButton from './ToggleButton'
import Language from './Language'
import { SidebarItem } from './sidebar'
import { IoCloseOutline } from 'react-icons/io5'

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

  // পেজ বদলালে মোবাইল ড্রয়ার বন্ধ হয়ে যাবে
  useEffect(() => {
    onMobileClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <>
      {/* ব্যাকড্রপ — শুধু মোবাইলে (md-এর নিচে) ড্রয়ার খোলা থাকলে দেখাবে */}
      {mobileOpen && (
        <div
          onClick={onMobileClose}
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />
      )}

      <aside
        className={`
          bg-card text-foreground h-full border-r border-dotted border-border flex flex-col transition-all duration-300 ease-in-out shrink-0
          /* মোবাইল (md-এর নিচে): fixed off-canvas ড্রয়ার — বন্ধ থাকলে কোনো জায়গা নেয় না, কনটেন্টের উপর ওভারলে হিসেবে খোলে */
          fixed inset-y-0 left-0 z-50 w-64 shadow-2xl
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          /* md এবং তার বড় স্ক্রিন থেকে: normal flow-এর অংশ, কোলাপ্সিবল উইডথ */
          md:relative md:z-auto md:shadow-none md:translate-x-0 md:w-auto
          ${!isCollapsed ? 'md:w-44 lg:w-48' : 'md:w-12'}
        `}
      >
        {/* মোবাইল ড্রয়ারের নিজস্ব হেডার (বন্ধ করার ক্রস বাটনসহ) */}
        <div className="md:hidden flex items-center justify-between px-4 h-12 border-b border-border shrink-0">
          <span className="font-display font-semibold text-primary">মেনু</span>
          <button
            onClick={onMobileClose}
            aria-label="Close menu"
            className="text-muted hover:text-accent"
          >
            <IoCloseOutline className="text-2xl" />
          </button>
        </div>

        {/* টগল বাটনটি শুধুমাত্র md এবং তার বড় স্ক্রিনে দেখাবে */}
        <div className="hidden md:block">
          <ToggleButton
            isCollapsed={isCollapsed}
            onToggle={() => setIsCollapsed(!isCollapsed)}
          />
        </div>

        {/* মোবাইলে নিজস্ব হেডার থাকায় pt লাগবে না, ডেস্কে pt-10 */}
        <nav className="pt-2 md:pt-10 px-2 h-full overflow-y-auto">
          <Language isCollapsed={isCollapsed} items={items} />
        </nav>
      </aside>
    </>
  )
}

export default SidebarWrapper
