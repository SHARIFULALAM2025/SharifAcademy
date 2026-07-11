import React from 'react'
import allData from '@/data/prefix.json'
import { PrefixData } from '@/Types/prefix'

const data = allData as PrefixData

const Page = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-12 px-4 sm:px-6 lg:px-8 font-sans overflow-x-hidden">
      {/* Background Neon Ornaments */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* --- HERO / HEADER SECTION --- */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-black text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            {data.topic.title_bn}
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed pt-2">
            {data.topic.definition}
          </p>
          <div className="pt-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900 border border-slate-800 text-sm text-amber-400 shadow-xl">
              ✨ <strong className="text-slate-300">মূল বৈশিষ্ট্য:</strong>{' '}
              {data.topic.characteristics}
            </span>
          </div>
        </header>

        {/* --- FUNCTIONS SECTION --- */}
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-white tracking-wide uppercase">
              উপসর্গের কাজ ও প্রয়োজনীয়তা
            </h2>
            <div className="h-px flex-grow bg-gradient-to-r from-slate-800 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {data.functions_of_prefix.map((func, index) => (
              <div
                key={index}
                className="bg-slate-900/40 backdrop-blur-md p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between hover:border-indigo-500/40 hover:bg-slate-900/60 transition-all duration-300 group shadow-lg"
              >
                <span className="text-xs font-mono font-bold text-indigo-500 bg-indigo-500/10 w-6 h-6 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                  0{index + 1}
                </span>
                <p className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors leading-relaxed">
                  {func}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- PREFIX TYPES SECTION --- */}
        <section className="space-y-10">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-white tracking-wide uppercase">
              উপসর্গের প্রকারভেদ
            </h2>
            <div className="h-px flex-grow bg-gradient-to-r from-slate-800 to-transparent"></div>
          </div>

          <div className="space-y-12">
            {data.types_of_prefix.map((type, tIdx) => (
              <div
                key={tIdx}
                className="bg-slate-900/20 backdrop-blur-xl rounded-3xl border border-slate-800/60 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden"
              >
                {/* Header inside Card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                      <span className="w-2 h-6 rounded bg-indigo-500" />
                      {type.type_name}
                    </h3>
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800 text-xs font-bold tracking-wider uppercase">
                    মোট সংখ্যা:{' '}
                    <span className="text-indigo-400 font-mono">
                      {type.total_count}
                    </span>
                  </span>
                </div>

                {/* Sub-list if exists (বাংলা ও তৎসম) */}
                {type.list && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      উপসর্গসমূহ:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {type.list.map((item, iIdx) => (
                        <span
                          key={iIdx}
                          className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800/60 text-sm font-mono text-indigo-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Grid Examples for Normal Types */}
                {type.examples && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                    {type.examples.map((ex, exIdx) => (
                      <div
                        key={exIdx}
                        className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/40 hover:border-slate-700/60 transition-colors space-y-3"
                      >
                        <div className="flex justify-between items-center text-xs">
                          <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-mono">
                            {ex.prefix}
                          </span>
                          <span className="text-slate-500 italic">
                            {ex.meaning}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="text-slate-500 line-through decoration-rose-500/50">
                            {ex.base_word}
                          </span>
                          <span className="text-slate-400">➡️</span>
                          <span className="text-emerald-400 font-bold text-base">
                            {ex.new_word}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Special Case for Foreign Languages */}
                {type.languages && (
                  <div className="space-y-8 pt-2">
                    {type.languages.map((lang, lIdx) => (
                      <div key={lIdx} className="space-y-4">
                        <div className="text-sm font-bold text-indigo-400 flex items-center gap-2 bg-indigo-500/5 border border-indigo-500/10 px-3 py-1 rounded-xl w-fit">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                          {lang.language} ভাষা থেকে aggregate
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {lang.examples.map((ex, exIdx) => (
                            <div
                              key={exIdx}
                              className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800/40 hover:border-slate-700/60 transition-colors space-y-3"
                            >
                              <div className="flex justify-between items-center text-xs">
                                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono font-bold">
                                  {ex.prefix}
                                </span>
                                <span className="text-slate-500 italic">
                                  {ex.meaning}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 text-sm">
                                <span className="text-slate-500">
                                  {ex.base_word}
                                </span>
                                <span className="text-slate-400">➡️</span>
                                <span className="text-indigo-400 font-bold text-base">
                                  {ex.new_word}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* --- VARIATIONS SECTION --- */}
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-white tracking-wide uppercase">
              একই শব্দের ভিন্ন ভিন্ন রূপভেদ
            </h2>
            <div className="h-px flex-grow bg-gradient-to-r from-slate-800 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.root_word_variations.map((v, vIdx) => (
              <div
                key={vIdx}
                className="bg-slate-900/30 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700 transition-all space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    মূল শব্দ:
                  </h4>
                  <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold shadow-md shadow-indigo-500/10">
                    {v.root_word}
                  </span>
                </div>
                <div className="w-full h-px bg-slate-800" />
                <div className="flex flex-wrap gap-2">
                  {v.variations.map((word, wIdx) => (
                    <span
                      key={wIdx}
                      className="text-xs px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/30 text-slate-300 font-medium transition-colors"
                    >
                      ✨ {word}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Page
