'use client'
import React, { useEffect, useState } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { useTheme } from '../Provider/ThemeProvider'

const Darkened = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  if (!mounted) {
    return <div className="w-9 h-9 bg-card border border-border rounded-lg" />
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="px-3 py-2 rounded-lg bg-card border border-border text-foreground hover:ring-2 hover:ring-accent transition-all duration-200 cursor-pointer flex items-center justify-center"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <FiSun className="text-accent" />
      ) : (
        <FiMoon className="text-primary" />
      )}
    </button>
  )
}

export default Darkened
