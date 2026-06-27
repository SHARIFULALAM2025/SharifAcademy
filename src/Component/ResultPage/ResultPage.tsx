'use client'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

// 1. Define the interface representing your API response data shape
interface ExamResult {
  score: number
  total_correct: number
  total_wrong: number
  time_taken: number
}

// আসল লজিক এবং UI থাকবে এই সাব-কম্পোনেন্টে
const ResultContent = () => {
  const params = useSearchParams()
  const resultId = params.get('resultId')

  // 2. Pass the interface to useState.
  const [result, setResult] = useState<ExamResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 🎯 পরিবর্তন: ব্যাকএন্ডে যেহেতু ভ্যালিডেশন নেই, তাই সেশন ডাটার জন্য আর অপেক্ষা করার দরকার নেই। শুধু resultId থাকলেই রিকোয়েস্ট চলে যাবে।
    if (!resultId) return

    fetch(
      `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/exam/result/${resultId}`
    )
      .then((r) => {
        if (!r.ok) {
          throw new Error('ফলাফল খুঁজে পাওয়া যায়নি')
        }
        return r.json()
      })
      .then((data) => {
        console.log('Fetched data:', data)
        setResult(data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Fetch error:', error)
        setResult(null)
        setLoading(false)
      })
  }, [resultId])

  // ডেটা ফেচ করার লোডিং ট্রু থাকলে স্ক্রিন দেখাবে
  if (loading)
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        লোড হচ্ছে...
      </div>
    )

  if (!result)
    return (
      <div className="min-h-screen bg-slate-950 text-red-400 flex items-center justify-center">
        ফলাফল পাওয়া যায়নি!
      </div>
    )

  const passed = result.score >= 8

  return (
    <div className="min-h-screen bg-slate-950 text-gray-200 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-gray-800 rounded-xl p-8 max-w-md w-full text-center space-y-6">
        <div
          className={`text-5xl ${passed ? 'text-green-400' : 'text-red-400'}`}
        >
          {passed ? '🎉' : '😔'}
        </div>

        <h1 className="text-2xl font-bold text-gray-100">
          {passed ? 'অভিনন্দন!' : 'আরও চেষ্টা করুন'}
        </h1>

        <div className="bg-slate-950 rounded-xl p-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">মোট নম্বর</span>
            <span
              className={`font-bold text-lg ${passed ? 'text-green-400' : 'text-red-400'}`}
            >
              {result.score}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">সঠিক উত্তর</span>
            <span className="text-green-400 font-bold">
              {result.total_correct}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">ভুল উত্তর</span>
            <span className="text-red-400 font-bold">{result.total_wrong}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">সময় লেগেছে</span>
            <span className="text-blue-400 font-bold">
              {Math.floor(result.time_taken / 60)} মিনিট{' '}
              {result.time_taken % 60} সেকেন্ড
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">পাস নম্বর</span>
            <span className="text-yellow-400 font-bold">8</span>
          </div>
        </div>

        <div
          className={`py-2 px-4 rounded-lg font-bold ${passed ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'}`}
        >
          {passed ? '✅ পাস' : '❌ ফেল'}
        </div>

        <button
          onClick={() => window.history.back()}
          className="w-full bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg text-sm transition-colors"
        >
          ফিরে যান
        </button>
      </div>
    </div>
  )
}

// মেইন কম্পোনেন্ট যা Suspense বাউন্ডারি দিয়ে বিল্ড এরর হ্যান্ডেল করবে
const ResultPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
          লোড হচ্ছে...
        </div>
      }


    >
      <ResultContent />
    </Suspense>
  )
}

export default ResultPage
//add