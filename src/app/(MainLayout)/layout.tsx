

//import Footer from '@/Component/Footer/Footer'
import Navbar from '@/Component/Header/Navbar'
import React from 'react'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="min-h-screen ">
        {children}
      </main>
      {/* <Footer/> */}
    </div>
  )
}

export default layout
