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
  iconBg: string
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
    iconBg: 'bg-gradient-to-br from-emerald-700 to-emerald-500',
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
    iconBg: 'bg-gradient-to-br from-blue-700 to-blue-500',
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
    iconBg: 'bg-gradient-to-br from-amber-600 to-amber-400',
  },
]

function badgeClasses(variant: Course['badgeLeft']['variant']) {
  switch (variant) {
    case 'hot':
      return 'bg-orange-50 text-orange-700'
    case 'new':
      return 'bg-emerald-50 text-emerald-700'
    case 'trending':
      return 'bg-orange-50 text-orange-700'
  }
}

function CourseCard({ course }: { course: Course }) {
  return (
    <div
      className={`rounded-xl bg-white overflow-hidden border ${
        course.featured ? 'border-emerald-700' : 'border-slate-200'
      }`}
    >
      {course.featured && (
        <div className="bg-emerald-700 text-center py-1">
          <span className="text-[10px] font-bold text-amber-400">
            ★ সর্বাধিক বিক্রিত
          </span>
        </div>
      )}

      <div
        className={`h-[90px] flex items-center justify-center ${course.iconBg}`}
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
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
            {course.badgeRight}
          </span>
        </div>

        <h3 className="text-[13px] font-semibold text-slate-800 leading-snug mb-1">
          {course.title}
        </h3>
        <p className="text-[11px] text-slate-500 mb-1.5">{course.instructor}</p>

        <div className="flex items-center gap-1 mb-2">
          <div className="flex text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                fill={i < course.rating ? 'currentColor' : 'none'}
                strokeWidth={i < course.rating ? 0 : 1.5}
              />
            ))}
          </div>
          <span className="text-[10px] text-slate-400">
            ({course.reviews.toLocaleString('bn-BD')} রিভিউ)
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-200">
          <div>
            <span className="text-sm font-bold text-emerald-700">
              ৳{course.price.toLocaleString('bn-BD')}
            </span>
            <span className="text-[11px] text-slate-400 line-through ml-1">
              ৳{course.oldPrice.toLocaleString('bn-BD')}
            </span>
          </div>
          <button className="text-[11px] font-semibold bg-emerald-700 text-white rounded-md px-2.5 py-1 hover:bg-emerald-800 transition-colors">
            ভর্তি হও
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Course() {
  return (
    <section className="bg-white dark:bg-slate-950 py-10 px-7">
      <div className="text-center mb-7 max-w-md mx-auto">
        <p className="text-[11px] font-bold text-emerald-700 tracking-widest uppercase mb-1.5">
          জনপ্রিয় কোর্সসমূহ
        </p>
        <h2 className="text-[22px] font-bold text-slate-800 mb-2">
          তোমার পছন্দের বিষয় বেছে নাও
        </h2>
        <p className="text-[13px] text-slate-500 leading-relaxed">
          প্রতিটি কোর্স বাংলায় তৈরি, শিল্প-বিশেষজ্ঞদের দ্বারা পরিকল্পিত
        </p>
      </div>

      <div className="flex gap-1.5 flex-wrap mb-5">
        {categories.map((cat, i) => (
          <button
            key={cat}
            className={`text-xs font-medium px-3.5 py-1.5 rounded-full border transition-colors ${
              i === 0
                ? 'bg-emerald-700 text-white border-emerald-700'
                : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      <div className="text-center mt-5">
        <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 border-2 border-emerald-700 rounded-lg px-5 py-2.5 hover:bg-emerald-50 transition-colors">
          সব কোর্স দেখুন <ArrowRight size={16} />
        </button>
      </div>
    </section>
  )
}
