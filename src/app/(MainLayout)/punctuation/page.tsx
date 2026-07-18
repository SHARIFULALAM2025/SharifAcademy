import React from 'react'
import allData from '@/data/punctuation.json'

import {
  BookOpen,
  Table2,
  GraduationCap,
  BadgeCheck,
  Info,
  PauseCircle,
  AlignLeft,
  Quote,
} from 'lucide-react'
import { Punctuation, PunctuationSection } from '@/Types/punctuation'

const data = allData as Punctuation

/* ---------- helpers ---------- */

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
const toBn = (n: number) =>
  String(n)
    .split('')
    .map((d) => (BN_DIGITS[Number(d)] !== undefined ? BN_DIGITS[Number(d)] : d))
    .join('')

// "কমা বা পাদচ্ছেদ ( , )" -> { text: "কমা বা পাদচ্ছেদ", symbol: "," }
function parseTitle(title: string): { text: string; symbol?: string } {
  const m = title.match(/^(.*?)\s*\(([^)]+)\)\s*$/)
  if (m) return { text: m[1].trim(), symbol: m[2].trim() }
  return { text: title }
}

/* ---------- shared glyph tile ---------- */

const Glyph = ({
  symbol,
  size = 'md',
}: {
  symbol: string
  size?: 'sm' | 'md' | 'lg'
}) => {
  const dims =
    size === 'lg'
      ? 'h-16 w-16 text-[26px]'
      : size === 'sm'
        ? 'h-10 w-10 text-[15px]'
        : 'h-14 w-14 text-[20px]'
  return (
    <span
      className={`flex ${dims} shrink-0 items-center justify-center rounded-xl border border-violet-200 bg-violet-50 font-mono font-semibold leading-none text-violet-700 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-300`}
    >
      {symbol}
    </span>
  )
}

/* ---------- intro / definition block ---------- */

function IntroBlock({ section }: { section: PunctuationSection }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-3 flex items-center gap-2">
        <Info className="h-4 w-4 text-violet-600 dark:text-violet-400" />
        <span className="text-[12px] font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-400">
          সংজ্ঞা
        </span>
      </div>
      <p className="text-[15px] leading-[1.9] text-slate-700 dark:text-slate-300">
        {section.content}
      </p>
    </div>
  )
}

/* ---------- classification block ---------- */

function ClassificationBlock({ section }: { section: PunctuationSection }) {
  if (!section.categories) return null
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-1 flex items-center gap-2">
        <AlignLeft className="h-4 w-4 text-violet-600 dark:text-violet-400" />
        <h2 className="text-[18px] font-semibold text-slate-900 dark:text-white">
          {section.title}
        </h2>
      </div>
      {section.content && (
        <p className="mb-5 text-[14px] leading-relaxed text-slate-500 dark:text-slate-400">
          {section.content}
        </p>
      )}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {section.categories.map((c, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-100 bg-gradient-to-b from-violet-50 to-white p-5 text-center dark:border-slate-800 dark:from-violet-500/10 dark:to-transparent"
          >
            <p className="font-mono text-[34px] font-bold leading-none text-violet-700 dark:text-violet-300">
              {toBn(c.count)}
            </p>
            <p className="mt-2 text-[13px] leading-snug text-slate-600 dark:text-slate-400">
              {c.category}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- specimen grid (full marks table) ---------- */

function SpecimenGrid({ section }: { section: PunctuationSection }) {
  if (!section.table) return null
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5 flex items-center gap-2">
        <Table2 className="h-4 w-4 text-violet-600 dark:text-violet-400" />
        <h2 className="text-[18px] font-semibold text-slate-900 dark:text-white">
          {section.title}
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {section.table.map((row, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-4 text-center dark:border-slate-800 dark:bg-slate-800/40"
          >
            <Glyph symbol={row.symbol} />
            <p className="text-[12.5px] font-medium leading-snug text-slate-800 dark:text-slate-200">
              {row.name}
            </p>
            <p className="flex items-center gap-1 text-[11px] leading-snug text-slate-500 dark:text-slate-400">
              <PauseCircle className="h-3 w-3 shrink-0" />
              {row.pause}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- individual mark card ---------- */

function MarkCard({
  section,
  index,
}: {
  section: PunctuationSection
  index: number
}) {
  const { text: titleText, symbol } = parseTitle(section.title)

  return (
    <section
      id={section.id}
      className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:flex-row"
    >
      <div className="flex shrink-0 flex-col items-center gap-2 sm:w-24">
        {symbol ? (
          <Glyph symbol={symbol} size="lg" />
        ) : (
          <Glyph symbol={toBn(index + 1)} size="lg" />
        )}
        <span className="font-mono text-[11px] text-slate-300 dark:text-slate-700">
          {toBn(index + 1)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 border-t border-slate-100 pt-4 dark:border-slate-800 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
        <h3 className="text-[17px] font-semibold text-slate-900 dark:text-white">
          {titleText}
        </h3>

        {section.content && (
          <p className="text-[14.5px] leading-relaxed text-slate-700 dark:text-slate-300">
            {section.content}
          </p>
        )}
        {section.definition && (
          <p className="text-[14.5px] leading-relaxed text-slate-700 dark:text-slate-300">
            {section.definition}
          </p>
        )}

        {section.rules && (
          <ul className="flex flex-col gap-2.5">
            {section.rules.map((r, i) => (
              <li
                key={i}
                className="rounded-lg bg-slate-50 px-3 py-2.5 dark:bg-slate-800/40"
              >
                <p className="text-[13.5px] leading-relaxed text-slate-700 dark:text-slate-300">
                  <span className="mr-1.5 font-mono text-violet-600 dark:text-violet-400">
                    {toBn(i + 1)}.
                  </span>
                  {r.rule}
                </p>
                {r.example && (
                  <p className="mt-1.5 flex items-center gap-1.5 pl-5 text-[13px] text-teal-700 dark:text-teal-400">
                    <Quote className="h-3 w-3 shrink-0" />
                    {r.example}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}

        {section.examples && section.examples.length > 0 && (
          <div className="flex flex-col gap-1.5">
            {section.examples.map((ex, i) => (
              <p
                key={i}
                className="flex items-center gap-1.5 text-[13.5px] text-teal-700 dark:text-teal-400"
              >
                <Quote className="h-3 w-3 shrink-0" />
                {ex}
              </p>
            ))}
          </div>
        )}

        {section.insight && (
          <p className="border-l-2 border-violet-200 pl-3 text-[13px] italic leading-relaxed text-slate-500 dark:border-violet-500/30 dark:text-slate-400">
            {section.insight}
          </p>
        )}

        {section.types && (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {section.types.map((t, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-800/40"
              >
                <Glyph symbol={t.symbol} size="sm" />
                <span className="text-[12.5px] text-slate-700 dark:text-slate-300">
                  {t.name}
                </span>
              </div>
            ))}
          </div>
        )}

        {section.source_note && (
          <span className="self-start text-[11px] text-slate-300 dark:text-slate-600">
            {section.source_note}
          </span>
        )}
      </div>
    </section>
  )
}

/* ---------- exam prep block ---------- */

function ExamPrepBlock({ section }: { section: PunctuationSection }) {
  if (!section.key_points) return null
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-6 dark:border-rose-500/25 dark:bg-rose-500/5">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex items-center gap-1.5 rounded-full bg-rose-600 px-3 py-1.5 text-[12px] font-semibold text-white">
          <BadgeCheck className="h-3.5 w-3.5" />
          পরীক্ষায় আসে
        </div>
        <h2 className="text-[16px] font-semibold text-slate-900 dark:text-white">
          {section.title}
        </h2>
      </div>
      <ul className="flex flex-col gap-2.5">
        {section.key_points.map((kp, i) => (
          <li
            key={i}
            className="flex gap-3 text-[14px] leading-relaxed text-slate-700 dark:text-slate-300"
          >
            <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
            <span className="underline decoration-rose-400/40 decoration-2 underline-offset-4">
              {kp}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ---------- page ---------- */

const Page = () => {
  const classificationSection = data.sections.find(
    (s) => s.id === 'classification'
  )
  const marksTableSection = data.sections.find((s) => s.id === 'marks-table')
  const examSection = data.sections.find((s) => s.id === 'exam-key-points')
  const introSection = data.sections.find((s) => s.id === 'definition')

  const markSections = data.sections.filter(
    (s) =>
      ![
        'classification',
        'marks-table',
        'exam-key-points',
        'definition',
      ].includes(s.id)
  )

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* header */}
      <header className="border-b border-slate-100 dark:border-slate-800">
        <div className="flex flex-col items-center gap-3 px-5 pb-10 pt-12 text-center md:px-8">
          <h1 className="text-[42px] font-bold leading-none text-slate-900 dark:text-white md:text-[54px]">
            {data.topic}
          </h1>
          <p className="max-w-xl text-[15px] leading-[1.9] text-slate-600 dark:text-slate-400">
            {data.description}
          </p>
        </div>
      </header>

      {/* body */}
      <div className="px-5 py-10 md:px-8">
        <main className=" flex  flex-col gap-6">
          {introSection && <IntroBlock section={introSection} />}
          {classificationSection && (
            <ClassificationBlock section={classificationSection} />
          )}
          {marksTableSection && <SpecimenGrid section={marksTableSection} />}

          {markSections.map((s, i) => (
            <MarkCard key={s.id} section={s} index={i} />
          ))}

          {examSection && <ExamPrepBlock section={examSection} />}

          <footer className="flex items-center justify-center gap-2 py-6 text-[13px] text-slate-400">
            <BookOpen className="h-3.5 w-3.5" />
            রেফারেন্স: বাংলা ব্যাকরণ — যতিচিহ্ন
          </footer>
        </main>
      </div>
    </div>
  )
}

export default Page
