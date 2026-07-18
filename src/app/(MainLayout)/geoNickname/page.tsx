import React from 'react'
import allData from '@/data/geologicalPlace.json'
import { GeoNicknameData } from '@/Types/geiological'

const data = allData as GeoNicknameData

const Page = () => {
  return (
    <div className="px-6 py-16 bg-background font-body">
      <h1 className="font-display mb-6 text-xl text-center font-semibold text-foreground">
        {data.title}
      </h1>

      <div className="overflow-hidden rounded-lg border border-border shadow-sm max-w-4xl mx-auto">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-background">
                <th className="px-4 py-3 font-semibold text-foreground">
                  ক্রম
                </th>
                <th className="px-4 py-3 font-semibold text-foreground">
                  উপনাম
                </th>
                <th className="px-4 py-3 font-semibold text-foreground">
                  স্থান
                </th>
              </tr>
            </thead>
            <tbody>
              {data.item.map((item, idx) => (
                <tr
                  key={item.id}
                  className={`border-t border-border ${
                    idx % 2 === 0 ? 'bg-card' : 'bg-background'
                  }`}
                >
                  <td className="px-4 py-3 text-muted">{idx + 1}</td>
                  <td className="px-4 py-3 font-medium text-foreground">
                    {item.nickname}
                  </td>
                  <td className="px-4 py-3 text-foreground">{item.place}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Page
