import Image from 'next/image'

import React from 'react'

const Error = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-6 py-12 overflow-hidden relative">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* 404 big number */}
        <div className="relative mb-4 select-none">
          <p className="text-[120px] md:text-[160px] font-black leading-none tracking-tighter bg-gradient-to-b from-white/10 to-transparent bg-clip-text text-transparent">
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="https://i.ibb.co.com/N65s5jrz/Cjdlfsfjapture-removebg-preview.png"
              alt="404 illustration"
              width={400}
              height={300}
              className="h-44 md:h-56 w-auto object-contain drop-shadow-[0_20px_50px_rgba(16,185,129,0.25)] hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Divider line */}
        <div className="flex items-center gap-3 mb-6 justify-center">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-emerald-500/60" />
          <span className="text-xs font-bold tracking-[0.3em] text-emerald-500/80 uppercase">
            Data Not Found
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-emerald-500/60" />
        </div>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-snug">
          Oops! Looks like you&apos;re{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            lost in space
          </span>
        </h1>

        {/* Description */}
        <p className="text-slate-100 text-2xl md:text-3xl leading-relaxed mb-1">
          Data Not Found
        </p>

        {/* Help hint */}
        <p className=" text-2xl md:text-3xl text-slate-100">
          please search accurately !
        </p>
      </div>
    </div>
  )
}

export default Error
