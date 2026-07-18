'use client'

import { Star, ArrowRight, Code2, Palette } from 'lucide-react'
import { FaFacebook } from 'react-icons/fa6'

type Course = {
  id: string
  badgeLeft: { text: string; variant: 'hot' | 'new' | 'trending' }
  badgeRight: string
  title: string
  instructor: string
  rating: number
  reviews: number
  price: number
  oldPrice: number
  icon: React.ReactNode
  industry: 'tech' | 'design' | 'business' | 'language' | 'science' | 'arts'
  featured?: boolean
}

const categories = [
  'সব কোর্স',
  'প্রোগ্রামিং',
  'গ্রাফিক ডিজাইন',
  'ডিজিটাল মার্কেটিং',
  'ফ্রিল্যান্সিং',
  'ইংরেজি',
  'ব্যবসা',
]

const courses: Course[] = [
  {
    id: '1',
    badgeLeft: { text: 'জনপ্রিয়', variant: 'hot' },
    badgeRight: 'বিগিনার',
    title: 'পাইথন প্রোগ্রামিং — শূন্য থেকে এক্সপার্ট',
    instructor: 'রহিম উদ্দিন স্যার • সফটওয়্যার ইঞ্জিনিয়ার, গুগল',
    rating: 5,
    reviews: 1894,
    price: 999,
    oldPrice: 2499,
    icon: <Code2 size={36} className="text-white/80" />,
    industry: 'tech',
  },
  {
    id: '2',
    badgeLeft: { text: 'নতুন', variant: 'new' },
    badgeRight: 'সব লেভেল',
    title: 'Adobe Illustrator — প্রফেশনাল গ্রাফিক ডিজাইন',
    instructor: 'নাফিসা আক্তার ম্যাম • ক্রিয়েটিভ ডিরেক্টর',
    rating: 5,
    reviews: 2345,
    price: 1299,
    oldPrice: 3000,
    icon: <Palette size={36} className="text-white/80" />,
    industry: 'design',
    featured: true,
  },
  {
    id: '3',
    badgeLeft: { text: 'ট্রেন্ডিং', variant: 'trending' },
    badgeRight: 'ইন্টারমিডিয়েট',
    title: 'ডিজিটাল মার্কেটিং মাস্টারক্লাস ২০২৬',
    instructor: 'করিম ভাই • Meta Certified Marketer',
    rating: 4,
    reviews: 987,
    price: 799,
    oldPrice: 1999,
    icon: <FaFacebook size={36} className="text-white/80" />,
    industry: 'business',
  },
  {
    id: '4',
    badgeLeft: { text: 'ট্রেন্ডিং', variant: 'trending' },
    badgeRight: 'ইন্টারমিডিয়েট',
    title: 'ডিজিটাল মার্কেটিং মাস্টারক্লাস ২০২৬',
    instructor: 'করিম ভাই • Meta Certified Marketer',
    rating: 4,
    reviews: 987,
    price: 799,
    oldPrice: 1999,
    icon: <FaFacebook size={36} className="text-white/80" />,
    industry: 'business',
  },
]

// স্ট্যাটাস ব্যাজ (হট/নতুন/ট্রেন্ডিং) — global.css-এর সেমান্টিক
// color token (--success/--danger/--info) থেকে রঙ নেয়, industry
// রঙের সাথে গুলিয়ে না ফেলার জন্য আলাদা রাখা হয়েছে।
function badgeClasses(variant: Course['badgeLeft']['variant']) {
  switch (variant) {
    case 'hot':
      return 'bg-danger/10 text-danger'
    case 'new':
      return 'bg-success/10 text-success'
    case 'trending':
      return 'bg-info/10 text-info'
  }
}

function CourseCard({ course }: { course: Course }) {
  return (
    <div
      className={`rounded-xl bg-card overflow-hidden border ${
        course.featured ? 'border-accent' : 'border-border'
      }`}
    >
      {/* আইকন-স্ট্রিপের রঙ সরাসরি global.css-এর --industry-<key>
          ভ্যারিয়েবল থেকে আসে, তাই নতুন industry যোগ করলে এখানে
          কোনো কোড না বদলেও কার্ড অটোমেটিক ঠিক রঙ পাবে। */}
      <div
        className="h-[90px] flex items-center justify-center"
        style={{ background: `var(--industry-${course.industry})` }}
      >
        {course.icon}
      </div>

      <div className="p-3">
        <div className="flex gap-1.5 mb-2">
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded ${badgeClasses(
              course.badgeLeft.variant
            )}`}
          >
            {course.badgeLeft.text}
          </span>
          <span className="label" data-industry={course.industry}>
            {course.badgeRight}
          </span>
        </div>

        <h3 className="text-[13px] font-semibold text-foreground leading-snug mb-1">
          {course.title}
        </h3>
        <p className="text-[11px] text-muted mb-1.5">{course.instructor}</p>

        <div className="flex items-center gap-1 mb-2">
          <div className="flex text-accent">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                fill={i < course.rating ? 'currentColor' : 'none'}
                strokeWidth={i < course.rating ? 0 : 1.5}
              />
            ))}
          </div>
          <span className="text-[10px] text-muted">
            ({course.reviews.toLocaleString('bn-BD')} রিভিউ)
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div>
            <span className="text-sm font-bold text-primary">
              ৳{course.price.toLocaleString('bn-BD')}
            </span>
            <span className="text-[11px] text-muted line-through ml-1">
              ৳{course.oldPrice.toLocaleString('bn-BD')}
            </span>
          </div>
          <button className="text-[11px] font-semibold bg-primary text-primary-foreground rounded-md px-2.5 py-1 hover:bg-accent hover:text-accent-foreground transition-colors">
            ভর্তি হও
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Course() {
  return (
    <section className="bg-background py-10 px-7">
      <div className="text-center mb-7 max-w-md mx-auto">
        <p className="text-[11px] font-bold text-accent tracking-widest uppercase mb-1.5">
          জনপ্রিয় কোর্সসমূহ
        </p>
        <h2 className="font-display text-[22px] font-semibold text-foreground mb-2">
          তোমার পছন্দের বিষয় বেছে নাও
        </h2>
        <p className="text-[13px] text-muted leading-relaxed">
          প্রতিটি কোর্স বাংলায় তৈরি, শিল্প-বিশেষজ্ঞদের দ্বারা পরিকল্পিত
        </p>
      </div>

      <div className="flex gap-1.5 flex-wrap mb-5">
        {categories.map((cat, i) => (
          <button
            key={cat}
            className={`text-xs font-medium px-3.5 py-1.5 rounded-full border transition-colors ${
              i === 0
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card text-muted border-border hover:border-primary/40 hover:text-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      <div className="text-center mt-5">
        <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary border-2 border-primary rounded-lg px-5 py-2.5 hover:bg-primary/10 transition-colors">
          সব কোর্স দেখুন <ArrowRight size={16} />
        </button>
      </div>
    </section>
  )
}
