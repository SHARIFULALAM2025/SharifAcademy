import React from 'react'

const Newsletter = () => {
  return (
    <div className="w-full bg-background font-body px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center pb-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Main Heading */}
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-foreground">
          তোমার স্বপ্নের ক্যারিয়ার শুরু হোক আজ থেকেই
        </h2>

        {/* Subtitle Description */}
        <p className="text-muted text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          ফ্রি নিউজলেটারে যোগ দাও — প্রতি সপ্তাহে কোর্স অফার, টিপস ও ক্যারিয়ার
          গাইড পাও
        </p>

        <div className="w-full flex flex-col sm:flex-row gap-3 pt-4">
          {/* Input Box */}
          <input
            type="email"
            placeholder="Example@gmail.com"
            className="flex-1 bg-card border border-border rounded-xl px-5 py-4 text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all text-sm sm:text-base text-center sm:text-left"
            required
          />

          {/* Fix: text-sx → text-xs; py-3 → py-4 to match input height */}
          <button
            type="submit"
            className="bg-transparent hover:bg-primary hover:text-primary-foreground text-primary border border-primary/60 font-semibold px-8 py-4 rounded-xl transition-all duration-300 text-xs sm:text-base active:scale-95 whitespace-nowrap cursor-pointer"
          >
            ফ্রি যোগ দাও
          </button>
        </div>
      </div>
    </div>
  )
}

export default Newsletter
