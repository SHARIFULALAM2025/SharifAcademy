'use client'
import React, { useState, useMemo } from 'react'
import dayData from '@/data/bangladeshAndInternationalDay.json'
import { AllDayType, DayEntry, MonthEntry } from '@/Types/Day'
import { FaSearch } from 'react-icons/fa'
import { IoMdArrowDropdown } from 'react-icons/io'
import Error from '@/Component/Error/Error'

const MONTH_ORDER = [
  'জানুয়ারি',
  'ফেব্রুয়ারি',
  'মার্চ',
  'এপ্রিল',
  'মে',
  'জুন',
  'জুলাই',
  'আগস্ট',
  'সেপ্টেম্বর',
  'অক্টোবর',
  'নভেম্বর',
  'ডিসেম্বর',
]

const MONTH_EN: Record<string, string> = {
  জানুয়ারি: 'JAN',
  ফেব্রুয়ারি: 'FEB',
  মার্চ: 'MAR',
  এপ্রিল: 'APR',
  মে: 'MAY',
  জুন: 'JUN',
  জুলাই: 'JUL',
  আগস্ট: 'AUG',
  সেপ্টেম্বর: 'SEP',
  অক্টোবর: 'OCT',
  নভেম্বর: 'NOV',
  ডিসেম্বর: 'DEC',
}

// Importance now maps to the theme's semantic tokens instead of raw
// Tailwind colors, so it automatically adapts across light/dark mode.
const importanceConfig: Record<
  string,
  { label: string; dotClass: string; badgeClass: string; textClass: string }
> = {
  'অতি গুরুত্বপূর্ণ *': {
    label: 'অতি গুরুত্বপূর্ণ',
    dotClass: 'bg-danger',
    badgeClass: 'bg-danger/10 text-danger border border-danger/30',
    textClass: 'text-danger',
  },
  'গুরুত্বপূর্ণ *': {
    label: 'গুরুত্বপূর্ণ',
    dotClass: 'bg-warning',
    badgeClass: 'bg-warning/10 text-warning border border-warning/30',
    textClass: 'text-warning',
  },
  গুরুত্বপূর্ণ: {
    label: 'গুরুত্বপূর্ণ',
    dotClass: 'bg-warning',
    badgeClass: 'bg-warning/10 text-warning border border-warning/30',
    textClass: 'text-warning',
  },
  মাঝারি: {
    label: 'মাঝারি',
    dotClass: 'bg-info',
    badgeClass: 'bg-info/10 text-info border border-info/30',
    textClass: 'text-info',
  },
}

function getImportance(key: string) {
  return (
    importanceConfig[key] ?? {
      label: key,
      dotClass: 'bg-muted',
      badgeClass: 'bg-background text-muted border border-border',
      textClass: 'text-muted',
    }
  )
}

function DayCard({ day }: { day: DayEntry }) {
  const [open, setOpen] = useState(false)
  const imp = getImportance(day.importance)

  return (
    <div
      className={`group relative bg-card py-24 rounded-xl border transition-all duration-200 overflow-hidden
        ${open ? 'border-accent/50 shadow-md' : 'border-border hover:border-accent/30 hover:shadow-sm'}`}
    >
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 ${imp.dotClass} opacity-80`}
      />

      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full text-left px-5 py-4 pl-6"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p
              className={`text-[11px] font-semibold tracking-widest uppercase mb-1 ${imp.textClass}`}
            >
              {day.date}
            </p>
            <p className="text-[15px] font-semibold text-foreground leading-snug">
              {day.name}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0 pt-0.5">
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${imp.badgeClass}`}
            >
              {imp.label}
            </span>
            {day.note && (
              <span
                className={`text-muted transition-transform duration-200 text-xl ${open ? 'rotate-180' : ''}`}
              >
                <IoMdArrowDropdown />
              </span>
            )}
          </div>
        </div>
      </button>

      {day.note && open && (
        <div className="px-6 pb-4 pt-0">
          <div className="h-px bg-border mb-3" />
          <p className="text-[13px] text-muted leading-relaxed">{day.note}</p>
        </div>
      )}
    </div>
  )
}

function MonthSection({
  entry,
  isActive,
}: {
  entry: MonthEntry
  isActive: boolean
}) {
  const totalCritical = entry.days.filter(
    (d) => d.importance === 'অতি গুরুত্বপূর্ণ *'
  ).length

  return (
    <section id={`month-${entry.month}`} className="scroll-mt-24 pt-5">
      {/* Month header */}
      <div className="flex justify-center items-center gap-4 mb-5">
        <div
          className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl shrink-0 transition-colors
            ${isActive ? 'bg-primary text-primary-foreground' : 'bg-background text-muted'}`}
        >
          <span className="text-[10px] font-bold tracking-widest leading-none">
            {MONTH_EN[entry.month]}
          </span>
          <span className="text-[22px] font-black leading-tight">
            {(MONTH_ORDER.indexOf(entry.month) + 1).toString().padStart(2, '0')}
          </span>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">
            {entry.month}
          </h2>
          <p className="text-xs text-muted mt-0.5">
            {entry.days.length}টি দিবস
            {totalCritical > 0 && (
              <span className="ml-2 text-danger font-semibold">
                · {totalCritical}টি অতি গুরুত্বপূর্ণ
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="space-y-2 grid grid-cols-2 gap-3 pl-0.5">
        {entry.days.map((day, i) => (
          <DayCard key={i} day={day} />
        ))}
      </div>
    </section>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const Page = () => {
  const raw = dayData as AllDayType[]
  const dataset = raw[0]

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<string>('সব')
  const [activeMonth, setActiveMonth] = useState<string | null>(null)

  // sorted months
  const sortedMonths = useMemo(() => {
    return [...dataset.months].sort(
      (a, b) => MONTH_ORDER.indexOf(a.month) - MONTH_ORDER.indexOf(b.month)
    )
  }, [dataset])

  // search & filter
  const filteredMonths = useMemo(() => {
    const q = search.toLowerCase().trim()
    return sortedMonths
      .map((m) => ({
        ...m,
        days: m.days.filter((d) => {
          const matchSearch =
            !q ||
            d.name.includes(q) ||
            d.date.includes(q) ||
            (d.note ?? '').includes(q)
          const matchFilter =
            filter === 'সব' ||
            (filter === 'অতি গুরুত্বপূর্ণ' &&
              d.importance === 'অতি গুরুত্বপূর্ণ *') ||
            (filter === 'গুরুত্বপূর্ণ' &&
              (d.importance === 'গুরুত্বপূর্ণ' ||
                d.importance === 'গুরুত্বপূর্ণ *')) ||
            (filter === 'মাঝারি' && d.importance === 'মাঝারি')
          return matchSearch && matchFilter
        }),
      }))
      .filter((m) => m.days.length > 0)
  }, [sortedMonths, search, filter])

  const totalDays = sortedMonths.reduce((s, m) => s + m.days.length, 0)
  const criticalDays = sortedMonths.reduce(
    (s, m) =>
      s + m.days.filter((d) => d.importance === 'অতি গুরুত্বপূর্ণ *').length,
    0
  )

  const handleMonthNav = (month: string) => {
    setActiveMonth(month)
    const el = document.getElementById(`month-${month}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-background font-body">
      {/* ── Top header ── */}
      <header className="sticky top-0 z-30 bg-card border-b border-dotted border-border shadow-sm">
        <div className="px-4 py-3 flex items-center gap-4 flex-wrap">
          {/* Logo / Title */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-black">
                দি
              </span>
            </div>
            <div>
              <p className="text-xs font-bold text-foreground leading-none">
                বাংলাদেশ দিবস
              </p>
              <p className="text-[10px] text-muted leading-none">
                জাতীয় ও আন্তর্জাতিক
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 min-w-45">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">
                <FaSearch />
              </span>
              <input
                type="text"
                placeholder="জানুয়ারি... ,জাতীয় পরিসংখ্যান দিবস......"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-background text-foreground border border-border rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-row">
            {[
              { label: 'মোট দিবস', value: totalDays, color: 'text-foreground' },
              {
                label: 'অতি গুরুত্বপূর্ণ',
                value: criticalDays,
                color: 'text-danger',
              },
              { label: 'মাস', value: 12, color: 'text-primary' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className={`text-xs font-black ${s.color}`}>{s.value}</p>
                <p className={`text-xs mt-0.5 ${s.color} font-medium`}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex px-4 gap-1 items-center">
          <div className="flex items-center gap-1.5 flex-wrap">
            {['সব', 'অতি গুরুত্বপূর্ণ', 'গুরুত্বপূর্ণ', 'মাঝারি'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2 py-1.5 rounded-md text-xs font-semibold transition-all border
                  ${
                    filter === f
                      ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                      : 'bg-background text-muted border-border hover:border-accent'
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="sticky flex gap-2">
            {sortedMonths.map((m) => {
              const hasResults = filteredMonths.some(
                (fm) => fm.month === m.month
              )
              return (
                <button
                  key={m.month}
                  onClick={() => handleMonthNav(m.month)}
                  disabled={!hasResults}
                  className={`px-2 py-1.5 rounded-md text-xs font-semibold transition-all border
                    ${
                      activeMonth === m.month
                        ? 'bg-primary text-primary-foreground border-primary cursor-pointer'
                        : hasResults
                          ? 'bg-background text-muted border-border hover:text-accent hover:border-accent cursor-pointer'
                          : 'bg-background text-muted/40 border-border cursor-not-allowed'
                    }`}
                >
                  <span>{m.month}</span>
                </button>
              )
            })}
          </div>
        </div>
      </header>
      {/* Stats bar */}

      <div className="max-w-6xl mx-auto px-4 flex gap-8">
        <main className="flex-1 min-w-0">
          {/* Mobile month tabs */}
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 mb-6 -mx-1 px-1">
            {sortedMonths.map((m) => (
              <button
                key={m.month}
                onClick={() => handleMonthNav(m.month)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all
                  ${
                    activeMonth === m.month
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card text-muted border-border hover:border-accent'
                  }`}
              >
                {m.month}
              </button>
            ))}
          </div>

          {/* No results */}
          {filteredMonths.length === 0 && <Error />}

          {/* Month sections */}
          <div className="space-y-12">
            {filteredMonths.map((m) => (
              <MonthSection
                key={m.month}
                entry={m}
                isActive={activeMonth === m.month}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Page
