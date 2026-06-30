import { chapter1 } from '@/Types/chapter1'
import React from 'react'
import chapter from '@/banglaGrammar/chapter1.json'
import { VscFiles } from 'react-icons/vsc'
import { Summary } from '@/Component/SummaryList'

const chapter1Data = chapter as chapter1[]


const Page = () => {
  const chapter = chapter1Data[0]

  return (
    <main className="">
      <section className="grid grid-cols-2">
        <section className="h-auto min-h-80 border-r-2 border-dotted border-r-slate-700 ">
          {/* Title */}
          <h3
            className="
          text-white text-center bg-black
          text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl
          px-1 py-1
        "
          >
            ভাষা ও বাংলা
          </h3>

          {/* Definition */}
          <h2
            className="
          text-black text-center dark:text-white
          text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl
          mt-1 sm:mt-2 leading-snug sm:leading-normal
        "
          >
            {chapter?.language}
          </h2>

          {/* Summary list */}
          <Summary items={chapter.summary ?? []} />

          <span className="text-red-700 font-bold flex items-center gap-1">
            <VscFiles />
            <h1 className="">সাধু ভাষা</h1>
          </span>
          <Summary items={chapter.summary1 ?? []} />
          <span className="text-red-700 font-bold flex items-center gap-1">
            <VscFiles />
            <h1 className="">চলিত ভাষা</h1>
          </span>
          <Summary items={chapter.summary2 ?? []} />
          <span className="text-red-700 font-bold flex items-center gap-1">
            <VscFiles />
            <h1 className="">সাধু ও চলতি ভাষার মধ্যে পার্থক্য</h1>
          </span>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-black text-white">
                <th className="px-4 py-2 text-sm font-semibold text-left border border-slate-300">
                  সাধুরীতি
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-left border border-slate-300">
                  চলিতরীতি
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 7 }, (_, i) => (
                <tr
                  key={i}
                  className="even:bg-slate-100 hover:bg-blue-50 transition-colors"
                >
                  <td className="px-4 py-2 text-sm text-slate-700 border border-slate-300">
                    {chapter.summary3[i]}
                  </td>
                  <td className="px-4 py-2 text-sm text-slate-700 border border-slate-300">
                    {chapter.summary4[i]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Summary items={chapter.summary5 ?? []} />

          <table className="w-full border-collapse  ">
            <caption className="text-blue-800 font-bold pt-3">
              বিখ্যাত ব্যাকরণ গ্রন্থ এর রচয়িতা
            </caption>
            <thead>
              <tr className="bg-black text-white">
                <th className="px-4 py-2 text-sm font-semibold text-center border border-slate-300">
                  রচয়িতা
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-center border border-slate-300">
                  ব্যাকরণিক গ্রন্থ
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }, (_, i) => (
                <tr
                  key={i}
                  className="even:bg-slate-50 hover:bg-blue-50 transition-colors"
                >
                  <td className="px-4 py-2 text-sm text-slate-700 border border-slate-300">
                    {chapter.summary6[i] ?? []}
                  </td>
                  <td className="px-4 py-2 text-sm text-slate-700 border border-slate-300">
                    {chapter.summary7[i] ?? []}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3
            className="
          text-white text-center bg-black
          text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl
          px-1 py-1
        "
          >
            ধ্বনির প্রকরন
          </h3>
          <Summary items={chapter.summary11 ?? []} />
          <Summary items={chapter.summary12 ?? []} />
        </section>
        <section className="h-auto min-h-80">
          <h3
            className="
          text-white text-center bg-black
          text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl
          px-1 py-1
        "
          >
            বাংলা লিপি
          </h3>
          <Summary items={chapter.summary8 ?? []} />
          <h3
            className="
          text-white text-center bg-black
          text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl
          px-1 py-1
        "
          >
            বাংলা ব্যাকরণ
          </h3>
          <Summary
            className="grid grid-cols-2 font-bold"
            items={chapter.summary9 ?? []}
          />
          <h3
            className="
          text-white text-center bg-black
          text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl
          px-1 py-1
        "
          >
            বাংলা ব্যাকরণের আলোচ্য বিষয়
          </h3>
          <Summary className="font-bold" items={chapter.summary10 ?? []} />
        </section>
      </section>

      <section className="">
        <table className="w-full border-collapse">
          <caption className="">ব্যাঞ্জনধ্বনির উচ্চারন</caption>
          <thead>
            <tr className="bg-black text-white">
              <th
                rowSpan={2}
                className="px-4 py-2 text-sm font-semibold text-center border border-slate-300"
              >
                ধ্বনি হিসেবে
              </th>
              <th
                rowSpan={2}
                className="px-4 py-2 text-sm font-semibold text-center border border-slate-300"
              >
                বর্ণ হিসেবে
              </th>
              <th
                rowSpan={2}
                className="px-4 py-2 text-sm font-semibold text-center border border-slate-300"
              >
                উচ্চারণের স্থান
              </th>
              <th
                colSpan={2}
                className="px-4 py-2 text-sm font-semibold text-center border border-slate-300"
              >
                অঘোষ
              </th>
              <th
                colSpan={2}
                className="px-4 py-2 text-sm font-semibold text-center border border-slate-300"
              >
                ঘোষ
              </th>
              <th
                rowSpan={2}
                className="px-4 py-2 text-sm font-semibold text-center border border-slate-300"
              >
                নাসিক্য
              </th>
            </tr>
            <tr className="bg-black text-white">
              <th className="px-4 py-2 text-sm font-semibold text-center border border-slate-300">
                অল্প প্রাণ
              </th>
              <th className="px-4 py-2 text-sm font-semibold text-center border border-slate-300">
                মহা প্রাণ
              </th>
              <th className="px-4 py-2 text-sm font-semibold text-center border border-slate-300">
                অল্প প্রাণ
              </th>
              <th className="px-4 py-2 text-sm font-semibold text-center border border-slate-300">
                মহা প্রাণ
              </th>
            </tr>
          </thead>
        </table>
      </section>
    </main>
  )
}

export default Page
