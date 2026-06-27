import React from 'react'
import { SidebarItem } from './sidebar'
import SidebarWrapper from './SidebarWrapper'
import '../../app/globals.css'

interface ReusableLayoutProps {
  children: React.ReactNode
  items: SidebarItem[]
  title?: string
}

const ReusableLayout = ({
  children,
  items,

}: ReusableLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-green-200">
      <header className="h-8 bg-green-700 flex items-center overflow-hidden">
        <h1 className="text-white text-base font-semibold whitespace-nowrap inline-block animate-marquee">
          ⚽FIFA প্রথম গোল: মেক্সিকোর জুলিয়ান কুইনোনেস(৯ম মিনিট, বনাম দক্ষিণ
          আফ্রিকা) 🎯 &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; 🏆 প্রথম হ্যাটট্রিক:
          লিওনেল মেসি (আর্জেন্টিনা বনাম আলজেরিয়া, ৩-০) — বিশ্বকাপে তাঁর প্রথম
          হ্যাটট্রিক এবং ১৬তম গোলে Klose-এর রেকর্ড স্পর্শ!
        </h1>
      </header>

      <div className="flex flex-1 relative overflow-hidden">
        <SidebarWrapper items={items} />

        <main className="flex-1 overflow-y-auto ">
          <div>{children}</div>
        </main>
      </div>
    </div>
  )
}

export default ReusableLayout
