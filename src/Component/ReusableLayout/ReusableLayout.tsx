'use client'

import React, { useState } from 'react'
import { SidebarItem } from './sidebar'
import SidebarWrapper from './SidebarWrapper'
import '../../app/globals.css'
import Footer from '../Footer/Footer'

interface ReusableLayoutProps {
  children: React.ReactNode
  items: SidebarItem[]
  title?: string
}

const ReusableLayout = ({ children, items }: ReusableLayoutProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const toggleSidebar = () => setIsMobileOpen(!isMobileOpen)
  const closeSidebar = () => setIsMobileOpen(false)

  return (
    <div className="min-h-screen flex flex-col font-body">
      {/* টিকার হেডার */}
      <header className="h-8 sm:h-9 bg-accent flex items-center overflow-hidden px-2 gap-2">
        {/* মোবাইল ও ট্যাবলেটের জন্য হ্যামবার্গার বাটন (md স্ক্রিনে হাইড হয়ে যাবে) */}
        <button
          onClick={toggleSidebar}
          className="md:hidden text-accent-foreground p-1 text-sm sm:text-base focus:outline-none hover:bg-black/10 rounded transition-colors"
          aria-label="Toggle Menu"
        >
          ☰
        </button>

        <h1 className="text-accent-foreground text-xs sm:text-sm md:text-base font-semibold whitespace-nowrap inline-block animate-marquee">
          ⚽FIFA প্রথম গোল: মেক্সিকোর জুলিয়ান কুইনোনেস(৯ম মিনিট, বনাম দক্ষিণ
          আফ্রিকা) 🎯 &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; 🏆 প্রথম হ্যাটট্রিক:
          লিওনেল মেসি (আর্জেন্টিনা বনাম আলজেরিয়া, ৩-০) — বিশ্বকাপে তাঁর প্রথম
          হ্যাটট্রিক এবং ১৬তম গোলে Klose-এর রেকর্ড স্পর্শ!
        </h1>
      </header>

      <div className="flex flex-1 relative overflow-hidden">
        {/* মোবাইলের ব্যাকড্রপ/অন্ধকার পর্দা (সাইডবার খোলা থাকলে দেখাবে) */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
            onClick={closeSidebar}
          />
        )}

        {/* সাইডবার রেপার (মোবাইলে ড্রয়ার এবং ডেস্কটপে ইনলাইন) */}
        <div
          className={`
            fixed top-0 bottom-0 left-0 z-50 transform md:relative md:transform-none md:z-auto transition-transform duration-300 ease-in-out
            ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}
          onClick={(e) => {
            // লিংকে ক্লিক করলে যেন ড্রয়ার বন্ধ হয়ে যায় (ইভেন্ট বাবলিং এর মাধ্যমে)
            if ((e.target as HTMLElement).closest('a')) {
              closeSidebar()
            }
          }}
        >
          <SidebarWrapper items={items} />
        </div>

        {/* মেইন কনটেন্ট এরিয়া */}
        <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden">
          <div className="w-full">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default ReusableLayout
