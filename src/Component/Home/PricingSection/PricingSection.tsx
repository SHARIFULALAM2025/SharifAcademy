'use client'
import React from 'react'

interface PricingPlan {
  id: string
  name: string
  price: string
  billingPeriod?: string
  subtitle: string
  isPopular?: boolean
  features: {
    text: string
    included: boolean
  }[]
}

const pricingData: PricingPlan[] = [
  {
    id: 'basic',
    name: 'বেসিক',
    price: '৳৪৯৯',
    billingPeriod: '/মাস',
    subtitle: 'নতুনদের জন্য উপযুক্ত। ৫০টি সেরা কোর্সে প্রবেশাধিকার।',
    features: [
      { text: '৫০টি কোর্স', included: true },
      { text: 'সার্টিফিকেট', included: true },
      { text: 'মোবাইল অ্যাপ', included: true },
      { text: 'লাইভ ক্লাস', included: false },
      { text: 'মেন্টরিং', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'প্রো',
    price: '৳৯৯৯',
    billingPeriod: '/মাস',
    subtitle: 'সিরিয়াস শিক্ষার্থীদের জন্য। সব কিছুতে প্রবেশাধিকার।',
    isPopular: true,
    features: [
      { text: 'সব ২০০+ কোর্স', included: true },
      { text: 'সার্টিফিকেট', included: true },
      { text: 'লাইভ ক্লাস ও রেকর্ডিং', included: true },
      { text: 'সাপ্তাহিক মেন্টরিং', included: true },
      { text: 'প্রজেক্ট ফিডব্যাক', included: true },
    ],
  },
  {
    id: 'team',
    name: 'টিম / প্রতিষ্ঠান',
    price: 'কাস্টম',
    subtitle: 'স্কুল, কোচিং বা কর্পোরেট প্রতিষ্ঠানের জন্য বিশেষ প্যাকেজ।',
    features: [
      { text: 'সব প্রো সুবিধা', included: true },
      { text: 'ডেডিকেটেড অ্যাকাউন্ট ম্যানেজার', included: true },
      { text: 'কাস্টম কোর্স তৈরি', included: true },
      { text: 'বাল্ক রিপোর্ট ও অ্যানালিটিক্স', included: true },
      { text: 'ইনভয়েস ও বার্ষিক বিলিং', included: true },
    ],
  },
]

const PricingSection = () => {
  return (
    <div className="bg-white dark:bg-slate-950 py-16 px-4 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto">
        {/* Headings */}
        <div className="text-center mb-12">
          <span className="text-[#155e2f] font-bold text-xs sm:text-sm tracking-wide block mb-2">
            মূল্য পরিকল্পনা
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1e293b] mb-3">
            তোমার বাজেটে সেরা প্ল্যান বেছে নাও
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            সব প্ল্যানে ৩০ দিনের মানি-ব্যাক গ্যারান্টি
          </p>
        </div>

        {/* Grid Cards layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {pricingData.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-6 sm:p-7 flex flex-col transition-all duration-300 ${
                plan.isPopular
                  ? 'bg-[#edf7f1] border-2 border-[#155e2f] shadow-sm'
                  : 'bg-white border border-slate-200/80 shadow-sm'
              }`}
            >
              {/* Popular Badge Container */}
              {plan.isPopular && (
                <div className="mb-4">
                  <span className="inline-block bg-[#155e2f] text-white text-[11px] font-bold px-2.5 py-0.5 rounded">
                    সর্বাধিক জনপ্রিয়
                  </span>
                </div>
              )}

              {/* Header Title & Pricing */}
              <h3 className="text-lg font-bold text-slate-700 mb-2">
                {plan.name}
              </h3>

              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-black text-slate-800 tracking-tight">
                  {plan.price}
                </span>
                {plan.billingPeriod && (
                  <span className="text-xs font-semibold text-slate-500">
                    {plan.billingPeriod}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-500 leading-relaxed font-medium mb-6 min-h-[40px]">
                {plan.subtitle}
              </p>

              <hr className="border-slate-200/60 mb-6" />

              {/* Features Lists */}
              <ul className="space-y-3.5 flex-1 mb-8">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-xs font-semibold"
                  >
                    {feature.included ? (
                      /* Checked Icon Wrapper */
                      <span className="w-4 h-4 rounded-full bg-[#edf7f1] text-[#155e2f] flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5">
                        ✓
                      </span>
                    ) : (
                      /* Crossed Icon Wrapper */
                      <span className="w-4 h-4 rounded-full bg-red-50 text-red-400 flex items-center justify-center flex-shrink-0 text-[9px] mt-0.5">
                        ✕
                      </span>
                    )}
                    <span
                      className={
                        feature.included
                          ? 'text-slate-700'
                          : 'text-slate-400 font-normal'
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Dynamic Bottom Button mock (shown transparently or customized) */}
              {plan.isPopular && (
                <button className="w-full py-2.5 rounded-xl border border-slate-200 bg-white/40 text-[#155e2f] font-bold text-xs tracking-wide select-none cursor-default opacity-40">
                  প্রো নাও
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PricingSection
