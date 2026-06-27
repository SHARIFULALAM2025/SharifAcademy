import React from 'react'
import { AttendExam } from '@/Types/Day'
import moment from 'moment'
import Link from 'next/link'
interface ExamDetailsModalProps {
  data: AttendExam
  onClose: () => void
}

const ExamDetailsModal = ({ data, onClose }: ExamDetailsModalProps) => {

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn"
    >
      {/* Modal Container */}
      <div className="bg-[#1e222b] border border-gray-800 rounded-xl w-full max-w-2xl text-gray-200 shadow-2xl overflow-hidden select-none">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
          <h3 className="text-lg font-bold text-gray-100">Exam Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-100 bg-[#2d3139]/50 p-1.5 rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Main Grid Tables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {/* Left Table */}
            <div className="border border-gray-800 rounded-lg overflow-hidden divide-y divide-gray-800">
              <div className="grid grid-cols-3 p-3 bg-[#181a20]/40">
                <span className="text-gray-400 font-medium">Name</span>
                <span className="col-span-2 text-gray-200 font-semibold">
                  {data.title}
                </span>
              </div>
              <div className="grid grid-cols-3 p-3">
                <span className="text-gray-400 font-medium">Level</span>
                <span className="col-span-2 text-gray-200">
                  {data.category} মডেল টেস্ট
                </span>
              </div>
              <div className="grid grid-cols-3 p-3 bg-[#181a20]/40">
                <span className="text-gray-400 font-medium">Examiner</span>
                <span className="col-span-2 text-gray-300 font-medium">
                  {data.examiner || 'Najjar Hossain Raju'}
                </span>
              </div>
              <div className="grid grid-cols-3 p-3 items-center">
                <span className="text-gray-400 font-medium">Type</span>
                <span className="col-span-2">
                  <span className="bg-[#10b981]/20 text-[#10b981] border border-#10b981/30 text-xs px-2.5 py-0.5 rounded font-bold">
                    {data.package || 'Free'}
                  </span>
                </span>
              </div>
              <div className="grid grid-cols-3 p-3 bg-[#181a20]/40 items-center">
                <span className="text-gray-400 font-medium">Exam Status</span>
                <span className="col-span-2">
                  <span className="bg-[#10b981] text-white text-xs px-2.5 py-0.5 rounded font-bold">
                    Active
                  </span>
                </span>
              </div>
            </div>

            {/* Right Table */}
            <div className="border border-gray-800 rounded-lg overflow-hidden divide-y divide-gray-800 font-sans">
              <div className="flex justify-between p-3 bg-[#181a20]/40">
                <span className="text-gray-400 font-medium">
                  Total Question
                </span>
                <span className="text-gray-100 font-bold">
                  {data.total_Question}
                </span>
              </div>
              <div className="flex justify-between p-3">
                <span className="text-gray-400 font-medium">Total Mark</span>
                <span className="text-gray-100 font-bold">
                  {data.total_Marks}
                </span>
              </div>
              <div className="flex justify-between p-3 bg-[#181a20]/40">
                <span className="text-gray-400 font-medium">Pass Mark</span>
                <span className="text-gray-100 font-bold">8</span>{' '}
                {/* Static value or dynamic if available */}
              </div>
              <div className="flex justify-between p-3">
                <span className="text-gray-400 font-medium">Negative Mark</span>
                <span className="text-red-400 font-bold">0.25</span>
              </div>
              <div className="flex justify-between p-3 bg-[#181a20]/40">
                <span className="text-gray-400 font-medium">Duration</span>
                <span className="text-gray-100 font-semibold">
                  {data.total_time} Minutes
                </span>
              </div>
              <div className="flex justify-between p-3">
                <span className="text-gray-400 font-medium">Starting Time</span>
                <span className="text-gray-300 text-xs">
                  {moment().format('MMM DD, YYYY, h:mm A')}
                </span>
              </div>
            </div>
          </div>

          {/* Exam Subject Section */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-gray-300">Exam Subject</h4>
            <div className="flex">
              <span className="bg-[#10b981]/20 text-[#10b981] text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-2 border border-[#10b981]/30">
                {data.sub_Category}
                <span className="bg-[#10b981] text-white px-1.5 py-0.5 rounded text-[10px]">
                  {data.total_Question}
                </span>
              </span>
            </div>
          </div>

          {/* Center Call-to-Action Button */}
          <div className="flex justify-center pt-2">
            <Link
              href="/day/exam/FinalExam"
              className="bg-[#047857] hover:bg-[#059669] text-white font-bold px-8 py-2.5 rounded-lg text-sm transition-all shadow-md active:scale-95"
            >
              Start Now
            </Link>
          </div>

          {/* Bottom Description Section */}
          <div className="border-t border-gray-800/80 pt-4 space-y-2">
            <div className="flex items-center gap-1.5 text-gray-300 font-bold text-sm">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Exam Details</span>
            </div>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed line-clamp-4">
              এই মডেল টেস্টে থাকছে মোট {data.total_Marks} নম্বরের{' '}
              {data.sub_Category} প্রশ্ন, যেখানে যুক্ত করা হয়েছে সাম্প্রতিক
              সময়ের গুরুত্বপূর্ণ ঘটনা, বাংলাদেশ সম্পর্কিত সাধারণ জ্ঞান এবং
              আন্তর্জাতিক বিষয়াবলী। পরীক্ষাটি এমনভাবে সাজানো হয়েছে যাতে আপনি
              একসাথে সমসাময়িক বিষয়, ইতিহাস-ভূগোল, বিজ্ঞান, খেলাধুলা ও বিশ্ব
              পরিস্থিতি সম্পর্কে নিজেদের জ্ঞানের পরীক্ষা নিতে পারেন...
            </p>
            <button className="text-xs text-gray-300 underline font-medium hover:text-white transition-colors">
              Show More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExamDetailsModal
