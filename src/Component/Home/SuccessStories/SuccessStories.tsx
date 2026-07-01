'use client'
import Image from 'next/image'
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
    initials: 'https://i.ibb.co.com/k21ppQLH/agent-02.jpg',
    role: 'Software Engineer',
    companyOrPlatform: 'Google Singapore',
    description:
      'পাইথন ও মেশিন লার্নিং কোর্স করার ২ বছরের মধ্যে গুগলে জব পেয়েছেন।',
    badgeText: 'বার্ষিক আয় : ৬০ লক্ষ+',
    initialsBgColor: 'bg-[#155e2f] text-white', // Dark green matching image
  },
  {
    id: 2,
    name: 'তানিয়া আক্তার',
    initials: 'https://i.ibb.co.com/k21ppQLH/agent-02.jpg',
    role: 'ফ্রিল্যান্স ডিজাইনার',
    companyOrPlatform: 'Upwork Top Rated',
    description:
      'গ্রাফিক ডিজাইন কোর্স করে ঘরে বসেই মাসে ৮০,০০০+ টাকা আয় করছেন।',
    badgeText: 'Top Rated Plus Freelancer',
    initialsBgColor: 'bg-[#b46d05] text-white', // Amber matching image
  },
  {
    id: 3,
    name: 'তানিয়া আক্তার',
    initials: 'https://i.ibb.co.com/k21ppQLH/agent-02.jpg',
    role: 'ফ্রিল্যান্স ডিজাইনার',
    companyOrPlatform: 'Upwork Top Rated',
    description:
      'গ্রাফিক ডিজাইন কোর্স করে ঘরে বসেই মাসে ৮০,০০০+ টাকা আয় করছেন।',
    badgeText: 'Top Rated Plus Freelancer',
    initialsBgColor: 'bg-[#b46d05] text-white', // Amber matching image
  },
  {
    id: 4,
    name: 'তানিয়া আক্তার',
    initials: 'https://i.ibb.co.com/k21ppQLH/agent-02.jpg',
    role: 'ফ্রিল্যান্স ডিজাইনার',
    companyOrPlatform: 'Upwork Top Rated',
    description:
      'গ্রাফিক ডিজাইন কোর্স করে ঘরে বসেই মাসে ৮০,০০০+ টাকা আয় করছেন।',
    badgeText: 'Top Rated Plus Freelancer',
    initialsBgColor: 'bg-[#b46d05] text-white', // Amber matching image
  },
  {
    id: 5,
    name: 'তানিয়া আক্তার',
    initials: 'https://i.ibb.co.com/k21ppQLH/agent-02.jpg',
    role: 'ফ্রিল্যান্স ডিজাইনার',
    companyOrPlatform: 'Upwork Top Rated',
    description:
      'গ্রাফিক ডিজাইন কোর্স করে ঘরে বসেই মাসে ৮০,০০০+ টাকা আয় করছেন।',
    badgeText: 'Top Rated Plus Freelancer',
    initialsBgColor: 'bg-[#b46d05] text-white', // Amber matching image
  },
  {
    id: 6,
    name: 'তানিয়া আক্তার',
    initials: 'https://i.ibb.co.com/k21ppQLH/agent-02.jpg',
    role: 'ফ্রিল্যান্স ডিজাইনার',
    companyOrPlatform: 'Upwork Top Rated',
    description:
      'গ্রাফিক ডিজাইন কোর্স করে ঘরে বসেই মাসে ৮০,০০০+ টাকা আয় করছেন।',
    badgeText: 'Top Rated Plus Freelancer',
    initialsBgColor: 'bg-[#b46d05] text-white', // Amber matching image
  },
  {
    id: 7,
    name: 'তানিয়া আক্তার',
    initials: 'https://i.ibb.co.com/k21ppQLH/agent-02.jpg',
    role: 'ফ্রিল্যান্স ডিজাইনার',
    companyOrPlatform: 'Upwork Top Rated',
    description:
      'গ্রাফিক ডিজাইন কোর্স করে ঘরে বসেই মাসে ৮০,০০০+ টাকা আয় করছেন।',
    badgeText: 'Top Rated Plus Freelancer',
    initialsBgColor: 'bg-[#b46d05] text-white', // Amber matching image
  },
  {
    id: 8,
    name: 'তানিয়া আক্তার',
    initials: 'https://i.ibb.co.com/k21ppQLH/agent-02.jpg',
    role: 'ফ্রিল্যান্স ডিজাইনার',
    companyOrPlatform: 'Upwork Top Rated',
    description:
      'গ্রাফিক ডিজাইন কোর্স করে ঘরে বসেই মাসে ৮০,০০০+ টাকা আয় করছেন।',
    badgeText: 'Top Rated Plus Freelancer',
    initialsBgColor: 'bg-[#b46d05] text-white', // Amber matching image
  },
  {
    id: 9,
    name: 'তানিয়া আক্তার',
    initials: 'https://i.ibb.co.com/k21ppQLH/agent-02.jpg',
    role: 'ফ্রিল্যান্স ডিজাইনার',
    companyOrPlatform: 'Upwork Top Rated',
    description:
      'গ্রাফিক ডিজাইন কোর্স করে ঘরে বসেই মাসে ৮০,০০০+ টাকা আয় করছেন।',
    badgeText: 'Top Rated Plus Freelancer',
    initialsBgColor: 'bg-[#b46d05] text-white', // Amber matching image
  },
]

// Top row = even IDs (moves left -> right), Bottom row = odd IDs (moves right -> left)
const evenRow = successData.filter((a) => a.id % 2 === 0)
const oddRow = successData.filter((a) => a.id % 2 !== 0)

const StoryCard = ({
  alum,
  tailSide = 'left',
}: {
  alum: AlumStory
  tailSide?: 'left' | 'right'
}) => (
  <div
    className={`relative bg-[#1f2937] border border-gray-700/60 rounded-2xl p-6 flex items-start gap-4 shadow-md w-[320px] sm:w-[360px] flex-shrink-0 ${
      tailSide === 'left' ? 'rounded-tl-sm' : 'rounded-tr-sm'
    }`}
  >
    {tailSide === 'left' ? (
      <>
        {/* Chat bubble tail (left) — border layer */}
        <span
          aria-hidden="true"
          className="absolute top-0 left-0 -translate-x-[11px] -translate-y-px w-0 h-0
            border-t-[11px] border-t-transparent
            border-r-[12px] border-r-gray-700/60
            border-b-[11px] border-b-transparent"
        />
        {/* Chat bubble tail (left) — fill layer */}
        <span
          aria-hidden="true"
          className="absolute top-0 left-0 -translate-x-[9px] -translate-y-px w-0 h-0
            border-t-[9px] border-t-transparent
            border-r-[10px] border-r-[#1f2937]
            border-b-[9px] border-b-transparent"
        />
      </>
    ) : (
      <>
        {/* Chat bubble tail (right) — border layer */}
        <span
          aria-hidden="true"
          className="absolute top-0 right-0 translate-x-[11px] -translate-y-px w-0 h-0
            border-t-[11px] border-t-transparent
            border-l-[12px] border-l-gray-700/60
            border-b-[11px] border-b-transparent"
        />
        {/* Chat bubble tail (right) — fill layer */}
        <span
          aria-hidden="true"
          className="absolute top-0 right-0 translate-x-[9px] -translate-y-px w-0 h-0
            border-t-[9px] border-t-transparent
            border-l-[10px] border-l-[#1f2937]
            border-b-[9px] border-b-transparent"
        />
      </>
    )}

    {/* Initials Avatar Block */}
    <div
      className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0 select-none shadow-md ${alum.initialsBgColor}`}
    >
      <Image
        src={alum.initials}
        alt={alum.name}
        width={36}
        height={36}
        className="w-full h-full object-cover rounded-full"
      />
    </div>

    {/* Information Metadata */}
    <div className="flex-1 min-w-0">
      <h3 className="text-lg font-bold text-white mb-1">{alum.name}</h3>
      <p className="text-xs sm:text-sm text-amber-500 font-medium mb-2">
        {alum.role} —{' '}
        <span className="text-amber-500/90">{alum.companyOrPlatform}</span>
      </p>
      <p className="text-sm text-gray-400 leading-relaxed">
        {alum.description}
      </p>
    </div>
  </div>
)

const MarqueeRow = ({
  items,
  direction,
}: {
  items: AlumStory[]
  direction: 'ltr' | 'rtl'
}) => {
  // Duplicate the row so the loop is seamless
  const looped = [...items, ...items]
  // Tail sits on the trailing edge relative to travel direction
  const tailSide = direction === 'ltr' ? 'right' : 'left'
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={`flex gap-6 w-max ${
          direction === 'ltr' ? 'animate-marquee-ltr' : 'animate-marquee-rtl'
        } hover:[animation-play-state:paused]`}
      >
        {looped.map((alum, idx) => (
          <StoryCard
            key={`${alum.id}-${idx}`}
            alum={alum}
            tailSide={tailSide}
          />
        ))}
      </div>
    </div>
  )
}

const SuccessStories = () => {
  return (
    <div className="bg-white dark:bg-slate-950 flex justify-center items-center">
      {/* Main Container Layer */}
      <div className="w-full rounded-3xl border border-gray-800/40 shadow-xl text-center py-10">
        {/* Section Headings */}
        <span className="text-amber-500 font-medium text-sm sm:text-base tracking-wide block mb-2">
          সাফল্যের গল্প
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-10 tracking-tight">
          আমাদের অ্যালামনাইরা আজ কোথায়?
        </h2>

        {/* Two infinite marquee rows, opposite directions */}
        <div className="flex flex-col gap-6">
          <MarqueeRow items={evenRow} direction="ltr" />
          <MarqueeRow items={oddRow} direction="rtl" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee-ltr {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        @keyframes marquee-rtl {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee-ltr {
          animation: marquee-ltr 30s linear infinite;
        }
        .animate-marquee-rtl {
          animation: marquee-rtl 30s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default SuccessStories
