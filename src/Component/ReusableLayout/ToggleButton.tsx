import React from 'react'
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md'

interface ToggleButtonProps {
  isCollapsed: boolean
  onToggle: () => void
}

const ToggleButton = ({ isCollapsed, onToggle }: ToggleButtonProps) => {
  return (
    <div>
      <button
        onClick={onToggle}
        className="absolute -right-3 top-1 bg-accent hover:opacity-90 text-accent-foreground p-1 rounded-full border-2 border-foreground shadow-lg cursor-pointer transition-transform duration-300 z-50"
        aria-label="Toggle Sidebar"
      >
        <MdOutlineKeyboardDoubleArrowRight
          className={`text-lg transition-transform duration-300 ${
            isCollapsed ? '' : 'rotate-180'
          }`}
        />
      </button>
    </div>
  )
}

export default ToggleButton
