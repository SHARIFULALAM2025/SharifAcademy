import React from 'react'
import {
  ArrowRight,
  Award,
  Headphones,
  Infinity,
  Play,
  RotateCcw,
  Smartphone,
  Star,
} from 'lucide-react'
import Image from 'next/image'

const Hero = () => {
  return (
    <div className="relative bg-background text-foreground font-body flex flex-col justify-between overflow-hidden">
      {/* Signature background motif — kept subtle, sits behind the hero only */}
      <div className="absolute inset-0 bg-star-pattern pointer-events-none" />

      {/* Main Hero Content */}
      <div className="relative w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Text Content */}
        <div className="col-span-6 space-y-6 text-left">
          {/* Badge */}

          {/* Heading */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight">
            দক্ষতা অর্জন করো, <br />
            <span className="text-accent">স্বপ্নের ক্যারিয়ার গড়ো</span>
          </h1>

          {/* Subtitle */}
          <p className="text-muted text-base sm:text-lg max-w-xl leading-relaxed">
            বিশেষজ্ঞ শিক্ষকদের সাথে বাংলায় শেখো প্রোগ্রামিং, ডিজাইন, ব্যবসা ও
            আরও অনেক কিছু। যেকোনো ডিভাইসে, যেকোনো সময়।
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button className="flex items-center gap-2 bg-primary hover:bg-accent text-primary-foreground hover:text-accent-foreground px-6 py-3 rounded-lg font-medium transition-all group">
              কোর্স দেখুন
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center gap-2 bg-card hover:bg-border text-foreground px-6 py-3 rounded-lg border border-border font-medium transition-all">
              ফ্রি ডেমো
              <Play className="w-4 h-4 fill-current" />
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-border">
            <div>
              <div className="font-display text-2xl sm:text-3xl font-semibold">
                ৫০,০০০+
              </div>
              <div className="text-xs sm:text-sm text-muted mt-1">
                সক্রিয় শিক্ষার্থী
              </div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-semibold">
                ২০০+
              </div>
              <div className="text-xs sm:text-sm text-muted mt-1">কোর্স</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-semibold">
                ৯৫%
              </div>
              <div className="text-xs sm:text-sm text-muted mt-1">
                সফলতার হার
              </div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-semibold flex items-center gap-1">
                ৪.৯ <Star className="w-5 h-5 fill-accent text-accent" />
              </div>
              <div className="text-xs sm:text-sm text-muted mt-1">
                গড় রেটিং
              </div>
            </div>
          </div>
          <div className="grid md:pt-6 grid-cols-2 md:grid-cols-5 gap-6 text-center text-xs sm:text-sm font-medium">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <Award className="w-5 h-5 text-accent" />
              <span>সার্টিফিকেট স্বীকৃত</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <Infinity className="w-5 h-5 text-accent" />
              <span>লাইফটাইম অ্যাক্সেস</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <RotateCcw className="w-5 h-5 text-accent" />
              <span>৩০ দিনের রিফান্ড গ্যারান্টি</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <Headphones className="w-5 h-5 text-accent" />
              <span>২৪/৭ সাপোর্ট</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 col-span-2 md:col-span-1">
              <Smartphone className="w-5 h-5 text-accent" />
              <span>মোবাইল অ্যাপ</span>
            </div>
          </div>
        </div>

        <div className="col-span-6 rounded-xl w-full">
          <Image
            src="https://i.ibb.co.com/qYpyBv3Z/Chat-GPT-Image-Jun-29-2026-12-56-54-PM-removebg-preview.png"
            alt="Academy Intro"
            width={800}
            height={300}
            className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
