'use client'
import React from 'react'

interface PricingPlan {
  id: number
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
    id: 1,
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
    id: 2,
    name: 'প্রো',
    price: '৳৯৯৯',
    billingPeriod: '/মাস',
    subtitle: 'সিরিয়াস শিক্ষার্থীদের জন্য। সব কিছুতে প্রবেশাধিকার।',
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
    id: 3,
    name: 'টিম / প্রতিষ্ঠান',
    price: 'কাস্টম',
    subtitle: 'স্কুল, কোচিং বা কর্পোরেট প্রতিষ্ঠানের জন্য বিশেষ প্যাকেজ।',
    features: [
      { text: 'সব প্রো সুবিধা', included: true },
      { text: 'ডেডিকেটেড অ্যাকাউন্ট ম্যানেজার', included: true },
      { text: 'কাস্টম কোর্স তৈরি', included: true },
      { text: 'বাল্ক রিপোর্ট ও অ্যানালিটিক্স', included: true },
      { text: 'ইনভয়েস ও বার্ষিক বিলিং', included: true },
    ],
  },
  {
    id: 4,
    name: 'টিম / প্রতিষ্ঠান',
    price: 'কাস্টম',
    subtitle: 'স্কুল, কোচিং বা কর্পোরেট প্রতিষ্ঠানের জন্য বিশেষ প্যাকেজ।',
    features: [
      { text: 'সব প্রো সুবিধা', included: true },
      { text: 'ডেডিকেটেড অ্যাকাউন্ট ম্যানেজার', included: true },
      { text: 'কাস্টম কোর্স তৈরি', included: true },
      { text: 'বাল্ক রিপোর্ট ও অ্যানালিটিক্স', included: true },
      { text: 'ইনভয়েস ও বার্ষিক বিলিং', included: true },
    ],
  },
]

const PricingSection = () => {
  return (
    <div className="bg-background py-6 px-4 font-body text-foreground">
      <div className="">
        {/* Headings */}
        <div className="text-center mb-12">
          <span className="text-accent font-bold text-xs sm:text-sm tracking-wide block mb-2">
            মূল্য পরিকল্পনা
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground mb-3">
            তোমার বাজেটে সেরা প্ল্যান বেছে নাও
          </h2>
          <p className="text-xs sm:text-sm text-muted font-medium">
            সব প্ল্যানে ৩০ দিনের মানি-ব্যাক গ্যারান্টি
          </p>
        </div>

        {/* Grid Cards layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
          {pricingData.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-6 sm:p-7 flex flex-col transition-all duration-300 bg-card ${
                plan.isPopular
                  ? 'border-2 border-accent shadow-sm'
                  : 'border border-border shadow-sm'
              }`}
            >
              {/* Popular Badge Container */}
              {plan.isPopular && (
                <div className="mb-4">
                  <span className="inline-block bg-accent text-accent-foreground text-[11px] font-bold px-2.5 py-0.5 rounded">
                    সর্বাধিক জনপ্রিয়
                  </span>
                </div>
              )}

              {/* Header Title & Pricing */}
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                {plan.name}
              </h3>

              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-black text-foreground tracking-tight">
                  {plan.price}
                </span>
                {plan.billingPeriod && (
                  <span className="text-xs font-semibold text-muted">
                    {plan.billingPeriod}
                  </span>
                )}
              </div>

              <p className="text-xs text-muted leading-relaxed font-medium mb-6 min-h-[40px]">
                {plan.subtitle}
              </p>

              <hr className="border-border mb-6" />

              {/* Features Lists */}
              <ul className="space-y-3.5 flex-1 mb-8">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-xs font-semibold"
                  >
                    {feature.included ? (
                      /* Checked Icon Wrapper */
                      <span
                        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5"
                        style={{
                          background:
                            'color-mix(in oklab, var(--success) 16%, var(--card))',
                          color: 'var(--success)',
                        }}
                      >
                        ✓
                      </span>
                    ) : (
                      /* Crossed Icon Wrapper */
                      <span
                        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] mt-0.5"
                        style={{
                          background:
                            'color-mix(in oklab, var(--danger) 12%, var(--card))',
                          color: 'var(--danger)',
                        }}
                      >
                        ✕
                      </span>
                    )}
                    <span
                      className={
                        feature.included
                          ? 'text-foreground'
                          : 'text-muted font-normal'
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <button className="bg-primary hover:bg-accent text-primary-foreground hover:text-accent-foreground border border-transparent font-semibold px-8 py-3 rounded-xl transition-all duration-300 text-sm sm:text-base shadow-lg shadow-black/10 active:scale-95">
                Subscription
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PricingSection
