"use client"
import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FaqSection = () => {
  // কোন প্রশ্নটি ওপেন থাকবে তার ইনডেক্স ট্র্যাক করার জন্য স্টেট (ডিফল্টভাবে প্রথমটি ওপেন - Index 0)
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqData = [
    {
      question: 'কোর্স কিনলে কতদিন অ্যাক্সেস পাব?',
      answer:
        'আজীবন অ্যাক্সেস পাবেন। কোর্স কনটেন্ট আপডেট হলেও সম্পূর্ণ বিনামূল্যে নতুন ভিডিও পাবেন।',
    },
    {
      question: 'বাংলাদেশ থেকে পেমেন্ট করা যাবে?',
      answer:
        'হ্যাঁ, বিকাশ, রকেট, নগদ, ভিসা কার্ড বা যেকোনো স্থানীয় ব্যাংকিংয়ের মাধ্যমে পেমেন্ট করতে পারবেন।',
    },
    {
      question: 'সার্টিফিকেট কি চাকরিতে গ্রহণযোগ্য?',
      answer:
        'অবশ্যই, আমাদের প্রতিটি সার্টিফিকেট ইন্ডাস্ট্রি-স্বীকৃত এবং ভেরিফাইড, যা আপনার সিভিতে যুক্ত করতে পারবেন।',
    },
    {
      question: 'মোবাইলে কোর্স দেখা যাবে?',
      answer:
        'হ্যাঁ, আমাদের ওয়েবসাইট পুরোপুরি মোবাইল ফ্রেন্ডলি এবং আপনি চাইলে অ্যাপের মাধ্যমেও অফলাইনে দেখতে পারবেন।',
    },
    {
      question: 'লাইভ ক্লাস মিস করলে কী করব?',
      answer:
        'প্রতিটি লাইভ ক্লাসের রেকর্ডেড ব্যাকআপ আপনার ড্যাশবোর্ডে ২৪ ঘণ্টার মধ্যে আপলোড করে দেওয়া হবে।',
    },
    {
      question: 'রিফান্ড পলিসি কী?',
      answer:
        'কোর্স পছন্দ না হলে আমাদের নির্দিষ্ট নিয়মের মধ্যে শর্তহীন রিফান্ড পলিসির সুবিধা রয়েছে।',
    },
  ]

  const toggleFaq = (index:number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // ডেটাকে সমান দুই ভাগে ভাগ করে দুই কলাম লেআউটের জন্য প্রস্তুত করা
  const firstColumn = faqData.slice(0, 3)
  const secondColumn = faqData.slice(3, 6)

  return (
    <div className="w-full bg-[#F8FAFC] text-[#1E293B] font-sans py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center space-y-2 mb-12">
          <p className="text-[#064E3B] font-semibold text-sm sm:text-base tracking-wide">
            সাধারণ প্রশ্ন
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B131F] tracking-tight">
            যা জানতে চাও
          </h2>
        </div>

        {/* FAQ Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Column 1 */}
          <div className="space-y-4">
            {firstColumn.map((faq, idx) => {
              const actualIndex = idx
              const isOpen = openIndex === actualIndex
              return (
                <div
                  key={actualIndex}
                  className="bg-white border border-gray-200/80 rounded-xl transition-all duration-300 shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(actualIndex)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left font-semibold text-base sm:text-lg text-[#0B131F] hover:text-[#064E3B] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-[#064E3B]' : ''}`}
                    />
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-40 border-t border-gray-100' : 'max-h-0'}`}
                  >
                    <p className="p-5 text-sm sm:text-base text-gray-500 leading-relaxed bg-[#F8FAFC]/50">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            {secondColumn.map((faq, idx) => {
              const actualIndex = idx + 3
              const isOpen = openIndex === actualIndex
              return (
                <div
                  key={actualIndex}
                  className="bg-white border border-gray-200/80 rounded-xl transition-all duration-300 shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(actualIndex)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left font-semibold text-base sm:text-lg text-[#0B131F] hover:text-[#064E3B] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-[#064E3B]' : ''}`}
                    />
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-40 border-t border-gray-100' : 'max-h-0'}`}
                  >
                    <p className="p-5 text-sm sm:text-base text-gray-500 leading-relaxed bg-[#F8FAFC]/50">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FaqSection
