import { chapter1 } from '@/Types/chapter1'
import React from 'react'
import chapter from '@/banglaGrammar/chapter1.json'
import { VscFiles } from 'react-icons/vsc'
import { Summary } from '@/Component/SummaryList'

const chapter1Data = chapter as chapter1[]

const Page = () => {
  const chapter = chapter1Data[0]

  return (
    <main className=" text-foreground py-5">
      <section className="grid grid-cols-1 md:grid-cols-2">
        <section className="h-auto min-h-80 border-r-2 border-dotted border-r-border ">
          {/* Title */}
          <h3
            className="
          font-display text-primary-foreground text-center bg-primary
          text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl
          px-1 py-1
        "
          >
            ভাষা ও বাংলা
          </h3>

          {/* Definition */}
          <h2
            className="
          text-foreground text-center
          text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl
          mt-1 sm:mt-2 leading-snug sm:leading-normal
        "
          >
            {chapter?.language}
          </h2>

          {/* Summary list */}
          <Summary items={chapter.summary ?? []} />

          <span className="text-accent font-bold flex items-center gap-1">
            <VscFiles />
            <h1 className="">সাধু ভাষা</h1>
          </span>
          <Summary items={chapter.summary1 ?? []} />
          <span className="text-accent font-bold flex items-center gap-1">
            <VscFiles />
            <h1 className="">চলিত ভাষা</h1>
          </span>
          <Summary items={chapter.summary2 ?? []} />
          <span className="text-accent font-bold flex items-center gap-1">
            <VscFiles />
            <h1 className="">সাধু ও চলতি ভাষার মধ্যে পার্থক্য</h1>
          </span>
          <div className="border border-border rounded-xl overflow-hidden overflow-x-auto my-2">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="px-4 py-2 text-sm font-semibold text-left border border-border">
                    সাধুরীতি
                  </th>
                  <th className="px-4 py-2 text-sm font-semibold text-left border border-border">
                    চলিতরীতি
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 7 }, (_, i) => (
                  <tr
                    key={i}
                    className="even:bg-card hover:bg-primary/10 transition-colors"
                  >
                    <td className="px-4 py-2 text-sm text-foreground/80 border border-border">
                      {chapter.summary3[i]}
                    </td>
                    <td className="px-4 py-2 text-sm text-foreground/80 border border-border">
                      {chapter.summary4[i]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Summary items={chapter.summary5 ?? []} />

          <div className="border border-border rounded-xl overflow-hidden overflow-x-auto my-2">
            <table className="w-full border-collapse">
              <caption className="font-display text-primary font-bold pt-3 pb-2">
                বিখ্যাত ব্যাকরণ গ্রন্থ এর রচয়িতা
              </caption>
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="px-4 py-2 text-sm font-semibold text-center border border-border">
                    রচয়িতা
                  </th>
                  <th className="px-4 py-2 text-sm font-semibold text-center border border-border">
                    ব্যাকরণিক গ্রন্থ
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 6 }, (_, i) => (
                  <tr
                    key={i}
                    className="even:bg-card hover:bg-primary/10 transition-colors"
                  >
                    <td className="px-4 py-2 text-sm text-foreground/80 border border-border">
                      {chapter.summary6[i] ?? []}
                    </td>
                    <td className="px-4 py-2 text-sm text-foreground/80 border border-border">
                      {chapter.summary7[i] ?? []}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3
            className="
          font-display text-primary-foreground text-center bg-primary
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
          font-display text-primary-foreground text-center bg-primary
          text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl
          px-1 py-1
        "
          >
            বাংলা লিপি
          </h3>
          <Summary items={chapter.summary8 ?? []} />
          <h3
            className="
          font-display text-primary-foreground text-center bg-primary
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
          font-display text-primary-foreground text-center bg-primary
          text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl
          px-1 py-1
        "
          >
            বাংলা ব্যাকরণের আলোচ্য বিষয়
          </h3>
          <Summary className="font-bold" items={chapter.summary10 ?? []} />
        </section>
      </section>

      <section className="">
        <div className="border border-border rounded-xl overflow-hidden overflow-x-auto my-2">
          <table className="w-full border-collapse">
            <caption className="font-display text-foreground font-semibold py-2">
              ব্যাঞ্জনধ্বনির উচ্চারন
            </caption>
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th
                  rowSpan={2}
                  className="px-4 py-2 text-sm font-semibold text-center border border-border"
                >
                  ধ্বনি হিসেবে
                </th>
                <th
                  rowSpan={2}
                  className="px-4 py-2 text-sm font-semibold text-center border border-border"
                >
                  বর্ণ হিসেবে
                </th>
                <th
                  rowSpan={2}
                  className="px-4 py-2 text-sm font-semibold text-center border border-border"
                >
                  উচ্চারণের স্থান
                </th>
                <th
                  colSpan={2}
                  className="px-4 py-2 text-sm font-semibold text-center border border-border"
                >
                  অঘোষ
                </th>
                <th
                  colSpan={2}
                  className="px-4 py-2 text-sm font-semibold text-center border border-border"
                >
                  ঘোষ
                </th>
                <th
                  rowSpan={2}
                  className="px-4 py-2 text-sm font-semibold text-center border border-border"
                >
                  নাসিক্য
                </th>
              </tr>
              <tr className="bg-primary text-primary-foreground">
                <th className="px-4 py-2 text-sm font-semibold text-center border border-border">
                  অল্প প্রাণ
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-center border border-border">
                  মহা প্রাণ
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-center border border-border">
                  অল্প প্রাণ
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-center border border-border">
                  মহা প্রাণ
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </section>
    </main>
  )
}

export default Page
