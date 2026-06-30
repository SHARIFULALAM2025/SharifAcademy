'use client'

import { Star, Users } from 'lucide-react'

type Instructor = {
  id: string
  initials: string
  name: string
  role: string
  credential: string
  rating: number
  students: string
  avatarBg: string
  avatarText: string
  avatarBorder: string
}

const instructors: Instructor[] = [
  {
    id: '1',
    initials: 'রউ',
    name: 'রহিম উদ্দিন',
    role: 'প্রোগ্রামিং বিশেষজ্ঞ',
    credential: 'Google, ১২ বছর অভিজ্ঞতা',
    rating: 4.9,
    students: '২০,৩০০+',
    avatarBg: 'bg-emerald-50',
    avatarText: 'text-emerald-700',
    avatarBorder: 'border-emerald-700',
  },
  {
    id: '2',
    initials: 'না',
    name: 'নাফিসা আক্তার',
    role: 'গ্রাফিক ডিজাইন',
    credential: 'Creative Director, ৮ বছর',
    rating: 4.8,
    students: '১৫,৮০০+',
    avatarBg: 'bg-blue-50',
    avatarText: 'text-blue-700',
    avatarBorder: 'border-blue-700',
  },
  {
    id: '3',
    initials: 'কভ',
    name: 'করিম ভাই',
    role: 'ডিজিটাল মার্কেটিং',
    credential: 'Meta Certified, ১০ বছর',
    rating: 4.7,
    students: '১৮,৫০০+',
    avatarBg: 'bg-amber-50',
    avatarText: 'text-amber-700',
    avatarBorder: 'border-amber-500',
  },
  {
    id: '4',
    initials: 'সম',
    name: 'সামিয়া মৌ',
    role: 'ইংরেজি ভাষাশিক্ষা',
    credential: 'IELTS 8.5, Cambridge',
    rating: 4.9,
    students: '২২,০০০+',
    avatarBg: 'bg-rose-50',
    avatarText: 'text-rose-700',
    avatarBorder: 'border-rose-700',
  },
]

function InstructorCard({ instructor }: { instructor: Instructor }) {
  return (
    <div className="rounded-xl bg-white border border-slate-200 p-4 text-center">
      <div
        className={`w-16 h-16 rounded-full mx-auto mb-2.5 flex items-center justify-center text-[22px] font-bold border-[3px] ${instructor.avatarBg} ${instructor.avatarText} ${instructor.avatarBorder}`}
      >
        {instructor.initials}
      </div>

      <h3 className="text-[13px] font-bold text-slate-800 mb-0.5">
        {instructor.name}
      </h3>
      <p className="text-[11px] font-semibold text-emerald-700 mb-1">
        {instructor.role}
      </p>
      <p className="text-[10px] text-slate-400 mb-1">{instructor.credential}</p>

      <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400">
        <Star size={11} className="text-amber-400" fill="currentColor" />
        <span>{instructor.rating}</span>
        <span className="mx-0.5">•</span>
        <Users size={11} />
        <span>{instructor.students} শিক্ষার্থী</span>
      </div>
    </div>
  )
}

export default function InstructorSection() {
  return (
    <section className="bg-white dark:bg-slate-950 py-12 px-7">
      <div className="text-center mb-8 max-w-lg mx-auto">
        <p className="text-[11px] font-bold text-emerald-700 tracking-widest uppercase mb-1.5">
          আমাদের শিক্ষকমণ্ডলী
        </p>
        <h2 className="text-[22px] font-bold text-slate-800 mb-2">
          শিল্পের সেরা বিশেষজ্ঞদের কাছ থেকে শেখো
        </h2>
        <p className="text-[13px] text-slate-500 leading-relaxed">
          আমাদের সব শিক্ষক নিজ নিজ শিল্পে বছরের পর বছরের অভিজ্ঞতাসম্পন্ন পেশাদার
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-4xl mx-auto">
        {instructors.map((instructor) => (
          <InstructorCard key={instructor.id} instructor={instructor} />
        ))}
      </div>
    </section>
  )
}
