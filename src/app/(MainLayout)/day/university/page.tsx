'use client'

import { useState } from 'react'
import allData from '@/data/university.json'
import { lcmAndHcmMcq } from '@/Types/lcmAndHcm'
import McqCard from '@/Component/McqCard/McqCard'
import { FiEye } from 'react-icons/fi'
import { MdOutlineQuiz } from 'react-icons/md'
const data = allData as lcmAndHcmMcq[]

const Page = () => {
  const [mode, setMode] = useState<'readonly' | 'practice' | null>(null)

  return (
    <div className="dark:bg-slate-900 min-h-screen relative">
      {/* Mode বাটন */}
      <div className="absolute flex items-center gap-5 right-0 top-3">
        <button
          onClick={() => setMode('readonly')}
          className={`flex items-center gap-2 px-4 border py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            mode === 'readonly'
              ? 'bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 shadow-sm border border-slate-200 dark:border-slate-600'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
          }`}
        >
          <FiEye
            className={`w-4 h-4 ${mode === 'readonly' ? 'text-blue-500' : ''}`}
          />
          Read Only
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-slate-300 dark:bg-slate-600" />

        {/* Practice বাটন */}
        <button
          onClick={() => setMode('practice')}
          className={`flex items-center gap-2 border px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            mode === 'practice'
              ? 'bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 shadow-sm border border-slate-200 dark:border-slate-600'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
          }`}
        >
          <MdOutlineQuiz
            className={`w-4 h-4 ${mode === 'practice' ? 'text-emerald-500' : ''}`}
          />
          Practice
        </button>
      </div>

      {/* MCQ Cards */}
      <div className="">
        {data.map((q, i) => (
          <McqCard key={q.id} question={q} questionNumber={i + 1} mode={mode} />
        ))}
      </div>
    </div>
  )
}

export default Page
