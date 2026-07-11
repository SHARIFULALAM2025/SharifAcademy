import React from 'react'
import allData from '@/data/food.json'
import { CropData } from '@/Types/food'

const data = allData as CropData

const Page = () => {
  return (
    <div className=" px-6 py-16">
      <h1 className="mb-6 text-center text-xl font-semibold">
        কোন বিভাগে / জেলায় কোন ফসল বেশি হয়
      </h1>

      <table className="w-full border border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="px-3 py-2 font-medium">ক্রম</th>
            <th className="px-3 py-2 font-medium">ফসল</th>
            <th className="px-3 py-2 font-medium">বিভাগ</th>
            <th className="px-3 py-2 font-medium">জেলা</th>
          </tr>
        </thead>
        <tbody>
          {data.item.map((item, idx) => (
            <tr key={`${item.id}-${idx}`} className="border-b border-gray-200">
              <td className="px-3 py-2">{idx + 1}</td>
              <td className="px-3 py-2">{item.name}</td>
              <td className="px-3 py-2">{item.division}</td>
              <td className="px-3 py-2">{item.district}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Page
