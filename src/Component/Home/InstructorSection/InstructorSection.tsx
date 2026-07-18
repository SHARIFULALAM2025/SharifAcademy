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
  industry: 'tech' | 'design' | 'business' | 'language' | 'science' | 'arts'
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
    industry: 'tech',
  },
  {
    id: '2',
    initials: 'না',
    name: 'নাফিসা আক্তার',
    role: 'গ্রাফিক ডিজাইন',
    credential: 'Creative Director, ৮ বছর',
    rating: 4.8,
    students: '১৫,৮০০+',
    industry: 'design',
  },
  {
    id: '3',
    initials: 'কভ',
    name: 'করিম ভাই',
    role: 'ডিজিটাল মার্কেটিং',
    credential: 'Meta Certified, ১০ বছর',
    rating: 4.7,
    students: '১৮,৫০০+',
    industry: 'business',
  },
  {
    id: '4',
    initials: 'সম',
    name: 'সামিয়া মৌ',
    role: 'ইংরেজি ভাষাশিক্ষা',
    credential: 'IELTS 8.5, Cambridge',
    rating: 4.9,
    students: '২২,০০০+',
    industry: 'language',
  },
]

const InstructorSection = () => {
  return (
    <section className="bg-background py-12 ">
      <div className="text-center mb-8">
        <p className="text-[11px] font-bold text-accent tracking-widest uppercase mb-1.5">
          আমাদের শিক্ষকমণ্ডলী
        </p>
        <h2 className="font-display text-[22px] font-semibold text-foreground mb-2">
          শিল্পের সেরা বিশেষজ্ঞদের কাছ থেকে শেখো
        </h2>
        <p className="text-[13px] text-muted leading-relaxed">
          আমাদের সব শিক্ষক নিজ নিজ শিল্পে বছরের পর বছরের অভিজ্ঞতাসম্পন্ন পেশাদার
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {instructors.map((instructor) => {
          // avatar আর role — দুটোই একই --industry-<key> ভ্যারিয়েবল
          // থেকে রঙ নেয়, যেটা Course.tsx-এও ব্যবহার হয়েছে। তাই
          // industry-র রঙ একবার global.css-এ বদলালে এখানেও বদলে যাবে।
          const industryVar = `var(--industry-${instructor.industry})`

          return (
            <div
              key={instructor.id}
              className="rounded-xl bg-card border border-border p-4 text-center"
            >
              <div
                className="w-16 h-16 rounded-full mx-auto mb-2.5 flex items-center justify-center text-[22px] font-semibold font-display border-[3px]"
                style={{
                  background: `color-mix(in oklab, ${industryVar} 14%, var(--card))`,
                  color: industryVar,
                  borderColor: `color-mix(in oklab, ${industryVar} 55%, transparent)`,
                }}
              >
                {instructor.initials}
              </div>

              <h3 className="text-[13px] font-semibold text-foreground mb-0.5">
                {instructor.name}
              </h3>
              <p
                className="text-[11px] font-semibold mb-1"
                style={{ color: industryVar }}
              >
                {instructor.role}
              </p>
              <p className="text-[10px] text-muted mb-1">
                {instructor.credential}
              </p>

              <div className="flex items-center justify-center gap-1 text-[10px] text-muted">
                <Star size={11} className="text-accent" fill="currentColor" />
                <span>{instructor.rating}</span>
                <span className="mx-0.5">•</span>
                <Users size={11} />
                <span>{instructor.students} শিক্ষার্থী</span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
export default InstructorSection
