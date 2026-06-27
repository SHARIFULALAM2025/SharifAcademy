import SingleExam from '@/Component/Exam/SingleExam'
import React from 'react'
interface PageProps {
  params: Promise<{ id: string }>
}
const page = async ({ params }: PageProps) => {
  const { id } = await params

  return (
    <div>
      <SingleExam id={Number(id)} />
    </div>
  )
}

export default page
