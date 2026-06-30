'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import moment from 'moment'
import { AttendExam } from '@/Types/Day'
import allData from '@/data/exam.json'

interface uniqueId {
  id: number
}

const examList = allData as AttendExam[]

const SingleExam = ({ id }: uniqueId) => {
  const router = useRouter()
  const singleData = examList.find((item) => item.id === Number(id))
  const PREFIXES = ['ক', 'খ', 'গ', 'ঘ']

  const [timeLeft, setTimeLeft] = useState(900)
  // ✅ number index store করছি, string নয়
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const answersRef = useRef(answers)
  useEffect(() => {
    answersRef.current = answers
  }, [answers])

  const timeLeftRef = useRef(timeLeft)
  useEffect(() => {
    timeLeftRef.current = timeLeft
  }, [timeLeft])

  const executeSubmissionRef = useRef<(autoSubmit?: boolean) => Promise<void>>(
    async () => {}
  )

  const executeSubmission = useCallback(
    async (autoSubmit = false) => {
      setShowConfirmModal(false)
      setIsSubmitting(true)

      const currentAnswers = answersRef.current
      const answeredCount = Object.keys(currentAnswers).length

      const submissionPayload = {
        examId: id,
        totalQuestions: singleData?.total_Question,
        answeredCount,
        // ✅ পুরো answers object পাঠাচ্ছি — { "1": 0, "2": 2, "3": 1, ... }
        // value = 0-based index of selected option
        submittedAnswers: currentAnswers,
        timeTaken: 900 - timeLeftRef.current,
        autoSubmitted: autoSubmit,
      }

      console.log(submissionPayload)

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/exams/submit`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submissionPayload),
          }
        )

        if (!response.ok) throw new Error('Server error')
        const result = await response.json()

        router.push(`/day/exam/result?resultId=${result.resultId}`)
      } catch (error) {
        console.error('Submission failed:', error)
        alert('নেটওয়ার্ক সমস্যার কারণে সাবমিট করা যায়নি। আবার চেষ্টা করুন।')
        setIsSubmitting(false)
      }
    },
    [id, singleData,router]
  )

  useEffect(() => {
    executeSubmissionRef.current = executeSubmission
  }, [executeSubmission])

  useEffect(() => {
    if (isSubmitting) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setTimeout(() => {
            executeSubmissionRef.current?.(true)
          }, 0)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isSubmitting])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  // ✅ optionLabel সরানো হয়েছে — এখন optionIndex (0-based) store হচ্ছে
  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (isSubmitting) return
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
  }

  const answeredCount = Object.keys(answers).length

  const handleSubmitClick = (e: React.FormEvent) => {
    e.preventDefault()
    if (answeredCount === 0) {
      alert('কমপক্ষে একটি প্রশ্নের উত্তর দিন।')
      return
    }
    setShowConfirmModal(true)
  }

  const handleConfirmSubmit = () => {
    executeSubmission(false)
  }

  if (!singleData) {
    return (
      <div className="min-h-screen bg-[#111317] text-red-400 flex items-center justify-center">
        পরীক্ষাটি খুঁজে পাওয়া যায়নি!
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-gray-200 font-sans pb-24 select-none">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* HEADER STATS BOX */}
        <div className="bg-slate-900 relative border border-gray-800 rounded-xl p-6 shadow-xl">
          <h2 className="text-center text-lg md:text-xl font-bold text-gray-100 mb-1">
            {singleData.title}
          </h2>
          <p className="text-center text-xs md:text-sm text-gray-400 mb-6">
            [ প্রত্যেক প্রশ্নের মান সমান এবং প্রতিটি ভুল উত্তরের জন্য ০.২৫ নম্বর
            কাটা হবে ]
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto text-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-purple-600/20 text-purple-400 rounded-lg flex items-center justify-center font-bold">
                ❓
              </div>
              <div>
                <p className="font-bold text-gray-100 leading-tight">
                  {singleData.total_Question}
                </p>
                <p className="text-xs text-gray-400">প্রশ্ন</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-emerald-600/20 text-emerald-400 rounded-lg flex items-center justify-center font-bold">
                ⋮☰
              </div>
              <div>
                <p className="font-bold text-gray-100 leading-tight">
                  {singleData.total_Marks}
                </p>
                <p className="text-xs text-gray-400">পূর্ণমান</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-red-600/20 text-red-400 rounded-lg flex items-center justify-center font-bold">
                ⊖
              </div>
              <div>
                <p className="font-bold text-gray-100 leading-tight">0.25</p>
                <p className="text-xs text-gray-400">নেগেটিভ মার্ক</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-600/20 text-blue-400 rounded-lg flex items-center justify-center font-bold">
                🕒
              </div>
              <div>
                <p className="font-bold text-gray-100 leading-tight">
                  {singleData.total_time} মিনিট
                </p>
                <p className="text-xs text-gray-400">সময়</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-cyan-600/20 text-cyan-400 rounded-lg flex items-center justify-center font-bold">
                📅
              </div>
              <div>
                <p className="font-bold text-gray-100 leading-tight">
                  {moment().format('DD-MM-YYYY')}
                </p>
                <p className="text-xs text-gray-400">তারিখ</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-yellow-600/20 text-yellow-400 rounded-lg flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <p className="font-bold text-gray-100 leading-tight">8</p>
                <p className="text-xs text-gray-400">পাস নম্বর</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t max-w-xl mx-auto flex items-center justify-between bg-slate-950 px-4 py-2.5 rounded-xl border border-gray-800">
            <div className="flex items-center gap-2 text-xs md:text-sm">
              <span className="w-5 h-5 bg-blue-600/20 text-blue-400 rounded flex items-center justify-center text-xs">
                📋
              </span>
              <span className="text-gray-400">উত্তর দেওয়া</span>
            </div>
            <div className="text-xs md:text-sm font-semibold text-gray-400">
              <span className="text-gray-200">
                {answeredCount} / {singleData.total_Question}
              </span>{' '}
              (
              {Math.round(
                (answeredCount / Number(singleData.total_Question)) * 100
              ) || 0}
              %)
            </div>
          </div>
        </div>

        <p className="text-center text-sm font-bold text-gray-400 tracking-wide pt-2">
          {singleData.sub_Category || 'সাধারণ জ্ঞান'}
        </p>

        {/* QUESTION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {singleData?.question?.map((q) => (
            <div
              key={q.id}
              className="bg-slate-900 border border-gray-800 rounded-xl p-5 shadow-md space-y-4"
            >
              <div className="text-sm md:text-base font-bold text-gray-100 leading-snug flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs md:text-sm shrink-0 font-mono mt-0.5">
                  {q.id}
                </span>
                <span>{q.ques}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.ans.map((option, i) => {
                  // ✅ index দিয়ে compare করছি, text দিয়ে নয়
                  const isSelected = answers[q.id] === i
                  return (
                    <button
                      key={i}
                      disabled={isSubmitting}
                      // ✅ i (0-based index) পাঠাচ্ছি
                      onClick={() => handleSelectOption(q.id, i)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left text-xs md:text-sm font-medium transition-all duration-200 active:scale-[0.99] group ${
                        isSelected
                          ? 'bg-green-600/10 border-green-500 text-green-400'
                          : 'bg-slate-900 border-gray-800/80 hover:border-gray-700 text-gray-300'
                      } disabled:opacity-60`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 font-bold transition-colors ${
                          isSelected
                            ? 'bg-green-500 text-white'
                            : 'bg-[#282d37] text-gray-400'
                        }`}
                      >
                        {PREFIXES[i]}
                      </span>
                      <span className="line-clamp-1">{option}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* SUBMIT BUTTON */}
        <button
          onClick={handleSubmitClick}
          disabled={isSubmitting}
          className="w-full rounded-xl bg-green-700 hover:bg-green-600 disabled:bg-emerald-900 text-white px-6 py-4 shadow-2xl transition-all font-bold"
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
            <div className="flex items-center gap-2 text-base md:text-lg tracking-wider font-mono bg-black/20 px-3 py-1 rounded-lg">
              <span>⏳</span>
              {formatTime(timeLeft)}
            </div>
            <div className="flex items-center gap-2 text-sm uppercase md:text-base tracking-wide">
              {isSubmitting ? (
                <>
                  <span>প্রসেসিং হচ্ছে...</span>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </>
              ) : (
                <span>খাতা জমা দিন (Submit Exam)</span>
              )}
            </div>
            <div className="bg-black/20 px-3 py-1 rounded-lg font-mono tracking-wide text-xs md:text-sm">
              {answeredCount} / {singleData.total_Question}
            </div>
          </div>
        </button>
      </div>

      {/* CONFIRMATION MODAL */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-gray-800 rounded-xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl">
            <div className="text-4xl text-yellow-500">⚠️</div>
            <h3 className="text-lg font-bold text-gray-100">
              আপনি কি নিশ্চিত?
            </h3>
            <p className="text-sm text-gray-400">
              আপনি মোট{' '}
              <span className="text-green-400 font-bold">
                {singleData.total_Question}
              </span>{' '}
              টি প্রশ্নের মধ্যে{' '}
              <span className="text-yellow-400 font-bold">{answeredCount}</span>{' '}
              টি উত্তর দিয়েছেন। জমা দেওয়ার পর আর পরিবর্তন করা যাবে না।
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg text-sm transition-colors"
              >
                ফিরে যান
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="flex-1 bg-green-700 hover:bg-green-600 text-white font-semibold py-2 rounded-lg text-sm transition-colors"
              >
                হ্যাঁ, জমা দিন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SingleExam
