'use client'
import Image from 'next/image'
import React from 'react'

interface AlumStory {
  id: number
  name: string
  photo: string
  role: string
  companyOrPlatform: string
  description: string
  badgeText: string
  industry: 'tech' | 'design' | 'business' | 'language' | 'science' | 'arts'
}

const successData: AlumStory[] = [
  {
    id: 1,
    name: 'সাকিব আলম',
    photo: 'https://i.ibb.co.com/k21ppQLH/agent-02.jpg',
    role: 'Software Engineer',
    companyOrPlatform: 'Google Singapore',
    description:
      'পাইথন ও মেশিন লার্নিং কোর্স করার ২ বছরের মধ্যে গুগলে জব পেয়েছেন।',
    badgeText: 'বার্ষিক আয় : ৬০ লক্ষ+',
    industry: 'tech',
  },
  {
    id: 2,
    name: 'তানিয়া আক্তার',
    photo: 'https://i.ibb.co.com/k21ppQLH/agent-02.jpg',
    role: 'ফ্রিল্যান্স ডিজাইনার',
    companyOrPlatform: 'Upwork Top Rated',
    description:
      'গ্রাফিক ডিজাইন কোর্স করে ঘরে বসেই মাসে ৮০,০০০+ টাকা আয় করছেন।',
    badgeText: 'Top Rated Plus Freelancer',
    industry: 'design',
  },
  {
    id: 3,
    name: 'তানিয়া আক্তার',
    photo: 'https://i.ibb.co.com/k21ppQLH/agent-02.jpg',
    role: 'ফ্রিল্যান্স ডিজাইনার',
    companyOrPlatform: 'Upwork Top Rated',
    description:
      'গ্রাফিক ডিজাইন কোর্স করে ঘরে বসেই মাসে ৮০,০০০+ টাকা আয় করছেন।',
    badgeText: 'Top Rated Plus Freelancer',
    industry: 'design',
  },
  {
    id: 4,
    name: 'তানিয়া আক্তার',
    photo: 'https://i.ibb.co.com/k21ppQLH/agent-02.jpg',
    role: 'ফ্রিল্যান্স ডিজাইনার',
    companyOrPlatform: 'Upwork Top Rated',
    description:
      'গ্রাফিক ডিজাইন কোর্স করে ঘরে বসেই মাসে ৮০,০০০+ টাকা আয় করছেন।',
    badgeText: 'Top Rated Plus Freelancer',
    industry: 'design',
  },
  {
    id: 5,
    name: 'তানিয়া আক্তার',
    photo: 'https://i.ibb.co.com/k21ppQLH/agent-02.jpg',
    role: 'ফ্রিল্যান্স ডিজাইনার',
    companyOrPlatform: 'Upwork Top Rated',
    description:
      'গ্রাফিক ডিজাইন কোর্স করে ঘরে বসেই মাসে ৮০,০০০+ টাকা আয় করছেন।',
    badgeText: 'Top Rated Plus Freelancer',
    industry: 'design',
  },
  {
    id: 6,
    name: 'তানিয়া আক্তার',
    photo: 'https://i.ibb.co.com/k21ppQLH/agent-02.jpg',
    role: 'ফ্রিল্যান্স ডিজাইনার',
    companyOrPlatform: 'Upwork Top Rated',
    description:
      'গ্রাফিক ডিজাইন কোর্স করে ঘরে বসেই মাসে ৮০,০০০+ টাকা আয় করছেন।',
    badgeText: 'Top Rated Plus Freelancer',
    industry: 'design',
  },
  {
    id: 7,
    name: 'তানিয়া আক্তার',
    photo: 'https://i.ibb.co.com/k21ppQLH/agent-02.jpg',
    role: 'ফ্রিল্যান্স ডিজাইনার',
    companyOrPlatform: 'Upwork Top Rated',
    description:
      'গ্রাফিক ডিজাইন কোর্স করে ঘরে বসেই মাসে ৮০,০০০+ টাকা আয় করছেন।',
    badgeText: 'Top Rated Plus Freelancer',
    industry: 'design',
  },
  {
    id: 8,
    name: 'তানিয়া আক্তার',
    photo: 'https://i.ibb.co.com/k21ppQLH/agent-02.jpg',
    role: 'ফ্রিল্যান্স ডিজাইনার',
    companyOrPlatform: 'Upwork Top Rated',
    description:
      'গ্রাফিক ডিজাইন কোর্স করে ঘরে বসেই মাসে ৮০,০০০+ টাকা আয় করছেন।',
    badgeText: 'Top Rated Plus Freelancer',
    industry: 'design',
  },
  {
    id: 9,
    name: 'তানিয়া আক্তার',
    photo: 'https://i.ibb.co.com/k21ppQLH/agent-02.jpg',
    role: 'ফ্রিল্যান্স ডিজাইনার',
    companyOrPlatform: 'Upwork Top Rated',
    description:
      'গ্রাফিক ডিজাইন কোর্স করে ঘরে বসেই মাসে ৮০,০০০+ টাকা আয় করছেন।',
    badgeText: 'Top Rated Plus Freelancer',
    industry: 'design',
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
}) => {
  // Avatar ring + role text reuse the same --industry-<key> source
  // of truth as Course.tsx and InstructorSection.tsx.
  const industryVar = `var(--industry-${alum.industry})`

  return (
    <div
      className={`relative bg-card border border-border rounded-2xl p-6 flex items-start gap-4 shadow-md w-[320px] sm:w-[360px] flex-shrink-0 ${
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
              border-r-[12px] border-r-border
              border-b-[11px] border-b-transparent"
          />
          {/* Chat bubble tail (left) — fill layer */}
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 -translate-x-[9px] -translate-y-px w-0 h-0
              border-t-[9px] border-t-transparent
              border-r-[10px] border-r-card
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
              border-l-[12px] border-l-border
              border-b-[11px] border-b-transparent"
          />
          {/* Chat bubble tail (right) — fill layer */}
          <span
            aria-hidden="true"
            className="absolute top-0 right-0 translate-x-[9px] -translate-y-px w-0 h-0
              border-t-[9px] border-t-transparent
              border-l-[10px] border-l-card
              border-b-[9px] border-b-transparent"
          />
        </>
      )}

      {/* Avatar */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center font-semibold text-xl flex-shrink-0 select-none shadow-md border-[3px]"
        style={{
          borderColor: `color-mix(in oklab, ${industryVar} 55%, transparent)`,
        }}
      >
        <Image
          src={alum.photo}
          alt={alum.name}
          width={36}
          height={36}
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* Information Metadata */}
      <div className="flex-1 min-w-0">
        <h3 className="font-display text-lg font-semibold text-foreground mb-1">
          {alum.name}
        </h3>
        <p
          className="text-xs sm:text-sm font-medium mb-2"
          style={{ color: industryVar }}
        >
          {alum.role} —{' '}
          <span className="opacity-90">{alum.companyOrPlatform}</span>
        </p>
        <p className="text-sm text-muted leading-relaxed">{alum.description}</p>
      </div>
    </div>
  )
}

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
    <div className="bg-background flex justify-center items-center">
      {/* Main Container Layer */}
      <div className="w-full rounded-3xl text-center py-10">
        {/* Section Headings */}
        <span className="text-accent font-medium text-sm sm:text-base tracking-wide block mb-2">
          সাফল্যের গল্প
        </span>
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-foreground mb-10 tracking-tight">
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
