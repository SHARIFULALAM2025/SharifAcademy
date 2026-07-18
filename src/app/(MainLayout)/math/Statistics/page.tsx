'use client'
import React, { useState } from 'react'
import allData from '@/data/statistics.json'
import { StatisticsType } from '@/Types/statistics'
import { FiEye } from 'react-icons/fi'
import { MdOutlineQuiz } from 'react-icons/md'
import McqCard from '@/Component/McqCard/McqCard'

const data = allData as StatisticsType

const Page = () => {
  const [mode, setMode] = useState<'readonly' | 'practice' | null>(null)

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-6">
        {/* Mode বাটন */}
        <div className="flex items-center justify-end flex-wrap gap-4 mb-6">
          <button
            onClick={() => setMode('readonly')}
            className={`flex items-center gap-2 px-4 border py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              mode === 'readonly'
                ? 'bg-card text-foreground shadow-sm border-border'
                : 'border-transparent text-muted hover:text-foreground'
            }`}
          >
            <FiEye
              className={`w-4 h-4 ${mode === 'readonly' ? 'text-primary' : ''}`}
            />
            Read Only
          </button>

          {/* Divider */}
          <div className="w-px h-5 bg-border" />

          {/* Practice বাটন */}
          <button
            onClick={() => setMode('practice')}
            className={`flex items-center gap-2 border px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              mode === 'practice'
                ? 'bg-card text-foreground shadow-sm border-border'
                : 'border-transparent text-muted hover:text-foreground'
            }`}
          >
            <MdOutlineQuiz
              className={`w-4 h-4 ${mode === 'practice' ? 'text-success' : ''}`}
            />
            Practice
          </button>
        </div>

        {/* MCQ Cards */}
        <div className="space-y-4">
          {data.questions.map((q, i) => (
            <McqCard
              key={q.id}
              question={q}
              questionNumber={i + 1}
              mode={mode}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page
