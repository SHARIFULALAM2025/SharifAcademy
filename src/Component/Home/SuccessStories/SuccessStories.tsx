'use client'
import React from 'react'

interface AlumStory {
  id: number
  name: string
  initials: string
  role: string
  companyOrPlatform: string
  description: string
  badgeText: string
  initialsBgColor: string
}

const successData: AlumStory[] = [
  {
    id: 1,
    name: 'সাকিব আলম',
    initials: 'সা',
    role: 'Software Engineer',
    companyOrPlatform: 'Google Singapore',
    description:
      'পাইথন ও মেশিন লার্নিং কোর্স করার ২ বছরের মধ্যে গুগলে জব পেয়েছেন।',
    badgeText: 'বার্ষিক আয় : ৬০ লক্ষ+',
    initialsBgColor: 'bg-[#155e2f] text-white', // Dark green matching image
  },
  {
    id: 2,
    name: 'তানিয়া আক্তার',
    initials: 'তা',
    role: 'ফ্রিল্যান্স ডিজাইনার',
    companyOrPlatform: 'Upwork Top Rated',
    description:
      'গ্রাফিক ডিজাইন কোর্স করে ঘরে বসেই মাসে ৮০,০০০+ টাকা আয় করছেন।',
    badgeText: 'Top Rated Plus Freelancer',
    initialsBgColor: 'bg-[#b46d05] text-white', // Amber matching image
  },
]

const SuccessStories = () => {
  return (
    <div className="bg-white dark:bg-slate-950 p-6 sm:p-12 flex justify-center items-center">
      {/* Main Container Layer */}
      <div className="w-full max-w-5xl bg-[#111827] rounded-3xl p-8 sm:p-12 border border-gray-800/40 shadow-xl text-center">
        {/* Section Headings */}
        <span className="text-amber-500 font-medium text-sm sm:text-base tracking-wide block mb-2">
          সাফল্যের গল্প
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-10 tracking-tight">
          আমাদের অ্যালামনাইরা আজ কোথায়?
        </h2>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {successData.map((alum) => (
            <div
              key={alum.id}
              className="bg-[#1f2937]/50 border border-gray-700/30 rounded-2xl p-6 flex items-start gap-4 hover:border-gray-600/40 transition-all duration-300"
            >
              {/* Initials Avatar Block */}
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0 select-none shadow-md ${alum.initialsBgColor}`}
              >
                {alum.initials}
              </div>

              {/* Information Metadata */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-white mb-1">
                  {alum.name}
                </h3>
                <p className="text-xs sm:text-sm text-amber-500 font-medium mb-2">
                  {alum.role} —{' '}
                  <span className="text-amber-500/90">
                    {alum.companyOrPlatform}
                  </span>
                </p>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  {alum.description}
                </p>

                {/* Pill Badge Container */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {alum.badgeText}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SuccessStories
