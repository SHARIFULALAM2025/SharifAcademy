'use client'
import { AttendExam } from '@/Types/Day'
import React, { useState } from 'react'
import ExamDetailsModal from './ExamDetailsModal'
import Link from 'next/link'

// --- Types ---
interface ExamCardProps {
  data: AttendExam // অথবা আপনার টাইপ স্ট্রাকচার অনুযায়ী যদি সরাসরি অবজেক্ট হয়
}

// --- Icons ---
const QuestionIcon = () => (
  <svg
    className="w-4 h-4 text-muted"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const MarksIcon = () => (
  <svg
    className="w-4 h-4 text-muted"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

const TimeIcon = () => (
  <svg
    className="w-4 h-4 text-muted"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

// --- Main Component ---
const ExamCard = ({ data }: ExamCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {
    id,
    category,
    sub_Category,
    title,
    total_Question,
    total_Marks,
    total_time,
    examiner,
    package: examPackage,
  } = data

  return (
    <div className="max-w-105 w-full bg-card border border-border rounded-xl p-5 font-body text-foreground shadow-2xl flex flex-col justify-between select-none">
      {/* Top Header: Badge & Status */}
      <div className="flex justify-between items-start gap-4 mb-3">
        <span className="text-sm text-muted font-medium">
          {category} {sub_Category ? `• ${sub_Category}` : ''}
        </span>
        <span className="bg-background border border-border text-muted text-xs px-2.5 py-1 rounded-md font-semibold tracking-wide">
          Active
        </span>
      </div>

      {/* Main Title */}
      <h2 className="font-display text-[20px] font-bold text-foreground leading-snug mb-3 hover:text-accent transition-colors cursor-pointer line-clamp-2">
        {title}
      </h2>

      {/* Participation Info Placeholder */}
      <div className="flex items-center gap-1 text-sm text-muted mb-4">
        <svg
          className="w-4 h-4 text-accent fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span>915+ Participated</span>
      </div>

      {/* Quick Meta Badges */}
      <div className="flex flex-wrap gap-2 mb-5">
        <div className="flex items-center gap-1.5 bg-background px-3 py-1.5 rounded-lg text-xs md:text-sm text-muted">
          <QuestionIcon />
          <span>{total_Question} Question</span>
        </div>
        <div className="flex items-center gap-1.5 bg-background px-3 py-1.5 rounded-lg text-xs md:text-sm text-muted">
          <MarksIcon />
          <span>{total_Marks} Marks</span>
        </div>
        <div className="flex items-center gap-1.5 bg-background px-3 py-1.5 rounded-lg text-xs md:text-sm text-muted">
          <TimeIcon />
          <span>{total_time} Minutes</span>
        </div>
      </div>

      {/* Examiner & Package info */}
      <div className="flex justify-between items-center border-b border-border pb-4 mb-4 gap-4">
        <div className="space-y-1 text-sm">
          <p className="text-muted">
            <span className="font-semibold text-foreground">Examiner:</span>{' '}
            {examiner || 'N/A'}
          </p>
          <p className="text-muted line-clamp-1">
            <span className="font-semibold text-foreground">Package:</span>{' '}
            {title?.split('-')[0]} কুইক মডেল টেস্ট
          </p>
        </div>

        {/* Result Action Link */}
        <button className="flex flex-col items-center justify-center text-muted hover:text-primary transition-colors shrink-0 group">
          <span className="text-[10px] tracking-wider font-bold uppercase group-hover:text-primary">
            RESULT
          </span>
          <svg
            className="w-5 h-5 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </button>
      </div>

      {/* Subject Badge Row */}
      <div className="flex items-center gap-2 mb-5">
        <span className="text-sm font-bold text-muted flex items-center gap-1">
          Subject
          <svg
            className="w-3 h-3 text-muted"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <span className="bg-background text-foreground text-xs font-semibold px-3 py-1 rounded border border-border">
          {sub_Category}{' '}
          <span className="text-muted ml-1">{total_Question}</span>
        </span>
      </div>

      {/* Action Buttons Row */}
      <div className="flex justify-between items-center border-b border-border pb-4 mb-3">
        <span className="bg-success text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-sm">
          {examPackage || 'Free'}
        </span>
        <Link
          href={`/day/exam/FinalExam/${id}`}
          className="bg-primary hover:opacity-90 text-primary-foreground font-bold px-5 py-2 rounded-lg text-sm transition-all shadow-md active:scale-95"
        >
          Start Now
        </Link>
      </div>

      {/* Bottom Footer Actions */}
      <div className="flex justify-between items-center text-muted text-sm pt-1">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 hover:text-foreground transition-colors py-1"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <span className="font-medium text-xs md:text-sm">View Details</span>
        </button>

        <div className="flex items-center gap-4">
          <button className="hover:text-foreground transition-colors p-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>
          <button className="flex items-center gap-1 hover:text-foreground transition-colors p-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="text-xs">0</span>
          </button>
          <button className="hover:text-foreground transition-colors p-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.684 10.742a3 3 0 110 2.516m0-2.516a3 3 0 114.632-2.516m0 2.516a3 3 0 11-4.632 2.516m0 0L15 13.25m-1.316-2.516L15 10.75"
              />
            </svg>
          </button>
        </div>
      </div>
      {isModalOpen && (
        <ExamDetailsModal data={data} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  )
}

export default ExamCard