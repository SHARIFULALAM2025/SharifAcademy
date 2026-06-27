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
    'w-full text-left px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'

  if (isReadOnly) {
    if (option === correct)
      return `${base} border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300`
    return `${base} border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 opacity-50`
  }

  if (!selected)
    return `${base} border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-slate-600`
  if (option === correct)
    return `${base} border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300`
  if (option === selected)
    return `${base} border-red-400 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400`
  return `${base} border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 opacity-50`
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
      alert('Like করতে Login করুন!')
      return
    }
    setActions((prev) => ({
      ...prev,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
      isLiked: !prev.isLiked,
      dislikes: prev.isDisliked ? prev.dislikes - 1 : prev.dislikes,
      isDisliked: false,
    }))
    await apiCall('like')
  }

  // ✅ Dislike
  const handleDislike = async (e: React.MouseEvent): Promise<void> => {
    e.stopPropagation()
    if (!session?.user) {
      alert('Dislike করতে Login করুন!')
      return
    }
    setActions((prev) => ({
      ...prev,
      dislikes: prev.isDisliked ? prev.dislikes - 1 : prev.dislikes + 1,
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
      alert('Favourite করতে Login করুন!')
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
      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-5 cursor-pointer"
    >
      {/* Question */}
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-sm font-semibold flex items-center justify-center">
          {questionNumber}
        </span>
        <p className="text-slate-800 dark:text-slate-100 font-medium leading-relaxed pt-1">
          <MathText text={question.ques} />
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
            <span className="inline-flex items-center gap-2">
              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs flex-shrink-0">
                {PREFIXES[i]}
              </span>
              <MathText text={option} />
              {(selected || isReadOnly) && option === question.correct && (
                <span className="ml-auto">✓</span>
              )}
              {selected &&
                option === selected &&
                option !== question.correct && (
                  <span className="ml-auto">✗</span>
                )}
            </span>
          </button>
        ))}
      </div>

      {/* Result */}
      {(selected || isReadOnly) && (
        <div
          className={`text-sm font-medium px-4 py-2 rounded-lg w-fit ${
            isReadOnly || isCorrect
              ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
              : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
          }`}
        >
          {isReadOnly ? (
            <>
              ✓ সঠিক উত্তর: <MathText text={question.correct} />
            </>
          ) : isCorrect ? (
            '✓ সঠিক উত্তর!'
          ) : (
            '✗ ভুল হয়েছে'
          )}
        </div>
      )}

      {/* Description + Actions */}
      {question.description && (
        <div className="border-t border-slate-100 dark:border-slate-700 pt-4 space-y-3">
          <div className="flex justify-between items-center">
            {/* ব্যাখ্যা বাটন */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                if (!checkMode()) return
                if (isReadOnly) return
                setShowDesc(!showDesc)
              }}
              className="flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-blue-500 transition-colors"
            >
              <span
                className={`transition-transform duration-200 `}
              >
                ব্যাখ্যা
              </span>
              <MdDoubleArrow />
            </button>

            {/* Action বাটন */}
            <div className="flex items-center space-x-4">
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <FiEye />
                {actions.views}
              </span>
              <button
                onClick={handleLike}
                title={session?.user ? 'Like' : 'Login করুন'}
                className={`flex items-center gap-1 text-xs font-medium transition-colors ${
                  actions.isLiked
                    ? 'text-blue-500'
                    : 'text-slate-400 hover:text-blue-500'
                }`}
              >
                <BiLike />
                {actions.likes}
              </button>
              <button
                onClick={handleDislike}
                title={session?.user ? 'Dislike' : 'Login করুন'}
                className={`flex items-center gap-1 text-xs font-medium transition-colors ${
                  actions.isDisliked
                    ? 'text-red-500'
                    : 'text-slate-400 hover:text-red-500'
                }`}
              >
                <BiDislike />
                {actions.dislikes}
              </button>
              <button
                onClick={handleFavourite}
                title={actions.isFavourite ? 'Saved' : 'Save'}
                className={`flex items-center gap-1 text-xs font-medium transition-colors ${
                  actions.isFavourite
                    ? 'text-red-500'
                    : 'text-slate-400 hover:text-red-500'
                }`}
              >
                <FaHeart />
              </button>
              <button
                onClick={handleShare}
                title={copied ? 'কপি হয়েছে!' : 'শেয়ার করুন'}
                className={`flex items-center gap-1 text-xs font-medium transition-colors ${
                  copied
                    ? 'text-green-500'
                    : 'text-slate-400 hover:text-blue-500'
                }`}
              >
                <FaShareAlt />
                {copied && <span>কপি!</span>}
              </button>
            </div>
          </div>

          {/* Description টেক্সট */}
          {(showDesc || isReadOnly) && (
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-700/50 rounded-lg px-4 py-3">
              <MathText text={question.description} />
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default McqCard
