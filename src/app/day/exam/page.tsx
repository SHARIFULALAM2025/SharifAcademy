import React from 'react'
import allData from '@/data/exam.json'
import { AttendExam } from '@/Types/Day'
import ExamCard from '@/Component/Exam/ExamCard'


const examList = allData as AttendExam[]

const Page = () => {
    console.log(examList)
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Exam List</h1>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examList.map((exam, index) => (

          <ExamCard key={exam.id || index} data={exam} />
        ))}
      </div>
    </div>
  )
}

export default Page
