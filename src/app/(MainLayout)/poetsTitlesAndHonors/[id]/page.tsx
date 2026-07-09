import React from 'react'
import allData from '@/data/poet.json'
import { PoetDataset } from '@/Types/poetData'
import Link from 'next/link'
import Image from 'next/image'

const data = allData as PoetDataset

interface PageProps {
  params: Promise<{ id: string }>
}

const page = async ({ params }: PageProps) => {
  const { id } = await params

  const poet = data.writers.find((w) => w.id.toString() === id)

  if (!poet) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-2xl font-bold text-red-500 mb-4">
          দুঃখিত, তথ্য পাওয়া যায়নি!
        </h1>
        <Link
          href="/poetsTitlesAndHonors"
          className="text-blue-600 hover:underline"
        >
          মূল পাতায় ফিরে যান
        </Link>
      </div>
    )
  }

  const facts = poet.examImportantFacts?.length
    ? poet.examImportantFacts
    : poet.importantFacts

  return (
    <div className="min-h-screen bg-gray-50  ">
      <div className=" bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-6 sm:p-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-6 mb-6 gap-4">
            <div className="flex items-center gap-5">
              {poet.image && (
                <Image
                  src={poet.image}
                  alt={poet.name}
                  width={96}
                  height={96}
                  className="rounded-full object-cover border-2 border-indigo-200 w-24 h-24"
                />
              )}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                  {poet.name}
                </h1>
                {poet.pseudonym && (
                  <p className="text-sm text-gray-500 mb-1">
                    ছদ্মনাম: {poet.pseudonym}
                  </p>
                )}
                <p className="text-md text-indigo-600 font-semibold">
                  জীবনকাল: {poet.dateOfBirth || 'অজানা'} –{' '}
                  {poet.dateOfDeath || 'বর্তমান'}
                </p>
              </div>
            </div>

            <Link
              href="/poetsTitlesAndHonors"
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition whitespace-nowrap"
            >
              ← ফিরে যান
            </Link>
          </div>

          {/* Titles */}
          {poet.titles && poet.titles.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2">
              {poet.titles.map((title, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full"
                >
                  {title}
                </span>
              ))}
            </div>
          )}

          {/* Short Description */}
          {poet.shortDes && (
            <Section title="সংক্ষিপ্ত পরিচিতি">
              <p className="text-gray-700 leading-relaxed">{poet.shortDes}</p>
            </Section>
          )}

          {/* Family */}
          {poet.family && (
            <Section title="পারিবারিক তথ্য">
              <div className="grid sm:grid-cols-2 gap-4">
                <InfoRow label="পিতা" value={poet.family.father} />
                <InfoRow label="মাতা" value={poet.family.mother} />
                <InfoRow label="দাদা" value={poet.family.grandfather} />
                <InfoRow label="জন্মক্রম" value={poet.family.birthOrder} />
                <InfoRow label="স্ত্রী" value={poet.family.wife} />
              </div>
              {poet.family.notableSiblings &&
                poet.family.notableSiblings.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      উল্লেখযোগ্য ভাই-বোন:
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {poet.family.notableSiblings.map((sib, i) => (
                        <li key={i}>{sib}</li>
                      ))}
                    </ul>
                  </div>
                )}
            </Section>
          )}

          {/* Education */}
          {poet.education && (
            <Section title="শিক্ষাজীবন">
              {poet.education.summary && (
                <p className="text-gray-700 leading-relaxed mb-3">
                  {poet.education.summary}
                </p>
              )}
              {poet.education.englandVisit && (
                <p className="text-gray-700 leading-relaxed">
                  {poet.education.englandVisit}
                </p>
              )}
            </Section>
          )}

          {/* Life Timeline */}
          {poet.lifeTimeline && poet.lifeTimeline.length > 0 && (
            <Section title="জীবনপঞ্জি">
              <div className="relative border-l-2 border-indigo-200 pl-6 space-y-6">
                {poet.lifeTimeline.map((item, i) => (
                  <div key={i} className="relative">
                    <span className="absolute -left-[31px] top-1 w-3 h-3 bg-indigo-500 rounded-full" />
                    <p className="text-sm font-bold text-indigo-600">
                      {item.year}
                    </p>
                    <p className="text-gray-700">{item.event}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Works */}
          {poet.works && (
            <Section title="সাহিত্যকর্ম">
              <div className="grid sm:grid-cols-2 gap-6">
                <WorkList title="কাব্যগ্রন্থ" items={poet.works.poetry} />
                <WorkList title="উপন্যাস" items={poet.works.novels} />
                <WorkList title="ছোটগল্প" items={poet.works.shortStory} />
                <WorkList title="নাটক" items={poet.works.drama} />
                <WorkList title="প্রবন্ধ" items={poet.works.essay} />
                <WorkList
                  title="প্রবন্ধ সংকলন"
                  items={poet.works.essayCollection}
                />
                <WorkList title="ভ্রমণকাহিনী" items={poet.works.travelogue} />
                <WorkList title="গল্প" items={poet.works.story} />
                <WorkList
                  title="বিখ্যাত কবিতা"
                  items={poet.works.famousPoems}
                />
                <WorkList title="পত্রিকা" items={poet.works.magazines} />
                <WorkList
                  title="প্রবন্ধ ও অন্যান্য"
                  items={poet.works.essaysAndOther}
                />
                <WorkList title="অন্যান্য" items={poet.works.other} />
              </div>
              <div className="mt-4 grid sm:grid-cols-2 gap-4">
                {poet.works.songCollection && (
                  <InfoRow
                    label="গান সংকলন"
                    value={poet.works.songCollection}
                  />
                )}
                {poet.works.shortStoryCollection && (
                  <InfoRow
                    label="ছোটগল্প সংকলন"
                    value={poet.works.shortStoryCollection}
                  />
                )}
              </div>
            </Section>
          )}

          {/* Works Count */}
          {poet.worksCount && (
            <Section title="রচনার পরিসংখ্যান">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                <StatCard
                  label="কাব্যগ্রন্থ"
                  value={poet.worksCount.poetryBooks}
                />
                <StatCard label="নাটক" value={poet.worksCount.plays} />
                <StatCard label="উপন্যাস" value={poet.worksCount.novels} />
                <StatCard label="প্রবন্ধ" value={poet.worksCount.essayBooks} />
                <StatCard
                  label="ছোটগল্প"
                  value={poet.worksCount.shortStories}
                />
                <StatCard label="গান" value={poet.worksCount.songs} />
                <StatCard label="চিত্রকর্ম" value={poet.worksCount.paintings} />
                <StatCard
                  label="সমগ্র রচনা"
                  value={poet.worksCount.completeWorks}
                />
              </div>
            </Section>
          )}

          {/* Nobel Prize */}
          {poet.nobelPrize && (
            <Section title="নোবেল পুরস্কার">
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 space-y-2">
                <InfoRow label="সাল" value={poet.nobelPrize.year} />
                <InfoRow label="গ্রন্থ" value={poet.nobelPrize.book} />
                <InfoRow label="তাৎপর্য" value={poet.nobelPrize.significance} />
              </div>
            </Section>
          )}

          {/* Visva-Bharati */}
          {poet.visvaBharati && (
            <Section title="বিশ্বভারতী বিশ্ববিদ্যালয়">
              <div className="grid sm:grid-cols-2 gap-4 mb-3">
                <InfoRow
                  label="প্রতিষ্ঠাকাল"
                  value={poet.visvaBharati.founded}
                />
                <InfoRow label="অবস্থান" value={poet.visvaBharati.location} />
              </div>
              {poet.visvaBharati.background && (
                <p className="text-gray-700 leading-relaxed">
                  {poet.visvaBharati.background}
                </p>
              )}
            </Section>
          )}

          {/* National Anthems */}
          {poet.nationalAnthems && poet.nationalAnthems.length > 0 && (
            <Section title="জাতীয় সংগীত">
              <div className="grid sm:grid-cols-3 gap-4">
                {poet.nationalAnthems.map((anthem, i) => (
                  <div
                    key={i}
                    className="bg-green-50 border border-green-200 rounded-xl p-4"
                  >
                    <p className="font-bold text-green-800">{anthem.country}</p>
                    <p className="text-gray-700 text-sm mt-1">{anthem.song}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Honors and Titles */}
          {poet.honorsAndTitles && poet.honorsAndTitles.length > 0 && (
            <Section title="সম্মাননা ও উপাধি">
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {poet.honorsAndTitles.map((honor, i) => (
                  <li key={i}>{honor}</li>
                ))}
              </ul>
            </Section>
          )}

          {/* Important Facts (falls back to importantFacts if examImportantFacts absent) */}
          {facts && facts.length > 0 && (
            <Section title="পরীক্ষার জন্য গুরুত্বপূর্ণ তথ্য">
              <ul className="space-y-2">
                {facts.map((fact, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-gray-700 bg-indigo-50/50 rounded-lg p-3"
                  >
                    <span className="text-indigo-500 font-bold">✓</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Exam Tips */}
          {poet.examTips && (
            <Section title="পরীক্ষার টিপস">
              <div className="grid sm:grid-cols-3 gap-4">
                <TipCard
                  title="গুরুত্বপূর্ণ তারিখ"
                  items={poet.examTips.commonlyAskedDates}
                />
                <TipCard
                  title="গুরুত্বপূর্ণ নাম"
                  items={poet.examTips.commonlyAskedNames}
                />
                <TipCard
                  title="মনে রাখার বই"
                  items={poet.examTips.mustRememberBooks}
                />
              </div>
            </Section>
          )}
        </div>
      </div>
    </div>
  )
}

export default page

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
        {title}
      </h2>
      {children}
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <div>
      <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="text-gray-800 font-medium">{value}</p>
    </div>
  )
}

function WorkList({ title, items }: { title: string; items?: string[] }) {
  if (!items || items.length === 0) return null
  return (
    <div>
      <h4 className="font-semibold text-gray-800 mb-2">{title}</h4>
      <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
      <p className="text-xs text-gray-400 uppercase mb-1">{label}</p>
      <p className="text-gray-900 font-bold">{value}</p>
    </div>
  )
}

function TipCard({ title, items }: { title: string; items?: string[] }) {
  if (!items || items.length === 0) return null
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
      <h4 className="font-semibold text-blue-800 mb-2">{title}</h4>
      <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
