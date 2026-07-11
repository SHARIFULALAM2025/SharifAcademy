import React from 'react'
import allData from '@/data/geologicalPlace.json'
import { GeoNicknameData } from '@/Types/geiological'

const data = allData as GeoNicknameData

const Page = () => {
  return (
    <div className="px-6 py-16">
      <h1 className="mb-6 text-xl text-center font-semibold text-gray-900 dark:text-gray-100">
        {data.title}
      </h1>

      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm dark:border-gray-700">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-slate-950">
              <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">
                ক্রম
              </th>
              <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">
                উপনাম
              </th>
              <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">
                স্থান
              </th>
            </tr>
          </thead>
          <tbody>
            {data.item.map((item, idx) => (
              <tr
                key={item.id}
                className={`border-t border-gray-200 dark:border-gray-700 ${
                  idx % 2 === 0
                    ? 'bg-white dark:bg-slate-950'
                    : 'bg-gray-50 dark:bg-slate-900'
                }`}
              >
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  {idx + 1}
                </td>
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                  {item.nickname}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {item.place}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page
