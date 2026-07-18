import React from 'react'
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
  return (
    <div className="min-h-screen flex flex-col font-body">
      <header className="h-8 sm:h-9 bg-accent flex items-center overflow-hidden">
        <h1 className="text-accent-foreground text-xs sm:text-sm md:text-base font-semibold whitespace-nowrap inline-block animate-marquee px-2">
          ⚽FIFA প্রথম গোল: মেক্সিকোর জুলিয়ান কুইনোনেস(৯ম মিনিট, বনাম দক্ষিণ
          আফ্রিকা) 🎯 &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; 🏆 প্রথম হ্যাটট্রিক:
          লিওনেল মেসি (আর্জেন্টিনা বনাম আলজেরিয়া, ৩-০) — বিশ্বকাপে তাঁর প্রথম
          হ্যাটট্রিক এবং ১৬তম গোলে Klose-এর রেকর্ড স্পর্শ!
        </h1>
      </header>

      <div className="flex flex-1 relative overflow-hidden">
        <SidebarWrapper items={items} />

        <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden">
          <div className="w-full">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default ReusableLayout
