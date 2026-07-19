'use client'
import React, { useState } from 'react'
import { SidebarItem } from './sidebar'
import SidebarWrapper from './SidebarWrapper'
import '../../app/globals.css'
import Footer from '../Footer/Footer'
import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5'

interface ReusableLayoutProps {
  children: React.ReactNode
  items: SidebarItem[]
  title?: string
}

const ReusableLayout = ({ children, items }: ReusableLayoutProps) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col font-body">
      <header className="h-8 sm:h-9 bg-card/95 backdrop-blur text-foreground flex items-center overflow-hidden shrink-0">
        <button
          onClick={() => setMobileSidebarOpen((p) => !p)}
          aria-label="Toggle menu"
          className="md:hidden shrink-0 h-full px-2.5 flex items-center justify-center text-foreground hover:opacity-80 transition-opacity"
        >
          {mobileSidebarOpen ? (
            <IoCloseOutline className="text-lg" />
          ) : (
            <IoMenuOutline className="text-lg" />
          )}
        </button>

        {/* marquee-র জন্য আলাদা overflow-hidden wrapper */}
        <div className="flex-1 overflow-hidden">
          <h1 className="text-xs sm:text-sm md:text-base font-semibold whitespace-nowrap inline-block animate-marquee px-2">
            ⚽FIFA প্রথম গোল: মেক্সিকোর জুলিয়ান কুইনোনেস(৯ম মিনিট, বনাম দক্ষিণ
            আফ্রিকা) 🎯 &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; 🏆 প্রথম
            হ্যাটট্রিক: লিওনেল মেসি (আর্জেন্টিনা বনাম আলজেরিয়া, ৩-০) —
            বিশ্বকাপে তাঁর প্রথম হ্যাটট্রিক এবং ১৬তম গোলে Klose-এর রেকর্ড
            স্পর্শ!
          </h1>
        </div>
      </header>

      <div className="flex flex-col md:flex-row flex-1 relative">
        <SidebarWrapper
          items={items}
          mobileOpen={mobileSidebarOpen}
          onMobileClose={() => setMobileSidebarOpen(false)}
        />

        <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden">
          <div className="w-full">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default ReusableLayout
