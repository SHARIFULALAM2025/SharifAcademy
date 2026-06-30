import React from 'react'

const Newsletter = () => {
  return (
    <div className="w-full bg-[#064E3B] text-white font-sans py-16 px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center border-t border-emerald-800/40">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Top Mini Tag */}
        <p className="text-emerald-300 font-medium tracking-wider text-xs sm:text-sm uppercase">
          আজই শুরু করো
        </p>

        {/* Main Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
          তোমার স্বপ্নের ক্যারিয়ার শুরু হোক আজ থেকেই
        </h2>

        {/* Subtitle Description */}
        <p className="text-emerald-100/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          ফ্রি নিউজলেটারে যোগ দাও — প্রতি সপ্তাহে কোর্স অফার, টিপস ও ক্যারিয়ার
          গাইড পাও
        </p>

        {/* Form Container */}
        <div className="w-full max-w-xl mx-auto space-y-4 pt-4">
          {/* Input Box */}
          <input
            type="email"
            placeholder="তোমার ইমেইল লিখো..."
            className="w-full bg-[#1A2436]/60 border border-emerald-700/50 rounded-xl px-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-[#1A2436] transition-all text-sm sm:text-base text-center sm:text-left"
            required
          />

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-transparent hover:bg-white hover:text-[#064E3B] text-white border border-emerald-400/60 font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 text-sm sm:text-base shadow-lg shadow-black/10 active:scale-95"
            >
              ফ্রি যোগ দাও
            </button>
          </div>
        </div>

        {/* Footer Guarantee Subtext */}
        <p className="text-emerald-200/50 text-xs pt-2">
          স্প্যাম নেই • যেকোনো সময় আনসাবস্ক্রাইব করো
        </p>
      </div>
    </div>
  )
}

export default Newsletter
