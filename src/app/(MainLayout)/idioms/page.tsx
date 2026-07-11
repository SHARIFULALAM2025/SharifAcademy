'use client'

import React, { useMemo, useState } from 'react'
import idiomsData from '@/data/idioms.json'
import { IdiomData } from '@/Types/idiom'

interface FlatEntry {
  category: string
  idiom: string
  meaning: string
}

const data = idiomsData as IdiomData[]

// Flatten the grouped data into one simple list, once
const allEntries: FlatEntry[] = []
data.forEach((group) => {
  group.idioms.forEach((item) => {
    allEntries.push({
      category: group.category,
      idiom: item.idiom,
      meaning: item.meaning,
    })
  })
})

const PAGE_SIZE_OPTIONS = [10, 20, 50]

// Convert normal digits to Bengali digits, e.g. 12 -> ১২
function toBengaliNumber(n: number): string {
  const digits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
  return String(n)
    .split('')
    .map((d) => digits[Number(d)] ?? d)
    .join('')
}

// Build a page list with ellipsis, e.g. 1 … 4 5 [6] 7 8 … 20
function buildPageList(current: number, total: number): (number | '…')[] {
  const pages: (number | '…')[] = []
  const windowSize = 1
  for (let p = 1; p <= total; p++) {
    if (p === 1 || p === total || Math.abs(p - current) <= windowSize) {
      pages.push(p)
    } else if (pages[pages.length - 1] !== '…') {
      pages.push('…')
    }
  }
  return pages
}

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)

  const totalPages = Math.max(1, Math.ceil(allEntries.length / pageSize))

  const rows = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return allEntries.slice(start, start + pageSize)
  }, [currentPage, pageSize])

  const rangeStart =
    allEntries.length === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const rangeEnd = Math.min(currentPage * pageSize, allEntries.length)
  const pageList = buildPageList(currentPage, totalPages)

  const goToPage = (p: number) => {
    setCurrentPage(Math.min(totalPages, Math.max(1, p)))
  }

  const changePageSize = (size: number) => {
    setPageSize(size)
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Header */}
      <header className="border-b border-stone-300 dark:border-slate-800">
        <div className="mx-auto max-w-5xl px-5 py-8">
          <h1 className="font-serif text-center text-3xl font-bold">
            বাংলা বাগধারা অভিধান
          </h1>
          <p className="mt-1 text-center text-sm text-stone-600 dark:text-slate-400">
            মোট {toBengaliNumber(allEntries.length)}টি বাগধারা ও তাদের অর্থ
          </p>
        </div>
      </header>

      {/* Table */}
      <div className="">
        <div className="rounded-lg border border-stone-300 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="w-14 px-4 py-3 text-center text-xs font-semibold text-stone-600 dark:text-slate-300 bg-stone-200 dark:bg-slate-800 border-b-2 border-red-800 dark:border-red-500">
                    নং
                  </th>
                  <th className="hidden sm:table-cell w-16 px-4 py-3 text-center text-xs font-semibold text-stone-600 dark:text-slate-300 bg-stone-200 dark:bg-slate-800 border-b-2 border-red-800 dark:border-red-500">
                    বর্ণ
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-stone-600 dark:text-slate-300 bg-stone-200 dark:bg-slate-800 border-b-2 border-red-800 dark:border-red-500">
                    বাগধারা
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-stone-600 dark:text-slate-300 bg-stone-200 dark:bg-slate-800 border-b-2 border-red-800 dark:border-red-500">
                    অর্থ
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((entry, idx) => (
                  <tr
                    key={rangeStart + idx}
                    className="hover:bg-red-50/60 dark:hover:bg-slate-800/60"
                  >
                    <td className="px-4 py-3 border-b border-stone-200 dark:border-slate-800 text-center align-top font-serif text-xs text-stone-400 dark:text-slate-500">
                      {toBengaliNumber(rangeStart + idx)}
                    </td>
                    <td className="hidden sm:table-cell px-4 py-3 border-b border-stone-200 dark:border-slate-800 text-center align-top">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-100 dark:bg-red-500/15 text-red-800 dark:text-red-400 font-serif font-bold text-sm">
                        {entry.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 border-b border-stone-200 dark:border-slate-800 align-top font-serif font-semibold text-[17px] text-stone-900 dark:text-slate-100">
                      {entry.idiom}
                    </td>
                    <td className="px-4 py-3 border-b border-stone-200 dark:border-slate-800 align-top text-sm text-stone-600 dark:text-white leading-relaxed">
                      {entry.meaning}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Premium pagination bar */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-lg border border-stone-300 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 shadow-sm">
          <div className="flex items-center gap-3 text-sm text-stone-500 dark:text-slate-400">
            <span>
              <span className="font-semibold text-stone-700 dark:text-slate-200">
                {toBengaliNumber(rangeStart)}–{toBengaliNumber(rangeEnd)}
              </span>{' '}
              এর মধ্যে, মোট {toBengaliNumber(allEntries.length)}টি
            </span>

            <select
              value={pageSize}
              onChange={(e) => changePageSize(Number(e.target.value))}
              className="rounded-md border border-stone-300 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-stone-600 dark:text-slate-300 px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-red-800/30 dark:focus:ring-red-500/30 focus:border-red-800 dark:focus:border-red-500"
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option
                  key={size}
                  value={size}
                  className="dark:bg-slate-800 dark:text-slate-200"
                >
                  প্রতি পৃষ্ঠায় {toBengaliNumber(size)}টি
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1">
            {/* First page */}
            <button
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              aria-label="প্রথম পৃষ্ঠা"
              className="h-9 w-9 flex items-center justify-center rounded-md text-stone-500 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-800 hover:text-red-800 dark:hover:text-red-400 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-stone-500 dark:disabled:hover:text-slate-400 transition-colors"
            >
              «
            </button>

            {/* Previous */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="পূর্ববর্তী"
              className="h-9 w-9 flex items-center justify-center rounded-md text-stone-500 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-800 hover:text-red-800 dark:hover:text-red-400 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-stone-500 dark:disabled:hover:text-slate-400 transition-colors"
            >
              ‹
            </button>

            {/* Page numbers */}
            <div className="flex items-center gap-1 mx-1">
              {pageList.map((p, i) =>
                p === '…' ? (
                  <span
                    key={`dots-${i}`}
                    className="px-1.5 text-sm text-stone-400 dark:text-slate-600 select-none"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    aria-current={p === currentPage ? 'page' : undefined}
                    className={`h-9 min-w-9 px-2 flex items-center justify-center rounded-md font-serif text-sm transition-all ${
                      p === currentPage
                        ? 'bg-red-800 dark:bg-red-600 text-white font-bold shadow-md shadow-red-800/25 dark:shadow-red-600/20 scale-105'
                        : 'text-stone-600 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {toBengaliNumber(p)}
                  </button>
                )
              )}
            </div>

            {/* Next */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="পরবর্তী"
              className="h-9 w-9 flex items-center justify-center rounded-md text-stone-500 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-800 hover:text-red-800 dark:hover:text-red-400 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-stone-500 dark:disabled:hover:text-slate-400 transition-colors"
            >
              ›
            </button>

            {/* Last page */}
            <button
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
              aria-label="শেষ পৃষ্ঠা"
              className="h-9 w-9 flex items-center justify-center rounded-md text-stone-500 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-800 hover:text-red-800 dark:hover:text-red-400 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-stone-500 dark:disabled:hover:text-slate-400 transition-colors"
            >
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
