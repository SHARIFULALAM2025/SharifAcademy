'use client'
import React from 'react'

interface Article {
  id: number
  category: string
  title: string
  readTime: string
  date: string
  // Styling configurations matching the layout
  themeColor: string // text color for category label
  bannerBg: string // top banner background
  iconPath: React.ReactNode
}

const articlesData: Article[] = [
  {
    id: 1,
    category: 'প্রোগ্রামিং:',
    title: '২০২৬ সালে কোন প্রোগ্রামিং ভাষা শেখা উচিত?',
    readTime: '৫ মিনিট',
    date: '০৫ জুন ২০২৬',
    themeColor: 'text-[#155e2f]',
    bannerBg: 'bg-[#edf7f1]',
    iconPath: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    ),
  },
  {
    id: 2,
    category: 'ক্যারিয়ার:',
    title: 'ফ্রিল্যান্সিং শুরু করার সম্পূর্ণ গাইড ২০২৬',
    readTime: '৮ মিনিট',
    date: '১০ জুন ২০২৬',
    themeColor: 'text-[#2563eb]',
    bannerBg: 'bg-[#eff6ff]',
    iconPath: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
  },
  {
    id: 3,
    category: 'মার্কেটিং:',
    title: 'ডিজিটাল মার্কেটিং দিয়ে ব্যবসা বাড়ানোর কৌশল',
    readTime: '৬ মিনিট',
    date: '০৫ জুন ২০২৬',
    themeColor: 'text-[#ea580c]',
    bannerBg: 'bg-[#fff7ed]',
    iconPath: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    ),
  },
  {
    id: 4,
    category: 'মার্কেটিং:',
    title: 'ডিজিটাল মার্কেটিং দিয়ে ব্যবসা বাড়ানোর কৌশল',
    readTime: '৬ মিনিট',
    date: '০৫ জুন ২০২৬',
    themeColor: 'text-[#ea580c]',
    bannerBg: 'bg-[#fff7ed]',
    iconPath: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    ),
  }
]

const BlogSection = () => {
  return (
    <div className="bg-[#f8fafc] dark:bg-slate-950 py-6 px-4 font-sans text-slate-800">
      <div className="">
        {/* Header Block */}
        <div className="text-center mb-10">
          <span className="text-[#155e2f] dark:text-white font-bold text-xs sm:text-sm tracking-wide block mb-2">
            ব্লগ ও রিসোর্স
          </span>
          <h2 className="text-2xl sm:text-3xl dark:text-white font-extrabold text-[#1e293b]">
            শিক্ষামূলক আর্টিকেল ও গাইড
          </h2>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-12">
          {articlesData.map((article) => (
            <div
              key={article.id}
              className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md transition-all duration-300"
            >
              <div>
                {/* Visual Top Accent/Icon Banner */}
                <div
                  className={`h-28 ${article.bannerBg} flex items-center justify-center transition-colors duration-300`}
                >
                  <svg
                    className={`w-8 h-8 ${article.themeColor}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {article.iconPath}
                  </svg>
                </div>

                {/* Content Block */}
                <div className="p-5 sm:p-6">
                  <span
                    className={`text-[11px] sm:text-xs font-bold tracking-wide block mb-1.5 ${article.themeColor}`}
                  >
                    {article.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-800 leading-snug tracking-tight hover:text-slate-600 transition-colors duration-200 cursor-pointer">
                    {article.title}
                  </h3>
                </div>
              </div>

              {/* Meta Details Footer Block */}
              <div className="px-5 sm:px-6 pb-5 flex items-center gap-4 text-[11px] font-semibold text-slate-400">
                {/* Read Time Container */}
                <div className="flex items-center gap-1">
                  <svg
                    className="w-3.5 h-3.5 stroke-[2.5]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{article.readTime}</span>
                </div>

                {/* Date Stamp */}
                <span>{article.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* View All Links Prompt matching the subtle bottom line layout */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-transparent hover:bg-white hover:text-[#064E3B] text-white border border-emerald-400/60 font-semibold px-8 py-3 rounded-xl transition-all duration-300 text-sx sm:text-base shadow-lg shadow-black/10 active:scale-95"
          >
            সব আর্টিকেল পড়ুন
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlogSection
