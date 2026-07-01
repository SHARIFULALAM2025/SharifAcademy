import React from 'react'
import countryData from "@/data/country.json"
import allCountryData from '@/data/europe.json'
import { allData, europe } from '@/Types/country'
const data = countryData as allData[]
const europeData = allCountryData as europe[]

console.log(data);
const Page = () => {
  return (
    <div className="min-h-screen bg-gray-50 ">
      <section className="">
        <div className="overflow-x-auto  shadow-lg">
          <table className="w-full border-collapse bg-white">
            <caption
              className="bg-black text-white text-center py-3 px-4
              text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl
              font-semibold tracking-wide "
            >
              এশিয়ার অন্তর্ভুক্ত দেশগুলোর রাজধানী ও মুদ্রা
            </caption>
            <thead>
              <tr className="bg-gray-800 text-white">
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
                  className={`border-b border-gray-100 transition-colors duration-150 hover:bg-blue-50
                    ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <td className="py-2.5 px-4 text-xs sm:text-sm text-gray-400 font-medium">
                    {index + 1}
                  </td>
                  <td className="py-2.5 px-4 text-xs sm:text-sm text-gray-800 font-medium">
                    {row.country}
                  </td>
                  <td className="py-2.5 px-4 text-xs sm:text-sm text-gray-700">
                    {row.capital}
                  </td>
                  <td className="py-2.5 px-4 text-xs sm:text-sm text-gray-700">
                    {row.currency}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-800 text-white">
                <td
                  colSpan={4}
                  className="py-2.5 px-4 text-xs sm:text-sm text-center text-gray-300"
                >
                  মোট দেশ: {data.length}টি
                </td>
              </tr>
            </tfoot>
          </table>
          <table className="w-full border-collapse bg-white">
            <caption
              className="bg-black text-white text-center py-3 px-4
              text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl
              font-semibold tracking-wide "
            >
               ইউরোপ দেশগুলোর রাজধানী ও মুদ্রা
            </caption>
            <thead>
              <tr className="bg-gray-800 text-white">
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
                  className={`border-b border-gray-100 transition-colors duration-150 hover:bg-blue-50
                    ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <td className="py-2.5 px-4 text-xs sm:text-sm text-gray-400 font-medium">
                    {index + 1}
                  </td>
                  <td className="py-2.5 px-4 text-xs sm:text-sm text-gray-800 font-medium">
                    {row.country}
                  </td>
                  <td className="py-2.5 px-4 text-xs sm:text-sm text-gray-700">
                    {row.capital}
                  </td>
                  <td className="py-2.5 px-4 text-xs sm:text-sm text-gray-700">
                    {row.currency}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-800 text-white">
                <td
                  colSpan={4}
                  className="py-2.5 px-4 text-xs sm:text-sm text-center text-gray-300"
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
