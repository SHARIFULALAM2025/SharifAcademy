import React from 'react'
import allData from '@/data/poet.json'
import { PoetDataset } from '@/Types/poetData'
import Image from 'next/image'
import Link from 'next/link'

const data = allData as PoetDataset

const Page = () => {
  console.log(data)


  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          কবি ও লেখক পরিচিতি
        </h1>

        {/* কার্ডের জন্য রেসপন্সিভ গ্রিড লেআউট */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.writers.map((poet) => (
            <Link
              href={`/poetsTitlesAndHonors/${poet.id}`}
              key={poet.id}

              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-100 flex flex-col justify-between"
            >

              <div className="relative h-64 w-full bg-gray-200">
                <Image
                  src={
                    poet.image
                  }
                  alt={poet.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover object-top"

                />
              </div>

              {/* ২. ইনফরমেশন সেকশন (ইমেজের নিচে) */}
              <div className="p-5 text-center flex-grow flex flex-col justify-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                  {poet.name}
                </h3>
                <p className="text-sm text-gray-500 font-medium">
                  {poet.dateOfBirth || 'অজানা'} – {poet.dateOfDeath || 'বর্তমান'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page
