import React from 'react'
import allData from '@/data/saying.json'
import { SayingInterface, SayingSection } from '@/Types/sayingType'
import {
  BookOpen,
  ListOrdered,
  ListTree,
  Quote,
  Hash,
  Table2,
  Repeat2,
  GraduationCap,
  Gavel,
  ArrowRight,
  Info,
  BadgeCheck,
} from 'lucide-react'

const data = allData as SayingInterface

/* ---------- helpers ---------- */

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
const toBn = (n: number) =>
  String(n)
    .split('')
    .map((d) => (BN_DIGITS[Number(d)] !== undefined ? BN_DIGITS[Number(d)] : d))
    .join('')

type Accent = 'indigo' | 'amber' | 'emerald' | 'rose'

type Kind = {
  label: string
  Icon: React.ComponentType<{ className?: string }>
  accent: Accent
}

const KIND_MAP: Record<string, Kind> = {
  definition: { label: 'সংজ্ঞা', Icon: BookOpen, accent: 'indigo' },
  types: { label: 'শ্রেণিবিভাগ', Icon: ListTree, accent: 'indigo' },
  'which-parts-of-speech': {
    label: 'প্রায়োগিক দৃষ্টান্ত',
    Icon: Quote,
    accent: 'indigo',
  },
  singular: { label: 'মূল ধারণা', Icon: Hash, accent: 'emerald' },
  plural: { label: 'মূল ধারণা', Icon: Hash, accent: 'emerald' },
  'plural-formation-methods': {
    label: 'গঠন পদ্ধতি',
    Icon: ListOrdered,
    accent: 'amber',
  },
  'detailed-rules': { label: 'ব্যাকরণ নিয়ম', Icon: Gavel, accent: 'amber' },
  'collective-words-table': {
    label: 'রেফারেন্স টেবিল',
    Icon: Table2,
    accent: 'indigo',
  },
  'singular-to-plural-examples': {
    label: 'রূপান্তর উদাহরণ',
    Icon: Repeat2,
    accent: 'emerald',
  },
  'exam-key-points': {
    label: 'পরীক্ষার প্রস্তুতি',
    Icon: GraduationCap,
    accent: 'rose',
  },
}

const DEFAULT_KIND: Kind = { label: 'বিষয়', Icon: Info, accent: 'indigo' }

// one small map instead of a big custom-hex object — plain Tailwind palette + dark: variants
const ACCENT: Record<
  Accent,
  { border: string; text: string; chip: string; solid: string }
> = {
  indigo: {
    border: 'border-l-indigo-500',
    text: 'text-indigo-600 dark:text-indigo-400',
    chip: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-500/30',
    solid: 'bg-indigo-600',
  },
  amber: {
    border: 'border-l-amber-500',
    text: 'text-amber-700 dark:text-amber-400',
    chip: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30',
    solid: 'bg-amber-600',
  },
  emerald: {
    border: 'border-l-emerald-500',
    text: 'text-emerald-700 dark:text-emerald-400',
    chip: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30',
    solid: 'bg-emerald-600',
  },
  rose: {
    border: 'border-l-rose-500',
    text: 'text-rose-600 dark:text-rose-400',
    chip: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-500/30',
    solid: 'bg-rose-600',
  },
}

/* ---------- small building blocks ---------- */

const Chip = ({
  children,
  accent = 'indigo',
}: {
  children: React.ReactNode
  accent?: Accent
}) => (
  <span
    className={`inline-block rounded-md border px-2.5 py-1 text-[13px] leading-none ${ACCENT[accent].chip}`}
  >
    {children}
  </span>
)

const Eyebrow = ({ kind }: { kind: Kind }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[12px] font-semibold tracking-wide dark:border-slate-700 dark:bg-slate-900 ${ACCENT[kind.accent].text}`}
  >
    <kind.Icon className="h-3.5 w-3.5" />
    {kind.label}
  </span>
)

const Callout = ({
  children,
  accent = 'amber',
}: {
  children: React.ReactNode
  accent?: Accent
}) => (
  <div
    className={`rounded-lg border-l-4 ${ACCENT[accent].border} bg-slate-50 px-4 py-3 text-[14px] leading-relaxed text-slate-700 dark:bg-slate-900 dark:text-slate-300`}
  >
    {children}
  </div>
)

/* ---------- section renderer ---------- */

function SectionCard({
  section,
  index,
}: {
  section: SayingSection
  index: number
}) {
  const kind = KIND_MAP[section.id] ?? DEFAULT_KIND
  const accent = ACCENT[kind.accent]
  const isExamSection = section.id === 'exam-key-points'

  return (
    <section
      id={section.id}
      className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div
        className={`flex items-start justify-between gap-4 rounded-t-2xl border-b border-slate-100 border-l-4 px-6 py-5 dark:border-slate-800 ${accent.border}`}
      >
        <div className="flex flex-col gap-2">
          <Eyebrow kind={kind} />
          <h2 className="text-[22px] font-semibold text-slate-900 dark:text-white">
            {section.title}
          </h2>
        </div>
        <span className="mt-1 shrink-0 text-[28px] font-semibold text-slate-200 dark:text-slate-700">
          {toBn(index + 1)}
        </span>
      </div>

      <div className="flex flex-col gap-4 px-6 py-6">
        {isExamSection && (
          <div
            className={`flex items-center gap-2 self-start rounded-full px-3 py-1.5 text-[12px] font-semibold text-white ${accent.solid}`}
          >
            <BadgeCheck className="h-3.5 w-3.5" />
            পরীক্ষায় আসে
          </div>
        )}

        {section.content && (
          <p className="text-[15px] leading-[1.8] text-slate-700 dark:text-slate-300">
            {section.content}
          </p>
        )}

        {section.definition && (
          <p className="text-[15px] leading-[1.8] text-slate-700 dark:text-slate-300">
            <span className={`mr-1 font-semibold ${accent.text}`}>
              সংজ্ঞা —
            </span>
            {section.definition}
          </p>
        )}

        {section.note && <Callout>{section.note}</Callout>}

        {section.examples && section.examples.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {section.examples.map((ex, i) => (
              <Chip key={i} accent={kind.accent}>
                {ex}
              </Chip>
            ))}
          </div>
        )}

        {section.types && (
          <div className="grid gap-3 sm:grid-cols-2">
            {section.types.map((t, i) => (
              <div
                key={i}
                className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/50"
              >
                <p className={`text-[15px] font-semibold ${accent.text}`}>
                  {t.name}
                </p>
                <p className="mt-1 text-[13.5px] text-slate-500 dark:text-slate-400">
                  {t.meaning}
                </p>
              </div>
            ))}
          </div>
        )}

        {section.example_pairs && (
          <div className="flex flex-col gap-3">
            {section.example_pairs.map((ep, i) => (
              <div
                key={i}
                className="rounded-lg border border-slate-100 px-4 py-3 dark:border-slate-800"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[15.5px] text-slate-900 dark:text-white">
                    {ep.sentence}
                  </p>
                  <Chip accent={kind.accent}>{ep.form}</Chip>
                </div>
                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-slate-500 dark:text-slate-400">
                  {Object.entries(ep.breakdown).map(([pos, word]) => (
                    <span key={pos}>
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {pos}:
                      </span>{' '}
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {section.insight && (
          <p className="border-l-2 border-slate-200 pl-3 text-[13.5px] italic leading-relaxed text-slate-500 dark:border-slate-700 dark:text-slate-400">
            {section.insight}
          </p>
        )}

        {section.formation && (
          <div className="flex flex-col gap-3">
            <p className="text-[15px] leading-[1.8] text-slate-700 dark:text-slate-300">
              {section.formation.rule}
            </p>
            <div className="flex flex-wrap gap-2">
              {section.formation.examples.map((ex, i) => (
                <Chip key={i} accent={kind.accent}>
                  {ex}
                </Chip>
              ))}
            </div>
          </div>
        )}

        {section.additional_note && (
          <Callout accent="indigo">{section.additional_note}</Callout>
        )}

        {section.no_plural_note && (
          <div className="flex flex-col gap-3">
            <p className="text-[15px] leading-[1.8] text-slate-700 dark:text-slate-300">
              {section.no_plural_note.rule}
            </p>
            <div className="flex flex-wrap gap-2">
              {section.no_plural_note.examples.map((ex, i) => (
                <Chip key={i} accent="emerald">
                  {ex}
                </Chip>
              ))}
            </div>
            {section.no_plural_note.exception_case && (
              <Callout>{section.no_plural_note.exception_case}</Callout>
            )}
          </div>
        )}

        {section.methods && (
          <ol className="flex flex-col gap-3">
            {section.methods.map((m) => (
              <li
                key={m.no}
                className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/50"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[12px] font-semibold text-amber-700 dark:bg-amber-500/15 dark:text-amber-400">
                    {toBn(m.no)}
                  </span>
                  <div className="flex flex-col gap-2">
                    <p className="text-[15px] font-medium text-slate-900 dark:text-white">
                      {m.method}
                    </p>
                    {m.detail && (
                      <p className="text-[13.5px] leading-relaxed text-slate-500 dark:text-slate-400">
                        {m.detail}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {m.examples.map((ex, i) => (
                        <Chip key={i} accent="amber">
                          {ex}
                        </Chip>
                      ))}
                    </div>
                    {m.note && (
                      <p className="text-[13px] italic text-slate-500 dark:text-slate-400">
                        {m.note}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}

        {section.rules && (
          <div className="flex flex-col gap-5">
            {section.rules.map((group, gi) => (
              <div key={gi} className="flex flex-col gap-3">
                <p
                  className={`text-[14px] font-semibold uppercase tracking-wide ${accent.text}`}
                >
                  {group.group}
                </p>
                <div className="flex flex-col gap-3">
                  {group.points.map((p, pi) => (
                    <div
                      key={pi}
                      className="rounded-lg border border-slate-100 px-4 py-3 dark:border-slate-800"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 shrink-0 rounded bg-slate-100 px-2 py-0.5 text-[12px] font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                          {p.point}
                        </span>
                        <div className="flex flex-col gap-2">
                          <p className="text-[14.5px] leading-relaxed text-slate-700 dark:text-slate-300">
                            {p.text}
                          </p>
                          {p.examples && (
                            <div className="flex flex-wrap gap-2">
                              {p.examples.map((ex, i) => (
                                <Chip key={i} accent={kind.accent}>
                                  {ex}
                                </Chip>
                              ))}
                            </div>
                          )}
                          {p.wrong_usage_note && (
                            <p className="text-[13px] text-rose-600 dark:text-rose-400">
                              ✕ {p.wrong_usage_note}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {section.table && (
          <div className="grid gap-3 md:grid-cols-3">
            {section.table.map((cat, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50"
              >
                <p className="text-[13.5px] font-semibold text-slate-900 dark:text-white">
                  {cat.category}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cat.words.map((w, wi) => (
                    <Chip key={wi} accent={kind.accent}>
                      {w}
                    </Chip>
                  ))}
                </div>
                <div className="flex flex-col gap-1 border-t border-slate-200 pt-2 text-[13px] text-slate-500 dark:border-slate-700 dark:text-slate-400">
                  {cat.examples.map((ex, ei) => (
                    <span key={ei}>{ex}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {section.conversion_table && (
          <div className="overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800">
            <table className="w-full border-collapse text-[14px]">
              <thead>
                <tr className="bg-slate-50 text-left text-[12.5px] uppercase tracking-wide text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
                  <th className="px-4 py-2 font-semibold">একবচন</th>
                  <th className="px-4 py-2 font-semibold" />
                  <th className="px-4 py-2 font-semibold">বহুবচন</th>
                </tr>
              </thead>
              <tbody>
                {section.conversion_table.map((row, i) => (
                  <tr
                    key={i}
                    className="border-t border-slate-100 dark:border-slate-800"
                  >
                    <td className="px-4 py-2 text-slate-900 dark:text-white">
                      {row.singular}
                    </td>
                    <td className="px-2 py-2 text-slate-300 dark:text-slate-600">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </td>
                    <td className="px-4 py-2 font-medium text-emerald-700 dark:text-emerald-400">
                      {row.plural}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {section.key_points && (
          <ul className="flex flex-col gap-2.5">
            {section.key_points.map((kp, i) => (
              <li
                key={i}
                className="flex gap-3 text-[14.5px] leading-relaxed text-slate-700 dark:text-slate-300"
              >
                <span className="mt-0.5 shrink-0 text-rose-500">—</span>
                <span className="underline decoration-rose-400/40 decoration-2 underline-offset-4">
                  {kp}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

/* ---------- page ---------- */

const Page = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* header */}
      <header>
        <div className="mx-auto flex max-w-3xl flex-col gap-4 px-5 pb-8 pt-10 md:px-8">
          <h1 className="text-center text-[40px] font-bold leading-none text-slate-900 dark:text-white md:text-[52px]">
            {data.topic}
          </h1>
          <p className="text-center text-[15px] leading-[1.8] text-slate-600 dark:text-slate-100">
            {data.description}
          </p>
        </div>
      </header>

      {/* body */}
      <div className="px-5 py-10 md:px-8">
        <main className=" flex flex-col gap-6">
          {data.sections.map((s, i) => (
            <SectionCard key={s.id} section={s} index={i} />
          ))}

          <footer className="flex items-center justify-center gap-2 py-6 text-[13px] text-slate-400">
            <BookOpen className="h-3.5 w-3.5" />
            রেফারেন্স: বাংলা দ্বিতীয় পত্র, ব্যাকরণ অংশ — বচন
          </footer>
        </main>
      </div>
    </div>
  )
}

export default Page
