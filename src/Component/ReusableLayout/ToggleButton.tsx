import React from 'react'
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md'

interface ToggleButtonProps {
  isCollapsed: boolean
  onToggle: () => void
}

const ToggleButton = ({ isCollapsed, onToggle }: ToggleButtonProps) => {
  return (
    <button
      onClick={onToggle}
      className="hidden md:flex items-center justify-center absolute -right-3 top-10 -translate-y-1/2 z-[45] bg-accent hover:opacity-90 text-accent-foreground p-1 rounded-full border border-border shadow-lg cursor-pointer transition-transform duration-300 focus:outline-none"
      aria-label="Toggle Sidebar"
    >
      <MdOutlineKeyboardDoubleArrowRight
        className={`text-lg transition-transform duration-300 ${
          isCollapsed ? '' : 'rotate-180'
        }`}
      />
    </button>
  )
}

export default ToggleButton
