'use client'
import confetti from 'canvas-confetti'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { AttendExam, ExamQuestion } from '@/Types/Day'
import allData from '@/data/exam.json'

interface ExamResult {
  id: string
  user_id: string
  exam_id: number
  // ✅ answers এখন index number — { "1": 0, "2": 2, ... }
  answers: Record<string, number>
  // ✅ correct answers index — { "1": 0, "2": 0, ... }
  correctAnswers: Record<string, number>
  score: string
  total_correct: number
  total_wrong: number
  time_taken: number
  is_auto_submitted: boolean
  submitted_at: string
}

interface Question {
  n: number
  text: string
  opts: string[]
  correct: number // 0-based correct index
  chosen: number // 0-based user chosen index (-1 = skip)
  time: string
  tags: string[]
}

const examList = allData as AttendExam[]

const ResultContent = () => {
  const params = useSearchParams()
  const resultId = params.get('resultId')

  const [result, setResult] = useState<ExamResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [examFinishedData, setExamFinishedData] = useState<AttendExam[]>([])
  const [filter, setFilter] = useState<'all' | 'correct' | 'wrong' | 'skip'>(
    'all'
  )

  useEffect(() => {
    if (!resultId) return
    fetch(
      `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/exam/result/${resultId}`
    )
      // ✅ এই .then টা replace করুন
      .then((r) => {
        if (!r.ok) {
          return r.json().then((err) => {
            console.error('❌ API Error:', r.status, err)
            throw new Error(err.error || 'ফলাফল খুঁজে পাওয়া যায়নি')
          })
        }
        return r.json()
      })
      .then((data) => {
        setResult(data.data)
        setExamFinishedData(
          examList.filter((item) => item.id === data.data.exam_id)
        )
        setLoading(false)
      })
      .catch((error) => {
        console.error('Fetch error:', error)
        setResult(null)
        setLoading(false)
      })
  }, [resultId])

  useEffect(() => {
    // ১. প্রাথমিক কন্ডিশন চেক
    if (!result || examFinishedData.length === 0) return
    if (parseFloat(result.score) < 8) return

    let animationFrameId: number
    const duration = 5 * 1000 // ১৫ সেকেন্ড অনেক লম্বা, তাই ৫ সেকেন্ড দেওয়া হলো (চাইলে ১৫ করতে পারেন)
    const animationEnd = Date.now() + duration

    // থিমের সাথে মেলানো কনফেত্তি প্যালেট (ইনডিগো, গিল্ট গোল্ড, সবুজ, রোজ)
    const colors = ['#7C89E0', '#E4C567', '#7FA766', '#D97D68']

    // ৪০০ms ডিলে-র পর অ্যানিমেশন শুরু হবে
    const startTimer = setTimeout(() => {
      // রিক্লুসিভ ফ্রেম ফাংশন
      function frame() {
        // বাম দিক থেকে ফায়ার
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.65 },
          colors: colors,
        })

        // ডান দিক থেকে ফায়ার
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.65 },
          colors: colors,
        })

        // সময় বাকি থাকলে পরের ফ্রেমে আবার রান করবে
        if (Date.now() < animationEnd) {
          animationFrameId = requestAnimationFrame(frame)
        }
      }

      // প্রথম ফ্রেম ট্রিগার
      frame()
    }, 400)

    // ২. ক্লিনআপ ফাংশন (খুবই গুরুত্বপূর্ণ)
    return () => {
      clearTimeout(startTimer)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [result, examFinishedData])

  if (loading)
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-muted text-sm">লোড হচ্ছে...</span>
        </div>
      </div>
    )

  if (!result)
    return (
      <div className="min-h-screen bg-background text-danger flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-3">⚠️</div>
          <p className="text-lg font-semibold">ফলাফল পাওয়া যায়নি!</p>
          <button
            onClick={() => window.history.back()}
            className="mt-4 px-4 py-2 rounded-lg bg-card border border-border text-foreground/80 text-sm hover:bg-border transition-colors"
          >
            ফিরে যান
          </button>
        </div>
      </div>
    )

  const score = parseFloat(result.score)
  const passed = score >= 8
  const accuracy =
    result.total_correct + result.total_wrong > 0
      ? Math.round(
          (result.total_correct / (result.total_correct + result.total_wrong)) *
            100
        )
      : 0
  const minutes = Math.floor(result.time_taken / 60)
  const seconds = result.time_taken % 60

  const questions: Question[] = examFinishedData.flatMap((exam) =>
    exam.question.map((q: ExamQuestion, i: number) => {
      const questionNumber = String(i + 1)
      const opts = Array.isArray(q.ans) ? q.ans : []

      // ✅ DB থেকে আসা index সরাসরি use করুন
      const chosenIdx =
        result.answers?.[questionNumber] !== undefined
          ? Number(result.answers[questionNumber])
          : -1

      // ✅ backend থেকে পাঠানো correctAnswers index use করুন
      const correctIdx =
        result.correctAnswers?.[questionNumber] !== undefined
          ? Number(result.correctAnswers[questionNumber])
          : -1

      return {
        n: i + 1,
        text: q.ques,
        opts,
        correct: correctIdx,
        chosen: chosenIdx,
        time: '—',
        tags: [exam.category, exam.sub_Category].filter(Boolean),
      }
    })
  )

  const skippedCount = questions.filter((q) => q.chosen === -1).length

  const filteredQuestions = questions.filter((q) => {
    if (filter === 'correct') return q.chosen !== -1 && q.chosen === q.correct
    if (filter === 'wrong') return q.chosen !== -1 && q.chosen !== q.correct
    if (filter === 'skip') return q.chosen === -1
    return true
  })

  const letters = ['ক', 'খ', 'গ', 'ঘ']
  const totalQ = questions.length || 20
  const totalMarks = examFinishedData[0]?.total_Marks ?? '20'
  const progressPct = Math.min((score / parseFloat(totalMarks)) * 100, 100)

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      {/* Header band */}
      <div className="bg-card border-b border-border px-5 py-3">
        <p className="text-sm font-semibold text-center text-foreground mb-3">
          {examFinishedData[0]?.title ?? 'পরীক্ষার ফলাফল'}
          &nbsp;·&nbsp;
          <span className="text-muted text-xs font-normal">
            {new Date(result.submitted_at).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </p>

        {/* Stat pills */}
        <div className="flex gap-1.5 flex-wrap mb-3">
          <div className="flex-1 min-w-[90px] flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10 border border-success/30">
            <div>
              <div className="text-[9px] text-success/70 font-medium">
                স্কোর
              </div>
              <div className="text-sm font-bold text-success">
                {score}/{totalMarks}
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-[90px] flex items-center gap-2 px-3 py-1.5 rounded-lg bg-info/10 border border-info/30">
            <div>
              <div className="text-[9px] text-info/70 font-medium">
                নির্ভুলতা
              </div>
              <div className="text-sm font-bold text-info">{accuracy}%</div>
            </div>
          </div>
          <div className="flex-1 min-w-[90px] flex items-center gap-2 px-3 py-1.5 rounded-lg bg-border/30 border border-border">
            <div>
              <div className="text-[9px] text-muted font-medium">সময়</div>
              <div className="text-sm font-bold text-foreground/80">
                {minutes}m {seconds}s
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-[90px] flex items-center gap-2 px-3 py-1.5 rounded-lg bg-danger/10 border border-danger/30">
            <div>
              <div className="text-[9px] text-danger/70 font-medium">ভুল</div>
              <div className="text-sm font-bold text-danger">
                {result.total_wrong}
              </div>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {(
            [
              {
                key: 'all',
                label: `সব ${totalQ}`,
                cls: 'border-border text-foreground/80 data-[active=true]:bg-primary data-[active=true]:border-primary data-[active=true]:text-primary-foreground',
              },
              {
                key: 'correct',
                label: `সঠিক ${result.total_correct}`,
                cls: 'border-success/40 text-success data-[active=true]:bg-success data-[active=true]:border-success data-[active=true]:text-white',
              },
              {
                key: 'skip',
                label: `বাদ ${skippedCount}`,
                cls: 'border-muted/40 text-muted data-[active=true]:bg-muted data-[active=true]:border-muted data-[active=true]:text-white',
              },
              {
                key: 'wrong',
                label: `ভুল ${result.total_wrong}`,
                cls: 'border-danger/40 text-danger data-[active=true]:bg-danger data-[active=true]:border-danger data-[active=true]:text-white',
              },
            ] as const
          ).map(({ key, label, cls }) => (
            <button
              key={key}
              data-active={filter === key}
              onClick={() => setFilter(key)}
              className={`px-3.5 py-1 rounded-full text-[11px] font-semibold border transition-all ${cls}`}
            >
              {label}
            </button>
          ))}
          <button
            className="ml-auto px-3 py-1 rounded-md text-[10px] font-bold text-primary-foreground"
            style={{
              background:
                'linear-gradient(135deg, var(--accent), var(--primary))',
            }}
          >
            🏆 LEADERBOARD
          </button>
        </div>
      </div>

      <div className="px-5 py-3 pb-8">
        {/* Summary card */}
        <div className="bg-card border border-border rounded-xl p-4 mb-3">
          <div className="flex items-center gap-4 mb-4">
            <div
              className={`w-[70px] h-[70px] rounded-full border-[3px] flex flex-col items-center justify-center flex-shrink-0 ${
                passed ? 'border-success' : 'border-danger'
              }`}
            >
              <span
                className={`text-xl font-extrabold leading-none ${
                  passed ? 'text-success' : 'text-danger'
                }`}
              >
                {score}
              </span>
              <span className="text-[9px] text-muted mt-0.5">
                / {totalMarks}
              </span>
            </div>

            <div className="flex-1">
              <div className="h-1 bg-border/50 rounded-full overflow-hidden mb-1">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    passed ? 'bg-success' : 'bg-danger'
                  }`}
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-muted mb-2">
                <span>0</span>
                <span>পাস: ৮</span>
                <span>{totalMarks}</span>
              </div>
              <div className="text-[11px] text-muted">
                সময় লেগেছে:{' '}
                <span className="text-foreground font-semibold">
                  {minutes} মিনিট {seconds} সেকেন্ড
                </span>
              </div>
              <div className="text-[11px] text-muted mt-0.5">
                পাস নম্বর: <span className="text-accent font-bold">8.00</span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1.5">
              <div
                className={`px-3 py-1.5 rounded-lg text-sm font-bold border ${
                  passed
                    ? 'bg-success/10 border-success/40 text-success'
                    : 'bg-danger/10 border-danger/40 text-danger'
                }`}
              >
                {passed ? '✅ পাস' : '❌ ফেল'}
              </div>
              <span className="text-[10px] text-muted">পাস নম্বর ৮.০০</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[
              {
                val: result.total_correct,
                lbl: 'সঠিক উত্তর',
                color: 'text-success',
              },
              {
                val: result.total_wrong,
                lbl: 'ভুল উত্তর',
                color: 'text-danger',
              },
              { val: skippedCount, lbl: 'বাদ দেওয়া', color: 'text-info' },
              {
                val: `${accuracy}%`,
                lbl: 'নির্ভুলতা',
                color: 'text-accent',
              },
            ].map(({ val, lbl, color }) => (
              <div
                key={lbl}
                className="bg-background border border-border rounded-lg py-2.5 text-center"
              >
                <div
                  className={`text-base font-bold leading-none mb-1 ${color}`}
                >
                  {val}
                </div>
                <div className="text-[10px] text-muted">{lbl}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => window.history.back()}
            className="w-full mt-3 py-2.5 rounded-lg bg-background border border-border text-foreground/80 text-sm font-semibold hover:bg-card hover:border-primary/30 transition-all"
          >
            ← ফিরে যান
          </button>
        </div>

        {/* Question list */}
        {questions.length > 0 && (
          <>
            <p className="text-[11px] text-muted font-semibold uppercase tracking-wider mb-2.5">
              সম্পন্ন প্রশ্ন ({filteredQuestions.length})
            </p>
            <div className="flex flex-col gap-2">
              {filteredQuestions.map((q) => {
                const isCorrect = q.chosen !== -1 && q.chosen === q.correct
                const isWrong = q.chosen !== -1 && q.chosen !== q.correct

                return (
                  <div
                    key={q.n}
                    className="bg-card border border-border rounded-xl overflow-hidden"
                  >
                    <div className="flex items-start gap-2.5 px-3.5 pt-3 pb-2">
                      <div className="min-w-[22px] h-[22px] rounded-[5px] bg-primary flex items-center justify-center text-[11px] font-bold text-primary-foreground flex-shrink-0 mt-0.5">
                        {q.n}
                      </div>
                      <p className="text-[12.5px] text-foreground/90 leading-relaxed">
                        {q.text}
                      </p>
                    </div>

                    {q.tags.length > 0 && (
                      <div className="flex gap-1.5 flex-wrap px-3.5 pb-2">
                        {q.tags.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded text-[10px] font-semibold bg-primary/15 border border-primary/30 text-primary"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-1.5 px-3.5 pb-3">
                      {q.opts.map((opt, i) => {
                        const isCorrectOpt = i === q.correct
                        const isUserChosen = i === q.chosen

                        let cls: string
                        let letterCls: string

                        if (isCorrectOpt && isUserChosen) {
                          cls = 'bg-success/10 border-success/40 text-success'
                          letterCls = 'bg-success border-success text-white'
                        } else if (isCorrectOpt && !isUserChosen) {
                          cls = 'bg-success/10 border-success/40 text-success'
                          letterCls = 'bg-success border-success text-white'
                        } else if (isUserChosen && !isCorrectOpt) {
                          cls = 'bg-danger/10 border-danger/40 text-danger'
                          letterCls = 'bg-danger border-danger text-white'
                        } else {
                          cls = 'bg-background border-border text-muted'
                          letterCls = 'bg-card border-border text-muted'
                        }

                        return (
                          <div
                            key={i}
                            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-[11.5px] ${cls}`}
                          >
                            <span
                              className={`w-[18px] h-[18px] rounded flex items-center justify-center text-[9px] font-bold border flex-shrink-0 ${letterCls}`}
                            >
                              {letters[i]}
                            </span>
                            <span className="leading-tight">{opt}</span>
                          </div>
                        )
                      })}
                    </div>

                    <div className="border-t border-border px-3.5 py-2 flex items-center justify-between">
                      <div
                        className={`flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold ${
                          isCorrect
                            ? 'bg-success/10 text-success'
                            : isWrong
                              ? 'bg-danger/10 text-danger'
                              : 'bg-muted/10 text-muted'
                        }`}
                      >
                        {isCorrect
                          ? '✓ সঠিক'
                          : isWrong
                            ? '✗ ভুল'
                            : '— বাদ দেওয়া'}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-muted">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {q.time}
                      </div>
                      <div className="flex gap-2">
                        <button className="text-muted hover:text-foreground transition-colors">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                          </svg>
                        </button>
                        <button className="text-muted hover:text-foreground transition-colors">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}

        {questions.length === 0 && (
          <div className="text-center py-12 text-muted text-sm">
            প্রশ্ন লোড হয়নি
          </div>
        )}
      </div>
    </div>
  )
}

const ResultPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-muted text-sm">লোড হচ্ছে...</span>
          </div>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  )
}

export default ResultPage
