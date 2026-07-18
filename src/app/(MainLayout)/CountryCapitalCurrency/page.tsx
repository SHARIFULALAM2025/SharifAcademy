import React from 'react'
import countryData from '@/data/country.json'
import allCountryData from '@/data/europe.json'
import { allData, europe } from '@/Types/country'
const data = countryData as allData[]
const europeData = allCountryData as europe[]

console.log(data)
const Page = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="space-y-10 p-4 sm:p-6 lg:p-8">
        <div className="overflow-x-auto rounded-xl border border-border shadow-lg">
          <table className="w-full border-collapse bg-card">
            <caption
              className="font-display bg-primary text-primary-foreground text-center py-3 px-4
              text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl
              font-semibold tracking-wide "
            >
              এশিয়ার অন্তর্ভুক্ত দেশগুলোর রাজধানী ও মুদ্রা
            </caption>
            <thead>
              <tr className="bg-primary/90 text-primary-foreground">
                <th className="py-3 px-4 text-left text-xs sm:text-sm font-semibold w-10">
                  Serial
                </th>
                <th className="py-3 px-4 text-left text-xs sm:text-sm font-semibold">
                  দেশ
                </th>
                <th className="py-3 px-4 text-left text-xs sm:text-sm font-semibold">
                  রাজধানী
                </th>
                <th className="py-3 px-4 text-left text-xs sm:text-sm font-semibold">
                  মুদ্রা
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b border-border transition-colors duration-150 hover:bg-primary/10
                    ${index % 2 === 0 ? 'bg-card' : 'bg-background'}`}
                >
                  <td className="py-2.5 px-4 text-xs sm:text-sm text-muted font-medium">
                    {index + 1}
                  </td>
                  <td className="py-2.5 px-4 text-xs sm:text-sm text-foreground font-medium">
                    {row.country}
                  </td>
                  <td className="py-2.5 px-4 text-xs sm:text-sm text-foreground/80">
                    {row.capital}
                  </td>
                  <td className="py-2.5 px-4 text-xs sm:text-sm text-foreground/80">
                    {row.currency}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-primary/90 text-primary-foreground">
                <td
                  colSpan={4}
                  className="py-2.5 px-4 text-xs sm:text-sm text-center text-primary-foreground/80"
                >
                  মোট দেশ: {data.length}টি
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border shadow-lg">
          <table className="w-full border-collapse bg-card">
            <caption
              className="font-display bg-primary text-primary-foreground text-center py-3 px-4
              text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl
              font-semibold tracking-wide "
            >
              ইউরোপ দেশগুলোর রাজধানী ও মুদ্রা
            </caption>
            <thead>
              <tr className="bg-primary/90 text-primary-foreground">
                <th className="py-3 px-4 text-left text-xs sm:text-sm font-semibold w-10">
                  Serial
                </th>
                <th className="py-3 px-4 text-left text-xs sm:text-sm font-semibold">
                  দেশ
                </th>
                <th className="py-3 px-4 text-left text-xs sm:text-sm font-semibold">
                  রাজধানী
                </th>
                <th className="py-3 px-4 text-left text-xs sm:text-sm font-semibold">
                  মুদ্রা
                </th>
              </tr>
            </thead>
            <tbody>
              {europeData.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b border-border transition-colors duration-150 hover:bg-primary/10
                    ${index % 2 === 0 ? 'bg-card' : 'bg-background'}`}
                >
                  <td className="py-2.5 px-4 text-xs sm:text-sm text-muted font-medium">
                    {index + 1}
                  </td>
                  <td className="py-2.5 px-4 text-xs sm:text-sm text-foreground font-medium">
                    {row.country}
                  </td>
                  <td className="py-2.5 px-4 text-xs sm:text-sm text-foreground/80">
                    {row.capital}
                  </td>
                  <td className="py-2.5 px-4 text-xs sm:text-sm text-foreground/80">
                    {row.currency}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-primary/90 text-primary-foreground">
                <td
                  colSpan={4}
                  className="py-2.5 px-4 text-xs sm:text-sm text-center text-primary-foreground/80"
                >
                  মোট দেশ: {data.length}টি
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </div>
  )
}

export default Page
