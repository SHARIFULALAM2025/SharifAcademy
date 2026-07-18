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
    <div className="min-h-screen bg-background text-foreground font-body">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto max-w-5xl px-5 py-8">
          <h1 className="font-display text-center text-3xl font-bold text-foreground">
            বাংলা বাগধারা অভিধান
          </h1>
          <p className="mt-1 text-center text-sm text-muted">
            মোট {toBengaliNumber(allEntries.length)}টি বাগধারা ও তাদের অর্থ
          </p>
        </div>
      </header>

      {/* Table */}
      <div className="mx-auto max-w-5xl px-5 py-6">
        <div className="rounded-lg border border-border bg-card overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="w-14 px-4 py-3 text-center text-xs font-semibold text-muted bg-background border-b-2 border-accent">
                    নং
                  </th>
                  <th className="hidden sm:table-cell w-16 px-4 py-3 text-center text-xs font-semibold text-muted bg-background border-b-2 border-accent">
                    বর্ণ
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted bg-background border-b-2 border-accent">
                    বাগধারা
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted bg-background border-b-2 border-accent">
                    অর্থ
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((entry, idx) => (
                  <tr
                    key={rangeStart + idx}
                    className="hover:bg-accent/5 transition-colors"
                  >
                    <td className="px-4 py-3 border-b border-border text-center align-top font-display text-xs text-muted">
                      {toBengaliNumber(rangeStart + idx)}
                    </td>
                    <td className="hidden sm:table-cell px-4 py-3 border-b border-border text-center align-top">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent/15 text-accent font-display font-bold text-sm">
                        {entry.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 border-b border-border align-top font-display font-semibold text-[17px] text-foreground">
                      {entry.idiom}
                    </td>
                    <td className="px-4 py-3 border-b border-border align-top text-sm text-muted leading-relaxed">
                      {entry.meaning}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Premium pagination bar */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-lg border border-border bg-card px-4 py-3 shadow-sm">
          <div className="flex items-center gap-3 text-sm text-muted">
            <span>
              <span className="font-semibold text-foreground">
                {toBengaliNumber(rangeStart)}–{toBengaliNumber(rangeEnd)}
              </span>{' '}
              এর মধ্যে, মোট {toBengaliNumber(allEntries.length)}টি
            </span>

            <select
              value={pageSize}
              onChange={(e) => changePageSize(Number(e.target.value))}
              className="rounded-md border border-border bg-background text-muted px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>
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
              className="h-9 w-9 flex items-center justify-center rounded-md text-muted hover:bg-background hover:text-accent disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted transition-colors"
            >
              «
            </button>

            {/* Previous */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="পূর্ববর্তী"
              className="h-9 w-9 flex items-center justify-center rounded-md text-muted hover:bg-background hover:text-accent disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted transition-colors"
            >
              ‹
            </button>

            {/* Page numbers */}
            <div className="flex items-center gap-1 mx-1">
              {pageList.map((p, i) =>
                p === '…' ? (
                  <span
                    key={`dots-${i}`}
                    className="px-1.5 text-sm text-muted select-none"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    aria-current={p === currentPage ? 'page' : undefined}
                    className={`h-9 min-w-9 px-2 flex items-center justify-center rounded-md font-display text-sm transition-all ${
                      p === currentPage
                        ? 'bg-accent text-accent-foreground font-bold shadow-md shadow-accent/25 scale-105'
                        : 'text-muted hover:bg-background'
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
              className="h-9 w-9 flex items-center justify-center rounded-md text-muted hover:bg-background hover:text-accent disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted transition-colors"
            >
              ›
            </button>

            {/* Last page */}
            <button
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
              aria-label="শেষ পৃষ্ঠা"
              className="h-9 w-9 flex items-center justify-center rounded-md text-muted hover:bg-background hover:text-accent disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted transition-colors"
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
