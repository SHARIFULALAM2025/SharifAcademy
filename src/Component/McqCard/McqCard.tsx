'use client'

import { McqCardProps } from '@/Types/lcmAndHcm'
import { useState } from 'react'
import MathText from '../MathText'
import { FiEye } from 'react-icons/fi'
import { FaHeart } from 'react-icons/fa6'
import { FaShareAlt } from 'react-icons/fa'
import { BiLike, BiDislike } from 'react-icons/bi'
import { MdDoubleArrow } from 'react-icons/md'
import { useSession } from '../lib/auth-client'
import toast from 'react-hot-toast'

const PREFIXES = ['ক', 'খ', 'গ', 'ঘ']
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

interface ActionState {
  views: number
  likes: number
  dislikes: number
  isFavourite: boolean
  isLiked: boolean
  isDisliked: boolean
}

const optionClass = (
  option: string,
  selected: string | null,
  correct: string,
  isReadOnly: boolean
): string => {
  const base =
    'w-full text-left px-5 py-3.5 rounded-md border text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] font-body'

  if (isReadOnly) {
    if (option === correct)
      return `${base} border-[var(--success)] bg-[var(--success)]/10 text-[var(--success)]`
    return `${base} border-[var(--border)] bg-[var(--card)] opacity-40`
  }

  if (!selected)
    return `${base} border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 shadow-sm`
  if (option === correct)
    return `${base} border-[var(--success)] bg-[var(--success)]/10 text-[var(--success)]`
  if (option === selected)
    return `${base} border-[var(--danger)] bg-[var(--danger)]/10 text-[var(--danger)]`
  return `${base} border-[var(--border)] bg-[var(--card)] opacity-40`
}

const McqCard = ({
  question,
  questionNumber,
  onAnswer,
  mode,
}: McqCardProps) => {
  const isReadOnly = mode === 'readonly'
  const isPractice = mode === 'practice'

  const [selected, setSelected] = useState<string | null>(
    isReadOnly ? question.correct : null
  )
  const [showDesc, setShowDesc] = useState<boolean>(isReadOnly)
  const [copied, setCopied] = useState<boolean>(false)
  const { data: session } = useSession()

  const [actions, setActions] = useState<ActionState>({
    views: question.views ?? 0,
    likes: question.likes ?? 0,
    dislikes: question.dislikes ?? 0,
    isFavourite: false,
    isLiked: false,
    isDisliked: false,
  })

  // ✅ Mode চেক
  const checkMode = (): boolean => {
    if (!mode) {
      toast.error(
        '⚠️ অনুগ্রহ করে প্রথমে "Read Only" অথবা "Practice" বাটন সিলেক্ট করুন!'
      )
      return false
    }
    return true
  }

  // ✅ API Call
  const apiCall = async (endpoint: string): Promise<void> => {
    try {
      const userId = session?.user?.id ?? 'anonymous'
      const url = `${API_URL}/api/questions/${question.id}/${endpoint}`
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-id': userId,
        },
      })
      const data = await res.json()
      console.log('📦 Response:', data)
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`)
    } catch (error) {
      console.error('❌ Error:', error)
    }
  }

  // ✅ Option Select
  const handleSelect = (option: string): void => {
    if (!checkMode()) return
    if (isReadOnly) return
    if (selected) return
    setSelected(option)
    onAnswer?.(option === question.correct)
  }

  // ✅ Like
  const handleLike = async (e: React.MouseEvent): Promise<void> => {
    e.stopPropagation()
    if (!session?.user) {
      toast.error('Like করতে Login করুন!')
      return
    }
    setActions((prev) => ({
      ...prev,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
      isLiked: !prev.isLiked,
      dislikes: prev.isDisliked ? prev.dislikes - 1 : prev.disliked,
      isDisliked: false,
    }))
    await apiCall('like')
  }

  // ✅ Dislike
  const handleDislike = async (e: React.MouseEvent): Promise<void> => {
    e.stopPropagation()
    if (!session?.user) {
      toast.error('Dislike করতে Login করুন!')
      return
    }
    setActions((prev) => ({
      ...prev,
      dislikes: prev.isDisliked ? prev.disliked - 1 : prev.disliked + 1,
      isDisliked: !prev.isDisliked,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes,
      isLiked: false,
    }))
    await apiCall('dislike')
  }

  // ✅ Favourite
  const handleFavourite = async (e: React.MouseEvent): Promise<void> => {
    e.stopPropagation()
    if (!session?.user) {
      toast.error('Favourite করতে Login করুন!')
      return
    }
    setActions((prev) => ({ ...prev, isFavourite: !prev.isFavourite }))
    await apiCall('favourite')
  }

  // ✅ Share
  const handleShare = async (e: React.MouseEvent): Promise<void> => {
    e.stopPropagation()
    const url = `${window.location.origin}/questions/${question.id}`
    try {
      if (navigator.share) {
        await navigator.share({ title: 'MCQ প্রশ্ন', text: question.ques, url })
      } else {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (error) {
      console.error('Share failed:', error)
    }
  }

  const isCorrect = selected === question.correct

  return (
    <div
      onClick={() => checkMode()}
      className="card card--illuminated p-6 md:p-7 shadow-md space-y-6 cursor-pointer animate-fade-rise transition-all duration-300"
    >
      {/* Question Header */}
      <div className="flex items-start gap-4">
        <span className="flex-shrink-0 w-9 h-9 rounded-md bg-[var(--primary)]/10 text-[var(--primary)] font-display text-base font-semibold flex items-center justify-center border border-[var(--primary)]/20 shadow-inner">
          {questionNumber}
        </span>
        <div className="text-[var(--foreground)] font-medium leading-relaxed pt-1 text-[15px] font-body">
          <MathText text={question.ques} />
        </div>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {question.answer.map((option, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation()
              handleSelect(option)
            }}
            disabled={isReadOnly || (isPractice && !!selected)}
            className={optionClass(
              option,
              selected,
              question.correct,
              isReadOnly
            )}
          >
            <span className="flex items-center w-full gap-3">
              <span className="w-5 h-5 rounded-sm border border-current flex items-center justify-center text-[11px] flex-shrink-0 font-display font-bold bg-background/50">
                {PREFIXES[i]}
              </span>
              <span className="flex-1">
                <MathText text={option} />
              </span>
              {(selected || isReadOnly) && option === question.correct && (
                <span className="ml-auto text-sm font-bold text-[var(--success)]">
                  ✓
                </span>
              )}
              {selected &&
                option === selected &&
                option !== question.correct && (
                  <span className="ml-auto text-sm font-bold text-[var(--danger)]">
                    ✗
                  </span>
                )}
            </span>
          </button>
        ))}
      </div>

      {/* Feedback Badge */}
      {(selected || isReadOnly) && (
        <div
          className={`text-xs font-semibold px-4 py-2 rounded-md font-body w-fit tracking-wide shadow-sm border ${
            isReadOnly || isCorrect
              ? 'bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20'
              : 'bg-[var(--danger)]/10 text-[var(--danger)] border-[var(--danger)]/20'
          }`}
        >
          {isReadOnly ? (
            <span className="flex items-center gap-1.5">
              ✓ সঠিক উত্তর: <MathText text={question.correct} />
            </span>
          ) : isCorrect ? (
            '✓ সঠিক উত্তর!'
          ) : (
            '✗ ভুল হয়েছে'
          )}
        </div>
      )}

      {/* Footer Actions & Explanation */}
      {question.description && (
        <div className="border-t border-[var(--border)] pt-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* ব্যাখ্যা টগল বাটন */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                if (!checkMode()) return
                if (isReadOnly) return
                setShowDesc(!showDesc)
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-[var(--muted)] hover:text-[var(--accent)] transition-colors group font-body"
            >
              <span className="tracking-wider">ব্যাখ্যা</span>
              <MdDoubleArrow
                className={`transition-transform duration-300 ${showDesc ? 'rotate-90 text-[var(--accent)]' : 'group-hover:translate-x-0.5'}`}
              />
            </button>

            {/* সোশ্যাল অ্যান্ড ইন্টারঅ্যাকশন বাটনস */}
            <div className="flex items-center space-x-4 bg-background/40 px-3 py-1.5 rounded-full border border-[var(--border)]/60 w-fit">
              <span className="flex items-center gap-1 text-xs text-[var(--muted)] font-mono">
                <FiEye className="text-sm" />
                {actions.views}
              </span>

              <div className="h-3 w-[1px] bg-[var(--border)]" />

              <button
                onClick={handleLike}
                title={session?.user ? 'Like' : 'Login করুন'}
                className={`flex items-center gap-1 text-xs font-medium transition-colors font-mono ${
                  actions.isLiked
                    ? 'text-[var(--primary)]'
                    : 'text-[var(--muted)] hover:text-[var(--primary)]'
                }`}
              >
                <BiLike className="text-sm" />
                {actions.likes}
              </button>

              <button
                onClick={handleDislike}
                title={session?.user ? 'Dislike' : 'Login করুন'}
                className={`flex items-center gap-1 text-xs font-medium transition-colors font-mono ${
                  actions.isDisliked
                    ? 'text-[var(--danger)]'
                    : 'text-[var(--muted)] hover:text-[var(--danger)]'
                }`}
              >
                <BiDislike className="text-sm" />
                {actions.dislikes}
              </button>

              <div className="h-3 w-[1px] bg-[var(--border)]" />

              <button
                onClick={handleFavourite}
                title={actions.isFavourite ? 'Saved' : 'Save'}
                className={`flex items-center gap-1 text-xs font-medium transition-colors ${
                  actions.isFavourite
                    ? 'text-[var(--accent)]'
                    : 'text-[var(--muted)] hover:text-[var(--accent)]'
                }`}
              >
                <FaHeart className="text-sm" />
              </button>

              <button
                onClick={handleShare}
                title={copied ? 'কপি হয়েছে!' : 'শেয়ার করুন'}
                className={`flex items-center gap-1 text-xs font-medium transition-colors font-body ${
                  copied
                    ? 'text-[var(--success)]'
                    : 'text-[var(--muted)] hover:text-[var(--primary)]'
                }`}
              >
                <FaShareAlt className="text-sm" />
                {copied && <span className="text-[10px] font-bold">কপি!</span>}
              </button>
            </div>
          </div>

          {/* ব্যাখ্যা টেক্সট বক্স */}
          {(showDesc || isReadOnly) && (
            <div className="text-sm text-[var(--foreground)]/90 leading-relaxed bg-[var(--background)] border border-[var(--border)]/70 rounded-md px-4 py-3.5 shadow-inner font-body animate-fade-rise">
              <MathText text={question.description} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default McqCard
