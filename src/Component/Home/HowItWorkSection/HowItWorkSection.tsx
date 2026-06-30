'use client'

import { ArrowRight } from 'lucide-react'

type Step = {
  number: string
  title: string
  description: string
}

const steps: Step[] = [
  {
    number: '১',
    title: 'নিবন্ধন করো',
    description: 'বিনামূল্যে অ্যাকাউন্ট তৈরি করো মাত্র ১ মিনিটে',
  },
  {
    number: '২',
    title: 'কোর্স বেছে নাও',
    description: '২০০+ কোর্স থেকে তোমার পছন্দের বিষয় বেছে নাও',
  },
  {
    number: '৩',
    title: 'শিখতে শুরু করো',
    description: 'ভিডিও, কুইজ ও প্রজেক্টের মাধ্যমে হাতে-কলমে শেখো',
  },
  {
    number: '৪',
    title: 'সার্টিফিকেট পাও',
    description: 'কোর্স শেষে স্বীকৃত সার্টিফিকেট পেয়ে ক্যারিয়ার গড়ো',
  },
]

export default function HowItWorkSection() {
  return (
    <section className="bg-slate-50 dark:bg-slate-950 py-12 px-7">
      <div className="text-center mb-10">
        <p className="text-[11px] font-bold text-emerald-700 tracking-widest uppercase mb-1.5">
          প্রক্রিয়া
        </p>
        <h2 className="text-[22px] font-bold text-slate-800">
          মাত্র ৪টি ধাপে শুরু করো
        </h2>
      </div>

      <div className="flex items-start justify-center max-w-4xl mx-auto">
        {steps.map((step, i) => (
          <div key={step.number} className="flex items-start flex-1">
            <div className="flex-1 text-center px-2">
              <div className="w-11 h-11 rounded-full bg-emerald-700 text-white text-[17px] font-bold flex items-center justify-center mx-auto mb-2.5">
                {step.number}
              </div>
              <h3 className="text-[13px] font-semibold text-slate-800 mb-1">
                {step.title}
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {step.description}
              </p>
            </div>

            {i < steps.length - 1 && (
              <ArrowRight
                size={18}
                className="text-emerald-700 mt-3.5 flex-shrink-0"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
